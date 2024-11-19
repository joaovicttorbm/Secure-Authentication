import express from 'express';

// Inicializa o aplicativo Express
const app = express();

// Rota inicial para verificar o funcionamento do servidor
app.get('/', (req, res) => {
  res.json({ message: 'Hello from the server' });
});


