

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
- [Der Login](#der-login)


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

# Der Login

![carbon (5)](https://user-images.githubusercontent.com/111282979/230135631-df8116af-2512-4c7e-a147-b0da3d60ca4e.png)

Zunächst definiert die Funktion ein Joi-Objekt, indem sie die erforderlichen Felder (Benutzername und Passwort) angibt und validiert. Joi ist eine JavaScript-Validierungsbibliothek. Dadurch können Entwickler ein Schema für ein Objekt definieren, das angibt, welche Eigenschaften vorhanden sein sollten, welche Datentypen erwartet werden und welche Validierungsregeln für diese Eigenschaft gelten. Der Benutzername und das Passwort werden dann aus dem Anforderungstext abgeleitet. Die Eingabe wird dann validiert, indem ein Joi-Objekt auf die Eingabe angewendet wird. Bei ungültiger Eingabe wird eine Fehlermeldung mit dem HTTP-Statuscode 400 zurückgegeben. Dann wird überprüft, ob der Benutzername in der Datenbank existiert. Andernfalls wird eine Fehlermeldung mit dem HTTP-Statuscode 400 zurückgegeben. Wenn ein Benutzer in der Datenbank gefunden wird, werden seine Daten analysiert, um sicherzustellen, dass sie korrekt formatiert sind. Das eingegebene Passwort wird dann mittels bcrypt.compareSync() mit dem vom Benutzer hinterlegten Passwort verglichen. Wenn das eingegebene Passwort korrekt ist, wird das JSON Web Token (JWT) mit den Anmeldeinformationen des Benutzers signiert und an den Client zurückgegeben. Wenn das Passwort falsch ist, wird eine HTTP 400-Fehlermeldung zurückgegeben.

# Das Registrieren 

![carbon (6)](https://user-images.githubusercontent.com/111282979/230139035-f0f1f943-1dd3-491e-8c21-4bb71e50dcb5.png)

Dies ist die Funktion des Node.js/Express.js-Controllers, um neue Benutzer in der Anwendung zu registrieren.
Zunächst definiert die Funktion ein Joi-Objekt, indem sie die erforderlichen Felder (Benutzername, Passwort und E-Mail-Adresse) angibt und validiert. Es wurde angegeben, dass der Wert für die E-Mail-Adresse eine gültige E-Mail-Adresse sein muss, aber auch leer gelassen werden kann.
Der Benutzername, das Passwort und die E-Mail-Adresse werden dann aus dem Text der Anfrage extrahiert. Die Eingabe wird dann validiert, indem ein Joi-Objekt auf die Eingabe angewendet wird. Bei ungültiger Eingabe wird eine Fehlermeldung mit dem HTTP-Statuscode 400 zurückgegeben. Dann wird überprüft, ob der Benutzername bereits in der Datenbank existiert. In diesem Szenario wird eine Fehlermeldung mit dem HTTP-Statuscode 400 zurückgegeben. Wenn der Benutzername nicht existiert, wird die Funktion aufgerufen, die den neuen Benutzer in der Datenbank speichert. Passwörter werden verschlüsselt, bevor sie in der Datenbank gespeichert werden. Wenn das Speichern erfolgreich ist, wird eine Erfolgsmeldung mit dem HTTP-Statuscode 200 zurückgegeben.
Dieser Code ist ein Beispiel für eine Implementierung einer einfachen Benutzerregistrierungsfunktion in Node.js/Express.js und enthält Verschlüsselungs- und Eingabevalidierungstechniken, um sicherzustellen, dass Benutzerdaten sicher in der Datenbank gespeichert werden. 



![carbon (7)](https://user-images.githubusercontent.com/111282979/230140426-4839234f-eedf-477d-9894-65578f5069b3.png)

Die erste Funktion (mailUpdate) prüft zunächst, ob der Benutzer authentifiziert ist. In diesem Fall wird ein Joi-Test erstellt, um sicherzustellen, dass die Anfrage einen gültigen E-Mail-Adresswert enthält. Wenn die Anfrage gültig ist, wird die updatedata-Funktion aufgerufen, um die E-Mail-Adresse des Benutzers in der Datenbank zu aktualisieren. Dann wird ein neues JWT mit den aktualisierten Benutzerdetails erstellt und als Antwort an den Client gesendet. Die zweite Funktion (Passwort vergessen) ist noch nicht implementiert und gibt nur eine nicht bereitgestellte Antwort zurück.
Die dritte Funktion (passwordReset) ist ebenfalls nicht implementiert und gibt nur eine Antwort zurück, dass sie noch nicht implementiert ist.


