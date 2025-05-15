var http = require("http");
var express = require("express");
var bodyParser = require("body-parser")
var mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://davi:1234@bancoaula.sgm5yag.mongodb.net/?retryWrites=true&w=majority&appName=bancoAula`;
const client = new MongoClient(uri, { useNewUrlParser: true });

var dbo = client.db("bancoAula");
var posts = dbo.collection("posts");

var app = express();
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('views', './views');

var server = http.createServer(app);
server.listen(80);

console.log("Servidor rodando: http://localhost:80");


// Métodos e actions

// Define o diretório onde estão os arquivos 
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.static(path.join(__dirname, '/views/')));

app.get('/', (req, res) => {
    res.redirect('projects.html')
    // res.sendFile(path.join(__dirname, '../atv02-esqDoSite(projects)', 'projects.html'));
  });



