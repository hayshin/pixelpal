import { Elysia, t } from "elysia";
import { Pixel } from "@shared/types";


export const websocket = new Elysia()
  .ws('/canvases', {
    body: Pixel,
    query: t.Object({
      canvasId: t.String(), // canvas id
      userName: t.String(), // user name
    }),
    message(ws, pixel: Pixel) {
      const { canvasId, userName } = ws.data.query;
      console.log(canvasId, userName);
      ws.publish(canvasId, pixel);
    },
    open(ws) {
      const { canvasId, userName } = ws.data.query;
      console.log(canvasId, userName);
      ws.subscribe(canvasId);
    },
    close(ws) {
      const { canvasId, userName } = ws.data.query;
      ws.unsubscribe(canvasId)
    }
  }
  )


