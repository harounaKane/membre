const express = require("express");
const fs = require('fs');
var bodyParser = require('body-parser')
const app = express();

const data = require('./data/membre.json');

app.use(bodyParser.urlencoded({ extended: true }))


//middleware  
app.use( (req, res, next) => {
     console.log("URL : " + req.url);
     next();
} )
//lecture
app.get('/', (req, res) => {
     res.render('index.ejs', {listeMembre: data});
})

//lire les info d'un membre
app.get('/membre/:id', (req, res) => {
     res.send("Bonsoir " + data[ (req.params.id - 1) ].prenom +" ")
})

//suppression 
app.get('/delete/:id', (req, res) => {
     let index = getIndex( req.params.id );
     if(!isNaN(index)){
          data.splice(index, 1);
          saveData(data);
     }
     res.redirect('/');
})

//ajouter un membre
app.post('/add', (req, res) => {
     if(req.body.prenom != ""){
          let membre = {
               id: createID(),
               prenom: req.body.prenom,
               age:  req.body.age
          }
          data.push(membre);
          saveData(data);
     }
     res.redirect('/');
})
//choix membre à modifier
.get('/update/:id/:prenom/:age', (req, res) => {
     res.render('update.ejs', {id: req.params.id, prenom: req.params.prenom, age: req.params.age});
})

//mise à jour membre
.post('/update/membre', (req, res) => {
     let index = getIndex(req.body.id);
     data[index].prenom = req.body.prenom;
     data[index].age = req.body.age;
     saveData(data);
     res.redirect('/');
})

app.listen(8000, () => console.log("started at port 8080"))


function getIndex(id){
     for (let i = 0; i < data.length; i++) {
          if( id == data[i].id ){
               return i;
          }
     }
     return "Mauvais ID";
}

function createID(){
     if(data.length) return data[data.length - 1].id + 1;
     return 1;
}

function saveData(data){
     newMembre = JSON.stringify(data);
     fs.writeFileSync("data/membre.json", newMembre);
}