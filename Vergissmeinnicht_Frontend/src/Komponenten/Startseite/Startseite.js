import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { passwoerterFestlegen } from '../../ReduxStore/aktionsErzeuger/passwoerter'
import { passwoerterAbrufen } from '../../Hilfsfunktionen/server'
import { oberesModalfensterAnzeigen, setzeInhaltFuerOberesModalfenster } from '../../ReduxStore/aktionsErzeuger/modalFenster'
import Seitenleiste from '../Seitenleiste/Seitenleiste'
import Passwoerter from '../Passwoerter/Passwoerter'
import AccountEinstellungen from '../AccountEinstellungen/AccountEinstellungen'

class Startseite extends Component {

    // Nachdem die Komponente montiert wurde,
    componentDidMount = async () => {
        // wird auf das Token und die benötigten Aktionserzeuger zugegriffen.
        const { token, passwoerterFestlegen, setzeInhaltFuerOberesModalfenster } = this.props

        // Die Passwörter werden vom Server abgerufen.
        const result = await passwoerterAbrufen(token)

        // Wenn Passwörter vorhanden sind, werden sie im Redux-Store gespeichert.
        if (result.passwoerter) {
            passwoerterFestlegen(result.passwoerter)

        // Ansonsten wird die vom Server zurückgegebene Fehlermeldung in einem Modalfenster angezeigt.
        } else if (result.error) {
            setzeInhaltFuerOberesModalfenster("Fehler", result.error, [{ name: "Schließen", variant: "primary" }])
            oberesModalfensterAnzeigen()
        }
    }

    render() {
        return (
            <Seitenleiste>
                <Switch>
                    {/* Wenn /startseite besucht wird, wird automatisch auf die "Passwörter"-Seite umgeleitet. */}
                    <Redirect exact from="/startseite" to="/startseite/passwoerter" />
                    {/* Wenn /startseite/passwoerter besucht wird, wird die Passwoerter-Komponente gerendert. */}
                    <Route path="/startseite/passwoerter" component={Passwoerter} />
                    {/* Wenn /startseite/accounteinstellungen besucht wird, wird automatisch auf die AccountEinstellungen-Komponente gerendert. */}
                    <Route path="/startseite/accounteinstellungen" component={AccountEinstellungen} />
                    {/* Wenn kein passender Pfad gefunden wird, wird auf /404 umgeleitet. */}
                    <Redirect to="/404" />
                </Switch>
            </Seitenleiste>
        )
    }
}

// mapStateToProps ist eine Funktion, die den Redux-Store in Props konvertiert.
// In diesem Fall wird nur das Token benötigt und somit aus dem authentifizierung-Teil des Stores in Props konvertiert.
const mapStateToProps = state => {
    return {
        token: state.authentifizierung.token,
    }
}

// mapDispatchToProps ist eine Funktion, die Aktionserzeuger in Props konvertiert.
// Hier werden die passwoerterFestlegen-, setzeInhaltFuerOberesModalfenster- und oberesModalfensterAnzeigen-Aktionserzeuger in Props konvertiert.
const mapDispatchToProps = dispatch => {
    return {
        passwoerterFestlegen: (data) => dispatch(passwoerterFestlegen(data)),
        setzeInhaltFuerOberesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerOberesModalfenster(titel, inhalt, buttons)),
        oberesModalfensterAnzeigen: () => dispatch(oberesModalfensterAnzeigen())
    }
}

// Die Startseite-Komponente wird mit dem Redux-Store verbunden, indem mapStateToProps und mapDispatchToProps übergeben werden. 
// So kann die Komponente auf den Redux-Store zugreifen.
export default connect(mapStateToProps, mapDispatchToProps)(Startseite)

