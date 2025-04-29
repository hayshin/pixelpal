<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let show = false; // Проп для управления видимостью

  let title = '';
  let width = 64;
  let height = 64;

  function handleSubmit() {
    if (title && width > 0 && height > 0) {
      dispatch('create', { title, width, height });
      title = ''; // Сброс формы
      width = 64;
      height = 64;
    }
  }

  function handleClose() {
    dispatch('close');
  }
</script>

{#if show}
  <div class="modal-backdrop" on:click={handleClose}></div>
  <div class="modal-content">
    <h2>Создать новую картину</h2>
    <label>
      Название:
      <input type="text" bind:value={title} />
    </label>
    <label>
      Ширина:
      <input type="number" bind:value={width} min="1" />
    </label>
    <label>
      Высота:
      <input type="number" bind:value={height} min="1" />
    </label>
    <div class="modal-actions">
      <button on:click={handleSubmit}>Создать</button>
      <button on:click={handleClose}>Отмена</button>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }

  .modal-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    z-index: 20;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .modal-content label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .modal-content input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
</style>
