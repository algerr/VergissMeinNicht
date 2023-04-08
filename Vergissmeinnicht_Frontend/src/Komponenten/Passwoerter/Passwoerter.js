// Import von React, Component und der Redux "connect" Funktion.
import React, { Component } from 'react'
import { connect } from 'react-redux'

// Import von Bootstrap-Komponenten (Container, Col, Row).
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

// Import von 
import Tabelle from '../Tabelle/Tabelle'
import EingabeBereich from './EingabeBereich'
import PasswortAnzeige from './PasswortAnzeige'

// Definition der "Passwörter"-Komponente, die alle Passwörter anzeigt.

class Passwoerter extends Component {

    // Für die Speicherung des masterPasswortes wird ein State-Objekt verwendet.
    state = {
        masterPasswort: null
    }

    // Sobald eine Eingabe des masterPasswortes erfolgt, wird dieses im State "masterPasswort" gespeichert.
    onMasterPasswortEingabe = (masterPasswort) => {
        this.setState({ masterPasswort: masterPasswort })
    }

    // Definition der "render"-Funktion, die das Aussehen der Komponente definiert.
    render() {
        // Die Passwörter werden aus den props extrahiert.
        const statePasswoerter = this.props.passwoerter
        // Der Inhalt der Komponente wird als HTML-Code zurückgegeben.
        return (
            // Container-Komponente mit maxWidth 100%
            <Container style={{ maxWidth: "100%" }}>
                {/* Die erste Zeile von links nach rechts trägt den Titel der "Passwörter"-Seite */}
                <Row>
                    <h1 className="mt-4">Passwörter</h1>
                </Row>
                {/* Eine Zeile mit zwei Spalten-Komponenten, die Inhalte enthalten. */}
                <Row>
                    {/* Die linke Spalte beinhaltet die "EingabeBereich"-Komponente. */}
                    <Col sm={4}>
                        <EingabeBereich onMasterPasswortEingabe={this.onMasterPasswortEingabe} />
                    </Col>
                    {/* In der rechten Spalte wird die Tabelle mit den gespeicherten Passwörtern dargestellt. */}
                    {/* Die Tabelle ist doppelt so groß, wie die linke Seite. */}
                    <Col sm={8}>
                        <Tabelle
                            // Die Überschriften der Tabelle ("Beschreibung" und "Passwort") teilen die Tabelle in zwei Spalten.
                            ueberschriften={[
                                "Beschreibung",
                                "Passwort",
                            ]}
                            // Als Inhalt werden die gespeicherten Passwörter mit ihrer Beschreibung und dem Passwort
                            // in die Tabelle eingefügt.
                            inhalt={
                                statePasswoerter.map(i => {
                                    return [
                                        // In die erste Spalte kommt die Beschreibung des Passwortes.
                                        i.beschreibung,
                                        // In die zweite Spalte das Passwort, welches durch die "PasswortDisplay"-Komponente angezeigt wird.
                                        <PasswortAnzeige passwort={i} masterPasswort={this.state.masterPasswort} />,
                                    ]
                                })
                            } />
                    </Col>
                </Row>
            </Container>
        )
    }
}

// Die "mapStateToProps"-Funktion wird verwendet, um die Daten aus dem Redux-Store zu extrahieren
// und als Props an die Komponente zu übergeben.
const mapStateToProps = state => {
    return {

        // Die "passwoerter"-Props wird aus dem "liste"-Teil des Redux-Stores extrahiert.
        // Diese beinhaltet alle gespeicherten Passwörter.
        passwoerter: state.passwoerter.liste
    }
}

// Die "connect"-Funktion von Redux wird verwendet, um die Komponente an den Redux-Store anzuschließen.
// Die "mapStateToProps"-Funktion wird an "connect" übergeben, um die entsprechenden Props zu extrahieren.
// Somit kann diese nun beispielsweise auf die gespeicherten Passwörter zugreifen.
export default connect(mapStateToProps)(Passwoerter)