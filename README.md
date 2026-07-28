# Free City 3D

Free City speichert Benutzerkonten und Spielstaende online mit Node.js und PostgreSQL.

## Lokal starten

1. PostgreSQL bereitstellen und eine leere Datenbank erstellen.
2. `.env.example` nach `.env` kopieren.
3. In `.env` `DATABASE_URL` mit der Verbindungsadresse der Datenbank eintragen.
4. Einen zufaelligen Wert mit mindestens 32 Zeichen als `JWT_SECRET` setzen.
5. Abhaengigkeiten installieren und den Server starten:

```powershell
npm install
npm start
```

Danach das Spiel ueber `http://localhost:3000` oeffnen. Nicht mehr direkt als Datei oeffnen: `index.html` muss vom Server ausgeliefert werden.

Beim ersten Start legt der Server die Tabellen `users` und `game_saves` selbst an. PINs werden nur als Hash gespeichert. Der Browser behaelt keine dauerhafte Anmeldung und verlangt deshalb bei jedem Seitenaufruf Benutzername und PIN.

## Online bereitstellen

1. Ein PostgreSQL-Projekt bei einem Anbieter wie Neon, Supabase, Railway oder Render erstellen.
2. Dieses Projekt in ein Git-Repository laden und bei einem Node.js-Host bereitstellen.
3. Beim Host die Umgebungsvariablen `DATABASE_URL`, `JWT_SECRET` und `NODE_ENV=production` setzen.
4. Als Startbefehl `npm start` verwenden.

Der Server verwendet automatisch den vom Host gesetzten `PORT`.