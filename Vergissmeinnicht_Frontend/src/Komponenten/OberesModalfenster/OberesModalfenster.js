import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'

import { oberesModalfensterAusblenden } from '../../ReduxStore/aktionsErzeuger/modalFenster'

class OberesModalfenster extends Component {

    // Mit dieser Funktion kann das Modalfenster geschlossen werden.
    fensterSchliessen = () => {
        this.props.modalAusblenden()
    }

    // Mit der render-Funktion wird das Modalfenster gerendert.
    render() {
        // Zur besseren Übersichtlichkeit werden die Props destrukturiert.
        const { titel, inhalt, buttons, gezeigt } = this.props
        return (
            // Die Modal-Komponente von Bootstrap wird als Grundlage genutzt, um das Modalfenster anzuzeigen.
            <Modal show={gezeigt} onHide={this.fensterSchliessen}>
                <Modal.Header closeButton>
                    <Modal.Title>{titel}</Modal.Title>
                </Modal.Header>
                {/* Der Inhalt des Modalfensters wird hinzugefügt. */}
                <Modal.Body>{inhalt}</Modal.Body>
                {/* Die Buttons des Modalfensters werden im Footer hinzugefügt. */}
                <Modal.Footer>
                    {
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

const mapStateToProps = state => {
    return {
        gezeigt: state.modalFenster.oberesModalfenster.gezeigt,
        titel: state.modalFenster.oberesModalfenster.titel,
        inhalt: state.modalFenster.oberesModalfenster.inhalt,
        buttons: state.modalFenster.oberesModalfenster.buttons,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        modalAusblenden: () => dispatch(oberesModalfensterAusblenden())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OberesModalfenster)