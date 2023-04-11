// Das Firebase Admin-SDK-Moduls wird importiert.
const admin = require("firebase-admin")

// Die Firebase Admin-SDKs wird initialisiert.
admin.initializeApp()

// Eine Firestore-Instanz wird erstellt.
const firestore_datenbank = admin.firestore()

// Die Vermittlungsfunktion wird exportiert. Als Argumente werden ein Anfrageobjekt, 
// ein Antwortobjekt und eine nächste Vermittlungsfunktion entgegengenommen.
module.exports = (req, res, next) => {
    // Dem Anfragebjekt wird die Firestore-Instanz hinzugefügt, 
    // um auf die Firestore-Datenbank zugreifen zu können.
    req.firestore = firestore
    // Die 
    return next()
}

// Diese Vermittlungsfunktion verbindet die Express-Anwendung mit der Firestore-Datenbank. 
// Sie wird aufgerufen, wenn eine Anfrage an die Anwendung gestellt wird und
// fügt der Anfrage ein Objekt mit einer Referenz auf die Firestore-Instanz hinzu. 
// Dadurch können andere Routen und Vermittlungsfunktionen auf die Firestore-Datenbank zugreifen und Dokumente lesen oder schreiben.
