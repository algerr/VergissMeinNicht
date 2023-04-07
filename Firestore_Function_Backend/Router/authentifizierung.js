// Das Express-Modul wird importiert.
var express = require('express')

// Der Router wird mithilfe des Express-Moduls erstellt.
var router = express.Router()

// Die Funktionen werden aus dem Verwaltungs-Modul werden importiert, um sie mit den entsprechenden Routen zu verknüpfen.
const { anmeldung, registrierung, passwortAktualisieren, accountLoeschen, emailAktualisieren } = require('../Verwaltung/authentifizierung')

// Die Routen werden definiert, indem die entsprechenden Verwaltungs-Funktionen mit HTTP-Methoden und Pfaden verknüpft werden.
router.post('/anmeldung', anmeldung)
router.post('/registrierung', registrierung)
router.post('/emailAktualisieren', emailAktualisieren)
router.post('/passwortAktualisieren', passwortAktualisieren)
router.post('/accountLoeschen', accountLoeschen)

// Der Router wird exportiert, um ihn in der Hauptanwendung verwenden zu können.
module.exports = router