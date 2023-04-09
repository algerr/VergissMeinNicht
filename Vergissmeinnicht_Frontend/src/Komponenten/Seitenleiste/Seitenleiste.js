import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'

import './styles.css'
import { authentifizierungsTokenFestlegen } from '../../ReduxStore/aktionsErzeuger/authentifizierung'
import { passwoerterFestlegen } from '../../ReduxStore/aktionsErzeuger/passwoerter'

class Seitenleiste extends Component {

    // Hier wird der Lifecycle-Hook componentDidMount() verwendet, um jQuery aufzurufen, nachdem die Komponente in das DOM eingefügt wurde.
    componentDidMount = () => {
        // Der Click-Event-Handler wird für das Element mit der ID "menu-toggle" registriert.
        $("#menu-toggle").click(function (e) {
            // Wenn das Element geklickt wird, wird das Standard-Click-Event verhindert.
            e.preventDefault()
            // Die toggleClass() Methode von jQuery wird aufgerufen, um das Element mit der ID "wrapper" ein- oder auszublenden.
            // Wenn das Element die CSS-Klasse "toggled" trägt, wird sie entfernt. Ansonsten wird sie diesem hinzugefügt.
            $("#wrapper").toggleClass("toggled")
        })

        // Wenn der Benutzer scrollt, passt diese Funktion die Position des Elements mit der ID "leisten-wrapper" an,
        // um es immer sichtbar zu halten.
        window.onscroll = () => {
            $("#leisten-wrapper").css("top", window.pageYOffset)
        }
    }

    // Wenn der Nutzer sich über denn Button in der oberen rechten Ecke abmeldet,
    onAbmelden = () => {
        // werden diese beiden Eigenschaften von den props destrukturiert.
        const { authentifizierungsTokenFestlegen, passwoerterFestlegen} = this.props
        // So lässt sich das Token aus dem Redux-Store entfernen, sodass der Nutzer nicht wieder angemeldet wird.
        authentifizierungsTokenFestlegen(null)
        // Und die Liste der angezeigten Passwörter kann geleert werden.
        passwoerterFestlegen([])
    }

    render() {
        return (
            <div className="flex-fill d-flex" id="wrapper">
                {/* Seitenleiste */}
                <div className="border-right bg-light" id="leisten-wrapper">
                    <div className="leisten-heading">VergissMeinNicht</div>
                    <div className="list-group-flush list-group">
                        {/* Link zum Passwort Manager */}
                        <Link to="/startseite/passwortmanager" className="bg-light list-group-item list-group-item-action">Passwort Manager</Link>
                        {/* Link zu den Accounteinstellungen */}
                        <Link to="/startseite/accounteinstellungen" className="bg-light list-group-item list-group-item-action">Accounteinstellungen</Link>
                    </div>
                </div>

                {/* Hauptinhalt */}
                <div id="inhalt-wrapper">
                    {/* Navigation Bar */}
                    <nav className="navbar-expand-lg navbar-light navbar border-bottom bg-light">
                        {/* Button zum Anzeigen der Seitenleiste */}
                        <Button id="menu-toggle" className="btn btn-primary" variant="info">Leiste anzeigen</Button>
                        {/* Button zum Öffnen der Navigation Bar auf Mobilgeräten, denn wir denken natürlich Cross-Plattform. */}
                        <button type="button" data-toggle="collapse" className="navbar-toggler" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {/* Navigation Bar Inhalt */}
                        <div className="navbar-collapse collapse" id="navbarSupportedContent">
                            <ul className="mt-2 ml-auto navbar-nav mt-lg-0">
                                <li className="nav-item">
                                    {/* Button zum Abmelden */}
                                    <Link to="/anmeldung" className="nav-link" onClick={this.onAbmelden}>Abmelden</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    {/* Der Container nimmt immere die volle Breite des Bildschirms ein. */}
                    <div className="container-fluid">
                        {/* Der Inhalt der Komponente wird in diesem Container gerendert. */}
                        {this.props.children}
                    </div>
                </div>

            </div>
        )
    }
}

// Die Funktion mapStateToProps nimmt das Authentifizierungstoken aus dem Redux-Store 
// und übergibt es an die Komponente.
const mapStateToProps = state => {
    return {
        token: state.authentifizierung.token
    }
}

// Hier wird die Seitenleisten-Komponente mit Redux verbunden, indem mapStateToProps und mapDispatchToProps
// als Parameter an die connect-Funktion übergeben werden, die eine neue Komponente zurückgibt,
// die mit dem Redux-Store verbunden ist.
const mapDispatchToProps = dispatch => {
    return {
        authentifizierungsTokenFestlegen: (token) => dispatch(authentifizierungsTokenFestlegen(token)),
        passwoerterFestlegen: (data) => dispatch(passwoerterFestlegen(data))
    }
}

// Hier wird die Seitenleisten-Komponente mit Redux verbunden, indem mapStateToProps und mapDispatchToProps
// als Parameter an die connect-Funktion übergeben werden, die eine neue Komponente zurückgibt,
// die mit dem Redux-Store verbunden ist.
export default connect(mapStateToProps, mapDispatchToProps)(Seitenleiste)