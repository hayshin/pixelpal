<script lang="ts">
  export let art: {
    id: string;
    title: string;
    width: number;
    height: number;
    pixelData: string[];
    author?: string;
    likes?: number;
  };

  export let size: number = 150;
  export let activeEditableTitle: string | null = null;

  let isEditing = false;
  let tempTitle = art.title;

  $: pixelSize = Math.min(
    Math.floor(size / art.width),
    Math.floor(size / art.height)
  );

  $: canvasWidth = art.width * pixelSize;
  $: canvasHeight = art.height * pixelSize;

  $: isEditing = activeEditableTitle === art.id;

  function handleTitleClick() {
    if (!isEditing) {
      activeEditableTitle = art.id;
      tempTitle = art.title;
    }
  }

  function saveTitle() {
    if (isEditing) {
      dispatch('editTitle', { id: art.id, title: tempTitle });
    }
  }
  import { onMount, createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let canvas: HTMLCanvasElement;

  onMount(() => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    for (let y = 0; y < art.height; y++) {
      for (let x = 0; x < art.width; x++) {
        const index = y * art.width + x;
        const color = art.pixelData[index] || '#FFFFFF';
        ctx.fillStyle = color;
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  });
</script>

<div class="thumbnail" style="width: {size}px; height: {size}px;">
  <canvas
    width={canvasWidth}
    height={canvasHeight}
    bind:this={canvas}
    class="pixel-canvas"
  ></canvas>

  <div class="info">
    {#if isEditing}
      <input
        type="text"
        bind:value={tempTitle}
        on:blur={saveTitle}
        on:keydown={(e) => e.key === 'Enter' && saveTitle()}
        class="title-input"
        autofocus
      >
    {:else}
      <h3 class="title" on:click={handleTitleClick}>{art.title}</h3>
    {/if}

    {#if art.author}
      <span class="author">by {art.author}</span>
    {/if}
    {#if art.likes !== undefined}
      <span class="likes">♥ {art.likes}</span>
    {/if}
  </div>
</div>


<style>
  /* Previous styles remain the same */

  .title-input {
    width: 100%;
    padding: 2px 4px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 14px;
    font-weight: 600;
    border-radius: 3px;
  }

  .title {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: text;
  }
</style>
