<script lang="ts">
  import { onMount } from "svelte";
  import type { Point, Pixel } from "../../../shared/types";
  import { api } from "$lib/eden";

  export let width = 64;
  export let height = 64;
  const pixelSize = 8;
  export let brushColor = "#000000";
  export let brushSize = 1;

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let prevPoint: Point;
  let room: ReturnType<typeof api['canvases']['subscribe']>;


  function drawLine(point1: Point, point2: Point, color?: string) {
    let dx = Math.abs(point2.x - point1.x);
    let dy = Math.abs(point2.y - point1.y);
    let sx = point1.x < point2.x ? 1 : -1;
    let sy = point1.y < point2.y ? 1 : -1;
    let err = dx - dy;

    while (true) {
      drawPixel({ x: point1.x, y: point1.y, color });

      if (point1.x === point2.x && point1.y === point2.y) break;

      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        point1.x += sx;
      }
      if (e2 < dx) {
        err += dx;
        point1.y += sy;
      }
    }
  }

  function getCanvasCoords(event: MouseEvent): Point {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  function getPixelCoords(event: MouseEvent): Point {
    let { x, y } = getCanvasCoords(event);
    return { x: Math.floor(x / pixelSize), y: Math.floor(y / pixelSize) };
  }

  function drawPixel(pixel: Pixel) {
    // console.log(x, y)
    if (pixel == prevPoint) return;
    if (room) room.send(pixel);
    if (!pixel.color) {
      clearPixel(pixel);
      return;
    }
    ctx.fillStyle = pixel.color;
    ctx.fillRect(
      pixel.x * pixelSize,
      pixel.y * pixelSize,
      pixelSize * brushSize,
      pixelSize * brushSize,
    );
  }

  // two colors for grid of background of pixel
  function clearPixel(
    point: Point,
    firstColor = "#545454",
    secondColor = "#4C4C4C",
  ) {
    const halfPixelSize = pixelSize / 2;
    for (let x = point.x; x < point.x + brushSize; x++) {
      for (let y = point.y; y < point.y + brushSize; y++) {
        ctx.fillStyle = firstColor;
        ctx.fillRect(
          x * pixelSize,
          y * pixelSize,
          halfPixelSize,
          halfPixelSize,
        );
        ctx.fillRect(
          x * pixelSize + halfPixelSize,
          y * pixelSize + halfPixelSize,
          halfPixelSize,
          halfPixelSize,
        );
        ctx.fillStyle = secondColor;
        ctx.fillRect(
          x * pixelSize + halfPixelSize,
          y * pixelSize,
          halfPixelSize,
          halfPixelSize,
        );
        ctx.fillRect(
          x * pixelSize,
          y * pixelSize + halfPixelSize,
          halfPixelSize,
          halfPixelSize,
        );
      }
    }
    // ctx.fillRect(coords.x * pixelSize - pixelSize / 2, coords.y * pixelSize - pixelSize / 2, pixelSize * brushSize, pixelSize * brushSize);
  }

  function handleRightClick(event: MouseEvent) {
    event.preventDefault();
    const point = getPixelCoords(event);
    clearPixel(point);
  }

  function handleLeftClick(event: MouseEvent) {
    const { x, y } = getCanvasCoords(event);
    drawPixel({ x, y, color: brushColor });
  }

  function handleMouseMove(event: PointerEvent) {
    // because many pointer events captured in one event, get all of that
    let events = event.getCoalescedEvents();
    for (const e of events) {
      const buttons = e.buttons;
      const isDrawing = buttons == 1;
      const isErasing = buttons == 2;
      const isMoving = buttons == 4;
      const color = isDrawing ? brushColor : undefined;
      const pixelCoords = getPixelCoords(event);
      // console.log(x, y);
      if (isDrawing || isErasing) {
        if (prevPoint) drawLine(prevPoint, pixelCoords, color);
        else drawPixel({ x: pixelCoords.x, y: pixelCoords.y, color });
      } else {
        // make hover pixels with slight lighter color
        // todo();
        // clearPixel(pixelCoords);
      }
      prevPoint = pixelCoords;
    }
  }

  onMount(() => {
    ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;

    canvas.width *= pixelSize;
    canvas.height *= pixelSize;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        clearPixel({ x, y });
      }
    }
    room = api.canvases.subscribe();
    room.on('message', ({data}) => {
      drawPixel(data);
    })
    console.log(room);
  });
</script>

<canvas
  bind:this={canvas}
  {width}
  {height}
  onpointermove={handleMouseMove}
  onpointerdown={handleLeftClick}
  oncontextmenu={handleRightClick}
  style="border: 1px solid #ccc; image-rendering: pixelated; width: auto; height:100%;"
></canvas>

<style>
  canvas {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    image-rendering: pixelated;
    padding: 10px;
  }
</style>
