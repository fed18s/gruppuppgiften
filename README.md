# Gruppuppgift Medieinstituet

* Installera alla beroenden genom att köra `npm i`
* Starta servern i utvecklarläge genom att köra `npm run dev`

All logik ligger i filen `index.js`

## Provkör applikationen  
Några kommandon att testa med curl, för att se att det går att
hämta och skicka data:

Hämta alla katter:
`curl localhost:3000/cats`

Hämta katt nummer 0:
`curl localhost:3000/cat/0`

Sök efter en katt med namnet Aslan:
`curl localhost:3000/catSearch/name/Aslan`

Lägg till en katt:
`curl -X POST localhost:3000/cat \
 -H 'Content-Type: application/json' \
 --data '{"name": "Missan", "age": 5, "color": "Brown"}'`
 
## Uppgiften  
Er uppgift är att bygga ut den här applikationen, så att det
går att hämta och spara hundar och Pokémon också.

Ni kommer ganska snart upptäcka att koden blir rörig om ni har
allt i en fil, så klura ut ett lämpligt sätt att dela upp koden.

* Ni ska använda githubs system för pull requests när ni gör code reviews
* Ni ska dela upp koden i funktioner och/eller klasser

## Tänk på  
* Provkör innan du commitar
* Gör pull-requests och code reviews på koden
* Använd gitflow

## Upp till er
Jag har lagt in en linter, men för övrigt inte bestämt kodstandard...

## Bonusmaterial
Jag lägger till lite material här som eventuellt hjälper er att lösa
 uppgiften och/eller förstå vad som händer.

### Refaktorisera varsamt
Här är ett exempel på hur ni skulle kunna refaktorisera en av funktionerna.
 Det gäller anropet som i `index.js` ser ut så här:

```javascript
app.get('/cats', (req, res) => {
  return res.status(200).send({
    success: true,
    data: db.cats.all(),
  });
});
```

Det finns tre variabler i det här anropet: `app`, `'/cats'` och `db.cats`  
Mitt förslag är att vi provar att göra en funktion, där de här tre variablerna
 är parametrar. Då skulle det se ut så här:
```javascript
function registerGetAnimals(app, path, collection) {
  app.get(path, (req, res) => {
    return res.status(200).send({
      success: true,
      data: collection.all(),
    });
  });
}
```
Och själva anropet skulle se ut så här:
```javascript
registerGetAnimals(app, '/cats', db.cats);
```
Om ni tänker er att ni vill samla flera djurtyper i en array och göra
 anropet i en loop, så skulle det kunna se ut så här:

```javascript
const animals = [
  {type: 'cat', collection: db.cats},
  {type: 'dog', collection: db.dogs},
];

animals.forEach((animal) => {
  registerGetAnimals(app, '/' + animal.type + 's', animal.collection);
});
```

Och när ni går vidare så har ni alla möjligheter att komma på flera
 förbättringar (skulle det t ex vara bättre att mata in typen i
 registerGetAnimals och konstruera `path` inuti den funktionen?)

### En förklaring av vad Express gör

I filen `index.js` används ett ramverk för backend som heter `express.js`.
 I början av filen skapas en instans av express som heter `app`, och
 därefter görs anrop av metoder på `app`.
 
Metoderna som anropas heter `get`, `post` och `listen`. De här metoderna
 är lite olyckligt namngivna, för de kommer inte göra det som deras namn
 antyder: `get` kommer inte returnera ett värde och `post` kommer inte
 posta ett värde (däremot kommer `listen` säga åt `app` att börja lyssna).
 Det `get` och `post` gör istället, är att registrera en funktion som
 kommer anropas när en webbklient (en frontend) gör ett GET- eller
 POST-anrop till vår backend.

Här är en extremt förenklad klass som beskriver vad `app` egentligen
 sysslar med. Om den hjälper er att förstå så är det fint, men det här är
 inget ni behöver för att klara av uppgiften.

```javascript
class Express {
  constructor() {
    this.pathMatchForGet = [];
    this.pathMatchForPost = [];
  }

  get(path, callback) {
    this.pathMatchForGet.push[{path: path, callback: callback}];
  }

  post(path, callback) {
    this.pathMatchForPost.push[{path: path, callback: callback}];
  }

  listen(port, callback) {
    if (this.initializeHttpPort(port)) {
      callback();
    }
    else {
      throw(new Error('Port ' + port + ' already taken!'))
    }
    var nextEvent = null;
    while (nextEvent = this.retrieveNextEvent()) {
      if (nextEvent.type === 'GET') {
        var match = this.pathMatchForGet.find(item => this.matchPath(item.path, nextEvent.path));
        if (match) {
          match.callback(nextEvent);
        }
      }
      else if (nextEvent.type === 'POST') {
        var match = this.pathMatchForPost.find(item => this.matchPath(item.path, nextEvent.path));
        if (match) {
          match.callback(nextEvent);
        }
      }
    }
  }

  initializeHttpPort(port) {
    /* ... */
  }
  retrieveNextEvent() {
    /* ... */
  }
  matchPath(path1, path2) {
    /* ... */
  }
}
```
 