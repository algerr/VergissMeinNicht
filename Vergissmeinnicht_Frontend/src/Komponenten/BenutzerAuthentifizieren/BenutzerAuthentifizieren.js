import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// Um das Token überprüfen zu können, muss sichergestellt werden, dass dieses noch gültig ist.
import { istTokenAbgelaufen } from '../../Hilfsfunktionen/token'

// Mit dieser Komponente wird sichergestellt, dass der Nutzer authentifiziert ist, bevor er auf bestimmte Seiten zugreifen kann.
const BenutzerAuthentifizieren = (props) => {
    // Um die Authentifizerung des Nutzers zu überprüfen, wird das Token benötigt.
    const { token } = props

    // Wenn ein Token vorhanden und nicht abgelaufen ist,
    if (token && !istTokenAbgelaufen(token)) {
        // wird die Route, die der Nutzer aufgerufen hat, angezeigt.
        return (<Route {...props} />)
    }

    // Ansonsten wird der Nutzer zur Anmeldung weitergeleitet.
    return (<Redirect to="/anmeldung" />)
}

// Durch die Funktion mapStateToProps kann der State des Tokens aus dem Redux-Store extrahiert werden.
const mapStateToProps = state => {
    return {
        token: state.authentifizierung.token
    }
}

// Um auf den Redux-Store zugreifen zu können wird die Komponente 
export default connect(mapStateToProps)(BenutzerAuthentifizieren)