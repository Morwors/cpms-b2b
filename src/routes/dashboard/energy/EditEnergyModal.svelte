<script lang="ts">
    export let showModal = false; // boolean

    let dialog; // HTMLDialogElement

    $: if (dialog && showModal) dialog.showModal();

</script>

<dialog bind:this={dialog}
        on:close={() => (showModal = false)}
        on:click|self={() =>{ dialog.close() }}>

    <div class="bg-white flex flex-col gap-10 p-12 min-w-[450px]">
        <div class="flex flex-row justify-between items-center">
            <h1 class="editPriceHeader">Edit current max power</h1>
            <img src="/icons/table/closeIcon.svg"/>
        </div>
        <div class="flex flex-col gap-5">
            <span class="editPriceText">Current max power</span>
            <div class="relative flex">
                <input class="editPriceInput">
                <span class="editPriceInputText absolute right-5 top-[0.8rem]">kWh</span>
            </div>
        </div>
        <button class="editPriceSuccessButton" on:click={() => {showModal = false; dialog.close();}}>Save</button>
    </div>

</dialog>

<style>
    .editPriceHeader{
        font-family: Inter;
        font-size: 22px;
        font-weight: 500;
        line-height: 27px;
        letter-spacing: 0px;
        text-align: left;
        color: #828282;
    }
    .editPriceText{
        font-family: Inter;
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0px;
        text-align: left;
        color: #021F0E;

    }
    .editPriceInputText{
        color: #828282;
        font-family: Inter;
        font-size: 16px;
        font-weight: 500;
        line-height: 19px;
        letter-spacing: 0px;
        text-align: left;

    }
    .editPriceInput{
        border: 1px solid #828282;
        border-radius: 5px;
        color: #333333;
        padding: 10px 100px 10px 20px;

    }
    .editPriceInput:focus{
        outline: none;
    }

    .editPriceSuccessButton {
        margin-left: 30px;
        margin-right: 30px;
        font-family: Inter;
        font-size: 12px;
        font-weight: 500;
        line-height: 15px;
        letter-spacing: 0em;
        color: white;
        background: #1E4CDC;
        border-radius: 5px;
        max-width: 350px;
        height: 45px;
    }

</style>
