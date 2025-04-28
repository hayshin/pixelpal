import { Elysia } from "elysia";
import { Pixel } from "@shared/types";


export const websocket = new Elysia()
  .ws('/canvases', {
    body: Pixel,
    message(ws, pixel) {
      ws.publish("porno", pixel);
    },
    open(ws) {
      ws.subscribe("porno");
    },
    close(ws) {
      ws.unsubscribe("porno")
    }
  }
  )


