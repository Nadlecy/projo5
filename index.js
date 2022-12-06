const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const jsonParser = bodyParser.json();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});

dbo.connectToServer();

app.get("/pokemon/list", function (req, res) {
    //on se connecte à la DB MongoDB
    const dbConnect = dbo.getDb();
    //premier test permettant de récupérer mes pokemons !
    dbConnect
      .collection("pokemon")
      .find({}) // permet de filtrer les résultats
      /*.limit(50) // pourrait permettre de limiter le nombre de résultats */
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching pokemons!");
        } else {
          res.json(result);
        }
      });
      /*
      Bref lisez la doc, 
      il y a plein de manières de faire ce qu'on veut :) 
      */
});

app.post('/pokemon/insert', jsonParser, (req, res) => {
    let body = req.body;
    console.log({...body});
    const dbConnect = dbo.getDb();
    dbConnect
      .collection("pokemon")
      .insert({...body});
    res.json(body);
});

app.delete('/pokemon/delete', jsonParser, (req, res) => {
  let body = req.body;
  console.log({body});  
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pokemon")
    .deleteOne({name: body.name});
  res.json(body.name);
});

app.post('/pokemon/update', jsonParser, (req, res) => {
  let body = req.body;
  console.log({...body});
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pokemon")
    .updateOne({name: body.name},{$set: body.update});
  res.json(body);
});

app.get("/pokedex/list", function (req, res) {
  //on se connecte à la DB MongoDB
  const dbConnect = dbo.getDb();
  //premier test permettant de récupérer mes pokemons !
  dbConnect
    .collection("pokedex")
    .find({}) // permet de filtrer les résultats
    /*.limit(50) // pourrait permettre de limiter le nombre de résultats */
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });
    /*
    Bref lisez la doc, 
    il y a plein de manières de faire ce qu'on veut :) 
    */
});

app.post('/pokedex/insert', jsonParser, (req, res) => {
  let body = req.body;
  console.log({...body});
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pokedex")
    .insert({...body});
  res.json(body);
});

app.delete('/pokedex/delete', jsonParser, (req, res) => {
let body = req.body;
console.log({body});  
const dbConnect = dbo.getDb();
dbConnect
  .collection("pokedex")
  .deleteOne({name: body.name});
res.json(body.name);
});