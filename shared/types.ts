import type {Static } from "elysia";
import {t} from "elysia";

// TypeBox types for Elysia & Eden type system
export const Color = t.MaybeEmpty(t.String());
export type Color = Static<typeof Color>

export const Point = t.Object({
  x: t.Number(),
  y: t.Number()
})
export type Point = Static<typeof Point>

export const Pixel = t.Intersect([
  Point,
  t.Object({
    color: Color
  })
])

export type Pixel = Static<typeof Pixel>

export const Board = t.Array(t.Array(Color));
export type Board = Static<typeof Board>

export const Art = t.Object({
  id: t.String(),
  title: t.String(),
  width: t.Number(),
  height: t.Number(),
  created: t.Date(),
  updated: t.Date(),
  owner: t.String(),
  creater: t.String(),
  board: Board,
})
export type Art = Static<typeof Art>

// export class Art {
//   width: number;
//   height: number;
//   title: string;
//   owner: string;
//   board: Board;
//   constructor(width: number, height: number, title: string, owner: string) {
//     this.width = width;
//     this.height = height;
//     this.board = Array.from({ length: width }, () =>
//       Array.from({ length: height })
//     );
//     this.title = title;
//     this.owner = owner;
//   }
//   setPixel(pixel: Pixel) {
//     this.board[pixel.x][pixel.y] = pixel.color;
//   }

//   toJSON(): string {
//     return JSON.stringify(this.board);
//   }

//   // static fromJSON(json: string): Art {
//   //   let array = JSON.parse(json);
//   //   let board = new Art(array[0].size, array.size);
//   //   board.board = array;
//   //   return board;
//   // }
// }

export type DrawPixel = {
  type: "draw_pixel";
  pixel: Pixel;
};

export type CursorMove = {
  type: "cursor_move";
  usedId: string;
  x: number;
  y: number;
};

export type UserJoin = {
  type: "user_join";
  usedId: string;
  canvasId: string;
};

export type UserLeave = {
  type: "user_leave";
  usedId: string;
  canvasId: string;
};

export type SendBoard = {
  type: "send_board";
  board: Art;
};

// You might also want to export a union type of all message types
export type CanvasMessage =
  | DrawPixel
  | CursorMove
  | UserJoin
  | UserLeave
  | SendBoard;
