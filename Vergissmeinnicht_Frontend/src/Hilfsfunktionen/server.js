// Backend (Server) URL
const Backend = "https://us-central1-forgetmynot-2f796.cloudfunctions.net/backend"

// In der Anmelde-Funktion werden Benutzername und Passwort geprüft.
export const anmeldung = async (benutzername, passwort) => {
    try {
        // POST-Anfrage wird an den Anmeldungs-Endpunkt des Servers gesendet.
        const ergebnis = await fetch(Backend + "/authentifizierung/anmeldung", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ benutzername, passwort })
        })

        // Da der Server mit als Format JSON verwendet, wird die Serverantwort als JSON-Objekt empfangen.
        const serverAntwort = await ergebnis.json()

        // Wenn der Server den Status "1" zurückgibt, wird das Token zurückgegeben.
        if (serverAntwort.status === 1) {
            return { token: serverAntwort.token }
        }

        // Wenn der Benutzername und das Passwort falsch sind, wird eine Fehlermeldung zurückgegeben.
        return { error: serverAntwort.message }
    } catch (error) {
        // Wenn es einen Fehler bei der Ausführung der Funktion gibt, wird eine Fehlermeldung zurückgegeben.
        return { error: "Fehler beim Einloggen!" }
    }
}

// Mit dieser Funktion werden die Passwörter eines Benutzers abgerufen.
export const passwoerterAbrufen = async (token) => {
    try {
        // Eine GET-Anfrage wird an den Passwort-Endpunkt des Servers gesendet.
        const ergebnis = await fetch(Backend + "/passwort", {
            method: "get",
            headers: {
                'Authorization': token
            }
        })

        // Da der Server mit als Format JSON verwendet, wird die Serverantwort als JSON-Objekt empfangen.
        const serverAntwort = await ergebnis.json()

        // Wenn der Server den Status "1" zurückgibt, wird ein Objekt mit dem Array von Passwörtern zurückgegeben
        if (serverAntwort.status === 1) {
            return { passwoerter: serverAntwort.passwoerter }
        }

        // Wenn die Serverantwort negativ ist, wird eine Fehlermeldung zurückgegeben.
        return { error: serverAntwort.message }
    } catch (error) {
        // Wenn es einen Fehler bei der Ausführung der Funktion gibt, wird eine Fehlermeldung zurückgegeben.
        return { error: "Fehler beim Abrufen der Passwörter!" }
    }
}

// Mit dieser Funktion kann ein Passwort zum Server hinzugefügt werden.
export const passwortZumServerHinzufuegen = async (token, beschreibung, verschluesseltesPasswort, sicherheitswert) => {
    try {
        const ergebnis = await fetch(Backend + "/passwort", {
            // POST-Anfrage wird an den Passwort-Endpunkt des Server gesendet.
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ beschreibung, verschluesseltesPasswort, sicherheitswert })
        })

        // Da der Server mit als Format JSON verwendet, wird die Serverantwort als JSON-Objekt empfangen.
        const serverAntwort = await ergebnis.json()
        // Wenn der Server den Status "1" zurückgibt, wird ein Objekt mit dem neuen Passwort zurückgegeben.
        if (serverAntwort.status === 1) {
            return { passwort: serverAntwort.passwort }
        }

        // Wenn die Serverantwort negativ ist, wird eine Fehlermeldung zurückgegeben.
        return { error: serverAntwort.message }
    } catch (error) {
        // Wenn es einen Fehler bei der Ausführung der Funktion gibt, wird eine Fehlermeldung zurückgegeben.
        return { error: "Fehler beim Hinzufügen des Passwortes!" }
    }
}

