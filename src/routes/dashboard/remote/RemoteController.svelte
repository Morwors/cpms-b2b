<script lang="ts">
    import type {ICharger} from "../../../interfaces/ICharger";

    export let selectedCharger: ICharger|null;
    export let selectedRow: number = -1;


</script>

<div class="bg-white flex-grow card p-10 flex flex-col gap-10">
    <div class="flex flex-row gap-5">
        <div class="card flex flex-col gap-10 p-10">
            <h3 class="text-[#021F0E] text-[16px] font-semibold whitespace-nowrap">Charger temperature</h3>
            <div class="relative">
                <img class="relative bottom-[20px]" src="/icons/controller/gauge.svg" >
                <div class="gaugeCircle rounded-[50%] p-5 flex bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                    <img src="/icons/controller/gaugeArrow.svg" class="h-3 w-3 absolute top-0">
                    <span class="font-semibold text-[#8B8B8B] text-[40px] justify-center items-center relative bottom-[5px] left-[5px]" style="font-size: 40px">50°</span>
                </div>
            </div>
            <span class="text-[#828282] text-[9px] font-normal">Last refreshed: 50 secconds ago</span>
        </div>

        <div class="card flex flex-col gap-10 p-10 justify-between">
            <h3 class="text-[#021F0E] text-[16px] font-semibold whitespace-nowrap">Carger status</h3>
            <div class="flex flex-col gap-3 justify-around h-[180px]">
                <div class="flex flex-row gap-5 items-center">
                    <img src="{selectedCharger?.status ===2 ?'/icons/notifications/notificationSuccessIcon.svg':'/icons/notifications/notificationDisabledIcon.svg'}">
                    <span class="text-[#475569] text-[14px] font-normal">Charging in progress</span>
                </div>
                <div class="flex flex-row gap-5 items-center">
                    <img src="{selectedCharger?.status ===1 ?'/icons/notifications/notificationWarnIcon.svg':'/icons/notifications/notificationDisabledIcon.svg'}">
                    <span class="text-[#475569] text-[14px] font-normal">Available for charging</span>
                </div>
                <div class="flex flex-row gap-5 items-center">
                    <img src="{(selectedCharger?.status ===0 || selectedCharger?.status === null) ?'/icons/notifications/notificationDangerIcon.svg':'/icons/notifications/notificationDisabledIcon.svg'}">
                    <span class="text-[#475569] text-[14px] font-normal">Not working</span>
                </div>
            </div>
        </div>

    </div>
    <div class="flex flex-col gap-12">
        <h3 class="text-[#021F0E] text-[16px] font-semibold">Remote Actions: </h3>
        <div class="flex flex-row gap-3 items-center">
            <button class="h-[35px] w-[105px] rounded-[5px] bg-[#C0C0C0] text-white flex flex-row gap-3 items-center p-1 justify-center"><img src="/icons/controller/stopIcon.svg"/>Stop</button>
            <img class="h-5 w-5" src="/icons/controller/infoIcon.svg"/>
            <span class="text-[#828282] text-[12px] font-normal whitespace-normal leading-[14px]">Press to stop currently active charging session at selected charger</span>
        </div>
        <div class="flex flex-row gap-3 items-center">
            <button class="h-[35px] w-[105px] rounded-[5px] bg-[#C0C0C0] text-white flex flex-row gap-3 items-center p-1 justify-center"><img src="/icons/controller/resetIcon.svg"/>Reset</button>
            <img class="h-5 w-5" src="/icons/controller/infoIcon.svg"/>
            <span class="text-[#828282] text-[12px] font-normal whitespace-normal leading-[14px]">Press to remotely reset charger to factory settings</span>
        </div>
        <div class="flex flex-row gap-3 items-center">
            <button class="h-[35px] w-[105px] rounded-[5px] bg-[#C0C0C0] text-white flex flex-row gap-3 items-center p-1 justify-center"><img src="/icons/controller/powerOffIcon.svg"/>Turn Off</button>
            <img class="h-5 w-5" src="/icons/controller/infoIcon.svg"/>
            <span class="text-[#828282] text-[12px] font-normal whitespace-normal leading-[14px]">Turn off charger</span>
        </div>
    </div>
</div>
<style>
    .gaugeCircle{
        aspect-ratio: 1;
        width: 70%;
        box-shadow: 0px 3px 5px 0px #01410017;
        border-radius: 50%;
    }
</style>