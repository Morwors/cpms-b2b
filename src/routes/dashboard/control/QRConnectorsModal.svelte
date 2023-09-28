<script lang="ts">
    import type {ICharger} from "../../../interfaces/ICharger";
    import {QRCodeImage} from "svelte-qrcode-image";

    export let selectedCharger: ICharger | null;
    let selectedQrCode: string = "test"

    function handleDownload(){
        //QR code download logic
        selectedCharger = null

    }
</script>

{#if selectedQrCode}
    <div class="flex flex-col gap-10 min p-10 items-center">
        <div class="flex flex-row justify-end w-full">
            <img class="h-5 hover:cursor-pointer self-end" src="/icons/table/closeIcon.svg"/>
        </div>
        <div class="w-[450px] h-[450px]">
            <QRCodeImage text="{selectedQrCode}" width="450" height="450" margin="2"/>
        </div>
        <h3 class="font-medium text-[#021F0E] text-[24px] text-center w-10/12">QR code for charger has been generated</h3>
        <p class="font-normal text-[16px] text-[#828282] text-center w-10/12">Please download and print to place it on your charger</p>
        <button on:click={()=>{handleDownload()}} class="flex flex-row gap-3 justify-center items-center bg-[#1E4CDC] p-4 w-2/4 rounded-[12px] text-white text-[16px]"><img src="/icons/table/donwloadWhiteIcon.svg">Download</button>
    </div>
{:else}
    <div class="flex flex-col gap-10 min-w-[50rem] p-10">
        <div class="flex flex-row justify-between items-center">
            <h3 class="text-[#021F0E] text-[24px] font-medium">Connectors</h3>
            <img class="h-5 hover:cursor-pointer" src="/icons/table/closeIcon.svg"/>
        </div>
        <div class="grid grid-cols-4 gap-3 ">
            {#if selectedCharger}
                {#each selectedCharger?.connectors as connector}
                    <div class="flex flex-col gap-5 qrCode" on:click={()=>{selectedQrCode = "test"}}>
                        <span class="connectorText">{connector.connectorType.name}</span>
                        <div class="codeContainer relative">
                            <QRCodeImage text="Test" width="250" height="250" margin="2"/>
                        </div>
                    </div>
                {/each}
            {/if}

        </div>
    </div>
{/if}

<style>
    .qrCode:hover {
        cursor: pointer;
    }

    .qrCode:hover > .connectorText {
        color: #1E4CDC;
    }

    .qrCode:hover > .codeContainer {
        /*padding: 5px;*/
        border: 5px solid #1E4CDC
    }

    .connectorText {
        color: #828282;
        font-width: 500;
        font-size: 20px;
    }

    .codeContainer {
        /*padding: 5px;*/
        border: 5px solid #D9D9D9
    }
</style>