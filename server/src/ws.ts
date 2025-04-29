import { Elysia, t } from "elysia";
import { Art, Pixel, Board } from "@shared/types";
import { db } from "./db/db";
import { eq } from "drizzle-orm";
import { arts } from "./db/schema";
import cors from "@elysiajs/cors";
import type { ElysiaWS } from "elysia/ws";

let boards = new Map<string, Board>();
let activeConnections = new Map<string, Set<string>>();

export const websocket = new Elysia()
  // Configure CORS properly
  .use(cors({
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }))
  // Handle preflight requests
  .options('*', ({ set }) => {
    set.headers = {
      // ...set.headers,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
  })
  .ws('/canvases', {
    // Enable CORS for WebSocket
    beforeHandle({ set }) {
      set.headers['Access-Control-Allow-Origin'] = '*';
    },
    body: t.Object({
      x: t.Number(),
      y: t.Number(),
      color: t.String()
    }),
    query: t.Object({
      artId: t.String(),
      userName: t.String()
    }),
    open(ws) {
      const { artId, userName } = ws.data.query;

      // Initialize connection tracking
      if (!activeConnections.has(artId)) {
        activeConnections.set(artId, new Set());
      }
      activeConnections.get(artId)?.add(ws.id);

      // Send current board state
      if (boards.has(artId)) {
        ws.send({ pixel: null, board: boards.get(artId) });
      } else {
        // Load from database if not in memory
        db.select().from(arts).where(eq(arts.id, artId))
          .then(([art]) => {
            if (art) {
              boards.set(artId, art.board);
              ws.send({ pixel: null, board: art.board });
            }
          })
          .catch(console.error);
      }

      console.log(`User ${userName} connected to art ${artId}`);
      ws.subscribe(artId);
    },
    message(ws, pixel: Pixel) {
      const { artId, userName } = ws.data.query;

      // Update board state
      if (!boards.has(artId)) return;

      const board = boards.get(artId);
      if (board && board[pixel.x]?.[pixel.y] !== undefined) {
        board[pixel.x][pixel.y] = pixel.color;
        ws.publish(artId, { pixel, board: null });
      }
    },
    close(ws) {
      const { artId, userName } = ws.data.query;

      // Clean up connection tracking
      if (activeConnections.has(artId)) {
        const connections = activeConnections.get(artId);
        connections?.delete(ws.id);

          console.log("Trying to update board ", connections?.size)
        if (connections?.size === 0) {
          // Save to database when last connection closes
          console.log("Trying to update board ", artId)
          db.update(arts)
            .set({ board: boards.get(artId) })
            .where(eq(arts.id, artId))
            .catch(console.error);

          activeConnections.delete(artId);
          boards.delete(artId);
        }
      }

      console.log(`User ${userName} disconnected from art ${artId}`);
      ws.unsubscribe(artId);
    }
  });
