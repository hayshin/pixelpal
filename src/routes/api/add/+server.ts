import type { RequestHandler } from '@sveltejs/kit';
import { Elysia, t } from 'elysia';

const add = new Elysia({prefix: '/api'})
  .post('/add', ({ body }) => {
    const { a, b } = body;
    return {
      total: a+b
    };

  }, {
    body: t.Object({
      a: t.Integer(),
      b: t.Integer(),
    }),
  })

export const POST: RequestHandler = ({ request }) => add.fetch(request)

// import { posts } from '$lib/server/db/schema';
// const app = new Elysia({ prefix: '/api' })
//   .get('/posts', async () => {
//     return await db.select().from(posts);
//   })
//   .get('/posts/:id', async ({ params }) => {
//     return await db.select().from(posts).where(eq(posts.id, params.id));
//   })
//   .post('/posts', async ({ body }) => {
//     const [newPost] = await db.insert(posts).values(body).returning();
//     return newPost;
//   });
