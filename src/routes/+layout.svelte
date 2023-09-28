<script>
	import "../app.css";
	import {browser} from "$app/environment";
	import {goto} from "$app/navigation";
	import {page} from "$app/stores";
	if (browser) {
		if($page.url.pathname==='/'){
			goto("/dashboard/active")
		}
	}
</script>

<div class="flex flex-col min-h-[100vh]">
	<main>
		<slot />
	</main>
</div>
