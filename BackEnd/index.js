const db = require('./conf/autenticacao.js');
const express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let methodOverride = require('method-override');
const app = express();
const port = 3000;

// Permite que você use verbos HTTP
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

app.use((req, resp, next) => {
  resp.header("Access-Control-Allow-Origin", "*");
  resp.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
  next()
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//ROTEAMENTO RAIZ
app.get('/', async (req, res) => {
  const results =  await db.selectFull();
  console.log(results);
  res.json(results);
});


// ROTEAMENTO PARA BUSCAR PELO ID
app.get('/clientes/:id', async (req, res) => {  
  const id = req.params.id;
  const results = await db.selectById(id);
  console.log(results);
  res.json(results);
});


// ROTEAMENTO PARA INSERIR
app.post('/clientes/', async (req, res) => { 
  const Nome = req.body.Nome;
  const Idade = req.body.Idade;
  const UF = req.body.UF;
  //const { Nome, Idade, UF } = req.body;
  const results = await db.insertCliente(Nome, Idade, UF);
  console.log(results);
  res.json(results);  
}); 

// ROTEAMENTO PARA ATUALIZAR
app.put('/clientes/:id', async (req, res) => {    
  const id = req.params.id;
  const Nome = req.body.Nome;
  const Idade = req.body.Idade;
  const UF = req.body.UF;
  //const { Nome, Idade, UF } = req.body;
  const results = await db.updateCliente( Nome, Idade, UF,id);
  console.log(results);
  res.json(results);  
}); 


//DELETAR PELO ID
app.delete('/clientes/:id', async (req, res) => { 
  const id = req.params.id;
  const results = await db.deleteById(id);
  console.log(results);
  res.json(results);
});

// ROTA TODOS OS CLIENTES
app.get('/clientes', async (req, res) => {
  try {
    const results = await db.selectFull();
    res.json(results); // agora responde JSON de verdade
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




app.listen(port, "0.0.0.0", () => {
    console.log(`Example app listening at http://0.0.0.0:${port}`);
});
//aqui ele escuta a porta 3000, e o ip da máquina

// o req e os res, representam as requisições e respostas do protocolo HTTP, e para diferentes tipos de respostas, existem diferentes tipos de pegar essas respostas,
//enviar dados com res.json(),
//  status com res.status(),
//  texto com res.send(), etc.

// É o express que cria o servidor web, e faz as requisições e repostas http

// a app.listen, fica ouvindo a porta 3000, e quando alguem fizer uma requisição para essa porta, ele vai disparar o callback, uma função que exibe uma mensagem no console

//o cors resumidamente, permite que o backend aceite requisições de outros domínios, ou seja, ele libera o acesso para outras origens, como por exemplo, um frontend hospedado em outro domínio