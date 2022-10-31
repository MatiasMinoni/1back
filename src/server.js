
const express= require("express")
const path= require("path")
 const {Server: HttpServer} = require("http")
 const {Server: IOServer} = require("socket.io")
 var fs = require('fs');
const app= express()

const httpServer= new HttpServer(app)
const io= new IOServer(httpServer)
const PORT= process.env.PORT =8080
app.use(express.static('public'));
// Cambiar a false
let admin = true;
// Cambiar a false

// ---------------CRUD---------------
const { writeToFile } = require("../routes/routes");
const { appendToFile } = require("../routes/routes");
const { readThisFile } = require("../routes/routes");
const { deleteFile } = require("../routes/routes");




// ---------------CRUD---------------



let messages=[]

const products=[]
  app.use((req, res, next) => {
  req.auth = admin;
  next();
  });
  app.get("/login", (req, res) => {
  if (admin !== true) {
    admin = true;
  }
  res.redirect("/");
  });

  app.get("/logout", (_, res) => {
  if (admin === true) {
    admin = false;
  }
  res.redirect("/");
  });

  app.get("/isLogin", (_, res) => {
  res.json(admin);
  });


  app.use(express.urlencoded({extended:true}))
  app.set("views", "./views/pages")

  app.set("view engine", "ejs")
  app.post("/products", (req, res) => {

  let product=req.body;
  product.id= products.length +1;

  products.push(product)
  appendToFile("./_Productos.json", (products))


    res.redirect("/")
  })



  

  app.get("/" ,(req, res, next) => {
  if (admin){
  res.sendFile(path.join(__dirname, "../public/index.html"))

  res.render("index", {products})
  next()

  }
  else{
    res.status(401).send("Necesitas iniciar sesion en la url /login")
  }
  });


app.get("/id", (req, res) =>{
  res.render("id", {products})
})






const connectedServer= httpServer.listen(PORT, () =>{
console.log(`Servidor escuchando en ${connectedServer.address().port}`);
})

io.on('connection', socket => {
  console.log(`a user connected on port ${PORT}`);


  socket.emit("messages", messages)
  socket.on("new-message", function(data) {
    messages.push( data)

    io.sockets.emit("messages", messages)
    
    writeToFile("./_chatLog.json", messages)

    })



});
