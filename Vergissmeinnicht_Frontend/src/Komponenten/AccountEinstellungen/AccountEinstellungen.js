// Importieren der benötigten React-Komponenten.
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Import der benötigten Komponenten und Funktionen.
import { tokenEntschluesseln } from '../../Hilfsfunktionen/token'
import { setzeInhaltFuerZentriertesModalfenster, zentriertesModalfensterAnzeigen, setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen, oberesModalfensterAusblenden } from '../../ReduxStore/aktionsErzeuger/modalFenster'
import EmailAktualisieren from './EmailAktualisieren'
import PasswortAendern from './PasswortAendern'
import { accountVomServerLoeschen } from '../../Hilfsfunktionen/server'
import { authentifizierungsTokenFestlegen } from '../../ReduxStore/aktionsErzeuger/authentifizierung'

class AccountEinstellungen extends Component {

    // Das Modalfenster zur Aktualisierung der Emailadresse wird geöffnet,
    // wenn der Nutzer auf den entsprechenden Button drückt.
    onEmailAktualisieren = () => {
        const { setzeInhaltFuerZentriertesModalfenster, zentriertesModalfensterAnzeigen, token } = this.props
        const entschluesseltesToken = tokenEntschluesseln(token)

        // Im Modalfenster wird die 'EmailAktualisieren'-Komponente gerendert, wobei die bisherige Emailadresse als Platzhalter im Eingabefeld dient.
        setzeInhaltFuerZentriertesModalfenster(
            "Email aktualisieren",
            <EmailAktualisieren bisherigeEmail={entschluesseltesToken.email || ""} />,
            [{ name: "Schließen", variant: "primary" }]
        )
        zentriertesModalfensterAnzeigen()
    }

    // Das Modalfenster zur Änderung des Passwortes wird geöffnet,
    // wenn der Nutzer auf den entsprechenden Button drückt.
    onPasswortAendern = () => {
        const { setzeInhaltFuerZentriertesModalfenster, zentriertesModalfensterAnzeigen } = this.props

        // Im Modalfenster wird die `PasswortAendern`-Komponente gerendert.
        setzeInhaltFuerZentriertesModalfenster(
            "Passwort ändern",
            <PasswortAendern />,
            [{ name: "Schließen", variant: "primary" }]
        )
        zentriertesModalfensterAnzeigen()
    }

    // Das Modalfenster zum Löschen des Accounts wird geöffnet,
    // wenn der Nutzer auf den entsprechenden Button drückt.
    onAccountloeschen = () => {
        const { setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen } = this.props

        // Im Modalfenster wird der Nutzer gewarnt, dass er hiermit seinen Account löscht und muss bestätigen, dass er fortfahren möchte.
        setzeInhaltFuerOberesModalfenster("Achtung", "Alle Daten werden gelöscht! Möchtest du wirklich fortfahren?",
            // Durch die rote Farbe (variant: "danger") wird der Nutzer nochmal auf die Ernsthaftigkeit der Lage hingewiesen.
            [{ name: "Ja", variant: "danger", onClick: this.onDeleteAccept  }, { name: "Schließen", variant: "secondary"} ])
        oberesModalfensterAnzeigen()
    }

    // Wenn der Nutzer sich nun dazu entscheidet, seinen Account zu löschen,
    onDeleteAccept = async () => {
        // werden die Eigenschaften von props destrukturiert und sind somit zu separaten Variablen.
        // Somit wird der Präfix "this.props" nicht benötigt.
        const { token, history, setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen, authentifizierungsTokenFestlegen, oberesModalfensterAusblenden } = this.props
        // Diese Funktion löscht den Account des Nutzers auf dem Server und gibt ein Objekt mit einem Fehler oder dem Status zurück.
        const accountLoeschung = await accountVomServerLoeschen(token)
        // Wenn es einen Fehler beim Löschvorgan des Accounts gibt, wird dieser in einem Modalfenster angezeigt.
        if (accountLoeschung.error) {
            setzeInhaltFuerOberesModalfenster("Fehler", accountLoeschung.error, [{ name: "Schließen", variant: "primary" }])
            oberesModalfensterAnzeigen()
        // Wenn der Account erfolgreich gelöscht wurde, wird der Nutzer ausgeloggt und zum Anmeldeformular weitergeleitet.
        } else if (accountLoeschung.status) {
            authentifizierungsTokenFestlegen(null)
            history.push("/anmeldung")
            oberesModalfensterAusblenden()
        }
    }