// Mit dieser Funktion wird ein Passwort vom Server gelöscht.
export const passwortVomServerLoeschen = async (token, passwortId) => {
    try {
        const ergebnis = await fetch(Backend + `/passwort/${passwortId}`, {
            // Eine DELETE-Anfrage wird mit der PasswortId an den Passwort-Endpunkt des Servers gesendet.
            method: "delete",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        // Da der Server mit als Format JSON verwendet, wird die Serverantwort als JSON-Objekt empfangen.
        const serverAntwort = await ergebnis.json()

        // Wenn der Server den Status "1" zurückgibt, wird der Status "true" zurückgegeben. (Das Passwort wurde erfolgreich gelöscht)
        if (serverAntwort.status === 1) {
            return { status: true }
        }

        // Wenn die Serverantwort negativ ist, wird eine Fehlermeldung zurückgegeben.
        return { error: serverAntwort.message }
    } catch (error) {
        // Wenn es einen Fehler bei der Ausführung der Funktion gibt, wird eine Fehlermeldung zurückgegeben.
        return { error: "Fehler beim Löschen des Passwortes!" }
    }
}

// Mit dieser Funktion kann sich ein Benutzer registrieren.
export const accountRegistrieren = async (benutzername, passwort, email) => {
    try {
        const ergebnis = await fetch(Backend + "/authentifizierung/registrierung", {
            // Eine POST-Anfrage wird an den Registrierungs-Endpunkt des Servers gesendet.
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                benutzername, passwort, email
            })
        })

        // Da der Server mit als Format JSON verwendet, wird die Serverantwort als JSON-Objekt empfangen.
        const serverAntwort = await ergebnis.json()

        // Wenn der Server den Status "1" zurückgibt, wird der Status "true" zurückgegeben. (Der Account wurde erfolgreich registriert)
        if (serverAntwort.status === 1) {
            return { status: true }
        }

        // Wenn die Serverantwort negativ ist, wird eine Fehlermeldung zurückgegeben.
        return { error: serverAntwort.message }
    } catch (error) {
        // Wenn es einen Fehler bei der Ausführung der Funktion gibt, wird eine Fehlermeldung zurückgegeben.
        return { error: "Fehler bei der Registrierung!" }
    }
}

// Mit dieser Funktion kann die Email eines Accounts aktualisiert werden.
export const emailAktualisieren = async (token, email) => {
    try {
        const ergebnis = await fetch(Backend + "/authentifizierung/emailAktualisieren", {
            // Eine POST-Anfrage wird an den Emailaktualisierungs-Endpunkt des Servers gesendet.
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ email })
        })

        // Da der Server mit als Format JSON verwendet, wird die Serverantwort als JSON-Objekt empfangen.
        const serverAntwort = await ergebnis.json()

        if (serverAntwort.status === 1) {
            return { token: serverAntwort.token }
        }

        // Wenn die Serverantwort negativ ist, wird eine Fehlermeldung zurückgegeben.
        return { error: serverAntwort.message }
    } catch (error) {
        // Wenn es einen Fehler bei der Ausführung der Funktion gibt, wird eine Fehlermeldung zurückgegeben.
        return { error: "Fehler bei der Aktualisierung der Emailadresse!" }
    }
}

// Mit dieser Funktion kann das Passwort eines Accounts geändert werden.
export const passwortAendern = async (token, altesPasswort, neuesPasswort) => {
    try {
        const ergebnis = await fetch(Backend + "/authentifizierung/passwortAendern", {
            // Eine POST-Anfrage wird an den PasswortÄnderungs-Endpunkt des Servers gesendet.
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ altesPasswort, neuesPasswort })
        })

        // Da der Server mit als Format JSON verwendet, wird die Serverantwort als JSON-Objekt empfangen.
        const serverAntwort = await ergebnis.json()

        if (serverAntwort.status === 1) {
            return { status: true }
        }

        // Wenn die Serverantwort negativ ist, wird eine Fehlermeldung zurückgegeben.
        return { error: serverAntwort.message }
    } catch (error) {
        // Wenn es einen Fehler bei der Ausführung der Funktion gibt, wird eine Fehlermeldung zurückgegeben.
        return { error: "Fehler beim Ändern des Passwortes!" }
    }
}

// Mit dieser Funktion kann ein Account vom Server gelöscht werden.
export const accountVomServerLoeschen = async (token) => {
    try {
        const ergebnis = await fetch(Backend + "/authentifizierung/accountLoeschen", {
            // Eine POST-Anfrage wird an den AccountLöschen-Endpunkt des Servers gesendet.
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        // Da der Server mit als Format JSON verwendet, wird die Serverantwort als JSON-Objekt empfangen.
        const serverAntwort = await ergebnis.json()

        // Wenn der Server den Status "1" zurückgibt, wird der Status "true" zurückgegeben. (Der Account wurde erfolgreich gelöscht)
        if (serverAntwort.status === 1) {
            return { status: true }
        }

        // Wenn die Serverantwort negativ ist, wird eine Fehlermeldung zurückgegeben.
        return { error: serverAntwort.message }
    } catch (error) {
        // Wenn es einen Fehler bei der Ausführung der Funktion gibt, wird eine Fehlermeldung zurückgegeben.
        return { error: "Fehler beim Löschen des Accounts!" }
    }
}