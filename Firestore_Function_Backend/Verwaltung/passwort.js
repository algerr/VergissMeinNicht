// Import der Joi-Library für die Validierung von Anfragen.
const Joi = require('@hapi/joi')

// Import der Datenbankfunktionen und der Funktion zum Abrufen der Passwortdaten.
const { passwortDatenAbrufen } = require('../Grundfunktionen/datenAbrufen')
const { datenHinzufuegen, datenLesen, datenLoeschen } = require('../Grundfnktionen/datenbankFuntkionen')

// Definition einer Exportfunktion für das Hinzufügen von Passwörtern.
exports.passwortHinzufuegen = async (req, res) => {
    // Überprüfung, ob der Nutzer authentifiziert ist, um unbefugten Zugriff zu verhindern.
    if (!req.authentifizierungsUeberpruefung) {
        return res.status(400).send({
            status: 0,
            message: "Nicht authentifiziert!"
        })
    }

    // Definierung eines Formats für die erwartete Anfrage mithilfe von Joi.
    const format = Joi.object({
        beschreibung: Joi.string().required(),
        verschluesseltesPasswort: Joi.string().required(),
        sicherheitswert: Joi.string().required()
    })

    // Extrahieren von Beschreibung, verschluesseltem Passwort und Sicherheitswert aus der Anfrage.
    const { beschreibung, verschluesseltesPasswort, sicherheitswert } = req.body

    // Überprüfung, ob die Anfrage dem erwarteten Format entspricht.
    const validierung = format.validate({ beschreibung, verschluesseltesPasswort, sicherheitswert })

    // Wenn die Anfrage nicht dem erwarteten Format entspricht, wird eine Fehlermeldung zurückgegeben (Status 400 (Bad-Request)).
    if (validierung.error) {
        return res.status(400).send({
            status: 0,
            message: validierung.error.message,
        })
    }

    // Speichern des Passwortes in der Datenbank mithilfe der DatenbankFunktion "datenHinzufuegen".
    const passwort = await datenHinzufuegen(req.firestore, 'passwoerter', null, { beschreibung, verschluesseltesPasswort, sicherheitswert, benutzername: req.benutzername })

    // Ein Status 200 (OK) wird zurückgegeben, gemeinsam mit dengespeicherten Passwort-Informationen.
    return res.status(200).send({
        status: 1,
        passwort: {
            id: passwort.id,
            beschreibung,
            verschluesseltesPasswort,
            sicherheitswert,
            benutzername: req.benutzername
        },
        message: "Passwort erfolgreich gespeichert!"
    })
}

// Definition der Exportfunktion für das Löschen von Passwörtern.
exports.passwortLoeschen = async (req, res) => {
    // Zuerst wird überprüft, ob der Nutzer authentifiziert ist.
    // Wenn das nicht der Fall ist, wird ein Status 400 gesendet.
    if (!req.authentifizierungsUeberpruefung) {
        return res.status(400).send({
            status: 0,
            message: "Nicht authentifiziert!"
        })
    }

    // Danach wird das Format festgelegt, das die Anfrage einhalten soll.
    // In diesem Fall darf nur eine PasswortId in der Anfrage enthalten sein.
    const format = Joi.object({
        passwortId: Joi.string().required()
    })

    // Aus der Anfrage wird die PasswortId entnommen.
    const { passwortId } = req.params

    // Daraufhin wird die Anfrage auf die Einhaltung des Formates überprüft.
    const validierung = format.validate({ passwortId })

    // Wenn es einen Fehler bei der Validierung des Formates gibt, wird dieser als Fehlermeldung zurückgegeben.
    if (validierung.error) {
        return res.status(400).send({
            status: 0,
            message: validierung.error.message,
        })
    }

    // Wenn der Benutzername nicht mit der PasswortId validiert werden konnte, gibt es auch eine Fehlermeldung.
    if (! await validierungPasswortBenutzername(req, passwortId)) {
        return res.status(400).send({
            status: 0,
            message: "Du darfst diese Aktion nicht ausführen!"
        })
    }

    // Wenn es jedoch keine Probleme gibt, wird das zur passwortId zugehörige Passwort aus der Datenbank gelöscht.
    await datenLoeschen(req.firestore, 'passwoerter', passwortId)

    // Als Antwort auf die Anfrage wird daraufhin eine Bestätigungsnachricht und der Status 1 gesendet.
    return res.status(200).send({
        status: 1,
        message: "Passwort erfolgreich gelöscht!"
    })
}

// Diese Funktion gibt alle Passwörter des aktuellen Benutzers zurück.
exports.allePasswoerter = async (req, res) => {
    // Prüfen, ob der Benutzer authentifiziert ist.
    if (!req.authentifizierungsUeberpruefung) {
        return res.status(400).send({
            status: 0,
            message: "Nicht authentifiziert!"
        })
    }

    // Abrufen aller Passwörter des aktuellen Benutzers aus der Firestore-Datenbank.
    const passwoerter = await req.firestore.collection("passwoerter").where("benutzername", "==", req.benutzername).get()

    // Erstellen eines Arrays, das alle gefundenen Passwörter enthält.
    const passwoerterArray = []

    // Überprüfung, ob die Abfrageergebnisse nicht leer sind, und wenn nicht,
    // wird jedes Ergebnis als Objekt mit seiner id in den passwoerterArray eingefügt.
    if (!passwoerter.empty) {
        passwoerter.forEach(p => { passwoerterArray.push({ ...p.data(), id: p.id })
        })
    }

    // Senden des Arrays mit den Passwörtern als Erfolgsmeldung an den Client.
    return res.status(200).send({
        status: 1,
        passwoerter: passwoerterArray
    })
}

// Validierung des Benutzernamens
const validierungPasswortBenutzername = async (req, id) => {
    // Der Variablen p wird das Passwort zur angegebenen Id zugeordnet.
    let p = await datenLesen(req.firestore, 'passwoerter', id)

    // Wenn das Passwort nicht existiert, wird "false" zurückgegeben.
    if (!p.exists) {
        return false
    }


    // Ansonsten werden die gespeicherten Daten des Passwortes ausgegeben
    let passwort = passwortDatenAbrufen(p.data())

    // und validiert, ob der Benutzername, der im Passwort gespeichert ist, dem Benutzernamen, der in der Anfrage übergeben wurde, entspricht.
    if (passwort.benutzername !== req.benutzername) {
        return false
    }
    return true
}