    // Definition der "render"-Funktion, die das Aussehen der Komponente definiert.
    // Die Accounteinstellungen werden gerendert.
    render() {
        // Die Variable "token" wird aus den Props der Komponente gelesen.
        const { token } = this.props
        // Das entschlüsselte Token wird aus dem "token" Wert erstellt.
        const entschluesseltesToken = tokenEntschluesseln(token)
        // Der Body der Komponente wird als HTML-Code zurückgegeben.
        return (
            <Container style={{ maxWidth: "100%" }}>
                <Row>
                    {/* Die Überschrift der Accounteinstellungen wird angezeigt. */}
                    {/* Um die 'classNames' zu verstehen, empfiehlt sich die Bootstrap-Dokumentation. mt ist eine Abkürzung für marginTop */}
                    <h1 className="mt-4">Accounteinstellungen</h1>
                </Row>
                <Row>
                    {/* Benutzername und Emailadresse werden auf der linken Seite angezeigt. */}
                    <Col>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Benutzername: <strong>{entschluesseltesToken.benutzername || "Kein Benutzername gefunden"}</strong></ListGroup.Item>
                            <ListGroup.Item>Email: <strong>{entschluesseltesToken.email || "Keine Emailadresse angegeben"}</strong></ListGroup.Item>
                        </ListGroup>
                    </Col>

                    {/* Die Aktionen, die der Benutzer ausführen kann, werden auf der rechten Seite angezeigt */}
                    <Col>
                        <ListGroup>
                            {/* Der Button zum Aktualisieren der Email-Adresse wird angezeigt. */}
                            <ListGroup.Item action onClick={this.onEmailAktualisieren}>Email aktualisieren</ListGroup.Item>
                            {/* Der Button zum Ändern des Passworts wird angezeigt. */}
                            <ListGroup.Item action onClick={this.onPasswortAendern} >Passwort ändern</ListGroup.Item>
                            {/* Der Button zum Löschen des Accounts wird in rot angezeigt, damit der Nutzer die Ernsthaftigkeit der Lage begreift. */}
                            <ListGroup.Item action variant="danger" onClick={this.onAccountloeschen} >Account löschen</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}

// mapStateToProps ist eine Funktion, die den aktuellen Zustand des Redux-Stores auf die Eigenschaften der Komponente mapped (abbildet).
// In diesem Fall wird nur das "token" aus dem Store extrahiert und als Prop an den Komponenten weitergegeben.
const mapStateToProps = state => {
    return {
        token: state.authentifizierung.token
    }
}

// mapDispatchToProps ist eine Funktion, die das Dispatch-Objekt aus dem Store erhält und eine Funktionen-Mapping auf den Komponenten-Props definiert.
// In diesem Fall werden verschiedene Aktionserzeuger definiert, die als Props an die Komponente weitergegeben werden.
const mapDispatchToProps = dispatch => {
    return {
        setzeInhaltFuerZentriertesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerZentriertesModalfenster(titel, inhalt, buttons)),
        zentriertesModalfensterAnzeigen: () => dispatch(zentriertesModalfensterAnzeigen()),
        setzeInhaltFuerOberesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerOberesModalfenster(titel, inhalt, buttons)),
        oberesModalfensterAnzeigen: () => dispatch(oberesModalfensterAnzeigen()),
        oberesModalfensterAusblenden: () => dispatch(oberesModalfensterAusblenden()),
        authentifizierungsTokenFestlegen: (token) => dispatch(authentifizierungsTokenFestlegen(token))
    }
}

// Der "Accounteinstellungen"-Komponent wird mit dem Redux Store verbunden und mit den oben definierten mapStateToProps und mapDispatchToProps Funktionen verknüpft.
// Mit withRouter wird der Komponent auch mit dem React Router verbunden, um Zugriff auf die Router-Props (z.B. "history") zu erhalten.
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AccountEinstellungen))
