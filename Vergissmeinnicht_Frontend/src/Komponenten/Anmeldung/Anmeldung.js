import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

import { anmeldung } from '../../Hilfsfunktionen/server'
import { istTokenAbgelaufen } from '../../Hilfsfunktionen/token'
import { authentifizierungsTokenFestlegen } from '../../ReduxStore/aktionsErzeuger/authentifizierung'
import { oberesModalfensterAnzeigen, setzeInhaltFuerOberesModalfenster } from '../../ReduxStore/aktionsErzeuger/modalFenster'

import './styles.css'

class Anmeldung extends Component {

    state = {
        eingabeAbgeschickt: false
    }

    // Die Methode "componentDidMount()" wird immer aufgerufen, nachdem die Komponente (der Anmeldescreen)
    // in den DOM eingefügt wurde. Hier wird nun geprüft, ob der Nutzer bereits angemeldet ist, bzw. ob das JWT-Token,
    // das im Redux-Store gespeichert ist, noch gültig ist.
    componentDidMount = () => {
        const { token, history } = this.props
        if (token && !istTokenAbgelaufen(token)) {
            // Wenn noch ein gültiges Token im Browser gespeichert ist, wird der Nutzer direkt auf 
            // den PasswortManager weitergeleitet.
            history.push("/startseite")
        }
    }

    // Der "Registrieren"-Button leitet zur Registrierung weiter.
    onRegistrierung = () => {
        const { history } = this.props
        history.push("/registrierung")
    }

    // Wenn der Nutzer den "Anmelden"-Button drückt,
    onSubmit = async (e) => {
        // wird die browsereigene Standardaktion unterbrochen.
        e.preventDefault()
        const { eingabeAbgeschickt } = this.state
        // Wenn der state "eingabeAbgeschickt" noch auf false steht, wird er nun,
        // da der Anmelde-Button ja gedrückt wurde, auf true gestellt. Das Formular wird ja jetzt abgeschickt.
        if (!eingabeAbgeschickt) {
            await this.setState({ eingabeAbgeschickt: true })

            // Die Eigenschaften "oberesModalfensterAnzeigen", "setzeInhaltFuerOberesModalfenster", "authentifizierungsTokenFestlegen" und "history" werden aus dem 
            // props-Objekt extrahiert und durch die Konstante eine Kurzschreibweise ermöglicht.
            // Statt auf "this.props.authentifizierungsTokenFestlegen()" zugreifen zu müssen, reicht nun auch einfach "authentifizierungsTokenFestlegen".
            // Dies macht den Code sehr viel lesbarer.
            const { oberesModalfensterAnzeigen, setzeInhaltFuerOberesModalfenster, authentifizierungsTokenFestlegen, history } = this.props

            // Für die Anmeldung werden der Benutzername und das Passwort des Nutzers benötigt.
            // Diese dürfen keine leeren Strings sein.
            if (this.benutzername.value !== "" && this.passwort.value !== "") {
                // Benutzername und Passwort werden an den Server geschickt.
                const Anmeldung = await anmeldung(this.benutzername.value, this.passwort.value)

                // Wenn der Server ein gültiges Token für den Nutzer zurückgibt,
                if (Anmeldung.token) {
                    // wird dieses Token als Authentifizierung im Redux-Store gespeichert.
                    authentifizierungsTokenFestlegen(Anmeldung.token)
                    // Der Nutzer wird zum PasswortManager weitergeleitet.
                    history.push("/startseite")
                // Wenn die Anmeldung jedoch fehlschlägt,
                } else if (Anmeldung.error) {
                    // wird ein modales Fenster im Vordergrund, oben auf der Seite, geöffnet, in dem die Fehlermeldung angezeigt wird.
                    setzeInhaltFuerOberesModalfenster("Fehler", Anmeldung.error, [{ name: "Schließen", variant: "primary" }])
                    oberesModalfensterAnzeigen()
                    // Da die Anmeldung fehlgeschlagen ist und der Nutzer sich somit erneut anmelden muss, wird der state "eingabeAbgeschickt" auf false gesetzt.
                    await this.setState({ eingabeAbgeschickt: false })
                }
            // Sollte der Nutzer es nicht geschafft haben, das Feld für den Benutzernamen und das Feld für das Passwort auszufüllen,
            // wird er mit diesem modalen Fenster noch einmal nett daran erinnert.
            } else {
                setzeInhaltFuerOberesModalfenster("Fehler", "Benutzername und Passwort müssen eingegeben werden!",
                    [{ name: "Schließen", variant: "primary" }])
                oberesModalfensterAnzeigen()
                // Auch hier wird der state auf false gesetzt.
                await this.setState({ eingabeAbgeschickt: false })
            }
        }
    }

