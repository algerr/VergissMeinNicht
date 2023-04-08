// Importieren des 'jsonwebtoken'-Moduls für die Verarbeitung von JSON-Web-Token
const jwt = require('jsonwebtoken')

// Middleware für die Überprüfung der Autorisierung des Benutzers mit JWT
module.exports = (req, res, next) => {

    // Der Authorization-Headers wird aus der HTTP-Anfrage extrahiert.
    const Authorization_Header = req.get('Authorization')

    // Wenn kein Authorization-Header vorhanden ist, ist der Benutzer nicht authentifiziert
    if (!Authorization_Header) {
        req.authentifizierungsUeberpruefung = false
        return next()
    }

    // Das Tokens wird aus dem Authorization-Header extrahiert.
    const token = Authorization_Header.split(' ')[1]
    if (!token || token === '') {
        // Wenn kein Token vorhanden ist, ist der Benutzer nicht authentifiziert
        req.authentifizierungsUeberpruefung = false
        return next()
    }

    let entschluesseltesToken
    try {
        // Verifizieren des Tokens und entschluesseln der Daten (z.B. Benutzername)
        entschluesseltesToken = jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (error) {
        // Wenn das Verifizieren fehlschlägt, ist der Benutzer nicht authentifiziert.
        req.authentifizierungsUeberpruefung = false
        return next()
    }

    if(!entschluesseltesToken) {
        // Wenn kein dekodiertes Token vorhanden ist, ist der Benutzer nicht authentifiziert.
        req.authentifizierungsUeberpruefung = false
        return next()
    }

    // Wenn alles erfolgreich war, ist der Benutzer authentifiziert und der Benutzername wird der Anfrage hinzugefügt.
    req.authentifizierungsUeberpruefung = true
    req.benutzername = entschluesseltesToken.benutzername
    next()
}
