// Die benötigten React-Komponenten und Module werden importiert.
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

// Die verschiedenen Komponenten der Anwendung werden importiert.
import BenutzerAuthentifizieren from './Komponenten/BenutzerAuthentifizieren/BenutzerAuthentifizieren'
import Anmeldung from './Komponenten/Anmeldung/Anmeldung'
import Registrierung from './Komponenten/Registrierung/Registrierung'
import Startseite from './Komponenten/Startseite/Startseite'
import NichtGefunden from './Komponenten/RoutenError/NichtGefunden'
import OberesModalfenster from './Komponenten/OberesModalfenster/OberesModalfenster'
import ZentriertesModalfenster from './Komponenten/ZentriertesModalfenster/ZentriertesModalfenster'
import reduxStore from './ReduxStore/reduxStore'

// Der Redux Store wird für die Anwendung erstellt.
const store = reduxStore()

class App extends Component {
    render() {
        // Der Inhalt der App-Komponente wird als HTML-Code zurückgegeben.
        return (
            // Der Redux-Store wird als Provider für die gesamte Anwendung verfügbar gemacht.
            // Alle Komponenten können somit auf ihn zugreifen können, um den Zustand der Anwendung zu aktualisieren oder zu lesen.
            <Provider store={store}>
                {/* Die Modalfenster werden gerendert. Ob sie sichtbar sind und wie sie aussehen wird durch den State des oberen und zentrierten Modalfensters entschieden. */}
                <OberesModalfenster />
                <ZentriertesModalfenster />
                {/* Die Router-Komponente, die die Routen der Anwendung verwaltet, wird definiert. */}
                <Router>
                    <Switch>
                        {/* Beim Standardpfad wird die Anmeldungskomponente gerendert. */}
                        <Route exact path="/" component={Anmeldung} />
                        {/* Bei /anmeldung wird die Anmeldungskomponente gerendert.*/}
                        <Route exact path="/anmeldung" component={Anmeldung} />
                        {/* Bei /registrierung wird die Registrierungskomponente gerendert. */}
                        <Route exact path="/registrierung" component={Registrierung} />
                        {/* Bei /startseite wird die Startseite-Komponente gerendert. */}
                        <BenutzerAuthentifizieren path="/startseite" component={Startseite} />
                        {/* Bei /404 wird die 404-Fehlerseite-Komponente gerendert. */}
                        <Route exact path="/404" component={NichtGefunden} />
                        {/* Wenn keine passende Route gefunden wird, wird auf die 404-Fehlerseite umgeleitet. */}
                        <Redirect to="/404" />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

// Die App-Komponente wird als Standard exportiert, sodass diese in der index.js importiert werden kann.
export default App
