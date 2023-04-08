// Die Funktion nimmt ein JWT als Argument, das aus drei Teilen besteht, die durch Punkte getrennt sind.
export const tokenEntschluesseln = (token) => {
    // Der zweite Teil des Tokens ist ein Base64-codierter JSON-String
    const base64Url = token.split('.')[1]
    // Der JSON-String wird extrahiert
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    // und das darin enthaltene JSON-Objekt dekodiert zurückgegeben.
    return JSON.parse(window.atob(base64))
}

// Diese Funktion überprüft, wie der Name schon sagt, ob das Token abgelaufen ist.
// So kann die Autorisierung von Nutzern überprüft werden.
export const istTokenAbgelaufen = (token) => {
    // Die Entschlüsselungsfunktion wird aufgerufen, um das Ablaufdatum des Tokens zu extrahieren.
    const tokenAblaufdatum = tokenEntschluesseln(token).exp
    // Die aktuelle Zeit wird in die numerische Zeit umgewandelt und kann dann mit dem Ablaufdatum des Tokens verglichen werden.
    const aktuelleZeit = Math.round((new Date()).getTime() / 1000)
    // Wenn die aktuelle Zeit größer, als das Ablaufdatum des Tokens, ist dieses abgelaufen und ein "true" wird zurückgegeben.
    return aktuelleZeit > tokenAblaufdatum
}