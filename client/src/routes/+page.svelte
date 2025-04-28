<script lang="ts">
  // import PixelCanvas from "./PixelCanvas.svelte";

  // let color = "#ff0000";
  // let size = 1;

  // async function getUserData() {
  //   let userName = localStorage.getItem("name");
  //   if (!userName) {
  //     userName = prompt("Write your nickname") ?? "";
  //     localStorage.setItem("name", userName);
  //   }

  //   let canvasId = "";
  //   if (!canvasId) {
  //     canvasId = prompt("Write your canvas ID") ?? "";
  //     localStorage.setItem("canvas", canvasId);
  //   }

  //   return { name: userName, canvas: canvasId };
  // }

  // const userData = getUserData();
</script>

<!--<input type="color" bind:value={color} />
<input type="number" bind:value={size} min="1" max="10" />


{#await userData}
  <p>Loading user data...</p>
{:then { name, canvas }}
  <PixelCanvas
    width={64}
    height={64}
    userName={name}
    canvasId={canvas}
    bind:brushColor={color}
    bind:brushSize={size}
  />
{/await}
--->
