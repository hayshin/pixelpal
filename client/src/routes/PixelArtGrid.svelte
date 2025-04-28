<script lang="ts">
  import PixelArtThumbnail from "./PixelArtThumbnail.svelte";
  export let arts: Array<{
    id: string;
    title: string;
    width: number;
    height: number;
    pixelData: string[];
    author?: string;
    likes?: number;
  }>;

  export let columns: number = 4;
  export let gap: number = 16;
  export let thumbnailSize: number = 150;
  export let activeEditableTitle: string | null = null;

  $: responsiveColumns = Math.max(1, Math.min(columns, 6));
  $: gridStyle = `
    grid-template-columns: repeat(${responsiveColumns}, minmax(0, 1fr));
    gap: ${gap}px;
  `;
</script>

<div class="grid" style={gridStyle}>
  {#each arts as art (art.id)}
    <PixelArtThumbnail
      {art}
      size={thumbnailSize}
      bind:activeEditableTitle
    />
  {/each}
</div>

<style>
  /* Previous styles remain the same */
</style>
