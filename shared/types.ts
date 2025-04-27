export type Point = {
  x: number;
  y: number;
};

export type Pixel = Point & {
  color?: string; // Optional color
};
export type Board = Pixel[][];

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
