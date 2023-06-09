<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons Lizenzvertrag" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />`Dieses Werk ist lizenziert unter einer:` <br>
<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">`Creative Commons Namensnennung` - `Nicht kommerziell` - `Keine Bearbeitungen 4.0 International Lizenz`</a>

https://user-images.githubusercontent.com/65679099/230721605-d894c2f3-10a2-4caa-b00d-018e8061457d.mp4

# VergissMeinNicht
Sind Sie genervt von der ewigen Suche nach dem Passwort? Wir haben die Lösung!

Wir wollten mit diesem Projekt etwas schaffen, das den Menschen nützt. Da wir selbst von dem Problem betroffen waren, dass wir unsere Passwörter nicht mehr finden konnten, haben wir uns gefragt, ob es nicht möglich ist, einen Passwort Manager, wie er überall angepriesen wird, selbst zu entwickeln. 
Bei den großen Plattformen kann man sich nicht sicher sein, ob die Passwörter wirklich gut verschlüsselt und vor fremdem Zugriff geschützt sind. Ein Passwort Manager, der erklärt, wie alles funktioniert und 100% Transparenz schafft, wie Passwörter und Nutzerdaten nicht einmal den Betreibern zugänglich sind, ist definitv vertrauenswürdiger. 
Neben dem Standard-Account-System, das den ersten Faktor zur Authentifizierung des Benutzers darstellt, haben wir uns überlegt, ein Masterpasswort als zweiten Faktor zu verwenden. Dieses Masterpasswort ist wie der Schlüssel zu einem unzerstörbaren Safe. Man kann zwar davor stehen, d.h. das Passwort des Kontos kennen, aber ohne den Schlüssel ist keines der gespeicherten Passwörter zugänglich. 
Durch diese 2-Faktor-Authentifizierung und die 100%ige Transparenz ist VergissMeinNicht die perfekte Wahl für Menschen, die Wert auf ihre Sicherheit und Privatsphäre legen. Überzeugen Sie sich selbst!


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
      - [Die Aktualisierung des Passwortes](#die-aktualisierung-des-passwortes)
      - [Die Aktualisierung der Emailadresse](#die-aktualisierung-der-emailadresse)
   - [Die Hilfsfunktionen](#die-hilfsfunktionen)
      - [Die Verschlüsselung](#die-verschlüsselung)
      - [Der Server](#der-server)
      - [Das Token](#das-token)
      - [Die Generierung eines starken Passwortes](#die-generierung-eines-starken-passwortes)
   - [Der Redux-Store](#der-redux-store)   
      - [Der Aktionserzeuger](#der-aktionserzeuger)
         - [Die Aktionstypen](#die-aktionstypen)
         - [Die Authentifizierung](#die-authentifizierung)
         - [Die Steuerung der Modalfenster](#die-steuerung-der-modalfenster)
         - [Die Verwaltung der Passwörter im Redux-Store](#die-verwaltung-der-passwörter-im-redux-store)
      - [Die Reduzierer](#die-reduzierer)
         - [Der Authentifizierungsreduzierer](#der-authentifizierungsreduzierer)
         - [Das Modalfenster](#das-modalfenster) 
         - [Der Passwörter-Reduzierer](#der-passwörter-reduzierer)
   - [Die Anwendung](#die-anwendung)
   - [Die Webseite - index.js](#die-webseite-index.js)
- [Das Backend](#das-backend)
  - [Die Grundfunktionen](#die-grundfunktionen)
      - [Das Abrufen der Daten](#das-abrufen-der-daten)
      - [Eine kurze Einführung in Firestore](#eine-kurze-einführung-in-firestore)
      - [Die Grundfunktionen für die Arbeit mit Firestore](#die-grundfunktionen-für-die-arbeit-mit-firestore)
  - [Router](#router)
      - [Der Authentifizierungsrouter](#der-authentifizierungsrouter)
      - [Der Passwortrouter](#der-passwortrouter)
  - [Die Vermittlung](#die-vermittlung)
      - [Die Überprüfung der Authentifizierung](#die-überprüfung-der-authentifizierung)
      - [Die Verbindung mit dem Firestore](#die-verbindung-mit-dem-firestore)
  - [Die Verwaltung](#die-verwaltung)
      - [Die Authentifizierungsverwaltung](#die-authentifizierungsverwaltung)
         - [Die Registrierung](#die-registrierung)
         - [Die Anmeldung](#die-anmeldung)
         - [Die Aktualisierung des Passwortes](#die-aktualisierung-des-passwortes)
         - [Den Account löschen](#den-account-löschen)
      - [Die Passwortverwaltung](#die-passwortverwaltung)
- [Autoren](#autoren)

# Das Stundenprotokoll

[Zum Stundenprotokoll](https://github.com/algerr/blogeintraege-2)

<details>
   <summary><h1>Die Planskizzen</h1></summary>
   
## Hauptseite

![224968022-85e0eebb-76bc-40d6-9e07-5ef4b873ab5b](https://user-images.githubusercontent.com/111282979/230732027-9d22d0b8-5d4e-4ea6-b4c6-df0d169a6287.png)

Bevor wir mit der Programmierung begonnen haben, sind wir erst einmal in die Planungsphase gegangen, da es gerade bei einer Web-Anwendung sinnvoll ist, seine Ideen erst einmal zu skizzieren und so bereits auch vom Aussehen her was, um dann im Nachhinein die Details zu ändern und gegebenenfalls etwas wegzulassen oder zu verbessern. Wie in der ersten Skizze zu sehen ist, sollen dies die groben Kriterien sein, nach denen unsere fertige Website geplant werden soll. Als erstes soll unsere Website natürlich eine Funktion zur Verwaltung des Profils bzw. der damit verbundenen Einstellungen haben. Unter dem Profil-Icon sollte der Nutzer also die Möglichkeit haben, sein Passwort und seine Emailadresse ändern zu können. Auch soll es hier die Möglichkeit geben, seinen Account zu löschen. Das Herzstück unserer Anwendung ist der Passwort Manager, mit der Eingabe des Masterpasswortes und der Passwörter-Tabelle. Neben der Festlegung des Masterpasswortes sollte man hier auch die Möglichkeit haben, seine gespeicherten Passwörter tabellarisch einsehen zu können. Die Passwörter im Klartext, können jedoch nur eingesehen werden, wenn das richtige Masterpasswort eingegeben wurde.
   
## Der Login

![225117491-64072da5-64b7-4b18-a028-b2b119b8ffa3](https://user-images.githubusercontent.com/111282979/230732042-01607555-12f6-4a85-a5e4-f175904d07e1.png)

In dieser Skizze haben wir unsere Idee für einen Login veranschaulicht. Wenn der Nutzer nicht angemeldet ist und die Webseite aufruft, soll er direkt auf den Login weitergeleitet werden, von wo er daraufhin auf die Haupseite gerät. Für den Login wird der Username und das Passwort benötigt.

## Die Firestore Datenbank 

![230046973-ca71bb0f-eb67-489f-a4b1-0f72b401cc57](https://user-images.githubusercontent.com/111282979/230732069-8796fdfb-8d31-4492-8a68-8150bbc377d7.png)

Die Skizze zeigt die Struktur unserer Firestore-Datenbank. Diese Datenbank organisiert und sichert die Daten unserer Benutzer. Die Firestore-Datenbank besteht aus zwei Collections (Sammlungen): Benutzer und Passwoerter, in denen sich die einzelnen Benutzer und Passwörter als Items (Dokumente) gespeichert werden. Unter jedem Passwort werden der zugehörige Benutzername, die Beschreibung des Passwortes und das mit dem Masterpasswort verschlüsselte Passwort gespeichert.

## Die Passwort Verwaltung 

![230047083-10ea2da5-707f-4c4e-9487-9576a169b1c4](https://user-images.githubusercontent.com/111282979/230732091-e6c21533-035c-4796-8750-9ca677977960.png)

Diese Skizze zeigt, wie neue Passwörter in unserer Anwendung hinzugefügt werden können. Wenn der Benutzer ein Masterpasswort eingegeben, hat er die Möglichkeit, ein Passwort mit einer Beschreibung hinzuzufügen, sodass er dieses schnell wiederfinden kann. Wenn der Nutzer sich kein Passwort ausdenken möchte, kann auch durch einen Klick auf `Starkes Passwort generieren` automatisch ein starkes Passwort generieren lassen.

## Die Kommunikation mit dem Firestore

![230047597-923a63fb-f1cf-4b16-a339-ce325aa7320e](https://user-images.githubusercontent.com/111282979/230732111-ed29c5df-181f-4379-ac33-035f9ccd58cc.png)
   
In der folgenden Skizze wird der genaue Ablauf unseres Programms in Bezug auf die Kommunikation mit der Firestore-Datenbank thematisiert. Wenn man sich anmelden möchte, gibt man seine Benutzerdaten, also seinen Benutzernamen und sein Passwort ein. Diese Informationen werden mit dem gespeicherten verschlüsselten Passwort aus der Firestore-Datenbank abgeglichen. Wenn der Abgleich erfolgreich war, wird der Nutzer zur Hauptseite weitergeleitet. Bei korrekter Eingabe des Masterpasswortes werden die anderen Passwörter aus der Firestore-Datenbank freigeschaltet, sodass man anschließend auf diese zugreifen kann. Auf diese Art kann unseren Nutzern die versprochene Sicherheit gewährleistet werden. 

## Vergleich zur 2-Faktor-Authentifizierung

Unser Konzept der 2-Faktor-Authentifizierung funktioniert über zwei Authentifizierungsschritte. Den ersten Schritt bildet die Anmeldung des Benutzers im Account-System. Ohne sich anzumelden, können überhaupt keine Passwörter abgerufen werden. Auf der Hauptseite werden die Passwörter jedoch auch nur angezeigt, wenn das korrekte Masterpasswort eingegeben ist. Solange auch nur ein Buchstabe vom Masterpasswort zu viel oder zu wenig eingegeben ist, sind die Passwörter verschüsselt und können, weder kopiert, noch angesehen werden.
So sind die Passwörter der Nutzer durch zwei Faktoren geschützt und ein Zugriff durch fremde ist, wenn der Nutzer sein Account- und Masterpasswort nicht online postet, unmöglich.

![230047871-1663e6fb-b793-4c72-8bbc-32c5ef511c72](https://user-images.githubusercontent.com/111282979/230732139-16ace400-d1b5-4deb-8e21-7822d9c5d8aa.png)


</details>







<details>
<summary><h1>Das Frontend</h1></summary>

   Im Frontend dreht sich alles um die ansprechende Darstellung und Benutzerinteraktion der Webseite. Mit React und Redux als Kerntechnologien ermöglichen wir unseren Nutzern eine intuitive und reibungslose Benutzererfahrung.

React ist ein leistungsfähiges JavaScript-Framework, das speziell für die Entwicklung von Benutzeroberflächen optimiert ist. Mit dessen deklarativen und komponentenbasierten Ansatz können wir einfach wiederverwendbare UI-Komponenten erstellen und komplexe Benutzeroberflächen effizient verwalten.

Redux ist ein bewährtes State-Management-Framework, das uns hilft, den Zustand unserer Anwendung zentral zu verwalten und die Datenflüsse in unserer Anwendung zu organisieren. Redux ermöglicht es uns, den Zustand unserer Anwendung konsistent zu aktualisieren und zu synchronisieren, was uns eine bessere Kontrolle über den Datenfluss und die Benutzerinteraktion gibt.

Im Frontend interagieren unsere UI-Komponenten mit dem Backend und sendet Anfragen an dieses. Das Backend reagiert auf verschiedene Anfragen vom Frontend. Es nimmt die eingegebenen Daten entgegen und gibt je nach Ergebnis der Datenbankoperationen entsprechende Antworten an das Frontend zurück. Nähere Informationen unter dem
   
   <details>
      <summary><h2>Die Komponenten</h2></summary>

   ## Die Anmeldung
      
   Als auf Accounts basierender Passwortmanager ist die Anmeldung eine essenzielle Komponente auf der Webseite. Da unsere Nutzer ihre vertraulichen Informationen bei      uns speichern, setzen wir alles daran, die Sicherheit der Nutzerdaten gewährleisten zu können und die erste Wahl unter den Passwortschützern zu sein.
   Bei der Anmeldung wird der Nutzer gebeten, seinen Benutzernamen und sein Passwort einzugeben. Bei einer falschen Eingabe des Passwortes oder eines nicht                existierenden Benutzernamens, wird dem Nutzer ein Hinweis angezeigt.
   Sollte der Nutzer jedoch noch keinen Account bei VergissMeinNicht besitzen, wird ihm die Möglichkeit geboten, über einen Klick auf die Schaltfläche `Registrieren`      zur Registrierung zu gelangen und sich dort einen Account anlegen zu können.
   Wenn der Nutzer sowohl seinen Benutzernamen, als auch sein Passwort richtig eingegeben hat, wird er auf die Startseite des Passwortmanagers weitergeleitet.
   
   ![image](https://user-images.githubusercontent.com/65679099/231805887-b9224815-2de3-4588-9dbd-0d6458fa6df3.png)
      
<details>
   <summary>Nähere Informationen</summary>
   
   ![componentDidMount](https://user-images.githubusercontent.com/65679099/230749640-bcc1e7dd-0ed2-4aac-bf2c-01a738bd1719.png)
      
   Durch die Authentifizierung über die Tokens, die für eine Stunde im lokalen Speicher des Browser des Nutzers gespeichert werden, muss man sich in dieser Stunde nicht jedes Mal neu anmelden, wenn die Webseite neu aufgerufen wird. Die Methode `componentDidMount()` wird einmalig aufgerufen, sobald die Komponente (Anmeldung) gerendert ist. Wenn im Redux-Store des Nutzers ein gültiges Token vorhanden ist, wird dieser direkt auf die Startseite weitergeleitet und die Anmeldung übersprungen.
     
   ![State](https://user-images.githubusercontent.com/65679099/230750828-137b8e79-b5d8-437b-9a51-e2728accf81f.png)

   Um verfolgen zu können, ob das Anmeldeformular abgeschickt wurde oder nicht, wird der Zustandsboolean 'eingabeAbgeschickt' definiert. 
   Der State (Zustand) kann an verschiedenen Stellen im Komponenten verändert werden und somit Bedingungen aufstellen.
      
   ![Card](https://user-images.githubusercontent.com/65679099/230750401-eeadda78-fe3b-4d9a-809a-59cdde8194fe.png)

   Das Anmeldeformular befindet sich in einem Card-Komponenten aus React-Bootstrap. Dadurch hebt sich die Anmeldung vom Hintergrund der Webseite ab. Das Formular erhält einen Event-Listener `onSubmit={this.onSubmit}`, wodurch beim Abschicken des Formulars unsere Funktion `onSubmit` aufgerufen wird, die die Anmeldung durchführt.
   Das Anmeldeformular ist in zwei Bereiche geteilt, die jeweils aus einem Label und einem Eingabefeld bestehen.
   Der erste Bereich umfasst die Eingabe des Benutzernamens. Über dem Eingabefeld, in dem sich, bis der Nutzer etwas einträgt, der Platzhalter "Benutzername" befindet, wird noch ein Label `Benutzername` festgelegt. So ist auch, wenn der Nutzer bereits angefangen hat zu schreiben, klar, dass in das Eingabefeld der Benutzername eingetragen werden muss. Um auf den Benutzernamen, den der Nutzer im Eingabefeld eingegeben hat, zuzugreifen, wird das `ref`-Objekt verwendet. 
   Das Eingabefeld wird somit auf eine Eigenschaft der Anmeldungs-Komponenten gesetzt, sodass einfach durch 'this.benutzername' auf das Eingabefeld zugegriffen werden kann.
   Im zweiten Bereich des Anmeldeformulars befindet sich die Eingabe des Passwortes. Das Passwort wird nicht wie der Benutzername im Klartext angezeigt, sondern durch den Passworttyp (`type="password"`) des Eingabefeldes unkenntlich gemacht. Auch hier steht über dem Eingabefeld das Label `Passwort` und die Eingabe wird ebenfalls mit dem `ref`-Objekt als Eigenschaft der Anmeldungs-Komponenten gespeichert. Über `this.passwort` kann auf dieses Eingabefeld zugegriffen werden. 
   Unter den Eingabefeldern befindet sich eine Schaltfläche, um zur Registrierung zu gelangen und sich zuerst einen Account zu erstellen. Die zweite Schaltfläche ist Abhängig vom Zustandsboolean `eingabeAbgeschickt`. Wenn dieser auf `true` steht, wird ein Lade-Spinner (sich drehender Kreis) angezeigt, ansonsten die Schaltfläche `Anmelden`. Wenn der Nutzer auf `Anmelden` klickt, wird das Formular gesendet und die Funktion `onSubmit()` aufgerufen.
      
   ![onSubmit](https://user-images.githubusercontent.com/65679099/230751118-564405b5-74b2-462b-9236-308f9aaf1dab.png)
      
   Die `onSubmit`-Funktion verhindert zuerst die browsereigene Standardaktion, die beim Abschicken eines Formulars geschieht. So wird einfach die selbstdefinierte Funktion ausgeführt. 
   Dann wird der Zustandsboolean `eingabeAbgeschickt` der Komponente destrukturiert, um diesen daraufhin als freien Boolean nutzen zu können.
   Wenn der Zustand von `eingabeAbgeschickt` noch nicht auf `true` steht, wird dieser nun gesetzt, sodass der Anmelde-Button durch das Ladesymbol ersetzt wird. Daraufhin wird überprüft, ob der Nutzer sowohl Benutzername, als auch Passwort eingegeben haben. Wenn das der Fall ist, wird eine Anmeldungsanfrage mit dem eingegebenen Benutzernamen und Passwort an den Server geschickt. Wenn der Server ein Authentifizierungstoken zurück gibt, wird dieses im Browser gespeichert, sodass der Nutzer sich in der nächsten Stunde nicht erneut anmelden muss, und er wird auf die Startseite weitergeleitet.
   Wenn der Server einen Fehler bei der Anmeldung zurückgibt, öffnet sich ein oberes Modalfenster und zeigt dem Nutzer diese Fehlermeldung an.
   Der Zustand von `eingabeAbgeschickt` wird wieder auf `false` gesetzt und der Nutzer kann erneut versuchen, sich anzumelden.
   Sollte der Nutzer es jedoch gar nicht erst geschafft haben, überhaupt beide Eingabefelder auszufüllen, wird er durch ein oberes Modalfenster daran erinnert und auch hier der Zustand von `eingabeAbgeschickt` auf `false` gesetzt.
    
   ```javascript
   const mapStateToProps = state => {
    return {
        // Hier wird das Token aus dem Authentifizierungsteils des Stores extrahiert und als Prop an die Komponente übergeben.
        token: state.authentifizierung.token
    }
}

// Die Funktion mapDispatchToProps wird verwendet, um die Aktionserzeuger mit den Props der Komponente zu verbinden.
const mapDispatchToProps = dispatch => {
    return {
        // Hier werden die Aktionserzeuger authentifizierungsTokenFestlegen, setzeInhaltFuerOberesModalfenster und oberesModalfensterAnzeigen an die Props authentifizierungsTokenFestlegen, setzeInhaltFuerOberesModalfenster und oberesModalfensterAnzeigen gebunden.
        authentifizierungsTokenFestlegen: (token) => dispatch(authentifizierungsTokenFestlegen(token)),
        setzeInhaltFuerOberesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerOberesModalfenster(titel, inhalt, buttons)),
        oberesModalfensterAnzeigen: () => dispatch(oberesModalfensterAnzeigen())
    }
}

// Die Komponente (Anmeldeformular) wird mithilfe der connect-Funktion mit dem Redux-Store verbunden und exportiert.
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Anmeldung))
   ```

   Aus dem Redux-Store wird der aktuelle Zustand des Tokens als `token` an die Eigenschaften der Komponente übergeben. Als Aktionserzeuger-Funktionen werden die Verwaltungsfunktionen für Modalfenster und die Funktion zum Festlegen des Tokens an die Eigenschaften der Komponente übergeben.
   Zum Schluss wird die Komponente noch mit dem Redux-Store und den Aktionserzeugern verbunden.
   So kann die Komponente darauf zugreifen und beispielsweise ein oberes Modalfenster mit der Fehlermeldung anzeigen oder das Token nach einer erfolgreichen Anmeldung festlegen.

</details>
      
   ## Die Registrierung
      
   Um den Passwortmanager überhaupt verwenden zu können, muss man sich zuerst einen Account erstellen. Um sich zu registrieren werden drei Eingaben des Nutzers benötigt. Eine gültige Emailadresse, einen Benutzernamen, der noch nicht in der Datenbank existiert und ein Passwort. Da es dem Nutzer selbst überlassen ist, wie sicher er sein Accountpasswort gestalten möchte, haben wir keine Anforderungen an dieses, wie beispielsweise eine Mindestlänge. Wenn die Registrierung erfolgreich ist, wird man zur Anmeldung weitergeleitet, wo man sich direkt mit seinem frisch registrierten Account anmelden kann.
   
   ![image](https://user-images.githubusercontent.com/65679099/231804199-4c5ac2c9-4de7-49d5-a0a0-b0a0e512452b.png)
   
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
   
   ```javascript
   const mapStateToProps = state => {
    return {
        // Hier wird das Token aus dem Redux-Store extrahiert und als Eigenschaft an die Komponente übergeben.
        token: state.authentifizierung.token
    }
}

// mapDispatchToProps gibt zwei Funktionen zurück, die als Eigenschaft für die Registrierungs-Komponente verfügbar gemacht werden:
// setzeInhaltFuerOberesModalfenster und oberesModalfensterAnzeigen sind Aktionserzeuger, die das obere Modalfenster verwalten.
const mapDispatchToProps = dispatch => {
    return {
        setzeInhaltFuerOberesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerOberesModalfenster(titel, inhalt, buttons)),
        oberesModalfensterAnzeigen: () => dispatch(oberesModalfensterAnzeigen())
    }
}

// Connect wird verwendet, um die Registrierungs-Komponente mit Redux zu verbinden.
// mapStateToProps und mapDispatchToProps werden als Argumente übergeben.
// withRouter wird verwendet, um der Komponente Zugriff auf das Router-Objekt zu geben.
// Das Ergebnis der Verbindung wird als exportiertes Default-Objekt zurückgegeben.
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Registrierung))
   ```
   
   Aus dem Redux-Store wird der aktuelle Zustand des Tokens als `token` an die Eigenschaften der Komponente übergeben. Als Aktionserzeuger-Funktionen werden die Verwaltungsfunktionen für Modalfenster an die Eigenschaften der Komponente übergeben.
   Zum Schluss wird die Komponente noch mit dem Redux-Store und den Aktionserzeugern verbunden.
   So kann die Komponente darauf zugreifen und beispielsweise ein oberes Modalfenster mit einer Fehlermeldung anzeigen.
   
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
   
   ```javascript
   const mapStateToProps = state => {
    return {
        token: state.authentifizierung.token,
    }
}

// mapDispatchToProps ist eine Funktion, die Aktionserzeuger in Props konvertiert.
// Hier werden die passwoerterFestlegen-, setzeInhaltFuerOberesModalfenster- und oberesModalfensterAnzeigen-Aktionserzeuger in Props konvertiert.
const mapDispatchToProps = dispatch => {
    return {
        passwoerterFestlegen: (data) => dispatch(passwoerterFestlegen(data)),
        setzeInhaltFuerOberesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerOberesModalfenster(titel, inhalt, buttons)),
        oberesModalfensterAnzeigen: () => dispatch(oberesModalfensterAnzeigen())
    }
}

// Die Startseite-Komponente wird mit dem Redux-Store verbunden, indem mapStateToProps und mapDispatchToProps übergeben werden. 
// So kann die Komponente auf den Redux-Store zugreifen.
export default connect(mapStateToProps, mapDispatchToProps)(Startseite)
   ```
   
   Aus dem Redux-Store wird der aktuelle Zustand des Tokens als `token` an die Eigenschaften der Komponente übergeben. Als Aktionserzeuger-Funktionen werden die Verwaltungsfunktionen für Modalfenster und die Funktion zum Festlegen der Passwörter an die Eigenschaften der Komponente übergeben.
   Zum Schluss wird die Komponente noch mit dem Redux-Store und den Aktionserzeugern verbunden.
   So kann die Komponente darauf zugreifen und beispielsweise ein oberes Modalfenster mit der Fehlermeldung anzeigen oder die abgerufenen Passwörter des Nutzers festlegen, sodass diese im Passwort Manager angezeigt werden können.
   
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
      
   ```javascript
   const mapStateToProps = state => {
    return {

        // Die "passwoerter"-Props wird aus dem "liste"-Teil des Redux-Stores extrahiert.
        // Diese beinhaltet alle gespeicherten Passwörter.
        passwoerter: state.passwoerter.liste
    }
}

// Die "connect"-Funktion von Redux wird verwendet, um die Komponente an den Redux-Store anzuschließen.
// Die "mapStateToProps"-Funktion wird an "connect" übergeben, um die entsprechenden Props zu extrahieren.
// Somit kann diese nun beispielsweise auf die gespeicherten Passwörter zugreifen.
export default connect(mapStateToProps)(PasswortManager)
   ```
      
   Aus dem Redux-Store wird der aktuelle Zustand der Liste der Passwörter des Nutzers als `passwoerter` an die Eigenschaften der Komponente übergeben. 
   Zum Schluss wird die Komponente noch mit dem Redux-Store verbunden.
   So kann die Komponente darauf zugreifen und die Passwörter des Nutzers aus der Liste in die Passwörter-Tabelle übertragen.
      
</details>
      
      
      
      
## Der Eingabebereich
      
   Dieser Bereich befindet sich auf der linken Seite des Passwort Managers. Hier wird das Masterpasswort eingegeben, welches die Passwörter schützt, indem es mit diesen zusammen verschlüsselt wird. Zudem kann über die Schaltfläche [`Neues Passwort hinzufügen`](#ein-neues-passwort-hinzufuegen) ein neues Passwort hinzugefügt werden. Unter dem Eingabefeld für das Masterpasswort befindet sich zudem eine kleine Erklärung, wie das Masterpasswort funktioniert.
    
   ![image](https://user-images.githubusercontent.com/65679099/231804498-66ff1b5a-00bd-4742-9537-03a64f941758.png)
 
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
   
   ```javascript
   const mapDispatchToProps = dispatch => {
    return {
        setzeInhaltFuerZentriertesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerZentriertesModalfenster(titel, inhalt, buttons)),
        zentriertesModalfensterAnzeigen: () => dispatch(zentriertesModalfensterAnzeigen())
    }
}

// Verbindung der Komponente mit dem Redux-Store, um auf die Aktionserzeuger zugreifen zu können.
export default connect(null, mapDispatchToProps)(EingabeBereich)
   ```
   
   Aus dem Redux-Store werden die Aktionserzeuger-Funktionen zur Verwaltung von Modalfenstern an die Eigenschaften der Komponente übergeben.
   Zum Schluss wird die Komponente noch mit den Aktionserzeugern verbunden.
   So kann die Komponente darauf zugreifen und beispielsweise ein zentriertes Modalfenster zum Hinzufügen eines neuen Passwortes anzeigen.
   
</details>
   
   
## Ein neues Passwort hinzufügen
      
   Eine der wichtigsten Funktionen eines Passwort Managers ist die Eingabe neuer Passwörter. Um diese dem Nutzer so schnell und einfach wie möglich zu machen, kann ein neues Passwort einfach über einen Klick auf die Schaltfläche `Neues Passwort hinzufügen` unter der Eingabe des Masterpasswortes hinzugefügt werden. Daraufhin öffnet sich ein zentriertes Modalfenster, in dem der Nutzer sein neues Passwort hinzufügen kann. 
      
   ![image](https://user-images.githubusercontent.com/65679099/230804937-e67dc8fa-a364-45be-ad1e-3853a4d35fcf.png)

<details>
<summary>Nähere Informationen</summary>
      
   Damit der Nutzer seine Passwörter einfach ordnen und auch wiederfinden kann, muss eine Beschreibung für das Passwort angegeben werden. Wenn beispielsweise das Instagram-Passwort gespeichert werden soll, ist eine Beschreibung wie `Instagram` sinnvoll, da es in der Passwörter-Tabelle auch eine Suchfunktion gibt und somit das Passwort in Sekunden wiedergefunden wird, wenn es nicht schon auf der ersten Seite der Tabelle zu sehen ist.
   Falls der Nutzer sich noch ein Konto auf beispielsweise Instagram erstellt, bieten wir die Möglichkeit, ein starkes Passwort automatisch generieren zu lassen.
   Durch einen Klick auf das kleine Schild-Symbol neben der Schaltfläche `Speichern`, erscheint automatisch ein starkes Passwort im Eingabefeld des Passwortes.
   Sollte der Nutzer damit nicht zufrieden sein, kann er beliebig oft das Symbol erneut anklicken, um weitere Vorschläge für starke Passwörter zu generieren.
   Wenn alles eingegeben ist, wird das Passwort einfach über die Schaltfläche `Speichern` gespeichert und in der Tabelle an oberster Stelle angezeigt.
      
      
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
      
   ```javascript
   const mapStateToProps = state => {
    return {
        // Das Authentifizierungs-Token wird aus dem Redux-Store extrahiert.
        token: state.authentifizierung.token
    }
}

// Hier wird die Funktion mapDispatchToProps definiert, die die folgenden Aktionserzeuger-Funktionen als Props 
// an die verbundene Komponente weiterleitet: zentriertesModalfensterAusblenden, setzeInhaltFuerOberesModalfenster, 
// oberesModalfensterAnzeigen und passwortHinzufuegen. Diese Funktionen sind Teil des Redux-Stores und werden später
// aufgerufen, wenn in der Komponente auf bestimmte Ereignisse reagiert werden soll.
const mapDispatchToProps = dispatch => {
    return {
        zentriertesModalfensterAusblenden: () => dispatch(zentriertesModalfensterAusblenden()),
        setzeInhaltFuerOberesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerOberesModalfenster(titel, inhalt, buttons)),
        oberesModalfensterAnzeigen: () => dispatch(oberesModalfensterAnzeigen()),
        passwortHinzufuegen: (data) => dispatch(passwortHinzufuegen(data))
    }
}

// Die "connect"-Funktion von Redux wird verwendet, um die Komponente an den Redux-Store anzuschließen.
// Die "mapStateToProps"-Funktion wird an "connect" übergeben, um die entsprechenden Props zu injizieren.
// "passwoerter" ist die Komponente, die an den Store angeschlossen werden soll.
// Somit kann diese nun beispielsweise auf die gespeicherten Passwörter zugreifen.
export default connect(mapStateToProps, mapDispatchToProps)(NeuesPasswortHinzufuegen)
   ```
   
   Aus dem Redux-Store wird der aktuelle Zustand des Tokens als `token` an die Eigenschaften der Komponente übergeben. Als Aktionserzeuger-Funktionen werden die Verwaltungsfunktionen für Modalfenster und die Funktion zum Hinzufügen eines Passwortes an die Eigenschaften der Komponente übergeben.
   Zum Schluss wird die Komponente noch mit dem Redux-Store und den Aktionserzeugern verbunden.
   So kann die Komponente darauf zugreifen und beispielsweise ein oberes Modalfenster mit der Fehlermeldung anzeigen oder ein neues Passwort in die Passwörter-Tabelle hinzufügen kann.

</details>
   
## Die Passwortanzeige
   
   Um die Passwörter zu schützen, wird sichergestellt, dass sie dem Nutzer nur angezeigt werden, wenn das Masterpasswort vollständig eingegeben ist. Wenn dies nicht der Fall ist, wird ein Passworttext "●●●●●●●●●●●●●●●●●●●●●●" angezeigt, der das Passwort maskiert. Neben dem Passwort gibt es drei Schaltflächen, um das Passwort zu kopieren, anzuzeigen und zu löschen. Solange das Passwort nicht durch die Eingabe des Masterpasswortes entschlüsselt ist, kann das Passwort nicht kopiert und nicht angezeigt werden. Zudem ist der Hintergrund des Passworttextes rot und wird erst bei korrekter Eingabe des Masterpasswortes grün.
   
   ![image](https://user-images.githubusercontent.com/65679099/231805387-8f927fe1-8396-4028-9480-54238bd55a92.png)
   Verschlüsselte Passwörter
    
   ![image](https://user-images.githubusercontent.com/65679099/231805555-6ce8c65e-cc0b-4b5f-8942-1b527586b46b.png)
   Entschlüsselte Passwörter
    
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
   ```
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
   
   ```javascript
   const mapStateToProps = state => {
    return {
        token: state.authentifizierung.token
    }
}

// Hier wird die Funktion mapDispatchToProps definiert, die die folgenden Funktionen als Props 
// an das verbundene Komponenten-Element weiterleitet: passwortLoeschen, setzeInhaltFuerOberesModalfenster, 
// oberesModalfensterAnzeigen und oberesModalfensterAusblenden. Diese Funktionen sind Teil des Redux-Stores und werden später
// aufgerufen, wenn in der Komponente auf bestimmte Ereignisse reagiert werden soll.
const mapDispatchToProps = dispatch => {
    return {
        passwortLoeschen: (passwort) => dispatch(passwortLoeschen(passwort)),
        setzeInhaltFuerOberesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerOberesModalfenster(titel, inhalt, buttons)),
        oberesModalfensterAnzeigen: () => dispatch(oberesModalfensterAnzeigen()),
        oberesModalfensterAusblenden: () => dispatch(oberesModalfensterAusblenden()),
    }
}

// Hier wird das Komponenten-Element "PasswortAnzeige" durch die Funktion "connect" mit dem globalen 
// Redux-Store verbunden. Durch die Verwendung der beiden vorher definierten Funktionen "mapStateToProps" 
// und "mapDispatchToProps" werden die entsprechenden Daten und Funktionen an das Komponenten-Element 
// weitergeleitet, damit es auf die Daten und Ereignisse reagieren kann.
export default connect(mapStateToProps, mapDispatchToProps)(PasswortAnzeige)
   ```
   
   Aus dem Redux-Store wird der aktuelle Zustand des Tokens als `token` an die Eigenschaften der Komponente übergeben. Als Aktionserzeuger-Funktionen werden die Verwaltungsfunktionen für Modalfenster und die Funktion zum Löschen eines Passwortes an die Eigenschaften der Komponente übergeben.
   Zum Schluss wird die Komponente noch mit dem Redux-Store und den Aktionserzeugern verbunden.
   So kann die Komponente darauf zugreifen und beispielsweise ein oberes Modalfenster mit der Fehlermeldung anzeigen oder ein Passwort aus der Passwörter-Tabelle entfernt werden.
      
</details>      
   
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
   
   ```javascript
   const mapStateToProps = state => {
    return {
        token: state.authentifizierung.token
    }
}

// Um auf den Redux-Store zugreifen zu können wird die Komponente mit diesem verbunden.
export default connect(mapStateToProps)(BenutzerAuthentifizieren)
   ```
   
   Aus dem Redux-Store wird der aktuelle Zustand des Tokens als `token` an die Eigenschaften der Komponente übergeben.
   Zum Schluss wird die Komponente noch mit dem Redux-Store verbunden.
   So kann die Komponente darauf zugreifen und die Authentifizierung des Tokens durchführen.

</details>   
   
   
   ## Die Modalfenster
   
   Um dem Nutzer die wichtigsten aktuellen Informationen und Meldungen anzuzeigen, nutzen wir Dialogfenster, sogenannte `Modalfenster`. Diese haben wir in zwei Arten unterschieden. Es gibt die zentrierten Modalfenster, die beispielsweise beim Hinzufügen eines neuen Passwortes angezeigt werden und die oberen Modalfenster, worüber beispielsweise Fehlermeldungen angezeigt werden. Als Basis werden die Modale von React-Bootstrap verwendet, worüber dann die Modalfenster erstellt werden.

<details>
<summary>Nähere Informationen</summary>

   
   Das zentrierte Modalfenster ist für die Eingabe des Nutzers gedacht. Es besteht aus einem Titel, dem Inhalt, den Schaltflächen im Footer und dem Zustand, ob es gezeigt wird oder nicht. Darüber lässt sich das Öffnen und Schließen des Modalfensters regeln. 
   
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
   <Modal show={gezeigt} onHide={this.fensterSchliessen}>
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
   In der Tabelle werden die gespeicherten Passwörter des Nutzers zusammen mit den zugehörigen Beschreibungen aufgelistet, sodass diese gut zuzuordnen sind. 
   Standardmäßig sind alle Passwörter in der Tabelle verschlüsselt. So versichern wir den zweiten Authentifizierungsschritt, neben der Anmeldung, um die Passwörter des Nutzers zu schützen. Sobald das Masterpasswort eingegeben ist, werden die Passwörter entschlüsselt. Sie können kopiert, angesehen und gelöscht werden.
   Die Tabelle bietet beliebig viele Seiten für Nutzer, die mehr Passwörter speichern, als auf eine Seite passen. Zudem kann auch über die Suchleiste oben rechts über der Tabelle nach einem Passwort spezifisch gesucht werden.

<details>
<summary>Nähere Informationen</summary>
      
   Die Tabelle wird mithilfe der jQuery-Erweiterung [`DataTables`](https://datatables.net/) erstellt. Durch die `componentDidMount`-Funktion wird, sobald die Komponente gerendert wird, die Tabelle initialisiert. 
      
   ```javascript
   componentDidMount = () => {
        // wird die Tabelle initialisiert.
        const { tabellenId } = this.props
        // Wenn eine Id für die Tabelle übergeben wird, wird der DataTable mit dieser Id erzeugt.
        if (tabellenId) {
            this.table = $('#' + tabellenId).DataTable()
            $('.dataTables_length').addClass('bs-select')
        // Wenn keine TabellenId festgelegt wird, wird eine Tabelle mit dem Standardwert "dtBasicExample" erzeugt.
        } else {
            this.table = $('#dtBasicExample').DataTable()
            $('.dataTables_length').addClass('bs-select')
        }
   }
   ```
   
   Wenn eine `tabellenId` übergeben wird, wird das `DataTables-Plugin` auf dem DOM-Element mit dieser `tabellenId` initialisiert. Dazu wird mit Hilfe von jQuery das DOM-Element mit der entsprechenden Id ausgewählt `("$('#' + tabellenId)")` und die `DataTable()`-Methode darauf aufgerufen, um die Tabelle mit dieser Id durch das `DataTables-Plugin` zu initialisieren.
      
   ```javascript
   componentWillUpdate = () => {
        // Um eine Aktualisierung zu ermöglichen, wird die alte Tabelle zerstört.
        this.table.destroy()
    }
   ```
      
   Bevor die Komponente aktualisiert wird, beispielsweise, wenn ein neues Passwort hinzugefügt wird, wird die alte Tabelle zuerst zerstört, um die Aktualisierung zu ermöglichen.
      
   ```javascript
   componentDidUpdate = () => {
        // Eine neue, aktualisierte Tabelle wird initialisiert.
        const { tabellenId } = this.props
        // Wenn eine Id für die Tabelle übergeben wird, wird der DataTable mit dieser Id erzeugt.
        if (tabellenId) {
            this.table = $('#' + tabellenId).DataTable()
            $('.dataTables_length').addClass('bs-select')
        // Wenn keine TabellenId festgelegt wird, wird eine Tabelle mit dem Standardwert "dtBasicExample" erzeugt.
        } else {
            this.table = $('#dtBasicExample').DataTable()
            $('.dataTables_length').addClass('bs-select')
        }
    }
   ```
    
   Nachdem die Komponente aktualisiert wurde, wird eine neue, aktualisierte Tabelle initialisiert.
   
   ```javascript
   componentWillUnmount = () => {
        // Hier wird die Tabelle zerstört.
        this.table.destroy()
   }
   ```
      
   Wenn die Komponente aus dem DOM entfernt wurde, wird die Tabelle zerstört.
      
   ```javascript
   render() {
        // Wenn die Komponente initialisiert wird, müssen Überschriften, Inhalt und TabellenId übergeben werden.
        const { ueberschriften, inhalt, tabellenId } = this.props

        // Wenn keine Überschriften oder kein Inhalt übergeben wurden, wird eine Fehlermeldung gerendert
        if (!ueberschriften || !inhalt) {
            return (
                // Entsteht eine Fehlermeldung.
                <h3>Tabellenfehler: Keine Überschriften oder Inhalt gefunden.</h3>
            )
        }

        return (
            // Die Tabelle wird mit dem HTML-Tag <table> erstellt.
            // Dabei wird die tabellenId, falls angegeben, als id übergeben.
            <table id={tabellenId || "dtBasicExample"} className="table table-striped table-bordered">
                <thead>
                    {/* In der Kopfzeile der Tabelle wird jede Spalte als separate <th>-Zelle erstellt.*/}
                    <tr>
                        {/* Der Inhalt jeder Zelle wird durch das "ueberschriften"-Prop definiert. (Bspw. werden in Passwoerter.js die Überschriften: Beschreibung und Passwort) als prop gesetzt. */}
                        {
                            ueberschriften.map(ue => <th className="th-sm">{ue}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                
                    {   // Die "tbody"-Komponente ist für den Inhalt der Tabelle verantwortlich.
                        
                        // Für jede Tabellenzeile im 'inhalt'-Array,
                        inhalt.map(tr => {
                            // wenn eine Tabellenzeile vorhanden ist,
                            if (tr) {
                                // wird eine Tabellenzeile gerendert, die die Tabellenzellen in 'td'-Elemente aufteilt.
                                return (
                                    <tr>
                                        {tr.map(td => <td>{td}</td>)}
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
        )
   ```
   
   Gerendert wird eine HTML-Tabelle mit den Überschriften und dem Inhalt, die als Eigenschaften an die Komponente übergeben wurden. Wenn keine Überschriften oder kein Inhalt übergeben wurden, wird eine Fehlermeldung gerendert. Die Tabellenzeilen werden aus dem `inhalt`-Array generiert, wobei für jede Zeile eine separate `tr`-Komponente erstellt wird und die Zellen mit den entsprechenden Daten aus dem `tr`-Array als `td`-Tags gerendert werden. 
   
<details>
<summary>Erklärung zu `tr` und `td`</summary
      
   `tr` und `td` werden als `Table Row` (Tabellenzeile) und `Table Data` (Tabellendaten) verwendet. Sie beziehen sich auf HTML-Elemente, die verwendet werden, um Tabellen in HTML-Dokumenten zu erstellen. Das "tr"-Element wird verwendet, um eine Tabellenzeile zu definieren und zu erstellen. Eine Tabellenzeile besteht normalerweise aus mehreren "td"-Elementen, die die einzelnen Zellen in der Zeile darstellen. Das "td"-Element hingegen wird verwendet, um eine Tabellendatenzelle innerhalb einer Tabellenzeile zu definieren. Es enthält normalerweise den eigentlichen Inhalt, der in der Zelle angezeigt werden soll, wie Text, Bilder oder andere HTML-Elemente. "td"-Elemente werden normalerweise innerhalb von "tr"-Elementen verwendet, um die Zellen in einer Tabellenzeile zu erstellen.
   Die gemeinsame Darstellung der beiden Elemente ermöglicht eine Tabelle mit mehreren Zeilen und Spalten. Sie können mit CSS gestaltet werden und mit JavaScript manipuliert werden, um dynamische, interaktive Tabellen zu erstellen.   

</details>
      
   Die `Tabelle`-Komponente wird schließlich als Standardexport exportiert, um beispielsweise beim Passwort Manager importiert und dort zur Darstellung der Passwörter verwendet zu werden.
</details>
   
<details>
<summary><h2>Die Accounteinstellungen</h2></summary>   
   
Unsere Anwendung besteht nicht nur aus dem Passwort Manager, auch wenn darauf der Hauptfokus gerichtet ist. Der Nutzer kann in der Seitenleiste auch in die Accounteinstellungen gehen und dort sowohl seinen Benutzernamen und die aktuelle Emailadresse ansehen, als auch Änderungen an Emailadresse und Passwort vornehmen. Wenn der Nutzer möchte, kann er auch seinen Account löschen.

<details>
<summary>Nähere Informationen</summary>   
      
```javascript
      render() {
        // Die Variable "token" wird aus den Props des Komponenten gelesen.
        const { token } = this.props
        // Das entschlüsselte Token wird aus dem "token" Wert erstellt.
        const entschluesseltesToken = tokenEntschluesseln(token)
        // Der Body der Komponente wird als HTML-Code zurückgegeben.
        return (
            <Container style={{ maxWidth: "100%" }}>
                <Row>
                    {/* Die Überschrift der Accounteinstellungen wird angezeigt. */}
                    <h1 className="mt-4">Accounteinstellungen</h1>
                </Row>
                <Row>
                    {/* Benutzername und Emailadresse werden auf der linken Seite angezeigt. */}
                    <Col>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Benutzername: <strong>{entschluesseltesToken.benutzername || "Kein Benutzername gefunden"}</strong></ListGroup.Item>
                            <ListGroup.Item>Email: <strong>{entschluesseltesToken.email || "Keine Emailadresse angegeben"}</strong></ListGroup.Item>
                        </ListGroup>
                    </Col>

                    {/* Die Aktionen, die der Benutzer ausführen kann, werden auf der rechten Seite angezeigt */}
                    <Col>
                        <ListGroup>
                            {/* Der Button zum Aktualisieren der Email-Adresse wird angezeigt. */}
                            <ListGroup.Item action onClick={this.onEmailAktualisieren}>Email aktualisieren</ListGroup.Item>
                            {/* Der Button zum Ändern des Passworts wird angezeigt. */}
                            <ListGroup.Item action onClick={this.onPasswortAendern} >Passwort ändern</ListGroup.Item>
                            {/* Der Button zum Löschen des Accounts wird in rot angezeigt, damit der Nutzer die Ernsthaftigkeit der Lage begreift. */}
                            <ListGroup.Item action variant="danger" onClick={this.onAccountloeschen} >Account löschen</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
```
   
   Die Accounteinstellungen sind in verschiedene Zeilen (Rows) und Spalten (Columns) eingeteilt.
   In der ersten Zeile wird der Titel `Accounteinstellungen` gerendert.
   Die zweite Zeile besteht aus zwei Spalten. Auf der linken Seite kann der Nutzer seinen Benutzernamen und seine Emailadresse ansehen.
      
   ![image](https://user-images.githubusercontent.com/65679099/231766649-62e82f3d-c734-44ce-a531-60a1ebf3881b.png)
      
   In einer [`List Group`](https://getbootstrap.com/docs/5.0/components/list-group/) werden die beiden Informationen untereinander angezeigt.
   Die Variante [`Flush`](https://getbootstrap.com/docs/5.0/components/list-group/#flush) sorgt dafür, dass alle Ränder, bis auf den zwischen den beiden, entfernt werden. Um den Benutzernamen und die Emailadresse des Nutzers anzeigen zu können, wird das Token entschlüsselt. Wenn kein Benutzername oder keine Emailadresse aus Token entschlüsselt werden können, wird ein alternativer Text angezeigt.
      
   Auf der rechten Seite werden, ebenfalls in einer `List Group` die drei Aktionen angezeigt, die der Benutzer bezüglich seines Accounts ausführen.
   Es können die Emailadresse und das Passwort des Accounts aktualisiert oder der Account gelöscht werden.
   
   ![image](https://user-images.githubusercontent.com/65679099/231766694-0a979aa0-f500-4b26-8a99-9b4ed0f94cfd.png)

</details>
      
## Die Aktualisierung des Passwortes
      
Um sein Passwort zu aktualisieren, müssen sowohl das neue als auch das alte Passwort eingegeben werden. Dadurch, dass der Nutzer sein altes Passwort eingeben muss, können Dritte, die sich unerlaubten Zugang zu einem Account gewährt haben, nicht einfach das Passwort ändern, ohne das alte zu kennen. 
Es ist eine weitere Sicherheitsfunktion, um unsere Nutzer vor Dritten zu schützen. Wenn das alte und neue Passwort eingegeben sind, kann das Ganze über die Schaltfläche `Speichern` bestätigt werden.
 
<details>
<summary>Nähere Informationen</summary>     
      
Wie bei allen Eingabeformularen, wird auch hier ein Zustandsboolean `ladesymbol` genutzt, um bestimmen zu können, ob noch die Eingabe erfolgt, oder bereits gespeichert wird. 
   
   ```javascript
   render() {
        // State des Ladesymbols aus dem Komponentenstate extrahieren.
        const { ladesymbol } = this.state
        // Der Inhalt der Komponente wird als HTML-Code zurückgegeben.
        return (
            <Form>
                {/* Eingabefeld für das alte Passwort */}
                <Form.Group controlId="altesPasswort">
                    <Form.Label>Altes Passwort</Form.Label>
                    {/* Eingabefeld für das alte Passwort mit einem Referenz-Callback zum Speichern des Eingabefeld-Elements im Komponentenstate */}
                    <Form.Control type="password" placeholder="Altes Passwort" ref={elem => this.altesPasswort = elem} />
                </Form.Group>
                {/* Eingabefeld für das neue Passwort */}
                <Form.Group controlId="neuesPasswort">
                    <Form.Label>Neues Passwort</Form.Label>
                    {/* Eingabefeld für das neue Passwort mit einem Referenz-Callback zum Speichern des Eingabefeld-Elements im Komponentenstate */}
                    <Form.Control type="password" placeholder="Neues Passwort" ref={elem => this.neuesPasswort = elem} />
                </Form.Group>
                {/* Je nach State des Ladesymbols, wird entweder ein Ladesymbol (true) oder der Speichern-Button (false) gerendert. */}
                {/* Dies nennt sich bedingtes Rendering. */}
                {
                    ladesymbol ? <Spinner animation="border" /> : <Button variant="primary" type="submit" onClick={this.onSpeichern}>Speichern</Button>
                }
            </Form>
        )
    }
   ```
   
   Das Formular besteht aus zwei Formulargruppen. In der ersten Gruppe befindet sich das Eingabefeld für das alte Passwort, zusammen mit einem Label `Altes Passwort` über dem Eingabefeld. Die zweite Formulargruppe ist identisch zur ersten, nur dient diese zur Eingabe des neuen Passwortes. Je nach Zustand des Zustandsbooleans, wird bei `true` ein Lade-Spinner und bei `false` die Schaltfläche zum Speichern des neuen Passwortes gerendert.
   Die Eingabefelder werden durch ein `ref`-Objekt zu Eigenschaften der Komponente.
                   
   ```javascript
   onSpeichern = async (e) => {
        // wird die browsereigene, standardmäßige Sendung des Formulars verhindert.
        e.preventDefault()
        const { ladesymbol } = this.state
        if (ladesymbol) return
        // Der Ladesymbol-State wird auf "true" gesetzt, da der Nutzer, den Button angeklickt hat.
        this.setState({ ladesymbol: true })
        const { token, setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen, authentifizierungsTokenFestlegen, zentriertesModalfensterAusblenden } = this.props
        const PasswortAenderung = await passwortAendern(token, this.altesPasswort.value, this.neuesPasswort.value)
        if (PasswortAenderung.error) {
            setzeInhaltFuerOberesModalfenster("Fehler", PasswortAenderung.error,
                [{ name: "Schließen", variant: "primary" }])
            oberesModalfensterAnzeigen()
        } else if (PasswortAenderung.status) {
            setzeInhaltFuerOberesModalfenster("Erfolgreiche Passwortänderung", "Das Passwort wurde erfolgreich geändert!",
                [{ name: "Schließen", variant: "primary" }])
            oberesModalfensterAnzeigen()
            // Nach einer Passwortänderung soll der Nutzer sich wieder neu anmelden.
            // Dadurch merkt er sich gleich das neue Passwort besser.
            authentifizierungsTokenFestlegen(null)
        }
        // Daraufhin verschwindet das modale Fenster und der State des Ladesymbols wird wieder standardmäßig auf "false"
        // gesetzt, um nicht ausversehen Änderungen in der Datenbank vorzunehmen, auch wenn das durch die zusätzlichen Sicherheits-
        // vorkehrungen sehr unwahrscheinlich ist.
        zentriertesModalfensterAusblenden()
        this.setState({ ladesymbol: false })
   }
   ```
   
   Wenn der Nutzer nach der Eingabe des alten und neuen Passwortes auf die Schaltfläche `Speichern` klickt, wird zuerst die browsereigene, standardmäßige Sendung des Formulars verhindert. Daraufhin wird der Zustandsboolean `ladesymbol`, wenn er noch nicht auf `true` gesetzt ist, auf `true` gesetzt, da die Speicherung des Passwortes nun lädt.
   Das Token und die Aktionserzeuger-Funktionen für die Verwaltung von Modalfenstern werden aus den Eigenschaften der Komponente extrahiert, um frei genutzt werden zu können. Daraufhin wird eine Anfrage zur Aktualisierung des Passwortes mit dem Token, dem alten und dem neuen Passwort an den Server geschickt.
   Wenn ein Fehler zurückgegeben wird, wird dieser in einem oberen Modalfenster angezeigt.
   Wenn der Server jedoch den Status 1 zurückgibt, gibt es eine Erfolgsmeldung im oberen Modalfenster. 
   Damit der Nutzer sich das neue Passwort gleich besser einprägen kann, wird das Token entfernt, sodass er sich neu anmelden muss.
   Das Fenster zur Aktualisierung des Passwortes wird ausgeblendet und der Zustandsboolean `ladesymbol` wird wieder zurück auf `false` gesetzt.
   
   ```javascript
   // mapStateToProps verbindet den Redux-Store des Browsers mit den Props dieses Komponenten.
// Das Objekt, welches zurückgegeben wird, hat die Form: {Prop-Name: Store-State}
// Da es sich in diesem
const mapStateToProps = state => {
    return {
        token: state.authentifizierung.token
    }
}

// mapDispatchToProps verbindet das Redux-Store mit den Aktionserzeugern des Stores.
// Das Objekt, welches zurückgegeben wird, hat die Form: {Aktionserzeuger: dispatch(Aktion)}
const mapDispatchToProps = dispatch => {
    return {
        zentriertesModalfensterAusblenden: () => dispatch(zentriertesModalfensterAusblenden()),
        setzeInhaltFuerOberesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerOberesModalfenster(titel, inhalt, buttons)),
        oberesModalfensterAnzeigen: () => dispatch(oberesModalfensterAnzeigen()),
        authentifizierungsTokenFestlegen: (token) => dispatch(authentifizierungsTokenFestlegen(token))
    }
}


// Der HOK (Higher-Order Komponent) 'connect' verbindet den Redux-Store mit dem Komponenten 'PasswortAendern'.
// Der Store-State und die Aktionserzeuger werden als Props an den Komponenten weitergegeben.
export default connect(mapStateToProps, mapDispatchToProps)(PasswortAendern)             
   ```
   
   Aus dem Redux-Store wird der aktuelle Zustand des Tokens als `token` an die Eigenschaften der Komponente übergeben. Als Aktionserzeuger-Funktionen werden die Verwaltungsfunktionen für Modalfenster und die Funktion zum Festlegen des Tokens an die Eigenschaften der Komponente übergeben.
   Zum Schluss wird die Komponente noch mit dem Redux-Store und den Aktionserzeugern verbunden.
   So kann die Komponente darauf zugreifen und beispielsweise ein oberes Modalfenster mit der Fehlermeldung anzeigen oder das Token nach einer erfolgreichen Aktualisierung des Passwortes entfernen.

</details>                   
      
## Die Aktualisierung der Emailadresse 
Um seine Emailadresse zu ändern, muss der Nutzer lediglich eine neue Emailadresse eingeben und seine Eingabe über die Schaltfläche `Speichern` bestätigen. 
Eine leere Eingabe ist auch möglich, da wir die Nutzer nur bei der Registrierung dazu verpflichten, eine Emailadresse einzugeben. Danach gibt jeder Nutzer freiwillig seine Emailadresse an.

<details>
<summary>Nähere Informationen</summary>
      
Hier wird ebenfalls der Zustandsboolean `ladesymbol` verwendet, der auch schon bei der Aktualisierung des Passwortes Verwendung fand.
   
   ```javascript
   componentDidMount = () => {
        // Die Variable "bisherigeEmail" wird als Prop an die Komponente übergeben
        const { bisherigeEmail } = this.props
        // und legt den Text im Eingabefeld fest.
        // Die bisherige Emailadresse steht als Text im Eingabefeld.
        this.email.value = bisherigeEmail
   }
   ```
   
Da bei der Aktualisierung der Emailadresse im Eingabefeld bereits die aktuelle Emailadresse steht, wird diese `bisherigeEmail`, sobald die Komponente in den DOM eingefügt wurde, aus den Eigenschaften der Komponente entnommen und die Eingabe des Eingabefeldes auf die `bisherigeEmail` gesetzt.
   
   ```javascript
   render() {
        // Die ladesymbol-Variable wird aus dem aktuellen Zustand ausgelesen.
        const { ladesymbol } = this.state   
        // Der Inhalt der Komponente wird als HTML-Code zurückgegeben.     
        return (
            <Form>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    {/* Das Eingabefeld für die E-Mail-Adresse wird definiert und mit der Referenz this.email verknüpft */}
                    <Form.Control type="text" placeholder="Email" ref={elem => this.email = elem} />
                    <Form.Text className="text-muted">
                        Eine leere Eingabe wird auch genehmigt.
                    </Form.Text>
                </Form.Group>
                {/* Entweder wird ein Ladesymbol oder ein Button zum Speichern der Änderungen angezeigt, je nachdem ob das ladesymbol true oder false ist */}
                {
                    ladesymbol ? <Spinner animation="border" /> : <Button variant="primary" type="submit" onClick={this.onSpeichern}>Speichern</Button>
                }
            </Form>
        )
   }
   ```
   
   Das Eingabeformular für die Aktualisierung der Emailadresse besteht aus einer Formulargruppe, in der sich das Eingabefeld für die Emailadresse und das Label `Email` befinden.
   Unter dem Eingabefeld befindet sich ein kleiner ausgegrauter Text, der besagt, dass eine leere Eingabe ebenfalls genehmigt wird.
   Je nach Zustand des Zustandsbooleans, wird bei `true` ein Lade-Spinner und bei `false` die Schaltfläche zum Speichern der neuen Emailadresse gerendert.
   Das Eingabefeld wird durch ein `ref`-Objekt zur Eigenschaft der Komponente. 
               
   ```javascript
   onSpeichern = async (e) => {
        // wird die browsereigene, standardmäßige Sendung des Formulars verhindert.
        e.preventDefault()
        const { ladesymbol } = this.state
        // Wenn "ladesymbol" auf "true" gesetzt ist, wird die Funktion beendet.
        if (ladesymbol) return
        // Der State des Ladesymbols wird auf "true" gesetzt, da die Emailadresse nun aktualisiert wird.
        this.setState({ ladesymbol: true })
        // Die Props und werden extrahiert und als einzelne Variablen gespeichert, damit sie direkt verwendet werden können.
        // Statt "this.props.token" kann nun einfach "token" geschrieben werden
        const { token, setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen, authentifizierungsTokenFestlegen, zentriertesModalfensterAusblenden } = this.props
        // Token und aktualisierte Emailadresse werden an den Server geschickt.
        const EmailAktualisierung = await emailAktualisieren(token, this.email.value)
        // Wenn ein Fehler auftritt,
        if (EmailAktualisierung.error) {
            // wird dieser dem Nutzer in einem modalen Fenster gezeigt.
            setzeInhaltFuerOberesModalfenster("Fehler", EmailAktualisierung.error, [{ name: "Schließen", variant: "primary" }])
            oberesModalfensterAnzeigen()
        // Wenn die E-Mail-Adresse erfolgreich aktualisiert wurde, wird das neue Token gespeichert.
        } else if (EmailAktualisierung.token) {
            authentifizierungsTokenFestlegen(EmailAktualisierung.token)
        }
        // Zum Schluss wird das modale Fenster geschlossen und der State vom "ladesymbol" auf "false" gesetzt.
        zentriertesModalfensterAusblenden()
        this.setState({ ladesymbol: false })
    }
   ```
   
   Wenn der Nutzer, nachdem er eine Emailadresse seiner Wahl eingegeben hat, auf die Schaltfläche zur Speicherung der neuen Emailadresse klickt, wird zuerst die browsereigene, standardmäßige Sendung des Formulars verhindert. Daraufhin wird der Zustandsboolean `ladesymbol`, wenn er noch nicht auf `true` gesetzt ist, auf `true` gesetzt, da die Speicherung der Emailadresse nun lädt.
   Das Token und die Aktionserzeuger-Funktionen für die Verwaltung von Modalfenstern werden aus den Eigenschaften der Komponente extrahiert, um frei genutzt werden zu können. Daraufhin wird eine Anfrage zur Aktualisierung der Emailadresse mit dem Token und der eingegebenen neuen Emailadresse an den Server geschickt.
   Wenn ein Fehler zurückgegeben wird, wird dieser in einem oberen Modalfenster angezeigt.
   Wenn der Server jedoch ein neues Token zurückgibt, wird dieses im Redux-Store gespeichert und das Modalfenster zur Aktualisierung der Emailadresse ausgeblendet.
   Da sich das Token auch aus der Emailadresse zusammensetzt, ist diese Aktualisierung des Tokens nötig.
   Der Zustandsboolean `ladesymbol` wird wieder zurück auf `false` gesetzt.
   
   ```javascript
   const mapStateToProps = state => {
    return {
        token: state.authentifizierung.token
    }
}

// Das mapDispatchToProps-Objekt enthält Funktionen, mit denen das Modul Aktionen auslösen kann.
const mapDispatchToProps = dispatch => {
    return {
        // Dadurch können die Aktionen: zentriertesModalfensterAusblenden, setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen, authentifizierungsTokenFestlegen ausgeführt werden.
        zentriertesModalfensterAusblenden: () => dispatch(zentriertesModalfensterAusblenden()),
        setzeInhaltFuerOberesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerOberesModalfenster(titel, inhalt, buttons)),
        oberesModalfensterAnzeigen: () => dispatch(oberesModalfensterAnzeigen()),
        authentifizierungsTokenFestlegen: (token) => dispatch(authentifizierungsTokenFestlegen(token))
    }
}

// Der HOK (Higher-Order Komponent) 'connect' verbindet den Redux-Store mit dem Komponenten.
// Dieser kann auf den Redux-Store zugreifen und seine Daten ändern, indem er die entsprechenden Aktionen auslöst.
export default connect(mapStateToProps, mapDispatchToProps)(EmailAktualisieren)
   ```
   
   Aus dem Redux-Store wird der aktuelle Zustand des Tokens als `token` an die Eigenschaften der Komponente übergeben. Als Aktionserzeuger-Funktionen werden die Verwaltungsfunktionen für Modalfenster und die Funktion zum Festlegen des Tokens an die Eigenschaften der Komponente übergeben.
   Zum Schluss wird die Komponente noch mit dem Redux-Store und den Aktionserzeugern verbunden.
   So kann die Komponente darauf zugreifen und beispielsweise ein oberes Modalfenster mit der Fehlermeldung anzeigen oder das Token nach einer erfolgreichen Aktualisierung der Emailadresse aktualisieren.

</details>

               
   Da diese beiden Komponenten nun definiert und exportiert sind, kann in den Accounteinstellungen darauf zugegriffen werden.
   Bei einem Klick auf die Schaltfläche zur Aktualisierung der Emailadresse wird die Funktion `onEmailAktualisieren` aufgerufen.
      
   ```javascript
   onEmailAktualisieren = () => {
        const { setzeInhaltFuerZentriertesModalfenster, zentriertesModalfensterAnzeigen, token } = this.props
        const entschluesseltesToken = tokenEntschluesseln(token)

        setzeInhaltFuerZentriertesModalfenster(
            "Email aktualisieren",
            <EmailAktualisieren bisherigeEmail={entschluesseltesToken.email || ""} />,
            [{ name: "Schließen", variant: "primary" }]
        )
        zentriertesModalfensterAnzeigen()
   }
   ```
   
   Ein zentriertes Modalfenster mit dem Titel `Email aktualisieren` wird geöffnet und in diesem die Komponente `EmailAktualisieren` aufgerufen. Als bisherige Email, die als Platzhalter im Eingabefeld steht, wird die aus dem Token entschlüsselte Emailadresse genommen.
      
   Bei einem Klick auf die Schaltfläche zur Aktualisierung des Passwortes wird die Funktion `onPasswortAendern` aufgerufen.
   
   ```javascript
   onPasswortAendern = () => {
        const { setzeInhaltFuerZentriertesModalfenster, zentriertesModalfensterAnzeigen } = this.props

        setzeInhaltFuerZentriertesModalfenster(
            "Passwort ändern",
            <PasswortAendern />,
            [{ name: "Schließen", variant: "primary" }]
        )
        zentriertesModalfensterAnzeigen()
   }
   ```

   Auch hier wird ein zentriertes Modalfenster mit dem Titel `Passwort ändern` geöffnet, in dem die Komponente `PasswortAendern` aufgerufen wird.
   
   Wenn der Nutzer auf die Schaltfläche zum Löschen des Accounts klickt, wird zuerst die Funktion `onAccountLoeschen` aufgerufen.
      
   ```javascript
   onAccountloeschen = () => {
        const { setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen } = this.props

        setzeInhaltFuerOberesModalfenster("Achtung", "Alle Daten werden gelöscht! Möchtest du wirklich fortfahren?",
            // Durch die rote Farbe (variant: "danger") wird der Nutzer nochmal auf die Ernsthaftigkeit der Lage hingewiesen.
            [{ name: "Ja", variant: "danger", onClick: this.onAccountLoeschenFinal  }, { name: "Schließen", variant: "secondary"} ])
        oberesModalfensterAnzeigen()
   }
   ```
   
   Hier wird sichergestellt, dass der Nutzer sich wirklich im Klaren ist, dass er seinen Account löschen möchte.
   In einem oberen Modalfenster mit dem Titel `Achtung` wird der Nutzer nochmal auf die Ernsthaftigkeit der Lage hingewiesen.
   Wenn er sich dazu entschließt, auf die rote Schaltfläche `Ja` zu klicken, wird die finale Funktion `onAccountLoeschenFinal` aufgerufen.
      
   ```javascript
   onAccountLoeschenFinal = async () => {
        // Die Eigenschaften von props werden destrukturiert und sind somit separate Variablen.
        // Somit wird der Präfix "this.props" nicht benötigt.
        const { token, history, setzeInhaltFuerOberesModalfenster, oberesModalfensterAnzeigen, authentifizierungsTokenFestlegen, oberesModalfensterAusblenden } = this.props
        // Diese Funktion löscht den Account des Nutzers auf dem Server und gibt ein Objekt mit einem Fehler oder dem Status zurück.
        const accountLoeschung = await accountVomServerLoeschen(token)
        // Wenn es einen Fehler beim Löschvorgan des Acconts gibt, wird dieser in einem modalen Fenster angezeigt.
        if (accountLoeschung.error) {
            setzeInhaltFuerOberesModalfenster("Fehler", accountLoeschung.error, [{ name: "Schließen", variant: "primary" }])
            oberesModalfensterAnzeigen()
        // Wenn der Account erfolgreich gelöscht wurde, wird der Nutzer ausgeloggt und zum Anmeldeformular weitergeleitet.
        } else if (accountLoeschung.status) {
            authentifizierungsTokenFestlegen(null)
            history.push("/anmeldung")
            oberesModalfensterAusblenden()
        }
    }
   ```
   
   Hier wird eine Anfrage zum Löschen des Accounts mit dem Token des Nutzers an den Server geschickt. Wenn dieser einen Fehler zurückgibt, wird die Fehlermeldung dem Nutzer in einem oberen Modalfenster angezeigt. Sollte jedoch der Status 1 zurückgegeben werden, wurde der Account und alle Passwörter, die unter dessen Benutzernamen gespeichert waren, gelöscht.
   Das Token des Nutzers wird entfernt und er wird zur Anmeldung weitergeleitet. Wir danken dem Nutzer, dass er VergissMeinNicht genutzt hat.
      
   ```javascript
   const mapStateToProps = state => {
    return {
        token: state.authentifizierung.token
    }
}

// mapDispatchToProps ist eine Funktion, die das Dispatch-Objekt aus dem Store erhält und eine Funktionen-Mapping auf den Component-Props definiert.
// In diesem Fall werden verschiedene Aktionen-Dispatcher definiert, die als Props an den Component weitergegeben werden.
const mapDispatchToProps = dispatch => {
    return {
        setzeInhaltFuerZentriertesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerZentriertesModalfenster(titel, inhalt, buttons)),
        zentriertesModalfensterAnzeigen: () => dispatch(zentriertesModalfensterAnzeigen()),
        setzeInhaltFuerOberesModalfenster: (titel, inhalt, buttons) => dispatch(setzeInhaltFuerOberesModalfenster(titel, inhalt, buttons)),
        oberesModalfensterAnzeigen: () => dispatch(oberesModalfensterAnzeigen()),
        oberesModalfensterAusblenden: () => dispatch(oberesModalfensterAusblenden()),
        authentifizierungsTokenFestlegen: (token) => dispatch(authentifizierungsTokenFestlegen(token))
    }
}

// Der "Accounteinstellungen"-Komponent wird mit dem Redux Store verbunden und mit den oben definierten mapStateToProps und mapDispatchToProps Funktionen verknüpft.
// Mit withRouter wird der Komponent auch mit dem React Router verbunden, um Zugriff auf den Router-Props (z.B. "history") zu erhalten.
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AccountEinstellungen))
   ```
   
   Aus dem Redux-Store wird der aktuelle Zustand des Tokens als `token` an die Eigenschaften der Komponente übergeben. 
   Als Aktionserzeuger-Funktionen werden die Verwaltungsfunktionen für Modalfenster und die Funktion zum Festlegen des Tokens an die Eigenschaften der Komponente übergeben.
   Zum Schluss wird die Komponente noch mit dem Redux-Store und den Aktionserzeugern verbunden.
   So kann die Komponente darauf zugreifen und beispielsweise ein oberes Modalfenster mit der Fehlermeldung anzeigen oder das Token nach einem erfolgreichen Löschen des Accounts entfernen.
   
</details>
</details>
   
<details>
<summary><h2>Die Hilfsfunktionen</h2></summary>
      
Hilfsfunktionen dienen dazu, Prozesse der Verschlüsselung von Tokens oder Passwörtern oder der Kommunikation mit dem Server zu verwalten.
So können diese Funktionen in den Komponenten einfach aufgerufen werden und müssen nicht jedes Mal manuell definiert werden.
Der Code gewinnt an Übersichtlichkeit und Fehler sind einfacher zu identifizieren.
      
## Das Token
   
JSON-Web-Tokens (JWT) sind unser Mittel zur Authentifizierung. In einem Token sind Benutzername und Emailadresse eines Nutzers gespeichert und können entschlüsselt werden. Jedes Token hat eine zeitlich begrenzte Gültigkeit von (häufig) einer Stunde. So muss ein Nutzer sich nicht jedes Mal anmelden, wenn er die Seite neu lädt. Das Token ist im Redux-Store gespeichert und dient, solange es gültig ist, als Authentifikator, sodass der Nutzer direkt auf die Startseite weitergeleitet wird.
      
   
## Die Entschlüsselung des Tokens
   
   ```javascript
   export const tokenEntschluesseln = (token) => {
    // Der zweite Teil des Tokens, das Payload, ist ein Base64-codierter JSON-String.
    const base64Url = token.split('.')[1]
    // Der JSON-String wird extrahiert.
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    // und das darin enthaltene JSON-Objekt dekodiert zurückgegeben.
    return JSON.parse(window.atob(base64))
   }
   ```
      
   JWTs bestehen aus drei Teilen, die durch Punkte getrennt sind: Header, Payload und Signatur. Im Code wird das Datenpaket (Payload), der zweite Teil des Tokens, extrahiert und entschlüsselt, um auf die enthaltenen Informationen zuzugreifen. Der Payload ist ein Base64-codierter JSON-String, daher wird zuerst die Base64-URL-Kodierung in Base64-Kodierung umgewandelt, indem die Zeichen `-` und `_` in `+` bzw. `/` umgewandelt werden. Daraufhin wird der Base64-kodierte String mit der JavaScript-Funktion `window.atob()` decodiert, um das darin enthaltene JSON-Objekt zu erhalten. Dieses JSON-Objekt wird dann mit `JSON.parse()` in ein JavaScript-Objekt umgewandelt und zurückgegeben.
      
   So kann das Datenpaket entschlüsselt werden, um beispielsweise in den Accounteinstellungen auf Benutzername und Emailadresse zuzugreifen.
   
   Da die Gültigkeit des Tokens ebenso wichtig ist, wie der Inhalt, wird auch eine Funktion definiert, die prüft, ob das Token bereits abgelaufen ist.
      
   ```javascript
   export const istTokenAbgelaufen = (token) => {
    // Die Entschlüsselungsfunktion wird aufgerufen, um das Ablaufdatum des Tokens zu extrahieren.
    const tokenAblaufdatum = tokenEntschluesseln(token).exp
    // Die aktuelle Zeit wird in einen Zeitstempel umgewandelt und kann dann mit dem Ablaufdatum des Tokens verglichen werden.
    const aktuelleZeit = Math.round((new Date()).getTime() / 1000)
    // Wenn die aktuelle Zeit größer, als das Ablaufdatum des Tokens, ist dieses abgelaufen und ein "true" wird zurückgegeben.
    return aktuelleZeit > tokenAblaufdatum
   }
   ```
   
   Das Token wird zuerst durch die eben definierte Funktion entschlüsselt und das Ablaufdatum abgerufen.
   Dieses wird mit der aktuellen Zeit verglichen. Die Zeit wird hier als Zeitstempel (ISO 8601) angegeben. Je weiter in der Zeit, desto höher der Zeitstempelwert.
   So können die aktuelle Zeit und die Ablaufzeit des Tokens verglichen werden. Wenn die aktuelle Zeit größer ist, als die Ablaufzeit des Tokens, ist das Token nicht mehr gültig.
   
## Der Server 
 
   Da wir durch unsere Google Cloud-Function einen Server haben, der sich um die Anfragen aus dem Frontend kümmert, brauchen wir festgelegte Funktionen, die in jeder Komponente aufgerufen werden können, um eine sichere Kommunikation mit dem Server zu ermöglichen. Diese Funktionen sind nach HTTP-Methode und Inhalt unterschiedlich.
   
<details>
<summary>Nähere Informationen</summary>
   
   Als Basis wird die URL zum Server festgehalten, damit diese nicht in jeder Funktion manuell eingetragen werden muss.

   ```javascript
   const Server = "https://us-central1-forgetmynot-2f796.cloudfunctions.net/backend"
   ```
      
   ## Die Anmeldung
   
   ```javascript
   export const anmeldung = async (benutzername, passwort) => {
    try {
        // POST-Anfrage wird an den Anmeldungs-Endpunkt des Servers gesendet.
        const ergebnis = await fetch(Server + "/authentifizierung/anmeldung", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ benutzername, passwort })
        })

        // Da der Server mit als Format JSON verwendet, wird die Serverantwort als JSON-Objekt empfangen.
        const serverAntwort = await ergebnis.json()

        // Wenn der Server den Status "1" zurückgibt, wird das Token zurückgegeben.
        if (serverAntwort.status === 1) {
            return { token: serverAntwort.token }
        }

        // Wenn der Benutzername und das Passwort falsch sind, wird eine Fehlermeldung zurückgegeben.
        return { error: serverAntwort.message }
    } catch (error) {
        // Wenn es einen Fehler bei der Ausführung der Funktion gibt, wird eine Fehlermeldung zurückgegeben.
        return { error: "Fehler beim Einloggen!" }
    }
}
   ```
   
   Für die Anmeldung müssen Benutzername und Passwort als Parameter der Funktion übergeben werden. Daraufhin wird eine POST-Anfrage mit den beiden Parametern als JSON-String im Message-Body an den Anmelde-Endpunkt des Servers gesendet.
   Die Antwort des Servers wird als JSON-Objekt empfangen.
   Wenn der Server den Status 1 zurückgegeben hat, gibt die Funktion das Token zurück, das sie vom Server erhalten hat. Damit kann der nutzer sich nun anmelden.
   Sollte der Server den Status 0 zurückgegeben haben, wird die Fehlermeldung zurückgegeben.
   Wenn es einen Fehler bei der Anfrage gab, wird eine Fehlermeldung zurückgegeben.
   
   ## Die Registrierung
      
   ```javascript
   export const accountRegistrieren = async (benutzername, passwort, email) => {
    try {
        const ergebnis = await fetch(Server + "/authentifizierung/registrierung", {
            // Eine POST-Anfrage wird an den Registrierungs-Endpunkt des Servers gesendet.
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                benutzername, passwort, email
            })
        })

        // Da der Server mit als Format JSON verwendet, wird die Serverantwort als JSON-Objekt empfangen.
        const serverAntwort = await ergebnis.json()

        // Wenn der Server den Status "1" zurückgibt, wird der Status "true" zurückgegeben. (Der Account wurde erfolgreich registriert)
        if (serverAntwort.status === 1) {
            return { status: true }
        }

        // Wenn die Serverantwort negativ ist, wird eine Fehlermeldung zurückgegeben.
        return { error: serverAntwort.message }
    } catch (error) {
        // Wenn es einen Fehler bei der Ausführung der Funktion gibt, wird eine Fehlermeldung zurückgegeben.
        return { error: "Fehler bei der Registrierung!" }
    }
}
   ``` 

   Für die Registrierung müssen Benutzername, Passwort und Email als Parameter der Funktion übergeben werden. Daraufhin wird eine POST-Anfrage mit den Parametern als JSON-String im Message-Body an den Registrierungs-Endpunkt des Servers gesendet.
   Die Antwort des Servers wird als JSON-Objekt empfangen.
   Wenn der Server den Status 1 zurückgegeben hat, war die Registrierung erfolgreich und die die Funktion gibt den Status `true` zurück. Dadurch wird der Nutzer dann zur Anmeldung weitergeleitet und eine Erfolgsnachricht angezeigt.
   Sollte der Server den Status 0 zurückgegeben haben, wird die Fehlermeldung zurückgegeben.
   Wenn es einen Fehler bei der Anfrage gab, wird eine Fehlermeldung zurückgegeben.

</details>

## Die Aktualisierung der Emailadresse
   
   ```javascript
   export const emailAktualisieren = async (token, email) => {
    try {
        const ergebnis = await fetch(Server + "/authentifizierung/emailAktualisieren", {
            // Eine POST-Anfrage wird an den Emailaktualisierungs-Endpunkt des Servers gesendet.
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ email })
        })

        // Da der Server mit als Format JSON verwendet, wird die Serverantwort als JSON-Objekt empfangen.
        const serverAntwort = await ergebnis.json()

        if (serverAntwort.status === 1) {
            return { token: serverAntwort.token }
        }

        // Wenn die Serverantwort negativ ist, wird eine Fehlermeldung zurückgegeben.
        return { error: serverAntwort.message }
    } catch (error) {
        // Wenn es einen Fehler bei der Ausführung der Funktion gibt, wird eine Fehlermeldung zurückgegeben.
        return { error: "Fehler bei der Aktualisierung der Emailadresse!" }
    }
}
   ```

   Für die Aktualisierung des Passwortes müssen das Token und die neue Emailadresse als Parameter der Funktion übergeben werden. Daraufhin wird eine POST-Anfrage mit den beiden Parametern als JSON-String im Message-Body an den Email-Aktualisierungs-Endpunkt des Servers gesendet.
   Die Antwort des Servers wird als JSON-Objekt empfangen.
   Wenn der Server den Status 1 zurückgegeben hat, gibt die Funktion das Token zurück, das sie vom Server erhalten hat. So ist der Nutzer auch mit der neuen Emailadresse noch authentifiziert.
   Sollte der Server den Status 0 zurückgegeben haben, wird die Fehlermeldung zurückgegeben.
   Wenn es einen Fehler bei der Anfrage gab, wird eine Fehlermeldung zurückgegeben.

## Die Aktualisierung des Passwortes

   ```javascript
   export const passwortAendern = async (token, altesPasswort, neuesPasswort) => {
    try {
        const ergebnis = await fetch(Server + "/authentifizierung/passwortAendern", {
            // Eine POST-Anfrage wird an den PasswortÄnderungs-Endpunkt des Servers gesendet.
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ altesPasswort, neuesPasswort })
        })

        // Da der Server mit als Format JSON verwendet, wird die Serverantwort als JSON-Objekt empfangen.
        const serverAntwort = await ergebnis.json()

        if (serverAntwort.status === 1) {
            return { status: true }
        }

        // Wenn die Serverantwort negativ ist, wird eine Fehlermeldung zurückgegeben.
        return { error: serverAntwort.message }
    } catch (error) {
        // Wenn es einen Fehler bei der Ausführung der Funktion gibt, wird eine Fehlermeldung zurückgegeben.
        return { error: "Fehler beim Ändern des Passwortes!" }
    }
}
   ```

   Für die Aktualisierung des Passwortes müssen das Token, das alte und das neue Passwort als Parameter der Funktion übergeben werden. Daraufhin wird eine POST-Anfrage mit den beiden Parametern als JSON-String im Message-Body an den Passwort-Änderungs-Endpunkt des Servers gesendet.
   Die Antwort des Servers wird als JSON-Objekt empfangen.
   Wenn der Server den Status 1 zurückgegeben hat, wurde das Passwort erfolgreich geändert und die die Funktion gibt den Status `true` zurück. Dadurch wird der Nutzer dann zur Anmeldung weitergeleitet und eine Erfolgsnachricht angezeigt.
   Sollte der Server den Status 0 zurückgegeben haben, wird die Fehlermeldung zurückgegeben.
   Wenn es einen Fehler bei der Anfrage gab, wird eine Fehlermeldung zurückgegeben.
      
## Den Account löschen
      
   ```javascript
   export const accountVomServerLoeschen = async (token) => {
    try {
        const ergebnis = await fetch(Server + "/authentifizierung/accountLoeschen", {
            // Eine POST-Anfrage wird an den AccountLöschen-Endpunkt des Servers gesendet.
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        // Da der Server mit als Format JSON verwendet, wird die Serverantwort als JSON-Objekt empfangen.
        const serverAntwort = await ergebnis.json()

        // Wenn der Server den Status "1" zurückgibt, wird der Status "true" zurückgegeben. (Der Account wurde erfolgreich gelöscht)
        if (serverAntwort.status === 1) {
            return { status: true }
        }

        // Wenn die Serverantwort negativ ist, wird eine Fehlermeldung zurückgegeben.
        return { error: serverAntwort.message }
    } catch (error) {
        // Wenn es einen Fehler bei der Ausführung der Funktion gibt, wird eine Fehlermeldung zurückgegeben.
        return { error: "Fehler beim Löschen des Accounts!" }
    }
}
   ``` 
   
   Um den Account zu löschen, muss das Token als Parameter der Funktion übergeben werden. Daraufhin wird eine POST-Anfrage mit diesem Parameter als JSON-String im Message-Body an den Account-Löschen-Endpunkt des Servers gesendet.
   Die Antwort des Servers wird als JSON-Objekt empfangen.
   Wenn der Server den Status 1 zurückgegeben hat, wurde der Account erfolgreich gelöscht und die die Funktion gibt den Status `true` zurück. Dadurch wird der Nutzer dann zur Anmeldung weitergeleitet und eine Erfolgsnachricht angezeigt.
   Sollte der Server den Status 0 zurückgegeben haben, wird die Fehlermeldung zurückgegeben.
   Wenn es einen Fehler bei der Anfrage gab, wird eine Fehlermeldung zurückgegeben.
   
      
## Die Ver- und Entschlüsselung
      
   Die Verschlüsselung bietet einen Schutz für die Passwörter des Nutzers. Zur Verschlüsselung werden die Kryptographie-Bibliothek [`tweetnacl`](https://tweetnacl.cr.yp.to/) und Base64, da beim JWT auch mit Base64 gearbeitet wird.
   Für die Ver- und Entschlüsselung in und aus UTF-8 werden die Funktionen [`encodeUTF8` und `decodeUTF8`](https://gist.github.com/felvieira/b2b3cfec78f0c353c3beac6db151ba1e) vom Github-Nutzer [`felvieira`](https://github.com/felvieira) verwendet.
   
<details>
<summary>Nähere Informationen</summary>

   Für die Base64 Ver- und Entschlüsselung werden die Funktionen `base64Verschluesselung` und `base64Entschluesselung` definiert.
      
   ```javascript
   // Diese Funktion nimmt einen Uint8Array entgegen und gibt eine Base64-kodierte Zeichenfolge zurück.
export const base64Verschluesselung = (data) => Base64.fromByteArray(data)

// Diese Funktion nimmt eine Base64-kodierte Zeichenfolge entgegen und gibt einen Uint8Array zurück.
export const base64Entschluesselung = (str) => Base64.toByteArray(str)
   ```
      
   Hierdurch kann ein Uint8Array in eine Base64-kodierte Zeichenfolge entschlüsselt werden und auch andersherum.

</details>
      
## Die Verschlüsselung

   ```javascript
   export const verschluesseln = (schluessel, datenString) => {
    // Die Daten aus dem Datenstring werden in einen Byte-Array umgewandelt.
    const datenDecodiert = new Uint8Array(decodeUTF8(datenString))
    // Ein zufälliger Sicherheitswert wird erzeugt.
    const sicherheitswert = nacl.randomBytes(24)

    // Der Sicherheitswert wird aus einem String in einen Byte-Array umgewandelt.
    const schluesselDecodiert = decodeUTF8(schluessel)
    // Der Schlüssel-Array wird auf 32 Byte erweitert.
    const schluesselBytes = new Uint8Array(32)
    schluesselBytes.set(schluesselDecodiert, 0)

    const datenVerschluesselt = nacl.box.after(datenDecodiert, sicherheitswert, schluesselBytes)

    return { verschluesselteDaten: base64Verschluesselung(datenVerschluesselt), sicherheitswert: base64Verschluesselung(sicherheitswert) }
}
   ```

   Die Funktion nimmt einen Schlüssel und einen Datenstring als Parameter entgegen. Die Daten werden aus dem Datenstring in einen Byte-Array umgewandelt.
   Dazu wird ein zufälliger Sicherheitswert erzeugt, der nicht zu erraten oder herzuleiten ist. Hierbei handelt es sich um einen kryptografisch sicheren Zufallswert, der als sogenannter Nonce oder Initialisierungsvektor in der Verschlüsselung verwendet wird, um die Sicherheit der verschlüsselten Daten zu erhöhen.
   Der übergebene Schlüssel, der als String vorliegt, wird mit der Funktion `decodeUTF8()` in einen Byte-Array umgewandelt, um ihn mit dem Datenstring in Byte-Array-Form verwenden zu können. Der Schlüssel-Array wird auf eine feste Länge von 32 Bytes erweitert, die als Standardlänge für NaCl verwendet wird. Falls der übergebene Schlüssel weniger als 32 Byte lang ist, wird er am Anfang des Arrays platziert und mit Nullen aufgefüllt.
   Nun können die Daten mit der Funktion `nacl.box.after()` die zuvor dekodierten Daten, der generierte Sicherheitswert und der erweiterte Schlüssel-Array verschlüsselt werden. Der Rückgabewert ist ein Byte-Array mit den verschlüsselten Daten. Nun werden die mit NaCl verschlüsselten Daten und der Sicherheitswert noch Base64 verschlüsselt. Die verschlüsselten Daten und der Sicherheitswert werden in einem JSON-Objekt zurückgegeben. 
   Dieses Objekt enthält zwei Eigenschaften: `verschluesselteDaten` und `sicherheitswert`.

## Die Entschlüsselung

   ```javascript
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
   ```
    
Die Funktion nimmt einen Schlüssel, einen Base64-Datenstring und einen Base64-Sicherheitswert als Parameter entgegen. Zuerst werden die Daten und der Sicherheitswert aus Base64 dekodiert. Daraufhin wird der Schlüssel wird mit der Funktion `decodeUTF8()` in einen Byte-Array umgewandelt, um ihn mit dem Datenstring und Sicherheitswert in Byte-Array-Form verwenden zu können. 
   Der Schlüssel-Array wird wieder auf die feste Länge von 32 Bytes erweitert, die als Standardlänge für NaCl verwendet wird. Falls der übergebene Schlüssel weniger als 32 Byte lang ist, wird er am Anfang des Arrays platziert und mit Nullen aufgefüllt.
   Nun können die Daten mit der Funktion `nacl.box.open.after()` die zuvor verschlüsselten Daten, der generierte Sicherheitswert und der erweiterte Schlüssel-Array entschlüsselt werden. Der Rückgabewert ist eine UTF-8-Zeichenfolge mit den verschlüsselten Daten. So kann ein Passwort aus der Datenbank mit Masterpasswort als Schlüssel und Sicherheitswert entschlüsselt werden und dann im Klartext in der Tabelle angezeigt werden.
      
## Die Generierung eines starken Passwortes

   ```javascript
   export const passwortGenerieren = (length = 24) => {
    const zufaelligeZeichenfolge = nacl.randomBytes(length)
    return base64Verschluesselung(zufaelligeZeichenfolge)
}
   ```

   Beim Hinzufügen eines neuen Passwortes, hat der Nutzer die Möglichkeit, automatisch ein starkes Passwort für sich generieren zu lassen. Diese Generierung erfolgt durch die Funktion `nacl.randomBytes()`. Hier werden 24 zufällige Bytes generiert, die daraufhin in eine Base64-kodierte Zeichenfolge umgewandelt werden. Diese Base64-kodierte Zeichenfolge wird als zufälliges Passwort von der Funktion zurückgegeben.
   </details>   
   
<details>
<summary><h2>Der Redux-Store</h2></summary>
  
Der Redux-Store ist wie ein zentrales Lagerhaus für den Zustand einer React-Anwendung. Statt den Zustand in verschiedenen Komponenten zu verwalten, wird der Zustand im Redux-Store gespeichert und von den Komponenten aus gelesen oder in den Store geschrieben. Der Redux-Store ist ein unveränderlicher Zustand, das bedeutet, dass er nicht direkt geändert werden kann. Stattdessen werden Änderungen am Zustand durch Aktionen ausgelöst, die von den Komponenten ausgelöst und an den Store gesendet werden. Der Redux-Store ermöglicht eine klare Trennung von Zustand und Darstellung in der Anwendung. Komponenten können den aktuellen Zustand aus dem Store lesen und auf Änderungen reagieren, indem sie sich erneut rendern. Wenn Komponenten den Zustand ändern müssen, senden sie eine Aktion an den Store, der den Zustand aktualisiert und allen abhängigen Komponenten die neuen Daten bereitstellt.
      
   Insgesamt erleichtert der Redux-Store die Verwaltung des Zustands in React-Anwendungen, indem er eine zentrale Datenquelle für den gesamten Zustand der Anwendung bereitstellt und die Veränderungen am Zustand durch Aktionen koordiniert.
   
![Redux-Store](https://user-images.githubusercontent.com/65679099/232251361-34a6bd5f-d554-420e-be50-de67961e761f.png)
  
<details>
<summary><h3>Die Aktionserzeuger</h3></summary>
   
   Um die Zustände im Redux-Store zu verändern werden sogenannte Aktionen genutzt. Aktionen sind JavaScript-Objekte, die eine Art von Veränderung im Redux-Store repräsentieren. Sie sind die einzige Möglichkeit, Daten im Redux-Store zu aktualisieren. Eine Aktion besteht aus einem Aktionstyp, der beschreibt, was für eine Veränderung im Redux-Store stattfinden soll und auch den Namen der Aktion angibt. Zusätzlich kann in der Aktion noch ein `Datenpaket` (Payload) übergeben werden, das die Aktualisierung im Store präzise beschreibt.
    
<details>
<summary>Nähere Informationen</summary>
   
   Um den Inhalt für ein oberes Modalfenster festzulegen wird eine Aktion vom Typ `"SETZE_INHALT_FUER_OBERES_MODALFENSTER"` erzeugt. Zusätzlich werden noch die wichtigen Daten, die den Inhalt des Modalfensters ausmachen, als Datenpaket übergeben.
      
   ```javascript
   {
      type: SETZE_INHALT_FUER_ZENTRIERTES_MODALFENSTER,
      titel, inhalt, buttons
   }
   ```
      
   Anstatt Aktionen jedoch immer manuell auszulösen, werden Funktionen als `Aktionserzeuger` definiert. Diese erzeugen dann bei jedem Aufrufen die definierte Aktion.
      
   ```javascript
   export const setzeInhaltFuerZentriertesModalfenster = (titel, inhalt, buttons) => {
      return {
         type: SETZE_INHALT_FUER_ZENTRIERTES_MODALFENSTER,
         titel, inhalt, buttons
      }
   }
   ```
      
   Das Datenpaket (`titel`,`inhalt`,`buttons`) wird als Parameter der Funktion behandelt und daraufhin in der Aktion übergeben. So kann in diesem Beispiel je nach Parameter ein zentriertes Modal mit unterschiedlichem Inhalt erzeugt werden.
      
   ## Die Aktionstypen
   
   Aktionstypen in Redux dienen dazu, Aktionen zu definieren und zu identifizieren. Sie sind Konstanten und werden normalerweise in Strings definiert, die die Art der Aktion repräsentieren, die sie ausführen.
   ```javascript
   const AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN = "AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN"
   ```
      
   Ein Aktionstyp bestimmt, welche Veränderung an Zuständen im Redux-Store vorgenommen werden soll. Die Verwendung von Aktionstypen trägt dazu bei, Aktionen eindeutig identifizieren, auszuführen und besser warten zu können, da der Code sehr an Übersichtlichkeit gewinnt.
   
      
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
      
   ```javascript
   // Der Aktionstyp, der zur Identifikation der Aktion in der Redux-Anwendung verwendet wird, wird importiert.
import { AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN } from './aktionsTypen'

// Hier wird die Funktion authentifizierungsTokenFestlegen definiert, die einen Token entgegennimmt und eine Aktion zurückgibt.
export const authentifizierungsTokenFestlegen = (token) => {
    return {
        // Der Aktionstyp "AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN" wird zugewiesen, um die Aktion innerhalb der Redux-Anwendung eindeutig zu identifizieren.
        type: AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN,
        // Hier wird das Token als Datenpaket der Aktion übergeben. 
        // Wenn das Token existiert, also nicht null ist, wird noch der Zusatz "Bearer " angefügt.
        // JWT liegen im Bearer-Token-Schema vor, was durch diesen Zusatz im Authorisierungs-Header von Anfragen dem Server direkt mitgeteilt wird.
        token: token ? "Bearer " + token : token
    }
}
   ```

   Wie vermutlich aus den vorigen Texten bereits angeklungen ist, spielt die Authentifizierung bei uns eine wichtige Rolle. Folglich haben wir einen Aktionserzeuger für den die Festlegung, bzw. die Speicherung des Authentifizierungstokens.
Das Token wird als Parameter an die Funktion übergeben. So gibt die Funktion eine Aktion zurück, die den importierten Aktionstyp `"AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN"` verwendet, um die Aktion in Redux eindeutig zu identifizieren.
Das Token wird dann als Datenpaket in der Aktion übergeben und im Redux-Store gespeichert. Wenn ein Token existiert, also das Token einen Wert hat, wird ihm der Zusatz `„Bearer“` vorangestellt. Diese Auffüllung wird im Authorization-Header (Autorisierungsheader) der HTTP-Anfrage verwendet, um anzuzeigen, dass sich das Token im Bearer-Schema befindet, da JWTs sich in diesem Format befinden. Die Verwendung des `"Bearer"`-Zusatzes ermöglicht es dem Server, das Token einfach zu validieren, da dieser weiß, wie er mit der HTTP-Anfrage umgehen muss.
   Sollte kein Token vorhanden sein, wird einfach das Token, also `null` als Token übergeben, bzw. im Redux-Store geseichert.
      
   
      
## Die Steuerung der Modalfenster 
   ```javascript 
   
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
   Mit diesen Aktionserzeuger-Funktionen werden die verschiedenen Modalfenster in der Anwendung verwaltet.
   Da die Modalfenster über den Redux-Store verwaltet werden, indem die Eigenschaften wie `Titel`, `Inhalt` und `Buttons` und der Boolean `gezeigt` dort gespeichert werden, können sie über Aktionen verändert, beispielsweise angezeigt oder ausgeblendet werden.
   Zunächst werden die erforderlichen Aktionstypen importiert, damit sie für die Definition der Aktionserzeugern verwendet werden können. 
   Dann werden verschiedene Funktionen definiert, von denen jede eine Aktion zurückgibt, um ein bestimmtes Modalfenster zu öffnen, zu schließen oder den Inhalt eines Modalfensters einzustellen. Jede Funktion verwendet einen eindeutigen Aktionstyp, um sicherzustellen, dass die Aktion innerhalb der Redux-Anwendung eindeutig identifiziert werden kann. 
   Beispielsweise erzeugt die Funktion `oberesModalfensterAnzeigen` eine Aktion, die das obere Modalfenster mit dem Aktionstyp OBERES_MODALFENSTER_ANZEIGEN öffnet, bzw. anzeigt.   
      
   ## Die Verwaltung der Passwörter im Redux-Store
   
   ```javascript   
   // Zuerst werden die Aktionstypen, für die eine Aktion erzeugt werden soll, importiert.
import { PASSWORT_HINZUFUEGEN, PASSWORT_LOESCHEN, PASSWOERTER_FESTLEGEN } from './aktionsTypen'

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
   ```

   Wie bei der Verwaltung der Modalfenster werden auch hier Aktionserzeuger-Funktionen für die verschiedenen Operationen an den Passwörtern im Redux-Store definiert.
   Die Aktionstypen werden zur Definition der Erzeuger importiert und als Typen der jeweiligen Aktionen gesetzt.
   Diese Aktionstypen definieren, welche Aktionen ausgeführt werden sollen.
   Die `passwortHinzufuegen`-Funktion erzeugt eine Aktion zum Hinzufügen eines neuen Passwortes. Das Passwort wird als Parameter der Funktion behandelt und in der erzeugten Aktion als Datenpaket übergeben.
   Die Funktion `passwortLoeschen` erzeugt eine Aktion zum Löschen des Passwortes. Das Passwort wird als Parameter der Funktion behandelt und in der erzeugten Aktion als Datenpaket übergeben.
Die Funktion `passwoerterFestlegen` erzeugt eine Aktion zum Festlegen der Passwörter im Redux-Store. Die Passwrter, die festgelegt werden sollen, werden als Parameter der Funktion behandelt und in der erzeugten Aktion als Datenpaket übergeben.
      
</details>  
   
   
<details>
<summary><h3>Die Reduzierer</h3></summary>
      
   Reduzierer sind Funktionen, die den Zustand eines Redux-Stores verwalten und diesen mit Aktionsobjekten aktualisieren.
   Sie erhalten den aktuellen Zustand des Redux-Stores und eine Aktion als Parameter und geben einen neuen Zustand zurück.
      
   ```javascript
   (zustand, aktionsObjekt) => neuerZustand
   ```
      
   Um eine klare Trennung in der Verwaltung der unterschiedlichen Zustände zu ermöglichen, werden unterschiedliche Reduzierer verwendet, die sich um unterschiedliche Teile des Zustandes kümmern.
      
   In unserer Anwendung nutzen wir drei Reduzierer für die `Authentifizierung`, die `Passwörter` und die `Modalfenster`.
      
## Der Authentifizierungsreduzierer
      
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
      
   Dieser Reduzierer kümmert sich nur um die Aktualisierung des Authentifizierungstokens im Redux-Store. Der Anfangszustand des Reduzierers enthält ein leeres Token als Eigenschaft. Die `reduzier`-Funktion benötigt zwei Parameter: den aktuellen Zustand und die auszuführende Aktion. 
   Da dieser Reduzierer nur bei einer Aktion vom Typ `AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN` aktiv werden soll, wird durch ein Switch-Statement überprüft, dass der Aktionstyp auch wirklich `AUTHENTIFIZIERUNGSTOKEN_FESTLEGEN` ist.
   Wenn dies der Fall ist, wird ein neuer Zustand und ein Token zurückgegeben, das auf das in der Aktion übergebene Token gesetz wird.
   Andernfalls wird der aktuelle Zustand zurückgegeben.
   Schließlich wird der Reduzierer als Standardexport angezeigt, sodass andere Module ihn importieren können und so den Zustand des Authentifizierungstoken im Redux-State aktualisieren können.
      
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
      
   Wie beim Authentifizierungs-Reduzier wird auch hier ein Anfangszustand für die beiden Modalfenster definiert. Standardmäßig werden beide Modalfenster nicht angezeigt und besitzen keinerlei Inhalt. Die Reduzier-Funktion benötigt nun zwei Parameter: den aktuellen Status der Modalfenster und die auszuführende Aktion. 
   Um ohne viele `if`-Statements die unterschiedlichen Aktionen verarbeiten zu können, werden ein Switch-Statement verwendet und basierend auf den Aktionstypen Instanzen erzeugt, die je nach Aktion den Zustand aktualisieren. Jede Instanz gibt einen neuen Zustand zurück, indem sie den vorherigen Zustands verwendet und dann nur die in der Aktion angegebenen Eigenschaften ändert.
In diesem Fall hat der Zustand zwei Eigenschaften, „oberesModalfenster“ und „zentriertesModalfenster“. Verschiedene Arten von Aktionen können diese Zustandseigenschaften ändern, z. B. das Ein- oder Ausblenden eines Modals oder das Aktualisieren seines Inhalts.
Schließlich gibt die "Reduzier"-Funktion einen neuen Zustand und ein oberes oder zentriertes Modalfenster zurück, die durch die durchgeführten Aktionen erzeugt wurden.
      
## Der Passwörter-Reduzierer
      
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
      
   Beim Passwörter-Reduzierer besteht der Anfangszustand aus einer leeren Liste, in der die Passwörter im Redux-Store gespeichert werden.
   Auch hier wird mit einem Switch-Statement zwischen den Aktionstypen zur Passwörterverwaltung unterschieden.
   Wenn ein Passwort hinzugefügt werden soll, wird der neue Zustand und der Zustand der Liste gemeinsam mit dem Passwort aus der Aktion hinten angehängt, zurückgegeben.
   Beim Löschen eines Passwortes wird ein Zustand der Liste zurückgegeben, in dem das Passwort mit der gewünschten Id entfernt wird.
   Wenn die Passwörter für die Liste festgelegt werden sollen, wird einfach die Liste mit den Passwörtern aus der Aktion zurückgegeben.

</details>

      
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

// Mit der Funktion "reduxStore" kann ein Redux-Store mit dem Hauptreduzierer und dem geladenen Zustand erstellt werden.
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

   Nachdem alle Reduzierer mit Aktionen definiert und exportiert wurden, können diese nun zu einem großen `Hauptreduzierer` zusammengefasst werden und somit der Redux-Store verwaltet werden. So ist der Code übersichtlicher indem die Zustandsänderungen an einem Ort gehandhabt werden können. Dadurch werden keine zusätzlichen Abstraktionsschichten eingeführt und der Hauptreduzierer kann einfacher in die React-Anwendung integriert werden.
     
   ```javascript
   const hauptReduzierer = combineReducers({
      authentifizierung,
      passwoerter,
      modalFenster
   })
   ```
     
   Mit der `combineReducers`-Methode werden die drei Reduzierer (authentifizierung, passwoerter, modalFenster) zu einem Hauptreduzierer kombiniert. 
   
   Daraufhin folgen zwei Funktionen, die den aktuellen Zustand (State) im lokalen Speicher speichern und aus dem lokalen Speicher laden können. Der Zustand wird dafür zuerst in einen serialisierten JSON-String konvertiert und daraufhin als Item `state` im lokalen Speicher des Browsers gespeichert.
   
   Wenn aus dem lokalen Speicher geladen werden soll, wird einfach dieses Item aus dem lokalen Speicher als `serialisierterZustand` gespeichert und daraufhin in ein JavaScript-Objekt konvertiert, das daraufhin zurückgegeben wird.
   
   Daraufhin wird der aktuelle Zustand in der Variablen `geladenerZustand` aus dem lokalen Speicher geladen.
   
  Schließlich wird die `reduxStore`-Funktion definiert, um den lokalen Speicher zu erstellen. Die `reduxStore`-Funktion verwendet die Redux-Methode `createStore`, um einen Speicher mit dem Hauptreduzierer und dem aus dem lokalen Speicher geladenen Zustand zu erstellen. 
  Der Event-Handler ist bei `store.subscribe` registriert, um den aktualisierten Status im lokalen Speicher zu speichern, wenn sich der Zustand des Redux-Stores ändert. 
  Schließlich wird die `reduxStore`-Funktion als Standardfunktion exportiert, damit andere Module sie importieren und verwenden können und sie in der `App.js` verwendet werden kann, um den lokalen Speicher der Webseite zu erstellen.
      
      

Firestore ist eine von Google entwickelte dokumentenorientierte NoSQL-Datenbank. Im Gegensatz zu relationalen Datenbanken (z. B. SQL-Datenbanken) hat Firestore keine Tabellen, Zeilen oder Spalten, stattdessen werden Daten in Dokumenten gespeichert, die in Sammlungen organisiert sind. Jedes Dokument enthält Felder und Werte, die als JSON-Objekt dargestellt werden. Dokumente in der Sammlung müssen keine festen Felder haben. Dokumente sind daher flexibler und skalierbarer als relationale Datenbanken.
Firestore wurde für die Verwendung in Anwendungen entwickelt, die Daten in Echtzeit ändern, wie z. B. Chat-Anwendungen und Online-Spiele. Mit Firestore können Sie Daten in Echtzeit zwischen Ihrem Client (z. B. einem Mobilgerät oder Webbrowser) und Ihren Servern in der Cloud synchronisieren. Das bedeutet, dass Änderungen, die in einem Client vorgenommen werden, automatisch an alle anderen Clients weitergegeben werden, die mit derselben Datenquelle verbunden sind.
Firestore bietet verschiedene Funktionen zum Schreiben, Lesen, Aktualisieren und Löschen von Daten. Firestore-Daten können einfach über APIs abgerufen und bearbeitet werden. Firestore bietet auch eine Abfragesprache, mit der Entwickler komplexe Abfragen ausführen können, um bestimmte Daten aus Sammlungen abzurufen. Firestore ist Teil der Firebase-Plattform von Google und lässt sich problemlos in andere Firebase-Dienste wie Authentifizierung, Cloud-Messaging und Cloud-Funktionen integrieren. Firestore ist auch auf der Google Cloud Platform (GCP) verfügbar. Das bedeutet, dass es sich nahtlos in Anwendungen integrieren lässt, die auf der GCP gehostet werden.

</details>


## Die Anwendung

Nachdem alle Komponenten, Hilfsfunktionen und der Redux-Store definiert wurden, können diese nun in einer Anwendung `App.js` zusammengefasst werden, die daraufhin auf der Webseite gerendert wird.

```javascript
// Die benötigten React-Komponenten und Module werden importiert.
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

// Die verschiedenen Komponenten der Anwendung werden importiert.
import BenutzerAuthentifizieren from './Komponenten/BenutzerAuthentifizieren/BenutzerAuthentifizieren'
import Anmeldung from './Komponenten/Anmeldung/Anmeldung'
import Registrierung from './Komponenten/Registrierung/Registrierung'
import Startseite from './Komponenten/Startseite/Startseite'
import NichtGefunden from './Komponenten/RoutenError/NichtGefunden'
import OberesModalfenster from './Komponenten/OberesModalfenster/OberesModalfenster'
import ZentriertesModalfenster from './Komponenten/ZentriertesModalfenster/ZentriertesModalfenster'
import reduxStore from './ReduxStore/reduxStore'
```

Dafür werden zuerst alle benötigten React-Komponenten und Module sowie die verschiedenen Module der Anwendung importiert.

```javascript
// Der Redux Store wird für die Anwendung erstellt.
const store = reduxStore()
```

Daraufhin wird der Redux-Store für die Anwendung erstellt und die Anwendung kann gerendert werden.

```javascript
render() {
        // Der Inhalt der App-Komponente wird als HTML-Code zurückgegeben.
        return (
            // Der Redux-Store wird als Provider für die gesamte Anwendung verfügbar gemacht.
            // Alle Komponenten können somit auf ihn zugreifen können, um den Zustand der Anwendung zu aktualisieren oder zu lesen.
            <Provider store={store}>
                {/* Die Modalfenster werden gerendert. Ob sie sichtbar sind und wie sie aussehen wird durch den State des oberen und zentrierten Modalfensters entschieden. */}
                <OberesModalfenster />
                <ZentriertesModalfenster />
                {/* Die Router-Komponente, die die Routen der Anwendung verwaltet, wird definiert. */}
                <Router>
                    <Switch>
                        {/* Beim Standardpfad wird die Anmeldungskomponente gerendert. */}
                        <Route exact path="/" component={Anmeldung} />
                        {/* Bei /anmeldung wird die Anmeldungskomponente gerendert.*/}
                        <Route exact path="/anmeldung" component={Anmeldung} />
                        {/* Bei /registrierung wird die Registrierungskomponente gerendert. */}
                        <Route exact path="/registrierung" component={Registrierung} />
                        {/* Bei /startseite wird die Startseite-Komponente gerendert. */}
                        <BenutzerAuthentifizieren path="/startseite" component={Startseite} />
                        {/* Bei /404 wird die 404-Fehlerseite-Komponente gerendert. */}
                        <Route exact path="/404" component={NichtGefunden} />
                        {/* Wenn keine passende Route gefunden wird, wird auf die 404-Fehlerseite umgeleitet. */}
                        <Redirect to="/404" />
                    </Switch>
                </Router>
            </Provider>
        )
    }
```

Damit der Redux-Store für die gesamte Anwendung verfügbar ist, wird dieser als Provider gesetzt. So können alle Komponenten auf den aktuellen Zustand, der im Redux-Store gespeichert ist, zugreifen und diesen lesen oder aktualisieren.
Die Modalfenster werden gerendert, sodass ihre Eigenschaften durch ihre Zustände im Redux-Store verwaltet werden können.
Nun werden noch die einzelnen Komponenten unterschiedlichen Routen zugeschrieben. Beim Standardpfad `/` wird die Anmeldungskomponente gerendert. Bei `/anmeldung` ebenfalls. Die Registrierung wird bei `/registrierung`, die Startseite, wenn der Nutzer authentifiziert ist, bei `/startseite` und die 404-Fehlerseite bei `/404` gerendert.
Sollte der eingegebene Pfad nicht existieren, wird der Nutzer zu `/404` umgeleitet.

```javascript
export default App
```

Zum Schluss wird diese App-Komponente noch als Standard exportiert, sodass diese auf der Webseite gerendert werden kann.

## Die Webseite - index.js

Nun sind wir am Ende des Frontends angekommen. Hier wird die App-Komponente und damit die gesamte Webseite gerendert. Auf der Webseite wird somit die App-Komponente aufgerufen und darin die einzelnen Komponenten, verbunden mit Redux-Store.

```javascript
ReactDOM.render(<App />, document.getElementById('root'))
```


</details>
      
      
 
 
 
 
      
<details>
   <summary><h1>Das Backend</h1></summary>

Im Backend findet die wahre Funktionalität hinter der schönen Fassade der Webseite statt. Anstatt um die schöne Darstellung eines Anmeldeformulars, kümmert man sich hier um die Verarbeitung der Anmeldungsanfrage, gleicht die eingegebenen Daten mit denen aus der Datenbank ab und gibt je nachdem, welches Ergebnis bei den unterschiedlichen Datenbank-Operationen herauskommt unterschiedliche Antworten auf die Anfragen aus dem Frontend.

Das Backend ist eine Node.js Express Anwendung, die Google Cloud Funktion wie eine API funktioniert. Die App dient als HTTP-Endpunkt und reagiert auf Anfragen an verschiedene Endpunkte unterschiedlich.
In den Grundfunktionen werden grundlegende Funktion zur Arbeit mit der Firestore-Datenbank definiert. In der Verwaltung werden unterschiedliche Funktionen definiert, die die Anfragen aus dem Frontend beantworten sollen.
Diese Funktionen werden dann in den Routen unterschiedlichen Endpunkten und Anfragentypen zugeschrieben. Um eine Anmeldung durchzuführen, muss eine `POST`-Anfrage an die Route `/authentifizierung/anmeldung` mit dem Benutzernamen und Passwort des Nutzers gesendet werden. Wenn diese erfolgreich ist, wird ein Authentifizierungstoken zurückgegeben, wodurch der Nutzer sich anmelden kann.
Die Überprüfung der Authentifizierung und die Verbindung zur Firestore-Datenbank, findet in der Vermittlung statt. 
Um eine weitere Stufe der Sicherheit zu gewährleisten, wird eine Umgebungsvariable `TOKEN_SCHLUESSEL` in der `.env`-Datei festgelegt. Ohne diesen geheimen Schlüssel können Tokens weder erstellt noch entschlüsselt werden. So ist es, ohne diesen Schlüssel zu kennen, nicht möglich, mit den Tokens im Frontend etwas anfangen, bzw. daraus ableiten zu können. 
Während die Authentifizierung des Tokens nur im Backend stattfindet, findet die Entschlüsselung der Passwörter mit dem Masterpasswort nur im Frontend statt. Das Masterpasswort wird **nicht gespeichert**. Dadurch ist es nicht möglich, die Passwörter aus der Datenbank auslesen zu können, ohne das Masterpasswort zu kennen, mit dem jedes Passwort verschlüsselt wurde.



<details>
<summary><h2>Die Grundfunktionen</h2></summary>
    
## Das Abrufen der Daten aus der Datenbank
   
![Abrufen der Daten](https://user-images.githubusercontent.com/65679099/230971735-e80fc53b-cfe7-4743-9566-795d8a02ad4c.png)

Hier im Backend befinden wir uns nun stets in Datenbanknähe, wo häufig mit aktuellen Daten aus der Datenbank gearbeitet wird.
Um diese Daten für JavaScript zugänglich zu machen, haben wir die beiden Funktionen `benutzerDatenAbrufen` und `passwortDatenAbrufen` definiert, die einen JSON-String des Benutzers oder Passwortes aus der Datenbank entgegennehmen und die einzelnen Felder aus der Firestore-Datenbank in ein neues Objekt konvertieren. Dieses Objekt beinhaltet beim Abrufen eines Benutzers die Daten: Benutzername, Passwort und die E-Mail-Adresse.
Beim Abrufen der Passwortdaten wird ein Objekt mit: Benutzernamen, Beschreibung, verschlüsseltem Passwort und Sicherheitswert zurückgegeben. 
Nun kann mit den Daten operiert werden.

## Eine kurze Einführung in Firestore

Der Firestore ist eine dokumentenbasierte NoSQL-Datenbank, die von Googles Firebase kostenfrei zur Verfügung gestellt wird. Im Gegensatz zu einer SQL-Datenbank gibt es keine Tabellen oder Zeilen. Stattdessen werden die Daten in Dokumenten gespeichert, die in Sammlungen organisiert sind. 
Jedes Dokument enthält eine Reihe von Schlüssel/Wertpaaren, sogenannten Feldern. In dieser Anwendung wurden zwei Sammlungen erstellt, in denen die Daten gespeichert werden. In der `Benutzer`-Sammlung werden alle registrierten Benutzer als Dokumente gespeichert. Jedes Dokument, also jeder Benutzer besitzt ein Feld für den Benutzername, ein Feld für das Passwort, das in verschlüsseltem Format gespeichert ist und ein Feld für die Emailadresse.
In der `Passwoerter`-Sammlung werden die Passwörter als Dokumente gespeichert. Die Titel der Dokumente sind zufällig generierte IDs der Passwörter, damit diese nicht bei einem Blick auf die Datenbank direkt zuzuordnen sind. Jedes Dokument, also jedes Passwort besitzt ein Feld für die Beschreibung, ein Feld für das verschlüsselte Passwort, ein Feld für den Sicherheitswert und ein Feld für den Benutzernamen, zu dem das Passwort gehört. Tatsächlich ist es `nicht möglich, die Passwörter in der Datenbank auszulesen.` Um die verschlüsselten Passwörter zu entschlüsseln wird das passende Masterpasswort benötigt. Da dieses nicht in der Datenbank gespeichert wird und somit nur der Nutzer selbst kennt, ist dieser Passwortmanager einer der sichersten.
Selbst wenn jemand Zugriff auf die Datenbank hätte, könnte er nicht die Passwörter entschlüsseln. Die Entschlüsselung findet komplett im Frontend statt.

| Sammlungen (VergissMeinNicht) | Dokumente (Benutzer)  | Felder (guter_passant679)  |
|---|---|---|
| Benutzer |guter_passant679, <br />  AndreasNikita909, <br /> NXKITAVATA4BIRA2                                                                                          |benutzername: guter_passant679 ; <br /> email: guter_passant@gmail.com; <br /> passwort: HaMsterrad88 |

|Sammlungen (VergissMeinNicht) | Dokumente (Passwort)  | Felder (Hbe83jdFrB4brk+Hdue38)  |
|---|---|---|
|Passwörter | Hu9dGerT47+lIKBez62bV, <br /> Hbe83jdFrB4brk+Hdue38, <br /> Zudl09ASv5FbnB7Uq9JbY, <br />  JkIol9u78Vbuehb7qwvGb| benutzername: guter_passant679; <br /> Beschreibung: Twitter; <br /> sicherheitswert: NOKDefo5HgBef34fRG579; <br /> verschüsseltes Passwort: EL09jd83mBn34U5newoWSSwmf51 |

## Die Grundfunktionen für die Arbeit mit Firestore

Um mit der Firestore-Datenbank kommunizieren und Operationen durchführen zu können, werden Funktionen zum Lesen, Hinzufügen, Aktualisieren und Löschen von Daten aus der Datenbank definiert. 

<details>
<summary>Nähere Informationen</summary>
   
```javascript      
// Die Funktion zum Schreiben nimmt als Eingabe:
// (Datenbank (datenbank), sammlung - zu der die Daten hinzugefuegt werden soll, die ID - die zur Identifizierung des Dokumentes dient.
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
   
Die Funktion `datenHinzufuegen` dient zum Speichern neuer Daten in der Datenbank. Die Funktion muss mit der Firestore-Datenbank, der Sammlung, die die Daten enthält, und den Daten selbst als Parameter aufgerufen werden. Optional auch eine ID angegeben werden, die das Dokument identifiziert. Wenn keine ID angegeben wird, wird automatisch eine zufällige ID generiert. Die `datenLesen`-Funktion wird verwendet, um Daten aus der Datenbank abzurufen. Die Funktion sollte mit der Firestore-Datenbank, der Sammlung und der ID des Dokuments aufgerufen werden, dessen Daten abgerufen werden. 
Die Dokumentendaten werden im JSON-Format zurückgegeben.
Die Funktion `datenAktualisieren` dient zum Aktualisieren der Daten in der Datenbank. Die Funktion muss mit der Firestore-Datenbank, der Sammlung, der ID des zu aktualisierenden Dokuments und den zu aktualisierenden Daten aufgerufen werden. Daraufhin werden die Daten des Dokuments überschrieben.
Die Funktion „datenLoeschen“ dient zum Löschen von Dokumenten aus der Datenbank. Diese Funktion muss mit der Firestore-Datenbank, der Sammlung und der ID des zu löschenden Dokuments aufgerufen werden. Daraufhin wird das Dokument unwiderruflich gelöscht.
  
</details>  
</details>   
   
<details>
<summary><h2>Router</h2></summary>

Die Routing-Funktionalität spielt im Backend eine große Rolle. Durch sie ist es möglich verschiedene Routen aufzustellen, die unterschiedliche HTTP-Anfragen verarbeiten. Für das Erstellen der Router wird das Express Framework für Node.js verwendet. Mit Express können HTTP-Anfragen und -Antworten effizient verarbeitet werden und zur Automatisierung Routen definiert werden.
Routen sind Pfade, die in der URL angegeben werden, wie beispielsweise `/anmeldung` oder `/registrierung` und definieren, welche Funktionen oder Aktionen aufgerufen werden sollen, wenn eine Anfrage auf diesem Pfad erfolgt.
Router ermöglichen eine Definition dieser Routen und die Weiterleitung eingehender Anfragen an die entsprechenden Funktionen und Aktionen.
   
## Der Authentifizierungsrouter
   
 ![carbon (19)](https://user-images.githubusercontent.com/111282979/230934221-4e84eb06-a465-4486-ae88-603e2294bc50.png)
   
Authentifizierungsverwaltungsfunktionen wie Anmeldung, Registrierung, Passwortaktualisierung, Kontolöschung und E-Mail-Aktualisierung werden eingegeben.
Dann werden Routen definiert, indem Verwaltungsfunktionen mit HTTP-Methoden und -Pfaden verknüpft werden.
Die Funktion `anmeldung` wird mit dem Pfad `/anmeldung` und der HTTP-POST-Methode verknüpft. Um diese Funktion aufzurufen muss also eine POST Anfrage an `/authentifizierung/anmeldung` gesendet werden.
Für jede Funktion wird eine HTTP-POST-Methode mit dem entsprechenden Pfad definiert, auf den die Anwendung antworten soll.
Schließlich wird der Router zur Verwendung in der Hauptanwendung exportiert.
Sobald dieser in der Anwendung importiert und definiert ist, 
   
## Der Passwortrouter
   
 ![carbon (20)](https://user-images.githubusercontent.com/111282979/230936231-742f79dd-7c69-4407-bdf6-1ca340854c13.png)
   
 Die Verwaltungsfunktionen werden aus der Verwaltung importiert. Diese Funktionen sind für das Hinzufügen, Entfernen und Extrahieren von Passwörtern aus der Datenbank verantwortlich.
Für das Hinzufügen eines Passwortes wird der Standardpfad `/` mit der Funktion `passwortHinzufuegen` und der HTTP-POST-Methode verknüpft.
Für das Löschen eines Passwortes wird ebenfalss der Standardpfad `/` verwendet. Dieser wird jedoch mit der Funktion `passwortLoeschen` und der HTTP-DELETE-Methode verknüpft.
So kann ein Passwort hinzugefügt werden, wenn eine POST-Anfrage mit dem Passwort an den Standardpfad `/` gesendet wird und ein Passwort gelöscht werden, wenn eine DELETE-Anfrage mit der ID des zu löschenden Passwortes an den Standardpfad `/` gesendet wird. Die Passwort-ID wird als Parameter in der URL übergeben. 
Um alle Passwörter abzurufen, sodass diese im Frontend in der Passwörter-Tabelle angezeigt werden, muss an den Standardpfad `/` eine GET-Anfrage gesendet werden.
Mit dem Standardpfad `/` und der HTTP-GET-Methode ist die Funktion `allePasswoerter` verknüpft.
Schließlich wird der Router zur Verwendung in der Hauptanwendung exportiert.

</details>

<details>
<summary><h2>Vermittlung</h2></summary>
   
   Die Vermittlung, auch bekannt als Middleware, spielt in der Verwendung von Express und Node.js eine wichtige Rolle. Funktionen in der Vermittlung werden im Ablauf der Express-Anwedung dazu verwendet, um HTTP-Anfragen und -Antworten zu verarbeiten, bevor sie an die entsprechenden Routen weitergeleitet werden.
   Die Vermittlung bietet eine flexible Möglichkeit, die Anfrage- und Antwortobjekte in Express zu manipulieren und erweiterte Funktionalitäten hinzuzufügen.
   
## Die Überprüfung der Authentifizierung 

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
   
Diese Vermittlungsfunktion wird verwendet, um die Benutzerauthentifizierung mit einem JSON-Web-Token (JWT) zu überprüfen.
Die Funktion wird zwischen Anfrage und Antwort in der HTTP-Anfragekette eingefügt, um die Benutzerberechtigungen zu überprüfen, bevor die Anfrage an den Router weitergeleitet wird. 
Zunächst wird der Authorization-Header aus der HTTP-Anforderung, der das JWT enthält, extrahiert. Wenn der Header fehlt oder leer ist, ist der Benutzer nicht authentifiziert und die Anfrage wird weiterverarbeitet. 
Wenn ein Token vorhanden ist, wird das Token aus dem Header extrahiert und durch die Entschlüsselung unter Verwendung des unter TOKEN_SECRET gespeicherten geheimen Schlüssels verifiziert. Wenn das Token ungültig ist oder die Entschlüsselung fehlschlägt, zählt der Benutzer als nicht authentifiziert und die Anfrage wird weiterverarbeitet. 
Wenn das Token jedoch erfolgreich verifiziert und entschlüsselt wird, ist der Benutzer authentifiziert und das Attribut der Anfrage `req.authentifizierungsUeberpruefung` wird auf `true` gesetzt. Zusätzlich wird der Benutzername aus dem Token extrahiert und als Attribut `req.benutzername` der Anfrage hinzugefügt. Daraufhin wird der nächste Code oder die nächste Vermittlungsfunktion aufgerufen. 
Deshalb ist die Vermittlungsfunktion ein wichtiger Bestandteil des sicheren und authentifizierten Webanwendungs-Stacks, da sie sicherstellt, dass nur authentifizierte Benutzer auf die bestimmte Funktionen zugreifen können, die durch Validierung und Dekodierung des JWT-Tokens identifiziert werden.
   
## Die Verbindung mit dem Firestore
   
   ![carbon (22)](https://user-images.githubusercontent.com/111282979/230939931-4bb35db0-94e4-42e8-b889-490689298a2c.png)

Die Vermittlungsfunktion ermöglicht, durch das Erzeugen einer Firestore-Instanz, den nachfolgenden Routen oder Vermittlungsfunktionen auf die Firestore-Datenbank zuzugreifen und Operationen daran durchzuführen. Dafür wird das Firebase Admin-SDK-Modul importiert und durch `admin.initializeApp()` initialisiert. Dadurch wird eine Verbindung zum Firebase-Projekt hergestellt werden.

```javascript
const firestore_datenbank = admin.firestore() 
```
   
Daraufhin wird eine Firestore-Instanz erzeugt und `firestore_datenbank` zugewiesen. Über diese Variable kann auf die Datenbank zugegriffen werden.
In der Vermittlungsfunktion wird dem Anfrageobjekt `req` die Firestore-Instanz hinzugefügt.
   
```javascript
req.firestore = firestore
```

Dadurch können in den nachfolgenden Routen oder Vermittlungsfunktionen auf die Firestore-Datenbank zugegriffen werden. Daraufhin wird die der nächste Code oder die nächste Vermittlungsfunktion angehängt und die Anfrage kann weiterverarbeitet werden.
   
</details>   

<details>
<summary><h2>Die Verwaltung</h2></summary>
   
Die Verwaltung ist der wichtigste Teil im Backend. Hier werden die Funktionen zur Authentifizierungs- und Passwortverwaltung definiert, wodurch Aktionen wie die Anmeldung oder das Hinzufügen eines neuen Passwortes durchgeführt werden können. 
   
<details>
<summary><h3>Die Authentifizierungsverwaltung</h3></summary>
 
   Die Authentifizierungsverwaltungsfunktionen behandeln alle Anfragen, die sich mit dem Benutzerkonto befassen. Von der Anmeldung, über die Emailaktualisierung bis hin zum Löschen des Accounts, wird alles hier verwaltet.
   Dafür werden drei Module importiert, die für die essenziell sind. Mit [Joi](https://joi.dev/) lassen sich Schemata und Formate festlegen, in denen Daten in Javascript validiert werden. Dadurch ist es direkt möglich, Anfragen, die nicht dem festgelegten Format entsprechen, abzufangen, wodurch Fehler im Server verhindert werden.
   Für unsere Tokens nutzen wir [JSON-Web-Tokens (JWT)](https://jwt.io/), da diese von sich aus bereits digitale Signaturen und Vershlüsselungen verwenden, um die Authentizität der Daten zu gewährleisten. So kann sichergestellt werden, dass die Daten nur von dieser vertrauenswürdigen Quelle stammen und nicht von Dritten manipuliert wurden.
   Es werden auch keine Zustände gespeichert, da alle notwendigen Informationen im Token selbst enthalten sind.
   Zudem sind JWT kompakte Strings, die einfach in HTTP-Headern eingebettet werden können. So sind sich leicht zu übertragen und verarbeiten.
   Für die Verschlüsselung nutzen wir die [Bcrypt-Hashfunktion](https://www.npmjs.com/package/bcryptjs). Diese zeichnet sich durch ein langsames Hashing-Verfahren aus, das besonders Brute-Forcing von Passwörtern erschweren soll. Jedem Passwort-Hash wirt ein Salt, eine zufällige Zeichenkette, hinzugefügt, um die Wiederholung des Hashes zu verhindern.
   Bcrypt Passwörter sind somit sehr schwer zu cracken und deshalb in unserem Fall, als Passwortschützer Nr. 1, genau die richtige Wahl.
 
   ## Die Registrierung
   
 ```javascript
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
```

Eine Anfrage zur Registrierung muss im Format (benutzername, passwort, email) eintreffen. Dieses Format ist zwingend, was durch die Joi-Methode `required()` ausgedrückt. Benutzername, Passwort und Email werden aus dem Message-Body der Anfrage entnommen und als freie Variablen gespeichert.
Daraufhin wird überprüft, ob diese Daten dem vorgegebenen Format entsprechen. Wenn dies nicht der Fall ist, wird der Status 0 und die Fehlermeldung zurückgegeben.
Wenn das Format jedoch stimmt, wird in der Firestore-Datenbank nach dem eingegebenen Benutzernamen gesucht. Falls dieser bereits existiert, wird eine Fehlermeldung zurückgegeben, dass der Benutzer bereits existiere.
Wenn der Benutzer noch nicht existiert, wird in der Sammlung `Benutzer` in der Datenbank ein neuer Benutzer, bzw. neues Dokument angelegt. Die ID des Dokuments ist der Benutzername und als Felder werden: Der Benutzername, die Emailadresse und das der Passwort-Hash hinzugefügt.
Das Passwort wird mit einem zufälligen, 12-stelligen Salt gehashed.
Wenn die Registrierung des Nutzers erfolgreich war, wird dies durch den Status 1 und eine Erfolgsmeldung zurückgegeben.
 
## Die Anmeldung
 
```javascript
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
```

Bei der Anmeldung wird das Format (Benutzername, Passwort) festgelegt, in dem die Anfrage erfolgen muss. Benutzername und Passwort werden aus dem Message-Body der Anfrage entnommen und das Format wird validiert. Bei einem Fehler wird der Status 0 und die Fehlermeldung zurückgegeben.
Wenn das Format stimmt, wird überprüft, ob der eingegebene Benutzername in der Datenbank existiert. Wenn nicht, wird ebenfalls ein Status 0 und eine Fehlermeldung, dass der Benutzer ja nicht existiere, zurückgegeben.
Wenn der Benutzername jedoch in der Datenbank auffindbar ist, werden die gespeicherten Daten abgerufen und über `bcrypt.compareSync()` das Passwort mit dem Passworthash verglichen. Wenn das eingegebene Passwort mit dem gespeicherten aus der Datenbank übereinstimmt, wird ein JWT aus dem Benutzernamen, der Email und dem geheimen Schlüssel mit einer Gültigkeit von einer Stunde generiert. Dieses wird daraufhin mit dem Status 1 zusammen zurückgegeben. So kann sich der Nutzer daraufhin im Frontend anmelden, bzw. authentifizieren.
Wenn das eingegebene Passwort nicht mit dem gespeicherten aus der Datenbank übereinstimmt, wird der Status 0 und die Fehlermeldung, dass das Passwort inkorrekt sei, zurückgegeben.

## Die Aktualisierung des Passwortes

```javascript
exports.passwortAktualisieren = async (req, res) => {
    // Dafuer ist erstmal wichtig, dass der Benutzer in dem Moment authentifiziert ist.
    // Wie die Autorisierungsabfrage "authentifizierungsUeberpruefung" genau funktioniert, wird in "../Vermittlung/authentifizierungsUeberpruefung" erklärt.
    if (!req.authentifizierungsUeberpruefung) {
        return res.status(400).send({ status: 0, message: "Nicht authentifiziert." })
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
    const benutzer = benutzerDatenAbrufen(b.data())

    // Daraufhin wird das alte Passwort mit dem aus der Datenbank verglichen.
    if (bcrypt.compareSync(altesPasswort, benutzer.passwort)) {
        // Wenn die beiden gleich sind, wird eine wird das neue Passwort in der Datenbank gespeichert.
        await datenAktualisieren(req.firestore, 'benutzer', req.benutzername, { passwort: bcrypt.hashSync(neuesPasswort, 12) })

        // Der Server setzt den Status auf 1 und gibt diesen zurück. (Status 200 (OK))
        return res.status(200).send({ status: 1 })
    // Wenn die beiden nicht gleich sind, wird eine Fehlermeldung und der Status 0 zurückgegeben. (Status 400 (Bad-Request))
    } else {
        return res.status(400).send({ status: 0, message: `Das ist nicht das alte Passwort!`, })
    }
}
```

Der Service, den wir dem Nutzer bieten, bestimmt, welche Einstellung dieser gegenüberer unserem Passwort Manager hat. Somit ist es selbstverstädnlich, dass jeder die Möglichkeit haben sollte, das Passwort seines Accounts beliebig oft ändern zu können. In der Funktion zur Aktualisierung des Passwortes hier in der Verwaltung wird dafür zuerst sichergestellt, dass der Benutzer authentifiziert ist. Wenn die Authentifizierung nicht bestätigt werden kann, wird der Status 0 und eine Fehlermeldung, dass der Nutzer nicht authentifiziert sei, zurückgegeben.
Das Format, in dem die Anfrage erfolgen muss, besteht aus dem alten Passwort und dem neuen Passwort.
Wenn das Format durch die Daten aus dem Message-Body validiert werden kann, wird sichergestellt, dass der Benutzer in der Datenbank existiert.
Sollte das Format der Anfrage nicht stimmen oder der Benutzer nicht existieren, werden auch hier jeweilige Fehlermeldungen und Status 0 zurückgegeben.
Wenn also nun das Format stimmt und der Benutzer existiert, werden die Daten des Benutzers abgerufen und das eingegebene alte Passwort mit dem aus der Datenbank verglichen. Bei Übereinstimmung, wird das alte Passwort in der Datenbank mit dem neuen überschrieben und der Status 1 zurückgegeben.
Sollten das alte Passwort aus der Anfrage nicht mit dem aus der Datenbank übereinstimmen, werden der Status 0 und die Fehlermeldung, dass das eingegebene alte Passwort inkorrekt sei, zurückgegeben.

## Die Aktualisierung des Passwortes

```javascript
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
```

Die Aktualisierung der Emailadresse läuft ähnlich wie die des Passwortes ab. Hierbei muss keine alte Emailadresse in der Anfrage übergeben werden, da die aktuelle Emailadresse sowieso in den Accounteinstellungen angezeigt wird. Wenn der Benutzer authentifiziert ist, beinhaltet das Format lediglich eine gültige Emailadresse oder einen leeren String, da der Nutzer seine Emailadresse nur zur Registrierung und danach nicht mehr zwingend angeben muss.
Sollte die Anfrage nicht dem angegebenen Format entsprechen, wird der Status 0 und die Fehlermeldung zurückgegeben. Ansonsten wird die gespeicherte Emailadresse in der Datenbank mit der neuen überschrieben und ein neues Token erzeugt, da sich dieses aus Benutzernamen, Email und dem geheimen Schlüssel zusammensetzt. 
Dieses neue Token wird gemeinsam mit dem Status 1 zurückgegeben.

## Den Account löschen

```javascript
exports.accountLoeschen = async (req, res) => {
    
    // Dafür muss auf jeden Fall sichergestellt werden, dass der Benutzer authentifiziert ist.
    if (!req.authentifizierungsUeberpruefung) {
        // Wenn dies nicht der Fall ist, wird eine Fehlermeldung zurückgegeben.
        return res.status(400).send({ status: 0, message: "Nicht authentifiziert!" })
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

Wenn der Nutzer, aus welchem Grund auch immer, seinen Account löschen möchte, bieten wir ihm auch hierfür die Möglichkeit. Wenn der Benutzer authentifiziert ist, werden alle Passwörter, die unter seinem Benutzernamen in der Datenbank gespeichert sind, unwiderrufbar gelöscht und daraufhin auch der Benutzer aus der Datenbank entfernt.
Als Antwort wird der Status 1 zurückgegeben, wodurch signalisiert wird, dass der Account und alle damit verbundenen Passwörter erfolgreich aus der Datenbank gelöscht wurden.

</details>

<details>
<summary><h3>Die Passwortverwaltung</h3></summary>
   
   Die Passwortverwaltungsfunktionen behandeln alle Anfragen, die sich mit den Passwörtern eines Benutzers befassen. Vom Abrufen aller Passwörter, über das Hinzufügen bis hin zum Löschen eines Passwortes, wird alles hier verwaltet.
   Anders als bei der Authentifizierungsverwaltung wird hier lediglich [Joi](https://joi.dev/) genutzt, um die benötigten Formate festzulegen, in denen Daten in Javascript validiert werden. Da keine Operationen am Benutzer durchgeführt werden, wird weder mit JWT noch mit Bcrypt gearbeitet.
   Für die Verarbeitung werden lediglich die standardmäßigen Datenbankfunktionen und die Funktion zum Abrufen der Passwortdaten aus der Datenbank importiert.
   
## Das Hinzufügen eines Passwortes
   
```javascript 
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
```
   
Um ein Passwort der Datenbank hinzuzufügen, werden, nachdem sichergestellt wurde, dass der Nutzer authentifiziert ist, drei Eingaben erwartet, die im Format festgelegt sind. Es wird eine Beschreibung des Passwortes, das mit dem Masterpasswort verschlüsselte Passwort und ein Sicherheitswert benötigt.
Wenn das Format mit der Anfrage übereinstimmt, werden die Daten der Sammlung `passwoerter` in der Datenbank hinzugefügt.

```javascript
const passwort = await datenHinzufuegen(req.firestore, 'passwoerter', null, { beschreibung, verschluesseltesPasswort, sicherheitswert, benutzername: req.benutzername })   
```

Als ID des Dokuments wird `null` eingegeben. Dadurch generiert Firestore automatisch eine zufällige Zeichenkette, die als ID des Dokuments, bzw. des Passwortes genommen wird. Dadurch sind die Passwörter bei einem Blick auf die Datenbank nicht ihren Benutzern oder Beschreibungen zuzuordnen. Zudem kann die ID auch nicht auf Basis der Passwortdaten erraten werden.
Als Antwort wird der Status 1 und ein Passwortobjekt, bestehend aus: Id, Beschreibung, verschlüsseltem Passwort, Sicherheitswert und Benutzernamen zurückgegeben. Dazu auch noch eine Erfolgsmeldung, dass das Passwort erfolgreich gespeichert wurde. 
   
## Ein Passwort löschen
   
```javascript
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
```
   
Wenn nun ein Passwort gelöscht werden soll, kann auf die zufällig generierte Passwort-ID zurückgegriffen werden. Da diese zufällig und einzigartig ist, muss die Anfrage lediglich diese ID enthalten. 
   
Allerdings wird nicht einfach die ID in der Anfrage gelöscht, da bisher durch `authentifizierungsUeberpruefung` lediglich überpüft wurde, ob der Benutzer ein gültiges Token besitzt und somit authentifiziert ist.
Da ein Nutzer aber keine Passwörter anderer Nutzer löschen darf, wird noch überpüft, ob das Passwort überhaupt dem Benutzer gehört, der es gerne löschen würde.
   
```javascript
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

Dazu wird die Funktion `validierungPasswortBenutzername` definiert, die eine Anfrage und eine Id als Parameter nimmt. Zuerst wird sichergestellt, dass das Passwort, dessen ID in der Anfrage steht, überhaupt in der Datenbank existiert. Wenn nicht, wird `false` zurückgegeben und das Passwort kann nicht gelöscht werden.
Wenn es jedoch existiert, werden die Daten des Passwortes abgerufen und der Benutzername, der unter dem Passwort in der Datenbank gespeichert ist, mit dem Benutzernamen, von dem die Anfrage zum Löschen stammt, verglichen. Wenn der Benutzername gleich ist, wird `true` zurückgegeben und das Passwort wird gelöscht.

```javascript
await datenLoeschen(req.firestore, 'passwoerter', passwortId)
```
Daraufhin wird der Status 1 und eine Erfolgsmeldung zurückgegeben.
   
Sollten die Benutzernamen der Anfrage und des Passwortes aus der Datenbank nicht übereinstimmen, gibt die Funktion `validierungPasswortBenutzername` `false` zurück und das Passwort kann nicht gelöscht werden.
   
   
## Das Abrufen aller Passwörter
   
```javascript
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
```  

Damit alle gespeicherten Passwörter des Benutzers im Frontend in der Passwörter-Tabelle angezeigt werden können, müssen diese aus der Datenbank abgerufen werden.
Darum kümmert sich diese Passwortverwaltungsfunktion. Wenn sichergestellt ist, dass der Nutzer authentifiziert ist, werden alle Passwörter des Benutzers aus der Datenbank abgerufen. In einem leeren `passwoerterArray` werden die Passwörter als Objekte mitsamt ihrer ID gespeichert.
Daraufhin wird der Status 1 und der `passwoerterArray` zurückgegeben.
   
</details>  
</details> 
   
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
```

Nun sind alle Funktionen, Routen und Schritte der Bearbeitung der Anfragen definiert und festgelegt.
Das Backend ist somit fertig und muss nur noch als Express-App erstellt werden, damit es als Google Cloud-Funktion exportiert werden kann.
Die Anwendung verwendet das Firebase Functions-Modul, Cross-Origin Resource Sharing (CORS) und lädt Umgebungsvariablen mit dotenv. 
So ist auch sichergestellt, dass auf den geheimen Schlüssel, zum Erstellen der Tokens zugegriffen werden kann.
Die Authentifizierungsüberprüfung die Firestore-Datenbank werden auch.
Die beiden Router, Passwortrouter und Authentifizierungsrouter werden an den Endpunkten bei /passwort und /authentifizierung verwendet. 
Um sich sich anzumelden, muss somit eine Anfrage an `/authentifizierung/anmeldung` erfolgen.
Als Datenformat wird JSON verwendet und die CORS-Einstellung ist auf `origin: true` gesetzt, um den Zugriff von anderen Domänen aus zu erlauben.
Ohne diese Einstellung wäre ein Zugriff auf die Anwendung vom Frontend aus gar nicht möglich.
Schließlich kann die Express-App als Firebase-Cloudfunktion exportiert, die auf HTTP-Anfragen antwortet.
   
</details> 

<details>
<summary><h1>Reflexion<h1></summary>
 
Während unseres Projekts haben wir wertvolle Lektionen gelernt, die uns nicht nur in der Informatik, sondern auch in vielen anderen Lebensbereichen von großem Nutzen sein werden. Eine der ersten Herausforderungen, der wir uns stellen mussten, war ein effektives Zeitmanagement. In einem Umfeld mit knappen Fristen war es entscheidend, unsere Aufgaben sorgfältig zu planen und zu priorisieren, um unsere Zeit optimal zu nutzen und unsere Ziele zu erreichen. Durch die Beherrschung dieser Fähigkeit konnten wir unsere Produktivität steigern und das Projekt erfolgreich abschließen.

Im Bereich Frontend haben wir React und Redux erfolgreich eingesetzt, um eine ansprechende und benutzerfreundliche Oberfläche für unseren Passwortmanager zu erstellen. Mit React konnten wir effizient wiederverwendbare UI-Komponenten erstellen und diese nahtlos in unsere Anwendung integrieren. Redux ermöglichte uns ein zentralisiertes State-Management, um den Datenfluss und das State-Management in unserer Anwendung zu koordinieren. Durch den Einsatz dieser Technologien konnten wir eine moderne und reaktionsschnelle Benutzeroberfläche erstellen, die den Benutzern eine angenehme Erfahrung bietet.

Im Backend haben wir uns für eine Google Cloud Function mit Node.js und Express entschieden, um unsere RESTful API für den Passwortmanager zu implementieren. Node.js bietet uns eine effiziente und skalierbare Plattform für die Entwicklung serverseitiger Logik, während Express ein beliebtes und leistungsfähiges Web-Framework für Node.js ist, das uns bei der Erstellung von RESTful-Endpunkten geholfen hat. Durch den Einsatz von Google Cloud Functions konnten wir unsere API in einer serverlosen Umgebung bereitstellen und von den Vorteilen der Skalierbarkeit und des automatischen Infrastrukturmanagements profitieren. Wir haben auch verschiedene Sicherheitsaspekte berücksichtigt, wie zum Beispiel die Implementierung von Authentifizierung und Autorisierung, um sicherzustellen, dass der Passwortmanager geschützt und sicher ist.

Die Kombination von React und Redux für das Frontend und Node.js mit Express für das Backend ermöglichte uns eine effiziente Kommunikation zwischen Frontend und Backend, um Benutzeranfragen zu verarbeiten und die benötigten Daten zu speichern und abzurufen. Wir haben RESTful API-Endpunkte erstellt, die CRUD-Operationen (Hinzufügen (create), Lesen (read), Aktualisieren (update), Löschen (delete)) für Benutzerkonten und Passwörter unterstützen und sicherstellen, dass die Daten konsistent und sicher verwaltet werden.

Wir haben auch verschiedene Tools und Technologien eingesetzt, um den Entwicklungsprozess zu verbessern, wie z.B. Versionskontrolle mit Git, automatisiertes Testen und Deployment in eine Entwicklungs- und Produktionsumgebung. Dies hat uns geholfen, den Entwicklungsprozess effizient zu gestalten und die Qualität und Stabilität unserer Anwendung sicherzustellen. Insgesamt konnten wir durch die Entwicklung dieses Full-Stack Passwort Managers mit React, Redux, Node.js, Express und Google Cloud Functions wertvolle Erfahrungen sammeln und unsere Fähigkeiten in den Bereichen Frontend- und Backend-Entwicklung, Datenbank-Management, API-Design und DevOps verbessern. Diese Erfahrungen werden uns in zukünftigen Projekten und Karrieremöglichkeiten von großem Nutzen sein und uns helfen, erfolgreich in der Welt der Softwareentwicklung zu agieren.

Ein weiterer wichtiger Aspekt unseres Projekts war die Arbeit mit verschiedenen Programmen wie Adobe Photoshop und Adobe After Effects. Um qualitativ hochwertige Designs und Animationen zu erstellen, mussten wir uns schnell mit diesen Tools vertraut machen und neue Fähigkeiten erlernen. Durch die aktive Teilnahme an Schulungen und Übungen konnten wir unser Wissen und unsere Fähigkeiten im Umgang mit diesen Programmen erweitern. Durch ständiges Üben und Testen verbesserten wir unsere Fähigkeiten und sind nun in der Lage, professionelle Grafiken und Animationen zu erstellen. Diese Fähigkeiten haben nicht nur unser technisches Wissen erweitert, sondern auch unser Selbstvertrauen gestärkt.

Eine weitere Herausforderung war, dass wir oft isoliert arbeiten mussten, was unsere organisatorischen Fähigkeiten auf die Probe stellte. Wir haben jedoch gelernt, wie man eine effektive Kommunikation und Koordination innerhalb des Teams aufrechterhält, um sicherzustellen, dass alle an einem Strang ziehen und die Arbeit fristgerecht erledigt wird. Wir haben Kommunikations- und Projektmanagementwerkzeuge eingesetzt, um unsere Zusammenarbeit zu verbessern und unsere Ziele erfolgreich zu erreichen.

Die Reflexion unserer Erfahrungen in diesem Projekt hat unsere Fähigkeit zur Selbstreflexion gestärkt. Wir haben gelernt, dass es wichtig ist, offen für neue Herausforderungen zu sein und bereit, in verschiedene Fähigkeiten zu investieren, um in Projekten erfolgreich zu sein. Unsere Fähigkeit, effektiv mit verschiedenen Programmen zu arbeiten, unsere Programmierkenntnisse zu erweitern und unsere organisatorischen Fähigkeiten zu verbessern, wird uns in unserem zukünftigen Berufs- und Privatleben von großem Nutzen sein.

Wir sind stolz auf das, was wir erreicht haben und fühlen uns nun besser für zukünftige Projekte gerüstet, da wir unsere Fähigkeiten und Kenntnisse in vielen verschiedenen Bereichen verbessert haben. Die Herausforderungen haben uns als Team zusammengeschweißt und gezeigt, dass wir gemeinsam Großes erreichen können. Wir sind zuversichtlich, dass die Erfahrungen und Fähigkeiten, die wir in diesem Projekt gesammelt haben, uns bei vielen zukünftigen Herausforderungen helfen werden und wir diese mit Bravour meistern werden.

</details>

## Eigenständigkeitserklärung

Hiermit erklären wir, dass das Projekt selbstständig bearbeitet wurde und keine anderen als die angegebenen Quellen benutzt wurden. 
Ahrensburg, den 05. Mai 2023 
Laurenz Brause und Daniel Pauli

## Autoren

- [Laurenz Brause](https://www.github.com/algerr)
- [Daniel Pauli](https://github.com/daniel10011011)

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons Lizenzvertrag" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />`Dieses Werk ist lizenziert unter einer:` <br>
<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">`Creative Commons Namensnennung` - `Nicht kommerziell` - `Keine Bearbeitungen 4.0 International Lizenz`</a>
