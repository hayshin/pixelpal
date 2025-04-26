<script lang="ts">
	import { onMount } from 'svelte';
	export let width = 64;
	export let height = 64;
	const pixelSize = 8;
	export let brushColor = '#000000';
	export let brushSize = 1;

	interface Coords {
		x: number;
		y: number;
	}

	interface Pixel {
		x: number;
		y: number;
		color: string;
	}

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let prevCoords: Coords;

	function drawLine(x0: number, y0: number, x1: number, y1: number, color?: string) {
		let dx = Math.abs(x1 - x0);
		let dy = Math.abs(y1 - y0);
		let sx = x0 < x1 ? 1 : -1;
		let sy = y0 < y1 ? 1 : -1;
		let err = dx - dy;

		while (true) {
			if (color) drawPixel({ x: x0, y: y0, color });
			else drawBackBrush({ x: x0, y: y0 });
			if (x0 === x1 && y0 === y1) break;

			const e2 = 2 * err;
			if (e2 > -dy) {
				err -= dy;
				x0 += sx;
			}
			if (e2 < dx) {
				err += dx;
				y0 += sy;
			}
		}
	}

	function getCanvasCoords(event: MouseEvent): Coords {
		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;

		return {
			x: (event.clientX - rect.left) * scaleX,
			y: (event.clientY - rect.top) * scaleY
		};
	}

	function getPixelCoords(event: MouseEvent): Coords {
		let { x, y } = getCanvasCoords(event);
		return { x: Math.floor(x / pixelSize), y: Math.floor(y / pixelSize) };
	}

	function drawPixel(pixel: Pixel) {
		// console.log(x, y)
		ctx.fillStyle = pixel.color;
		ctx.fillRect(
			pixel.x * pixelSize,
			pixel.y * pixelSize,
			pixelSize * brushSize,
			pixelSize * brushSize
		);
	}

	function drawBackBrush(coords: Coords) {
		for (let x = coords.x; x < coords.x + brushSize; x++) {
			for (let y = coords.y; y < coords.y + brushSize; y++) {
				drawBackPixel({ x, y });
			}
		}
	}

	function drawBackPixel(coords: Coords) {
		ctx.fillStyle = '#555555';
		ctx.fillRect(coords.x * pixelSize, coords.y * pixelSize, pixelSize / 2, pixelSize / 2);
		ctx.fillStyle = '#555555';
		ctx.fillRect(
			coords.x * pixelSize + pixelSize / 2,
			coords.y * pixelSize + pixelSize / 2,
			pixelSize / 2,
			pixelSize / 2
		);
		ctx.fillStyle = '#4C4C4C';
		ctx.fillRect(
			coords.x * pixelSize + pixelSize / 2,
			coords.y * pixelSize,
			pixelSize / 2,
			pixelSize / 2
		);
		ctx.fillStyle = '#4C4C4C';
		ctx.fillRect(
			coords.x * pixelSize,
			coords.y * pixelSize + pixelSize / 2,
			pixelSize / 2,
			pixelSize / 2
		);
		// ctx.fillRect(coords.x * pixelSize - pixelSize / 2, coords.y * pixelSize - pixelSize / 2, pixelSize * brushSize, pixelSize * brushSize);
	}

	function handleRightClick(event: MouseEvent) {
		event.preventDefault();
		const { x, y } = getPixelCoords(event);
		drawBackBrush({ x, y });
	}

	function handleLeftClick(event: MouseEvent) {

		const { x, y } = getPixelCoords(event);
		console.log(x, y);
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
			const pixelCoords = getPixelCoords(event);
			// console.log(x, y);
			if (isDrawing) {
				if (prevCoords)
					drawLine(prevCoords.x, prevCoords.y, pixelCoords.x, pixelCoords.y, brushColor);
				else drawPixel({ x: pixelCoords.x, y: pixelCoords.y, color: brushColor });
			} else if (isErasing) {
				if (prevCoords) drawLine(prevCoords.x, prevCoords.y, pixelCoords.x, pixelCoords.y);
				else drawBackBrush({ x: pixelCoords.x, y: pixelCoords.y });
			}
			prevCoords = pixelCoords;
		}
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		ctx.imageSmoothingEnabled = false;

		canvas.width *= pixelSize;
		canvas.height *= pixelSize;

		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				drawBackPixel({ x, y });
			}
		}
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
