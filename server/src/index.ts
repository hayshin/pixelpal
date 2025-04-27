import { Elysia, t } from 'elysia';
import swagger from '@elysiajs/swagger';
import cors from '@elysiajs/cors';
import { add } from './add';
// import { add } from '$lib/add';

const app = new Elysia()
  .use(cors(
    {
      origin: true, // Allows all origins (adjust for production)
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
      allowedHeaders: ['Content-Type'], // Allowed headers
      credentials: true // If you need cookies/auth
    }

  ))
  .use(swagger())
  .use(add).
  listen(8080);

export type App = typeof app;
