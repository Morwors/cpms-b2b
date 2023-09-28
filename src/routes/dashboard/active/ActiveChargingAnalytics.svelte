<script lang="ts">
    import {AreaChart} from "@carbon/charts-svelte";
    import type {ISessionHistory} from "../../../interfaces/ISession";

    export let selectedHistory: ISessionHistory|null;
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
        "title": "%",
        "axes": {
            "bottom": {
                "title": "Date",
                "mapsTo": "date",
                "scaleType": "time"
            },
            "left": {
                "mapsTo": "value",
                "title": "Battery Charge %",
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
    <div class="card p-10 flex flex-row gap-10">
        <div class="flex flex-col gap-5 items-center">
            <h4 class="font-medium text-[14px] text-[#021F0E] whitespace-nowrap">Charger ID</h4>
            <div class="relative block">
                <img class="absolute right-[45px] h-5 w-5" src="/icons/notifications/notificationIcon.svg"/>
                <h3 class="font-normal text-[32px] text-[#021F0E] text-center">{selectedHistory?.chargerId}</h3>
            </div>
        </div>
        <div class="flex flex-col gap-5 items-center">
            <h4 class="font-medium text-[14px] text-[#021F0E] whitespace-nowrap">Connector ID</h4>
            <div class="relative block">
                <img class="absolute right-[45px] h-5 w-5" src="/icons/notifications/notificationIcon.svg"/>
                <h3 class="font-normal text-[32px] text-[#021F0E] text-center">{selectedHistory?.connectorId}</h3>
            </div>
        </div>
        <button class="bg-[#ED1F0E] text-white font-medium text-[10px] h-[30px] w-[90px] rounded-[6px] place-self-end">
            Stop
        </button>
    </div>
    <div class="card flex flex-row justify-between items-center p-10">
        <div class="flex flex-row gap-5 items-center">
            <img class="h-5 w-5" src="/icons/notifications/notificationIcon.svg"/>
            <span class="text-[#1E4CDC] text-[12px] font-normal">Price for electricity</span>
        </div>
        <span class="font-normal text-[20px] text-[#021F0E]">0,5 EUR/kWh</span>
    </div>
    <div class="flex flex-row justify-between items-center">
        <span class="font-normal text-[#021F0E] text-[12px]">Car battery %</span>
        <div class="flex flex-row gap-3 items-center">
            <span class="font-normal text-[#8B8B8B] text-[12px]">Estimated time untill full battery: <span class="text-[#1E4CDC]">20 min</span></span><img class="h-5 w-5" src="/icons/notifications/notificationIcon.svg"/>
        </div>
    </div>
    <AreaChart data={lineData} options={options}/>
    <div class="flex flex-row justify-between items-center">
        <span class="font-normal text-[#021F0E] text-[12px]">Power curve</span>
        <div class="flex flex-row gap-3 items-center">
            <span class="font-normal text-[#8B8B8B] text-[12px]">Average charging power: <span class="text-[#1E4CDC]">50 kW</span></span><img class="h-5 w-5" src="/icons/notifications/notificationIcon.svg"/>
        </div>
    </div>
    <AreaChart data={lineData} options={options}/>
</div>