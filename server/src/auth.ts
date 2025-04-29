import { Elysia, t } from "elysia";
import { db } from "./db/db";
import { sql } from "drizzle-orm";
import { arts, users } from "./db/schema";
import { uuid } from "drizzle-orm/gel-core";



export const auth = new Elysia()
  .post('/auth', ({ body }) => {
    const query = db.insert(users).values({ name: body.userName });
    const result = db.get<{ text: string }>(query);
    console.log(result);
  }, {
    body: t.Object({
      userName: t.String(),
    }),
  })

  .get('/auth', ({ query}) => {
    const q = db.insert(users).values({ name: query.userName });
    const result = db.get<{ text: string }>(q);
    console.log(result);
  }, {
    query: t.Object({
      userName: t.String(),
    }),
  })

