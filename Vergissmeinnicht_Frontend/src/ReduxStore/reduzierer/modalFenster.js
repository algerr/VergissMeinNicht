import { OBERES_MODALFENSTER_ANZEIGEN, ZENTRIERTES_MODALFENSTER_ANZEIGEN, OBERES_MODALFENSTER_AUSBLENDEN, ZENTRIERTES_MODALFENSTER_AUSBLENDEN, SETZE_INHALT_FUER_OBERES_MODALFENSTER, SETZE_INHALT_FUER_ZENTRIERTES_MODALFENSTER } from '../aktionsErzeuger/aktionsTypen'

const anfangsZustand = {
    oberesModalfenster: {
        gezeigt: false,
        titel: null,
        inhalt: null,
        buttons: null
    },
    zentriertesModalfenster: {
        gezeigt: false,
        titel: null,
        inhalt: null,
        buttons: null
    }
}

const reduzierer = (zustand = anfangsZustand, aktion) => {

    // In diesem Switch-Block werden die verschiedenen Aktionstypen behandelt.
    switch (aktion.type) {
        // Wenn der Aktionstyp OBERES_MODALFENSTER_ANZEIGEN lautet, wird ein neuer Zustand zurückgegeben, 
        // bei dem das Attribut "gezeigt" von oberesModalfenster auf "true" gesetzt wird.
        case OBERES_MODALFENSTER_ANZEIGEN:
            return {
                ...zustand,
                oberesModalfenster: {
                    ...zustand.oberesModalfenster,
                    gezeigt: true
                }
            }

        // Wenn der Aktionstyp OBERES_MODALFENSTER_AUSBLENDEN lautet, wird ein neuer Zustand zurückgegeben, 
        // bei dem das Attribut "gezeigt" von oberesModalfenster auf "false" gesetzt wird.
        case OBERES_MODALFENSTER_AUSBLENDEN:
            return {
                ...zustand,
                oberesModalfenster: {
                    ...zustand.oberesModalfenster,
                    gezeigt: false
                }
            }

        // Wenn der Aktionstyp SETZE_INHALT_FUER_OBERES_MODALFENSTER lautet, wird ein neuer Zustand zurückgegeben, 
        // bei dem die Attribute "titel", "inhalt" und "buttons" von oberesModalfenster auf die entsprechenden Werte aus der Aktion gesetzt werden.
        case SETZE_INHALT_FUER_OBERES_MODALFENSTER:
            return {
                ...zustand,
                oberesModalfenster: {
                    ...zustand.oberesModalfenster,
                    titel: aktion.titel,
                    inhalt: aktion.inhalt,
                    buttons: aktion.buttons
                }
            }

        // Wenn der Aktionstyp ZENTRIERTES_MODALFENSTER_ANZEIGEN lautet, wird ein neuer Zustand zurückgegeben, 
        // bei dem das Attribut "gezeigt" von zentriertesModalfenster auf "true" gesetzt wird.
        case ZENTRIERTES_MODALFENSTER_ANZEIGEN:
            return {
                ...zustand,
                zentriertesModalfenster: {
                    ...zustand.zentriertesModalfenster,
                    gezeigt: true
                }
            }

        // Wenn der Aktionstyp ZENTRIERTES_MODALFENSTER_ANZEIGEN lautet, wird ein neuer Zustand zurückgegeben, 
        // bei dem das Attribut "gezeigt" von zentriertesModalfenster auf "true" gesetzt wird.
        case ZENTRIERTES_MODALFENSTER_AUSBLENDEN:
            return {
                ...zustand,
                zentriertesModalfenster: {
                    ...zustand.zentriertesModalfenster,
                    gezeigt: false
                }
            }

        // Wenn der Aktionstyp SETZE_INHALT_FUER_OBERES_MODALFENSTER lautet, wird ein neuer Zustand zurückgegeben, 
        // bei dem die Attribute "titel", "inhalt" und "buttons" von zentriertesModalfenster auf die entsprechenden Werte aus der Aktion gesetzt werden.
        case SETZE_INHALT_FUER_ZENTRIERTES_MODALFENSTER:
            return {
                ...zustand,
                zentriertesModalfenster: {
                    ...zustand.zentriertesModalfenster,
                    titel: aktion.titel,
                    inhalt: aktion.inhalt,
                    buttons: aktion.buttons
                }
            }

        // Wenn keiner der oben genannten Aktionstypen erkannt wird, wird der aktuelle Zustand zurückgegeben.
        default:
            return zustand
    }
}

// Zum Schluss wird der Reduzierer als Standard exportiert, sodass andere Module diesen importieren können.
export default reduzierer