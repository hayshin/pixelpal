<script lang="ts">
  import { Link, X, Check, ArrowRight } from 'lucide-svelte';
  import { createEventDispatcher } from 'svelte';


 let {userName=$bindable(), show = $bindable(), handleArtJoin}: {
    userName: string,
    show: boolean,
    handleArtJoin(artId: string): void;
  } = $props();

  let artLink = $state('');
  let isSubmitting = $state(false);
  let error = $state('');

  function handleSubmit() {
    if (!artLink.trim()) {
      error = 'Please enter a valid art link or ID';
      return;
    }

    // Extract ID from URL
    const parts = artLink.split('/');
    const artId = parts[parts.length - 1].trim();

    if (!artId) {
      error = 'Invalid art link format';
      return;
    }

    isSubmitting = true;
    error = '';
    handleArtJoin(artId);
    artLink = '';
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
        <div class="bg-emerald-600 px-4 py-5 sm:px-6">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium leading-6 text-white" id="modal-title">
              Join Existing Pixel Art
            </h3>
            <button
              type="button"
              class="rounded-md text-emerald-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
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
              <label for="art-link" class="block text-sm font-medium text-gray-700 mb-1">
                Art Link or ID
              </label>
              <div class="relative mt-1 rounded-md shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Link size={18} class="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="art-link"
                  bind:value={artLink}
                  class="block w-full rounded-md border-gray-300 pl-10 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm py-2"
                  placeholder="https://pixelpal.com/art/abc123 or just abc123"
                />
              </div>
              {#if error}
                <p class="mt-2 text-sm text-red-600">{error}</p>
              {/if}
            </div>

            <div class="rounded-lg bg-emerald-50 p-4">
              <h4 class="text-sm font-medium text-emerald-800 mb-2">
                Where to find the art link?
              </h4>
              <ul class="text-sm text-emerald-700 space-y-1">
                <li class="flex items-start">
                  <ArrowRight size={16} class="mr-2 mt-0.5 flex-shrink-0" />
                  <span>Ask the art creator for the shareable link</span>
                </li>
                <li class="flex items-start">
                  <ArrowRight size={16} class="mr-2 mt-0.5 flex-shrink-0" />
                  <span>Copy the URL from your browser when viewing the art</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            class="inline-flex w-full justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            on:click={handleSubmit}
            disabled={!artLink || isSubmitting}
          >
            {#if isSubmitting}
              Joining...
            {:else}
              <Check size={18} class="mr-2" />
              Join Art
            {/if}
          </button>
          <button
            type="button"
            class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            on:click={handleClose}
          >
            <X size={18} class="mr-2" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
