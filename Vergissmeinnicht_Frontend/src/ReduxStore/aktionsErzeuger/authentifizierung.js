// Der Aktionstyp, der zur Identifikation der Aktion in der Redux-Anwendung verwendet wird, wird importiert.
import { AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN } from './aktionsTypen'

// Hier wird die Funktion authentifizierungsTokenFestlegen definiert, die einen Token entgegennimmt und eine Aktion zurückgibt.
export const authentifizierungsTokenFestlegen = (token) => {
    return {
        // Der Aktionstyp "AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN" wird zugewiesen, um die Aktion innerhalb der Redux-Anwendung eindeutig zu identifizieren.
        type: AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN,
        // Hier wird das Token als Datenpaket der Aktion übergeben. 
        // Wenn das Token existiert, also nicht null ist, wird noch der Zusatz "Bearer " angefügt.
        // JWT liegen im Bearer-Token-Schema vor, was durch diesen Zusatz im Authorisierungs-Header von Anfragen dem Server direkt mitgeteilt wird.
        token: token ? "Bearer " + token : token
    }
}
