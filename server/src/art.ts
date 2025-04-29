import { Elysia, t } from "elysia";
import { db } from "./db/db";
import { sql, eq, inArray } from "drizzle-orm";
import { arts, usersArts } from "./db/schema";
import { Art, Board, Color } from "@shared/types";
import { v4 as uuidv4 } from 'uuid';
import cors from "@elysiajs/cors";

function createMatrix<T>(width: number, height: number, value: T): T[][] {
  // Создаем внешний массив (строки)
  const matrix: T[][] = Array.from({ length: height }, () => {
    // Для каждой строки создаем новый внутренний массив (столбцы)
    // и заполняем его указанным значением
    return Array(width).fill(value);
  });
  return matrix;
}

export const art = new Elysia().use(cors({
  origin: true,
}))
  .post('/arts', async ({ body }) => {
    const id = uuidv4();
    let board: Board = createMatrix(body.width, body.height, null);
    const result = await db.insert(arts).values({ id: id, title: body.title, height: body.height, width: body.width, owner: body.userName, creater: body.userName, board:board}).returning();
    // console.log(result);
    const res = await db.insert(usersArts).values({userName: body.userName, artId: id});
    // console.log(res);
    return id
  }, {
    body: t.Object({
      title: t.String(),
      width: t.Number(),
      height: t.Number(),
      userName: t.String(),
    }),
    response: t.String()
      })
  .get('/arts_of_user', async ({ query }) => {
    const {userName} = query;
    const artIds = db.select({ artId: usersArts.artId }).from(usersArts).where(eq(usersArts.userName, userName));
    // console.log(artIds);
    const artsArr: Art[] = await db.select().from(arts).where(inArray(arts.id, artIds));
    // console.log(artsArr);
    return artsArr

  }, {
    query: t.Object({
      userName: t.String(),
    }),
    response: t.Array(Art),
  })

  .get('/arts',async ({ query}) => {
    const {artId, userName} = query;
    const art: Art = (await db.select().from(arts).where(eq(arts.id, artId)).limit(1))[0];
    const res = await db.insert(usersArts).values({userName, artId});
    // console.log(art);
    // console.log(res);
    return art
    }, {
    query: t.Object({
      artId: t.String(),
      userName: t.String()
    }),
    response: Art
  })

