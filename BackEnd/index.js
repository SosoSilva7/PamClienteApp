const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./conf/autenticacao.js');

const app = express();
const port = 3000;


//TEVE Q COLOCAR ESSAS ESPECIFICAAÇÕES  DE CORS PRA PERMITIR AS REQUISIÇÕES DO FRONTEND SEM SER GET OU POST, POIS O NAVEGADOR BLOQUEIA
//POR PADRÃO, O CORS SÓ PERMITE GET E POST, ENTÃO TEM Q CONFIGURAR PRA PERMITIR PUT E DELETE TAMBÉM
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.options('/clientes/:id', cors()); // permite OPTIONS só para DELETE/PUT
app.options('/clientes', cors());  

// CORS para todas as rotas e métodos
app.use(cors({
  origin: 'http://localhost:8082',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para OPTIONS (preflight)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    return res.sendStatus(200);
  }
  next();
});

// ROTAS 

// Todos os clientes
app.get('/clientes', async (req, res) => {
    try {
        const results = await db.selectFull();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Buscar cliente por ID
app.get('/clientes/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const results = await db.selectById(id);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Inserir cliente
app.post('/clientes', async (req, res) => {
    const { Nome, Idade, UF } = req.body;
    try {
        const results = await db.insertCliente(Nome, Idade, UF);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar cliente
app.put('/clientes/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { Nome, Idade, UF } = req.body;
    try {
        const results = await db.updateCliente(Nome, Idade, UF, id);
        if (results.affectedRows > 0) {
            res.json({ success: true });
        } else {
            res.status(404).json({ error: "Cliente não encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Deletar cliente
app.delete('/clientes/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const success = await db.deleteById(id);
        if (success) {
            res.json({ success: true });
        } else {
            res.status(404).json({ error: "Cliente não encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://0.0.0.0:${port}`);
});


//aqui ele escuta a porta 3000,

// o req e os res, representam as requisições e respostas do protocolo HTTP, e para diferentes tipos de respostas, existem diferentes tipos de pegar essas respostas,
//enviar dados com res.json(),
//  status com res.status(),
//  texto com res.send(), etc.

// É o express que cria o servidor web, e faz as requisições e repostas http


// a app.listen, fica ouvindo a porta 3000, e quando alguem fizer uma requisição para essa porta, ele vai disparar o callback, uma função que exibe uma mensagem no console

//o cors resumidamente, permite que o backend aceite requisições de outros domínios, ou seja, ele libera o acesso para outras origens, como por exemplo, um frontend hospedado em outro domínio