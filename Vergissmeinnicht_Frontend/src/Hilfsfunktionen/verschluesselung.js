// Die Kryptographie-Bibliothek "tweetnacl" wird verwendet, um die Verschlüsselungen durchzuführen
// und Base64 ist zur Konvertierung von Daten in und aus Base64.
import Base64 from 'base64-js'
import nacl from 'tweetnacl'


// Funktion zur Verschlüsselung von Daten.
export const verschluesseln = (schluessel, datenString) => {
    // Die Daten aus der Zeichenfolge werden in einen Byte-Array umgewandelt.
    const datenDecodiert = new Uint8Array(decodeUTF8(datenString))
    // Ein zufälliger Sicherheitswert wird erzeugt.
    const sicherheitswert = nacl.randomBytes(24)

    // Die Passphrase wird aus einem String in einen Byte-Array umgewandelt.
    const schluesselDecodiert = decodeUTF8(schluessel)
    // Der Schlüssel-Array wird auf 32 Byte erweitert.
    const schluesselBytes = new Uint8Array(32)
    schluesselBytes.set(schluesselDecodiert, 0)

    const datenVerschluesselt = nacl.box.after(datenDecodiert, sicherheitswert, schluesselBytes)

    return { verschluesselteDaten: base64Verschluesselung(datenVerschluesselt), sicherheitswert: base64Verschluesselung(sicherheitswert) }
}

// Eine mit NaCl verschlüsselte Datenzeichenfolge wird mithilfe eines Schlüssels und einem Sicherheitswert.
export const entschluesseln = (schluessel, datenStringBase64, sicherheitswertBase64) => {
    try {
        // Decodierung der Datenzeichenfolge aus Base64 in einen Uint8Array.
        const datenDecodiert = new Uint8Array(base64Entschluesselung(datenStringBase64))

        // Decodierung der sicherheitswert aus Base64 in einen Uint8Array.
        const sicherheitswertDecodiert = new Uint8Array(base64Entschluesselung(sicherheitswertBase64))

        // Dekodieren des Schlüssels von UTF-8 zu einem Uint8Array.
        const schluesselDecodiert = decodeUTF8(schluessel)
        const schluesselBytes = new Uint8Array(32)
        schluesselBytes.set(schluesselDecodiert, 0)

        // Entschlüsseln der Daten mit Hilfe von NaCl und Rückgabe als UTF-8-Zeichenfolge.
        const datenEntschluesselt = nacl.box.open.after(datenDecodiert, sicherheitswertDecodiert, schluesselBytes)

        return {entschluesselt: encodeUTF8(datenEntschluesselt)}
    // Wenn es einen Fehler bei der Entschlüsselung gibt, wird ein Fehlerobjekt zurückgegeben.
    } catch (error) {
        return {error: 1}
    }

}

// Mit dieser Funktion wird ein zufälliges kryptographisches Passwort ausgegeben.
// Der Nutzer kann dies bei der Eingabe eines neuen Passwortes nutzen, um sich nicht selbst eines überlegen zu müssen.
export const passwortGenerieren = (length = 24) => {
    const zufaelligeZeichenfolge = nacl.randomBytes(length)
    return base64Verschluesselung(zufaelligeZeichenfolge)
}


// ---------------------------- Encode und Decode UTF8 Funktion von Github-Nutzer "felvieira" (https://gist.github.com/felvieira/b2b3cfec78f0c353c3beac6db151ba1e) ----------------------

function encodeUTF8(data) { // array of bytes
    var str = '',
        i;

    for (i = 0; i < data.length; i++) {
        var value = data[i];

        if (value < 0x80) {
            str += String.fromCharCode(value);
        } else if (value > 0xBF && value < 0xE0) {
            str += String.fromCharCode((value & 0x1F) << 6 | data[i + 1] & 0x3F);
            i += 1;
        } else if (value > 0xDF && value < 0xF0) {
            str += String.fromCharCode((value & 0x0F) << 12 | (data[i + 1] & 0x3F) << 6 | data[i + 2] & 0x3F);
            i += 2;
        } else {
            // surrogate pair
            var charCode = ((value & 0x07) << 18 | (data[i + 1] & 0x3F) << 12 | (data[i + 2] & 0x3F) << 6 | data[i + 3] & 0x3F) - 0x010000;

            str += String.fromCharCode(charCode >> 10 | 0xD800, charCode & 0x03FF | 0xDC00); 
            i += 3;
        }
    }

    return str;
}

const decodeUTF8 = (str) => {
    var utf8 = [];
    for (var i = 0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6),
                0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12),
                0x80 | ((charcode >> 6) & 0x3f),
                0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff) << 10)
                | (str.charCodeAt(i) & 0x3ff))
            utf8.push(0xf0 | (charcode >> 18),
                0x80 | ((charcode >> 12) & 0x3f),
                0x80 | ((charcode >> 6) & 0x3f),
                0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// Diese Funktion nimmt einen Uint8Array entgegen und gibt eine Base64-kodierte Zeichenfolge zurück.
export const base64Verschluesselung = (data) => Base64.fromByteArray(data)

// Diese Funktion nimmt eine Base64-kodierte Zeichenfolge entgegen und gibt einen Uint8Array zurück.
export const base64Entschluesselung = (str) => Base64.toByteArray(str)
