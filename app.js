const mysql = require('mysql');
const axios = require('axios');
const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/public/images/', express.static('../public/img'));
app.set('view engine', 'ejs');

let db = mysql.createConnection({
    host: "localhost", //10.48-20-17
    user: "root", //slave
    password: "root", //password
    database: "pokemon" //USE database;
  });

db.connect(function(err) {
    if (err) {
        console.error(err);
    }
});


//Conseguir pokemons

app.get('/',(req,res) => {
  return res.render('index',{});
});



app.get('/getPokemons',(req,res) => {

      db.query("SELECT * FROM pokedex", function (err, pokemon, fields) {
        if (err) {
          return res.status(500).send({status:'erro', 'Error':err});
        }
        return res.render('pokedex',{pokemon});

      });
    });

app.get('/pokemon/:id',(req,res) => {
    console.log(req.params);
    let number = req.params.id;

    console.log(`SELECT * FROM pokedex WHERE numero = ${number};`);
    db.query( `SELECT * FROM pokedex WHERE numero = ${number};`, function (err, pokemon, fields) {
        if (err) {
            return res.status(500).send({status:'erro', 'Error':err});
        }
        console.log(pokemon.length);
        if (pokemon.length <= 0) {
            return res.status(404).render('error', { error: 404, message: 'No se encontró el Pokémon', docu:'https://developer.mozilla.org/es/docs/Glossary/404'});
        }
        return res.render('pokedex',{pokemon});
    });
});

  
  

  //Crear base de datos
  /*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE pokedex (name VARCHAR(255), numero INT, height FLOAT, weight FLOAT, sprite VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });*/

  //insertar elementos en MySql de la PokeApi
  /*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    async function pokeRoboDelSiglo(inicio, final){

      for (let i = inicio; i<= final; i++){
        const p =  await axios.get(`https://pokeapi.co/api/v2/pokemon/1${ i }/`);
        //console.log(p);

        //(name VARCHAR(255), numero INT, height FLOAT, weight FLOAT, sprite VARCHAR(255))
        setTimeout(() => {
          let sql = `INSERT INTO pokedex (name, numero, height, weight, sprite) VALUES ("${p.data.name}",${i},${p.data.height},${p.data.weight},"${p.data.sprites.front_default}");`;
          console.log(sql);
          con.query(sql, function (err, result) {
            if (err) throw err;
            
            console.log("1 record inserted");
          });
          
        }, 3000);
      }
    }  
    pokeRoboDelSiglo(1,182);
  });*/


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${ port }`));