<script lang=ts>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import ArtThumbnail from '$lib/components/ArtThumbnail.svelte';
  import CreateArtModal from '$lib/components/CreateArtModal.svelte';
  import JoinArtModal from '$lib/components/JoinArtModal.svelte';
  import {api} from '$lib/eden';
	import type { Art } from '$shared/types';

  let userName = $state('');
  let arts: Art[] = []; // Массив объектов Art
  let showCreateModal = $state(false);
  let showJoinModal = $state(false);

  function loadName() {
    const storedNickname = localStorage.getItem('username');
    if (storedNickname) {
      userName = storedNickname;
    } else {
      // Если никнейма нет, можно предложить его ввести или использовать значение по умолчанию
      // Пока просто оставим поле пустым
    }
  }
  // Загрузка списка картин при монтировании страницы
  onMount(async () => {
    // Загружаем никнейм из локального хранилища

    try {
      const { data, status } = await api.arts_of_user.get({query: {userName: userName}});
      if (data && status == 200) arts = data;
    } catch (error) {
      console.error('Ошибка при загрузке списка картин:', error);
      // TODO: Отобразить ошибку пользователю
    }
  });

  // Сохранение никнейма при его изменении (например, при потере фокуса поля ввода)
  function saveNickname() {
    if (userName) {
      localStorage.setItem('pixel_art_nickname', userName);
    } else {
      localStorage.removeItem('pixel_art_nickname');
    }
  }

  function openCreateModal() {
    showCreateModal = true;
  }

  function closeCreateModal() {
    showCreateModal = false;
  }

  async function handleArtCreate(title:string, width: number, height: number) {
    closeCreateModal();
    try {
      const {data, status} = await api.arts.post({
        title, width, height, userName
      })
      console.log(data, status);
      if (data && status == 200) {
        const artId = data;
        goto(`/art/${artId}`);
      }
      // После успешного создания, перенаправляем пользователя на страницу редактирования
      // TODO: Обновить список boards без перезагрузки, если нужно остаться на главной
      // boards = [...boards, newBoard]; // Если хотим добавить в список сразу
    } catch (error) {
      console.error('Ошибка при создании картины:', error);
      // TODO: Отобразить ошибку пользователю
    }
  }

  function openJoinModal() {
    showJoinModal = true;
  }

  function closeJoinModal() {
    showJoinModal = false;
  }

  function handleArtJoin(artId: string) {
    // const { boardId } = event.detail;
    closeJoinModal();
    // Перенаправляем пользователя на страницу редактирования по ID
    goto(`/art/${artId}`);
    // TODO: Проверить существование доски перед перенаправлением?
    // Это можно сделать через API вызов getBoard(boardId) перед goto
  }

</script>

<svelte:head>
  <title>Пиксельная Мастерская</title>
</svelte:head>

<h1>Добро пожаловать в Пиксельную Мастерскую</h1>

<div class="user-info">
  <label for="nickname">Ваш никнейм:</label>
  <input
    id="nickname"
    type="text"
    bind:value={userName}
    on:blur={saveNickname}
    placeholder="Введите никнейм"
  />
</div>

<div class="actions">
  <button on:click={openCreateModal}>Создать картину</button>
  <button on:click={openJoinModal}>Присоединиться к картине</button>
</div>

<h2>Ваши картины</h2>
<div class="board-grid">
  {#each arts as art (art.id)}
    <ArtThumbnail {art} />
  {/each}

  {#if arts.length === 0}
    <p>Нет доступных картин. Создайте новую или присоединитесь к существующей!</p>
  {/if}
</div>

<CreateArtModal bind:show={showCreateModal} bind:userName={userName} handleArtCreate={handleArtCreate}/>
<JoinArtModal bind:show={showJoinModal} bind:userName={userName} handleArtJoin={handleArtJoin}/>

<style>
  h1, h2 {
    text-align: center;
    color: #333;
  }

  .user-info {
    margin-bottom: 2rem;
    text-align: center;
  }

  .user-info label {
    margin-right: 0.5rem;
    font-weight: bold;
  }

  .user-info input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .actions button {
    padding: 0.75rem 1.5rem;
    font-size: 1em;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    transition: background-color 0.2s ease;
  }

  .actions button:hover {
    background-color: #0056b3;
  }

  .board-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Адаптивная сетка */
    gap: 1.5rem;
  }

  .board-grid p {
      text-align: center;
      grid-column: 1 / -1; /* Растянуть на всю ширину сетки */
      color: #666;
  }
</style>
