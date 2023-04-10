// Aktionstypen in Redux sind Konstanten, die verwendet werden, um Aktionen innerhalb einer Anwendung eindeutig zu identifizieren. 
// Sie dienen als Schlüssel für die Reduzierer, um zu entscheiden, wie der Zustand der Anwendung aktualisiert werden soll. 
// Aktionstypen werden in einer eigenen Datei definiert, um sicherzustellen, dass sie konstant und einfach referenzierbar sind.

// Hier wird ein Aktionstyp für die Speicherung des Tokens festgelegt.
export const AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN = "AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN"

// Hier werden die Aktionstypen für die Verwaltung der Passwörter hinzugefügt.
export const PASSWOERTER_FESTLEGEN = "PASSWOERTER_FESTLEGEN"
export const PASSWORT_HINZUFUEGEN = "PASSWORT_HINZUFUEGEN"
export const PASSWORT_LOESCHEN = "PASSWORT_LOESCHEN"

// Hier werden die Aktionstypen für die Modalfenster festgelegt.
export const OBERES_MODALFENSTER_ANZEIGEN = "OBERES_MODALFENSTER_ANZEIGEN"
export const OBERES_MODALFENSTER_AUSBLENDEN = "OBERES_MODALFENSTER_AUSBLENDEN"
export const SETZE_INHALT_FUER_OBERES_MODALFENSTER = "SETZE_INHALT_FUER_OBERES_MODALFENSTER"

export const ZENTRIERTES_MODALFENSTER_ANZEIGEN = "ZENTRIERTES_MODALFENSTER_ANZEIGEN"
export const ZENTRIERTES_MODALFENSTER_AUSBLENDEN = "ZENTRIERTES_MODALFENSTER_AUSBLENDEN"
export const SETZE_INHALT_FUER_ZENTRIERTES_MODALFENSTER = "SETZE_INHALT_FUER_ZENTRIERTES_MODALFENSTER"
