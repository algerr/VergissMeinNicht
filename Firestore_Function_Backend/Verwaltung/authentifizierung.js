// Joi ist die perfekte Wahl für das Festlegen von Schemata/Formaten, denen Daten folgen sollen
// und der Validierung dieser.
const Joi = require('@hapi/joi')
// Zur Authentifizierung werden Jsonwebtokens (JWT) 
const jwt = require('jsonwebtoken')
// und für die Verschlüsselung die Bcrypt-Hashfunktion verwendet.
// Dafür wird die Javascript-Implementierung "bcryptjs" verwendet.
const bcrypt = require('bcryptjs')

// Die Grundfunktionen zur Arbeit mit Datenbanken werden importiert,
const { datenLesen, datenHinzufuegen, datenAktualisieren, datenLoeschen } = require('../Grundfunktionen/datenbankFunktionen')

const { benutzerDatenAbrufen } = require('../Grundfunktionen/datenAbrufen')

// Für die Registrierung wird das Format (benutzername, passwort, email) vorgegeben, in dem die Daten eingegeben werden müssen.
exports.registrierung = async (req, res) => {
    const Format = Joi.object({
        benutzername: Joi.string().required(),
        passwort: Joi.string().required(),
        email: Joi.string().email().allow('')
    })

    // Benutzername, Passwort und email werden aus dem Message-Body der Anfrage entnommen.
    const { benutzername, passwort, email } = req.body

    // Validierung, ob die eingegebenen Daten aus der Anfrage dem vorgegebenen Format (Benutzername, Passwort, Email) 
    // und den Anforderung entsprechen. (Bspw. muss eine Email ein @-Zeichen beinhalten, was durch die Funktion "email()" festgelegt wird)
    const Validierung = Format.validate({ benutzername, passwort, email })

    // Wenn die eingegebenen Daten nicht dem Format entsprechen, dann gibt es einen Fehler 400 (Bad-Request). Die Anfrage ist fehlerhaft.
    // Es könnte bspw. sein, dass ein Nutzer eine Email ohne @-Zeichen eingegeben hat.
    if (Validierung.error) {
        return res.status(400).send({
            status: 0,
            message: Validierung.error.message,
        })
    }

    // In der Firestore-Datenbank wird überprüft, ob der Benutzername bereits existiert.
    let b = await datenLesen(req.firestore, 'benutzer', benutzername)
    // Wenn dies der Fall ist, wird die Anfrage mit dem Fehler 400 (Bad-Request) zurückgegeben.
    // Dazu noch eine Fehlermeldung, dass der Benutzer ja bereits registriert sei.
    if (b.exists) {
        return res.status(400).send({
            status: 0,
            message: `Der Benutzer ${benutzername} ist bereits registriert!`,
        })
    }

    // Wenn der Benutzername aber noch nicht existiert, wird dieser in der Firestore-Datenbank hinzugefuegt.
    // In der Sammlung 'benutzer' wird ein neuer Benutzer mit dem angegebenen Benutzernamen angelegt und diesem die Felder "email", "passwort" und "benutzername" hinzugefuegt.
    await datenHinzufuegen(req.firestore, 'benutzer', benutzername, { benutzername, email: email || '', passwort: bcrypt.hashSync(passwort, 12) })

    // Nach der erfolgreichen Registrierung des Benutzers, wird die Anfrage mit dem Statuscode 200 (OK) zurückgegeben.
    // Dazu noch die Meldung, dass der Benutzer erfolgreich registriert wurde.
    return res.status(200).send({
        status: 1,
        message: `Der Benutzer ${benutzername} wurde erfolgreich registriert!`
    })
}

