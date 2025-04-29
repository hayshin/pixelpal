<script lang="ts">
  import { goto } from '$app/navigation';
  import { Calendar, User, Ruler, ArrowRight } from 'lucide-svelte';
  import type { Art } from '$shared/types';

  export let art: Art;

  // Format creation date nicely
  const formattedDate = new Date(art.created).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Generate a simple pixel preview (placeholder until you implement real preview)
  function generatePreview(width: number, height: number) {
    const previewSize = Math.min(width, height, 8); // Max 8x8 preview
    return Array.from({ length: previewSize * previewSize }).map((_, i) => {
      // Simple color pattern for placeholder
      const x = i % previewSize;
      const y = Math.floor(i / previewSize);
      const hue = (x * 30 + y * 40) % 360;
      return `hsl(${hue}, 70%, 80%)`;
    });
  }

  const previewColors = generatePreview(art.width, art.height);
</script>

<button
  class="group relative overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
  on:click={() => goto(`/art/${art.id}`)}
  aria-label={`View ${art.title} pixel art`}
>
  <div class="relative h-40 w-full bg-gray-100">
    <div
      class="absolute inset-0 grid place-items-center"
      style={`grid-template-columns: repeat(${Math.min(art.width, 8)}, 1fr); grid-template-rows: repeat(${Math.min(art.height, 8)}, 1fr);`}
    >
      {#each previewColors as color, i}
        <div
          class="h-full w-full border border-white/30"
          style={`background-color: ${color}`}
        />
      {/each}
    </div>
    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
      <span class="text-white text-sm font-medium flex items-center">
        View Art <ArrowRight size={16} class="ml-1" />
      </span>
    </div>
  </div>

  <div class="p-4">
    <h3 class="text-lg font-semibold text-gray-900 truncate mb-1">{art.title}</h3>

    <div class="flex items-center text-sm text-gray-500 mb-2">
      <User size={14} class="mr-1.5 flex-shrink-0" />
      <span class="truncate">{art.owner || 'Anonymous'}</span>
    </div>

    <div class="flex justify-between text-sm">
      <div class="flex items-center text-gray-500">
        <Ruler size={14} class="mr-1.5 flex-shrink-0" />
        <span>{art.width}×{art.height}</span>
      </div>

      <div class="flex items-center text-gray-500">
        <Calendar size={14} class="mr-1.5 flex-shrink-0" />
        <span>{formattedDate}</span>
      </div>
    </div>
  </div>
</button>

<style>
  button {
    transition-property: transform, box-shadow;
    will-change: transform;
  }

  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
