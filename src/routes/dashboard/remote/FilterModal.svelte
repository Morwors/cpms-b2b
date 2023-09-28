<script lang="ts">
    export let showModal = true; // boolean

    let dialog; // HTMLDialogElement

    $: if (dialog && showModal) dialog.showModal();

</script>

<dialog bind:this={dialog}
        on:close={() => (showModal = false)}
        on:click|self={() =>{ dialog.close() }}>

    <div class="bg-white p-10 flex flex-col gap-12">
        <div class="flex flex-row justify-between items-center">
            <p class="filterHeader">Filter Chargers</p>
            <img class="hover:cursor-pointer" on:click={()=>{dialog.close()}} src="/icons/table/closeIcon.svg"/>
        </div>
        <div class="flex flex-row justify-between gap-10 items-center">
            <label class="filterText">Search by Charger ID:</label>
            <input class="filterInput" placeholder="0001"/>
        </div>
        <div class="flex flex-row justify-between gap-10 items-center">
            <label class="filterText">Search by Charger type:</label>
            <select class="filterInput">
                <option>CSS</option>
                <option>CHAdeMO</option>
            </select>
        </div>
        <div class="flex flex-row justify-between gap-10 items-center">
            <label class="filterText">Search by charger status:</label>
            <select class="filterInput">
                <option>Available</option>
                <option>Occupied</option>
                <option>Not working</option>
            </select>
        </div>
        <button class="filterButton">Apply Filter</button>
    </div>

</dialog>

<style>
    .filterHeader {
        color: #8B8B8B;
        font-weight: 500;
        font-size: 18px;
    }

    .filterText {
        font-weight: 500;
        font-size: 16px;
        color: #021F0E;
    }

    .filterInput {
        background: #F6F6F6;
        border-radius: 5px;
        padding: 7px;
        color: #021F0E;
        font-weight: 300;
        font-size: 14px;
        width: 200px;
    }

    .filterInput:focus {
        outline: none;
    }

    .filterButton {
        color: #FFFFFF;
        font-weight: 500;
        font-size: 14px;
        background: #D9D9D9;
        border-radius: 5px;
        width: 150px;
        height: 35px;
        align-self: end;
    }
</style>
