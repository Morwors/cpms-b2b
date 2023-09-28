<script>
    import {browser} from "$app/environment";
    import {companies, handleCompaniesLongPool, handleCreateCompany} from "../../../../stores/company.store.ts";
    import {delay} from "../../../../helpers/time.helper.ts";
    import Spinner from "../../../../shared/Spinner.svelte";
    import {goto} from "$app/navigation";
    import Toast from "../../../../shared/Toast.svelte";
    import {createAdminHandler} from "../../../../stores/auth.store.ts";

    if (browser) {
        handleCompaniesLongPool()
    }
    let companyLoading = false
    let userLoading = false
    let toastText = ""
    let toastStatus = false

    async function handleUserSubmit(event){
        userLoading = true;
        const data = new FormData(event.currentTarget);
        let object = {};
        data.forEach((value, key) => object[key] = value);
        object.username = object.email;
        let json = JSON.stringify(object);
        const res = await createAdminHandler(json)
        if(res){
            toastText = "Company added";
            toastStatus = true;
        } else {
            toastText = "Error occurred";
            toastStatus = false;
        }
        companyLoading = false;
        // if(res.error ===""){
        //     goto('/dashboard/active');
        // }
    }

    async function handleCompanySubmit(event){
        companyLoading = true;
        const data = new FormData(event.currentTarget);
        let object = {};
        data.forEach((value, key) => object[key] = value);
        object.bankAccountId = 50;
        let json = JSON.stringify(object);
        const res = await handleCreateCompany(json)
        if(res){
            toastText = "Company added";
            toastStatus = true;
        } else {
            toastText = "Error occurred";
            toastStatus = false;
        }
        companyLoading = false;
        // if(res.error ===""){
        //     goto('/dashboard/active');
        // }
    }


</script>

<div class="flex-1 p-5 flex flex-col gap-5">
    <div class="flex flex-col gap-10 card p-10">
        <div class="flex flex-row place-content-end"><img on:click={()=>{goto('/dashboard/admin')}} class="h-5 hover:cursor-pointer place-content-end" src="/icons/table/closeIcon.svg"></div>
        <div class="flex flex-1 flex-col lg:flex-row gap-20 justify-around">
            <form class="flex flex-col gap-10 p-10 flex-1 lg:max-w-[600px] max-w-[100%]" on:submit|preventDefault={handleCompanySubmit}>
                <h4 class="headingText">Create Company</h4>
                <div class="flex flex-col gap-5">
                    <div class="flex flex-col">
                        <label class="adminLabel">Company Name</label>
                        <input name="companyName" class="adminInput" placeholder="Name"/>
                    </div>
                    <div class="flex flex-col">
                        <label class="adminLabel">Support Email</label>
                        <input name="supportEmail" class="adminInput" placeholder="Name"/>
                    </div>
                    <div class="flex flex-col">
                        <label class="adminLabel">Street</label>
                        <input name="street" class="adminInput" placeholder="Name"/>
                    </div>
                    <div class="flex flex-col">
                        <label class="adminLabel">City</label>
                        <input name="city" class="adminInput" placeholder="Name"/>
                    </div>
                    <div class="flex flex-col">
                        <label class="adminLabel">Country</label>
                        <input name="country" class="adminInput" placeholder="Name"/>
                    </div>
                    <div class="flex flex-col">
                        <label class="adminLabel">Postal Code</label>
                        <input name="postalNumber" class="adminInput" placeholder="Name"/>
                    </div>
                </div>
                <button disabled="{companyLoading}" class="p-2 font-medium text-[20px] text-white bg-[#1E4CDC] rounded-[5px]">
                    {#if !companyLoading}Create{:else}<Spinner/>{/if}
                </button>
            </form>
            <form class="flex flex-col gap-10 p-10 flex-1 lg:max-w-[600px] max-w-[100%]" on:submit|preventDefault={handleUserSubmit}>
                <h4 class="headingText">Create Account</h4>
                <div class="flex flex-col gap-5">
                    <div class="flex flex-col">
                        <label class="adminLabel">Name</label>
                        <input name="firstName" class="adminInput" placeholder="Name"/>
                    </div>
                    <div class="flex flex-col">
                        <label class="adminLabel">Surname</label>
                        <input name="lastName" class="adminInput" placeholder="Name"/>
                    </div>
                    <div class="flex flex-col">
                        <label class="adminLabel">Company</label>
                        <select name="companyId" class="adminInput" placeholder="Name">
                            {#each $companies as company}
                                <option value="{company?.id}">{company?.companyName}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="flex flex-col">
                        <label class="adminLabel">E-mail address</label>
                        <input name="email" class="adminInput" placeholder="Name"/>
                    </div>
                    <div class="flex flex-col">
                        <label class="adminLabel">Password</label>
                        <input name="password" class="adminInput" placeholder="Name"/>
                    </div>
                    <div class="flex flex-col">
                        <label class="adminLabel">Country</label>
                        <input name="country" class="adminInput" placeholder="Name"/>
                    </div>
                    <div class="flex flex-col">
                        <label class="adminLabel">City</label>
                        <input name="city" class="adminInput" placeholder="Name"/>
                    </div>
                    <div class="flex flex-col">
                        <label class="adminLabel">Street</label>
                        <input name="street" class="adminInput" placeholder="Name"/>
                    </div>
                    <div class="flex flex-col">
                        <label class="adminLabel">Postal Number</label>
                        <input name="postalCode" class="adminInput" placeholder="Name"/>
                    </div>
                </div>
                <button disabled="{userLoading}" class="p-2 font-medium text-[20px] text-white bg-[#1E4CDC] rounded-[5px]">
                    {#if !userLoading}Create{:else}<Spinner/>{/if}
                </button>
            </form>
        </div>

    </div>
</div>
<Toast bind:text={toastText} bind:status={toastStatus}/>
<style>
    .headingText {
        font-size: 32px;
        font-weight: 500;
        line-height: 39px;
        letter-spacing: 0em;
        text-align: left;
        color: #021F0E;
    }

    .profileButton {
        border-bottom: 1px solid #828282;
        border-radius: 5px;
    }

    .adminLabel {
        color: #021F0E;
        font-weight: 300;
        font-size: 16px;
    }

    .adminInput {
        border-bottom: 1px solid #8B8B8B;
        padding-bottom: 12px;
        padding-top: 12px;
    }
</style>