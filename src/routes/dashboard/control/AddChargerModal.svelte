<script lang="ts">

    import LoadingComponent from "../LoadingComponent.svelte";
    import {handleAddCharger} from "../../../stores/charger.store.ts";
    import type {ICharger} from "../../../interfaces/ICharger";

    let validFields = {
        chargerId: true,
        chargerAddress: true,
        chargerLocation: true,
        responsibleAdmin: true,
        description: true,
        street: true,
        city: true,
        postalNumber: true,
        country: true
    }

    async function handleSubmit(event) {
        const data = new FormData(event.currentTarget);
        let object: any = {};
        data.forEach((value, key) => object[key] = value);
        if (!data) return;
        validFields.chargerId = object.chargerId !== ''

        if (isNaN(object.latitude) || object.longitude === '') {
            validFields.chargerLocation = false;
        } else {
            validFields.chargerLocation = true;
        }
        validFields.description = object.description !== ''
        validFields.street = object.street !== ''
        validFields.city = object.city !== ''
        validFields.postalNumber = object.postalNumber !== ''
        validFields.country = object.country !== ''
        console.log("Valid fields: ", validFields, object)
        if (!Object.values(validFields)
            .every(item => item === true)) {
            return;
        }
        loading = true
        const {status, charger} = await handleAddCharger(object);
        if(status) {
            selectedCharger = charger;
            page = 1;
        }
        loading = false
        // await handleAddCharger(json)
    };

    export let loading = true;
    export let selectedCharger: ICharger | null;

    export let editing = false;
    export let page = 0;

    $: editing = !!selectedCharger;



</script>
{#if !loading}
    <form on:submit|preventDefault={handleSubmit}
          class="chargerModal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-10/12 2xl:w-1/2 p-10 flex flex-col gap-10">
        <div class="flex flex-row justify-between">
            <h3 class="text-[#021F0E] text-[24px] font-medium">Add new charger</h3>
            <img class="h-5 hover:cursor-pointer" src="/icons/table/closeIcon.svg"/>
        </div>
        <div class="flex flex-col gap-3">
            <label for="chargerId" class="text-[16px] text-[#021F0E] font-medium">Charger ID</label>
            <input id="chargerId" name="chargerId" class="{!validFields.chargerId?'chargerInputError':'chargerInput'}"
                   placeholder="192.168.0.1"/>
            <div class="flex flex-row gap-3">
                {#if !validFields.chargerId}
                    <img src="/icons/controller/errorIcon.svg">
                    <span class="text-[#021F0E] text-[14px] font-medium whitespace-normal leading-4">ID not existing- please check if you have connected your charger to our server IP port. See more details in instructions</span>
                {:else}
                    <img src="/icons/controller/checkIcon.svg">
                    <span class="text-[#021F0E] text-[14px] font-medium whitespace-normal leading-4">ID correct</span>
                {/if}

            </div>
        </div>
        <div class="flex flex-row gap-5 flex-wrap">

            <div class="flex flex-col gap-3">
                <label for="street" class="text-[16px] text-[#021F0E] font-medium">Address</label>
                <input id="street" name="street" class="{!validFields.street?'chargerInputError':'chargerInput'}"
                       placeholder="Ulica Ivana"/>
                <div class="flex flex-row gap-3">
                    {#if !validFields.street}
                        <img src="/icons/controller/errorIcon.svg">
                        <span class="text-[#021F0E] text-[14px] font-medium whitespace-normal leading-4">Street required</span>
                    {/if}
                </div>
            </div>
            <div class="flex flex-col gap-3">
                <label for="city" class="text-[16px] text-[#021F0E] font-medium">City</label>
                <input id="city" name="city" class="{!validFields.city?'chargerInputError':'chargerInput'}"
                       placeholder="Zagreb"/>
                <div class="flex flex-row gap-3">
                    {#if !validFields.city}
                        <img src="/icons/controller/errorIcon.svg">
                        <span class="text-[#021F0E] text-[14px] font-medium whitespace-normal leading-4">City required</span>
                    {/if}
                </div>
            </div>
            <div class="flex flex-col gap-3">
                <label for="country" class="text-[16px] text-[#021F0E] font-medium">Country</label>
                <input id="country" name="country" class="{!validFields.country?'chargerInputError':'chargerInput'}"
                       placeholder="Croatia"/>
                <div class="flex flex-row gap-3">
                    {#if !validFields.country}
                        <img src="/icons/controller/errorIcon.svg">
                        <span class="text-[#021F0E] text-[14px] font-medium whitespace-normal leading-4">Country required</span>
                    {/if}
                </div>
            </div>
            <div class="flex flex-col gap-3">
                <label for="postalNumber" class="text-[16px] text-[#021F0E] font-medium">Postal Number</label>
                <input id="postalNumber" name="postalNumber"
                       class="{!validFields.postalNumber?'chargerInputError':'chargerInput'}"
                       placeholder="Postal Number"/>
                <div class="flex flex-row gap-3">
                    {#if !validFields.postalNumber}
                        <img src="/icons/controller/errorIcon.svg">
                        <span class="text-[#021F0E] text-[14px] font-medium whitespace-normal leading-4">Postal number required</span>
                    {/if}
                </div>
            </div>
            <div class="flex flex-col gap-3">
                <label for="latitude" class="text-[16px] text-[#021F0E] font-medium">Charger location (latitude),
                    (longitude)</label>
                <div class="flex flex-row gap-5 flex-wra">
                    <input id="latitude" name="latitude"
                           class="{!validFields.chargerLocation?'chargerInputError':'chargerInput'}" placeholder="0"/>
                    <input id="longitude" name="longitude"
                           class="{!validFields.chargerLocation?'chargerInputError':'chargerInput'}" placeholder="0"/>
                </div>
                <div class="flex flex-row gap-3">
                    {#if !validFields.chargerLocation}
                        <img cla src="/icons/controller/errorIcon.svg">
                        <span class="text-[#021F0E] text-[14px] font-medium whitespace-normal leading-4">Valid Latitude and Longitude required</span>
                    {/if}
                </div>

            </div>
            <div class="flex flex-col gap-3">
                <label for="responsibleAdmin" class="text-[16px] text-[#021F0E] font-medium">Responsible Admin</label>
                <input id="responsibleAdmin" name="responsibleAdmin" class="chargerInput" placeholder="Neko Nekolic"/>
            </div>
        </div>
        <div class="flex flex-col gap-3">
            <label for="description" class="text-[16px] text-[#021F0E] font-medium">Charger Description</label>
            <textarea id="description" name="description" class="chargerInput" style="resize: none" rows="5"></textarea>
        </div>
        <button type="submit"
                class="text-[12px] font-normal text-white bg-[#1E4CDC] p-1 w-[125px] h-[40px] rounded-[5px] self-end">
            Next
        </button>
    </form>
{:else}
    <LoadingComponent/>
{/if}


<style>
    .chargerModal {
        box-shadow: 0px 6px 6px 0px #00000017;
    }

    .chargerInput:focus {
        outline: none;
    }

    .chargerInput {
        padding: 5px;
        border: 1px solid #1E4CDC;
        border-radius: 4px;
    }

    .chargerInputError {
        padding: 5px;
        border: 1px solid #ED1F0E;
        border-radius: 4px;
    }
</style>