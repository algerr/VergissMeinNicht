import React, { Component } from 'react'
import { connect } from 'react-redux'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
// React bietet schöne Icons an, die man einfach per Import nutzen kann.
// Diese werden für den Kopier-, Ansehen- und Löschen-Button verwendet.
// MdCopy = das typische Kopiericon, MdEye = ein Auge, da man das Passwort ansieht, MdTrash = ein Mülleimer, da das Passwort gelöscht wird.
import MdCopy from 'react-ionicons/lib/MdCopy'
import MdEye from 'react-ionicons/lib/MdEye'
import MdTrash from 'react-ionicons/lib/MdTrash'
import copy from 'clipboard-copy'

import { passwortLoeschen } from '../../ReduxStore/aktionsErzeuger/passwoerter'
import { setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen, oberesModalfensterAusblenden } from '../../ReduxStore/aktionsErzeuger/modalFenster'
import { passwortVomServerLoeschen } from '../../Hilfsfunktionen/server'
import { entschluesseln } from '../../Hilfsfunktionen/verschluesselung'

class PasswortAnzeige extends Component {

    state = {
        kopierText: "Kopieren",
        passwortText: "●●●●●●●●●●●●●●●●●●●●●●"
    }

    // Wenn der Nutzer auf den "Kopieren"-Button klickt,
    onKopieren = (entschluesseltesPasswort) => {
        // wird überprüft, ob das Passwort, das kopiert werden soll, gerade
        // entschlüsselt ist oder nicht.
        // Wenn es entschlüsselt ist,
        if (entschluesseltesPasswort.entschluesselt) {
            // wird es in die Ablage des Nutzers kopiert.
            copy(entschluesseltesPasswort.entschluesselt)
            // Der Kopiertext, also der Text, der, wenn man den Mauszeiger über den Button bewegt, auftaucht,
            // wird zu "Passwort kopiert!" geändert.
            this.setState({ kopierText: "Passwort kopiert!" })
            // Nach 3 Sekunden wird der Kopiertext wieder zu "Kopieren geändert."
            setTimeout(() => {
                this.setState({ kopierText: "Kopieren" })
            }, 3000)
        // Sollte das Passwort nicht verschlüsselt sein, wird der Nutzer durch den Kopiertext ("Das Passwort ist noch verschlüsselt!")
        // darauf hingewiesen und 3 Sekunden später wird der Kopiertext wieder zu "Kopieren".
        } else {
            this.setState({ kopierText: "Das Passwort ist noch verschlüsselt!" })
            setTimeout(() => {
                this.setState({ kopierText: "Kopieren" })
            }, 3000)
        }
    }

    // Wenn der Nutzer auf den Button zum Ansehen des Passwortes klickt,
    onAnsehen = (entschluesseltesPasswort) => {
        // wird überprüft, ob das Passwort, das angesehen werden soll, gerade entschlüsselt ist oder nicht. 
        // Wenn es entschlüsselt ist, 
        if (entschluesseltesPasswort.entschluesselt) {
            // wird der Passworttext für 4 Sekunden in Klartext des Passwortes umgewandelt,
            // sodass der Nutzer sich das Passwort ansehen kann.
            this.setState({ passwortText: entschluesseltesPasswort.entschluesselt })
            setTimeout(() => {
                this.setState({ passwortText: "●●●●●●●●●●●●●●●●●●●●●●" })
            }, 3000)
        // Sollte das Passwort nicht verschlüsselt sein, wird der Nutzer durch den Passworttext ("Das Passwort ist noch verschlüsselt!")
        // darauf hingewiesen und 3 Sekunden später wird der Passworttext wieder unkenntlich.
        } else {
            this.setState({ passwortText: "Das Passwort ist noch verschlüsselt!" })
            setTimeout(() => {
                this.setState({ passwortText: "●●●●●●●●●●●●●●●●●●●●●●" })
            }, 3000)
        }
    }

    // Wenn der Nutzer auf den Button zum Löschen eines Passwortes klickt, wird zuerst nochmal sichergegangen,
    // dass der Nutzer sich darüber im Klaren ist, dass er jetzt sein Passwort löschen möchte.
    onLoeschen = () => {
        // Dazu muss der Nutzer in einem modalen Fenster noch einmal bestätigen, dass er wirklich dieses Passwort löschen möchte.
        const { passwort, setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen } = this.props
        setzeInhaltFuerOberesModalfenster("Löschen", `Bist du sicher, dass du ${passwort.beschreibung} löschen möchtest?`,
            [
                { name: "Ja", variant: "danger", onClick: this.passwortLoeschenFinal },
                { name: "Schließen", variant: "secondary" }
            ])
        oberesModalfensterAnzeigen()
    }

