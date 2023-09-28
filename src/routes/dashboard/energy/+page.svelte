<script lang="ts">
    import {browser} from "$app/environment";

    import Table from "../Table.svelte";
    import {actives, handleActiveLongPool} from "../../../stores/active.store.ts";
    import {selectedHistories} from "../../../stores/history.store";
    import EditEnergyModal from "./EditEnergyModal.svelte";
    let showModal = false;
    let expanded = true;
    const tableHeaders = [
        'Charger ID',
        'Connector ID',
        'Charger max.power',
        'Current max.power'

    ]

    if (browser) {
        handleActiveLongPool()
    }
    let selectedRow = -1

    function handleSelectRow(id: number) {
        console.log("Selected row: ", id)
        selectedRow = id;
    }

</script>
<EditEnergyModal bind:showModal={showModal}/>
<div class="flex-1 p-5 flex flex-col md:flex-row gap-5">
    <div class="bg-white flex-grow card p-10">
        <Table tableSize="{$actives.length}" tableHeaders="{tableHeaders}" bind:expanded={expanded}>
            <svelte:fragment slot="header">
                <div class="flex flex-row justify-between items-center">
                    <h3 class="col-span-full text-[16px] font-medium">Energy management</h3>
                </div>
                <div class="flex flex-row justify-between">
                    <div class="relative">
                        <img class="absolute h-5 left-3 top-2.5" src="/icons/table/searchIcon.svg"/>
                        <input class="searchInput pt-2 pb-2 pl-12 pr-5 w-[300px]" placeholder="Search">
                    </div>
                </div>

            </svelte:fragment>

            <svelte:fragment slot="rows">
                {#each $actives as activeSession}
                    <tr on:click={()=>{handleSelectRow(activeSession.id)}}
                        class="{selectedRow===activeSession.id?'selectedRow':''}">
                        <td>TBD</td>
                        <td>TBD</td>
                        <td>TBD</td>
                        <td class="flex flex-row gap-10 items-center relative min-w-full w-[13rem]">TBD
                            {#if selectedRow===activeSession.id}
                                <button on:click={()=>{showModal=true}} class="bg-[#1E4CDC] text-white text-[12px] p-2 flex flex-row gap-3 items-center absolute right-5"><img src="/icons/table/penIcon.svg" class="h-5"/> Edit Price</button>
                            {/if}
                        </td>
                    </tr>
                {/each}
            </svelte:fragment>
        </Table>
    </div>

</div>
<style>
    /*@import "active.css";*/
</style>