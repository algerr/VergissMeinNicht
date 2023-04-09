import React, { Component } from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { setzeInhaltFuerZentriertesModalfenster, zentriertesModalfensterAnzeigen } from '../../ReduxStore/aktionsErzeuger/modalFenster'
import NeuesPasswortHinzufuegen from './NeuesPasswortHinzufuegen'

// Diese Komponente beinhaltet die Eingabe des Masterpasswortes und die Möglichkeit ein neues Passwort hinzuzufügen, links von der Tabelle,
// in der die Passwörter angezeigt werden.

class EingabeBereich extends Component {

    // Wenn der Nutzer auf den Button "Neues Passwort hinzufügen" klickt,
    onPasswortHinzufuegen = () => {
        // werden die benötigten Funktionen aus dem "props"-Objekt deklariert.
        const { setzeInhaltFuerZentriertesModalfenster, zentriertesModalfensterAnzeigen } = this.props
        // Dem Nutzer wird dann ein modales Fenster zum Hinzufügen eines neuen Passwortes angezeigt.
        setzeInhaltFuerZentriertesModalfenster("Passwort hinzufügen", <NeuesPasswortHinzufuegen masterPasswort={this.masterPasswort.value} />,
            [{ name: "Schließen", variant: "primary" }]
        )
        zentriertesModalfensterAnzeigen()
    }

    // Da es für den Nutzer ein Erlebnis ist, dass er, sobald er das richtige Masterpasswort eingegeben hat,
    // direkt sieht, ob es richtig ist, da sich die Farbe von rot auf grün verändert, wird mit dieser Funktion
    // die aktuelle Eingabe des Masterpasswortes in den props gespeichert.
    onMasterPasswortEingabe = () => {
        this.props.onMasterPasswortEingabe(this.masterPasswort.value)
    }

    // Definition der "render"-Funktion, die das Aussehen der Komponente definiert.
    render() {
        // Der Inhalt der Komponente wird als HTML-Code zurückgegeben.
        return (
            // Das "React.Fragment" wird verwendet, um mehrere HTML-Elemente ohne Container darstellen zu können.
            <React.Fragment>
                {/* Formular-Gruppe für die Eingabe des Masterpasswortes */}
                <Form.Group controlId="formmasterPasswort" style={{ width: "fit-content" }}>
                    <Form.Label>Masterpasswort</Form.Label>                     
                    {/* Sobald eine Einabe im Masterpassworteingabefeld eingeht, wird die Funktion "onMasterPasswortEingabe" aufgerufen,
                     um die Eingabe in den props zu speichern.*/}
                    <Form.Control type="password" placeholder="Gib dein Masterpasswort ein" ref={elem => this.masterPasswort = elem} onChange={this.onMasterPasswortEingabe} />
                    <Form.Text className="text-muted" style={{ marginTop: 12 }}>
                        Dein Masterpasswort wird genutzt, um deine gespeicherten Passwörter zu entschlüsseln.<br/>
                        Gib dein Passwort ein und achte auf das rote Feld mit deinem Passwort.<br/>
                        Wenn es grün wird, hast du dein Masterpasswort richtig eingegeben.
                    </Form.Text>
                </Form.Group>
                {/* Button zum Hinzufügen eines neuen Passwortes */}

{/* -----------------------------------------------------------------------------------------------*/}

                {/* backgroundColor: "#8619e6", borderColor: "#8619e6" */}

{/* -----------------------------------------------------------------------------------------------*/}

                <Button variant="primary" style={{ marginTop: 20, marginBottom: 50 }} onClick={this.onPasswortHinzufuegen}>
                    Neues Passwort hinzufügen
                </Button>
            </React.Fragment>
        )
    }
}

// Definieren der mapDispatchToProps-Funktion, um die benötigten Funktionen als Props bereitzustellen.
const mapDispatchToProps = dispatch => {
    return {
        setzeInhaltFuerZentriertesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerZentriertesModalfenster(titel, inhalt, buttons)),
        zentriertesModalfensterAnzeigen: () => dispatch(zentriertesModalfensterAnzeigen())
    }
}

// Verbindung der Komponente mit dem Redux-Store, um auf States und Aktionen zugreifen zu können.
export default connect(null, mapDispatchToProps)(EingabeBereich)