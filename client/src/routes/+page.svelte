<script lang="ts">
	import { api } from '$lib/eden';
	let a = 0;
	let b = 0;
	let total = 0;

	async function add() {
		const{ data, status } = await api.add.post({ a, b });
		if (data && status == 200) total = data.total;
	}

</script>

<input type="number" bind:value={a} /> +
<input type="number" bind:value={b} /> =
{total}

<button onclick={add}>Calculate</button>
