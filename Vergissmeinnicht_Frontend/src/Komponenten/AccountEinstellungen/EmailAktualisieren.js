import React, { Component } from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

import { emailAktualisieren } from '../../Hilfsfunktionen/server'
import { setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen, zentriertesModalfensterAusblenden } from '../../ReduxStore/aktionsErzeuger/modalFenster'
import { authentifizierungsTokenFestlegen } from '../../ReduxStore/aktionsErzeuger/authentifizierung'

class EmailAktualisieren extends Component {

    // Hier wird ein React State genutzt, um bestimmen zu können, ob die neue Email gerade gespeichert wird,
    // oder nicht.
    state = {
        ladesymbol: false
    }

    componentDidMount = () => {
        // Die Variable "bisherigeEmail" wird als Prop an die Komponente übergeben
        const { bisherigeEmail } = this.props
        // und legt den Text im Eingabefeld fest.
        // Die bisherige Emailadresse steht als Text im Eingabefeld.
        this.email.value = bisherigeEmail
    }

    // Wenn der Nutzer auf den Speichern-Button klickt,
    onSpeichern = async (e) => {
        // wird die browsereigene, standardmäßige Sendung des Formulars verhindert.
        e.preventDefault()
        const { ladesymbol } = this.state
        // Wenn "ladesymbol" auf "true" gesetzt ist, wird die Funktion beendet.
        if (ladesymbol) return
        // Der State des Ladesymbols wird auf "true" gesetzt, da die Emailadresse nun aktualisiert wird.
        this.setState({ ladesymbol: true })
        // Die Props und werden extrahiert und als einzelne Variablen gespeichert, damit sie direkt verwendet werden können.
        // Statt "this.props.token" kann nun einfach "token" geschrieben werden
        const { token, setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen, authentifizierungsTokenFestlegen, zentriertesModalfensterAusblenden } = this.props
        // Token und aktualisierte Emailadresse werden an den Server geschickt.
        const EmailAktualisierung = await emailAktualisieren(token, this.email.value)
        // Wenn ein Fehler auftritt,
        if (EmailAktualisierung.error) {
            // wird dieser dem Nutzer in einem modalen Fenster gezeigt.
            setzeInhaltFuerOberesModalfenster("Fehler", EmailAktualisierung.error, [{ name: "Schließen", variant: "primary" }])
            oberesModalfensterAnzeigen()
        // Wenn die E-Mail-Adresse erfolgreich aktualisiert wurde, wird das neue Token gespeichert.
        } else if (EmailAktualisierung.token) {
            authentifizierungsTokenFestlegen(EmailAktualisierung.token)
        }
        // Zum Schluss wird das modale Fenster geschlossen und der State vom "ladesymbol" auf "false" gesetzt.
        zentriertesModalfensterAusblenden()
        this.setState({ ladesymbol: false })
    }

    // Definition der "render"-Funktion, die das Aussehen der Komponente definiert.
    render() {
        // Die ladesymbol-Variable wird aus dem aktuellen Zustand ausgelesen.
        const { ladesymbol } = this.state   
        // Der Inhalt der Komponente wird als HTML-Code zurückgegeben.     
        return (
            <Form>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    {/* Das Eingabefeld für die E-Mail-Adresse wird definiert und mit der Referenz this.email verknüpft */}
                    <Form.Control type="text" placeholder="Email" ref={elem => this.email = elem} />
                    <Form.Text className="text-muted">
                        Eine leere Eingabe wird auch genehmigt.
                    </Form.Text>
                </Form.Group>
                {/* Entweder wird ein Ladesymbol oder ein Button zum Speichern der Änderungen angezeigt, je nachdem ob das ladesymbol true oder false ist */}
                {
                    ladesymbol ? <Spinner animation="border" /> : <Button variant="primary" type="submit" onClick={this.onSpeichern}>Speichern</Button>
                }
            </Form>
        )
    }
}

// Der State aus dem Redux-Store wird auf den Token des Komponenten gemapped.
const mapStateToProps = state => {
    return {
        token: state.authentifizierung.token
    }
}

// Das mapDispatchToProps-Objekt enthält Funktionen, mit denen das Modul Aktionen auslösen kann.
const mapDispatchToProps = dispatch => {
    return {
        // Dadurch können die Aktionen: zentriertesModalfensterAusblenden, setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen, authentifizierungsTokenFestlegen ausgeführt werden.
        zentriertesModalfensterAusblenden: () => dispatch(zentriertesModalfensterAusblenden()),
        setzeInhaltFuerOberesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerOberesModalfenster(titel, inhalt, buttons)),
        oberesModalfensterAnzeigen: () => dispatch(oberesModalfensterAnzeigen()),
        authentifizierungsTokenFestlegen: (token) => dispatch(authentifizierungsTokenFestlegen(token))
    }
}

// Der HOK (Higher-Order Komponent) 'connect' verbindet den Redux-Store mit dem Komponenten.
// Dieser kann auf den Redux-Store zugreifen und seine Daten ändern, indem er die entsprechenden Aktionen auslöst.
export default connect(mapStateToProps, mapDispatchToProps)(EmailAktualisieren)