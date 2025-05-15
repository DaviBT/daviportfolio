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

app.get("/", async function(req, res) {
  try {
      const documentos = await posts.find().toArray(); 
      res.render("blog", { posts: documentos }); 
  } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao carregar posts");
  }
});


app.post("/submit", function(requisicao, resposta){
    let titulo = requisicao.body.titulo;
    let resumo = requisicao.body.resumo;
    let conteudo = requisicao.body.conteudo;
    console.log(titulo, resumo, conteudo);

    var data = { db_titulo: titulo, db_resumo: resumo, db_conteudo: conteudo };

    posts.insertOne(data, function(err){
        if(err){
            resposta.render("resposta",{status: "Erro" ,titulo, resumo, conteudo});
        }else{
            resposta.redirect("statusBlog.html")
        }
    })
})

// app.get('/views/blog.ejs', async (req, res) => {
//   const posts = await posts.find();
//   res.render('posts', { posts });
// });