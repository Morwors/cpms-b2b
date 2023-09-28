<script lang="ts">
    import {browser} from "$app/environment";

    import Table from "../Table.svelte";
    import {actives, handleActiveLongPool} from "../../../stores/active.store.ts";
    import PricingChargingAnalytics from "./PricingChargingAnalytics.svelte";
    import {
        handleHistoryLongPool,
        handleSelectedHistory,
        histories,
        selectedHistories
    } from "../../../stores/history.store";
    import EditPricingModal from "./EditPricingModal.svelte";

    let expanded = true;
    let showModal = false;
    const tableHeaders = [
        'cb',
        'Charger ID',
        'Connector ID',
        'Current Price'

    ]

    if (browser) {
        handleHistoryLongPool()
    }
    let selectedRow = -1
    let openDownload = false

    function handleSelectRow(id: number) {
        console.log("Selected row: ", id)
        selectedRow = id;
    }

    function handleCheckbox(id, event) {
        console.log("Event: ", event)
        handleSelectedHistory(id, event);
    }

</script>
<EditPricingModal bind:showModal={showModal}/>
<div class="flex-1 p-5 flex flex-col md:flex-row gap-5">
    <div class="bg-white flex-grow card p-10">
        <Table tableSize="{$actives.length}" tableHeaders="{tableHeaders}" bind:expanded={expanded}>
            <th style="background: transparent" slot="checkbox" class="flex justify-center items-center">
                <input on:change={(e)=>{handleCheckbox(-1, e.target.checked)}} type="checkbox"/>
            </th>
            <svelte:fragment slot="header">
                <div class="flex flex-row justify-between items-center">
                    <h3 class="col-span-full text-[16px] font-medium">Pricing module</h3>
                </div>
                <div class="flex flex-row justify-between">
                    <div class="relative">
                        <img class="absolute h-5 left-3 top-2.5" src="/icons/table/searchIcon.svg"/>
                        <input class="searchInput pt-2 pb-2 pl-12 pr-5 w-[300px]" placeholder="Search">
                    </div>
                    <div class="flex flex-row gap-5">
                        <button disabled="{$selectedHistories.length===0}" on:click={()=>{openDownload =! openDownload}}
                                class="{$selectedHistories.length>0?'historyOutlineButtonActive':''} historyOutlineButton  flex flex-row gap-3 items-center justify-center relative">
                            <img
                                    src="/icons/table/downloadIcon.svg"/>Download
                            {#if openDownload}
                                <div class="absolute bg-white flex flex-col gap-5 p-5 bottom-[-7rem] w-[225px]">
                                    <div class="flex flex-row gap-5 justify-between">
                                        <div class="flex flex-row gap-5 items-center">
                                            <img src="/icons/logo/excel.png">
                                            <span class="text-[12px] font-normal text-[#021F0E]">Export To Excel</span>
                                        </div>
                                        <img src="/icons/table/downloadIcon.svg"/>
                                    </div>
                                    <div class="border-b-2"></div>
                                    <div class="flex flex-row gap-5 justify-between">
                                        <div class="flex flex-row gap-5 items-center">
                                            <img src="/icons/logo/csv.png">
                                            <span class="text-[12px] font-normal text-[#021F0E]">Export To CSV</span>
                                        </div>
                                        <img src="/icons/table/downloadIcon.svg"/>
                                    </div>
                                </div>
                            {/if}
                        </button>
                    </div>
                </div>

            </svelte:fragment>
            <svelte:fragment slot="rows">
                {#each $histories as historySession}
                    <tr on:click={()=>{handleSelectRow(historySession.id)}}
                        class="{selectedRow===historySession.id?'selectedRow':''}">
                        <td class="text-center"><input checked="{$selectedHistories.find(el=>el===historySession.id)}"
                                   on:change={(e)=>{handleCheckbox(historySession.id, e.target.checked)}}
                                   type="checkbox"/></td>
                        <td>TBD</td>
                        <td>TBD</td>
                        <td class="flex flex-row gap-10 items-center relative min-w-full w-[20rem]">TBD
                            {#if selectedRow===historySession.id}
                                <button on:click={()=>{showModal=true}} class="bg-[#1E4CDC] text-white text-[12px] p-2 flex flex-row gap-3 items-center absolute right-10"><img src="/icons/table/penIcon.svg" class="h-5"/> Edit Price</button>
                            {/if}
                        </td>
                    </tr>
                {/each}
            </svelte:fragment>
        </Table>
    </div>
    {#if selectedRow !== -1 && expanded}
        <PricingChargingAnalytics bind:selectedRow={selectedRow}/>
    {/if}

</div>
<style>
    @import "../history/history.css";
</style>