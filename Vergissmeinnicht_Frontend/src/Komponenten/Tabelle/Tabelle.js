import React, { Component } from 'react'
import $ from 'jquery'
import './styles.css'

$.DataTable = require('datatables.net-bs4')

class Tabelle extends Component {

    // Sobald die Komponente in den DOM eingefügt wurde,
    componentDidMount = () => {
        // wird die Tabelle initialisiert.
        const { tabellenId } = this.props
        // Wenn eine Id für die Tabelle übergeben wird, wird der DataTable mit dieser Id erzeugt.
        if (tabellenId) {
            this.table = $('#' + tabellenId).DataTable()
            $('.dataTables_length').addClass('bs-select')
        // Wenn keine TabellenId festgelegt wird, wird eine Tabelle mit dem Standardwert "dtBasicExample" erzeugt.
        } else {
            this.table = $('#dtBasicExample').DataTable()
            $('.dataTables_length').addClass('bs-select')
        }
    }

    // "componentWillUpdate" wird aufgerufen, bevor die Komponente aktualisiert wird.
    componentWillUpdate = () => {
        // Um eine Aktualisierung zu ermöglichen, wird die alte Tabelle zerstört.
        this.table.destroy()
    }

    // "componentDidUpdate" wird aufgerufen, nachdem die Komponente aktualisiert wurde.
    componentDidUpdate = () => {
        // Eine neue, aktualisierte Tabelle wird initialisiert.
        const { tabellenId } = this.props
        // Wenn eine Id für die Tabelle übergeben wird, wird der DataTable mit dieser Id erzeugt.
        if (tabellenId) {
            this.table = $('#' + tabellenId).DataTable()
            $('.dataTables_length').addClass('bs-select')
        // Wenn keine TabellenId festgelegt wird, wird eine Tabelle mit dem Standardwert "dtBasicExample" erzeugt.
        } else {
            this.table = $('#dtBasicExample').DataTable()
            $('.dataTables_length').addClass('bs-select')
        }
    }

    // "componentWillUnmount" wird aufgerufen, bevor die Komponente aus dem DOM entfernt wird.
    componentWillUnmount = () => {
        // Hier wird die Tabelle zerstört.
        this.table.destroy()
    }

    // Definition der "render"-Funktion, die das Aussehen der Komponente definiert
    // Jetzt wird die Tabellenstruktur gerendert.
    render() {
        // Wenn die Komponente initialisiert wird, müssen Überschriften, Inhalt und TabellenId übergeben werden.
        const { ueberschriften, inhalt, tabellenId } = this.props

        // Wenn keine Überschriften oder kein Inhalt übergeben wurden, wird eine Fehlermeldung gerendert
        if (!ueberschriften || !inhalt) {
            return (
                // Entsteht eine Fehlermeldung.
                <h3>Tabellenfehler: Keine Überschriften oder Inhalt gefunden.</h3>
            )
        }

        return (
            // Die Tabelle wird mit dem HTML-Tag <table> erstellt.
            // Dabei wird die tabellenId, falls angegeben, als id übergeben.
            <table id={tabellenId || "dtBasicExample"} className="table table-striped table-bordered">
                <thead>
                    {/* In der Kopfzeile der Tabelle wird jede Spalte als separate <th>-Zelle erstellt.*/}
                    <tr>
                        {/* Der Inhalt jeder Zelle wird durch das "ueberschriften"-Prop definiert. (Bspw. werden in Passwoerter.js die Überschriften: Beschreibung und Passwort) als prop gesetzt. */}
                        {
                            ueberschriften.map(ue => <th className="th-sm">{ue}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                
                    {   // Die "tbody"-Komponente ist für den Inhalt der Tabelle verantwortlich.
                        
                        // Für jede Tabellenzeile im 'inhalt'-Array,
                        inhalt.map(tr => {
                            // wenn eine Tabellenzeile vorhanden ist,
                            if (tr) {
                                // wird eine Tabellenzeile gerendert, die die Tabellenzellen in 'td'-Tags aufteilt.
                                return (
                                    <tr>
                                        {tr.map(td => <td>{td}</td>)}
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
        )
    }
}

export default Tabelle