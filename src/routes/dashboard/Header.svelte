<script lang="ts">
import {user} from "../../stores/auth.store.js";
import {goto} from "$app/navigation";
</script>


<header class="h-[5rem] bg-white">

    <div class="flex flex-row justify-between items-center h-full pl-[3rem] pr-[3rem]">
        <img src="/icons/logo/powerup.svg"/>
        <div on:click={()=>{goto('/dashboard/admin')}} class="flex flex-row gap-5 items-center hover:cursor-pointer">
            <span class="username">{$user?.firstName} {$user?.lastName}</span>
            <div class="profileCircle h-[50px] w-[50px] relative">
                <span class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{$user?.firstName.at(0)}{$user?.lastName.at(0)}</span>
            </div>
        </div>
    </div>
</header>

<style>
    header{
        box-shadow: 0px 4px 4px 0px #0000000A;
    }
    .username{
        font-family: Inter;
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;
        letter-spacing: 0em;
        text-align: left;
        color: #8B8B8B;
    }
    .profileCircle{
        background: #D9D9D9;
        border-radius: 50%;

    }
    .profileCircle span{
        font-family: Inter;
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;
        letter-spacing: 0em;
        text-align: center;
        color: #021F0E;
    }
</style>
