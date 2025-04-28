import { Elysia, t } from 'elysia';
import swagger from '@elysiajs/swagger';
import cors from '@elysiajs/cors';
import { add } from './add';
import { websocket } from './ws';
import {treaty} from '@elysiajs/eden';
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
  .use(add)
  .use(websocket)
  .listen(process.env.PORT ?? 3000);

export type App = typeof app;
