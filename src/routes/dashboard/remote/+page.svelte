<script lang="ts">
    import {browser} from "$app/environment";

    import Table from "../Table.svelte";
    import {chargers, handleChargersLongPool} from "../../../stores/charger.store";
    import RemoteController from "./RemoteController.svelte";
    import {histories, selectedHistories} from "../../../stores/history.store";
    import FilterModal from "./FilterModal.svelte";

    let expanded = true;
    const tableHeaders = [
        'Charger ID',
        'Connector ID',
        'Charger address',
        'Charger Location',
        'Connector type',

    ]

    if (browser) {
        handleChargersLongPool().then(() => {
            selectedRow = $chargers[0].id
        })
    }
    let selectedRow = -1;
    let showModal = false;

    function handleSelectRow(id: number) {
        console.log("Selected row: ", id)
        selectedRow = id;
    }

</script>
<FilterModal bind:showModal={showModal}/>
<div class="flex-1 p-5 flex flex-col md:flex-row gap-5">
    <div class="bg-white flex-grow card p-10">
        <Table tableSize="{$chargers.length}" tableHeaders="{tableHeaders}" bind:expanded={expanded}>
            <svelte:fragment slot="header">
                <div class="flex flex-row justify-between items-center">
                    <h3 class="col-span-full text-[16px] font-medium">Remote control dashboard</h3>
                </div>
                <div class="flex flex-row justify-between items-center">
                    <div class="relative">
                        <img class="absolute h-5 left-3 top-2.5" src="/icons/table/searchIcon.svg"/>
                        <input class="searchInput pt-2 pb-2 pl-12 pr-5 w-[300px]" placeholder="Search">
                    </div>
                    <div class="flex flex-row gap-5">
                        <button on:click={()=>{showModal = true}}
                                class="remoteOutlineButton remoteOutlineButtonActive flex flex-row gap-3 items-center justify-center relative">
                            <img src="/icons/table/filterIconA.svg"/>Filter chargers
                        </button>
                    </div>
                </div>
            </svelte:fragment>

            <svelte:fragment slot="rows">
                {#each $chargers as charger}
                    <tr on:click={()=>{handleSelectRow(charger.id)}}
                        class="{selectedRow===charger.id?'selectedRow':''}">
                        <td>{charger.id}</td>
                        <td>TBD</td>
                        <td class="whitespace-nowrap">{charger.country}, {charger.city}, {charger.street}</td>
                        <td>({charger.latitude}, {charger.longitude})</td>
                        <td>TBD</td>
                    </tr>
                {/each}
            </svelte:fragment>
        </Table>
    </div>
    {#if selectedRow !== -1}
        <RemoteController selectedCharger="{$chargers.find(el=>el.id === selectedRow)}"/>
    {/if}

</div>
<style>
    @import "remote.css";
</style>