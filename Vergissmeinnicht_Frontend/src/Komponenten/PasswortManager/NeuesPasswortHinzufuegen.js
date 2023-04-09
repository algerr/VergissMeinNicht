// Importieren der benötigten Komponenten und Bibliotheken aus react-bootstrap, React und Redux
import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Spinner from 'react-bootstrap/Spinner'
import Tooltip from 'react-bootstrap/Tooltip'
import IonIcon from '@reacticons/ionicons'
import { connect } from 'react-redux'

import { zentriertesModalfensterAusblenden, setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen } from '../../ReduxStore/aktionsErzeuger/modalFenster'
import { passwortHinzufuegen } from '../../ReduxStore/aktionsErzeuger/passwoerter'
import { verschluesseln, passwortGenerieren } from '../../Hilfsfunktionen/verschluesselung'
import { passwortZumServerHinzufuegen } from '../../Hilfsfunktionen/server'

class NeuesPasswortHinzufuegen extends Component {

    state = {
        laedt: false
    }

    // Wenn der Nutzer auf den "Speichern"-Button klickt, 
    onSpeichern = async (e) => {
        // wird die browsereigene Standardaktion unterbrochen.
        e.preventDefault()
        const { laedt } = this.state
        // Wenn der Lade-State bereits "true" ist, wird dieser einfach zurückgegeben.
        if (laedt) return
        // Ansonsten wird der State auf "true" gesetzt, da das Passwort nun ja gespeichert wird.
        this.setState({ laedt: true })
        // Die benötigten Funktionen werden aus den Props extrahiert.
        const { masterPasswort, setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen, zentriertesModalfensterAusblenden, passwortHinzufuegen, token } = this.props
        // Zuerst wird nun überprüft, ob das Masterpasswort eingegeben wurde,
        if (masterPasswort !== null && masterPasswort !== '') {
            // Daraufhin muss noch abgefragt werden, ob auch die Beschreibung und das Passwort eingegeben wurden, die gespeichert werden sollen.
            if (this.passwort.value !== null && this.passwort.value !== ''
                && this.beschreibung.value !== null && this.beschreibung.value !== '') {
                // Das Passwort in Abhängigkeit vom Masterpasswort verschlüsselt.
                const verschluesseltesPasswort = verschluesseln(masterPasswort, this.passwort.value)
                // Daraufhin wird dem Server eine Anfrage zur Speicherung geschickt, die die Beschreibung, das verschlüsselte Passwort und der Sicherheitswert beinhaltet.
                const neuesPasswort = await passwortZumServerHinzufuegen(token, this.beschreibung.value, verschluesseltesPasswort.encryptedData, verschluesseltesPasswort.sicherheitswert)
                // Wenn es einen Fehler bei der Speicherung gibt, wird dieser dem Nutzer in einem
                // modalen Fenster angezeigt.
                if (neuesPasswort.error) {
                    setzeInhaltFuerOberesModalfenster("Fehler", neuesPasswort.error, [{ name: "Schließen", variant: "primary" }])
                    oberesModalfensterAnzeigen()
                    // Das Fenster zum Hinzufügen des Passwortes wird geschlossen.
                    zentriertesModalfensterAusblenden()
                // Wenn die Speicherung aber funktioniert hat, gibt der Server das Passwort als Item zurück,
                // das nun noch im Redux-Store des Browsers gespeichert wird.
                } else if (neuesPasswort.passwort) {
                    passwortHinzufuegen(neuesPasswort.passwort)
                    // Das Fenster zum Hinzufügen des Passwortes wird geschlossen.
                    zentriertesModalfensterAusblenden()
                }
            // Sollte der Nutzer nicht Beschreibung und Passwort eingegeben haben, wird er durch ein modales Fenster noch einmal daraufhingewiesen.
            } else {
                setzeInhaltFuerOberesModalfenster("Fehler", "Fülle bitte alle Felder aus!", [{ name: "Schließen", variant: "primary" }])
                oberesModalfensterAnzeigen()
            }
        // Sollte der Nutzer sein Masterpasswort nicht eingegeben haben, wird er durch ein modales Fenster noch einmal daran erinnert.
        } else {
            // Das Fenster zum Hinzufügen des Passwortes wird geschlossen.
            zentriertesModalfensterAusblenden()
            setzeInhaltFuerOberesModalfenster("Fehler", "Gib dein Masterpasswort ein!", [{ name: "Schließen", variant: "primary" }])
            oberesModalfensterAnzeigen()
        }
        // Der Lade-State wird wieder auf "false" gesetzt.
        this.setState({ laedt: false })
    }

