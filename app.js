const express = require("express");
const app = express();

app.get('/', (req, res) => {
     res.send("Bonjour accueil");
})

app.get('/bonsoir', (req, res) => {
     res.send("Bonsoir")
})
app.listen(8000, () => console.log("started at port 8080"))
