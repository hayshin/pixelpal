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

  export let columns: number = 4; // Default number of columns
  export let gap: number = 16; // Gap between items in pixels
  export let thumbnailSize: number = 150; // Default thumbnail size

  // Responsive columns based on viewport width
  $: responsiveColumns = Math.max(1, Math.min(columns, 6));

  $: gridStyle = `
    grid-template-columns: repeat(${responsiveColumns}, minmax(0, 1fr));
    gap: ${gap}px;
  `;
</script>

<div class="grid" style={gridStyle}>
  {#each arts as art (art.id)}
    <PixelArtThumbnail {art} size={thumbnailSize} />
  {/each}
</div>

<style>
  .grid {
    display: grid;
    width: 100%;
    padding: 16px;
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }
  }

  @media (max-width: 480px) {
    .grid {
      grid-template-columns: 1fr !important;
    }
  }
</style>
