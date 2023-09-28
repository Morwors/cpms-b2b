<script lang="ts">
    import {goto} from "$app/navigation";
    let edit = false;
</script>

<div class="flex-1 p-5 flex flex-col gap-5">
    <div class="flex flex-1 flex-col gap-10 card p-10">
        <div class="flex flex-row place-content-end"><img on:click={()=>{goto('/dashboard/admin')}}
                                                          class="h-5 hover:cursor-pointer place-content-end"
                                                          src="/icons/table/closeIcon.svg"></div>
        <div class="flex flex-row gap-20 justify-around">
            <div class="flex flex-col gap-10 flex-1">
                <h1 class="bankHeader">
                    Billing Address
                </h1>
                <div class="flex flex-row justify-between gap-5 items-center">
                    <label class="bankLabel">Company Name</label>
                    <input disabled="{!edit}" class="bankInput" value="HEP d.d">
                </div>
                <div class="flex flex-row justify-between gap-5 items-center">
                    <label class="bankLabel">Bank name</label>
                    <input disabled="{!edit}" class="bankInput" value="OTP Hrvatska">
                </div>
                <div class="flex flex-row justify-between gap-5 items-center">
                    <label class="bankLabel">Bank address</label>
                    <input disabled="{!edit}" class="bankInput" value="Domovinskog Rata 61, 21000 Split">
                </div>
                <div class="flex flex-row justify-between gap-5 items-center">
                    <label class="bankLabel">Bank account Country</label>
                    <input disabled="{!edit}" class="bankInput" value="Croatia">
                </div>
                <div class="flex flex-row justify-between gap-5 items-center">
                    <label class="bankLabel">IBAN number</label>
                    <input disabled="{!edit}" class="bankInput" value="******3186">
                </div>
                <div class="flex flex-row justify-between gap-5 items-center">
                    <label class="bankLabel">SWIFT code</label>
                    <input disabled="{!edit}" class="bankInput" value="OTPVHR2X">
                </div>
                <div class="flex flex-row justify-between gap-5 items-center">
                    <label class="bankLabel">Currency</label>
                    <input disabled="{!edit}" class="bankInput" value="EUR">
                </div>
            </div>
            <div class="flex flex-col gap-10 flex-1">
                <h1 class="bankHeader">
                    Direct deposit
                </h1>
                <div class="flex flex-col gap-5">
                    <div class="flex flex-row justify-between gap-5 items-center">
                        <label class="bankLabel">Banc Account Number:</label>
                        <input disabled="{!edit}" class="bankInput" value="******3186">
                    </div>
                    <div class="flex flex-row justify-between gap-5 items-center">
                        <label class="bankLabel">Iban Number:</label>
                        <input disabled="{!edit}" class="bankInput" value="******3186">
                    </div>
                </div>
                <div class="flex flex-col gap-5">
                    <div class="flex flex-row justify-between gap-5 items-center">
                        <label class="bankLabel">SWIFT Code:</label>
                        <input disabled="{!edit}" class="bankInput" value="OTPVHR2X">
                    </div>
                    <div class="flex flex-row justify-between gap-5 items-center">
                        <label class="bankLabel">Currency:</label>
                        <input disabled="{!edit}" class="bankInput" value="EUR">
                    </div>
                </div>
                <div class="flex flex-row justify-between gap-10 h-full place-items-end">
                    {#if edit}
                        <button on:click={()=>{edit = false}} class="bankButtonPrimary">Save</button>
                        <button on:click={()=>{edit = false}} class="bankButtonSecondary">Cancel</button>
                    {:else}
                        <button on:click={()=>{edit = true}} class="bankButtonPrimary w-full flex-1 flex flex-row gap-5 justify-center items-center text-[16px]"><img src="/icons/button/plusIcon.svg">Edit bank details</button>
                    {/if}

                </div>
            </div>


        </div>
    </div>
</div>

<style>
    @import "bank.css";
</style>