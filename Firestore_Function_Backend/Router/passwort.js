// Das Express-Modul wird importiert.
var express = require('express')

// Ein Router wird mithilfe des Express-Moduls erstellt.
var router = express.Router()

// Die Verwaltungsfunktionen für die verschiedenen Routen werden aus der Datei '../Verwaltung/passwort.js' importiert.
const { passwortHinzufuegen, passwortLoeschen, allePasswoerter } = require('../Verwaltung/passwort')

// Die verschiedenen Routen werden definiert, indem die entsprechenden Verwaltungsfunktionen mit HTTP-Methoden und Pfaden verknüpft werden.

// Verwaltuns-Funktion für das Hinzufügen eines Passwortes.
router.post('/', passwortHinzufuegen) 
// Verwaltuns-Funktion für das Löschen eines Passwortes anhand der ID.
router.delete('/:passwortId', passwortLoeschen) 
// Verwaltunfs-Funktion für das Abrufen aller Passwörter.
router.get('/', allePasswoerter) 

// Der Router wird exportiert, um ihn in der Hauptanwendung verwenden zu können.
module.exports = router
