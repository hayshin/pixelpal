import { Elysia, t } from "elysia";
import { Art, Pixel, Board } from "@shared/types";
import { api } from "@client/src/lib/eden";

import { db } from "./db/db";
import { sql, eq, inArray } from "drizzle-orm";
import { arts, usersArts } from "./db/schema";

let boards = new Map<string, Board>();
let active_users = new Map<string, number>();

export const websocket = new Elysia()
  .ws('/canvases', {
    body: Pixel,
    query: t.Object({
      artId: t.String(), // canvas id
      userName: t.String(), // user name
    }),
    response: t.Object({
      pixel: t.MaybeEmpty(Pixel),
      board: t.MaybeEmpty(Board),
    }),
    message(ws, pixel) {
      const { artId, userName } = ws.data.query;
      console.log(artId, userName);
      if (boards.has(artId)) {
        let board = boards.get(artId);
        if (board) board[pixel.x][pixel.y] = pixel.color;
      }
      ws.publish(artId, { pixel: pixel, board: null });
    },
    async open(ws) {
      const { artId, userName } = ws.data.query;
      if (!boards.has(artId)) {
        const art: Art = (await db.select().from(arts).where(eq(arts.id, artId)).limit(1))[0];
        if (art) {
          boards.set(artId, art.board);
          ws.send({pixel: null, board: art.board});
        }
      } else {
        ws.send({pixel: null, board: boards.get(artId)});
      }
      active_users.set(artId, (active_users.get(artId) || 0) + 1)
      console.log(artId, userName);
      ws.subscribe(artId);

    },
    async close(ws) {
      const { artId, userName } = ws.data.query;
      ws.unsubscribe(artId)
      active_users.set(artId, (active_users.get(artId) || 0) - 1);
      if ((active_users.get(artId) || 0) < 1) {
        active_users.delete(artId);
        await db.update(arts).set({ board: boards.get(artId) }).where(eq(arts.id, artId));
        boards.delete(artId);
      }
    }
  }
  )


