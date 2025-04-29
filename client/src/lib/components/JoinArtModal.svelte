<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let show = false; // Проп для управления видимостью

  let artLink = ''; // Предполагаем, что пользователь введет ссылку или ID

  function handleSubmit() {
    if (artLink) {
      // Извлекаем ID из ссылки. Простая реализация: предполагаем, что ID в конце URL
      const parts = artLink.split('/');
      const boardId = parts[parts.length - 1]; // Получаем последний сегмент

      if (boardId) {
        dispatch('join', { boardId });
        artLink = ''; // Сброс формы
      } else {
        alert('Пожалуйста, введите корректную ссылку или ID картины.');
      }
    }
  }

  function handleClose() {
    dispatch('close');
  }
</script>

{#if show}
  <div class="modal-backdrop" on:click={handleClose}></div>
  <div class="modal-content">
    <h2>Присоединиться к картине</h2>
    <label>
      Ссылка или ID картины:
      <input type="text" bind:value={artLink} placeholder="Например: http://yoursite.com/art/abcdef12345" />
    </label>
    <div class="modal-actions">
      <button on:click={handleSubmit}>Присоединиться</button>
      <button on:click={handleClose}>Отмена</button>
    </div>
  </div>
{/if}

<style>
  /* Стили такие же, как в CreateArtModal.svelte, или вынести общие стили модалок в app.css */
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
