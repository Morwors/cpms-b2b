<script lang="ts">
    import {browser} from "$app/environment";

    import Table from "../Table.svelte";
    import {chargers, handleChargersLongPool} from "../../../stores/charger.store";
    import AddChargerModal from "./AddChargerModal.svelte";
    import ChargerModal from "./ChargerModal.svelte";

    let expanded = true;
    const tableHeaders = [
        'Charger ID',
        'Charger address',
        'Charger location',
        'Charger type',
        'Max power',
        'Number of connectors',
        'Responsible Admin',
        'Charger QR code',
        'Edit information'
    ]

    if (browser) {
        handleChargersLongPool().then(() => {
            selectedRow = $chargers[0].id
        })
    }
    let selectedRow = -1
    let showModal = false;
    function handleSelectRow(id: number) {
        console.log("Selected row: ", id)
        selectedRow = id;
    }

</script>

<div class="flex-1 p-5 flex flex-col md:flex-row gap-5">
    <div class="bg-white flex-grow card p-10">
        <Table tableSize="{$chargers.length}" tableHeaders="{tableHeaders}" bind:expanded={expanded}>
            <svelte:fragment slot="header">
                <div class="flex flex-row justify-between items-center">

                    <h3 class="col-span-full">Chargers</h3>
                    <button class="bg-[#1E4CDC] w-[120px] text-white text-[12px] p-2.5 text-center rounded-[5px]" on:click={()=>{showModal =true}}>Add charger</button>
                </div>
            </svelte:fragment>
            <svelte:fragment slot="rows">
                {#each $chargers as charger}
                    <tr on:click={()=>{handleSelectRow(charger.id)}}
                        class="{selectedRow===charger.id?'selectedRow':''}">
                        <td>{charger.id}</td>
                        <td class="whitespace-nowrap">{charger.country}, {charger.city}, {charger.street}</td>
                        <td class="whitespace-nowrap">({charger.latitude}, {charger.longitude})</td>
                        <td>TBD</td>
                        <td>TBD</td>
                        <td>TBD</td>
                        <td>TBD</td>
                        <td><button class="text-[#333333] text-[14px] font-medium underline">See Qr Code</button></td>
                        <td class="flex flex-row gap-10 items-center relative">TBD <button class="bg-[#1E4CDC] w-[95px] text-white text-[12px] p-2 flex flex-row gap-3 items-center absolute justify-center"><img src="/icons/table/penIcon.svg" class="h-5"/> Edit</button></td>
                    </tr>
                {/each}
            </svelte:fragment>
        </Table>
    </div>

</div>
<ChargerModal bind:showModal={showModal} selectedCharger="{$chargers[0]}"/>
<style>
    /*@import "active.css";*/
</style>