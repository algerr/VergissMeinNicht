// In dieser Datei werden die Aktionserzeuger-Funktionen für die Verwaltung der Modalfenster in Redux definiert.
// Durch die Verwendung der Aktionserzeuger-Funktionen wird die Verwaltung der Modalfenster in Redux zentralisiert und vereinfacht,
// da Aktionstypen und Aktionserzeuger eine gemeinsame Schnittstelle bereitstellen, um eine Aktion auszulösen.
// Anstatt jedes Mal manuell Aktionen zu erstellen, können diese Aktionserzeuger genutzt werden.
// So bleibt der Code übersichtlich und kann bei Fehlern besser instandgehalten werden.

// Zuerst werden die Aktionstypen, für die eine Aktion erzeugt werden soll, importiert.
import { ZENTRIERTES_MODALFENSTER_AUSBLENDEN, OBERES_MODALFENSTER_AUSBLENDEN, ZENTRIERTES_MODALFENSTER_ANZEIGEN, OBERES_MODALFENSTER_ANZEIGEN, SETZE_INHALT_FUER_ZENTRIERTES_MODALFENSTER, SETZE_INHALT_FUER_OBERES_MODALFENSTER } from './aktionsTypen'

// Mit dieser Funktionen, wird das obere Modalfenster angezeigt, da die Aktion "OBERES_MODALFENSTER_ANZEIGEN" ausgeführt wird.
export const oberesModalfensterAnzeigen = () => {
    return {
        type: OBERES_MODALFENSTER_ANZEIGEN,
    }
}

// Mit dieser Funktionen, wird das zentrierte Modalfenster angezeigt, da die Aktion "ZENTRIERTES_MODALFENSTER_ANZEIGEN" ausgeführt wird.
export const zentriertesModalfensterAnzeigen = () => {
    return {
        type: ZENTRIERTES_MODALFENSTER_ANZEIGEN,
    }
}

// Mit dieser Funktionen, wird das obere Modalfenster ausgeblendet, da die Aktion "OBERES_MODALFENSTER_AUSBLENDEN" ausgeführt wird.
export const oberesModalfensterAusblenden = () => {
    return {
        type: OBERES_MODALFENSTER_AUSBLENDEN,
    }
}

// Mit dieser Funktionen, wird das zentrierte Modalfenster ausgeblendet, da die Aktion "ZENTRIERTES_MODALFENSTER_AUSBLENDEN" ausgeführt wird.
export const zentriertesModalfensterAusblenden = () => {
    return {
        type: ZENTRIERTES_MODALFENSTER_AUSBLENDEN,
    }
}

// Mit dieser Funktionen, wird der Inhalt für das obere Modalfenster gesetzt, da die Aktion "SETZE_INHALT_FUER_OBERES_MODALFENSTER" ausgeführt wird.
// Der Inhalt besteht aus einem Titel im Header des Modalfensters, dem Inhalt im Body und den Buttons im Footer.
export const setzeInhaltFuerOberesModalfenster = (titel, inhalt, buttons) => {
    return {
        type: SETZE_INHALT_FUER_OBERES_MODALFENSTER,
        titel, inhalt, buttons
    }
}

// Mit dieser Funktionen, wird der Inhalt für das zentrierte Modalfenster gesetzt, da die Aktion "SETZE_INHALT_FUER_ZENTRIERTES_MODALFENSTER" ausgeführt wird.
// Der Inhalt besteht aus einem Titel im Header des Modalfensters, dem Inhalt im Body und den Buttons im Footer.
export const setzeInhaltFuerZentriertesModalfenster = (titel, inhalt, buttons) => {
    return {
        type: SETZE_INHALT_FUER_ZENTRIERTES_MODALFENSTER,
        titel, inhalt, buttons
    }
}