    render() {
        // Der state "eingabeAbgeschickt" wird auch hier in der render()-Methode verwendet, um zu entscheiden, 
        // ob ein Lade-Spinner oder der Anmelde-Button angezeigt werden soll, 
        // je nachdem, ob das Formular bereits abgeschickt wurde oder nicht.
        const { eingabeAbgeschickt } = this.state
        return (
            // Das Anmeldeformular wird in einem Card-Element platziert und zentriert dargestellt.
            <div className="d-flex justify-content-center flex-fill align-items-center">
                <Card style={{ height: "fit-content" }} id="anmeldungsformular">
                    {/* Das Anmeldeformular ist in einer Card, was das Formular ein wenig vom Hintergrund abhebt. */}
                    <Card.Body>
                        {/* Titel des Anmeldeformulars*/}
                        <Card.Title>Anmeldung</Card.Title>
                        {/* Das Formular zur Anmeldung mit Benutzername und Passwort */}
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group as={Row} controlId="eingabeEmail">
                                <Form.Label column sm={2}>
                                    Benutzername
                                </Form.Label>
                                <Col sm={10}>
                                    {/* Eingabefeld für den Benutzernamen */}
                                    <Form.Control type="text" placeholder="Benutzername" ref={b => this.benutzername = b} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="eingabePasswort">
                                <Form.Label column sm={2}>
                                    Passwort
                                </Form.Label>
                                <Col sm={10}>
                                    {/* Eingabefeld für das Passwort */}
                                    <Form.Control type="password" placeholder="Passwort" ref={p => this.passwort = p} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 2 }}>
                                    {
                                        // Je nach dem, ob das Anmeldeformular abgeschickt wurde oder nicht, wird ein sich drehender Kreis (Lade-Spinner)
                                        // oder der Anmelde-Button angezeigt.
                                        eingabeAbgeschickt ? <Spinner animation="border" /> : <Button type="submit">Anmelden</Button>
                                    }
                                    {/* Button für die Registrierung. Beim Klick, wird der Nutzer auf das Registrierungsformular weitergeleitet. */}
                                    <Button variant="light" style={{ marginLeft: 20 }} onClick={this.onRegistrierung}>Registrieren</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

// Die Funktion mapStateToProps wird verwendet, um den Redux-Store mit den Props des React-Komponenten (Anmeldeformular) zu verbinden.
const mapStateToProps = state => {
    return {
        // Hier wird der Token aus dem Authentifizierungsteils des Stores extrahiert und als Prop an die Komponente übergeben.
        token: state.authentifizierung.token
    }
}

// Die Funktion mapDispatchToProps wird verwendet, um die Aktionserzeuger mit den Props der Komponente zu verbinden.
const mapDispatchToProps = dispatch => {
    return {
        // Hier wird der Action-Creator authentifizierungsTokenFestlegen, setzeInhaltFuerOberesModalfenster und oberesModalfensterAnzeigen an die Props setAuthToken, setzeInhaltFuerOberesModalfenster und oberesModalfensterAnzeigen gebunden.
        authentifizierungsTokenFestlegen: (token) => dispatch(authentifizierungsTokenFestlegen(token)),
        setzeInhaltFuerOberesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerOberesModalfenster(titel, inhalt, buttons)),
        oberesModalfensterAnzeigen: () => dispatch(oberesModalfensterAnzeigen())
    }
}

// Die Komponente (Anmeldeformular) wird mithilfe der connect-Funktion mit dem Redux-Store verbunden und exportiert.
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Anmeldung))