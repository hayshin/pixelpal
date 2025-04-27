import { Elysia, t } from 'elysia';
import swagger from '@elysiajs/swagger';
import { add } from './add';

export const api = new Elysia({ prefix: '/api' })
  // .use(cors(
  // {
  //   origin: true, // Allows all origins (adjust for production)
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  //   allowedHeaders: ['Content-Type'], // Allowed headers
  //   credentials: true // If you need cookies/auth
  // }
  //
  // ))
  .use(await swagger())
  .use(add);


export type Router = typeof api;
