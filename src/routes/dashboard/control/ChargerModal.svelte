<script lang="ts">
    import AddChargerModal from "./AddChargerModal.svelte";
    import type {ICharger} from "../../../interfaces/ICharger";
    import QRConnectorsModal from "./QRConnectorsModal.svelte";

    export let showModal = true; // boolean

    let dialog; // HTMLDialogElement

    $: if (dialog && showModal) dialog.showModal();

    let loading = false;
    export let selectedCharger: ICharger | null;


    let page = 1;
</script>

<dialog bind:this={dialog}
        on:close={() => (showModal = false)}
        on:click|self={() =>{ if(!loading) dialog.close()}}>

    {#if page === 0}
        <AddChargerModal bind:selectedCharger={selectedCharger} bind:loading={loading} bind:page={page}/>
    {/if}
    {#if page === 1}
        <QRConnectorsModal bind:selectedCharger={selectedCharger}/>
    {/if}
</dialog>
