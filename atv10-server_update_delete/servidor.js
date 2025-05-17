const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://davi:lab10@lab10.hft8gmk.mongodb.net/?retryWrites=true&w=majority&appName=lab10`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const server = http.createServer(app);
server.listen(80);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views/'));
app.use(express.static(path.join(__dirname, '/public/')));

// conectar primeiro
client.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MongoDB:', err);
    return;
  }

  console.log("✅ MongoDB conectado com sucesso");

  const db = client.db("lab10");
  const usuarios = db.collection("usuarios");
  const carros = db.collection("carros");

  console.log("Servidor rodando: http://localhost:80");

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'projects.html'));
  });

  
//                usuario ---------------

// cadastro
  app.post("/cadast_user", function (req, resp) {
    const data = {
      db_nome: req.body.nome,
      db_login: req.body.login,
      db_senha: req.body.senha
    };

    usuarios.insertOne(data, function (err) {
      if (err) {
        resp.render('resposta_usuario', { resposta: "Erro ao cadastrar usuário!"});
      } else {
        resp.redirect("login_user.html");
      }
    });
  });




// login
app.get("/login", function(req, resp) {
  const db_login = req.query.login;
  const db_senha = req.query.senha;
  
  const data = {db_login: req.query.login, db_senha: req.query.senha };

  usuarios.find(data).toArray(function(err, items) {
    console.log(items);
    if (items.length == 0) {
      resp.render('usuarios', {resposta: "Usuário/senha não encontrado!"})
    }else if (err) {
      resp.render('usuarios', {resposta: "Erro ao logar usuário!"})
    }else {
      resp.render('usuarios', {db_login, db_senha})   
    };
  });

});






//                  carros ---------------
app.get('/public/carro.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'carro.html'));
});

// criar carro
app.post("/new_car", function(req, resp) {

  const db_marca = req.body.marca


  var data = { db_marca: req.body.marca, db_modelo: req.body.modelo, db_ano: req.body.ano, db_qtde_disponivel: req.body.qtde_disponivel };

  carros.insertOne(data, function (err) {
    console.log(err)
    if (err) {
      console.log(err)
    }else {
      resp.render('carros_dispo', {db_marca})        
    };
  });
 
});


// vender carro
app.post("/rem_car", function(req, resp) {
  var data = { db_marca: req.body.marca, db_modelo: req.body.modelo, db_ano: req.body.ano };
 
  carros.deleteOne(data, function (err, result) {
    console.log(result);
    if (result.deletedCount == 0) {
      resp.render('resposta_usuario', {resposta: "Usuário/senha não encontrado!"})
    }else if (err) {
      resp.render('resposta_usuario', {resposta: "Erro ao remover usuário!"})
    }else {
      resp.render('resposta_usuario', {resposta: "Usuário removido com sucesso!"})        
    };
  });

});



// atualizar carro
app.post("/up_car", function(req, resp) {
  var data = { db_modelo: req.body.modelo, db_senha: req.body.ano };
  var newData = { $set: {db_qtde_disponivel: req.body.qtde_disponivel} };

  carros.updateOne(data, newData, function (err, result) {
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


});