    // Wenn der Nutzer sich sicher ist, dass er sein Passwort löschen möchte und bei der vorigen Frage den "Ja"-Button angeklickt hat,
    // wird nun das Passwort aus der Tabelle entfernt.
    passwortLoeschenFinal = async () => {
        const { passwort, token, passwortLoeschen, setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen, oberesModalfensterAusblenden } = this.props
        oberesModalfensterAusblenden()
        // An den Server wird mit token und PasswortId die Anfrage geschickt, das Passwort zu löschen.
        const passwortLoeschung = await passwortVomServerLoeschen(token, passwort.id)
        // Wenn es einen Fehler beim Löschvorgang gab, wird dieser dem Nutzer in einem modalen Fenster angezeigt.
        if (passwortLoeschung.error) {
            setzeInhaltFuerOberesModalfenster("Fehler", passwortLoeschung.error,
                [{ name: "Schließen", variant: "primary" }])
            oberesModalfensterAnzeigen()
        // Wenn es kein Problem gab und das Passwort auf dem Server gelöscht wurde, wird es auch aus dem Redux-Store im Browser
        // des Nutzers gelöscht. Es ist nun permanent entfernt.
        } else {
            passwortLoeschen(passwort)
        }
    }

    // Definition der "render"-Funktion, die das Aussehen der Komponente definiert.
    render() {
        // Das "passwort" und "masterPasswort werden aus den Komponenteneigenschaften ("props") destrukturiert.
        const { passwort, masterPasswort } = this.props
        // Aus dem passwort wird das verschlüsselte Passwort und der Sicherheitswert extrahiert.
        const { verschluesseltesPasswort, sicherheitswert } = passwort
        // Entschlüsselt das verschlüsselte Passwort mithilfe der "entschluesseln()" Funktion und dem Master-Passwort
        const entschluesseltesPasswort = entschluesseln(masterPasswort, verschluesseltesPasswort, sicherheitswert)

        return (
            <React.Fragment>
                {
                    // Ein bedingtes Rendern, das je nach dem, ob das Passwort erfolgreich entschlüsselt wurde oder nicht, 
                    // einen grünen oder roten Alert-Container rendert, in dem sich der Passworttext befindet.
                    entschluesseltesPasswort.entschluesselt ?
                        <Alert variant="success" style={{ width: "fit-content", float: "left", margin: "auto" }} ref={elem => this.alert = elem}>{this.state.passwortText}</Alert> :
                        <Alert variant="danger" style={{ width: "fit-content", float: "left", margin: "auto" }} ref={elem => this.alert = elem}>{this.state.passwortText}</Alert>
                }
                {/* Das OverlayTrigger-Element zeigt einen Text über einem Button an, wenn man die Maus darüberbewegt. */}
                {/* Beim Button zum Kopieren wird der stateabhängige Kopiertext angezeigt. */}
                <OverlayTrigger overlay={<Tooltip id="tooltip-copy">{this.state.kopierText}</Tooltip>}>
                    <Button variant="light" style={{ textAlign: "center", margin: 8 }} onClick={() => this.onKopieren(entschluesseltesPasswort)}><MdCopy size={30} /></Button>
                </OverlayTrigger>

                {/* Beim Button zum Ansehen des Passwortes wird "Ansehen" angezeigt. */}
                <OverlayTrigger overlay={<Tooltip id="tooltip-view">Ansehen</Tooltip>}>
                    <Button variant="warning" style={{ textAlign: "center", margin: 8 }} onClick={() => this.onAnsehen(entschluesseltesPasswort)}><MdEye size={30} color="white" /></Button>
                </OverlayTrigger>

                {/* Beim Button zum Löschen des Passwortes wird "Löschen" angezeigt. */}
                <OverlayTrigger overlay={<Tooltip id="tooltip-view">Löschen</Tooltip>}>
                    <Button variant="danger" style={{ textAlign: "center", margin: 8 }} onClick={this.onLoeschen}><MdTrash size={30} color="white" /></Button>
                </OverlayTrigger>

            </React.Fragment>

        )
    }
}

// Hier wird die Funktion mapStateToProps definiert, die den Token aus dem globalen Redux-Store 
// abruft und als Prop "token" an das verbundene Komponenten-Element weiterleitet.
const mapStateToProps = state => {
    return {
        token: state.authentifizierung.token
    }
}

// Hier wird die Funktion mapDispatchToProps definiert, die die folgenden Funktionen als Props 
// an das verbundene Komponenten-Element weiterleitet: passwortLoeschen, setzeInhaltFuerOberesModalfenster, 
// oberesModalfensterAnzeigen und oberesModalfensterAusblenden. Diese Funktionen sind Teil des Redux-Stores und werden später
// aufgerufen, wenn in der Komponente auf bestimmte Ereignisse reagiert werden soll.
const mapDispatchToProps = dispatch => {
    return {
        passwortLoeschen: (passwort) => dispatch(passwortLoeschen(passwort)),
        setzeInhaltFuerOberesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerOberesModalfenster(titel, inhalt, buttons)),
        oberesModalfensterAnzeigen: () => dispatch(oberesModalfensterAnzeigen()),
        oberesModalfensterAusblenden: () => dispatch(oberesModalfensterAusblenden()),
    }
}

// Hier wird das Komponenten-Element "PasswortAnzeige" durch die Funktion "connect" mit dem globalen 
// Redux-Store verbunden. Durch die Verwendung der beiden vorher definierten Funktionen "mapStateToProps" 
// und "mapDispatchToProps" werden die entsprechenden Daten und Funktionen an das Komponenten-Element 
// weitergeleitet, damit es auf die Daten und Ereignisse reagieren kann.
export default connect(mapStateToProps, mapDispatchToProps)(PasswortAnzeige)