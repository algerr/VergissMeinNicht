

# Inhaltsverzeichnis

- [Blogeinträge](#blogeinträge)
- [Vergiss Mein Nicht](#vergiss-mein-nicht)
- [Planskizzen](#planskizzen)
   - [Hauptthema](#hauptthema)
   - [Das Login Fenster](#das-login-fenster)
   - [Die Firebase Datenbank](#die-firebase-datenbank)
   - [Die Passwort Verwaltung](#die-passwort-verwaltung)
   - [Der Ablauf vom Programm](#der-ablauf-vom-programm)
   - [Vergleich zur 2FA-Authetifizierung](#vergleich-zur-2fa-authentifizierung)
- [Functions](#functions)
   - [Der Login](#der-login)
   - [Das Registrieren](#das-registrieren)
   - [Die Authentifizierung](#die-authentifizierung)
   - [Die Passwortverwaltung](#die-passwortverwaltung)
   - [Die Löschung des Benutzerkontos](#die-loeschung-des-benutzerkontos)
   - [Der Sicherheitsschritt](#der-sicherheitsschritt)
   - [Die Löschung von Datensätzen in der Firebase](#die-loesung-von-datensätzen-in-der-firebase)
   - [Die Aktualisierung](#die-aktualisierung)
   - [Der Zugriff auf die Passwörter](#der-zugriff-auf-die-passwörter)
   - [Die Extrahierung einzelner Kontoeigenschaften](#die-extrahierung-einzelner-kontoeigenschaften)
   - [Die Datenverwaltung](#die-datenverwaltung)
   - [Die Firebase-Cloudfunktion](#die-firebase-cloudfunktion)

# Blogeinträge

[Zu den Blogeinträgen](https://github.com/algerr/blogeintraege-2)

# Vergiss Mein Nicht
Sind Sie genervt von der ewigen Suche nach dem Passwort? Wir haben die Lösung!

Wie wir es bereits in unseren Blogeinträgen erwähnt hatten, war seit dem 14.03.2023 unser oberstes Ziel bis zu den Osterferien einen Passwort Manager zu entwickeln, welcher es den Nutzern im Internet erleichern sollte einen richtigen Umgang mit den Plattformen, welchen sie nutzen, zu erlernen. Vor allem sollten die Menschen von nun an Sicherheit geboten bekommen, damit Hacker so gut wie keine Chance mehr haben sollten, Daten anderer Menschen zu stehlen. Gerade Unternehmen, die mit mehreren Passwörtern innerhalb des Internets arbeiten, können sehr von so einer Idee provitieren. Auch das es ein Tool geben sollte, welches ganz von alleine Passwörter generiert, die absoulut sicher sind, wäre ebenfalls nur von Vorteil. Die erste Grundidee war es also zunächst einmal ein Passwort zu erstellen, welches die anderen Passwörter, die man hat, mit Hilfe einer Verschlüsselung, schützt. Insofern sollte dieses Konzept der 2FA Authentifizierung ähneln, die ebenfalls eine weit verbreitete Möglichkeit ist, Daten bzw. Accounts zu schützen, indem eine zusätzliche Sicherheitsmaßnahme wie eine Bestätigung über die Email einbaut. 

# Planskizzen

## Hauptthema

![image](https://user-images.githubusercontent.com/65679099/224968022-85e0eebb-76bc-40d6-9e07-5ef4b873ab5b.png)

Bevor wir mit der eigentlichen Programmierung loslegten, gingen wir zunächst in die Plannungsphase über, da es immer sinnvoll ist, ersteinmal grob zu skizzieren was man eigentlich vor hat, um im Nachhinein Einzelheiten abzuändern und gegebenfalls etwas wegzulassen oder zu verbessern. Wie in der ersten Skizze zu erkennen, sollen das die groben Kriterien sein, nach welchen unserer fertige Website geplannt werden soll. Zu aller erst sollte unsere Webside natürlich über eine Funktion verfügen, um das Profil bzw. die damit verbundenen Einstellungen zu verwalten. Unter dem Profil Icon soll der Nutzer also die Möglichkeit haben sein Passwort von dem Programm selbst oder auch seine Email zu verändern. Auch sollte es hier die Möglichkeit geben z.B. seinen Account löschen zu können. Das Herzstück unseres Programms sollte nun das Masterpasswort selbst sein, welches wie zuvor erwähnt die anderen Passwörter, die man hat, durch die Verschlüsselung dieser schützen sollte. Neben der Festlegung des Masterpassworts sollte man auch die Möglichkeit haben hier seine aufgelisteten Passwörter, die man normalerweise für die einzelnen Plattformen hat, zu betrachten. Die einzelnen Passwörter, die hier aufgelistet werden, könnten aber nur dann eingesehen werden, wenn das richtige Masterpasswort eingegeben wurde.

## Das Login Fenster

![image](https://user-images.githubusercontent.com/111282979/225117491-64072da5-64b7-4b18-a028-b2b119b8ffa3.png)

Bei dieser Skizze lässt sich schon erkennen, dass es sich hierbei um eine grobe Vorstellung handeln soll, wie das Fenster aussehen soll, wenn man einen Account für unser Programm anlegen möchte. Nachdem man durch seine Email und sein Passwort sich bei unserem Programm registriert hat, kann man sich hier auch danach gleichzeitig anmelden, um dann zu dem Hauptfenster zu gelangen, welches der vorher erläuterten Skizze entspricht. Wenn man sich zu aller erst in seinen Account einloggt, legt man entweder zuerst sein Masterpasswort fest, welches die anderen normalen Passwörter, die man bereits hat, verschlüsselt, oder man hat bereits ein Masterpasswort, welches aktiv die anderen Passwörter verschlüsselt, indem es diese unkenntlich macht. Wenn man sein Masterpasswort eingibt bzw. dieses bestätigt, werden die anderen Paswörter einem zur Anzeige freigeschaltet.

## Die Firebase Datenbank 

<img width="417" alt="image" src="https://user-images.githubusercontent.com/65679099/230046973-ca71bb0f-eb67-489f-a4b1-0f72b401cc57.png">

Im oberen Bild wird der Aufbau unserer Firestore Datenbank visualisiert. Diese Datenbank organisiert und und speichert die Daten unserer Nutzer. Die Firestore Datenbank umfasst die Passwörter, die als Items gekennzeichnet sind, den Benutzer selbst, die Beschreibung, das Passwort, welches durch das Masterpasswort verschlüsselt wird und nochmal den seperaten Benutzernamen. Eine Erklärung der Programmierung dieser Datenbank folgt. 

## Die Passwort Verwaltung 

<img width="382" alt="image" src="https://user-images.githubusercontent.com/65679099/230047083-10ea2da5-707f-4c4e-9487-9576a169b1c4.png">

Dies ist die Funktion des Node.js/Express.js-Controllers, um neue Benutzer in der Anwendung zu registrieren.
Zunächst definiert die Funktion ein Joi-Objekt, indem sie die erforderlichen Felder (Benutzername, Passwort und E-Mail-Adresse) angibt und validiert. Es wurde angegeben, dass der Wert für die E-Mail-Adresse eine gültige E-Mail-Adresse sein muss, aber auch leer gelassen werden kann.
Der Benutzername, das Passwort und die E-Mail-Adresse werden dann aus dem Text der Anfrage extrahiert. Die Eingabe wird dann validiert, indem ein Joi-Objekt auf die Eingabe angewendet wird. Bei ungültiger Eingabe wird eine Fehlermeldung mit dem HTTP-Statuscode 400 zurückgegeben. Dann wird überprüft, ob der Benutzername bereits in der Datenbank existiert. In diesem Szenario wird eine Fehlermeldung mit dem HTTP-Statuscode 400 zurückgegeben. Wenn der Benutzername nicht existiert, wird die Funktion aufgerufen, die den neuen Benutzer in der Datenbank speichert. Passwörter werden verschlüsselt, bevor sie in der Datenbank gespeichert werden. Wenn das Speichern erfolgreich ist, wird eine Erfolgsmeldung mit dem HTTP-Statuscode 200 zurückgegeben.
Dieser Code ist ein Beispiel für eine Implementierung einer einfachen Benutzerregistrierungsfunktion in Node.js/Express.js und enthält Verschlüsselungs- und Eingabevalidierungstechniken, um sicherzustellen, dass Benutzerdaten sicher in der Datenbank gespeichert werden.

In dieser Abbildung soll gezeigt werden, dass unser Programm Passwörter hinzufügen kann und diese verwaltet. Zudem kommt hier unsere besondere Funktion ins Spiel, welche es unseren Nutzern erlaubt automatisch starke Passwörter zu generieren, die wiederum von dem Masterpasswort geschützt sind. Wenn der Benutzer das richtige Masterpasswort eingegeben hat und dies bestätigt wurde, werden die eigentlichen Passwörter die man besitzt entschlüsselt. Damit der Benutzer sich sein neu generiertes starkes Passwort nicht selber merken muss, gibt es die Option sich die Passwörter zu kopieren und sie dann anschließend wo auch immer einzufügen. Man muss sich somit nur das Masterpasswort merken.

## Der Ablauf vom Programm

<img width="496" alt="image" src="https://user-images.githubusercontent.com/65679099/230047597-923a63fb-f1cf-4b16-a339-ce325aa7320e.png">

In der folgenden Skizze wird der genaue Ablauf unseres Programms thematisiert. Wenn man sich zunächst einloggen möchte, gibt man seine Benutzerdaten, also seine Email und sein Passwort ein. Diese Informationen werden an die die Firebase geschickt und abgeglichen. Wenn die eingegeben Daten korrekt sind, wird man zu der Hauptseite hingeleitet, welche das Herzstück von allem ist. Von der Hauptseite aus können dann wie bereits angesprochen die eigenen Passwörter festgelegt bzw. auch generiert werden und anschließend durch das festgelegte Masterpasswort geschützt werden. Bei der Eingabe des Masterpassworts werden die anderen Passwörter von der Firebase freigeschaltet, sodass man anschließend auf diese zugreifen kann. Auf diese Art kann unseren Nutzern die versprochene Sicherheit gewährleistet werden. 

## Vergleich zur 2FA-Authentifizierung

Um nochmal genau zu erläutern, wie sich die 2FA-Authetifizierung von unserem Konzept unterscheidet, soll dies die sich unten befindliche Abbildung illustrieren. Bei der 2FA-Authetifizierung ist es so, dass der Benutzer nach der Eingabe seiner Daten dazu aufgefordert wird seine Identität zu bestätigen. Dies kann auf mehreren Wegen durchgeführt werden. Entweder erhält der Benutzer eine Email auf dem Konte mit welchem er sich anmeldet, die er anschließend bestätigen muss oder eine SMS, welche zu der Telefonnummer gelangt, mit welcher das Email Konto verknüpft ist. Das Problem allerdings hier, ist, dass der Nutzer gefährdet ist, sobald ein Hacker den Zugriff auf seine Telefonnummer oder sein Emailkonto hat. Wir umgehen dieses Problem, indem wir ein zusätliches Masterpasswort haben, welches der Hacker ebenfalls entschlüsseln müsste, um an die ganzen Passwörter eines Nutzers zu kommen. 

<img width="375" alt="image" src="https://user-images.githubusercontent.com/65679099/230047871-1663e6fb-b793-4c72-8bbc-32c5ef511c72.png">

## Der Login

![carbon (5)](https://user-images.githubusercontent.com/111282979/230135631-df8116af-2512-4c7e-a147-b0da3d60ca4e.png)

Zunächst definiert die Funktion ein Joi-Objekt, indem sie die erforderlichen Felder (Benutzername und Passwort) angibt und validiert. Joi ist eine JavaScript-Validierungsbibliothek. Dadurch können Entwickler ein Schema für ein Objekt definieren, das angibt, welche Eigenschaften vorhanden sein sollten, welche Datentypen erwartet werden und welche Validierungsregeln für diese Eigenschaft gelten. Der Benutzername und das Passwort werden dann aus dem Anforderungstext abgeleitet. Die Eingabe wird dann validiert, indem ein Joi-Objekt auf die Eingabe angewendet wird. Bei ungültiger Eingabe wird eine Fehlermeldung mit dem HTTP-Statuscode 400 zurückgegeben. Dann wird überprüft, ob der Benutzername in der Datenbank existiert. Andernfalls wird eine Fehlermeldung mit dem HTTP-Statuscode 400 zurückgegeben. Wenn ein Benutzer in der Datenbank gefunden wird, werden seine Daten analysiert, um sicherzustellen, dass sie korrekt formatiert sind. Das eingegebene Passwort wird dann mittels bcrypt.compareSync() mit dem vom Benutzer hinterlegten Passwort verglichen. Wenn das eingegebene Passwort korrekt ist, wird das JSON Web Token (JWT) mit den Anmeldeinformationen des Benutzers signiert und an den Client zurückgegeben. Wenn das Passwort falsch ist, wird eine HTTP 400-Fehlermeldung zurückgegeben.

## Das Registrieren 

![carbon (6)](https://user-images.githubusercontent.com/111282979/230139035-f0f1f943-1dd3-491e-8c21-4bb71e50dcb5.png)

Dies ist die Funktion des Node.js/Express.js-Controllers, um neue Benutzer in der Anwendung zu registrieren.
Zunächst definiert die Funktion ein Joi-Objekt, indem sie die erforderlichen Felder (Benutzername, Passwort und E-Mail-Adresse) angibt und validiert. Es wurde angegeben, dass der Wert für die E-Mail-Adresse eine gültige E-Mail-Adresse sein muss, aber auch leer gelassen werden kann.
Der Benutzername, das Passwort und die E-Mail-Adresse werden dann aus dem Text der Anfrage extrahiert. Die Eingabe wird dann validiert, indem ein Joi-Objekt auf die Eingabe angewendet wird. Bei ungültiger Eingabe wird eine Fehlermeldung mit dem HTTP-Statuscode 400 zurückgegeben. Dann wird überprüft, ob der Benutzername bereits in der Datenbank existiert. In diesem Szenario wird eine Fehlermeldung mit dem HTTP-Statuscode 400 zurückgegeben. Wenn der Benutzername nicht existiert, wird die Funktion aufgerufen, die den neuen Benutzer in der Datenbank speichert. Passwörter werden verschlüsselt, bevor sie in der Datenbank gespeichert werden. Wenn das Speichern erfolgreich ist, wird eine Erfolgsmeldung mit dem HTTP-Statuscode 200 zurückgegeben.
Dieser Code ist ein Beispiel für eine Implementierung einer einfachen Benutzerregistrierungsfunktion in Node.js/Express.js und enthält Verschlüsselungs- und Eingabevalidierungstechniken, um sicherzustellen, dass Benutzerdaten sicher in der Datenbank gespeichert werden. 

## Die Authentifizierung

![carbon (7)](https://user-images.githubusercontent.com/111282979/230140426-4839234f-eedf-477d-9894-65578f5069b3.png)

Die erste Funktion (mailUpdate) prüft zunächst, ob der Benutzer authentifiziert ist. In diesem Fall wird ein Joi-Test erstellt, um sicherzustellen, dass die Anfrage einen gültigen E-Mail-Adresswert enthält. Wenn die Anfrage gültig ist, wird die updatedata-Funktion aufgerufen, um die E-Mail-Adresse des Benutzers in der Datenbank zu aktualisieren. Dann wird ein neues JWT mit den aktualisierten Benutzerdetails erstellt und als Antwort an den Client gesendet. Die zweite Funktion (Passwort vergessen) ist noch nicht implementiert und gibt nur eine nicht bereitgestellte Antwort zurück.
Die dritte Funktion (passwordReset) ist ebenfalls nicht implementiert und gibt nur eine Antwort zurück, dass sie noch nicht implementiert ist.

## Die Passwortverwaltung

![carbon (8)](https://user-images.githubusercontent.com/111282979/230147964-b0eaeb27-d949-463b-913f-f02baa7a526c.png)

Dieser Code definiert drei Funktionen im Zusammenhang mit der Passwortverwaltung und der Benutzerauthentifizierung in der Webanwendung.
Die Funktion "Passwort vergessen" ist noch nicht implementiert und gibt nur eine Meldung zurück, dass sie noch nicht implementiert ist. Die Funktion „Passwort zurücksetzen“ ist ebenfalls noch nicht implementiert und gibt eine ähnliche Meldung zurück.
Die Funktion „Passwort ändern“ erfordert eine Benutzerauthentifizierung. Wenn der Benutzer nicht authentifiziert ist, wird eine Fehlermeldung zurückgegeben.
Die Joi.object-Funktion definiert ein Schema, das die alten und neuen Passwörter des Benutzers enthält. Dann werden das alte und das neue Passwort aus dem Request-Objekt extrahiert und zur Authentifizierung in das Joi-Objekt eingefügt. Wenn der Test fehlschlägt, wird eine Fehlermeldung zurückgegeben. Dann wird versucht, den Benutzer aus der Datenbank auszulesen. Wenn der Benutzer nicht existiert, wird eine Fehlermeldung zurückgegeben. Wenn der Benutzer existiert, wird das alte eingegebene Passwort mit dem in der Datenbank gespeicherten Passwort verglichen. Wenn das Passwort korrekt ist, wird das Passwort in der Datenbank mit dem neu eingegebenen Passwort aktualisiert. Andernfalls wird eine Fehlermeldung zurückgegeben, dass das alte Passwort ungültig ist.

## Die Löschung des Benutzerkontos

![carbon (9)](https://user-images.githubusercontent.com/111282979/230159660-fce57a40-ef9c-403c-bd71-573086e5d4f5.png)

Dieser Code ist die Funktion zum Löschen des Benutzerkontos.
Zunächst wird überprüft, ob der Benutzer authentifiziert ist. Andernfalls wird eine Fehlermeldung zurückgegeben.
Anschließend wird eine Abfrage an die Firestore-Datenbank gesendet, um alle Passwörter abzurufen, die dem Benutzer gehören, dessen Konto gelöscht wird. Anschließend wird für jedes Dokument die Methode .delete() aufgerufen, um Einträge aus der Sammlung „Passwords“ zu entfernen.
Die Funktion deleteata() wird dann aufgerufen, um den Benutzer aus der Sammlung "Benutzer" zu entfernen. Abschließend wird eine Erfolgsmeldung mit dem Statuscode 200 zurückgegeben.

## Der Sicherheitsschritt

![carbon (10)](https://user-images.githubusercontent.com/111282979/230160241-9bbd6e2f-15b1-4392-be47-b872b41b6e5f.png)

Dieses Snippet definiert eine Funktion namens add, die eine HTTP-POST-Anforderung an einen bestimmten Endpunkt verarbeitet. Die Funktion zum Speichern des neuen Passworts für den aktuell authentifizierten Benutzer in der Datenbank. Zunächst prüft die Funktion, ob der Benutzer authentifiziert ist. Andernfalls wird eine Fehlermeldung zurückgegeben und die Funktion beendet. Als nächstes wird ein Datenvalidierungsschema definiert, das erforderliche Felder für das Passwort enthält, nämlich Beschreibung, verschlüsseltes Passwort und Validierungsnachricht.
Die Funktion extrahiert diese Daten dann aus dem Text der HTTP-Anforderung und verifiziert sie anhand des zuvor definierten Schemas. Schlägt der Test fehl, wird eine Fehlermeldung zurückgegeben und die Funktion beendet.
Wenn die Authentifizierung erfolgreich ist, wird ein neues Kennwortobjekt in der Datenbank erstellt und das neue Kennwort als Antwort zurückgegeben. Die Antwort enthält auch eine Erfolgsmeldung.
Die Funktion verwendet verschiedene Hilfsfunktionen wie firestoreWrite, um Daten in die Datenbank zu schreiben.

## Die Löschung von Datensätzen in der Firebase 

![carbon (11)](https://user-images.githubusercontent.com/111282979/230160847-b3c8428a-e329-49de-ab84-fcdbd7440786.png)

Diese Funktion ist für das Löschen von Datensätzen in Firebase verantwortlich. Zunächst wird überprüft, ob der Benutzer authentifiziert ist. Es prüft dann, ob der übergebene Parameter für die Passwort-ID gültig ist. Wenn der Benutzer nicht der Eigentümer des gelöschten Elements ist, wird ein Fehler zurückgegeben. Schließlich wird eine Funktion aufgerufen, um den Eintrag mit der übergebenen Passwort-ID aus der Datenbank zu entfernen. Wenn das Löschen erfolgreich war, wird eine Erfolgsmeldung zurückgegeben.

## Die Aktualisierung

![carbon (12)](https://user-images.githubusercontent.com/111282979/230161692-40e98031-1e9f-4995-9559-4ec7e2e98459.png)

Der Code definiert eine Funktion namens "update", die, wenn sie aufgerufen wird, ein Objekt mit Anforderungs- und Antwortinformationen erwartet.
Zunächst wird überprüft, ob der Benutzer authentifiziert ist. Andernfalls wird eine Fehlermeldung an den Client gesendet.
Als Nächstes wird ein Authentifizierungsschema definiert, das die Validierung von vier Attributen erfordert: Beschreibung, Verschlüsselungskennwort, authNonce und Kennwort-ID. Description,crypted_password und authNonce werden aus dem Anforderungstext entnommen und passwordId wird aus den Anforderungsparametern entnommen. Die Schemavalidierung erfolgt durch Aufrufen der „validate“-Methode in Joi, einem Validierungsframework. Wenn der Test fehlschlägt, wird eine Fehlermeldung an den Client zurückgegeben. Es wird dann überprüft, ob das Passwort mit dem aktuellen Benutzernamen übereinstimmt. Andernfalls wird eine Fehlermeldung an den Client zurückgesendet. Schließlich wird firestoreUpdate aufgerufen, um das Kennwort in der Firestore-Datenbank zu aktualisieren. Eine Bestätigungsnachricht wird an den Client zurückgesendet.

## Der Zugriff auf die Passwörter

![carbon (13)](https://user-images.githubusercontent.com/111282979/230162236-fd8978e3-dd47-4422-840d-eb2b36bb556f.png)

Die Funktion getAll wird aufgerufen, um alle Passwörter eines bestimmten Benutzers aus der Datenbank abzurufen. Der Benutzer muss authentifiziert werden, um diese Funktion auszuführen, andernfalls wird ein Fehler zurückgegeben. Die Funktion sucht nach allen Dokumenten in der Sammlung "Passwörter", deren Feld "Benutzername" mit dem authentifizierten Benutzernamen übereinstimmt, und gibt sie als Einträge zurück.
Dann wird ein leeres itemsArray erstellt, das alle Dokumente in den Elementen durchläuft, und jedes Element wird mit dem ID-Feld und allen anderen Feldern im Dokument in ein Objekt konvertiert und dem itemsArray hinzugefügt. Schließlich wird das itemsArray als Antwort an den Client zurückgegeben.
Die Funktion passwordUsernameValidation wird verwendet, um das Kennwort anhand des aktuellen Benutzernamens zu validieren. Die Funktion nimmt ein req.firestore Firestore-Objekt und einen Bezeichner als Parameter. Zunächst wird versucht, das Dokument mit der angegebenen ID aus der Firestore-Datenbank auszulesen. Wenn das Dokument nicht gefunden wird, wird false zurückgegeben.
Andernfalls wird das Passwortobjekt aus dem Dokument genommen und mit der aktuellen username-Eigenschaft des req-Objekts verglichen. Bei Übereinstimmung gibt die Funktion true zurück, andernfalls false.

## Die Extrahierung einzelner Kontoeigenschaften

![carbon (14)](https://user-images.githubusercontent.com/111282979/230162821-4c117801-5eee-42b8-ad46-375460f23a5c.png)

Dieser Code definiert zwei Funktionen parseUser und parsePassword. Beide Funktionen werden verwendet, um Objekte mit bestimmten Eigenschaften zu extrahieren. Die Funktion parseUser extrahiert den Benutzernamen, das Passwort und die E-Mail-Adresse aus dem Benutzerobjekt und gibt ein neues Objekt mit diesen Eigenschaften zurück.
Die Funktion parsePassword extrahiert die Eigenschaften username, description, password_encrypted und nonce aus dem Passwortobjekt und gibt ein neues Objekt mit diesen Eigenschaften zurück.

## Die Datenverwaltung

![carbon (15)](https://user-images.githubusercontent.com/111282979/230163584-b22e0256-0d82-45dd-88a1-f11712df5786.png)

Dieser Code ist eine Reihe von JavaScript-Funktionen, die zum Erstellen, Lesen, Aktualisieren und Löschen (CRUD) in der Google Cloud Platform Firestore-Datenbank verwendet werden können.
Die erste Funktion, adddata, ermöglicht das Hinzufügen von Daten zu einer Firestore-Sammlung. Überprüft, ob für das Dokument eine ID angegeben ist. Wenn dies der Fall ist, werden die Daten mit der angegebenen ID in die Sammlung eingefügt. Andernfalls wird das Dokument automatisch mit einer eindeutigen ID generiert.
Die zweite Funktion, readdata, ermöglicht es Ihnen, Daten aus der Firestore-Sammlung basierend auf der Dokument-ID zu lesen. Dokumentfelder werden im JSON-Format zurückgegeben.
Mit der dritten Funktion, updatedata, können Sie die Daten im Dokument der Firestore-Sammlung aktualisieren. Dazu ist es erforderlich, die Dokument-ID zu aktualisieren und die alten Felder mit aktualisierten Daten zu überschreiben.
Die vierte Funktion, Daten löschen, ermöglicht Ihnen das Entfernen von Daten aus Dokumenten in der Firestore-Sammlung basierend auf der Dokument-ID. Alle Funktionen arbeiten mit der Firestore-Instanzdatenbank und einer Reihe von Sammlungsnamen. Sie verwenden die Befehle add, doc, get, update und delete von Firestore, um ihre jeweiligen Operationen auszuführen.

## Die Firebase-Cloudfunktion

![carbon (16)](https://user-images.githubusercontent.com/111282979/230164283-da4cb773-0c5f-45ae-9f38-4d68c0e342b6.png)

Diese Codezeile erstellt eine Firebase-Cloudfunktion, die als HTTP-Endpunkt dient. Die API wird ausgeführt, wenn auf einen bestimmten Endpunkt zugegriffen wird. functions.https.onRequest ist eine Firebase Cloud Function, die als HTTP-Request-Handler fungiert. app ist ein Express-Objekt, das Routen und Handler für API-Endpunkte enthält. Zusammen bilden sie die Cloud-Funktionalität von Firebase, die HTTP-Anforderungen an in der Anwendung definierte Routen und Handler umleitet.














