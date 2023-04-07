// Diese Funktion 'benutzerDatenAbrufen' erhält ein Benutzerobjekt als Parameter und gibt ein neues Objekt 
// mit den gespeicherten Daten der Benutzer aus der Datenbank zurück.
exports.benutzerDatenAbrufen = (benutzer) => {
    return {
        benutzername: benutzer.benutzername,
        passwort: benutzer.passwort,
        email: benutzer.email
    }
}

// Diese Funktion 'passwortDaten' erhält ein Passwortobjekt als Parameter und gibt ein neues Objekt 
// mit den gespeicherten Daten des Passwortes aus der Datenbank zurück.
exports.passwortDatenAbrufen = (passwort) => {
    return {
        benutzername: passwort.benutzername,
        beschreibung: passwort.description,
        passwort_verschluesselt: passwort.encryptedPass,
        nonce: passwort.nonce,
    }
}