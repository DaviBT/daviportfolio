const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");

const server = http.createServer(app);
const PORT = 80;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

server.listen(PORT);
console.log("servidor rodando na porta " + PORT);

// Define o diretório onde estão os arquivos
app.use(express.static(path.join(__dirname, "/public/")));
app.use(express.static(path.join(__dirname, "/views/")));


// mongodb
var mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url =
  "mongodb+srv://davi:1234@bancoaula.sgm5yag.mongodb.net/?retryWrites=true&w=majority&appName=bancoAula";
const client = new MongoClient(url, { useNewUrlParser: true });

let dbo = client.db("bancoAula");
let usuarios = dbo.collection("usuarios");




app.get("/", (req, res) => {
  res.redirect("projects.html");
  // res.sendFile(path.join(__dirname, '../atv02-esqDoSite(projects)', 'projects.html'));
});

app.post("/blog", (req, res) => {
  let data = { db_titulo: req.body.titulo, db_resumo: req.body.resumo, db_conteudo: req.body.conteudo };

  res.redirect("statusBlog.html");
});


