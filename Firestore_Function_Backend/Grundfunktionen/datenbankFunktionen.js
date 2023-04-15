// Für die Operationen in der Datenbank werden die Funktionen zum: Hinzufuegen, Lesen, Aktualisieren, Löschen.

// ----------------------------------------------------------------------------------------------------------
//                              Kurze Erklärung zur Funktionsweise von Firestore:
//
// Firestore ist eine dokumentenbasierte NoSQL-Datenbank. Im Gegensatz zu einer SQL-Datenbank gibt es keine Tabellen oder Zeilen. 
// Stattdessen werden die Daten in Dokumenten gespeichert, die in Sammlungen organisiert sind. 
// Jedes Dokument enthält eine Reihe von Schlüssel/Wertpaaren, sogenannten Feldern.
//
// ----------------------------------------------------------------------------------------------------------

// Damit die einzelnen Dokumente (Benutzer und Passwörter) bei einem Blick auf die Firestore-Datenbank nicht direkt zuzuordnen sind, 
// nutzen wir zufällige IDs, die die einzelnen Dokumente abrufbar und auf den ersten Blick unkenntlich machen.
// Die einzelnen Dokumente (Benutzer und Passwörter) bestehen aus verschiedenen Feldern mit Werten.
// Beispielsweise beinhaltet ein Dokument aus der Sammlung "Passwoerter" 
// ein Feld "verschluesseltesPassword", welches das verschlüsselte Passwort beinhaltet.


// Die Funktion zum Schreiben nimmt als Eingabe:
// (Datenbank (datenbank), sammlung (zu der die Daten hinzugefügt werden sollen), die ID (die zur Identifizierung des Dokumentes)).
exports.datenHinzufuegen = (datenbank, sammlung, id, daten) => {
    // Wenn keine ID angegeben wird, wird automatisch eine zufällige Zeichenkette als ID erstellt.
    if (id === null) {
        return datenbank.collection(sammlung).add(daten)
    }
    // Wenn eine ID angegeben ist, wird ein Dokument mit der ID und den Daten in der Sammlung angelegt.
    return datenbank.collection(sammlung).doc(id).set(daten)
}

// Zum Lesen wird als Eingabe wieder die Datenbank, die Sammlung, aus der die Daten abgerufen werden sollen und die ID, deren Daten konkret gelesen werden sollen.
exports.datenLesen = (datenbank, sammlung, id) => {
    // Mit der Funktion 'get()' erhält man die Felder des Dokuments im JSON Format.
    return datenbank.collection(sammlung).doc(id).get()
}

// Bei der Aktualisierung wird die ID des Dokuments benötigt, das aktualisiert werden soll
// und die aktualisierten Daten, welche die alten überschreiben sollen.
exports.datenAktualisieren = (datenbank, sammlung, id, aktualisierteDaten) => {
    return datenbank.collection(sammlung).doc(id).update(aktualisierteDaten)
}

// Zum Löschen der Daten wird nur die ID des Dokuments benötigt, das gelöscht werden soll.
exports.datenLoeschen = (datenbank, sammlung, id) => {
    return datenbank.collection(sammlung).doc(id).delete()
}
