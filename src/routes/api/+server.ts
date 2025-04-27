import { Elysia, t } from 'elysia';
import swagger from '@elysiajs/swagger';
import type { RequestHandler } from '@sveltejs/kit';
// import { add } from '$lib/add';

const app = new Elysia({ prefix: '/api' })
  // .use(cors(
  // {
  //   origin: true, // Allows all origins (adjust for production)
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  //   allowedHeaders: ['Content-Type'], // Allowed headers
  //   credentials: true // If you need cookies/auth
  // }
  //
  // ))
  // .use(await swagger())
  .post('/add', ({ body }) => {
    const { a, b } = body;
    return {
      total: a + b
    };

  }, {
    body: t.Object({
      a: t.Integer(),
      b: t.Integer(),
    }),
  })

export type App = typeof app;

export const GET: RequestHandler = ({ request }) => app.handle(request)
export const POST: RequestHandler = ({ request }) => app.handle(request)