// Für die Anmeldung wird das Format (benutzername, passwort) vorgegeben, in der die Daten eingegeben werden müssen.
exports.anmeldung = async (req, res) => {
    const Format = Joi.object({
        benutzername: Joi.string().required(),
        passwort: Joi.string().required()
    })

    // Benutzername und Passwort werden aus dem Message-Body der Anfrage entnommen.
    const { benutzername, passwort } = req.body

    // Validierung, ob die eingegebenen Daten aus der Anfrage dem vorgegebenen Format (Benutzername, Passwort) 
    // und den Anforderung entsprechen. (Bspw. muss die Eingabe ein String sein, der nicht leer ist)
    const Validierung = Format.validate({ benutzername, passwort })

    // Wenn nicht, dann gibt es einen Fehler 400 (Bad-Request). Die Anfrage ist fehlerhaft.
    // Dazu noch die jeweilige Fehlermeldung, damit man weiß, wo der Fehler liegt.
    if (Validierung.error) {
        return res.status(400).send({ status: 0, message: Validierung.error.message })
    }

    // In der Firestore-Datenbank wird überprüft, ob der Benutzername existiert.
    let b = await datenLesen(req.firestore, 'benutzer', benutzername)
    if (!b.exists) {
        // Wenn dies nicht der Fall ist, wird die Anfrage mit dem Fehler 400 (Bad-Request) zurückgegeben.
        // Dazu noch eine Fehlermeldung, dass dieser Benutzer noch nicht in der Datenbank existiert.
        return res.status(400).send({ status: 0, message: `Der Benutzer ${benutzername} existiert nicht!` })
    }

    // Wenn der Benutzer aber existiert, werden dessen Daten (Email und Passwort) abgerufen 
    // und in der Konstanten "benutzer" gespeichert.
    const benutzer = benutzerDatenAbrufen(b.data())

    // Daraufhin erfolgt ein Abgleich des Passwortes, das unter dem Benutzernamen in der Datenbank gespeichert ist und dessen, das bei der Anmeldung eingegeben wurde.
    if (bcrypt.compareSync(passwort, benutzer.passwort)) {
        const token = jwt.sign({ benutzername, email: benutzer.email }, process.env.TOKEN_SCHLUESSEL, {
            expiresIn: '1h'
        })

        // Wenn die Passwörter übereinstimmen, wird ein Token mit einer Gültigkeit von einer Stunde zurückgegeben. (Status 200 (OK))
        return res.status(200).send({
            status: 1,
            token
        })
    } else {
        // Wenn die beiden Passwörter nicht übereinstimmen, gibt es einen Fehler 400 (Bad-Request)
        // und dazu die Fehlermeldung, dass das eingegebene Passwort nicht mit dem aus der Datenbank übereinstimmt.
        return res.status(400).send({
            status: 0,
            message: `Passwort inkorrekt!`,
        })
    }
}

// Der Benutzer soll auch die Möglichkeit haben, sein Passwort aktualisieren zu können.
exports.passwortAktualisieren = async (req, res) => {
    // Dafuer ist erstmal wichtig, dass der Benutzer in dem Moment autorisiert ist.
    // Wie die Autorisierungsabfrage "authentifizierungsUeberpruefung" genau funktioniert, wird in "../Vermittlung/authentifizierungsUeberpruefung" erklärt.
    if (!req.authentifizierungsUeberpruefung) {
        return res.status(400).send({ status: 0, message: "Nicht autorisiert." })
    }

    // Um das Passwort zu aktualisieren, kann nicht, wie bei der Email, einfach das neue eingegeben werden.
    // Es wird auch das alte Passwort benötigt, um sicher zu gehen, dass der Benutzer die Anmeldedaten kennt.
    const Format = Joi.object({ altesPasswort: Joi.string().required(), neuesPasswort: Joi.string().required(), })

    // Das alte und neue Passwort werden aus dem Message-Body der Anfrage entnommen.
    const { altesPasswort, neuesPasswort } = req.body

    const Validierung = Format.validate({ altesPasswort, neuesPasswort })

    // Validierung, ob die Anfrage, dem Format (altesPasswort, neuesPasswort) entspricht.
    // Wenn nicht, dann gibt es einen Fehler 400 (Bad-Request). Die Anfrage ist fehlerhaft.
    if (Validierung.error) {
        return res.status(400).send({
            status: 0,
            message: Validierung.error.message,
        })
    }

    
    let b = await datenLesen(req.firestore, 'benutzer', req.benutzername)
    if (!b.exists) {
        return res.status(400).send({
            status: 0,
            message: `Der Benutzer ${req.benutzername} existiert nicht!`,
        })
    }

    // Die in der Datenbank gespeicherten Daten des Benutzers werden abgerufen.
    const user = benutzerDatenAbrufen(u.data())

    // Daraufhin wird das alte Passwort mit dem aus der Datenbank verglichen.
    if (bcrypt.compareSync(altesPasswort, user.passwort)) {
        // Wenn die beiden gleich sind, wird eine wird das neue Passwort in der Datenbank gespeichert.
        await datenAktualisieren(req.firestore, 'benutzer', req.benutzername, { passwort: bcrypt.hashSync(neuesPasswort, 12) })

        // Der Server setzt den Status auf 1 und gibt diesen zurück. (Status 200 (OK))
        return res.status(200).send({ status: 1 })
    // Wenn die beiden nicht gleich sind, wird eine Fehlermeldung und der Status 0 zurückgegeben. (Status 400 (Bad-Request))
    } else {
        return res.status(400).send({ status: 0, message: `Das ist nicht das alte Passwort!`, })
    }
}

