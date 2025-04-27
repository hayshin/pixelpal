import {Elysia, t} from "elysia";

export const add = new Elysia()
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

