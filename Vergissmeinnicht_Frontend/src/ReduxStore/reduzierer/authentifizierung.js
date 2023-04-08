

import { AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN } from '../aktionsErzeuger/aktionsTypen'

// Zuerst wird der Anfangszustand des Reduzierers definiert.
const anfangsZustand = {
    token: null
}

const reduzierer = (zustand = anfangsZustand, aktion) => {
    // Da dieser Reduzierer sich nur um die Authentifizierung kümmert, wird überprüft, welche Aktion ausgeführt werden soll.
    switch (aktion.type) {
        // Wenn der Aktionstyp AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN lautet, wird ein neuer Zustand zurückgegeben, 
        // bei dem das Token-Attribut auf das Token in der Aktion gesetzt wird.
        // So wird das Token im Redux-Store aktualisiert.
        case AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN:
            return {
                ...zustand,
                token: aktion.token
            }

        // Wenn die Aktion "AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN" nicht erkannt wird, wird lediglich der aktuelle Zustand zurückgegeben.
        default:
            return zustand
    }
}

// Zum Schluss wird der Reduzierer als Standard exportiert, sodass andere Module diesen importieren können.
export default reduzierer