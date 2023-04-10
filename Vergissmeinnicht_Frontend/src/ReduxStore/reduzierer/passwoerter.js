import { PASSWORT_HINZUFUEGEN, PASSWORT_LOESCHEN, PASSWOERTER_FESTLEGEN } from '../aktionsErzeuger/aktionsTypen'

// Der anfangsState enthält nur eine leere Liste.
const anfangsState = {
    liste: []
}

// Der Reduzierer nimmt den aktuellen State (oder den anfangsState) und eine Aktion entgegen und gibt den neuen State zurück.
const reduzierer = (state = anfangsState, aktion) => {
    // In diesem Switch-Block werden die verschiedenen Aktionstypen behandelt.
    switch (aktion.type) {

        // Der Aktionstyp "PASSWOERTER_FESTLEGEN" setzt den gesamten State auf eine neue Liste von Passwörtern.
        case PASSWOERTER_FESTLEGEN:
            return {
                ...state,
                liste: aktion.passwoerter
            }

        // Der Aktionstyp "PASSWORT_HINZUFUEGEN" fügt der Liste ein neues Passwort hinzu.
        case PASSWORT_HINZUFUEGEN:
            return {
                ...state,
                liste: [...state.liste, aktion.passwort]
            }

        // Der Aktionstyp PASSWORT_LOESCHEN entfernt ein Passwort aus der Liste.
        case PASSWORT_LOESCHEN:
            return {
                ...state,
                liste: state.liste.filter(t => t.id !== aktion.passwort.id)
            }

        // Wenn keiner der oben genannten Aktionstypen aufgerufen wird, gibt der Reduzierer einfach den aktuellen state zurück.
        default:
            return state
    }
}

// Zum Schluss wird der Reduzierer als Standard exportiert, sodass andere Module diesen importieren können.
export default reduzierer
