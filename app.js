const http = require("http");

http
.createServer( (req, res) => {
     res.writeHead(200, {"content-type": "text/html"})
    if(req.url === '/'){
          res.write("Bonjour");
    }else if(req.url === '/bonsoir'){
          res.write("Bonsoir");
    }else{
         res.write("error 4040")
    }
     res.end();
})
.listen(8000, () => console.log("started at port 8080"));