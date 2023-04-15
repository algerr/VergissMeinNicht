import React, { Component } from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

import { passwortAendern } from '../../Hilfsfunktionen/server'
import { setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen, zentriertesModalfensterAusblenden } from '../../ReduxStore/aktionsErzeuger/modalFenster'
import { authentifizierungsTokenFestlegen } from '../../ReduxStore/aktionsErzeuger/authentifizierung'

class PasswortAendern extends Component {

    // Hier wird ein React State genutzt, um bestimmen zu können, ob der Button zum
    // Sichern des neuen Passworts noch da ist, oder ob er gegen ein Ladesymbol getauscht werden soll.
    state = {
        ladesymbol: false
    }

    // Wenn der Nutzer auf den Speichern-Button klickt,
    onSpeichern = async (e) => {
        // wird die browsereigene, standardmäßige Sendung des Formulars verhindert.
        e.preventDefault()
        const { ladesymbol } = this.state
        if (ladesymbol) return
        // Der Ladesymbol-State wird auf "true" gesetzt, da der Nutzer, den Button angeklickt hat.
        this.setState({ ladesymbol: true })
        const { token, setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen, authentifizierungsTokenFestlegen, zentriertesModalfensterAusblenden } = this.props
        const PasswortAenderung = await passwortAendern(token, this.altesPasswort.value, this.neuesPasswort.value)
        if (PasswortAenderung.error) {
            setzeInhaltFuerOberesModalfenster("Fehler", PasswortAenderung.error,
                [{ name: "Schließen", variant: "primary" }])
            oberesModalfensterAnzeigen()
        } else if (PasswortAenderung.status) {
            setzeInhaltFuerOberesModalfenster("Erfolgreiche Passwortänderung", "Das Passwort wurde erfolgreich geändert!",
                [{ name: "Schließen", variant: "primary" }])
            oberesModalfensterAnzeigen()
            // Nach einer Passwortänderung soll der Nutzer sich wieder neu anmelden.
            // Dadurch merkt er sich gleich das neue Passwort besser.
            authentifizierungsTokenFestlegen(null)
        }
        // Daraufhin verschwindet das modale Fenster und der State des Ladesymbols wird wieder standardmäßig auf "false"
        // gesetzt, um nicht ausversehen Änderungen in der Datenbank vorzunehmen, auch wenn das durch die zusätzlichen Sicherheits-
        // vorkehrungen sehr unwahrscheinlich ist.
        zentriertesModalfensterAusblenden()
        this.setState({ ladesymbol: false })
    }
    // Definition der "render"-Funktion, die das Aussehen der Komponente definiert.
    render() {
        // State des Ladesymbols aus dem Komponentenstate extrahieren.
        const { ladesymbol } = this.state
        // Der Inhalt der Komponente wird als HTML-Code zurückgegeben.
        return (
            <Form>
                {/* Eingabefeld für das alte Passwort */}
                <Form.Group controlId="altesPasswort">
                    <Form.Label>Altes Passwort</Form.Label>
                    {/* Eingabefeld für das alte Passwort mit einem Referenz-Callback zum Speichern des Eingabefeld-Elements im Komponentenstate */}
                    <Form.Control type="password" placeholder="Altes Passwort" ref={elem => this.altesPasswort = elem} />
                </Form.Group>
                {/* Eingabefeld für das neue Passwort */}
                <Form.Group controlId="neuesPasswort">
                    <Form.Label>Neues Passwort</Form.Label>
                    {/* Eingabefeld für das neue Passwort mit einem Referenz-Callback zum Speichern des Eingabefeld-Elements im Komponentenstate */}
                    <Form.Control type="password" placeholder="Neues Passwort" ref={elem => this.neuesPasswort = elem} />
                </Form.Group>
                {/* Je nach State des Ladesymbols, wird entweder ein Ladesymbol (true) oder der Speichern-Button (false) gerendert. */}
                {/* Dies nennt sich bedingtes Rendering. */}
                {
                    ladesymbol ? <Spinner animation="border" /> : <Button variant="primary" type="submit" onClick={this.onSpeichern}>Speichern</Button>
                }
            </Form>
        )
    }
}

// mapStateToProps verbindet den Redux-Store des Browsers mit den Props dieses Komponenten.
// Das Objekt, welches zurückgegeben wird, hat die Form: {Prop-Name: Store-State}
// Da es sich in diesem
const mapStateToProps = state => {
    return {
        token: state.authentifizierung.token
    }
}

// mapDispatchToProps verbindet das Redux-Store mit den Aktionserzeugern des Stores.
// Das Objekt, welches zurückgegeben wird, hat die Form: {Aktionserzeuger: dispatch(Aktion)}
const mapDispatchToProps = dispatch => {
    return {
        zentriertesModalfensterAusblenden: () => dispatch(zentriertesModalfensterAusblenden()),
        setzeInhaltFuerOberesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerOberesModalfenster(titel, inhalt, buttons)),
        oberesModalfensterAnzeigen: () => dispatch(oberesModalfensterAnzeigen()),
        authentifizierungsTokenFestlegen: (token) => dispatch(authentifizierungsTokenFestlegen(token))
    }
}


// Der HOK (Higher-Order Komponent) 'connect' verbindet den Redux-Store mit dem Komponenten 'PasswortAendern'.
// Der Store-State und die Aktionserzeuger werden als Props an den Komponenten weitergegeben.
export default connect(mapStateToProps, mapDispatchToProps)(PasswortAendern)