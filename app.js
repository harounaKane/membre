const express = require("express");
var bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

const data = 
[
     {id: 1, prenom: "Jean", age: 30},
     {id: 2, prenom: "Pierre", age: 50},
     {id: 3, prenom: "Toto", age: 18}
]

//middleware  
app.use( (req, res, next) => {
     console.log("URL : " + req.url);
     next();
} )

app.get('/', (req, res) => {
     res.render('index.ejs', {listeMembre: data});
})

app.get('/membre/:id', (req, res) => {
     res.send("Bonsoir " + data[ (req.params.id - 1) ].prenom +" ")
})
app.get('/delete/:id', (req, res) => {
     let index = getIndex( req.params.id );
     if(!isNaN(index)){
          data.splice(index, 1);
     }
     res.redirect('/');
})
app.post('/add', (req, res) => {
     if(req.body.prenom != ""){
          let membre = {
               id: createID(),
               prenom: req.body.prenom,
               age:  req.body.age
          }
          data.push(membre);
     }
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
     return data[data.length - 1].id + 1;
}
