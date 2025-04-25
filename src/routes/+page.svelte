<script>
  import PixelCanvas from "./PixelCanvas.svelte";
  let color = '#ff0000';
  let size = 1;
</script>

<input type="color" bind:value={color} />
<input type="number" bind:value={size} min="1" max="10" />

<PixelCanvas width={64} height={64} bind:brushColor={color} bind:brushSize={size} />
