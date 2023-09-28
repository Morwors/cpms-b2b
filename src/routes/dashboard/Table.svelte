<script lang="ts">
    export let expanded = false;
    export let tableHeaders: string[] = [];

    export let tableSize = 0;

    export let page = 1;
    export let perPage = 10;

    function handlePerPageChange(newPerPage: number){
        perPage = newPerPage;
    }


    function handleExpand() {
        expanded = !expanded;
    }
    function handlePageChange(newPage){
        if((page + newPage) <= 0){
            page = 1;
        } else  {
            page += newPage
        }
    }
</script>

<div class="grid grid-cols-1 gap-5">
    <slot name="header"></slot>

    <div class="flex overflow-auto">
        <table class="col-span-full w-full">
            <tr>
                {#each tableHeaders as tableHeader}
                    {#if tableHeader === "cb"}
                        <slot name="checkbox"/>
                    {:else}
                        <th>{tableHeader}</th>
                    {/if}
                {/each}
            </tr>
            <slot name="rows"/>
        </table>
    </div>
    {#if !expanded}
        <button on:click="{()=>{handleExpand()}}" class="expandButton place-self-end gap-3"><img
                src="/icons/button/plusIcon.svg"/>Expand
        </button>
    {:else}
        <slot name="footer"/>
    {/if}

</div>
<style>
    @import "./table.css";
</style>