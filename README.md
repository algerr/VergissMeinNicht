# Vergiss Mein Nicht
Sind Sie genervt von der ewigen Suche nach dem Passwort? Wir haben die Lösung!

Wie wir es bereits in unseren Blogeinträgen erwähnt hatten, war seit dem 14.03.2023 unser oberstes Ziel bis zu den Osterferien einen Passwort Manager zu entwickeln, welcher es den Nutzern im Internet erleichern sollte einen richtigen Umgang mit den Plattformen, welchen sie nutzen, zu erlernen. Vor allem sollten die Menschen von nun an Sicherheit geboten bekommen, damit Hacker so gut wie keine Chance mehr haben sollten, Daten anderer Menschen zu stehlen. Gerade Unternehmen, die mit mehreren Passwörtern innerhalb des Internets arbeiten, können sehr von so einer Idee provitieren. Auch das es ein Tool geben sollte, welches ganz von alleine Passwörter generiert, die absoulut sicher sind, wäre ebenfalls nur von Vorteil. Die erste Grundidee war es also zunächst einmal ein Passwort zu erstellen, welches die anderen Passwörter, die man hat, mit Hilfe einer Verschlüsselung, schützt. Insofern sollte dieses Konzept der 2FA Authentifizierung ähneln, die ebenfalls eine weit verbreitete Möglichkeit ist, Daten bzw. Accounts zu schützen, indem eine zusätzliche Sicherheitsmaßnahme wie eine Bestätigung über die Email einbaut. 

# Planskizzen

## Hauptthema

![image](https://user-images.githubusercontent.com/65679099/224968022-85e0eebb-76bc-40d6-9e07-5ef4b873ab5b.png)

Bevor wir mit der eigentlichen Programmierung loslegten, gingen wir zunächst in die Plannungsphase über, da es immer sinnvoll ist, ersteinmal grob zu skizzieren was man eigentlich vor hat, um im Nachhinein Einzelheiten abzuändern und gegebenfalls etwas wegzulassen oder zu verbessern. Wie in der ersten Skizze zu erkennen, sollen das die groben Kriterien sein, nach welchen unserer fertige Website geplannt werden soll. Zu aller erst sollte unsere Webside natürlich über eine Funktion verfügen, um das Profil bzw. die damit verbundenen Einstellungen zu verwalten. Unter dem Profil Icon soll der Nutzer also die Möglichkeit haben sein Passwort von dem Programm selbst oder auch seine Email zu verändern. Auch sollte es hier die Möglichkeit geben z.B. seinen Account löschen zu können. Das Herzstück unseres Programms sollte nun das Masterpasswort selbst sein, welches wie zuvor erwähnt die anderen Passwörter, die man hat, durch die Verschlüsselung dieser schützen sollte. Neben der Festlegung des Masterpassworts sollte man auch die Möglichkeit haben hier seine aufgelisteten Passwörter, die man normalerweise für die einzelnen Plattformen hat, aufzulisten. Die einzelnen Passwörter, die hier aufgelistet werden, könnten aber nur dann eingesehen werden, wenn das richtige Masterpasswort eingegeben wurde. Als kleine Erlechterung wollten wir darüberhinaus noch den Nutzern die Möglichkeit geben ihre geschützten Passwörter zu kopieren, um sie direkt irgendwo einfügen zu können.

![image](https://user-images.githubusercontent.com/111282979/225117491-64072da5-64b7-4b18-a028-b2b119b8ffa3.png)

Bei dieser Skizze lässt sich schon erkennen, dass es sich hierbei um eine grobe Vorstellung handeln soll, wie das Fenster aussehen soll, wenn man einen Account für unsere Webside erstellen möchte. Wenn man durch seine Email und sein Passwort sich bei unserem Programm registriert hat, kann man sich hier auch danach gleichzeitig anmelden, um dann zu dem Hauptfenster zu gelangen, welches der vorher erläuterten Skizze entspricht. 

