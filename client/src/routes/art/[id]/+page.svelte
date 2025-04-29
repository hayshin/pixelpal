<script lang="ts">
	import { onMount } from 'svelte';
	import type { Art, Point, Pixel } from '$shared/types';
	import { api } from '$lib/eden';
	import { page } from '$app/stores';

	let artId = $page.params.id;
	let userName = localStorage.getItem('name') ?? 'anon';
	// Bind brushColor and brushSize to input elements
	let brushColor = '#000000'; // Default brush color
	let brushSize = 1; // Default brush size

	const pixelSize = 8;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let prevPoint: Point | null = null; // Initialize as null
	let room: ReturnType<(typeof api)['canvases']['subscribe']> | null = null; // Initialize as null
	let art: Art | null = null; // Store art details

	function drawLine(point1: Point, point2: Point, color?: string) {
		if (!ctx) return;
		const dx = Math.abs(point2.x - point1.x);
		const dy = Math.abs(point2.y - point1.y);
		const sx = point1.x < point2.x ? 1 : -1;
		const sy = point1.y < point2.y ? 1 : -1;
		let err = dx - dy;

		let currentPoint = { x: point1.x, y: point1.y };

		while (true) {
			// Apply brush size around the current point
			for (let i = 0; i < brushSize; i++) {
				for (let j = 0; j < brushSize; j++) {
					drawPixel({ x: currentPoint.x + i, y: currentPoint.y + j, color });
				}
			}

			if (currentPoint.x === point2.x && currentPoint.y === point2.y) break;

			const e2 = 2 * err;
			if (e2 > -dy) {
				err -= dy;
				currentPoint.x += sx;
			}
			if (e2 < dx) {
				err += dx;
				currentPoint.y += sy;
			}
		}
	}

	function getCanvasCoords(event: MouseEvent | PointerEvent): Point {
		if (!canvas) return { x: 0, y: 0 };
		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;
		return {
			x: (event.clientX - rect.left) * scaleX,
			y: (event.clientY - rect.top) * scaleY
		};
	}

	function getPixelCoords(event: MouseEvent | PointerEvent): Point {
		let { x, y } = getCanvasCoords(event);
		// Ensure pixel coordinates are within the art boundaries
		const pixelX = Math.max(0, Math.min(Math.floor(x / pixelSize), (art?.width ?? 0) - 1));
		const pixelY = Math.max(0, Math.min(Math.floor(y / pixelSize), (art?.height ?? 0) - 1));
		return { x: pixelX, y: pixelY };
	}

	function drawPixel(pixel: Pixel, native = true) {
		if (!ctx || !art) return;

		if (pixel.x < 0 || pixel.x >= art.width || pixel.y < 0 || pixel.y >= art.height) {
			return;
		}

		if (native && art.board[pixel.x][pixel.y] && art.board[pixel.x][pixel.y] == pixel.color) return;

		if (prevPoint && prevPoint.x == pixel.x && prevPoint.y == pixel.y) return;

		if (room && native) room.send(pixel);

		// console.log(pixel);
		if (pixel.color) {
			ctx.fillStyle = pixel.color;
			// Draw a single pixel at the specified coordinate, brush size is handled in drawLine
			ctx.fillRect(
				pixel.x * pixelSize,
				pixel.y * pixelSize,
				pixelSize, // Draw a single pixel
				pixelSize // Draw a single pixel
			);
		} else {
			// Clear pixel by redrawing the background pattern
			drawBackgroundPixel(pixel.x, pixel.y);
		}
	}

	// Function to draw the checkered background for a single pixel
	function drawBackgroundPixel(x: number, y: number) {
		if (!ctx || !art) return;
		// Use the same logic as in the CSS background, but for a single pixel area
		const color1 = '#e0e0e0'; // Light grey
		const color2 = '#f0f0f0'; // Slightly lighter grey
		const halfPixel = pixelSize / 2;

		if ((x + y) % 2 === 0) {
			ctx.fillStyle = color1;
			ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
			ctx.fillStyle = color2;
			ctx.fillRect(x * pixelSize, y * pixelSize, halfPixel, halfPixel);
			ctx.fillRect(x * pixelSize + halfPixel, y * pixelSize + halfPixel, halfPixel, halfPixel);
		} else {
			ctx.fillStyle = color2;
			ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
			ctx.fillStyle = color1;
			ctx.fillRect(x * pixelSize, y * pixelSize, halfPixel, halfPixel);
			ctx.fillRect(x * pixelSize + halfPixel, y * pixelSize + halfPixel, halfPixel, halfPixel);
		}
	}

	function handleRightClick(event: MouseEvent) {
		event.preventDefault(); // Prevent the default right-click context menu
		const pixelCoords = getPixelCoords(event);
		// Erase a brush-sized area
		for (let i = 0; i < brushSize; i++) {
			for (let j = 0; j < brushSize; j++) {
				drawPixel({ x: pixelCoords.x + i, y: pixelCoords.y + j, color: undefined });
			}
		}
		prevPoint = pixelCoords;
	}

	function handleLeftClick(event: MouseEvent) {
		const pixelCoords = getPixelCoords(event);
		// Draw a brush-sized area
		for (let i = 0; i < brushSize; i++) {
			for (let j = 0; j < brushSize; j++) {
				drawPixel({ x: pixelCoords.x + i, y: pixelCoords.y + j, color: brushColor });
			}
		}
		prevPoint = pixelCoords;
	}

	function handleMouseMove(event: PointerEvent) {
		if (!canvas || !art) return;

		const buttons = event.buttons;
		const isDrawing = buttons === 1;
		const isErasing = buttons === 2; // Right mouse button

		if (isDrawing || isErasing) {
			let events = event.getCoalescedEvents();
			for (const e of events) {
				const pixelCoords = getPixelCoords(e);
				if (pixelCoords == prevPoint) continue;
				const color = isDrawing ? brushColor : undefined; // Use undefined for erasing

				if (prevPoint) {
					drawLine(prevPoint, pixelCoords, color);
				} else {
					// Draw a single pixel/area if it's the start of a stroke
					for (let i = 0; i < brushSize; i++) {
						for (let j = 0; j < brushSize; j++) {
							drawPixel({ x: pixelCoords.x + i, y: pixelCoords.y + j, color });
						}
					}
				}
				prevPoint = pixelCoords;
			}
		} else {
			prevPoint = null; // Reset prevPoint when not drawing or erasing
			// Optional: Add hover effect here if desired
		}
	}

	onMount(async () => {
		if (!canvas) return;

		ctx = canvas.getContext('2d')!;
		ctx.imageSmoothingEnabled = false;

		const { data, status } = await api.arts.get({ query: { artId, userName } });

		if (!data || status !== 200) {
			console.error('Failed to load art data:', status);
			return;
		}

		art = data;
		if (art) {
			canvas.width = art.width * pixelSize;
			canvas.height = art.height * pixelSize;

			// Draw initial checkered background
			for (let x = 0; x < art.width; x++) {
				for (let y = 0; y < art.height; y++) {
					drawBackgroundPixel(x, y);
				}
			}
		}
		// Set canvas dimensions based on art size and pixel size

		room = api.canvases.subscribe({
			query: {
				artId,
				userName
			}
		});

		room.on('message', ({ data }) => {
			if (data) {
				const { pixel, board } = data;
				if (pixel) {
					// Draw a single received pixel
					drawPixel(pixel, false);
					if (art) art.board[pixel.x][pixel.y] = pixel.color;
				} else if (board) {
					// Redraw the entire board if received
					for (let x = 0; x < art!.width; x++) {
						for (let y = 0; y < art!.height; y++) {
							drawPixel({ x, y, color: board[x][y] }, false);
						}
					}
				}
			}
		});
	});