    // Wenn der Nutzer sich nicht selbst ein Passwort ausdenken möchte, kann er auch einfach ein sicheres für sich generieren lassen.
    // Wenn er auf den entsprechenden Button klickt, 
    onPasswortGenerieren = (e) => {
        // wird zuerst die browsereigene Standardaktion unterbrochen
        e.preventDefault()
        // und daraufhin das Eingabefeld für das Passwort automatisch ausgefüllt.
        this.passwort.value = passwortGenerieren()
    }

    // Definition der "render"-Funktion, die das Aussehen der Komponente definiert.
    render() {
        // Destrukturierung des Lade-States, damit dieser als freier Boolean genutzt werden kann.
        const { laedt } = this.state
        // Definition der "render"-Funktion, die das Aussehen der Komponente definiert.
        return (
            <Form>
                {/* Das Eingabefeld für die Beschreibung des Passwortes */}
                <Form.Group controlId="beschreibung">
                    <Form.Label>Beschreibung</Form.Label>
                    <Form.Control type="text" placeholder="Erkenne dein Passwort an der Beschreibung wieder" ref={elem => this.beschreibung = elem} />
                </Form.Group>

                {/* Das Eingabefeld für das Passwort */}
                <Form.Group controlId="passwort">
                    <Form.Label>Passwort</Form.Label>
                    <Form.Control type="text" placeholder="Passwort" ref={elem => this.passwort = elem} />
                </Form.Group>
                {
                    laedt ? <Spinner animation="border" /> : <Button variant="primary" type="submit" onClick={this.onSpeichern} size={30}>Speichern</Button>
                }
                {/* Wenn man die Maus über den Button zur Generierung eines starken Passwortes bewegt, erscheint ein beschreibender Text. */}
                <OverlayTrigger overlay={<Tooltip id="tooltip-generate">Starkes Passwort generieren</Tooltip>}>
                    {/* Der Button erhält ein anderes Styling als der Button zur Speicherung. */}
                    <Button style={{marginLeft: 10}} variant="light" onClick={this.onPasswortGenerieren}><IonIcon name="shield-checkmark-outline" /></Button>
                </OverlayTrigger>
            </Form>
        )
    }
}

// Die "mapStateToProps"-Funktion wird verwendet, um die Daten aus dem Redux-Store zu extrahieren
// und als Props an die Komponente zu übergeben.
const mapStateToProps = state => {
    return {
        // Das Authentifizierungs-Token wird aus dem Redux-Store extrahiert.
        token: state.authentifizierung.token
    }
}

// Hier wird die Funktion mapDispatchToProps definiert, die die folgenden Funktionen als Props 
// an das verbundene Komponenten-Element weiterleitet: zentriertesModalfensterAusblenden, setzeInhaltFuerOberesModalfenster, 
// oberesModalfensterAnzeigen und passwortHinzufuegen. Diese Funktionen sind Teil des Redux-Stores und werden später
// aufgerufen, wenn in der Komponente auf bestimmte Ereignisse reagiert werden soll.
const mapDispatchToProps = dispatch => {
    return {
        zentriertesModalfensterAusblenden: () => dispatch(zentriertesModalfensterAusblenden()),
        setzeInhaltFuerOberesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerOberesModalfenster(titel, inhalt, buttons)),
        oberesModalfensterAnzeigen: () => dispatch(oberesModalfensterAnzeigen()),
        passwortHinzufuegen: (data) => dispatch(passwortHinzufuegen(data))
    }
}

// Die "connect"-Funktion von Redux wird verwendet, um die Komponente an den Redux-Store anzuschließen.
// Die "mapStateToProps"-Funktion wird an "connect" übergeben, um die entsprechenden Props zu injizieren.
// "passwoerter" ist die Komponente, die an den Store angeschlossen werden soll.
// Somit kann diese nun beispielsweise auf die gespeicherten Passwörter zugreifen.
export default connect(mapStateToProps, mapDispatchToProps)(NeuesPasswortHinzufuegen)