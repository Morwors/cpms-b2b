<script lang="ts">
    import {page} from "$app/stores";

    let toggle = false;

    function handleToggle() {
        toggle = !toggle;
    }


</script>

<div class="{toggle? 'w-[200px]':'w-[100px]'} flex flex-col gap-20 justify-between pt-[4rem] pb-[2rem] flex-none bg-white">
    <div class="flex flex-col gap-20 items-center ">
        <a href="/dashboard/active" class="flex flex-row gap-6 relative">
<!--            <div class="w-[15px] h-[30px] absolute bg-[#1E4CDC] rounded {toggle?'left-[-35px]':'left-[-48px]'}"></div>-->
            <img src="{$page.url.pathname==='/dashboard/active'?'/icons/nav/activeIconA.svg':'/icons/nav/activeIconD.svg'}">
            {#if toggle}
                <span class="{$page.url.pathname==='/dashboard/active'?'active':''}">
                    Active charging sessions
                </span>
            {/if}
        </a>
        <a href="/dashboard/history" class="flex flex-row gap-6 relative">
            <img src="{$page.url.pathname==='/dashboard/history'?'/icons/nav/historyIconA.svg':'/icons/nav/historyIconD.svg'}">
            {#if toggle}
                <span class="{$page.url.pathname==='/dashboard/history'?'active':''}">
                    Charging sessions history
                </span>
            {/if}
        </a>
        <a href="/dashboard/pricing" class="flex flex-row gap-6 relative">
            <img src="{$page.url.pathname==='/dashboard/pricing'?'/icons/nav/pricingIconA.svg':'/icons/nav/pricingIconD.svg'}">
            {#if toggle}
                <span class="{$page.url.pathname==='/dashboard/pricing'?'active':''}">
                    Pricing module
                </span>
            {/if}
        </a>
        <a href="/dashboard/energy" class="flex flex-row gap-6">
            <img src="{$page.url.pathname==='/dashboard/energy'?'/icons/nav/energyIconA.svg':'/icons/nav/energyIconD.svg'}">
            {#if toggle}
                <span class="{$page.url.pathname==='/dashboard/energy'?'active':''}">
                    Energy management
                </span>
            {/if}
        </a>
        <a href="/dashboard/remote" class="flex flex-row gap-6">
            <img src="{$page.url.pathname==='/dashboard/remote'?'/icons/nav/controlIconA.svg':'/icons/nav/controlIconD.svg'}">
            {#if toggle}
                <span class="{$page.url.pathname==='/dashboard/remote'?'active':''}">
                    Remote control dashboard
                </span>
            {/if}
        </a>
        <a href="/dashboard/control" class="flex flex-row gap-6">
            <img src="{$page.url.pathname==='/dashboard/control'?'/icons/nav/remoteIconA.svg':'/icons/nav/remoteIconD.svg'}">
            {#if toggle}
                <span class="{$page.url.pathname==='/dashboard/control'?'active':''}">
                    Charger control panel
                </span>
            {/if}
        </a>
        <a href="/dashboard/admin" class="flex flex-row gap-6">
            <img src="{$page.url.pathname==='/dashboard/admin'?'/icons/nav/profileIconA.svg':'/icons/nav/profileIconD.svg'}">
            {#if toggle}
                <span class="{$page.url.pathname==='/dashboard/admin'?'active':''}">
                    Your profile
                </span>
            {/if}
        </a>
    </div>

    <div on:click={()=>{handleToggle()}} class="toggleContainer">
        <div class="toggleCircle {toggle?'left-[30px]':'left-[3px]'}">
            <img src="{toggle?'/icons/arrow/arrowLeft.svg':'/icons/arrow/arrowRight.svg'}">
        </div>
    </div>
</div>
<style>
    .toggleContainer {
        background: white;
        box-shadow: -65px 0px 65px 0px rgba(54, 54, 54, 0.07) inset, 0px 1px 5px 0px rgba(0, 0, 0, 0.07) inset;

        width: 50px;
        height: 22px;
        border-radius: 200px;
        position: relative;
        left: 25px;
    }

    .toggleCircle {
        background: #1E4CDC;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        position: relative;
        top: 3px;
        /*display: flex;*/
        /*padding: 10px;*/
    }

    .toggleCircle img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 10px;
    }

    .toggleContainer:hover {
        cursor: pointer;
    }
    span{
        height: 0px;
        white-space: normal;
        font-family: Inter;
        font-size: 12px;
        font-weight: 400;
        line-height: 15px;
        letter-spacing: 0em;
        text-align: left;
        color: #8B8B8B;
        width: 100px;

    }
    .active{
        font-family: Inter;
        font-size: 12px;
        font-weight: 500;
        line-height: 15px;
        letter-spacing: 0em;
        text-align: left;
        color: #1E4CDC;
    }
</style>