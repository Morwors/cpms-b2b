<script lang="ts">

    export let text = "Stopping charging session"
</script>

<div style="justify-items: center;" class="grid grid-cols-1 gap-5 p-10">
    <img class="animate-spin h-[150px] w-[150px]" src="/icons/spinner/spinner.svg"/>
    <span class="stopChargingText">{text}</span>
</div>
<style>
    img{
        position: relative;
        top: 20px;
    }
    .stopChargingText{
        width: 400px;
        padding: 50px;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        display: flex;
        align-self: center;
        justify-content: center;
        align-items: center;
        text-align: center;

        color: #000000;
    }
</style>