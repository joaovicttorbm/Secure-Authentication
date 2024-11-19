import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connect } from 'mongoose';

import authRouter from './routers/authRouter';
import postsRouter from './routers/postsRouter';

// Inicializa o aplicativo Express
const app = express();

// Middlewares globais para segurança, cookies e parsing
app.use(helmet()); // Configura cabeçalhos HTTP para segurança
app.use(cors()); // Habilita CORS para permitir acessos externos
app.use(cookieParser()); // Faz parsing de cookies enviados pelo cliente
app.use(json()); // Faz parsing de requisições com payload JSON
app.use(urlencoded({ extended: true })); // Suporta parsing de payloads URL-encoded

// Conexão com o MongoDB
const connectDatabase = async () => {
  try {
    await connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};
connectDatabase();

// Rotas da aplicação
app.use('/api/auth', authRouter); // Gerenciamento de autenticação
app.use('/api/posts', postsRouter); // CRUD para posts

// Rota inicial para verificar o funcionamento do servidor
app.get('/', (req, res) => {
  res.json({ message: 'Hello from the server' });
});

// Inicia o servidor na porta especificada
const PORT = process.env.PORT || 3000; // Porta padrão caso a variável não esteja configurada
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
