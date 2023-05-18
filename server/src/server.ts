import 'dotenv/config';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { memoriesRoutes } from './routes/memories';
import { authRoutes } from './routes/auth';

const app = fastify();

app.register(cors, {
  //origin: true /* Todas as URLs de front-end poderão acessar nosso back-end */,
  origin: ['http://localhost:3000'],
});

app.register(memoriesRoutes);
app.register(authRoutes);

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('🔥 HTTP server running on http://localhost:3333'));
