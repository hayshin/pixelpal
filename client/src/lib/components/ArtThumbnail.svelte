<script lang=ts>
  import { goto } from '$app/navigation';
  import type { Art } from '$shared/types';
  let {art}: {art: Art} = $props();
</script>

<button class="art-thumbnail" onclick={() => goto(`/art/${art.id}`)}>
  <h3>{art.title}</h3>
  <p>Размер: {art.width}x{art.height}</p>
  <p>Владелец: {art.owner || 'Неизвестно'}</p>
  <p>Создана: {new Date(art.created).toLocaleDateString()}</p>
  <div class="thumbnail-placeholder">
    Placeholder for the pixel art preview
    Превью
  </div>
</button>

<style>
  .art-thumbnail {
    border: 1px solid #ccc;
    padding: 1rem;
    text-align: left;
    cursor: pointer;
    background-color: #f9f9f9;
    border-radius: 8px;
    transition: transform 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
  }

  .art-thumbnail:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0 0 0.25rem 0;
    font-size: 0.9em;
    color: #555;
  }

  .thumbnail-placeholder {
    margin-top: 1rem;
    width: 100%;
    padding-top: 100%; /* Для квадратного контейнера */
    position: relative;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8em;
    color: #888;
    /* TODO: Здесь будет отрисовка миниатюры из board.board */
  }
</style>
