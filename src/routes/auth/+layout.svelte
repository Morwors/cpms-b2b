<script>
	import Header from './Header.svelte';

</script>

<div class="flex flex-col min-h-[100vh] gap-1">
	<Header />

	<main class="flex-auto flex bg-white">
		<slot />
	</main>
</div>
