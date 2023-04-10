<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons Lizenzvertrag" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />`Dieses Werk ist lizenziert unter einer:` <br>
<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">`Creative Commons Namensnennung` - `Nicht kommerziell` - `Keine Bearbeitungen 4.0 International Lizenz`</a>

https://user-images.githubusercontent.com/65679099/230721605-d894c2f3-10a2-4caa-b00d-018e8061457d.mp4

# VergissMeinNicht
Sind Sie genervt von der ewigen Suche nach dem Passwort? Wir haben die Lösung!

Wie bereits in unseren Blogeinträgen erwähnt, war es seit dem 14.03.2023 unser Hauptziel, bis zu den Osterferien einen Passwortmanager zu entwickeln, der es den Internetnutzern erleichtern soll, den richtigen Umgang mit den von ihnen genutzten Plattformen zu erlernen. Vor allem sollte den Menschen ab sofort Sicherheit geboten werden, damit Hacker kaum noch eine Chance haben, Daten von anderen zu stehlen. Gerade Unternehmen, die mit mehreren Passwörtern im Internet arbeiten, können von einer solchen Idee sehr profitieren. Auch dass es ein Tool geben sollte, das von sich aus Passwörter generiert, die absolut sicher sind, wäre nur von Vorteil. Die erste Grundidee war also, ein Passwort zu generieren, welches die anderen Passwörter, die man hat, durch Verschlüsselung schützt. Insofern sollte dieses Konzept der 2FA-Authentifizierung ähneln, die ebenfalls eine weit verbreitete Möglichkeit ist, Daten bzw. Konten zu schützen, indem eine zusätzliche Sicherheitsmaßnahme wie eine Bestätigung per E-Mail eingebaut wird. 

# Inhaltsverzeichnis

