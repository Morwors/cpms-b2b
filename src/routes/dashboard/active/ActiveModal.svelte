<script lang="ts">
    export let showModal = false; // boolean

    let dialog; // HTMLDialogElement

    $: if (dialog && showModal) dialog.showModal();

</script>

<dialog bind:this={dialog}
        on:close={() => (showModal = false)}
        on:click|self={() =>{ dialog.close() }}>

    <div class="bg-white flex flex-col gap-12 p-10">
        <h1 class="activeModalHeader w-[400px]">Do you want to stop selected charging session</h1>
        <div class="flex flex-col gap-5 ml-[2rem]">
            <div class="flex flex-row gap-2">
                <img src="/icons/notifications/notificationIcon.svg"/>
                <span class="activeModalText">Charger ID: 111111</span>
            </div>
            <div class="flex flex-row gap-2">
                <img src="/icons/notifications/notificationIcon.svg"/>
                <span class="activeModalText">Charging session start: 07/01/23 01:11:24</span>
            </div>
            <div class="flex flex-row gap-2">
                <img src="/icons/notifications/notificationIcon.svg"/>
                <span class="activeModalText">Charging session duration: 01:11:24</span>
            </div>
            <div class="flex flex-row gap-2">
                <img src="/icons/notifications/notificationIcon.svg"/>
                <span class="activeModalText">Current bill: 100 EUR</span>
            </div>
            <div class="flex flex-row gap-2">
                <img src="/icons/notifications/notificationIcon.svg"/>
                <span class="activeModalText">Electricity consumed: 50 kWh</span>
            </div>
        </div>
        <div class="flex flex-row gap-5 justify-between">
            <button class="activeModalSuccessButton flex-1" on:click={() => (showModal = false)}>Yes</button>
            <button class="activeModalOutlineButton flex-1" on:click={() => (showModal = false)}>No</button>
        </div>

    </div>

</dialog>

<style>
    .activeModalHeader {
        font-family: Inter;
        font-size: 24px;
        font-weight: 500;
        line-height: 29px;
        letter-spacing: 0em;
        text-align: center;
        color: #021F0E;
    }

    .activeModalText {
        font-family: Inter;
        font-size: 16px;
        font-weight: 300;
        line-height: 19px;
        letter-spacing: 0em;
        text-align: left;
        color: #021F0E;
    }


    .activeModalSuccessButton {
        font-family: Inter;
        font-size: 12px;
        font-weight: 500;
        line-height: 15px;
        letter-spacing: 0em;
        color: white;
        background: #1E4CDC;
        border-radius: 5px;
        max-width: 350px;
        height: 35px;
    }
    .activeModalOutlineButton {
        font-family: Inter;
        font-size: 12px;
        font-weight: 500;
        line-height: 15px;
        letter-spacing: 0em;
        color: #1E4CDC;
        border: 1px solid #1E4CDC;
        border-radius: 5px;
        max-width: 350px;
        height: 35px;
    }
</style>
