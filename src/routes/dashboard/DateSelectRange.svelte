<script lang="ts">
    import 'react-date-range/dist/styles.css'; // main style file
    import 'react-date-range/dist/theme/default.css';
    import {Calendar, DateRangePicker} from 'react-date-range';
    import {createEventDispatcher, onDestroy} from "svelte";

    let selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }
    const dispatch = createEventDispatcher();
    const close = () => dispatch('close',{
        selectionRange
    });

    let modal: any;

    const handle_keydown = (e: any) => {
        if (e.key === 'Escape') {
            close();
            return;
        }

        if (e.key === 'Tab') {
            // trap focus
            const nodes = modal.querySelectorAll('*');
            const tabbable = Array.from(nodes).filter((n: any) => n.tabIndex >= 0) as any[];

            let index = tabbable.indexOf(document.activeElement);
            if (index === -1 && e.shiftKey) index = 0;

            index += tabbable.length + (e.shiftKey ? -1 : 1);
            index %= tabbable.length;

            tabbable[index].focus();
            e.preventDefault();
        }
    };

    const previously_focused = typeof document !== 'undefined' && document.activeElement as any;

    if (previously_focused) {
        onDestroy(() => {
            previously_focused.focus();
        });
    }
    function handleSelect(ranges){
        selectionRange = ranges.selection
        // console.log(ranges);
    }
</script>
<svelte:window on:keydown={handle_keydown}/>
<div class="modal-background" on:click={close}></div>
<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
    <react:DateRangePicker
            ranges="{[selectionRange]}"
            date={new Date()}
            onChange={handleSelect}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            direction="horizontal"
            preventSnapRefocus={true}
            calendarFocus="backwards"/>
            <button class="saveButtonRdr" on:click={close}>Save</button>
</div>
<style>
    .modal-background {
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
    }

    .modal {
        z-index: 1001;
        position: fixed;
        left: 50%;
        top: 50%;
        width: calc(100vw - 4em);
        /*max-width: 32em;*/
        /*max-height: calc(100vh - 4em);*/
        overflow: auto;
        width: fit-content;
        transform: translate(-50%,-50%);
        max-width: 920px;
        /*padding: 54px 72px;*/
        padding: 15px;
        border-radius: 0.2em;
        background: white;
    }
    .saveButtonRdr{
        float: right;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        /* padding: 16px; */
        width: 107px;
        height: 30px;
        background: #0AB051;
        border-radius: 45px;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: #FFFFFF;
    }
</style>
