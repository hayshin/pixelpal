<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import ArtThumbnail from '$lib/components/ArtThumbnail.svelte';
  import CreateArtModal from '$lib/components/CreateArtModal.svelte';
  import JoinArtModal from '$lib/components/JoinArtModal.svelte';
  import { api } from '$lib/eden';
  import type { Art } from '$shared/types';
  import { UserCircle, PlusCircle, Users } from 'lucide-svelte';
  // Icons

  let userName = $state('');
  let arts: Art[] = [];
  let showCreateModal = $state(false);
  let showJoinModal = $state(false);
  let isLoading = $state(false);

  function loadName() {
    const storedNickname = localStorage.getItem('name');
    userName = storedNickname ?? "anon";
  }

  async function loadArts() {
    if (!userName || userName === "anon") return;

    isLoading = true;
    try {
      const { data, status } = await api.arts_of_user.get({ query: { userName } });
      if (data && status === 200) arts = data;
    } catch (error) {
      console.error('Error loading arts:', error);
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    loadName();
    loadArts();
  });

  function saveNickname() {
    if (userName) {
      localStorage.setItem('name', userName);
      loadArts();
    } else {
      localStorage.removeItem('name');
    }
  }

  async function handleArtCreate(title: string, width: number, height: number) {
    try {
      const { data, status } = await api.arts.post({ title, width, height, userName });
      if (data && status === 200) {
        goto(`/art/${data}`);
      }
    } catch (error) {
      console.error('Error creating art:', error);
    }
  }

  function handleArtJoin(artId: string) {
    goto(`/art/${artId}`);
  }
</script>

<svelte:head>
  <title>Pixel Pal - Collaborative Pixel Art</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <header class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">Pixel Pal</h1>
      <p class="text-lg text-gray-600">Create and collaborate on pixel art in real-time</p>
    </header>

    <!-- User Section -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-8 max-w-md mx-auto">
      <div class="flex items-center gap-4 mb-6">
        <UserCircle size={32} class="text-indigo-500" />
        <div class="flex-1">
          <label for="nickname" class="block text-sm font-medium text-gray-700 mb-1">Your Nickname</label>
          <div class="flex gap-2">
            <input
              id="nickname"
              type="text"
              bind:value={userName}
              on:focusout={saveNickname}
              placeholder="Enter your nickname"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          on:click={() => showCreateModal = true}
          class="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
        >
          <PlusCircle size={20} />
          <span>Create Art</span>
        </button>
        <button
          on:click={() => showJoinModal = true}
          class="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
        >
          <Users size={20} />
          <span>Join Art</span>
        </button>
      </div>
    </div>

    <!-- Art Gallery -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Your Pixel Arts</h2>

      {#if isLoading}
        <div class="flex justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      {:else if arts.length === 0}
        <div class="bg-white rounded-xl shadow-sm p-8 text-center max-w-2xl mx-auto">
          <p class="text-gray-500 mb-4">No artworks yet. Create your first masterpiece!</p>
          <button
            on:click={() => showCreateModal = true}
            class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            Start Creating
          </button>
        </div>
      {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {#each arts as art (art.id)}
            <ArtThumbnail {art} />
          {/each}
        </div>
      {/if}
    </section>
  </div>
</div>

<!-- Modals -->
<CreateArtModal
  bind:show={showCreateModal}
  bind:userName={userName}
  handleArtCreate={handleArtCreate}
/>
<JoinArtModal
  bind:show={showJoinModal}
  bind:userName={userName}
  handleArtJoin={handleArtJoin}
/>

<style global>
  /* Smooth transitions for all interactive elements */
  button, input, a {
    transition: all 0.2s ease;
  }

  /* Better focus states */
  input:focus, button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
  }
</style>
