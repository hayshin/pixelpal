<script lang="ts">
  import { X, Ruler, Type, Check, X as CloseIcon } from 'lucide-svelte';
  import { createEventDispatcher } from 'svelte';


 let {userName=$bindable(), show = $bindable(), handleArtCreate}: {
    userName: string;
    show: boolean;
    handleArtCreate(title:string, width:number, height:number): void;
  } = $props();

  let title = $state('');
  let width = $state(64);
  let height = $state(64);
  let isSubmitting = $state(false);

  function handleSubmit() {
    if (!title || width <= 0 || height <= 0) return;

    isSubmitting = true;
    handleArtCreate(title, width, height);

    // Reset form
    title = '';
    width = 64;
    height = 64;
    isSubmitting = false;
  }

  function handleClose() {
    show = false;
  }
</script>

{#if show}
  <div
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    aria-modal="true"
    role="dialog"
  >
    <div
      class="fixed inset-0 bg-black/50 transition-opacity"
      on:click={handleClose}
      aria-hidden="true"
    />

    <div class="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
      <div
        class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        on:click|stopPropagation
      >
        <div class="bg-indigo-600 px-4 py-5 sm:px-6">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium leading-6 text-white" id="modal-title">
              Create New Pixel Art
            </h3>
            <button
              type="button"
              class="rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              on:click={handleClose}
            >
              <span class="sr-only">Close</span>
              <X size={24} />
            </button>
          </div>
        </div>

        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="space-y-6">
            <div>
              <label for="art-title" class="block text-sm font-medium text-gray-700 mb-1">
                Art Title
              </label>
              <div class="relative mt-1 rounded-md shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Type size={18} class="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="art-title"
                  bind:value={title}
                  class="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                  placeholder="My Awesome Pixel Art"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="art-width" class="block text-sm font-medium text-gray-700 mb-1">
                  Width (px)
                </label>
                <div class="relative mt-1 rounded-md shadow-sm">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Ruler size={18} class="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="art-width"
                    bind:value={width}
                    min="16"
                    max="256"
                    class="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                  />
                </div>
              </div>

              <div>
                <label for="art-height" class="block text-sm font-medium text-gray-700 mb-1">
                  Height (px)
                </label>
                <div class="relative mt-1 rounded-md shadow-sm">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Ruler size={18} class="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="art-height"
                    bind:value={height}
                    min="16"
                    max="256"
                    class="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                  />
                </div>
              </div>
            </div>

            <div>
              <p class="text-sm text-gray-500 mb-2">
                Preview: {width} × {height} pixels
              </p>
              <div class="h-32 w-full bg-gray-100 rounded-md border border-gray-200 overflow-hidden">
                <div
                  class="grid bg-white"
                  style={`grid-template-columns: repeat(${Math.min(width, 16)}, 1fr); grid-template-rows: repeat(${Math.min(height, 16)}, 1fr); height: 100%;`}
                >
                  {#each Array(Math.min(width * height, 256)) as _, i}
                    <div class="border border-gray-100"></div>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            on:click={handleSubmit}
            disabled={!title || isSubmitting}
          >
            {#if isSubmitting}
              Creating...
            {:else}
              <Check size={18} class="mr-2" />
              Create Art
            {/if}
          </button>
          <button
            type="button"
            class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            on:click={handleClose}
          >
            <CloseIcon size={18} class="mr-2" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
