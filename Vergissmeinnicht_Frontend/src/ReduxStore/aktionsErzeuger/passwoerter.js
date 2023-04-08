// In dieser Datei werden die Aktionserzeuger-Funktionen für die Verwaltung der Passwörter in Redux definiert.
// Durch die Verwendung der Aktionserzeuger-Funktionen wird die Verwaltung der Modalfenster in Redux zentralisiert und vereinfacht,
// da Aktionstypen und Aktionserzeuger eine gemeinsame Schnittstelle bereitstellen, um eine Aktion auszulösen.
// Anstatt jedes Mal manuell Aktionen zu erstellen, können diese Aktionserzeuger genutzt werden.
// So bleibt der Code übersichtlich und kann bei Fehlern besser instandgehalten werden.

// Zuerst werden die Aktionstypen, für die eine Aktion erzeugt werden soll, importiert.
import { PASSWORT_HINZUFUEGEN, PASSWORT_LOESCHEN, PASSWOERTER_FESTLEGEN, PASSWORT_AKTUALISIEREN } from './aktionsTypen'

// Mit diesem Aktionserzeuger wird die Aktion zum Hinzufügen eines neuen Passwortes ausgeführt.
// Dabei wird ein Passwort als Parameter genommen und am Ende auch zurückgegeben.
export const passwortHinzufuegen = (passwort) => {
    return {
        type: PASSWORT_HINZUFUEGEN,
        passwort
    }
}

// Mit diesem Aktionserzeuger wird die Aktion zum Löschen eines Passwortes ausgeführt.
// Dabei wird ein Passwort als Parameter genommen und am Ende auch zurückgegeben.
export const passwortLoeschen = (passwort) => {
    return {
        type: PASSWORT_LOESCHEN,
        passwort
    }
}

// Mit diesem Aktionserzeuger wird die Aktion zum Festlegen der Passwörter ausgeführt.
// Dabei werden mehrere Passwörter als Parameter genommen und am Ende auch zurückgegeben.
export const passwoerterFestlegen = (passwoerter) => {
    return {
        type: PASSWOERTER_FESTLEGEN,
        passwoerter
    }
}

// Mit diesem Aktionserzeuger wird die Aktion zur Aktualisierung eines Passwortes ausgeführt.
// Dabei wird ein Passwort als Parameter genommen und am Ende auch zurückgegeben.
export const passwortAktualisieren = (passwort) => {
    return {
        type: PASSWORT_AKTUALISIEREN,
        passwort
    }
}