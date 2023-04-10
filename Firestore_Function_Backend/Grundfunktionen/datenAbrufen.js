// Diese Funktion 'benutzerDatenAbrufen' erhält ein Benutzerobjekt als Parameter und gibt ein neues Objekt 
// mit den gespeicherten Daten des Benutzers aus der Datenbank zurück.
exports.benutzerDatenAbrufen = (benutzer) => {
    return {
        benutzername: benutzer.benutzername,
        passwort: benutzer.passwort,
        email: benutzer.email
    }
}

// Diese Funktion 'passwortDatenAbrufen' erhält ein Passwortobjekt als Parameter und gibt ein neues Objekt 
// mit den gespeicherten Daten des Passwortes aus der Datenbank zurück.
exports.passwortDatenAbrufen = (passwort) => {
    return {
        benutzername: passwort.benutzername,
        beschreibung: passwort.beschreibung,
        verschluesseltesPasswort: passwort.verschluesseltesPasswort,
        sicherheitswert: passwort.sicherheitswert,
    }
}
