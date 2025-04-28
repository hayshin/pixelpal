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


export class Board {
  width: number;
  height: number;
  board: Color[][];
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.board = Array.from({ length: width }, () =>
      Array.from({ length: height })
    );
  }
  setPixel(pixel: Pixel) {
    this.board[pixel.x][pixel.y] = pixel.color;
  }

  toJSON(): string {
    return JSON.stringify(this.board);
  }

  static fromJSON(json: string): Board {
    let array = JSON.parse(json);
    let board = new Board(array[0].size, array.size);
    board.board = array;
    return board;
  }
}

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
  board: Board;
};

// You might also want to export a union type of all message types
export type CanvasMessage =
  | DrawPixel
  | CursorMove
  | UserJoin
  | UserLeave
  | SendBoard;
