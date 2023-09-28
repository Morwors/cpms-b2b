<script lang="ts">
    import {AreaChart} from "@carbon/charts-svelte";
    import type {IPrice} from "../../../interfaces/IPrices";

    export let selectedPricing: IPrice|null;
    export let selectedRow: number = -1;


    const lineData = [
        {
            "group": "Charge",
            "date": "2019-01-16T23:10:00.000Z",
            "value": 20,
            // "surplus": 322442655.0744275
        },
        {
            "group": "Charge",
            "date": "2019-01-16T23:20:00.000Z",
            "value": 50,
            // "surplus": 186992551.6643113
        },
        {
            "group": "Charge",
            "date": "2019-01-16T23:30:00.000Z",
            "value": 60,
            // "surplus": 24849.12761758436
        },
        {
            "group": "Charge",
            "date": "2019-01-16T23:40:00.000Z",
            "value": 85,
            // "surplus": 965068111.5340955
        },
        {
            "group": "Charge",
            "date": "2019-01-16T23:50:00.000Z",
            "value": 100,
            // "surplus": 604489123.6618937
        },
    ]
    const options = {
        color:{
            scale:{
                "Charge":"#3ACE7A"
            }
        },
        timeScale: {
            addSpaceOnEdges: 0
        },
        toolbar: {
            enabled: false,
            numberOfIcons: 0
        },
        legend: {
            enabled: false
        },
        "title": "EUR/kWh",
        "axes": {
            "bottom": {
                "title": "",
                "mapsTo": "date",
                "scaleType": "time"
            },
            "left": {
                "mapsTo": "value",
                "title": "",
                "scaleType": "linear"
            }
        },
        "curve": "curveMonotoneX",
        "height": "400px"
    }

    function handleCloseAnalytics(){
        selectedRow = -1;
    }

</script>

<div class="bg-white flex-grow card p-10 flex flex-col gap-10">
    <div class="flex flex-row place-content-end"><img on:click={handleCloseAnalytics} class="h-5 hover:cursor-pointer place-content-end" src="/icons/table/closeIcon.svg"></div>
    <div class="flex flex-row items-center">
        <span class="font-medium text-[#021F0E] text-[16px]">Historical Price</span>
    </div>
    <AreaChart data={lineData} options={options}/>
    <div class="card p-7 flex flex-row h-[7rem] justify-between">
        <div class="flex flex-row gap-3 items-start">
            <img class="h-5" src="/icons/notifications/notificationIcon.svg"/>
            <span class="text-[#1E4CDC] text-[12px] font-normal">Charger type</span>
        </div>
        <span class="text-[20px] text-[#021F0E] font-normal self-end">Alpitronic DC 150kW</span>
    </div>
    <div class="card p-7 flex flex-row h-[7rem] justify-between">
        <div class="flex flex-row gap-3 items-start">
            <img class="h-5" src="/icons/notifications/notificationIcon.svg"/>
            <span class="text-[#1E4CDC] text-[12px] font-normal">Connector type</span>
        </div>
        <div class="flex flex-row gap-3 self-end items-center">
            <span class="text-[20px] text-[#021F0E] font-normal">CCS</span>
            <img src="/icons/connectors/ccsIcon.svg"/>
        </div>
    </div>
</div>