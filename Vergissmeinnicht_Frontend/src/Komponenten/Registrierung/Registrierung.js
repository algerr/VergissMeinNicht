import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

// Import der Funktion, die die Registrierung auf dem Server durchführt.
import { accountRegistrieren } from '../../Hilfsfunktionen/server'
// Import der Funktion, die den Ablauf des Tokens prüft.
import { istTokenAbgelaufen } from '../../Hilfsfunktionen/token'
// Import von Redux Aktionserzeugern für die modalen Fenster.
import { oberesModalfensterAnzeigen, setzeInhaltFuerOberesModalfenster } from '../../ReduxStore/aktionsErzeuger/modalFenster'

import './styles.css'

class Registrierung extends Component {
    state = {
        eingabeAbgeschickt: false
    }

    componentDidMount = () => {
        // Wenn es bereits einen Token gibt und er nicht abgelaufen ist, wird der Benutzer auf den Passwortmanager weitergeleitet.
        const { token, history } = this.props
        if (token && !istTokenAbgelaufen(token)) {
            history.push("/startseite")
        }
    }

    // Wenn der Benutzer auf den "Anmelden"-Button klickt, wird er auf das Anmeldeformular weitergeleitet.
    onAnmeldung = () => {
        const { history } = this.props
        history.push("/anmeldung")
    }

    // Wenn der Nutzer auf den "Registrieren"-Button klickt,
    onSubmit = async (e) => {
        // wird das browsereigene Standard-Verhalten der Schaltfläche des 
        // "Registrieren"-Buttons verhindert.
        e.preventDefault()
        const { eingabeAbgeschickt } = this.state
        // Wenn das Formular noch nicht abgeschickt wurde, wird der state aktualisiert,
        // da der Registrierungsprozess nun im Gange ist.
        if (!eingabeAbgeschickt) {
            await this.setState({ eingabeAbgeschickt: true })
            // Benutzername, Passwort und Email werden zur Registrierung an den Server geschickt.
            const { oberesModalfensterAnzeigen, setzeInhaltFuerOberesModalfenster, history } = this.props
            // Wenn der Server als Antwort "status: true" zurückgibt, war die Registrierung erfolgreich.
            if (this.benutzername.value !== "" && this.passwort.value !== "") {
                const Registrierung = await accountRegistrieren(this.benutzername.value, this.passwort.value, this.email.value)
                if (Registrierung.status) {
                    // Das wird dem Nutzer über ein modales Fenster gezeigt.
                    setzeInhaltFuerOberesModalfenster("Erfolgreiche Registrierung",
                        `Der Benutzer ${this.benutzername.value} wurde erfolgreich registriert!`,
                        [
                            { name: "Schließen", variant: "primary" }
                        ])
                    oberesModalfensterAnzeigen()
                    // Der State "eingabeAbgeschickt" wird nun wieder auf "false" gesetzt, da die Registrierung abgeschlossen ist.
                    this.setState({ eingabeAbgeschickt: false })
                    // Der Nutzer wird nun automatisch auf das Anmeldeformular weitergeleitet, wo er sich direkt mit seinem
                    // frisch registrierten Account anmelden kann.
                    history.push("/anmeldung")
                
                // Sollte der Server die Registrierung nicht durchgeführt haben,
                } else if (Registrierung.error) {
                    // Wird dem Nutzer über ein modales Fenster die Fehlermeldung angezeigt.
                    setzeInhaltFuerOberesModalfenster("Fehler", Registrierung.error, [{ name: "Schließen", variant: "primary" }])
                    oberesModalfensterAnzeigen()
                    // Der State "eingabeAbgeschickt" wird auf false gesetzt, da sich der Nutzer sich nun neu registrieren muss,
                    // falls er noch keinen Account hat.
                    await this.setState({ eingabeAbgeschickt: false })
                }

            // Sollte der Nutzer es nicht geschafft haben, alle Felder auszufüllen, wird er in diesem modalen Fenster
            // nochmal nett daran erinnert.
            } else {
                setzeInhaltFuerOberesModalfenster("Fehler", "Fülle alle Felder aus!",
                    [{ name: "Schließen", variant: "primary" }])
                oberesModalfensterAnzeigen()
                // Auch hier wird der State auf false gesetzt und der Nutzer muss sich nochmal registrieren.
                this.setState({ eingabeAbgeschickt: false })
            }
        }
    }

    render() {
        const { eingabeAbgeschickt } = this.state
        return (
            <div className="d-flex justify-content-center flex-fill align-items-center">
                <Card style={{ height: "fit-content" }} id="registrierungsformular">
                    <Card.Body>
                        <Card.Title>Registrierung</Card.Title>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group as={Row} controlId="eingabeEmail">
                                <Form.Label column sm={2}>
                                    Email
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="email" placeholder="Email" ref={e => this.email = e} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="eingabeBenutzername">
                                <Form.Label column sm={2}>
                                    Benutzername
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" placeholder="Benutzername" ref={b => this.benutzername = b} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="eingabePasswort">
                                <Form.Label column sm={2}>
                                    Passwort
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="password" placeholder="Passwort" ref={p => this.passwort = p} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 2 }}>
                                    {
                                        eingabeAbgeschickt ? <Spinner animation="border" /> : <Button type="submit">Registrieren</Button>
                                    }
                                    {/* Button zum Anmeldeformular */}
                                    <Button variant="light" style={{ marginLeft: 20 }} onClick={this.onAnmeldung}>Anmelden</Button>
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

// mapDispatchToProps gibt zwei Funktionen zurück, die als Props für das Registrierungs-Komponente verfügbar gemacht werden:
// setzeInhaltFuerOberesModalfenster und oberesModalfensterAnzeigen sind Aktionen, die den Top-Modal (Modales Fenster am oberen Bildschirmrand) im UI aktualisieren.
// Sie werden hier mit dispatch verbunden und können in der Komponente als Props verwendet werden.
const mapDispatchToProps = dispatch => {
    return {
        setzeInhaltFuerOberesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerOberesModalfenster(titel, inhalt, buttons)),
        oberesModalfensterAnzeigen: () => dispatch(oberesModalfensterAnzeigen())
    }
}

// Connect wird verwendet, um die Registrierungs-Komponente mit Redux zu verbinden.
// mapStateToProps und mapDispatchToProps werden als Argumente übergeben.
// withRouter wird verwendet, um der Komponente Zugriff auf das Router-Objekt zu geben.
// Das Ergebnis der Verbindung wird als exportiertes Default-Objekt zurückgegeben.
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Registrierung))