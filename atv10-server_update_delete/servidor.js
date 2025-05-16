var http = require("http");
var express = require("express");
var bodyParser = require("body-parser")
var mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://davi:lab10@lab10.hft8gmk.mongodb.net/?retryWrites=true&w=majority&appName=lab10`;
const client = new MongoClient(uri, { useNewUrlParser: true });

var dbo = client.db("lab10");
var usuarios = dbo.Collection("usuarios");
var carros = dbo.Collections("carros")

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



//                usuario ---------------

// cadastro
app.post("/cadast_user", function(req, resp) {
  var data = { db_nome: req.body.nome, db_login: req.body.login, db_senha: req.body.senha };

  usuarios.insertOne(data, function (err) {
    console.log(err)
    if (err) {
      resp.render('resposta_usuario', {resposta: "Erro ao cadastrar usuário!"})
    }else {
      resp.render('resposta_usuario', {resposta: "Usuário cadastrado com sucesso!"})        
    };
  });
 
});


// login
app.post("/login", function(req, resp) {
  var data = {db_login: req.body.login, db_senha: req.body.senha };

  usuarios.find(data).toArray(function(err, items) {
    console.log(items);
    if (items.length == 0) {
      resp.render('resposta_usuario', {resposta: "Usuário/senha não encontrado!"})
    }else if (err) {
      resp.render('resposta_usuario', {resposta: "Erro ao logar usuário!"})
    }else {
      resp.render('resposta_usuario', {resposta: "Usuário logado com sucesso!"})        
    };
  });

});






//                  carros ---------------
app.post("/new_car", function(req, resp) {
  var data = { db_marca: req.body.marca, db_modelo: req.body.modelo, db_ano: req.body.ano, db_qtde_disponivel: req.body.qtde_disponivel };

  usuarios.insertOne(data, function (err) {
    console.log(err)
    if (err) {
      resp.render('resposta_usuario', {resposta: "Erro ao cadastrar o carro!"})
    }else {
      resp.render('resposta_usuario', {resposta: "Carro cadastrado com sucesso!"})        
    };
  });
 
});




// atualizar carro
app.post("/up_car", function(req, resp) {
  var data = { db_modelo: req.body.modelo, db_senha: req.body.ano };
  var newData = { $set: {db_qtde_disponivel: req.body.qtde_disponivel} };

  usuarios.updateOne(data, newData, function (err, result) {
    console.log(result);
    if (result.modifiedCount == 0) {
      resp.render('resposta_usuario', {resposta: "Carro/modelo não encontrado!"})
    }else if (err) {
      resp.render('resposta_usuario', {resposta: "Erro ao atualizar o carro!"})
    }else {
      resp.render('resposta_usuario', {resposta: "Carro atualizado com sucesso!"})        
    };
  });
 
});
