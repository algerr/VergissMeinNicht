// Die beiden essentiellen Funktionen für Redux-Stores.
import { createStore, combineReducers } from 'redux'

// Die Reduzierer für authentifizierung, passwoerter und modalFenster werden importiert.
import authentifizierung from './reduzierer/authentifizierung'
import passwoerter from './reduzierer/passwoerter'
import modalFenster from './reduzierer/modalFenster'

// Mit "combineReducers" aus der Redux-Bibliothek können mehrere Reduzierer zu einem Hauptreduzierer zusammengefasst werden.
// Somit kann dieser Hauptreduzierer nun die Authentifizierung, die Passwörter und die Modalfenster verwalten.
const hauptReduzierer = combineReducers({
    authentifizierung,
    passwoerter,
    modalFenster
})

// Mit der Funktion "speichernImLokalenSpeicher" kann der Zustand Zustand des Stores im lokalen Speicher des Browsers gespeichert werden.
const speichernImLokalenSpeicher = (state) => {
    try {
        // Der Zustand wird in einen serialisierten JSON-String konvertiert.
        const serialisierterZustand = JSON.stringify(state)
        // Der serialisierte Zustand wird im lokalen Speicher des Browsers als "state" gespeichert.
        localStorage.setItem('state', serialisierterZustand)
    // Bei einem Fehler wird dieser in der Konsole ausgegeben.
    } catch (error) {
        console.log(error)
    }
}

// Mit der Funktion "ausLokalemSpeicherLaden" kann der Zustand des Stores aus dem lokalen Speicher geladen werden.
const ausLokalemSpeicherLaden = () => {
    try {
        // Der Zustand wird aus dem lokalen Speicher entnommen 
        const serialisierterZustand = localStorage.getItem('state')
        // und, wenn er nicht leer ist,
        if (serialisierterZustand === null) return undefined
        // in einen JSON-String serialisiert und dieser zurückgegeben.
        return JSON.parse(serialisierterZustand)
    // Bei einem Fehler wird dieser in der Konsole ausgegeben und die Funktion gibt "undefined" zurück.
    } catch (error) {
        console.log(error)
        return undefined
    }
}

// Der aktuelle Zustand des Stores wird aus dem lokalen Speicher geladen.
const geladenerZustand = ausLokalemSpeicherLaden()

// Mit der Funktion "reduxStore" kann ein Redux Store mit dem Hauptreduzierer und dem geladenen Zustand zu erstellen.
const reduxStore = () => {
    const store = createStore(
        hauptReduzierer,
        geladenerZustand
    )
    // Bei jeder Änderung des Zustandes wird der Store direkt im lokalen Speicher gesichert.
    store.subscribe(() => speichernImLokalenSpeicher(store.getState()))
    return store
}

// Der ReduxStore wird als Standardfunktion exportiert, sodass andere Module diesen importieren können.
export default reduxStore