// Der Benutzer soll auch die Möglichkeit haben, seine Email aktualisieren zu können.
exports.emailAktualisieren = async (req, res) => {
    // Dafuer ist erstmal wichtig, dass der Benutzer in dem Moment autorisiert ist.
    // Wie die Autorisierungsabfrage "authentifizierungsUeberpruefung" genau funktioniert, wird in "../Vermittlung/authentifizierungsUeberpruefung" erklärt.
    if (!req.authentifizierungsUeberpruefung) {
        return res.status(400).send({ status: 0, message: "Nicht autorisiert!" })
    }

    // Das Format fuer die neue Email muss natürlich auch dem einer Mailadresse entsprechen.
    const Format = Joi.object({ email: Joi.string().email().allow('').required() })

    // Die eingegebene neue Email wird aus dem Message-Body der Anfrage entnommen.
    const { email } = req.body

    // Nun wird validiert, ob die eingegebene Email denn auch dem passenden Format entspricht.
    const Validierung = Format.validate({ email })

    // Wenn die Eingabe nicht mit dem Format übereinstimmt, wird ein Fehler 400 (Bad-Request) mit der jeweiligen Fehlermeldung zurückgegeben.
    if (Validierung.error) {
        return res.status(400).send({ status: 0, message: Validierung.error.message })
    }

    // Wenn jedoch die eingegeben Email in das Format passt, wird in der Firestore-Datenbank, 
    // in der Sammlung "benutzer", die Email des Benutzers überschrieben.
    await datenAktualisieren(req.firestore, 'benutzer', req.benutzername, { email })
    const token = jwt.sign({ benutzername: req.benutzername, email }, process.env.TOKEN_SCHLUESSEL, { expiresIn: '1h' })

    // Dem Nutzer wird ein neues Token zurückgegeben und der Status auf 1 gesetzt.
    return res.status(200).send({ status: 1, token })
}

// Der Benutzer soll gewiss auch seinen Account löschen können.
exports.accountLoeschen = async (req, res) => {
    
    // Dafür muss auf jeden Fall sichergestellt werden, dass der Benutzer authentifiziert ist.
    if (!req.authentifizierungsUeberpruefung) {
        // Wenn dies nicht der Fall ist, wird eine Fehlermeldung zurückgegeben.
        return res.status(400).send({ status: 0, message: "Nicht autorisiert!" })
    }

    // Wenn der Nutzer jedoch authentifiziert ist, diese Aktion auszuführen, werden zuerst alle Passwörter gelöscht, die auf den
    // Namen dieses Benutzers in der Datenbank gespeichert sind.
    const passwoerter = await req.firestore.collection("passwoerter").where("benutzername", "==", req.benutzername).get()
    passwoerter.forEach(async doc => {
        await doc.ref.delete()
    })

    // Daraufhin wird auch der Benutzer aus der Datenbank gelöscht und somit sind alle Daten zu diesem Benutzer und auch
    // der Account selbst permanent gelöscht.
    await datenLoeschen(req.firestore, 'benutzer', req.benutzername)
    
    // Der Status 1 wird zurückgegeben, da das Löschen problemlos funktioniert hat. (Status 200 (OK)).
    return res.status(200).send({
        status: 1,
    })
}
