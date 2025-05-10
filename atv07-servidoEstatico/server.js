const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
server.listen(80);


// Define o diretório onde estão os arquivos 
app.use(express.static(path.join(__dirname, '../atv01-paginaInicial')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../atv01-paginaInicial', 'index.html'));
  });

// Inicia o servidor na porta 80
console.log("servidor rodando")
