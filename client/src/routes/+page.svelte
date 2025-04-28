<script lang="ts">
  import PixelCanvas from "./PixelCanvas.svelte";
  import { onMount } from "svelte";
  let color = "#ff0000";
  let size = 1;
  let name: string | null;
  let canvas: string | null;
  onMount(() => {
    name = localStorage.getItem("name");
    while (!name) {
      name = prompt("Write your nickname");
    }
    localStorage.setItem("name", name);
    console.log(name);
    canvas = localStorage.getItem("canvas");
    while (!canvas) {
      canvas = prompt("Write your canvas");
    }
    localStorage.setItem("canvas", canvas);
    console.log(canvas);
  });
</script>

<input type="color" bind:value={color} />
<input type="number" bind:value={size} min="1" max="10" />

<PixelCanvas
  width={64}
  height={64}
  bind:brushColor={color}
  bind:brushSize={size}
/>
