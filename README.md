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

## Tänk på  
* Provkör innan du commitar
* Gör pull-requests och code reviews på koden
* Använd gitflow

## Upp till er
Jag har lagt in en linter, men för övrigt inte bestämt kodstandard...
