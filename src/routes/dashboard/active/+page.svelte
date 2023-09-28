<script lang="ts">
    import {browser} from "$app/environment";

    import Table from "../Table.svelte";
    import {
        activePerPage, activePerPageData,
        actives,
        handleActiveLongPool,
        handlePageChangeActive,
        handlePerPageChangeActive
    } from "../../../stores/active.store.ts";
    import {histories} from "../../../stores/history.store";
    import HistoryChargingAnalytics from "../history/HistoryChargingAnalytics.svelte";
    import ActiveChargingAnalytics from "./ActiveChargingAnalytics.svelte";
    import moment from "moment";
    import {activePage} from "../../../stores/active.store.js";
    import ActiveModal from "./ActiveModal.svelte";

    let expanded = false;
    const tableHeaders = [
        'Charging session start time',
        'Charging session ID',
        'Charger ID',
        'Connector ID',
        'Duration of current charging session',
        'Current bill for a customer',
        'Electricity consumed',
        'Current power',
        'Average power during this charging session',
        'Current car battery'

    ]

    if (browser) {
        handleActiveLongPool()
    }
    let selectedRow = -1
    let showModal = false;

    function handleSelectRow(id: number) {
        console.log("Selected row: ", id)
        selectedRow = id;
    }

</script>
<ActiveModal bind:showModal={showModal}/>
<div class="flex-1 p-5 flex flex-col gap-5">
    {#if !expanded}
        <div class="bg-white flex-auto card p-10">
            <div class="flex flex-row gap-10 items-center">
                <h3>Active charging sessions</h3>
                <img class="h-[2.5rem]" src="/icons/battery/batteryIcon.svg">

            </div>
            <br>
            <h1 class="currentActiveSessions">{$actives.length}</h1>
        </div>
    {/if}
    <div class="flex flex-col md:flex-row gap-5">
        {#if !expanded}
            <div class="bg-white flex-grow card p-10">
                <h3 class="whitespace-nowrap">Average active charging session</h3>
                <table class="avgTable w-full">
                    <tr>
                        <th>Metric</th>
                        <th class="text-right" style="text-align: right">Average</th>
                    </tr>
                    <tr>
                        <td>Ticket</td>
                        <td>20 EUR</td>
                    </tr>
                    <tr>
                        <td>Duration</td>
                        <td>0h 30min 10s</td>
                    </tr>
                    <tr>
                        <td>Power</td>
                        <td>50 kW</td>
                    </tr>
                    <tr>
                        <td>Electricity consumed</td>
                        <td>45 kWh</td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>0,7 EUR/kWh</td>
                    </tr>
                </table>
            </div>
        {/if}
        <div class="bg-white flex-grow card p-10">
            <Table tableSize="{$actives.length}" tableHeaders="{tableHeaders}" bind:expanded={expanded}>
                <svelte:fragment slot="header">
                    <div class="flex flex-row justify-between items-center">
                        <h3 class="col-span-full">Active session overview</h3>
                        {#if expanded}
                            <img on:click={()=>{expanded = !expanded}} class="h-5 hover:cursor-pointer"
                                 src="/icons/table/closeIcon.svg"/>
                        {/if}
                    </div>
                    {#if expanded}
                        <div class="relative">
                            <img class="absolute h-5 left-3 top-2.5" src="/icons/table/searchIcon.svg"/>
                            <input class="searchInput pt-2 pb-2 pl-12 pr-5 w-[300px]" placeholder="Search">
                        </div>
                    {/if}
                </svelte:fragment>
                <svelte:fragment slot="rows">
                    {#if $activePerPageData.length > 0}
                        {#each $activePerPageData[$activePage - 1] as activeSession}
                            <tr on:click={()=>{handleSelectRow(activeSession.id)}}
                                class="{selectedRow===activeSession.id?'selectedRow':''}">
                                <td>{moment(activeSession.timeStart).format('DD/MM/YYYY')}</td>
                                <td>{activeSession.id}</td>
                                <td>{activeSession.chargerId}</td>
                                <td>{activeSession.connectorId}</td>
                                <td>{activeSession.duration}</td>
                                <td>TBD</td>
                                <td>{activeSession.currentPower}</td>
                                <td>TBD</td>
                                <td>{activeSession.averagePower}</td>
                                <td>{activeSession.currentCarBattery}</td>
                                <td>
                                    <button on:click={() => (showModal = true)} class="{selectedRow===activeSession.id?'bg-[#ED1F0E]':'bg-[#C0C0C0]'} rounded-[6px] p-1.5 w-[80px] text-white ">
                                        Stop
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    {/if}

                </svelte:fragment>
                <div slot="footer" class="flex flex-row justify-between items-center">
                    <div class="flex flex-row gap-5 items-center">
                        <span>Items per page</span>
                        <select class="hover:cursor-pointer"
                                on:change={(el)=>{handlePerPageChangeActive(el.target.value)}}>
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div class="flex flex-row gap-4 justify-between">
                        <img class="hover:cursor-pointer" on:click={()=>{handlePageChangeActive(-1)}}
                             src="/icons/table/arrowLeft.svg">
                        <span>1 - {$activePerPage * $activePage} out of {$actives.length}</span>
                        <img class="hover:cursor-pointer" on:click={()=>{handlePageChangeActive(1)}}
                             src="/icons/table/arrowRight.svg">
                    </div>
                </div>
            </Table>
        </div>
        {#if selectedRow !== -1 && expanded}
            <ActiveChargingAnalytics bind:selectedRow={selectedRow}
                                     selectedHistory="{$actives.find(el=>el.id === selectedRow)}"/>
        {/if}
    </div>

</div>
<style>
    @import "active.css";
</style>