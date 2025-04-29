import { Elysia, t } from "elysia";
import { db } from "./db/db";
import { sql, eq, inArray } from "drizzle-orm";
import { arts, usersArts } from "./db/schema";
import { Art, Board, Color } from "@shared/types";
import { v4 as uuidv4 } from 'uuid';

function createMatrix<T>(width: number, height: number, value: T): T[][] {
  // Создаем внешний массив (строки)
  const matrix: T[][] = Array.from({ length: height }, () => {
    // Для каждой строки создаем новый внутренний массив (столбцы)
    // и заполняем его указанным значением
    return Array(width).fill(value);
  });
  return matrix;
}

export const art = new Elysia()
  .post('/arts', async ({ body }) => {
    const id = uuidv4();
    let board: Board = createMatrix(body.width, body.height, null);
    const result = await db.insert(arts).values({ id: id, title: body.title, height: body.height, width: body.width, owner: body.userName, creater: body.userName, board:board}).returning();
    console.log(result);
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
    console.log(artIds);
    const artsArr: Art[] = await db.select().from(arts).where(inArray(arts.id, artIds));
    console.log(artsArr);
    return artsArr

  }, {
    query: t.Object({
      userName: t.String(),
    }),
    response: t.Array(Art),
  })

  .get('/arts',async ({ query}) => {
    const art: Art = (await db.select().from(arts).where(eq(arts.id, query.id)).limit(1))[0];
    console.log(art);
    return art
    }, {
    query: t.Object({
      id: t.String(),
    }),
    response: Art
  })

