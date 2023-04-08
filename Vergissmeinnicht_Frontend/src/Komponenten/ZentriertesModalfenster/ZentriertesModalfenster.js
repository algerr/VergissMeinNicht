import React, { Component } from 'react'
// Modal und Button sind React-Komponenten von Bootstrap, die eine modale Popup-Funktionalität und Schaltflächen zur Verfügung stellen.
// Genau das brauchen wir für unsere Modalfenster.
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
// Über die "connect"-Funktion kann eine Komponente mit dem Redux-Store verbunden werden. (Das steht aber auch am Ende jedes Komponenten gut erklärt.)
import { connect } from 'react-redux'

import { zentriertesModalfensterAusblenden } from '../../ReduxStore/aktionsErzeuger/modalFenster'

// Da modale Fenster eine schöne Möglichkeit der Eingabe für den Nutzer oder der Anzeige von Informationen sind,
// definieren wir ein zentrales Modalfenster. Dieses wird beispielsweise bei Nutzereingaben wie dem Hinzufügen eines
// Passwortes oder der Aktualisierung der Emailadresse genutzt.
// Dabei wird der Hintergrund verdunkelt und das Modalfenster erscheint in der Mitte des Bildschirms mit einer Animation.
class ZentriertesModalfenster extends Component {

    // Wenn der Benutzer auf das "X"-Symbol klickt, wird das Modal-Fenster geschlossen.
    fensterSchliessen = () => {
        this.props.modalAusblenden()
    }

    // Das Modalfenster und dessen Inhalt werden erstellt.
    render() {
        // Die Props "titel", "inhalt", "buttons" und "gezeigt" werden extrahiert.
        const { titel, inhalt, buttons, gezeigt } = this.props
        return (
            // Die Modal-Komponente von Bootstrap wird als Grundlage genutzt, um das Modalfenster anzuzeigen.
            <Modal show={gezeigt} onHide={this.fensterSchliessen} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{titel}</Modal.Title>
                </Modal.Header>
                {/* Der Inhalt des Modalfensters wird hinzugefügt. */}
                <Modal.Body>{inhalt}</Modal.Body>
                {/* Die Buttons des Modalfensters werden im Footer hinzugefügt. */}
                <Modal.Footer>
                    {
                        // Falls "buttons" für das Modalfenster definiert sind, wird eine Schaltfläche für jeden Eintrag in "buttons" erzeugt.
                        buttons ?
                            buttons.map(b => {
                                const { name, variant, onClick } = b
                                // Falls der Name des Buttons "Schließen" lautet, wird das Modalfenster bei einem Klick, mithilfe der Funktion "fensterSchliessen" geschlossen.
                                if (name === "Schließen") {
                                    return (
                                        <Button variant={variant} onClick={this.fensterSchliessen} key={name}>
                                            {name}
                                        </Button>
                                    )
                                }

                                // Ansonsten wird eine Schaltfläche mit dem entsprechenden Event-Handler hinzu.
                                return (
                                    <Button variant={variant} onClick={onClick}>
                                        {name}
                                    </Button>
                                )
                            })
                            // Falls "buttons" nicht definiert ist, wird "null" zurückgegeben, um keine Schaltflächen anzuzeigen.
                            : null
                    }
                </Modal.Footer>
            </Modal>
        )
    }
}

// Mapping der Redux-State-Variablen auf die Props-Objekte der Komponente.
const mapStateToProps = state => {
    return {
        gezeigt: state.modalFenster.zentriertesModalfenster.gezeigt,
        titel: state.modalFenster.zentriertesModalfenster.titel,
        inhalt: state.modalFenster.zentriertesModalfenster.inhalt,
        buttons: state.modalFenster.zentriertesModalfenster.buttons,
    }
}

// Mapping der Redux-Dispatch-Funktionen auf die Props-Objekte der Komponente.
const mapDispatchToProps = dispatch => {
    return {
        modalAusblenden: () => dispatch(zentriertesModalfensterAusblenden())
    }
}

// Die Komponente wird mit dem Redux-Store verbunden.
export default connect(mapStateToProps, mapDispatchToProps)(ZentriertesModalfenster)