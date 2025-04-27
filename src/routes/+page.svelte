<script lang="ts">
	import { treaty } from '@elysiajs/eden';
	import type { App } from './api/+server';
	let a = 0;
	let b = 0;
	let total = 0;
	const app = treaty<App>('localhost:5173');


	async function add() {
		const{ data, status } = await app.api.add.post({ a, b });
		if (data && status == 200) total = data.total;
	}

</script>

<input type="number" bind:value={a} /> +
<input type="number" bind:value={b} /> =
{total}

<button onclick={add}>Calculate</button>
