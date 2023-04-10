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
   - [Die Hilfsfunktionen](#die-hilsfunktionen)
   - [Der Redux-Store](#der-redux-store)
- [Das Backend](#das-backend)
   - [Die Anmeldung](#die-anmeldung)
   - [Die Registrierung](#die-registrierung)
   - [Die Aktualisierung der Emailadresse](#die-aktualisierung-der-emailadresse)
   - [Das Ändern des Passwortes](#das-aendern-des-passwortes)
   - [Das Löschen des Accounts](#das-loeschen-des-accounts)
   - [Die Firebase-Cloudfunktion](#die-firebase-cloudfunktion)
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
   
   ## Das zentrierte Modalfenster
   
   ## Das obere Modalfenster
   
   ## Das Registrieren
    
   ## Die Seitenleiste
   Die Seitenleiste lässt sich nach Wunsch ein- und ausblenden. Wenn diese eingeblendet ist, hat man die Option im Hauptfenster zu bleiben, welches den Namen              "Passwörter" trägt, oder man kann in das Fenster "Accounteinstellungen" wechseln. In den Accounteinstellungen sieht man zunächst einmal seinen festgelegten             Benutzernamen und seine Email mit der man sich im Vorhinein registriert hat. Darüber hinaus kann man in diesem Fenster entweder eine neue Email oder ein neues        Passwort festlegen, falls man etwas an seinen Anmeldedaten verändern möchte. Hierzu gibt es aber nun auch die Option seinen Account vollständig zu löschen, falls      man sich dazu entscheiden sollte.
   
   ## Die Tabelle
   In der Tabelle werden die Passwörter mit den zugehörigen Beschreibungen aufgelistet, sodass man diese einsehen kann. Wenn das Masterpasswort eingegeben ist und        seine Passwörter in dem Moment in der Tabelle nicht verschlüsselt sind, kann man jeweils ein Passwort ansehen und es gegebenfalls kopieren, um es dann anschließend    wo man es auch immer haben möchte, einzufügen. Sobald das Masterpasswort wieder ausgetragen ist, zeigt die Tabelle die festgelegt Passwörter nicht mehr an, sondern    folgende Nachricht:"Das Passwort ist verschlüsselt"
    
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
   ## Die Konfigurierung des Shops 
   <hr>
   <details>
   <summary><h3>Aktionen</h3></summary>
   ## Die Aktionstypen
   
   ## Die Authentifizierung 
      
   ## Die Items
      
   ## Die Modale
   <hr>
   </details>
      
   <details>
   <summary><h3>Reduzierungen</h3></summary>
   ## Die Authentifizierung
      
   ## Die Items
      
   ## Die Modale 
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



## Authoren

- [Laurenz Brause](https://www.github.com/algerr)
- [Daniel Pauli](https://github.com/daniel10011011)

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons Lizenzvertrag" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />`Dieses Werk ist lizenziert unter einer:` <br>
<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">`Creative Commons Namensnennung` - `Nicht kommerziell` - `Keine Bearbeitungen 4.0 International Lizenz`</a>
