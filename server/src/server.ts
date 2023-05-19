import 'dotenv/config';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { memoriesRoutes } from './routes/memories';
import { authRoutes } from './routes/auth';
import jwt from '@fastify/jwt';

const app = fastify();

app.register(cors, {
  //origin: true /* Todas as URLs de front-end poderão acessar nosso back-end */,
  origin: ['http://localhost:3000'],
});
app.register(jwt, {
  secret: ':tHF,H`<ShL~9vOA_/-<d-fhBUX(.@%D.h8{g%:X',
});
app.register(memoriesRoutes);
app.register(authRoutes);

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => console.log('🔥 HTTP server running on http://localhost:3333'));
