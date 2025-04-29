<script>
  import { Card } from 'flowbite-svelte';
  export let art;
</script>
<Card href="/cards">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{art.title}</h5>
  <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">sizes: {art.width}x{art.height}</p>
  <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">owner: {art.owner}</p>
  <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">date: {art.created}</p>
</Card>
