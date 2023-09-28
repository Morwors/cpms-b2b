<script>
    import {logout, user} from "../../../stores/auth.store.ts";
    import {goto} from "$app/navigation";
</script>

<div class="flex-1 p-5 flex flex-col gap-5">
    <div class="flex flex-1 card flex-row gap-5 justify-around p-10 pt-20">
        <div class="flex flex-col gap-7 p-10 items-center">
            <div class="rounded-[50%] relative bg-[#D9D9D9] h-[130px] w-[130px]">
                <h3 class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#021F0E] text-[36px] font-medium">{$user?.firstName.at(0)}{$user?.lastName.at(0)}</h3>
            </div>
            <h3 class="text-[#021F0E] text-[32px] font-medium">{$user?.firstName} {$user?.lastName}</h3>
            <h5>Position</h5>
            <button on:click={()=>{goto('/dashboard/admin/create')}} class="profileButton text-[12px] font-normal text-[#021F0E] w-[300px] p-2 flex flex-row gap-5"><img src="/icons/admin/plusIcon.svg"/> Create Account</button>
        </div>
        <div class="flex flex-col gap-6 p-10">
            <div class="flex flex-row gap-5">
                <div class="flex flex-col gap-3 flex-1">
                    <label class="adminLabel">Name</label>
                    <input value="{$user.firstName}" class="adminInput" placeholder="Lorem Ipsum"/>
                </div>
                <div class="flex flex-col gap-3 flex-1">
                    <label class="adminLabel">Surname</label>
                    <input value="{$user.lastName}" class="adminInput" placeholder="Lorem Ipsum"/>
                </div>
            </div>
            <div class="flex flex-col gap-3">
                <label class="adminLabel">Password</label>
                <input class="adminInput" placeholder="Lorem Ipsum"/>
                <a class="text-right font-normal text-[#1E4CDC] text-[16px]">Reset Password</a>
            </div>
            <div class="flex flex-col gap-3">
                <label class="adminLabel">Company</label>
                <input class="adminInput" placeholder="Lorem Ipsum"/>
            </div>
            <div class="flex flex-row gap-5">
                <div class="flex flex-col gap-3">
                    <label class="adminLabel">Level</label>
                    <button class="profileButton text-[12px] font-normal text-[#021F0E] p-2 flex flex-row gap-5 w-[290px] h-[35px]">Super Admin</button>
                </div>
                <div class="flex flex-col gap-3">
                    <label class="adminLabel">Company Bank Account</label>
                    <button class="bg-[#1E4CDC] text-[12px] text-white underline w-[290px] h-[35px]" on:click={()=>{goto('/dashboard/admin/bank')}}>Bank account</button>
                </div>
            </div>
            <div class="flex-1 self-end flex mt-20">
                <button class="buttonOutline flex flex-row gap-2 items-center justify-center"><img src="/icons/admin/logoutIcon.svg" on:click={logout}/>Log Out</button>
            </div>
        </div>
    </div>
</div>

<style>
    .buttonOutline{
        border: 1px solid #1E4CDC;
        color: #1E4CDC;
        font-weight: 500;
        font-size: 15px;
        height: 45px;
        width: 290px;
    }
    .profileButton{
        border-bottom: 1px solid #828282;
        border-radius: 5px;
    }
    .adminLabel{
        color: #021F0E;
        font-weight: 400;
        font-size: 16px;
    }
    .adminInput{
        border: 1px solid #828282;
        padding: 12px;
        border-radius: 5px;
    }
</style>