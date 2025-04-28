import { Elysia } from "elysia";
import { Pixel } from "@shared/types";


export const websocket = new Elysia()
  .ws('/canvases', {
    body: Pixel,
    message(ws, pixel) {
      ws.publish("a", pixel);
    },
    open(ws) {
      ws.subscribe("a");
    },
    close(ws) {
      ws.unsubscribe("a")
    }
  }
  )


