<script lang="ts">
    import {browser} from "$app/environment";

    import Table from "../Table.svelte";
    import {
        handleHistoryLongPool, handleHistorySearchSessions,
        handleSelectedHistory,
        histories,
        selectedHistories
    } from "../../../stores/history.store";
    import moment from "moment/moment";
    import HistoryChargingAnalytics from "./HistoryChargingAnalytics.svelte";
    import DateSelectRange from "../DateSelectRange.svelte";

    let expanded = true;
    let openDownload = false;
    const tableHeaders = [
        'cb',
        'Start Time',
        'End Time',
        'Duration',
        'Charger ID',
        'Connector ID',
        'Electricity Price',
        'Electricity consumed  by customer',
        'Billed amount',
        'Average power during this charging session',
        'Car model',
        'Charger adress',
        'Charger Location',
        'Card information',
        'Payment status',
        'Invoice'
    ]

    if (browser) {
        handleHistoryLongPool()
    }
    let selectedRow = -1
    let showDateModal = false;

    function handleSelectRow(id: number) {
        console.log("Selected row: ", id)
        selectedRow = id;
    }

    function handleCheckbox(id, event) {
        console.log("Event: ", event)
        handleSelectedHistory(id, event);
    }

    function findWithinRange(event: any) {
        const startDate = moment(event.detail.selectionRange.startDate).format('L');
        const endDate = moment(event.detail.selectionRange.endDate).format('L');
        // rangeText = startDate + " - " + endDate
        showDateModal = false

    }
    function searchHistory(e){
        handleHistorySearchSessions(e.target.value)
        // console.log("Input: ",e.target.value)

    }

</script>
{#if showDateModal}
    <DateSelectRange on:close={(event) => {
        findWithinRange(event)
    }}/>
{/if}
<div class="flex-1 p-5 flex flex-col gap-5">
    <div class="flex flex-col md:flex-row gap-5">
        <div class="bg-white flex-grow card p-10">
            <Table tableSize="{$histories.length}" title="Charging sessions history" tableHeaders="{tableHeaders}"
                   bind:expanded={expanded}>
                <th style="background: transparent" slot="checkbox" class="flex justify-center items-center">
                    <input on:change={(e)=>{handleCheckbox(-1, e.target.checked)}} type="checkbox"/>
                </th>
                <svelte:fragment slot="header">
                    <div class="flex flex-row justify-between items-center">
                        <h3 class="col-span-full text-[16px] font-medium">Charging sessions history</h3>
                    </div>
                    <div class="flex flex-row justify-between">
                        <div class="relative">
                            <img class="absolute h-5 left-3 top-2.5" src="/icons/table/searchIcon.svg"/>
                            <input on:input={(e)=>{searchHistory(e)}} class="searchInput pt-2 pb-2 pl-12 pr-5 w-[300px]" placeholder="Search">
                        </div>
                        <div class="flex flex-row gap-5">
                            <button on:click={()=>{showDateModal=true}}
                                    class="historyOutlineButton flex flex-row gap-3 items-center justify-center"><img
                                    src="/icons/table/calendarIcon.svg"/>Select Timetable
                            </button>
                            <button disabled="{$selectedHistories.length===0}"
                                    on:click={()=>{openDownload =! openDownload}}
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
                            class="{$selectedHistories.find(el=>el===historySession.id) || selectedRow === historySession.id?'selectedRow':''}">
                            <td><input checked="{$selectedHistories.find(el=>el===historySession.id)}"
                                       on:change={(e)=>{handleCheckbox(historySession.id, e.target.checked)}}
                                       type="checkbox"/></td>
                            <td class="relative">{moment(historySession.timeStart).format('DD/MM/YYYY')}</td>
                            <td>{moment(historySession.timeStop).format('DD/MM/YYYY')}</td>
                            <td>{historySession.duration}</td>
                            <td>{historySession.chargerId}</td>
                            <td>{historySession.connectorId}</td>
                            <td>TBD</td>
                            <td>TBD</td>
                            <td>TBD</td>
                            <td>{historySession.averagePower} kW</td>
                            <td>TBD</td>
                            <td>TBD</td>
                            <td>TBD</td>
                            <td>TBD</td>
                            <td>TBD</td>
                            <td class="flex flex-row gap-5"><img src="/icons/logo/pdf.png">
                                <img class="mr-10 pr-12" src="/icons/table/downloadIcon.svg">
                            </td>
                        </tr>
                    {/each}
                </svelte:fragment>

            </Table>
        </div>
        {#if selectedRow !== -1}
            <HistoryChargingAnalytics bind:selectedRow={selectedRow}
                                      selectedHistory="{$histories.find(el=>el.id === selectedRow)}"/>
        {/if}
    </div>

</div>

<style>
    @import "history.css";
</style>