</script>

<div class="canvas-container">
	<div class="controls">
		<label for="colorPicker">Цвет:</label>
		<input type="color" id="colorPicker" bind:value={brushColor} />

		<label for="brushSize">Размер кисти:</label>
		<input type="range" id="brushSize" bind:value={brushSize} min="1" max="10" step="1" />
		<span>{brushSize}</span>
	</div>
	<canvas
		bind:this={canvas}
		onpointermove={handleMouseMove}
		onpointerdown={handleLeftClick}
		oncontextmenu={handleRightClick}
		class="pixel-canvas"
	></canvas>
</div>

<style>
	.canvas-container {
		display: flex;
		flex-direction: column;
		align-items: center; /* Center canvas horizontally */
		padding: 20px;
		background-color: #f8f8f8; /* Light background for the page */
		min-height: 100vh; /* Ensure container takes at least full viewport height */
		box-sizing: border-box; /* Include padding in height calculation */
	}

	.controls {
		margin-bottom: 20px;
		padding: 15px;
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		gap: 15px; /* Space between controls */
		flex-wrap: wrap; /* Allow controls to wrap on smaller screens */
	}

	.controls label {
		font-weight: bold;
		color: #555;
	}

	.controls input[type='color'] {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		width: 40px;
		height: 40px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		padding: 0;
		overflow: hidden; /* Hide the default color picker border */
	}

	.controls input[type='color']::-webkit-color-swatch-wrapper {
		padding: 0;
	}

	.controls input[type='color']::-webkit-color-swatch {
		border: none;
		border-radius: 5px;
	}

	.controls input[type='color']::-moz-color-swatch-wrapper {
		padding: 0;
	}

	.controls input[type='color']::-moz-color-swatch {
		border: none;
		border-radius: 5px;
	}

	.controls input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		height: 8px;
		background: #ddd;
		outline: none;
		opacity: 0.7;
		transition: opacity 0.2s;
		border-radius: 5px;
		cursor: pointer;
		width: 100px; /* Adjust slider width as needed */
	}

	.controls input[type='range']:hover {
		opacity: 1;
	}

	.controls input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		background: #007bff; /* Thumb color */
		cursor: pointer;
		border-radius: 50%;
	}

	.controls input[type='range']::-moz-range-thumb {
		width: 20px;
		height: 20px;
		background: #007bff; /* Thumb color */
		cursor: pointer;
		border-radius: 50%;
	}

	.controls span {
		font-weight: bold;
		color: #333;
		min-width: 20px; /* Ensure space for brush size number */
		text-align: center;
	}

	.pixel-canvas {
		border: 1px solid #ccc;
		image-rendering: pixelated;
		/* Remove width and height 100% from here to let the canvas size be controlled by JS */
		/* width: 100%; */
		/* height: 100%; */
		display: block; /* Remove extra space below canvas */
		background-color: #fff; /* Fallback background */
		/* Add a checkered background using CSS gradients */
		background-image:
			linear-gradient(45deg, #e0e0e0 25%, transparent 25%, transparent 75%, #e0e0e0 75%, #e0e0e0),
			linear-gradient(-45deg, #e0e0e0 25%, transparent 25%, transparent 75%, #e0e0e0 75%, #e0e0e0);
		background-size: calc(var(--pixel-size) * 2) calc(var(--pixel-size) * 2); /* Size of the checkered squares */
		/* We'll set --pixel-size via JS to match the actual pixel rendering size */
	}
</style>