- [Das Stundenprotokoll](#das-stundenprotokoll)
- [Die Planskizzen](#die-planskizzen)
   - [Hauptseite](#hauptseite)
   - [Der Login](#der-login)
   - [Die Firebase Datenbank](#die-firebase-datenbank)
   - [Die Passwort Verwaltung](#die-passwort-verwaltung)
   - [Die Kommunikation mit dem Firestore](#die-kommunikation-mit-dem-firestore)
   - [Vergleich zur 2-Faktor-Authentifizierung](#vergleich-zur-2-faktor-authentifizierung)
- [Das Frontend](#das-frontend)
   - [Die Komponenten](#die-komponenten)
      - [Die Anmeldung](#die-anmeldung)
      - [Die Registrierung](#die-registrierung)
      - [Die Startseite](#die-startseite)
      - [Der Passwort Manager](#der-passwort-manager)
      - [Der Eingabebereich](#der-eingabebereich)
      - [Ein neues Passwort hinzufügen](#ein-neues-passwort-hinzufuegen)
      - [Die Passwortanzeige](#die-passwortanzeige)
      - [Das Modalfenster](#das-modalfenster)
      - [Die Seitenleiste](#die-seitenleiste)
      - [Die Tabelle](#die-tabelle)
      - [Die Accounteinstellungen](#die-accounteinstellungen)
   - [Die Hilfsfunktionen](#die-hilsfunktionen)
      - [Die Verschlüsselung](#die-verschlüsselung)
      - [Der Server](#der-server)
      - [Das Token](#das-token)
   - [Der Redux-Store](#der-redux-store)
      - [Der Aktionserzeuger](#der-aktionserzeuger)
      - [Die Aktionstypen](#die-aktionstypen)
      - [Die Authentifizierung](#die-authentifizierung)
      - [Das Modalfenster](#das-modalfenster)
      - [Die Reduzierungen](#die-reduzierungen)
      - [Das Modalfenster](#das-modalfenster)
      - [Der Reduxstore](#der-reduxstore)
- [Das Backend](#das-backend)
  - [Die Grundfunktionen](#die-grundfunktionen)
      - [Das Abrufen der Daten](#das-abrufen-der-daten)
      - [Die Funktionen der Datenbank](#die-funktionen-der-datenbank)
      - [Die Authentifizierung](#die-authentifizierung)
      - [Das Passwort](#das-passwort)
      - [Die Vermittlung](#die-vermittlung)
      - [Der Firestore](#der-firestore)
      - [Die Verwaltung](#die-verwaltung)
      - [Die Authentifizierung](#die-authentifizierung)
      - [Das Passwort](#das-passwort)
      - [Der Index](#der-imdex)
      
- [Authoren](#authoren)

# Das Stundenprotokoll

[Zum Stundenprotokoll](https://github.com/algerr/blogeintraege-2)

<details>
   <summary><h1>Die Planskizzen</h1></summary>
   
## Hauptseite

![224968022-85e0eebb-76bc-40d6-9e07-5ef4b873ab5b](https://user-images.githubusercontent.com/111282979/230732027-9d22d0b8-5d4e-4ea6-b4c6-df0d169a6287.png)

Bevor wir mit der eigentlichen Programmierung begonnen haben, sind wir erst einmal in die Planungsphase gegangen, denn es ist immer sinnvoll, erst einmal grob zu skizzieren, was man eigentlich vorhat, um dann im Nachhinein die Details zu ändern und gegebenenfalls etwas wegzulassen oder zu verbessern. Wie in der ersten Skizze zu sehen ist, sollen dies die groben Kriterien sein, nach denen unsere fertige Website geplant werden soll. Als erstes soll unsere Website natürlich eine Funktion zur Verwaltung des Profils bzw. der damit verbundenen Einstellungen haben. Unter dem Profil-Icon sollte der Nutzer also die Möglichkeit haben, sein Passwort aus dem Programm selbst oder auch seine Emailadresse zu ändern. Auch soll es hier die Möglichkeit geben, z.B. seinen Account löschen zu können. Das Herzstück unseres Programms soll nun das Masterpasswort selbst sein, welches, wie bereits erwähnt, die anderen Passwörter, die man hat, durch Verschlüsselung schützen soll. Neben der Festlegung des Masterpasswortes sollte man hier auch die Möglichkeit haben, seine aufgelisteten Passwörter, die man normalerweise für die einzelnen Plattformen hat, einzusehen. Die einzelnen Passwörter, die hier aufgelistet sind, können jedoch nur eingesehen werden, wenn das richtige Masterpasswort eingegeben wurde.
   
## Der Login

![225117491-64072da5-64b7-4b18-a028-b2b119b8ffa3](https://user-images.githubusercontent.com/111282979/230732042-01607555-12f6-4a85-a5e4-f175904d07e1.png)

Aus dieser Skizze kann man schon erkennen, dass es sich hier um eine grobe Vorstellung handelt, wie das Fenster aussehen soll, wenn man einen Account für unser Programm anlegen möchte. Nachdem man sich mit seiner Email und seinem Passwort bei unserem Programm registriert hat, kann man sich auch gleichzeitig hier einloggen, um dann in das Hauptfenster zu gelangen, welches der vorher erläuterten Skizze entspricht. Wenn man sich zum ersten Mal in sein Konto einloggt, legt man entweder zuerst sein Masterpasswort fest, das die anderen normalen Passwörter, die man bereits hat, verschlüsselt, oder man hat bereits ein Masterpasswort, das die anderen Passwörter aktiv verschlüsselt, indem es sie unkenntlich macht. Wenn man sein Masterpasswort eingibt oder bestätigt, werden die anderen Passwörter zur Anzeige freigeschaltet.

## Die Firestore Datenbank 

![230046973-ca71bb0f-eb67-489f-a4b1-0f72b401cc57](https://user-images.githubusercontent.com/111282979/230732069-8796fdfb-8d31-4492-8a68-8150bbc377d7.png)

Die Skizze zeigt die Struktur unserer Firestore-Datenbank. Diese Datenbank organisiert und speichert die Daten unserer Benutzer. Die Firestore-Datenbank besteht aus den Passwörtern, die als Items gekennzeichnet sind, dem Benutzer selbst, der Beschreibung, dem Passwort, das durch das Masterpasswort verschlüsselt wird und noch einmal dem separaten Benutzernamen. Im Folgenden wird die Programmierung dieser Datenbank erläutert. 

## Die Passwort Verwaltung 

![230047083-10ea2da5-707f-4c4e-9487-9576a169b1c4](https://user-images.githubusercontent.com/111282979/230732091-e6c21533-035c-4796-8750-9ca677977960.png)

Dies ist die Funktion des Node.js/Express.js Controllers, um neue Benutzer in der Anwendung zu registrieren.
Zunächst definiert die Funktion ein Joi-Objekt, indem die erforderlichen Felder (Benutzername, Passwort und E-Mail-Adresse) angegeben und validiert werden. Es wurde festgelegt, dass der Wert für die E-Mail-Adresse eine gültige E-Mail-Adresse sein muss, aber auch leer gelassen werden kann.
Der Benutzername, das Passwort und die E-Mail-Adresse werden dann aus dem Text der Anfrage extrahiert. Die Eingabe wird dann validiert, indem ein Joi-Objekt auf die Eingabe angewendet wird. Ist die Eingabe ungültig, wird eine Fehlermeldung mit dem HTTP-Statuscode 400 zurückgegeben. Anschließend wird geprüft, ob der Benutzername bereits in der Datenbank vorhanden ist. In diesem Fall wird eine Fehlermeldung mit dem HTTP-Statuscode 400 zurückgegeben. Wenn der Benutzername nicht existiert, wird die Funktion aufgerufen, die den neuen Benutzer in der Datenbank speichert. Passwörter werden vor dem Speichern in der Datenbank verschlüsselt. Wenn die Speicherung erfolgreich war, wird eine Erfolgsmeldung mit dem HTTP-Statuscode 200 zurückgegeben.
Dieser Code ist ein Beispiel für die Implementierung einer einfachen Benutzerregistrierungsfunktion in Node.js/Express.js und enthält Verschlüsselungs- und Eingabevalidierungstechniken, um sicherzustellen, dass Benutzerdaten sicher in der Datenbank gespeichert werden.

Diese Skizze soll zeigen, dass unser Programm Passwörter hinzufügen und verwalten kann. Außerdem kommt hier unsere spezielle Funktion zum Einsatz, die es unseren Benutzern erlaubt, automatisch starke Passwörter zu generieren, die wiederum durch das Masterpasswort geschützt sind. Wenn der Benutzer das richtige Masterpasswort eingegeben hat und dieses bestätigt wurde, werden die aktuellen Passwörter entschlüsselt. Damit sich der Benutzer sein neu generiertes starkes Passwort nicht selbst merken muss, gibt es die Möglichkeit, die Passwörter zu kopieren und an beliebiger Stelle einzufügen. So muss man sich nur das Masterpasswort merken.

## Die Kommunikation mit dem Firestore

![230047597-923a63fb-f1cf-4b16-a339-ce325aa7320e](https://user-images.githubusercontent.com/111282979/230732111-ed29c5df-181f-4379-ac33-035f9ccd58cc.png)
   
In der folgenden Skizze wird der genaue Ablauf unseres Programms in Bezug auf die Kommunikation mit der Firestore-Datenbank thematisiert. Wenn man sich zunächst einloggen möchte, gibt man seine Benutzerdaten, also seine Email und sein Passwort ein. Diese Informationen werden an die die Firebase geschickt und abgeglichen. Wenn die eingegeben Daten korrekt sind, wird man zu der Hauptseite hingeleitet, welche das Herzstück von allem ist. Von der Hauptseite aus können dann wie bereits angesprochen die eigenen Passwörter festgelegt bzw. auch generiert werden und anschließend durch das festgelegte Masterpasswort geschützt werden. Bei der Eingabe des Masterpassworts werden die anderen Passwörter von der Firebase freigeschaltet, sodass man anschließend auf diese zugreifen kann. Auf diese Art kann unseren Nutzern die versprochene Sicherheit gewährleistet werden. 

## Vergleich zur 2-Faktor-Authentifizierung

Um nochmal genau zu erläutern, wie sich die 2FA-Authetifizierung von unserem Konzept unterscheidet, soll dies die sich unten befindliche Abbildung illustrieren. Bei der 2FA-Authetifizierung ist es so, dass der Benutzer nach der Eingabe seiner Daten dazu aufgefordert wird seine Identität zu bestätigen. Dies kann auf mehreren Wegen durchgeführt werden. Entweder erhält der Benutzer eine Email auf dem Konte mit welchem er sich anmeldet, die er anschließend bestätigen muss oder eine SMS, welche zu der Telefonnummer gelangt, mit welcher das Email Konto verknüpft ist. Das Problem allerdings hier, ist, dass der Nutzer gefährdet ist, sobald ein Hacker den Zugriff auf seine Telefonnummer oder sein Emailkonto hat. Wir umgehen dieses Problem, indem wir ein zusätliches Masterpasswort haben, welches der Hacker ebenfalls entschlüsseln müsste, um an die ganzen Passwörter eines Nutzers zu kommen. 

![230047871-1663e6fb-b793-4c72-8bbc-32c5ef511c72](https://user-images.githubusercontent.com/111282979/230732139-16ace400-d1b5-4deb-8e21-7822d9c5d8aa.png)


</details>
<hr>





<details>
   <summary><h1>Das Frontend</h1></summary>
   <hr>

   <details>
   <summary><h2>Die Komponenten</h2></summary>

   ## Die Anmeldung
      
   Als auf Accounts basierender Passwortmanager ist die Anmeldung eine essenzielle Komponente auf der Webseite. Da unsere Nutzer ihre vertraulichen Informationen bei      uns speichern, setzen wir alles daran, die Sicherheit der Nutzerdaten gewährleisten zu können und die erste Wahl unter den Passwortschützern zu sein.
   Bei der Anmeldung wird der Nutzer gebeten, seinen Benutzernamen und sein Passwort einzugeben. Bei einer falschen Eingabe des Passwortes oder eines nicht                existierenden Benutzernamens, wird dem Nutzer ein Hinweis angezeigt.
   Sollte der Nutzer jedoch noch keinen Account bei VergissMeinNicht besitzen, wird ihm die Möglichkeit geboten, über einen Klick auf die Schaltfläche `Registrieren`      zur Registrierung zu gelangen und sich dort einen Account anlegen zu können.
   Wenn der Nutzer sowohl seinen Benutzernamen, als auch sein Passwort richtig eingegeben hat, wird er auf die Startseite des Passwortmanagers weitergeleitet.
   
   <details>
   <summary>Nähere Informationen</summary>
   
   ![componentDidMount](https://user-images.githubusercontent.com/65679099/230749640-bcc1e7dd-0ed2-4aac-bf2c-01a738bd1719.png)
      
   Durch die Authentifizierung über die Tokens, die für eine Stunde im lokalen Speicher des Browser des Nutzers gespeichert werden, muss man sich in dieser Stunde nicht jedes Mal neu anmelden, wenn die Webseite neu aufgerufen wird. Die Methode `componentDidMount()` wird einmalig aufgerufen, sobald die Komponente (Anmeldung) gerendert ist. Wenn im Redux-Store des Nutzers ein gültiges Token vorhanden ist, wird dieser direkt auf die Startseite weitergeleitet und die Anmeldung übersprungen.
     
   ![State](https://user-images.githubusercontent.com/65679099/230750828-137b8e79-b5d8-437b-9a51-e2728accf81f.png)

   Um verfolgen zu können, ob das Anmeldeformular abgeschickt wurde oder nicht, wird der Zustandsboolean 'eingabeAbgeschickt' definiert. 
   Der State (Zustand) kann an verschiedenen Stellen im Komponenten verändert werden und somit Bedingungen aufstellen.
      
   ![Card](https://user-images.githubusercontent.com/65679099/230750401-eeadda78-fe3b-4d9a-809a-59cdde8194fe.png)

   Das Anmeldeformular befindet sich in einem Card-Komponenten aus React-Bootstrap. Dadurch hebt sich die Anmeldung vom Hintergrund der Webseite ab. Das Formular erhält einen Event-Listener 'onSubmit={this.onSubmit}', wodurch beim Abschicken des Formulars unsere Funktion 'onSubmit' aufgerufen wird, die die Anmeldung durchführt.
   Das Anmeldeformular ist in zwei Bereiche geteilt, die jeweils aus einem Label und einem Eingabefeld bestehen.
   Der erste Bereich umfasst die Eingabe des Benutzernamens. Über dem Eingabefeld, in dem sich, bis der Nutzer etwas einträgt, der Platzhalter "Benutzername" befindet, wird noch ein Label "Benutzername" festgelegt. So ist auch, wenn der Nutzer bereits angefangen hat zu schreiben, klar, dass in das Eingabefeld der Benutzername eingetragen werden muss. Um auf den Benutzernamen, den der Nutzer im Eingabefeld eingegeben hat, zuzugreifen, wird das 'ref'-Objekt verwendet. 
   Das Eingabefeld wird somit auf eine Eigenschaft der Anmeldungs-Komponenten gesetzt, sodass einfach durch 'this.benutzername' auf das Eingabefeld zugegriffen werden kann.
   Im zweiten Bereich des Anmeldeformulars befindet sich die Eingabe des Passwortes. Das Passwort wird nicht wie der Benutzername im Klartext angezeigt, sondern durch den Passworttyp ('type="password"') des Eingabefeldes unkenntlich gemacht. Auch hier steht über dem Eingabefeld das Label "Passwort" und die Eingabe wird ebenfalls mit dem 'ref-Objekt' als Eigenschaft der Anmeldungs-Komponenten gespeichert. Über 'this.passwort' kann auf dieses Eingabefeld zugegriffen werden. 
   Unter den Eingabefeldern befindet sich eine Schaltfläche, um zur Registrierung zu gelangen und sich zuerst einen Account zu erstellen. Die zweite Schaltfläche ist Abhängig vom Zustandsboolean 'eingabeAbgeschickt'. Wenn dieser auf 'true' steht, wird ein Lade-Spinner (sich drehender Kreis) angezeigt, ansonsten die Schaltfläche "Anmelden". Wenn der Nutzer auf "Anmelden" klickt, wird das Formular gesendet und die Funktion 'onSubmit()' aufgerufen.
      
   ![onSubmit](https://user-images.githubusercontent.com/65679099/230751118-564405b5-74b2-462b-9236-308f9aaf1dab.png)
      
   Die 'onSubmit'-Funktion verhindert zuerst die browsereigene Standardaktion, die beim Abschicken eines Formulars geschieht. So wird einfach die selbstdefinierte Funktion ausgeführt. 
   Dann wird der Zustandsboolean `eingabeAbgeschickt` der Komponente destrukturiert, um diesen daraufhin als freien Boolean nutzen zu können.
   Wenn der Zustand von 'eingabeAbgeschickt' noch nicht auf 'true' steht, wird dieser nun gesetzt, sodass der Anmelde-Button durch das Ladesymbol ersetzt wird. Daraufhin wird überprüft, ob der Nutzer sowohl Benutzername, als auch Passwort eingegeben haben. Wenn das der Fall ist, wird eine Anmeldungsanfrage mit dem eingegebenen Benutzernamen und Passwort an den Server geschickt. Wenn der Server ein Authentifizierungstoken zurück gibt, wird dieses im Browser gespeichert, sodass der Nutzer sich in der nächsten Stunde nicht erneut anmelden muss, und er wird auf die Startseite weitergeleitet.
   Wenn der Server einen Fehler bei der Anmeldung zurückgibt, öffnet sich ein oberes Modalfenster und zeigt dem Nutzer diese Fehlermeldung an.
   Der Zustand von 'eingabeAbgeschickt' wird wieder auf 'false' gesetzt und der Nutzer kann erneut versuchen, sich anzumelden.
   Sollte der Nutzer es jedoch gar nicht erst geschafft haben, überhaupt beide Eingabefelder auszufüllen, wird er durch ein oberes Modalfenster daran erinnert und auch hier der Zustand von 'eingabeAbgeschickt' auf 'false' gesetzt.
      
   
   
   
   
   
   </details>
      
   ## Die Registrierung
      
   Um den Passwortmanager überhaupt verwenden zu können, muss man sich zuerst einen Account erstellen. Um sich zu registrieren werden drei Eingaben des Nutzers benötigt. Eine gültige Emailadresse, einen Benutzernamen, der noch nicht in der Datenbank existiert und ein Passwort. Da es dem Nutzer selbst überlassen ist, wie sicher er sein Accountpasswort gestalten möchte, haben wir keine Anforderungen an dieses, wie beispielsweise eine Mindestlänge. Wenn die Registrierung erfolgreich ist, wird man zur Anmeldung weitergeleitet, wo man sich direkt mit seinem frisch registrierten Account anmelden kann.
      
   <details>
   <summary>Nähere Informationen</summary>
   
   Wie bereits bei der Anmeldung wird durch die `componentDidMount()`-Methode direkt beim Rendern der Registrierung überprüft, ob noch ein gültiges Token im Browser des Nutzers gespeichert ist. Wenn dies der Fall ist, wird er automatisch auf die Startseite weitergeleitet.
   Auch wird wieder ein Zustandsboolean `eingabeAbgeschickt` verwendet, um Bedingungen aufzustellen, wie beispielsweise das Anzeigen der `Registrieren`-Schaltfläche oder des Lade-Spinners. 
      
   ![onAnmeldung](https://user-images.githubusercontent.com/65679099/230787031-c644e0f7-807d-4bda-ab6e-292e3a363103.png)

   Durch einen Klick auf die `Anmelden`-Schaltfläche wird die `history` Eigenschaft der Registrierungs-Komponente zugegriffen, die den Nutzer zu verschiedenen Routen in der Anwendung navigieren kann. In diesem Fall zur Anmeldung. 
      
   ![Card](https://user-images.githubusercontent.com/65679099/230787936-68c761ad-ecc3-4276-9b0b-7dddf572a370.png)

   
   Um die Registrierung im gleichen Stil wie die Anmeldung zu halten, wird auch hier eine `Card`-Komponente verwendet, in der sich das Registrierungsformular befindet.
   Dieses ist in drei Bereiche unterteilt. Im ersten befindet sich das Eingabefeld für die Emailadresse des Nutzers und das Label `Email`, welches sich über diesem befindet. Da das Eingabefeld vom Typ `email` ist, wird automatisch sichergestellt, dass die Eingabe eine gültige Emailadresse sein muss.
   Der zweite und dritte Bereich gleicht den beiden Bereichen aus dem Anmeldeformular. Ein Eingabefeld mit Label darüber für den Benutzernamen und ein Eingabefeld mit Label, für das Passwort. Dieses wird durch den Typ des Eingabefeldes (`password`) bei der Eingabe unkenntlich gemacht.
      
   ![onSubmit](https://user-images.githubusercontent.com/65679099/230788648-138276b6-fe2b-4cb1-8e51-924d58bb18da.png)

   Wenn der die Registrierung über die Schaltfläche `Registrieren` abschickt, wird die Funktion `onSubmit()` aufgerufen, die sich um die Abwicklung der Registrierung kümmert. Zuerst wird dabei das browsereigene Standard-Verhalten beim Abschicken eines Formulares verhindert, da für die Abwicklung ja diese Funktion genutzt wird.
   Dann wird der Zustandsboolean `eingabeAbgeschickt` der Komponente destrukturiert, um diesen daraufhin als freien Boolean nutzen zu können.
   Wenn der Zustandsboolean `eingabeAbgeschickt` noch auf `false` gesetzt ist, wird dieser nun aktualisiert, da das Formular abgeschickt wurde und der Registrierungsprozess im Gange ist. Um einen Fehler beim Server, der aufgrund der Joi-Formate sowieso nicht aufkommen dürfte, dennoch abzufangen, wird sichergestellt, dass der Nutzer sowohl das Eingabefeld für den Benutzernamen, als auch für das Passwort ausgefüllt hat. Wenn dies der Fall ist, wird eine Registrierungsanfrage mit der eingegebenen `Email`, dem `Benutzername` und dem `Passwort` an den Server geschickt. 
   Wenn dieser den Status `true` zurückgibt, war die Registrierung erfolgreich und dem Nutzer wird in einem oberen Modalfenster angezeigt, dass sein Account erfolgreich registriert wurde.
      
   ![image](https://user-images.githubusercontent.com/65679099/230799679-8588f0b0-dfcd-4c22-87e9-b831e11afbf2.png)
      
   Daraufhin wird der Zustandsboolean `eingabeAbgeschickt` auf `false` gesetzt, da die Registrierung abgeschlossen ist und der Nutzer zur Anmeldung weitergeleitet.
   Sollte es zu einem Fehler bei der Registrierung gekommen sein, wird die vom Server zurückgegebene Fehlermeldung dem Nutzer in einem oberen Modalfenster angezeigt.
   Auch hier wird der Zustandsboolean `eingabeAbgeschickt` auf `false` gesetzt, da der Nutzer erneut versuchen muss, sich zu registrieren.
   Sollte das Problem jedoch daran liegen, dass der Nutzer nicht alle Eingabefelder ausgefüllt hat, wird er durch ein oberes Modalfenster daran erinnert, doch bitte alle Felder auszufüllen.
   Auch hierbei wird der Zustandsboolean `eingabeAbgeschickt` auf `false` gesetzt, da der Nutzer erneut versuchen muss, sich zu registrieren.
   Im Groben und Ganzen ähneln sich Anmeldung und Registrierung im Frontend. Bei der Registrierung wird zusätzlich noch eine Emailadresse benötigt, aber der eigentliche Unterschied besteht darin, was der Server im Backend mit der Anfrage macht.
   

   
      
   </details>
   
   
   ## Die Startseite
   
   Die Startseite ist das Herzstück unserer Webseite. Von hier aus gelangt der Nutzer zu jedem Detail unserer Seite. Wenn der Nutzer nach der Anmeldung auf die Startseite gelangt, befindet er sich direkt beim Passwortmanager. Dieser nimmt den Großteil des Bildschirms ein und wird umrandet von einer [Seitenleiste](#die-seitenleiste) und der der Seitenleiste angeschlossenen Navigationsbar. Der Nutzer kann sich über die Schaltfläche am oberen rechten Rand abmelden oder über die Seitenleiste zu den Accounteinstellungen gelangen. Hier auf der Startseite hat man die volle Kontrolle.
   
   <details>
   <summary>Nähere Informationen</summary>
   
   ![componentDidMount](https://user-images.githubusercontent.com/65679099/230800107-d27b8aed-36da-4e40-8c46-0df638f94b47.png)
   
   Sobald die Komponente gerendert wurde, werden das Authentifizierungstoken sowie die beiden [Aktionserzeuger](#aktionserzeuger) `passwoerterFestlegen` und `setzeInhaltFuerOberesModalfenster` aus den Eigenschaften der Komponente extrahiert. Dadurch kann gleich eine Anfrage an den Server geschickt werden, alle Passwörter für den Benutzer dieses Tokens zurückzugeben. Wenn der Server die gespeicherten Passwörter zurückgibt, werden diese sogleich im ReduxStore gespeichert, sodass sie dann im Passwortmanager angezeigt werden können. Sollte vom Server jedoch ein Fehler zurückkommen, wird dem Nutzer die Fehlermeldung in einem oberen Modalfenster angezeigt.
   
   ![render](https://user-images.githubusercontent.com/65679099/230800615-d73c5c49-3cd1-46a6-81a1-f6c9e95f6f67.png)
   
   Zuerst wird auf der Startseite die Seitenleiste gerendert, da diese die angezeigte Seite einschließt. Durch das Switch-Statement wird, je nachdem, welche Route geöffnet wird, der PasswortManager oder die Accounteinstellungen gerendert. Standardmäßig, wenn die Standardseite aufgerufen wird, wird auf den PasswortManager umgeleitet. Wenn kein passender Pfad gefunden wird, wird auf die Error 404 Seite weitergeleitet, die hier an anderer Stelle erklärt wird.
   
   Zusammenfassend lässt sich sagen, dass die Startseite der Ausgangspunkt der Anwendung ist. Egal, wo der Nutzer hin möchte, er kann das Ziel von der Startseite aus erreichen.
   
   </details>
   
      
      
      
      
   <details>
   <summary><h2>Der Passwort Manager</h2></summary>
      
   Der Passwort Manager ist die Anwendung, bzw. der Service, den wir mit Vergissmeinnicht unseren Nutzern anbieten. Er ist einfach zu verstehen und übersichtlich.
   Grob kann er in zwei Bereiche eingeteilt werden. Auf der linken Seite findet die Eingabe statt. Das Masterpasswort wird eingegeben und neue Passwörter werden hinzugefügt. Auf der rechten Seite ist die Passwörter-Tabelle, in der alle Passwörter des Nutzers angezeigt werden und kopiert, angezeigt oder gelöscht werden können.
   Die einzelnen Teilbereiche sind in unterschiedliche Komponente gegliedert, die dann im Passwort Manager gerendert werden.
      
   <details>
   <summary>Nähere Informationen</summary>
   
   ![Linke_seite_state](https://user-images.githubusercontent.com/65679099/230801148-fc0c7626-d469-4b6f-9c4a-65762b374980.png)
      
   Da eines unserer Merkmale die Echtzeit-Passwortent- und verschlüsselung ist - das bedeutet, dass, sobald das Masterpasswort korrekt eingegeben ist, die Passwörter entschlüsselt und abrufbar sind und, sobald auch nur eine Buchstabe zu viel oder zu wenig eingegeben wird, die Passwörter direkt wieder verschlüsselt werden und nicht mehr abrufbar sind - muss diese ständige Überprüfung des Masterpasswortes irgendwie möglich gemacht werden. Dafür wird die Zustandsvariable `masterPasswort` definiert, die standardmäßig `null` ist. Sobald jedoch eine Eingabe des Masterpasswortes erfolgt, wird das eingegebene Masterpasswort in dieser Variablen gespeichert. 
      
   Dies ist möglich, da das Eingabefeld des Masterpasswortes mit der Funktion `onMasterPasswort` verbunden ist. Jedes Mal, wenn auch nur ein Buchstabe entfernt oder hinzugefügt wird, greift dieser Event-Listener ein und speichert das aktuell eingegebene Masterpasswort in der Zustandsvariablen `masterPasswort`.
      
   ```javascript
   <EingabeBereich onMasterPasswortEingabe={this.onMasterPasswortEingabe} />
   ```
   
   ![render](https://user-images.githubusercontent.com/65679099/230802357-b81cdfda-b152-48e9-9595-4b205c470c44.png)
      
   Die auf der Startseite bereits abgerufenen Passwörter werden hier im Array `statePasswoerter` gespeichert, da die Passwörter aus dem State des ReduxStores entnommen werden. 
   Der Passwort Manager befindet sich in einem Container mit maximaler Breite. Diese Eigenschaft trägt dazu bei, dass das Layout auf unterschiedlichen Bildschirmgrößen und -auflösungen optimiert wird und sichergestellt wird, dass der Inhalt lesbar und gut zu bedienen ist. Zudem wird verhindert, dass der Inhalt unnötig gestreckt wird und die Lesbarkeit darunter leidet.
      
   In diesem Container befinden sich verschiedene Zeilen (`Rows`), in denen der Inhalt des Passwort Managers gerendert wird. In der ersten Zeile steht die Überschrift `Passwort Manager`.
   In der zweiten Zeile befinden sich zwei Spalten-Komponenten. In der linken Spalte befindet sich der Eingabebereich für das Masterpasswort und Passwörter, die neu hinzugefügt werden sollen. Die Breite der Spalten wird durch das `Bootstrap Grid System` eingestellt. Während der linke Bereich eine Breite von 
   ```javascript
   <Col sm={4}>
   ```
   besitzt, ist der rechte Bereich mit 
   ```javascript
   <Col sm={8}>
   ``` 
   doppelt so breit. Im Grid System werden den unterschiedlichen Spalten (`Columns`) in einer Zeile Werte zugeschrieben, die sich bis 12 aufaddieren. In unserem Beispiel haben wir zwei Spalten, wobei die eine doppelt so breit ist, wie die andere. Man könnte jedoch auch 12 gleichgroße Spalten erstellen oder zwei Spalten im Verhältnis 3 zu 9.
      Im rechten Bereich wird die Passwörter-Tabelle gerendert. Diese Tabellen-Komponente wird mit den Überschriften `Beschreibung` und `Passwort` in zwei Spalten geteilt, wobei in der linken Spalte die Beschreibung, die der Nutzer dem Passwort gegeben hat und auf der rechten Seite das Passwort sowie verschiedene Schaltflächen angezeigt werden. Mit diesen kann das Passwort kopiert, angezeigt oder gelöscht werden.
   Um die Entschlüsselung des Passwortes zu verwalten, wird in der `Passwort`-Spalte der Tabelle die Komponente `PasswortAnzeigen` gerendert, die sich damit befasst.
   Für den Inhalt der Tabelle werden alle Passwörter im `statePasswoerter`-Array auf die Tabelle gemapped. Dadurch entsteht ein neuer Array, in dem jedes Element aus einem Array mit der Beschreibung des Passwortes und der `PasswortAnzeige`-Komponente, die sich, wie bereits gesagt, um das Anzeigen des Passwortes in der `Passwort`-Spalte der Tabelle kümmert. Für diese Komponente wird das Passwort `{p}` und das Masterpasswort, mit dem es erstellt wurde als Parameter übergeben.
      
   </details>
   </details>
      

      
      
      
      
   ## Der Eingabebereich
      
   Dieser Bereich befindet sich auf der linken Seite des Passwort Managers. Hier wird das Masterpasswort eingegeben, welches die Passwörter schützt, indem es mit diesen zusammen verschlüsselt wird. Zudem kann über die Schaltfläche [`Neues Passwort hinzufügen`](#ein-neues-passwort-hinzufuegen) ein neues Passwort hinzugefügt werden. Unter dem Eingabefeld für das Masterpasswort befindet sich zudem eine kleine Erklärung, wie das Masterpasswort funktioniert.
      
   <details>
   <summary>Nähere Informationen</summary>
      
   ![Funktionen](https://user-images.githubusercontent.com/65679099/230803233-47e33e23-e347-413a-b68d-df7752e97c10.png)

   Die Funktion onMasterPasswortEingabe ist der Vorgänger zu der gleichnamigen aus `./PasswortManager.js`. Die Funktion wird aufgerufen, sobald sich die Eingabe des Nutzers im Eingabefeld des Masterpasswortes aktualisiert. Dieses eingegebene Masterpasswort `this.masterPasswort.value` wird als Eigenschaft der Komponente in den `props` gespeichert, sodass es an andere Komponenten weitergegeben werden kann. So kann es auch an die `PasswortManager`-Komponente und die Funktion `onMasterPasswortEingabe` weitergegeben werden und so an die Passwortanzeige weitergegeben werden.
   Neben der Funktion ist auch noch eine Funktion definiert, die aufgerufen wird, wenn der Nutzer auf die Schaltfläche `Neues Passwort hinzufügen` klickt.
   Die Komponente, die für das Hinzufügen eines neuen Passwortes verantwortlich ist, wird dem Nutzer daraufhin in einem zentrierten Modalfenster angezeigt, das den Titel `Passwort hinzufügen` trägt.
      
   ![render](https://user-images.githubusercontent.com/65679099/230804213-9a685200-7a41-447c-b8a1-e500d2f1104e.png)

   Der Eingabebereich wird in einem React.Fragment gerendert. Diese Komponente von React fungiert wie ein unsichtbarer Container und ermöglicht es, mehrere Elemente ohne einen sichtbaren Container zu gruppieren. In diesem Fall liegt der Grund in der der Auswirkung, die der Container auf das Design des Eingabebereiches hat und die Lesbarkeit des Codes. Vom Verhalten der Elemente in diesem React.Fragment macht es jedoch keinen Unterschied zu einem Container.
   Das Formular für die Eingabe des Masterpasswortes ist ein Gruppe aus dem Label `Masterpasswort`, das sich über dem Eingabefeld für das Masterpasswort befindet. 
   Um auf das eingegebene Masterpasswort zugreifen zu können, wird das Eingabefeld über ein `ref`-Objekt zu einer Eigenschaft der Komponente. Außerdem wird, sobald sich die Eingabe verändert mit dem `onChange`-Event-Listener die Funktion `onMasterPasswortEingabe` aufgerufen.
   Unter dem Eingabefeld befindet sich ein Erklärungstext, wie das Masterpasswort und die Ver- und Entschlüsselung der Passwörter funktioniert.
      
   Am Ende des Eingabebereiches folgt noch die Schaltfläche zum Hinzufügen neuer Passwörter. Über den Event-Listener `onClick` wird bei einem Klick auf diese Schaltfläche die Funktion `onPasswortHinzufuegen` ausgeführt, die, wie oben bereits erklärt ein Modalfenster öffnet, in dem ein neues Passwort hinzugefügt werden kann.
   
      
      
      
      
   </details>
      
   
   ## Ein neues Passwort hinzufügen
      
   Eine der wichtigsten Funktionen eines Passwort Managers ist die Eingabe neuer Passwörter. Um diese dem Nutzer so schnell und einfach wie möglich zu machen, kann ein neues Passwort einfach über einen Klick auf die Schaltfläche `Neues Passwort hinzufügen` unter der Eingabe des Masterpasswortes hinzugefügt werden. Daraufhin öffnet sich ein zentriertes Modalfenster, in dem der Nutzer sein neues Passwort hinzufügen kann. 
      
   ![image](https://user-images.githubusercontent.com/65679099/230804937-e67dc8fa-a364-45be-ad1e-3853a4d35fcf.png)

   Damit der Nutzer seine Passwörter einfach ordnen und auch wiederfinden kann, muss eine Beschreibung für das Passwort angegeben werden. Wenn beispielsweise das Instagram-Passwort gespeichert werden soll, ist eine Beschreibung wie `Instagram` sinnvoll, da es in der Passwörter-Tabelle auch eine Suchfunktion gibt und somit das Passwort in Sekunden wiedergefunden wird, wenn es nicht schon auf der ersten Seite der Tabelle zu sehen ist.
   Falls der Nutzer sich noch ein Konto auf beispielsweise Instagram erstellt, bieten wir die Möglichkeit, ein starkes Passwort automatisch generieren zu lassen.
   Durch einen Klick auf das kleine Schild-Symbol neben der Schaltfläche `Speichern`, erscheint automatisch ein starkes Passwort im Eingabefeld des Passwortes.
   Sollte der Nutzer damit nicht zufrieden sein, kann er beliebig oft das Symbol erneut anklicken, um weitere Vorschläge für starke Passwörter zu generieren.
   Wenn alles eingegeben ist, wird das Passwort einfach über die Schaltfläche `Speichern` gespeichert und in der Tabelle an oberster Stelle angezeigt.
      
   <details>
   <summary>Nähere Informationen</summary>
      
   Wie in allen Formularen wird auch hier ein Zustandsboolean `laedt` genutzt, um ein bedingtes Rendern des Lade-Spinners oder der `Speichern`-Schaltfläche zu ermöglichen. 
   ```javascript
   state = {
        laedt: false
   }
   ```
   ```javascript
   laedt ? <Spinner animation="border" /> : <Button variant="primary" type="submit" onClick={this.onSpeichern} size={30}>Speichern</Button>   
   ```
      
   ![render](https://user-images.githubusercontent.com/65679099/230908246-cb59f973-377f-4fea-abcf-e72ceec77fe7.png)

   Innerhalb der "render"-Funktion wird zuerst der Lade-Status `laedt` der Komponente destrukturiert, um diesen später als freien Boolean zu nutzen.
   Das Eingabeformular besteiht aus zwei Formulargruppen. In der ersten befindet sich das Eingabefeld für die Beschreibung, dass durch ein `ref`-Objekt zu einer Eigenschaft der Komponente wird, wodurch an anderer Stelle auf die Eingabe zugegriffen werden kann und ein Label `Beschreibung`. In der zweiten Formulargruppe befindet sich das Eingabefeld für das Passwort, dass auch durch ein `ref`-Objekt zu einer Eigenschaft der Komponente wird und ebenfalls ein Label `Passwort`. 
   Unter den Eingabefeldern wird zuerst auf der linken Seite, abhängig vom Zustand des Zustandsbooleans `laedt` entweder ein Lade-Spinner oder die Schaltfläche zum Speichern des Passwortes gerendert. Rechts davon wird die Schaltfläche zum Generieren eines starken Passwortes in der in einer `OverlayTrigger`-Komponente gerendert, wodurch das Overlay-Element `Tooltip` angezeigt werden kann. Dadurch ist es möglich, einen beschreibenden Text ("Starkes Passwort generieren") anzuzeigen, wenn der Nutzer den Mauszeiger über diese Schaltfläche bewegt. 
   Auf der Schaltfläche befindet sich ein Schild-mit-Haken-Symbol, das aus den [`IonIcons`](https://ionic.io/ionicons), einer Open-Source Icon Bibliothek von [Ionic](https://ionic.io/) stammt, imporiert wird. 
      
   ```javascript
   onPasswortGenerieren = (e) => {
      e.preventDefault()
      this.passwort.value = passwortGenerieren()
   }
   ```
   Das starke Passwort wird mit der Hilfsfunktion `passwortGenerieren` erstellt und daraufhin als Wert des Eingabefeldes für das neue Passwort gesetzt.
      
   ```javascript
      // Wenn der Nutzer auf den "Speichern"-Button klickt, 
   onSpeichern = async (e) => {
      // wird die browsereigene Standardaktion unterbrochen.
      e.preventDefault()
      const { laedt } = this.state
      // Wenn der Lade-State bereits "true" ist, wird dieser einfach zurückgegeben.
      if (laedt) return
         // Ansonsten wird der State auf "true" gesetzt, da das Passwort nun ja gespeichert wird.
         this.setState({ laedt: true })
         // Die benötigten Funktionen werden aus den Props extrahiert.
         const { masterPasswort, setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen, zentriertesModalfensterAusblenden, passwortHinzufuegen, token } = 
                                                                                                                                                         this.props
         // Zuerst wird nun überprüft, ob das Masterpasswort eingegeben wurde,
         if (masterPasswort !== null && masterPasswort !== '') {
            // Daraufhin muss noch abgefragt werden, ob auch die Beschreibung und das Passwort eingegeben wurden, die gespeichert werden sollen.
            if (this.passwort.value !== null && this.passwort.value !== ''
                && this.beschreibung.value !== null && this.beschreibung.value !== '') {
                // Das Passwort wird in Abhängigkeit vom Masterpasswort verschlüsselt.
                const verschluesseltesPasswort = verschluesseln(masterPasswort, this.passwort.value)
                // Daraufhin wird dem Server eine Anfrage zur Speicherung geschickt, die die Beschreibung, 
                das verschlüsselte Passwort und den Sicherheitswert beinhaltet.
                const neuesPasswort = await passwortZumServerHinzufuegen(token, this.beschreibung.value, 
                                                                         verschluesseltesPasswort.encryptedData, verschluesseltesPasswort.sicherheitswert)
                // Wenn es einen Fehler bei der Speicherung gibt, wird dieser dem Nutzer in einem
                // modalen Fenster angezeigt.
                if (neuesPasswort.error) {
                    setzeInhaltFuerOberesModalfenster("Fehler", neuesPasswort.error, [{ name: "Schließen", variant: "primary" }])
                    oberesModalfensterAnzeigen()
                    // Das Fenster zum Hinzufügen des Passwortes wird geschlossen.
                    zentriertesModalfensterAusblenden()
                // Wenn die Speicherung aber funktioniert hat, gibt der Server das Passwort als Item zurück,
                // das nun noch im Redux-Store des Browsers gespeichert wird.
                } else if (neuesPasswort.passwort) {
                    passwortHinzufuegen(neuesPasswort.passwort)
                    // Das Fenster zum Hinzufügen des Passwortes wird geschlossen.
                    zentriertesModalfensterAusblenden()
                }
            // Sollte der Nutzer nicht Beschreibung und Passwort eingegeben haben, wird er durch ein modales Fenster noch einmal daraufhingewiesen.
            } else {
                setzeInhaltFuerOberesModalfenster("Fehler", "Fülle bitte alle Felder aus!", [{ name: "Schließen", variant: "primary" }])
                oberesModalfensterAnzeigen()
            }
        // Sollte der Nutzer sein Masterpasswort nicht eingegeben haben, wird er durch ein modales Fenster noch einmal daran erinnert.
        } else {
            // Das Fenster zum Hinzufügen des Passwortes wird geschlossen.
            zentriertesModalfensterAusblenden()
            setzeInhaltFuerOberesModalfenster("Fehler", "Gib dein Masterpasswort ein!", [{ name: "Schließen", variant: "primary" }])
            oberesModalfensterAnzeigen()
        }
        // Der Lade-State wird wieder auf "false" gesetzt.
        this.setState({ laedt: false })
   }
   ```
      
   Wenn der Nutzer auf die Schaltfläche `Speichern` klickt, wird die Funktion `onSpeichern` ausgeführt. Zuerst wird die browserabhängige Standardaktion verhindert, sodass nur unsere eigen definierte Funktion ausgeführt wird. Daraufhin wird der Lade-Status `laedt` der Komponente destrukturiert, um diesen als freien Boolean zu nutzen. Wenn dieser bereits auf `true` gesetzt ist, wird dieser einfach zurückgegeben, sollte das noch nicht der Fall sein, wird er nun auf `true` gesetzt, da das Passwort nun gespeichert werden soll. Außerdem werden noch weitere Eigenschaften der Komponente destrukturiert, die zur Speicherung des Paswortes genutzt werden.
   
   | **Benötigte Props**: | masterPasswort | setzeInhaltFuerOberesModalfenster | oberesModalfensterAnzeigen | zentriertesModalfensterAusblenden | passwortHinzufuegen | token |
|----------------:|---------------:|----------------------------------:|---------------------------:|----------------------------------:|---------------------|-------|
      
   Nun beginnt der Speicherungsprozess des Passwortes. Dafür muss zuerst sichergestellt werden, dass sowohl das Masterpasswort, als auch das Passwort das gespeichert werden soll und die Beschreibung dessen eingegeben wurden. Wenn nicht, wird ein oberes Modalfenster angezeigt, dass den Nutzer darauf hinweist. Wenn jedoch alle Bedingungen erfüllt sind, wird das Passwort zuerst mit dem Masterpasswort gemeinsam, mithilfe der Hilsfunktion `verschluesseln`, verschlüsselt und daraufhin eine Anfrage zum Speichern des Passwortes an den Server geschickt. 
   Sollte der Server einen Fehler zurückgeben, wird dieser dem Nutzer in einem oberen Modalfenster angezeigt. Sollte kein Fehler auftreten und einfach das Passwort zurückgegeben werden, wird dieses im Redux-Store gespeichert, das Modalfenster zum Hinzufügen eines neuen Passwortes ausgeblendet und das neue Passwort in der Tabelle angezeigt. Zum Schluss wird noch der Zustandsboolean `laedt` auf `false` gesetzt, da die Aktion abgeschlossen ist.
      
   </details>
   
   
   ## Die Passwortanzeige
   
   Um die Passwörter zu schützen, wird sichergestellt, dass sie dem Nutzer nur angezeigt werden, wenn das Masterpasswort vollständig eingegeben ist. Wenn dies nicht der Fall ist, wird ein Passworttext "●●●●●●●●●●●●●●●●●●●●●●" angezeigt, der das Passwort maskiert. Neben dem Passwort gibt es drei Schaltflächen, um das Passwort zu kopieren, anzuzeigen und zu löschen. Solange das Passwort nicht durch die Eingabe des Masterpasswortes entschlüsselt ist, kann das Passwort nicht kopiert und nicht angezeigt werden. Zudem ist der Hintergrund des Passworttextes rot und wird erst bei korrekter Eingabe des Masterpasswortes grün.
      
   <details>
   <summary>Nähere Informationen</summary>
   
   Auch in dieser Komponente wird mit Zustandsvariablen gearbeitet. 
      
   ```javascript
   state = {
      kopierText: "Kopieren",
      passwortText: "●●●●●●●●●●●●●●●●●●●●●●"
   }
   ```
   
   Der `Kopiertext` ist der Text, der als `Tooltip` angezeigt wird, wenn der Nutzer mit dem Mauszeiger über die `Kopieren`-Schaltfläche fährt.
   Der `Passworttext` ist der Text, der in der Tabelle als Passwort angezeigt wird. Solange das Passwort nicht entschlüsselt ist, bleibt dieser in seinem Standardzustand. 
      
   ```javascript
   render() {
        // Das "passwort" und "masterPasswort werden aus den Komponenteneigenschaften ("props") destrukturiert.
        const { passwort, masterPasswort } = this.props
        // Aus dem passwort wird das verschlüsselte Passwort und der Sicherheitswert extrahiert.
        const { verschluesseltesPasswort, sicherheitswert } = passwort
        // Entschlüsselt das verschlüsselte Passwort mithilfe der "entschluesseln()" Funktion und dem Master-Passwort.
        const entschluesseltesPasswort = entschluesseln(masterPasswort, verschluesseltesPasswort, sicherheitswert)

        return (
            <React.Fragment>
                {
                    // Ein bedingtes Rendern, das je nach dem, ob das Passwort erfolgreich entschlüsselt wurde oder nicht, 
                    // einen grünen oder roten Alert-Container rendert, in dem sich der Passworttext befindet.
                    entschluesseltesPasswort.entschluesselt ?
                        <Alert variant="success" style={{ width: "fit-content", float: "left", margin: "auto" }} ref={elem => this.alert = elem}>{this.state.passwortText}</Alert> :
                        <Alert variant="danger" style={{ width: "fit-content", float: "left", margin: "auto" }} ref={elem => this.alert = elem}>{this.state.passwortText}</Alert>
                }
                {/* Das OverlayTrigger-Element zeigt einen Text über einem Button an, wenn man die Maus darüberbewegt. */}
                {/* Beim Button zum Kopieren wird der stateabhängige Kopiertext angezeigt. */}
                <OverlayTrigger overlay={<Tooltip id="tooltip-copy">{this.state.kopierText}</Tooltip>}>
                    <Button variant="light" style={{ textAlign: "center", margin: 8 }} onClick={() => this.onKopieren(entschluesseltesPasswort)}><MdCopy size={30} /></Button>
                </OverlayTrigger>

                {/* Beim Button zum Ansehen des Passwortes wird "Ansehen" angezeigt. */}
                <OverlayTrigger overlay={<Tooltip id="tooltip-view">Ansehen</Tooltip>}>
                    <Button variant="warning" style={{ textAlign: "center", margin: 8 }} onClick={() => this.onAnsehen(entschluesseltesPasswort)}><MdEye size={30} color="white" /></Button>
                </OverlayTrigger>

                {/* Beim Button zum Löschen des Passwortes wird "Löschen" angezeigt. */}
                <OverlayTrigger overlay={<Tooltip id="tooltip-view">Löschen</Tooltip>}>
                    <Button variant="danger" style={{ textAlign: "center", margin: 8 }} onClick={this.onLoeschen}><MdTrash size={30} color="white" /></Button>
                </OverlayTrigger>

            </React.Fragment>

        )
    }
   
   Die wichtigsten Eigenschaften der Komponente, die destrukturiert und als freie Variablen genutzt werden müssen, sind das Passwort, das gespeichert ist und das Masterpasswort, das dieses Passwort schützt. Dazu werden noch das verschlüsselte Passwort und der Sicherheitswert aus dem Passwort extrahiert und mit all den Eigenschaften das Passwort mit der Hilfsfunktion `entschluesseln` entschlüsselt.
   
  Da sich die Darstellung der Passwortanzeige in einer Tabellenspalte befindet, beeinträchtigt ein Container hier wieder sehr das Design, weshalb auf eine React.Fragment-Komponente zurückgegriffen wird. 
  Zuerst wird, je nachdem, ob das Passwort durch die aktuelle Eingabe des Masterpasswortes entschlüsselt werden kann, ein grüner oder roter Alert-Container mit dem jeweiligen Passworttext gerendert. Die drei Schaltflächen werden mit `Tooltips` in einer `OverlayTrigger`-Komponente gerendert, sodass über der Schaltfläche zum Kopieren des Passwortes der Kopiertext und über den anderen beiden `Ansehen` und `Löschen` angezeigt werden kann. Bei einem Klick wird die jeweils definierte Funktion aufgerufen. 
  
   |     Schaltfläche     |   Kopieren   |   Ansehen   |    Löschen   |
   |:--------------------:|:------------:|:-----------:|:------------:|
   | Aufgerufene Funktion | onKopieren() | onAnsehen() | onLoeschen() |

   ### onKopieren
   
   Wenn der Nutzer auf die Schaltfläche `Kopieren` klickt, wird zuerst überprüft, ob das Passwort, das kopiert werden soll, überhaupt entschlüsselt ist. Wenn es entschlüsselt ist, wird es in die Zwischenablage des Nutzers kopiert und der Kopiertext, der, wenn man die Maus über die Schaltfläche bewegt, angezeigt wird, für 3 Sekunden auf "Passwort kopiert!" geändert.
   Wenn das Passwort nicht entschlüsselt ist, wird der Kopiertext für 3 Sekunden auf "Das Passwort ist noch verschlüsselt!" geändert.
   
   ### onAnsehen
   
   Auch beim Ansehen des Passwortes wird überprüft, ob das gewünschte Passwort entschlüsselt ist. Wenn dies der Fall ist, wird der Passworttext, der in der Tabelle angezeigt wird, für 3 Sekunden auf das entschlüsselte Passwort gesetzt. Wenn das Passwort noch nicht entschlüsselt ist, wird der Passworttext für 3 Sekunden auf "Das Passwort ist noch verschlüsselt!" gesetzt, bevor er wieder mit "●●●●●●●●●●●●●●●●●●●●●●" maskiert wird.
   
   ### onLoeschen
   
   Bei einem Klick auf die Schaltfläche zum Löschen des Passwortes wird der Nutzer noch einmal über ein oberes Modalfenster gefragt, ob er dieses Passwort wirklich löschen möchte. Wenn er auf `Ja` klickt wird die Funktion `passwortLoeschenFinal` aufgerufen, die das Löschen des Passwortes veranlasst.
   
   ### passwortLoeschenFinal
   
   Wenn der Nutzer sich also sicher ist, dass er das Passwort löschen möchte, werden zuerst wichtige Eigenschaften des Komponenten destrukturiert, um sie frei nutzen zu können und das Modalfenster, worüber der Nutzer das Löschen des Passwortes gerade bestätigt hat, wird ausgeblendet. 
   
   | **Benötigte Props**: | passwort | token | setzeInhaltFuerOberesModalfenster | oberesModalfensterAnzeigen | oberesModalfensterAusblenden |
|----------------:|---------------:|----------------------------------:|---------------------------:|----------------------------------:|---------------------|
   
   Daraufhin wird eine Anfrage zum Löschen des Passwortes an den Server geschickt, in der das Token des Nutzers und die Id des Passwortes übergeben werden.
   Wenn vom Server ein Fehler zurückgegeben wird, wird dieser dem Nutzer in einem oberen Modalfenster angezeigt.
   Sollte alles funktioniert haben, wird das Passwort auch aus dem Redux-Store und somit aus der Tabelle gelöscht und kann nicht wiederhergestellt werden.
   
      
   </details>
         
      
   <hr>
   </details>
      
   ## Die Benutzerauthentifizierung
   
   Da die Sicherheit beim Passwort Manager das A und O ist, haben wir eine zusätzliche Komponente definiert, die sich mit der Authentifizierung des Benutzers auseinandersetzt. Bevor ein Nutzer auf eine bestimmte Seite zugreifen kann wird dadurch immer zuerst überprüft, ob der Nutzer ausreichend authentifiziert ist.
   Wenn das der Fall ist, wird er auf die gewünschte Seite weitergeleitet. Wenn nicht, wird er zur Anmeldung umgeleitet. 
   
   <details>
   <summary>Nähere Informationen</summary>
   
   Zur Authentifizierung wird in dieser Anwendung das Token verwendet. Somit wird dieses hier zuerst aus den Eigenschaften der Komponente destrukturiert, um es als freie Variable nutzen zu können. 
   
   ```javascript
   const { token } = props
   ```
   
   Daraufhin wird überprüft, ob ein Token vorhanden ist, also, ob das Token einen Wert hat, und ob dieses Token noch gültig ist. Wenn diese beiden Bedingungen erfüllt werden, wird die Route aufgerufen, die der Nutzer aufrufen wollte.
   Ist der Nutzer nicht mit einem gültigen Token authentifiziert, wird er zur Anmeldung weitergeleitet.
   
   ```javascript
   // Wenn ein Token vorhanden und nicht abgelaufen ist,
   if (token && !istTokenAbgelaufen(token)) {
      // wird die Route, die der Nutzer aufgerufen hat, angezeigt.
      return (<Route {...props} />)
   }

   // Ansonsten wird der Nutzer zur Anmeldung weitergeleitet.
   return (<Redirect to="/anmeldung" />)
   ```
   
   
   
   </details>
   
   
   ## Die Modalfenster
   
   Um dem Nutzer die wichtigsten aktuellen Informationen und Meldungen anzuzeigen, nutzen wir Dialogfenster, sogenannte `Modalfenster`. Diese haben wir in zwei Arten unterschieden. Es gibt die zentrierten Modalfenster, die beispielsweise beim Hinzufügen eines neuen Passwortes angezeigt werden und die oberen Modalfenster, worüber beispielsweise Fehlermeldungen angezeigt werden. Als Basis werden die Modale von React-Bootstrap verwendet, worüber dann die Modalfenster erstellt werden.
   
   <details>
   <summary>Nähere Informationen</summary>
   
   Das zentrale Modalfenster ist für die Eingabe des Nutzers gedacht. Es besteht aus einem Titel, dem Inhalt, den Schaltflächen im Footer und dem Zustand, ob es gezeigt wird oder nicht. Darüber lässt sich das Öffnen und Schließen des Modalfensters regeln. 
   
   ```javascript
   const { titel, inhalt, buttons, gezeigt } = this.props
        return (
            // Die Modal-Komponente von Bootstrap wird als Grundlage genutzt, um das Modalfenster anzuzeigen.
            <Modal show={gezeigt} onHide={this.fensterSchliessen} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{titel}</Modal.Title>
                </Modal.Header>
                {/* Der Inhalt des Modalfensters wird hinzugefügt. */}
                <Modal.Body>{inhalt}</Modal.Body>
                {/* Die Buttons des Modalfensters werden im Footer hinzugefügt. */}
                <Modal.Footer>
                    {
                        // Falls "buttons" für das Modalfenster definiert sind, wird eine Schaltfläche für jeden Eintrag in "buttons" erzeugt.
                        buttons ?
                            buttons.map(b => {
                                const { name, variant, onClick } = b
                                // Falls der Name des Buttons "Schließen" lautet, wird das Modalfenster bei einem Klick, 
                                mithilfe der Funktion "fensterSchliessen" geschlossen.
                                if (name === "Schließen") {
                                    return (
                                        <Button variant={variant} onClick={this.fensterSchliessen} key={name}>
                                            {name}
                                        </Button>
                                    )
                                }

                                // Ansonsten wird eine Schaltfläche mit dem entsprechenden Event-Handler hinzu.
                                return (
                                    <Button variant={variant} onClick={onClick}>
                                        {name}
                                    </Button>
                                )
                            })
                            // Falls "buttons" nicht definiert ist, wird "null" zurückgegeben, um keine Schaltflächen anzuzeigen.
                            : null
                    }
                </Modal.Footer>
            </Modal>
        )
   ```
   
   Diese Eigenschaften werden dafür zuerst destrukturiert, um sie als freie Variablen verwenden zu können.
   Daraufhin wird ein `Modal` von React-Bootstrap erstellt. Im Header dieses Models wird ein X auf der rechten Seite zum Schließen des Modalfensters eingefügt. Links davon befindet sich der Titel. Im Body des Modals wird der Inhalt gerendert.
   Im Footer werden, falls Buttons vorhanden sind, diese als Button-Komponente gerendert. Dafür werden die Parameter `name`, also die Aufschrift des Buttons, `variant`, also die Variante des Buttons nach [Art von React-Bootstrap](https://react-bootstrap.github.io/components/buttons/) und der Event-Listener `onClick`, der beim Anklicken des Buttons eine Funktion ausführen kann, falls angegeben, übergeben. Sollte ein Button den Namen `Schließen` tragen, kann auch hierüber das Modalfenster geschlossen werden. Wenn keine Buttons definiert sind, werden mit `: null` keine Buttons angezeigt.
   
   ```javascript
   fensterSchliessen = () => {
        this.props.modalAusblenden()
    }
   ```
   
   Das Schließen bzw. Ausbleden des Modalfensters erfolgt über die Funktion `fensterSchliessen`. Diese ruft die Funktion `modalAusblenden` aus den Eigenschaften der Komponente auf. Auf diese Funktion wurde der Aktionserzeuger `zentriertesModalfensterAusblenden()` gemapped. 
   Das bedeutet, dass durch das Aufrufen der Funktion `modalAusblenden` der Aktionserzeuger `zentriertesModalfensterAusblenden()` aufgerufen wird.
   
   ```javascript
   // Mapping der Redux-Dispatch-Funktionen auf die Props-Objekte der Komponente.
   const mapDispatchToProps = dispatch => {
      return {
         modalAusblenden: () => dispatch(zentriertesModalfensterAusblenden())
      }
   }
   ```
   
   Beim oberen Modalfenster funktioniert das Erstellen auf die gleiche Art und Weise. 
   Nur wird das React-Bootstrap Modal nicht `centered`, also zentriert gerendert, sondern einfach normal, oben am Seitenrand.
   
   ```javascript
   <Modal show={gezeigt} onHide={this.fensterSchliessen} centered>
   ```
      
   Durch die Verbindung zum Redux-Store können die State-Variablen aus dem Redux-Store auf die Eigenschaften der Komponente gemapped werden. So kann immer das aktuelle Modalfenster gerendert werden.
      
   ```javascript
   // Mapping der Redux-State-Variablen auf die Props-Objekte der Komponente.
   const mapStateToProps = state => {
      return {
        gezeigt: state.modalFenster.zentriertesModalfenster.gezeigt,
        titel: state.modalFenster.zentriertesModalfenster.titel,
        inhalt: state.modalFenster.zentriertesModalfenster.inhalt,
        buttons: state.modalFenster.zentriertesModalfenster.buttons,
        }
   }
   ```
      
      
   </details>


    
   ## Die Seitenleiste
   Die Seitenleiste lässt sich nach Wunsch ein- und ausblenden. Wenn diese eingeblendet ist, hat man die Option im Hauptfenster zu bleiben, welches den Namen              "Passwörter" trägt, oder man kann in das Fenster "Accounteinstellungen" wechseln. In den Accounteinstellungen sieht man zunächst einmal seinen festgelegten             Benutzernamen und seine Email mit der man sich im Vorhinein registriert hat. Darüber hinaus kann man in diesem Fenster entweder eine neue Email oder ein neues        Passwort festlegen, falls man etwas an seinen Anmeldedaten verändern möchte. Hierzu gibt es aber nun auch die Option seinen Account vollständig zu löschen, falls      man sich dazu entscheiden sollte.
   
   <details>
   <summary>Nähere Informationen</summary>
      
   Die Seitenleiste umfasst sowohl die Leiste am linken Bildschirmrand, als auch die Navigationsbar am oberen Bildschirmrand. 
      
   ```javascript
      {/* Seitenleiste */}
      <div className="border-right bg-light" id="leisten-wrapper">
         <div className="leisten-heading">VergissMeinNicht</div>
         <div className="list-group-flush list-group">
            {/* Link zum Passwort Manager */}
            <Link to="/startseite/passwortmanager" className="bg-light list-group-item list-group-item-action">Passwort Manager</Link>
            {/* Link zu den Accounteinstellungen */}
            <Link to="/startseite/accounteinstellungen" className="bg-light list-group-item list-group-item-action">Accounteinstellungen</Link>
         </div>
      </div>
   ```
      
   ![image](https://user-images.githubusercontent.com/65679099/230928485-4c235bfb-aac0-449e-932f-5935c779f579.png)
      
   Um das Styling über CSS gut und übersichtlich zu gestalten, haben sowohl die Divs als auch die Links in der Seitenleiste viele Klassenbezeichnungen. 
   Oben an der Seitenleiste befindet sich die Überschrift "VergissMeinNicht". Darunter sind zwei Links zum Passwort Manager und zu den Accounteinstellungen.
   Beim Anklicken, wird man auf die jeweilige Seite weitergeleitet.
   
   ```javascript
   {/* Navigation Bar */}
   <nav className="navbar-expand-lg navbar-light navbar border-bottom bg-light">
      {/* Button zum Anzeigen der Seitenleiste */}
      <Button id="seitenleiste-toggle" className="btn btn-primary" variant="primary">Leiste anzeigen</Button>
      {/* Button zum Öffnen der Navigation Bar auf Mobilgeräten, denn wir denken natürlich Cross-Plattform. */}
      <button type="button" data-toggle="collapse" className="navbar-toggler" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
              aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navigation Bar Inhalt */}
      <div className="navbar-collapse collapse" id="navbarSupportedContent">
         <ul className="mt-2 ml-auto navbar-nav mt-lg-0">
            <li className="nav-item">
               {/* Button zum Abmelden */}
               <Link to="/anmeldung" className="nav-link" onClick={this.onAbmelden}>Abmelden</Link>
            </li>
         </ul>
      </div>
   </nav>
   ```
      
   Die Navigationsbar beinhaltet zwei Elemente. Auf der linken Seite befindet sich eine Schaltfläche, um die Seitenleiste ein- und auszuklappen. 
   Da das Anzeigen der Navigationsbar auf mobilen Geräten zu einer schlechten Benutzbarkeit der Webseite führt, werden auf diesen Geräten drei Striche in der oberen rechten Ecke angezeigt, um die Navigationsbar zu öffnen.
   Auf allen Geräten, die die Navigationsbar ohne Probleme anzeigen können, wird in der oberen rechten Ecke eine Schaltfläche zur Abmeldung angezeigt. Bei einem Klick auf diese wird der Nutzer zur Anmeldung weitergeleitet und die Funktion `onAbmelden` wird ausgeführt.
   
   ```javascript
   componentDidMount = () => {
      // Der Click-Event-Handler wird für das Element mit der ID "seitenleiste-umschalten" registriert.
      $("#seitenleiste-umschalten").click(function (e) {
         // Wenn das Element geklickt wird, wird das Standard-Click-Event verhindert.
         e.preventDefault()
         // Die toggleClass() Methode von jQuery wird aufgerufen, um das Element mit der ID "wrapper" ein- oder auszublenden.
         // Wenn das Element die CSS-Klasse "anzeigen" trägt, wird sie entfernt. Ansonsten wird sie diesem hinzugefügt.
         $("#wrapper").toggleClass("anzeigen")
      })

      // Wenn der Benutzer scrollt, passt diese Funktion die Position des Elements mit der ID "leisten-wrapper" an,
      // um die Seitenleiste immer sichtbar zu halten. Diese bewegt sich beim Scrollen nicht.
      window.onscroll = () => {
         $("#leisten-wrapper").css("top", window.pageYOffset)
      }
   }
   ```
      
   Um das Auf- und Zuklappen der Seitenleiste über die Schaltfläche `Leiste anzeigen` zu ermöglichen, wird über die Methode `componentDidMount` direkt, sobald die Komponente gerendert ist, ein Click-Event-Handler für das Element mit der ID "seitenleiste-toggle" registriert.
   Diese ID trägt die Schaltfläche.
      
   ```javascript
   <Button id="seitenleiste-toggle" className="btn btn-primary" variant="primary">Leiste anzeigen</Button>
   ```
   
   Wenn der Nutzer diese also anklickt, wird zuerst die browserabhängige Standardaktion beim Anklicken einer Schaltfläche verhindert und daraufhin über die `toggleClass`-Methode von jQuery allen Elementen mit der ID `wrapper` die Klasse `anzeigen`, falls sie diese noch nicht besitzen, hinzugefügt und ansonsten entfernt.
   Zudem wird über den `window.onscroll` Event-Listener die Position der Seitenleiste auch beim Scrollen beibehalten.
   `window.pageYOffset` ist eine Eigenschaft des `window`-Objekts in JavaScript, die den vertikalen Scroll-Offset, also die vertiale Position, der Seite im aktuellen Fenster zurückgibt.
   Dadurch dass der Event-Listener `onscroll` an das `window` gebunden wird, wird bei jedem Mal, wenn der Nutzer scrollt, die CSS-Eigenschaft `top` des Elements mit der ID #leisten-wrapper durch jQuery auf den aktuellen Wert von `window.pageYOffset` gesetzt. So bewegt sich die Seitenleiste vertikal mit der Seite mit und bleibt immer sichtbar, auch wenn der Nutzer scrollt.
      
   ```javascript
   // Wenn der Nutzer sich über denn Button in der oberen rechten Ecke abmeldet,
   onAbmelden = () => {
      // werden diese beiden Eigenschaften von den props destrukturiert.
      const { authentifizierungsTokenFestlegen, passwoerterFestlegen} = this.props
      // So lässt sich das Token aus dem Redux-Store entfernen, sodass der Nutzer nicht wieder angemeldet wird.
      authentifizierungsTokenFestlegen(null)
      // Und die Liste der angezeigten Passwörter kann geleert werden.
      passwoerterFestlegen([])
   }
   ```
   
   Wenn der Nutzer die Schaltfläche `Abmelden` anklickt, werden die Eigenschaften `authentifizierungsTokenFestlegen` und `passwoerterFestlegen` destrukturiert, sodass daraufhin das Authentifizierungstoken im Redux-Store entfernt, bzw. auf `null` gesetzt werden kann und die Liste der Passwörter im Redux-Store geleert werden kann.
   So wird sichergestellt, dass der Nutzer, nachdem er sich abgemeldet hat, nicht noch über den lokalen Speicher auf sein Token oder gar die gespeicherten Passwörter zugreifen kann.
      
   ```javascript
   // Die Funktion mapStateToProps nimmt das Authentifizierungstoken aus dem Redux-Store 
   // und übergibt es an die Komponente.
   const mapStateToProps = state => {
      return {
         token: state.authentifizierung.token
      }
   }
      
   const mapDispatchToProps = dispatch => {
       return {
           authentifizierungsTokenFestlegen: (token) => dispatch(authentifizierungsTokenFestlegen(token)),
           passwoerterFestlegen: (data) => dispatch(passwoerterFestlegen(data))
       }
   }

   // Hier wird die Seitenleisten-Komponente mit Redux verbunden, indem mapStateToProps und mapDispatchToProps
   // als Parameter an die connect-Funktion übergeben werden, die eine neue Komponente zurückgibt,
   // die mit dem Redux-Store verbunden ist.
   export default connect(mapStateToProps, mapDispatchToProps)(Seitenleiste)
   ```
      
   Aus dem Redux-Store wird lediglich das Token benötigt, welches als Eigenschaft an die Komponente durch die Funktion `mapStateToProps` übergeben wird.
   Mit `mapDispatchToProps` werden zwei Methoden `authentifizierungsTokenFestlegen` und `passwoerterFestlegen` zurückgegeben, die die gleichnamigen Aktionserzeuger aufrufen, die als Argumente `token` bzw. `data` nehmen.
   Um das Token und diese Aktionserzeuger-Funktionen als Eigenschaften an die Seitenleisten-Komponente zu übergeben, wird die Komponente durch die beiden Funktionen mit dem Redux-Store verbunden.
      
   </details>
   
   ## Die Tabelle
   In der Tabelle werden die Passwörter mit den zugehörigen Beschreibungen aufgelistet, sodass man diese einsehen kann. Wenn das Masterpasswort eingegeben ist und        seine Passwörter in dem Moment in der Tabelle nicht verschlüsselt sind, kann man jeweils ein Passwort ansehen und es gegebenfalls kopieren, um es dann anschließend    wo man es auch immer haben möchte, einzufügen. Sobald das Masterpasswort wieder ausgetragen ist, zeigt die Tabelle die festgelegt Passwörter nicht mehr an, sondern    folgende Nachricht:"Das Passwort ist verschlüsselt"
    
   <details>
   <summary>Nähere Informationen</summary>
      
   
      
   </details>
   
   
   <details>
   <summary><h3>Die Accounteinstellungen</h3></summary>
   ## Die Passwortänderung
   Um sein Passwort zu ändern, muss man in dem dazugehörigen Fenster sein altes Passwort eingeben und das neue Passwort, welches von dem Moment an gelten soll. Wir        haben uns dazu entschieden, dass die Benutzer ihr altes Passwort eingeben sollen, damit z.B. Fremde die sich unerlaubten Zugang zu einem Account gewährt haben nicht    einfach das Passwort ändern können, um  somit dem eigentlichen Benutzer durch die Veränderung des Passworts seinen Account zu stehlen. Es ist also wenn man so          möchte eine weitere Sicherheitsfunktion, um unsere Benutzer vor Dritten zu schützen. Wenn man dann anschließend das alte und neue Passwort eingegeben hat, bestätigt    man das Ganze, indem man auf das Feld "Speichern" drückt. 
   ## Die Aktualisierung der Emailadresse 
   Um seine Emailadresse zu ändern muss man lediglich eine neue Emailadresse in das dafür vorgesehene Feld eingeben und sein Eingabe durch das Feld "Speichern"            bestätigen. Dieses Feld lässt sich bei den Accounteinstellungen wiederfinden.
   <hr>
   </details>
   

   <details>
   <summary><h2>Die Hilfsfunktionen</h2></summary>
   ## Die Verschlüsselung
   Die Verschlüsselung seiner aufgelisteten Passwörter erfolgt genau dann, wenn das festgelegte Passwort nicht mehr eingegeben ist. Die eigentlichen Passwörter werden    dann verschlüsselt, indem an der Stelle des Passworts die Nachricht "Passwort ist verschlüsselt", auftritt. Wenn man das Masterpasswort wieder in das Eingabefeld      einfügt, dann werden wieder automatisch die aufgelisteten Passwörter entschlüsselt.
      
   ## Der Server 
      
   ## Das Token 
   <hr>
   </details>
  

   <details>
   <summary><h2>Der Redux-Store</h2></summary>
  
   <hr>
   <details>
   <summary><h3>Die Aktionserzeuger</h3></summary>
   
   Um die Zustände im Redux-Store zu verändern werden sogenannte Aktionen genutzt. Aktionen sind JavaScript-Objekte, die eine Art von Veränderung im Redux-Store repräsentieren. Sie sind die einzige Möglichkeit, Daten im Redux-Store zu aktualisieren. Eine Aktion besteht aus einem Aktionstyp, der beschreibt, was für eine Veränderung im Redux-Store stattfinden soll und auch den Namen der Aktion angibt. Zusätzlich kann in der Aktion noch ein `Datenpaket` (Payload) übergeben werden, das die Aktualisierung im Store präzise beschreibt.
      
   Um den Inhalt für ein oberes Modalfenster festzulegen wird eine Aktion vom Typ `"SETZE_INHALT_FUER_OBERES_MODALFENSTER"` erzeugt. Zusätzlich werden noch die wichtigen Daten, die den Inhalt des Modalfensters ausmachen, als Datenpaket übergeben.
      
   ```javascript
   export const setzeInhaltFuerZentriertesModalfenster = (titel, inhalt, buttons) => {
      return {
         type: SETZE_INHALT_FUER_ZENTRIERTES_MODALFENSTER,
         titel, inhalt, buttons
      }
   }
   ```
      
      
   ## Die Aktionstypen
   
   Aktionstypen in Redux dienen dazu, Aktionen zu definieren und zu identifizieren. Sie sind Konstanten und werden normalerweise in Strings definiert, die die Art der Aktion repräsentieren, die sie ausführen.
   ```javascript
   const AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN = "AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN"
   ```
      
   Ein Aktionstyp bestimmt, welche Veränderung an Zuständen im Redux-Store vorgenommen werden soll. Die Verwendung von Aktionstypen trägt dazu bei, Aktionen eindeutig identifizieren, auszuführen und besser warten zu können, da der Code sehr an Übersichtlichkeit gewinnt.
   
   <details>
   <summary>Nähere Informationen</summary>
      
   ```javascript
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
   ```

   In unserer Anwendung werden 11 verschiedene Aktionstypen festgelegt, die für die Authentifizierung und die Verwaltung von Passwörtern und Modalfenstern genutzt werden. Der Aktionstyp `AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN` beispielsweise identifiziert eine Aktion zur Speicherung des Authentifizierungstokens im Redux-Store. Der Aktionstyp ist wie ein Schlüssel für den Reduzierer, der genau für die Ausführung einer Aktion gemacht ist. 
   Neben der Authentifizierung gibt es auch Aktionstypen zu Passwortverwaltungsvorgängen, z. B. dem Festlegen der Passwörter im Redux-State oder dem Hinzufügen und Löschen von Passwörtern. Schließlich gibt es auch verschiedene Aktionstypen für Modalfenster, wie z. B. das Anzeigen, Verbergen oder Inhalte-Setzen für obere und zentrierte Modalfenster. Wiederum werden diese Arten von Aktionen als Schlüssel für den Reduzierer verwendet, um geeignete Änderungen am Zustand der Anwendung vorzunehmen, die sich auf Modalfenster beziehen. Beispielsweise wird über den Aktionstypen `OBERES_MODALFENSTER_ANZEIGEN` dem Nutzer ein oberes Modalfenster angezeigt, in dem beispielsweise eine Fehlermeldung des Servers angezeigt wird. Es ist deshalb wichtig, dass Aktionstypen dauerhaft am gleichen Ort definiert sind, um sicherzustellen, dass sie dauerhaft zugänglich sind und nicht versehentlich geändert werden können.

   </details>
      
   ## Die Authentifizierung 
      
   ![carbon (25)](https://user-images.githubusercontent.com/111282979/230963058-7ebf965c-e9f9-41b3-afc5-d2b80922b558.png)

   Wie vermutlich aus den vorigen Texten bereits angeklungen ist, spielt die Authentifizierung bei uns eine wichtige Rolle. Folglich haben wir einen Aktionserzeuger für den die Festlegung, bzw. die Speicherung des Authentifizierungstokens.
Das Token wird als Parameter an die Funktion übergeben. So gibt die Funktion eine Aktion zurück, die den Aktionstyp `"AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN"` verwendet, um die Aktion in Redux eindeutig zu identifizieren.
Das Token wird dann als Datenpaket in der Aktion übergeben und im Redux-Store gespeichert. Wenn ein Token existiert, also das Token einen Wert hat, wird ihm der Zusatz `„Bearer“` vorangestellt. Diese Auffüllung wird im Authorization-Header (Autorisierungsheader) der HTTP-Anfrage verwendet, um anzuzeigen, dass sich das Token im Bearer-Schema befindet, da JWTs sich in diesem Format befinden. Die Verwendung des `"Bearer"`-Zusatzes ermöglicht es dem Server, das Token einfach zu validieren, da dieser weiß, wie er mit der HTTP-Anfrage umgehen muss.
   Sollte kein Token vorhanden sein, wird einfach das Token, also `null` als Token übergeben, bzw. im Redux-Store geseichert.
      
   
      
   ## Das Modal Fenster 
     ```javascript 
    // In dieser Datei werden die Aktionserzeuger-Funktionen für die Verwaltung der Modalfenster in Redux definiert.
// Durch die Verwendung der Aktionserzeuger-Funktionen wird die Verwaltung der Modalfenster in Redux zentralisiert und vereinfacht,
// da Aktionstypen und Aktionserzeuger eine gemeinsame Schnittstelle bereitstellen, um eine Aktion auszulösen.
// Anstatt jedes Mal manuell Aktionen zu erstellen, können diese Aktionserzeuger genutzt werden.
// So bleibt der Code übersichtlich und kann bei Fehlern besser instandgehalten werden.

// Zuerst werden die Aktionstypen, für die eine Aktion erzeugt werden soll, importiert.
import { ZENTRIERTES_MODALFENSTER_AUSBLENDEN, OBERES_MODALFENSTER_AUSBLENDEN, ZENTRIERTES_MODALFENSTER_ANZEIGEN, OBERES_MODALFENSTER_ANZEIGEN, SETZE_INHALT_FUER_ZENTRIERTES_MODALFENSTER, SETZE_INHALT_FUER_OBERES_MODALFENSTER } from './aktionsTypen'

// Mit dieser Funktionen, wird das obere Modalfenster angezeigt, da die Aktion "OBERES_MODALFENSTER_ANZEIGEN" ausgeführt wird.
export const oberesModalfensterAnzeigen = () => {
    return {
        type: OBERES_MODALFENSTER_ANZEIGEN,
    }
}

// Mit dieser Funktionen, wird das zentrierte Modalfenster angezeigt, da die Aktion "ZENTRIERTES_MODALFENSTER_ANZEIGEN" ausgeführt wird.
export const zentriertesModalfensterAnzeigen = () => {
    return {
        type: ZENTRIERTES_MODALFENSTER_ANZEIGEN,
    }
}

// Mit dieser Funktionen, wird das obere Modalfenster ausgeblendet, da die Aktion "OBERES_MODALFENSTER_AUSBLENDEN" ausgeführt wird.
export const oberesModalfensterAusblenden = () => {
    return {
        type: OBERES_MODALFENSTER_AUSBLENDEN,
    }
}

// Mit dieser Funktionen, wird das zentrierte Modalfenster ausgeblendet, da die Aktion "ZENTRIERTES_MODALFENSTER_AUSBLENDEN" ausgeführt wird.
export const zentriertesModalfensterAusblenden = () => {
    return {
        type: ZENTRIERTES_MODALFENSTER_AUSBLENDEN,
    }
}

// Mit dieser Funktionen, wird der Inhalt für das obere Modalfenster gesetzt, da die Aktion "SETZE_INHALT_FUER_OBERES_MODALFENSTER" ausgeführt wird.
// Der Inhalt besteht aus einem Titel im Header des Modalfensters, dem Inhalt im Body und den Buttons im Footer.
export const setzeInhaltFuerOberesModalfenster = (titel, inhalt, buttons) => {
    return {
        type: SETZE_INHALT_FUER_OBERES_MODALFENSTER,
        titel, inhalt, buttons
    }
}

// Mit dieser Funktionen, wird der Inhalt für das zentrierte Modalfenster gesetzt, da die Aktion "SETZE_INHALT_FUER_ZENTRIERTES_MODALFENSTER" ausgeführt wird.
// Der Inhalt besteht aus einem Titel im Header des Modalfensters, dem Inhalt im Body und den Buttons im Footer.
export const setzeInhaltFuerZentriertesModalfenster = (titel, inhalt, buttons) => {
    return {
        type: SETZE_INHALT_FUER_ZENTRIERTES_MODALFENSTER,
        titel, inhalt, buttons
    }
}
```      
 Dieser Code definiert eine Reihe von Redux-Aktionsgeneratorfunktionen, die verwendet werden, um die verschiedenen modalen Fenster in der Anwendungsschnittstelle zu verwalten.
Zunächst werden die erforderlichen Operationstypen aus einer anderen Datei importiert, damit sie später in Aktivitätskonstruktoren verwendet werden können. Dann werden verschiedene Funktionen definiert, von denen jede eine Aktion zurückgibt, um ein bestimmtes modales Fenster zu öffnen oder zu schließen oder den Inhalt eines modalen Fensters einzustellen. Jede Funktion verwendet einen eindeutigen Aktionstyp, um sicherzustellen, dass die Aktion innerhalb der Redux-Anwendung eindeutig identifiziert werden kann. Beispielsweise gibt die ShowTopModalWindow-Funktion eine Aktion zurück, die das oberste modale Fenster mit dem Aktionstyp SHOWTOP_MODALWINDOW öffnet.
Modale Fenstersteuerungen werden verwendet, um eine einheitliche Schnittstelle zum Auslösen von Aktionen in einer Redux-Anwendung bereitzustellen, die das Erscheinen von modalen Fenstern in der Benutzeroberfläche steuern. Dies erleichtert das Verständnis und die Wartung des Codes.     
      
      
      
   ## Die Passwörter 
   
   ```javascript   
    // In dieser Datei werden die Aktionserzeuger-Funktionen für die Verwaltung der Passwörter in Redux definiert.
// Durch die Verwendung der Aktionserzeuger-Funktionen wird die Verwaltung der Modalfenster in Redux zentralisiert und vereinfacht,
// da Aktionstypen und Aktionserzeuger eine gemeinsame Schnittstelle bereitstellen, um eine Aktion auszulösen.
// Anstatt jedes Mal manuell Aktionen zu erstellen, können diese Aktionserzeuger genutzt werden.
// So bleibt der Code übersichtlich und kann bei Fehlern besser instandgehalten werden.

// Zuerst werden die Aktionstypen, für die eine Aktion erzeugt werden soll, importiert.
import { PASSWORT_HINZUFUEGEN, PASSWORT_LOESCHEN, PASSWOERTER_FESTLEGEN, PASSWORT_AKTUALISIEREN } from './aktionsTypen'

// Mit diesem Aktionserzeuger wird die Aktion zum Hinzufügen eines neuen Passwortes ausgeführt.
// Dabei wird ein Passwort als Parameter genommen und am Ende auch zurückgegeben.
export const passwortHinzufuegen = (passwort) => {
    return {
        type: PASSWORT_HINZUFUEGEN,
        passwort
    }
}

// Mit diesem Aktionserzeuger wird die Aktion zum Löschen eines Passwortes ausgeführt.
// Dabei wird ein Passwort als Parameter genommen und am Ende auch zurückgegeben.
export const passwortLoeschen = (passwort) => {
    return {
        type: PASSWORT_LOESCHEN,
        passwort
    }
}

// Mit diesem Aktionserzeuger wird die Aktion zum Festlegen der Passwörter ausgeführt.
// Dabei werden mehrere Passwörter als Parameter genommen und am Ende auch zurückgegeben.
export const passwoerterFestlegen = (passwoerter) => {
    return {
        type: PASSWOERTER_FESTLEGEN,
        passwoerter
    }
}

// Mit diesem Aktionserzeuger wird die Aktion zur Aktualisierung eines Passwortes ausgeführt.
// Dabei wird ein Passwort als Parameter genommen und am Ende auch zurückgegeben.
export const passwortAktualisieren = (passwort) => {
    return {
        type: PASSWORT_AKTUALISIEREN,
        passwort
    }
}
```

 Dieser Code definiert verschiedene Build-Action-Funktionen für die Passwortverwaltung in Redux.
In anderen Dateien definierte Aktionstypen werden zuerst importiert. Diese Aktionstypen definieren, welche Aktionen ausgeführt werden sollen.
Dann werden verschiedene Aktionskonstruktoren definiert, die jeweils eine bestimmte Aktion ausführen. Jede Funktion hat einen Namen, der angibt, was sie tut.
Die Addpassword-Funktion erstellt eine Aktion zum Hinzufügen eines neuen Passworts. Das Passwort wird als Parameter behandelt und in der generierten Aktion als Passwortattribut gespeichert.
Die Funktion deletepassword erstellt die Aktion zum Löschen des Passworts. Das Passwort wird als Parameter behandelt und in der generierten Aktion als Passwortattribut gespeichert.
Die Funktion setpasswords erstellt eine Aktion zum Festlegen mehrerer Passwörter. Das Passwort wird als Parameter behandelt und in der erstellten Aktion als Passwortattribut gespeichert.
Die Funktion updatepassword erstellt eine Aktion zum Aktualisieren des Passworts. Das Passwort wird als Parameter behandelt und in der generierten Aktion als Passwortattribut gespeichert.
Dieser Aktionsgenerator zentralisiert und vereinfacht die Redux-Passwortverwaltung, da Aktionstypen und Aktionsgeneratoren eine gemeinsame Schnittstelle zum Auslösen von Aktionen bieten. Anstatt Aktionen jedes Mal manuell zu erstellen, können Sie diese Aktionsgeneratoren verwenden, um Ihren Code sauberer und wartungsfreundlicher zu gestalten.
      
      
      
   <details>
   <summary><h3>Reduzierungen</h3></summary>
   ## Die Authentifizierung
      
```javascript      
import { AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN } from '../aktionsErzeuger/aktionsTypen'

// Zuerst wird der Anfangszustand des Reduzierers definiert.
const anfangsZustand = {
    token: null
}

const reduzierer = (zustand = anfangsZustand, aktion) => {
    // Da dieser Reduzierer sich nur um die Authentifizierung kümmert, wird überprüft, welche Aktion ausgeführt werden soll.
    switch (aktion.type) {
        // Wenn der Aktionstyp AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN lautet, wird ein neuer Zustand zurückgegeben, 
        // bei dem das Token-Attribut auf das Token in der Aktion gesetzt wird.
        // So wird das Token im Redux-Store aktualisiert.
        case AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN:
            return {
                ...zustand,
                token: aktion.token
            }

        // Wenn die Aktion "AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN" nicht erkannt wird, wird lediglich der aktuelle Zustand zurückgegeben.
        default:
            return zustand
    }
}

// Zum Schluss wird der Reduzierer als Standard exportiert, sodass andere Module diesen importieren können.
export default reduzierer
```
      
Das Code-Snippet definiert einen Redux-Reduzierer, der für die Verwaltung des Authentifizierungstokens verantwortlich ist. Der Anfangszustand des Reduzierers enthält eine leere Token-Eigenschaft. Die Reduce-Funktion benötigt zwei Parameter: den aktuellen Zustand und die auszuführende Aktion. Wenn die Aktion vom Typ SET_AUTHENTICATIONTOKEN ist, wird ein neuer Status zurückgegeben, wobei die Tokeneigenschaft in der Aktion auf token gesetzt ist. Andernfalls wird der aktuelle Zustand zurückgegeben.
Schließlich wird Reducer als Standardexport angezeigt, sodass andere Module es importieren und in Ihr Redux-Speicher-Setup integrieren können.
      
   ## Das Modalfenster
      ```javascript
      import { OBERES_MODALFENSTER_ANZEIGEN, ZENTRIERTES_MODALFENSTER_ANZEIGEN, OBERES_MODALFENSTER_AUSBLENDEN, ZENTRIERTES_MODALFENSTER_AUSBLENDEN, SETZE_INHALT_FUER_OBERES_MODALFENSTER, SETZE_INHALT_FUER_ZENTRIERTES_MODALFENSTER } from '../aktionsErzeuger/aktionsTypen'

const anfangsZustand = {
    oberesModalfenster: {
        gezeigt: false,
        titel: null,
        inhalt: null,
        buttons: null
    },
    zentriertesModalfenster: {
        gezeigt: false,
        titel: null,
        inhalt: null,
        buttons: null
    }
}

const reduzierer = (zustand = anfangsZustand, aktion) => {

    // In diesem Switch-Block werden die verschiedenen Aktionstypen behandelt.
    switch (aktion.type) {
        // Wenn der Aktionstyp OBERES_MODALFENSTER_ANZEIGEN lautet, wird ein neuer Zustand zurückgegeben, 
        // bei dem das Attribut "gezeigt" von oberesModalfenster auf "true" gesetzt wird.
        case OBERES_MODALFENSTER_ANZEIGEN:
            return {
                ...zustand,
                oberesModalfenster: {
                    ...zustand.oberesModalfenster,
                    gezeigt: true
                }
            }

        // Wenn der Aktionstyp OBERES_MODALFENSTER_AUSBLENDEN lautet, wird ein neuer Zustand zurückgegeben, 
        // bei dem das Attribut "gezeigt" von oberesModalfenster auf "false" gesetzt wird.
        case OBERES_MODALFENSTER_AUSBLENDEN:
            return {
                ...zustand,
                oberesModalfenster: {
                    ...zustand.oberesModalfenster,
                    gezeigt: false
                }
            }

        // Wenn der Aktionstyp SETZE_INHALT_FUER_OBERES_MODALFENSTER lautet, wird ein neuer Zustand zurückgegeben, 
        // bei dem die Attribute "titel", "inhalt" und "buttons" von oberesModalfenster auf die entsprechenden Werte aus der Aktion gesetzt werden.
        case SETZE_INHALT_FUER_OBERES_MODALFENSTER:
            return {
                ...zustand,
                oberesModalfenster: {
                    ...zustand.oberesModalfenster,
                    titel: aktion.titel,
                    inhalt: aktion.inhalt,
                    buttons: aktion.buttons
                }
            }

        // Wenn der Aktionstyp ZENTRIERTES_MODALFENSTER_ANZEIGEN lautet, wird ein neuer Zustand zurückgegeben, 
        // bei dem das Attribut "gezeigt" von zentriertesModalfenster auf "true" gesetzt wird.
        case ZENTRIERTES_MODALFENSTER_ANZEIGEN:
            return {
                ...zustand,
                zentriertesModalfenster: {
                    ...zustand.zentriertesModalfenster,
                    gezeigt: true
                }
            }

        // Wenn der Aktionstyp ZENTRIERTES_MODALFENSTER_ANZEIGEN lautet, wird ein neuer Zustand zurückgegeben, 
        // bei dem das Attribut "gezeigt" von zentriertesModalfenster auf "true" gesetzt wird.
        case ZENTRIERTES_MODALFENSTER_AUSBLENDEN:
            return {
                ...zustand,
                zentriertesModalfenster: {
                    ...zustand.zentriertesModalfenster,
                    gezeigt: false
                }
            }

        // Wenn der Aktionstyp SETZE_INHALT_FUER_OBERES_MODALFENSTER lautet, wird ein neuer Zustand zurückgegeben, 
        // bei dem die Attribute "titel", "inhalt" und "buttons" von zentriertesModalfenster auf die entsprechenden Werte aus der Aktion gesetzt werden.
        case SETZE_INHALT_FUER_ZENTRIERTES_MODALFENSTER:
            return {
                ...zustand,
                zentriertesModalfenster: {
                    ...zustand.zentriertesModalfenster,
                    titel: aktion.titel,
                    inhalt: aktion.inhalt,
                    buttons: aktion.buttons
                }
            }

        // Wenn keiner der oben genannten Aktionstypen erkannt wird, wird der aktuelle Zustand zurückgegeben.
        default:
            return zustand
    }
}
// Zum Schluss wird der Reduzierer als Standard exportiert, sodass andere Module diesen importieren können.
export default reduzierer
```
      
 Dieser Code definiert eine Funktion namens "reducer", die als Reducer-Funktion in einer Redux-Anwendung verwendet werden kann. Reducer ist eine Funktion, die den Status der Anwendung basierend auf der Aktion und dem aktuellen Status der Anwendung aktualisiert. Die Reducer-Funktion benötigt zwei Parameter: den aktuellen Status der Anwendung und die auszuführende Aktion. Beim ersten Aufruf der Funktion ist der Standardzustand "initialState". Reducer verarbeiten Aktionen mit Switch-Anweisungen basierend auf Aktionstypen. Für jeden Aktionstyp gibt es eine entsprechende Instanz in der switch-Anweisung, die den Status der Anwendung basierend auf dieser Aktion aktualisiert. Jede Instanz gibt einen neuen Zustand zurück, indem sie eine Kopie des vorherigen Zustands erstellt und dann nur die in der Aktion angegebenen Eigenschaften ändert.
In diesem Fall hat der Zustand zwei Eigenschaften, „top modal“ und „center modal“, die jeweils ein Objekt mit den Eigenschaften „display“, „title“, „content“ und „buttons“ enthalten. Verschiedene Arten von Aktionen können diese Zustandseigenschaften ändern, z. B. das Ein- oder Ausblenden eines Modals oder das Aktualisieren seines Inhalts.
Schließlich gibt die "Reduce"-Funktion einen neuen Zustand zurück, der durch die durchgeführten Aktionen erzeugt wurde.
      
   ## Die Passwörter 
   ```javascript   
   import { PASSWORT_HINZUFUEGEN, PASSWORT_LOESCHEN, PASSWORT_AKTUALISIEREN, PASSWOERTER_FESTLEGEN } from '../aktionsErzeuger/aktionsTypen'

// Der anfangsState enthält nur eine leere Liste.
const anfangsState = {
    liste: []
}

// Der Reduzierer nimmt den aktuellen State (oder den anfangsState) und eine Aktion entgegen und gibt den neuen State zurück.
const reduzierer = (state = anfangsState, aktion) => {
    // In diesem Switch-Block werden die verschiedenen Aktionstypen behandelt.
    switch (aktion.type) {

        // Der Aktionstyp "PASSWOERTER_FESTLEGEN" setzt den gesamten State auf eine neue Liste von Passwörtern.
        case PASSWOERTER_FESTLEGEN:
            return {
                ...state,
                liste: aktion.passwoerter
            }

        // Der Aktionstyp "PASSWORT_HINZUFUEGEN" fügt der Liste ein neues Passwort hinzu.
        case PASSWORT_HINZUFUEGEN:
            return {
                ...state,
                liste: [...state.liste, aktion.passwort]
            }

        // Der Aktionstyp "PASSWORT_AKTUALISIEREN" aktualisiert ein vorhandenes Passwort in der Liste.
        case PASSWORT_AKTUALISIEREN:
            return {
                ...state,
                liste: state.liste.map(t => {
                    if (t.id === aktion.passwort.id) {
                        return aktion.passwort
                    }
                    return t
                })
            }

        // Der Aktionstyp PASSWORT_LOESCHEN entfernt ein Passwort aus der Liste.
        case PASSWORT_LOESCHEN:
            return {
                ...state,
                liste: state.liste.filter(t => t.id !== aktion.passwort.id)
            }

        // Wenn keiner der oben genannten Aktionstypen aufgerufen wird, gibt der Reduzierer einfach den aktuellen state zurück.
        default:
            return state
    }
}

// Zum Schluss wird der Reduzierer als Standard exportiert, sodass andere Module diesen importieren können.
export default reduzierer
```

      
   ## Der Reduxstore
 ```javascript 
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
```

Dieser Code definiert eine Redux-Speicherkonfiguration, die es anderen Modulen ermöglicht, den erstellten Speicher zu importieren und zu verwenden.
Zunächst werden die benötigten Funktionen Redux, createStore und CombineReducers importiert. Dann werden die drei Reducer Authentifizierung, Passwort und Methode aus separaten Modulen importiert.
Mit CombineReducers werden diese Reduzierer zu einem Hauptreduzierer namens mainReducer kombiniert. Es wird verwendet, um den Status des Repositorys zu verwalten.
Dann folgen zwei Hilfsfunktionen saveInLocalMemory und LoadFromLocalMemory. Die erste Funktion speichert den Cache-Zustand im lokalen Speicher des Browsers, konvertiert den zwischengespeicherten Zustand in eine serialisierte JSON-Zeichenfolge und speichert ihn im Arbeitsspeicher. Die zweite Funktion lädt den Speicherzustand aus dem lokalen Speicher und kehrt zurück, falls er existiert. Der aktuelle Status des Speichers wird dann aus dem lokalen Speicher geladen, sofern verfügbar.
Schließlich wird die reduxStore-Funktion definiert, um den Speicher zu erstellen. Die reduxStore-Funktion verwendet createStore, um einen Speicher mit dem Hauptreduzierer und dem aus dem lokalen Speicher geladenen Zustand zu erstellen. Der Event-Handler ist bei store.subscribe registriert, um den aktualisierten Status im lokalen Store zu speichern, wenn sich der Status des Stores ändert. Schließlich wird die reduxStore-Funktion als Standardfunktion exportiert, damit andere Module sie importieren und verwenden können.
      
      
   <hr>
   </details>








<details>
   <summary><h1>Das Backend</h1></summary>

## Die Anmeldung

![Anmeldung](https://user-images.githubusercontent.com/65679099/230729167-a9b3ef5b-ee1a-45a5-8549-1713399c4bb7.png)

Zunächst definiert die Funktion ein Joi-Objekt, indem sie die erforderlichen Felder (Benutzername und Passwort) angibt und validiert. Joi ist eine JavaScript-Validierungsbibliothek. Dadurch können Entwickler ein Schema für ein Objekt festlegen, das angibt, welche Eigenschaften vorhanden sein sollten, welche Datentypen erwartet werden können und welche Validierungsregeln für diese Eigenschaft gelten. Der Benutzername und das Passwort werden daraufhin aus dem Anforderungstext abgeleitet. Die Eingabe wird dann verifiziert, indem ein Joi-Objekt auf die Eingabe angewendet wird. Bei ungültiger Eingabe wird eine Fehlermeldung mit dem HTTP-Statuscode 400 zurückgegeben. Dann wird überprüft, ob der Benutzername in der Datenbank existiert. Andernfalls wird auch hier wieder eine Fehlermeldung mit dem HTTP-Statuscode 400 zurückgegeben. Wenn ein Benutzer in der Datenbank gefunden werden sollte, werden seine Daten analysiert, damit sichergestellt wird, dass sie korrekt formatiert sind. Das eingegebene Passwort wird dann mittels bcrypt.compareSync() mit dem vom Benutzer hinterlegten Passwort verglichen. Wenn das eingegebene Passwort korrekt ist, wird das JSON Web Token (JWT) mit den Anmeldeinformationen des Benutzers signiert und an den Client zurückgegeben. Wenn das Passwort falsch ist, wird eine HTTP 400-Fehlermeldung zurückgegeben.

## Die Registrierung

![Registrierung](https://user-images.githubusercontent.com/65679099/230729402-ec76d72a-d3f3-45ee-b3e2-818ef0221912.png)

Dies ist die Funktion des Node.js/Express.js-Controllers, um neue Benutzer in der Anwendung zu registrieren.
Zunächst definiert die Funktion ein Joi-Objekt, indem sie die erforderlichen Felder (Benutzername, Passwort und E-Mail-Adresse) angibt und validiert. Es wurde angegeben, dass der Wert für die E-Mail-Adresse eine gültige E-Mail-Adresse sein muss, aber auch leer gelassen werden kann.
Der Benutzername, das Passwort und die E-Mail-Adresse werden dann aus dem Text der Anfrage extrahiert. Die Eingabe wird dann validiert, indem ein Joi-Objekt auf die Eingabe angewendet wird. Bei ungültiger Eingabe wird eine Fehlermeldung mit dem HTTP-Statuscode 400 zurückgegeben. Dann wird überprüft, ob der Benutzername bereits in der Datenbank existiert. In diesem Szenario wird eine Fehlermeldung mit dem HTTP-Statuscode 400 zurückgegeben. Wenn der Benutzername nicht existiert, wird die Funktion aufgerufen, die den neuen Benutzer in der Datenbank speichert. Passwörter werden verschlüsselt, bevor sie in der Datenbank gespeichert werden. Wenn das Speichern erfolgreich ist, wird eine Erfolgsmeldung mit dem HTTP-Statuscode 200 zurückgegeben.
Dieser Code ist ein Beispiel für eine Implementierung einer einfachen Benutzerregistrierungsfunktion in Node.js/Express.js und enthält Verschlüsselungs- und Eingabevalidierungstechniken, um sicherzustellen, dass Benutzerdaten sicher in der Datenbank gespeichert werden. 

## Die Aktualisierung der Emailadresse

![EmailAktualisierung](https://user-images.githubusercontent.com/65679099/230729630-604b5636-b3fa-4318-8188-17826ab905a4.png)

Die erste Funktion (emailAktualisieren) prüft zunächst, ob der Benutzer authentifiziert ist. In diesem Fall wird ein Joi-Test erstellt, um sicherzustellen, dass die Anfrage einen gültigen E-Mail-Adresswert enthält. Wenn die Anfrage gültig ist, wird die updatedata-Funktion aufgerufen, um die E-Mail-Adresse des Benutzers in der Datenbank zu aktualisieren. Dann wird ein neues JWT mit den aktualisierten Benutzerdetails erstellt und als Antwort an den Client gesendet. Die zweite Funktion 

## Die Aktualisierung des Passwortes

![PasswortAktualisierung](https://user-images.githubusercontent.com/65679099/230729893-7db48ed3-c70c-4ac5-8f58-c0bc999ed1dd.png)

Dieser Code definiert drei Funktionen im Zusammenhang mit der Passwortverwaltung und der Benutzerauthentifizierung in der Webanwendung.
Die Funktion "Passwort vergessen" ist noch nicht implementiert und gibt nur eine Meldung zurück, dass sie noch nicht implementiert ist. Die Funktion „Passwort zurücksetzen“ ist ebenfalls noch nicht implementiert und gibt eine ähnliche Meldung zurück.
Die Funktion „Passwort ändern“ erfordert eine Benutzerauthentifizierung. Wenn der Benutzer nicht authentifiziert ist, wird eine Fehlermeldung zurückgegeben.
Die Joi.object-Funktion definiert ein Schema, das die alten und neuen Passwörter des Benutzers enthält. Dann werden das alte und das neue Passwort aus dem Request-Objekt extrahiert und zur Authentifizierung in das Joi-Objekt eingefügt. Wenn der Test fehlschlägt, wird eine Fehlermeldung zurückgegeben. Dann wird versucht, den Benutzer aus der Datenbank auszulesen. Wenn der Benutzer nicht existiert, wird eine Fehlermeldung zurückgegeben. Wenn der Benutzer existiert, wird das alte eingegebene Passwort mit dem in der Datenbank gespeicherten Passwort verglichen. Wenn das Passwort korrekt ist, wird das Passwort in der Datenbank mit dem neu eingegebenen Passwort aktualisiert. Andernfalls wird eine Fehlermeldung zurückgegeben, dass das alte Passwort ungültig ist.

## Das Löschen des Accounts

![AccountLöschen](https://user-images.githubusercontent.com/65679099/230730365-a6f0345c-3583-4464-abb9-a73a998c4091.png)

Dieser Code ist die Funktion zum Löschen des Benutzerkontos.
Zunächst wird überprüft, ob der Benutzer authentifiziert ist. Andernfalls wird eine Fehlermeldung zurückgegeben.
Anschließend wird eine Abfrage an die Firestore-Datenbank gesendet, um alle Passwörter abzurufen, die dem Benutzer gehören, dessen Konto gelöscht wird. Anschließend wird für jedes Dokument die Methode .delete() aufgerufen, um Einträge aus der Sammlung „Passwords“ zu entfernen.
Die Funktion deleteata() wird dann aufgerufen, um den Benutzer aus der Sammlung "Benutzer" zu entfernen. Abschließend wird eine Erfolgsmeldung mit dem Statuscode 200 zurückgegeben.

## Die Firebase-Cloudfunktion

![carbon (16)](https://user-images.githubusercontent.com/111282979/230164283-da4cb773-0c5f-45ae-9f38-4d68c0e342b6.png)

Diese Codezeile erstellt eine Firebase-Cloudfunktion, die als HTTP-Endpunkt dient. Die API wird ausgeführt, wenn auf einen bestimmten Endpunkt zugegriffen wird. functions.https.onRequest ist eine Firebase Cloud Function, die als HTTP-Request-Handler fungiert. app ist ein Express-Objekt, das Routen und Handler für API-Endpunkte enthält. Zusammen bilden sie die Cloud-Funktionalität von Firebase, die HTTP-Anforderungen an in der Anwendung definierte Routen und Handler umleitet.

| Sammlungen (VergissMeinNicht) | Dokumente (Benutzer)  | Felder (guter_passant679)  |
|---|---|---|
| Benutzer |guter_passant679, <br />  AndreasNikita909, <br /> NXKITAVATA4BIRA2                                                                                          |benutzername: guter_passant679 ; <br /> email: guter_passant@gmail.com; <br /> passwort: HaMsterrad88 |

|Sammlungen (VergissMeinNicht) | Dokumente (Passwort)  | Felder (Hbe83jdFrB4brk+Hdue38)  |
|---|---|---|
|Passwörter | Hu9dGerT47+lIKBez62bV, <br /> Hbe83jdFrB4brk+Hdue38, <br /> Zudl09ASv5FbnB7Uq9JbY, <br />  JkIol9u78Vbuehb7qwvGb| benutzername: guter_passant679; <br /> Beschreibung: Twitter; <br /> sicherheitswert: NOKDefo5HgBef34fRG579; <br /> verschüsseltes Passwort: EL09jd83mBn34U5newoWSSwmf51 |



Firestore ist eine von Google entwickelte dokumentenorientierte NoSQL-Datenbank. Im Gegensatz zu relationalen Datenbanken (z. B. SQL-Datenbanken) hat Firestore keine Tabellen, Zeilen oder Spalten, stattdessen werden Daten in Dokumenten gespeichert, die in Sammlungen organisiert sind. Jedes Dokument enthält Felder und Werte, die als JSON-Objekt dargestellt werden. Dokumente in der Sammlung müssen keine festen Felder haben. Dokumente sind daher flexibler und skalierbarer als relationale Datenbanken.
Firestore wurde für die Verwendung in Anwendungen entwickelt, die Daten in Echtzeit ändern, wie z. B. Chat-Anwendungen und Online-Spiele. Mit Firestore können Sie Daten in Echtzeit zwischen Ihrem Client (z. B. einem Mobilgerät oder Webbrowser) und Ihren Servern in der Cloud synchronisieren. Das bedeutet, dass Änderungen, die in einem Client vorgenommen werden, automatisch an alle anderen Clients weitergegeben werden, die mit derselben Datenquelle verbunden sind.
Firestore bietet verschiedene Funktionen zum Schreiben, Lesen, Aktualisieren und Löschen von Daten. Firestore-Daten können einfach über APIs abgerufen und bearbeitet werden. Firestore bietet auch eine Abfragesprache, mit der Entwickler komplexe Abfragen ausführen können, um bestimmte Daten aus Sammlungen abzurufen. Firestore ist Teil der Firebase-Plattform von Google und lässt sich problemlos in andere Firebase-Dienste wie Authentifizierung, Cloud-Messaging und Cloud-Funktionen integrieren. Firestore ist auch auf der Google Cloud Platform (GCP) verfügbar. Das bedeutet, dass es sich nahtlos in Anwendungen integrieren lässt, die auf der GCP gehostet werden.

![carbon (17)](https://user-images.githubusercontent.com/111282979/230663349-6f15f7f9-8909-43fb-8b54-ae5ad715564b.png)

In dem folgenden Bild sind die Operationen in Codeform zu erkennen. Der angegebene Code demonstriert die Fähigkeit, Daten in Firestore zu schreiben, zu lesen, zu aktualisieren und zu löschen. Die adddata-Funktion fügt der Sammlung Daten hinzu und kann die ID des Dokuments festlegen oder automatisch eine zufällige ID generieren. Die readdata-Funktion liest Daten aus einem Dokument mit einer bestimmten ID innerhalb einer Sammlung. Die updatedata-Funktion aktualisiert die Daten im Dokument mit der angegebenen ID in der Sammlung. Die Funktion „deletedata“ löscht Daten aus einem Dokument mit einer bestimmten ID in einer Sammlung.

</details>
<hr>



      
      
</details>
      
      
      
      
      
      
      
#  Das Backend

<details>
   <summary><h2>Grundfunktionen</h2></summary>
    
## Das Abrufen der Daten 
   
![Abrufen der Daten](https://user-images.githubusercontent.com/65679099/230971735-e80fc53b-cfe7-4743-9566-795d8a02ad4c.png)

Es gibt zwei JavaScript-Funktionen, die exportiert werden können. Die erste Funktion, die GetuserData lautet, nimmt ein Benutzerobjekt als Parameter auf und gibt ein neues Objekt zurück, welches gespeicherte Benutzerdaten aus der Datenbank beinhaltet. Die zurückgegebenen Daten sind Benutzername, Passwort und die E-Mail-Adresse.
Die zweite Funktion heißt passwordDataRetrieval und nimmt ein Passwortobjekt als Parameter. Diese Funktion gibt auch ein neues Objekt zurück, dass die gespeicherten Passwortdaten aus der Datenbank enthält. Dazu gehören Benutzername, Passwortbeschreibung, verschlüsseltes Passwort und Nonce. Allgemeinen handelt es sich bei diesen Funktionen um einfache JavaScript-Module, mit denen Daten aus einer Datenbank verarbeitet und abgerufen werden können.

## Die Funktionen der Datenbank 
```javascript      
// fuer die Operationen in der Datenbank werden die Funktionen zum: Hinzufuegen, Lesen, Aktualisieren, Löschen.

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
// (Datenbank (datenbank), sammlung - zu der die Daten hinzugefuegt werden soll, die ID - die zur Identifizierung des Dokumentes.
exports.datenHinzufuegen = (datenbank, sammlung, id, daten) => {
    // Wenn keine ID angegeben wird, wird automatisch ein zufälliger Key als Id erstellt.
    if (id === null) {
        return datenbank.collection(sammlung).add(daten)
    }
    // Mit ID werden die Daten mit ID in die Sammlung hinzugefuegt.
    return datenbank.collection(sammlung).doc(id).set(daten)
}

// Zum Lesen wird als Eingabe wieder die Datenbank, die Colletion, aus der die Daten abgerufen werden und die ID, deren Daten konkret gelesen werden sollen.
exports.datenLesen = (datenbank, sammlung, id) => {
    // Mit der Funktion get() erhält man die Felder des Dokuments im JSON Format.
    return datenbank.collection(sammlung).doc(id).get()
}

// Bei der Aktualisierung wird die ID des Dokuments benötigt, das aktualisiert werden soll
// und die Felder mitsamt der aktualisierten Daten, welche die alten überschreiben sollen.
exports.datenAktualisieren = (datenbank, sammlung, id, aktualisierteDaten) => {
    return datenbank.collection(sammlung).doc(id).update(aktualisierteDaten)
}

// Zum Löschen der Daten wird nur die ID des Dokuments benötigt, das gelöscht werden soll.
exports.datenLoeschen = (datenbank, sammlung, id) => {
    return datenbank.collection(sammlung).doc(id).delete()
}
```
Dieser Code definiert Funktionen für die Interaktion mit der Firestore-Datenbank. Firestore ist eine dokumentbasierte NoSQL-Datenbank, die Daten in Dokumenten speichert, die in Sammlungen organisiert sind. Die Funktion „Daten hinzufügen“ dient zum Speichern neuer Daten in der Datenbank. Die Funktion muss mit der Firestore-Datenbank, der Sammlung, die die Daten enthält, und den Daten selbst als Parameter aufgerufen werden. Optional können Sie auch eine ID angeben, die das Dokument identifiziert. Wenn keine ID angegeben wird, wird automatisch eine zufällige ID generiert. Die readdata-Funktion wird verwendet, um Daten aus der Datenbank abzurufen. Die Funktion sollte mit der Firestore-Datenbank, der Sammlung und der ID des Dokuments aufgerufen werden, dessen Daten abgerufen werden. Die Funktion gibt Dokumentdaten im JSON-Format zurück.
Die Funktion „Daten aktualisieren“ dient zum Aktualisieren der Daten in der Datenbank. Die Funktion muss mit der Firestore-Datenbank, der Sammlung, der ID des zu aktualisierenden Dokuments und den zu aktualisierenden Daten aufgerufen werden.
Die Funktion „datenLoeschen“ dient zum Löschen von Dokumenten aus der Datenbank. Diese Funktion muss mit der Firestore-Datenbank, der Sammlung und der ID des zu löschenden Dokuments aufgerufen werden.
Außerdem weist der Code darauf hin, dass zufällige IDs verwendet werden, um das Dokument auf den ersten Blick unkenntlich zu machen. Dies dient dem Schutz der Daten in der Datenbank.
   
<details>
   <summary><h2>Router</h2></summary>

## Die Authentifizierung 
   
 ![carbon (19)](https://user-images.githubusercontent.com/111282979/230934221-4e84eb06-a465-4486-ae88-603e2294bc50.png)
   
Dieser Code ist Teil der Node.js-Anwendung und für die Implementierung der Routing-Funktionalität verantwortlich. Das Express-Modul wird importiert, um einen Router zu erstellen, der verschiedene Routen für HTTP-Anforderungen an die Anwendung verwaltet. Authentifizierungsverwaltungsfunktionen wie Anmeldung, Registrierung, Kennwortaktualisierung, Kontolöschung und E-Mail-Aktualisierung werden ebenfalls eingegeben.
Dann werden Routen definiert, indem Verwaltungsfunktionen mit HTTP-Methoden und -Pfads verknüpft werden. Hier wird für jede Funktion eine HTTP-POST-Methode mit dem entsprechenden Pfad definiert, auf den die Anwendung antworten soll.
Schließlich wird der Router zur Verwendung in der Hauptanwendung exportiert.
   
## Das Passwort
   
 ![carbon (20)](https://user-images.githubusercontent.com/111282979/230936231-742f79dd-7c69-4407-bdf6-1ca340854c13.png)
   
 Dieser Code erstellt ein Router-Objekt mit dem Express-Modul. Router werden verwendet, um verschiedene Routen in Express zu definieren und sie Verwaltungsfunktionen zuzuordnen. Die Verwaltungsfunktionen für die verschiedenen Routen werden aus \'../Management/password.js\' importiert und sind addpassword, deletepassword und allpasswords. Diese Funktionen sind für das Hinzufügen, Entfernen und Extrahieren von Passwörtern aus der Datenbank verantwortlich. Routen werden definiert, indem geeignete Controller-Funktionen an HTTP-Methoden und -Pfade gebunden werden. 
router.post(\'/\',Addpassword) definiert eine Route zum Hinzufügen eines Passworts und verwendet die HTTP-POST-Methode und den "/\"-Pfad. router.delete(\'/:passwordId\',passwordLoeschen) definiert eine Route zum Entfernen von Passwörtern basierend auf der ID und verwendet die HTTP-Methode DELETE sowie den Pfad \'/:passwordId\'. Die Passwort-ID wird als Parameter in der URL übergeben. router.get(\'/\',allpasswords) definiert eine Route zum Abrufen aller Passwörter und verwendet die HTTP GET-Methode und den Pfad "/\". 
Schließlich wird der Router zur Verwendung in der Hauptanwendung exportiert.

<details>
   <summary><h2>Vermittlung</h2></summary>
   
## Das Überprüfen der Authentifizierung 

```javascript
// Importieren des 'jsonwebtoken'-Moduls für die Verarbeitung von JSON-Web-Token
const jwt = require('jsonwebtoken')

// Middleware für die Überprüfung der Autorisierung des Benutzers mit JWT
module.exports = (req, res, next) => {

    // Der Authorization-Headers wird aus der HTTP-Anfrage extrahiert.
    const Authorization_Header = req.get('Authorization')

    // Wenn kein Authorization-Header vorhanden ist, ist der Benutzer nicht authentifiziert
    if (!Authorization_Header) {
        req.authentifizierungsUeberpruefung = false
        return next()
    }

    // Das Tokens wird aus dem Authorization-Header extrahiert.
    const token = Authorization_Header.split(' ')[1]
    if (!token || token === '') {
        // Wenn kein Token vorhanden ist, ist der Benutzer nicht authentifiziert
        req.authentifizierungsUeberpruefung = false
        return next()
    }

    let entschluesseltesToken
    try {
        // Verifizieren des Tokens und entschluesseln der Daten (z.B. Benutzername)
        entschluesseltesToken = jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (error) {
        // Wenn das Verifizieren fehlschlägt, ist der Benutzer nicht authentifiziert.
        req.authentifizierungsUeberpruefung = false
        return next()
    }

    if(!entschluesseltesToken) {
        // Wenn kein dekodiertes Token vorhanden ist, ist der Benutzer nicht authentifiziert.
        req.authentifizierungsUeberpruefung = false
        return next()
    }

    // Wenn alles erfolgreich war, ist der Benutzer authentifiziert und der Benutzername wird der Anfrage hinzugefügt.
    req.authentifizierungsUeberpruefung = true
    req.benutzername = entschluesseltesToken.benutzername
    next()
}
```
Dieser Code definiert eine Middleware-Funktion in Node.js, die verwendet wird, um die Benutzerautorisierung mit einem JSON Web Token (JWT) zu überprüfen.
Eine Middleware-Funktion wird häufig zwischen Anfrage und Antwort in der HTTP-Anfragekette eingefügt, um Benutzerberechtigungen zu überprüfen, bevor die Anfrage an den Hauptanwendungscode weitergeleitet wird. Zunächst extrahiert die Funktion den „Authorization“-Header aus der HTTP-Anforderung, die das JWT-Token enthält. Wenn der Header fehlt oder leer ist, wird der Benutzer als nicht authentifiziert markiert und der folgende Middleware- oder Hauptanwendungscode wird aufgerufen. Wenn ein Token vorhanden ist, wird das Token aus dem Header extrahiert und durch Entschlüsselung unter Verwendung des in der Umgebungsvariablen TOKEN_SECRET gespeicherten geheimen Schlüssels verifiziert. Wenn das Token ungültig ist oder die Entschlüsselung fehlschlägt, wird der Benutzer als nicht authentifiziert markiert und die folgende Middleware oder der folgende Hauptanwendungscode aufgerufen. Wenn das Token jedoch erfolgreich verifiziert und entschlüsselt wird, wird der Benutzer als authentifiziert markiert, indem „true“ an das Attribut „authentication“ in der Anforderung gesendet wird, und der Benutzername wird aus dem Token extrahiert und als Attribut „username“ verwendet. auf Anfrage. Dann wird die nächste Haupt-Middleware oder der Anwendungscode aufgerufen. Die Middleware-Funktion ist daher ein wichtiger Bestandteil des sicheren und autorisierten Webanwendungs-Stacks, da sie sicherstellt, dass nur autorisierte Benutzer auf die meisten Ressourcen oder Funktionen zugreifen können, die durch Validierung und Dekodierung des JWT-Tokens identifiziert werden.
   
## Der Firestore
   
   ![carbon (22)](https://user-images.githubusercontent.com/111282979/230939931-4bb35db0-94e4-42e8-b889-490689298a2c.png)

Dieser Code definiert die Middleware-Funktionalität für Express-Anwendungen, um sicherzustellen, dass alle ausgehenden HTTP-Antworten mit bestimmten HTTP-Headern gekennzeichnet sind. Diese Header sind nützlich, um Sicherheits- und Datenschutzprobleme zu vermeiden. Zunächst werden einige Konstanten definiert, die die Namen der Header enthalten, die in die HTTP-Antworten eingefügt werden sollen.
Dann wird die Middleware-Funktion definiert. Es benötigt drei Argumente: das Anforderungsobjekt (req), das Antwortobjekt (res) und die nächste Zwischenfunktion (next).
Die Header werden dann zu den Middleware-Funktionen hinzugefügt, indem die entsprechenden Methoden für das Response-Objekt (res) aufgerufen werden. Zunächst wird der X-Content-Type-Options-Header auf nosniff gesetzt, um zu verhindern, dass der Browser Dateien mit dem falschen MIME-Typ interpretiert.
Dann wird der Header \'X-Frame-Options\' auf \'DENY\' gesetzt, um Clickjacking zu verhindern. Der Header der Inhaltssicherheitsrichtlinie ist auf eine Richtlinie festgelegt, die nur HTTPS-Verbindungen zulässt und XSS-Angriffe verhindert.
Schließlich wird der Header \'X-XSS-Protection\' auf \'1 gesetzt; mode=block\' ist so eingestellt, dass XSS-Angriffe blockiert werden. Die nächste (nächste) Middleware-Funktion wird dann aufgerufen, um die Anforderung an die nächste Middleware-Funktion oder Route weiterzuleiten.

<details>
   <summary><h2>Verwaltung</h2></summary>
   
 ## Die Authentifizierung
   
 ```javascript  
 // Joi ist die perfekte Wahl für das Festlegen von Schemata/Formaten, denen Daten folgen sollen
// und der Validierung dieser.
const Joi = require('@hapi/joi')
// Zur Authentifizierung werden Jsonwebtokens (JWT) 
const jwt = require('jsonwebtoken')
// und für die Verschlüsselung die Bcrypt-Hashfunktion verwendet.
// Dafür wird die Javascript-Implementierung "bcryptjs" verwendet.
const bcrypt = require('bcryptjs')

// Die Grundfunktionen zur Arbeit mit Datenbanken werden importiert,
const { datenLesen, datenHinzufuegen, datenAktualisieren, datenLoeschen } = require('../Grundfunktionen/datenbankFunktionen')

const { benutzerDatenAbrufen } = require('../Grundfunktionen/datenAbrufen')

// Für die Registrierung wird das Format (benutzername, passwort, email) vorgegeben, in dem die Daten eingegeben werden müssen.
exports.registrierung = async (req, res) => {
    const Format = Joi.object({
        benutzername: Joi.string().required(),
        passwort: Joi.string().required(),
        email: Joi.string().email().allow('')
    })

    // Benutzername, Passwort und email werden aus dem Message-Body der Anfrage entnommen.
    const { benutzername, passwort, email } = req.body

    // Validierung, ob die eingegebenen Daten aus der Anfrage dem vorgegebenen Format (Benutzername, Passwort, Email) 
    // und den Anforderung entsprechen. (Bspw. muss eine Email ein @-Zeichen beinhalten, was durch die Funktion "email()" festgelegt wird)
    const Validierung = Format.validate({ benutzername, passwort, email })

    // Wenn die eingegebenen Daten nicht dem Format entsprechen, dann gibt es einen Fehler 400 (Bad-Request). Die Anfrage ist fehlerhaft.
    // Es könnte bspw. sein, dass ein Nutzer eine Email ohne @-Zeichen eingegeben hat.
    if (Validierung.error) {
        return res.status(400).send({
            status: 0,
            message: Validierung.error.message,
        })
    }

    // In der Firestore-Datenbank wird überprüft, ob der Benutzername bereits existiert.
    let b = await datenLesen(req.firestore, 'benutzer', benutzername)
    // Wenn dies der Fall ist, wird die Anfrage mit dem Fehler 400 (Bad-Request) zurückgegeben.
    // Dazu noch eine Fehlermeldung, dass der Benutzer ja bereits registriert sei.
    if (b.exists) {
        return res.status(400).send({
            status: 0,
            message: `Der Benutzer ${benutzername} ist bereits registriert!`,
        })
    }

    // Wenn der Benutzername aber noch nicht existiert, wird dieser in der Firestore-Datenbank hinzugefuegt.
    // In der Sammlung 'benutzer' wird ein neuer Benutzer mit dem angegebenen Benutzernamen angelegt und diesem die Felder "email", "passwort" und "benutzername" hinzugefuegt.
    await datenHinzufuegen(req.firestore, 'benutzer', benutzername, { benutzername, email: email || '', passwort: bcrypt.hashSync(passwort, 12) })

    // Nach der erfolgreichen Registrierung des Benutzers, wird die Anfrage mit dem Statuscode 200 (OK) zurückgegeben.
    // Dazu noch die Meldung, dass der Benutzer erfolgreich registriert wurde.
    return res.status(200).send({
        status: 1,
        message: `Der Benutzer ${benutzername} wurde erfolgreich registriert!`
    })
}

// Für die Anmeldung wird das Format (benutzername, passwort) vorgegeben, in der die Daten eingegeben werden müssen.
exports.anmeldung = async (req, res) => {
    const Format = Joi.object({
        benutzername: Joi.string().required(),
        passwort: Joi.string().required()
    })

    // Benutzername und Passwort werden aus dem Message-Body der Anfrage entnommen.
    const { benutzername, passwort } = req.body

    // Validierung, ob die eingegebenen Daten aus der Anfrage dem vorgegebenen Format (Benutzername, Passwort) 
    // und den Anforderung entsprechen. (Bspw. muss die Eingabe ein String sein, der nicht leer ist)
    const Validierung = Format.validate({ benutzername, passwort })

    // Wenn nicht, dann gibt es einen Fehler 400 (Bad-Request). Die Anfrage ist fehlerhaft.
    // Dazu noch die jeweilige Fehlermeldung, damit man weiß, wo der Fehler liegt.
    if (Validierung.error) {
        return res.status(400).send({ status: 0, message: Validierung.error.message })
    }

    // In der Firestore-Datenbank wird überprüft, ob der Benutzername existiert.
    let b = await datenLesen(req.firestore, 'benutzer', benutzername)
    if (!b.exists) {
        // Wenn dies nicht der Fall ist, wird die Anfrage mit dem Fehler 400 (Bad-Request) zurückgegeben.
        // Dazu noch eine Fehlermeldung, dass dieser Benutzer noch nicht in der Datenbank existiert.
        return res.status(400).send({ status: 0, message: `Der Benutzer ${benutzername} existiert nicht!` })
    }

    // Wenn der Benutzer aber existiert, werden dessen Daten (Email und Passwort) abgerufen 
    // und in der Konstanten "benutzer" gespeichert.
    const benutzer = benutzerDatenAbrufen(b.data())

    // Daraufhin erfolgt ein Abgleich des Passwortes, das unter dem Benutzernamen in der Datenbank gespeichert ist und dessen, das bei der Anmeldung eingegeben wurde.
    if (bcrypt.compareSync(passwort, benutzer.passwort)) {
        const token = jwt.sign({ benutzername, email: benutzer.email }, process.env.TOKEN_SCHLUESSEL, {
            expiresIn: '1h'
        })

        // Wenn die Passwörter übereinstimmen, wird ein Token mit einer Gültigkeit von einer Stunde zurückgegeben. (Status 200 (OK))
        return res.status(200).send({
            status: 1,
            token
        })
    } else {
        // Wenn die beiden Passwörter nicht übereinstimmen, gibt es einen Fehler 400 (Bad-Request)
        // und dazu die Fehlermeldung, dass das eingegebene Passwort nicht mit dem aus der Datenbank übereinstimmt.
        return res.status(400).send({
            status: 0,
            message: `Passwort inkorrekt!`,
        })
    }
}

// Der Benutzer soll auch die Möglichkeit haben, sein Passwort aktualisieren zu können.
exports.passwortAktualisieren = async (req, res) => {
    // Dafuer ist erstmal wichtig, dass der Benutzer in dem Moment autorisiert ist.
    // Wie die Autorisierungsabfrage "authentifizierungsUeberpruefung" genau funktioniert, wird in "../Vermittlung/authentifizierungsUeberpruefung" erklärt.
    if (!req.authentifizierungsUeberpruefung) {
        return res.status(400).send({ status: 0, message: "Nicht autorisiert." })
    }

    // Um das Passwort zu aktualisieren, kann nicht, wie bei der Email, einfach das neue eingegeben werden.
    // Es wird auch das alte Passwort benötigt, um sicher zu gehen, dass der Benutzer die Anmeldedaten kennt.
    const Format = Joi.object({ altesPasswort: Joi.string().required(), neuesPasswort: Joi.string().required(), })

    // Das alte und neue Passwort werden aus dem Message-Body der Anfrage entnommen.
    const { altesPasswort, neuesPasswort } = req.body

    const Validierung = Format.validate({ altesPasswort, neuesPasswort })

    // Validierung, ob die Anfrage, dem Format (altesPasswort, neuesPasswort) entspricht.
    // Wenn nicht, dann gibt es einen Fehler 400 (Bad-Request). Die Anfrage ist fehlerhaft.
    if (Validierung.error) {
        return res.status(400).send({
            status: 0,
            message: Validierung.error.message,
        })
    }

    
    let b = await datenLesen(req.firestore, 'benutzer', req.benutzername)
    if (!b.exists) {
        return res.status(400).send({
            status: 0,
            message: `Der Benutzer ${req.benutzername} existiert nicht!`,
        })
    }

    // Die in der Datenbank gespeicherten Daten des Benutzers werden abgerufen.
    const user = benutzerDatenAbrufen(u.data())

    // Daraufhin wird das alte Passwort mit dem aus der Datenbank verglichen.
    if (bcrypt.compareSync(altesPasswort, user.passwort)) {
        // Wenn die beiden gleich sind, wird eine wird das neue Passwort in der Datenbank gespeichert.
        await datenAktualisieren(req.firestore, 'benutzer', req.benutzername, { passwort: bcrypt.hashSync(neuesPasswort, 12) })

        // Der Server setzt den Status auf 1 und gibt diesen zurück. (Status 200 (OK))
        return res.status(200).send({ status: 1 })
    // Wenn die beiden nicht gleich sind, wird eine Fehlermeldung und der Status 0 zurückgegeben. (Status 400 (Bad-Request))
    } else {
        return res.status(400).send({ status: 0, message: `Das ist nicht das alte Passwort!`, })
    }
}

// Der Benutzer soll auch die Möglichkeit haben, seine Email aktualisieren zu können.
exports.emailAktualisieren = async (req, res) => {
    // Dafuer ist erstmal wichtig, dass der Benutzer in dem Moment autorisiert ist.
    // Wie die Autorisierungsabfrage "authentifizierungsUeberpruefung" genau funktioniert, wird in "../Vermittlung/authentifizierungsUeberpruefung" erklärt.
    if (!req.authentifizierungsUeberpruefung) {
        return res.status(400).send({ status: 0, message: "Nicht autorisiert!" })
    }

    // Das Format fuer die neue Email muss natürlich auch dem einer Mailadresse entsprechen.
    const Format = Joi.object({ email: Joi.string().email().allow('').required() })

    // Die eingegebene neue Email wird aus dem Message-Body der Anfrage entnommen.
    const { email } = req.body

    // Nun wird validiert, ob die eingegebene Email denn auch dem passenden Format entspricht.
    const Validierung = Format.validate({ email })

    // Wenn die Eingabe nicht mit dem Format übereinstimmt, wird ein Fehler 400 (Bad-Request) mit der jeweiligen Fehlermeldung zurückgegeben.
    if (Validierung.error) {
        return res.status(400).send({ status: 0, message: Validierung.error.message })
    }

    // Wenn jedoch die eingegeben Email in das Format passt, wird in der Firestore-Datenbank, 
    // in der Sammlung "benutzer", die Email des Benutzers überschrieben.
    await datenAktualisieren(req.firestore, 'benutzer', req.benutzername, { email })
    const token = jwt.sign({ benutzername: req.benutzername, email }, process.env.TOKEN_SCHLUESSEL, { expiresIn: '1h' })

    // Dem Nutzer wird ein neues Token zurückgegeben und der Status auf 1 gesetzt.
    return res.status(200).send({ status: 1, token })
}

// Der Benutzer soll gewiss auch seinen Account löschen können.
exports.accountLoeschen = async (req, res) => {
    
    // Dafür muss auf jeden Fall sichergestellt werden, dass der Benutzer authentifiziert ist.
    if (!req.authentifizierungsUeberpruefung) {
        // Wenn dies nicht der Fall ist, wird eine Fehlermeldung zurückgegeben.
        return res.status(400).send({ status: 0, message: "Nicht autorisiert!" })
    }

    // Wenn der Nutzer jedoch authentifiziert ist, diese Aktion auszuführen, werden zuerst alle Passwörter gelöscht, die auf den
    // Namen dieses Benutzers in der Datenbank gespeichert sind.
    const passwoerter = await req.firestore.collection("passwoerter").where("benutzername", "==", req.benutzername).get()
    passwoerter.forEach(async doc => {
        await doc.ref.delete()
    })

    // Daraufhin wird auch der Benutzer aus der Datenbank gelöscht und somit sind alle Daten zu diesem Benutzer und auch
    // der Account selbst permanent gelöscht.
    await datenLoeschen(req.firestore, 'benutzer', req.benutzername)
    
    // Der Status 1 wird zurückgegeben, da das Löschen problemlos funktioniert hat. (Status 200 (OK)).
    return res.status(200).send({
        status: 1,
    })
}
```

Dieser Code implementiert RESTful-API-Endpunkte für die Benutzerauthentifizierung mit Node.js und Firestore als Datenbanken.
Zunächst werden drei Node.js-Module für die Arbeit mit der Datenbank sowie für die Authentifizierung und Verschlüsselung importiert: @hapi/joi für die Datenvalidierung, jsonwebtoken für die Generierung von JSON-Web-Token für die Authentifizierung und bcryptjs für die Passwortverschlüsselung. Anschließend werden die grundlegenden Firestore-Datenbankfunktionen importiert, die zum Ausführen von CRUD-Vorgängen in der Firestore-Datenbank erforderlich sind.
Die Registrierungsfunktion ist für den Benutzerregistrierungsprozess verantwortlich. Definiert ein Format-Objekt, das das erforderliche Format für Benutzereingaben angibt (Benutzername, Kennwort und E-Mail-Adresse). Die Eingabe wird dann aus dem Anforderungstext extrahiert und für das angegebene Format validiert. Wenn die Validierung fehlschlägt, wird eine Antwort mit dem Statuscode 400 zurückgegeben und eine Fehlermeldung gesendet, die den Benutzer darüber informiert, dass er falsche Daten eingegeben hat.
Anschließend wird überprüft, ob der angegebene Benutzername in der Datenbank vorhanden ist. In diesem Fall wird eine Fehlermeldung zurückgegeben und die Registrierung abgebrochen.
Wenn der Benutzername noch nicht in der Datenbank existiert, wird ein neuer Benutzer mit den eingegebenen Daten (einschließlich des gehashten Passworts) zur Firestore-Datenbank hinzugefügt und eine Erfolgsmeldung zurückgegeben. Die Login-Funktion ist für den Benutzer-Login-Prozess verantwortlich. Es definiert auch ein Format-Objekt, das das erforderliche Benutzernamen- und Kennwortformat angibt und überprüft, ob die Benutzereingabe diesem Format entspricht. Schlägt die Authentifizierung fehl, wird eine 400-Status-Fehlermeldung zurückgegeben und die Anmeldung abgebrochen.
Anschließend wird die Firestore-Datenbank nach dem angegebenen Benutzernamen durchsucht. Existiert der Benutzername nicht in der Datenbank, wird eine Fehlermeldung zurückgegeben und die Anmeldung abgebrochen.
Wenn der Benutzername in der Datenbank gefunden wird, wird das eingegebene Passwort mit dem gehashten Passwort in der Datenbank verglichen. Wenn sie übereinstimmen, kann das generierte und zurückgegebene JSON-Web-Token als Authentifizierungstoken verwendet werden. Stimmen sie nicht überein, wird eine Fehlermeldung zurückgegeben und die Anmeldung abgebrochen.

   
## Das Passwort
   
 ```javascript   
// Import der Joi-Library für die Validierung von Anfragen
const Joi = require('@hapi/joi')

// Import von Hilfsfunktionen für die Verarbeitung von Daten und Datenbankzugriffe
const { passwortDatenAbrufen } = require('../Grundfunktionen/datenAbrufen')
const { datenHinzufuegen, datenLesen, datenLoeschen } = require('../Grundfnktionen/datenbankFuntkionen')

// Definierung einer Exportfunktion für das Hinzufügen von Passwörtern
exports.passwortHinzufuegen = async (req, res) => {
    // Überprüfung, ob der Nutzer authentifiziert ist, um unbefugten Zugriff zu verhindern
    if (!req.authentifizierungsUeberpruefung) {
        return res.status(400).send({
            status: 0,
            message: "Nicht autorisiert!"
        })
    }

    // Definierung eines Formats für die erwartete Anfrage mit Hilfe von Joi
    const format = Joi.object({
        beschreibung: Joi.string().required(),
        verschluesseltesPasswort: Joi.string().required(),
        sicherheitswert: Joi.string().required()
    })

    // Extraktion von Beschreibung, verschluesseltem Passwort und Sicherheitswert aus der Anfrage
    const { beschreibung, verschluesseltesPasswort, sicherheitswert } = req.body

    // Überprüfung, ob die Anfrage dem erwarteten Format entspricht
    const validierung = format.validate({ beschreibung, verschluesseltesPasswort, sicherheitswert })

    // Wenn die Anfrage nicht dem erwarteten Format entspricht, wird eine Fehlermeldung zurückgegeben (Status 400 (Bad-Request)).
    if (validierung.error) {
        return res.status(400).send({
            status: 0,
            message: validierung.error.message,
        })
    }

    // Speichern des Passwortes in der Datenbank mithilfe der DatenbankFunktion "datenHinzufuegen".
    const passwort = await datenHinzufuegen(req.firestore, 'passwoerter', null, { beschreibung, verschluesseltesPasswort, sicherheitswert, benutzername: req.benutzername })

    // Ein Status 200 (OK) wird zurückgegeben, gemeinsam mit dengespeicherten Passwort-Informationen.
    return res.status(200).send({
        status: 1,
        passwort: {
            id: passwort.id,
            beschreibung,
            verschluesseltesPasswort,
            sicherheitswert,
            benutzername: req.benutzername
        },
        message: "Passwort erfolgreich gespeichert!"
    })
}

// Definition der Exportfunktion für das Löschen von Passwörtern
exports.passwortLoeschen = async (req, res) => {
    // Zuerst wird überprüft, ob der Nutzer autorisiert ist.
    // Wenn das nicht der Fall ist, wird ein Status 400 gesendet.
    if (!req.authentifizierungsUeberpruefung) {
        return res.status(400).send({
            status: 0,
            message: "Nicht autorisiert!"
        })
    }

    // Danach wird das Format festgelegt, das die Anfrage einhalten soll.
    // In diesem Fall darf nur eine PasswortId in der Anfrage enthalten sein.
    const format = Joi.object({
        passwortId: Joi.string().required()
    })

    // Aus der Anfrage wird die PasswortId entnommen.
    const { passwortId } = req.params

    // Daraufhin wird die Anfrage auf die Einhaltung des Formates überprüft.
    const validierung = format.validate({ passwortId })

    // Wenn es einen Fehler bei der Validierung des Formates gibt, wird dieser als Fehlermeldung zurückgegeben.
    if (validierung.error) {
        return res.status(400).send({
            status: 0,
            message: validierung.error.message,
        })
    }

    // Wenn der Benutzername nicht mit der PasswortId validiert werden konnte, gibt es auch eine Fehlermeldung.
    if (! await validierungPasswortBenutzername(req, passwortId)) {
        return res.status(400).send({
            status: 0,
            message: "Du darfst diese Aktion nicht ausführen!"
        })
    }

    // Wenn es jedoch keine Probleme gibt, wird das zur passwortId zugehörige Passwort aus der Datenbank gelöscht.
    await datenLoeschen(req.firestore, 'passwoerter', passwortId)

    // Als Antwort auf die Anfrage wird daraufhin eine Bestätigungsnachricht und der Status 1 gesendet.
    return res.status(200).send({
        status: 1,
        message: "Passwort erfolgreich gelöscht!"
    })
}

// Diese Funktion gibt alle Passwörter des aktuellen Benutzers zurück.
exports.allePasswoerter = async (req, res) => {
    // Prüfen, ob der Benutzer authentifiziert ist.
    if (!req.authentifizierungsUeberpruefung) {
        return res.status(400).send({
            status: 0,
            message: "Nicht autorisiert!"
        })
    }

    // Abrufen aller Passwörter des aktuellen Benutzers aus der Firestore-Datenbank.
    const passwoerter = await req.firestore.collection("passwoerter").where("benutzername", "==", req.benutzername).get()

    // Erstellen eines Arrays, das alle gefundenen Passwörter enthält.
    const passwoerterArray = []

    // Überprüfung, ob die Abfrageergebnisse nicht leer sind, und wenn nicht,
    // wird jedes Ergebnis als Objekt mit seiner id in den passwoerterArray eingefügt.
    if (!passwoerter.empty) {
        passwoerter.forEach(p => { passwoerterArray.push({ ...p.data(), id: p.id })
        })
    }

    // Senden des Arrays mit den Passwörtern als Erfolgsmeldung an den Client.
    return res.status(200).send({
        status: 1,
        passwoerter: passwoerterArray
    })
}

// Validierung des Benutzernamens
const validierungPasswortBenutzername = async (req, id) => {
    // Der Variablen p wird das Passwort zur angegebenen Id zugeordnet.
    let p = await datenLesen(req.firestore, 'passwoerter', id)

    // Wenn das Passwort nicht existiert, wird "false" zurückgegeben.
    if (!p.exists) {
        return false
    }


    // Ansonsten werden die gespeicherten Daten des Passwortes ausgegeben
    let passwort = passwortDatenAbrufen(p.data()) // parse item data

    // und validiert, ob der Benutzername, der im Passwort gespeichert ist, dem Benutzernamen, der in der Anfrage übergeben wurde, entspricht.
    if (passwort.benutzername !== req.benutzername) {
        return false
    }
    return true
}
```  

   Der Code enthält die allpasswords-Funktion, die alle Passwörter eines bestimmten Benutzers aus der Datenbank abruft und sie als Antwort zurückgibt.
Die Funktionalität beginnt mit der Benutzerauthentifizierung, um unbefugten Zugriff zu verhindern. Wenn der Benutzer nicht authentifiziert ist, wird eine Fehlermeldung zurückgegeben und die Funktion beendet.
Dann wird eine Abfrage an die Datenbank gesendet, um alle Passwörter des Benutzers zu erhalten. Dazu wird die in der Datei functions.js der Datenbank definierte Datenlesefunktion verwendet.
Wenn die Anfrage erfolgreich ist, wird das Passwort zurückgegeben, um die Anfrage zu erfüllen. Wenn jedoch ein Fehler auftritt, wird eine Fehlermeldung zurückgegeben.
Die Antwort auf die Anfrage enthält eine Statusmeldung, die anzeigt, ob die Anfrage erfolgreich war, und eine Liste aller Benutzerpasswörter. Jedes Passwortobjekt enthält die ID, die Beschreibung, das verschlüsselte Passwort und den Sicherheitswert.
Dies ist eine grundlegende Funktion, die Sie in einer Passwort-Manager-Anwendung verwenden können.
   
## Der Index
   
```javascript    
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
Footer
© 2023 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
```
   
Hier ist der Node.js-Code, der eine Express-App erstellt, die als Firebase Cloud-Funktion exportiert wird, um HTTP-Anforderungen zu verarbeiten. Die App verwendet das Firebase Functions-Modul, Cross-Origin Resource Sharing (CORS) und lädt Umgebungsvariablen mit dotenv. Die Proxy-Authentifizierung erfolgt über Authenticationscheck und der Datenbank-Firestore-Proxy über Firestore.
Es gibt zwei Router, PasswordRouter und AuthenticationRouter, die Endpunkte bei /password und /authentication verwenden. Die Anwendung verwendet JSON als Datenformat und die CORS-Einstellung ist auf „origin: true“ gesetzt, um den Zugriff von anderen Quellen zu ermöglichen. Schließlich wird die Express-App als Firebase-Cloudfunktion exportiert, die auf HTTP-Anfragen antwortet.
   
  




<hr>
      
     
    




## Authoren

- [Laurenz Brause](https://www.github.com/algerr)
- [Daniel Pauli](https://github.com/daniel10011011)

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons Lizenzvertrag" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />`Dieses Werk ist lizenziert unter einer:` <br>
<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">`Creative Commons Namensnennung` - `Nicht kommerziell` - `Keine Bearbeitungen 4.0 International Lizenz`</a>
