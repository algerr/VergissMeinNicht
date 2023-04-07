// Importieren der benötigten Module
const express = require('express')
// Firebase Functions-Modul
const functions = require('firebase-functions')
// Cross-Origin Resource Sharing
const cors = require('cors')
// Laden von Umgebungsvariablen
const dotenv = require('dotenv')
// Vermittlung zur Authentifizierung
const authentifizierungsUeberpruefung = require('./Vermittlung/authentifizierungsUeberpruefung')
// Vermittlung zur Firestore-Datenbank
const firestore = require('./Vermittlung/firestore')
// Router für Passwort-Anfragen
const passwortRouter = require('./Router/passwort')
 // Router für Authentifizierungs-Anfragen
const authentifizierungsRouter = require('./Router/authentifizierung')

// Die Umgebungsvariable wird aus der .env-Datei geladen.
dotenv.config()

// Die Anwendung wird als Express-App initialisiert, sodass HTTP-Anfragen und -Antworten verarbeiten zu können.
// Nähere Informationen zu Express auf der Projektseite.
const anwendung = express()

// CORS wird verwendet, Zugriffen aus anderen Quellen zu erlauben.
anwendung.use(cors({ origin: true }))
// Als Datenformat wird JSON verwendet.
anwendung.use(express.json())
// Die AuthentifizierungsÜberprüfungs-Vermittlung wird verwendet, um eine stetige Authentifizierung des Benutzers sicherzustellen.
anwendung.use(authentifizierungsUeberpruefung)
// Die Firestore-Vermittlung wird für die Verbindung zur Firestore-Datenbank verwendet.
anwendung.use(firestore)

// Der AuthentifizierungsRouter und PasswortRouter werden für Endpunkte unter "/authentifizierung" und "/passwort" verwendet.
// So kann die Anwendung gezielt Anfragen erhalten.
anwendung.use('/authentifizierung', authentifizierungsRouter)
anwendung.use('/passwort', passwortRouter)

// Die Express-Anwendung wird als Firebase Cloud Function exportiert, die auf HTTP-Anfragen reagiert.
exports.backend = functions.https.onRequest(anwendung)
