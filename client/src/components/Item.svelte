<script>
    import { toast } from "@zerodevx/svelte-toast";
    import { onMount } from "svelte";
    import {
        getItemBids,
        getItemDetails,
        submitBid,
        deleteBid,
        deleteItem
    } from "../lib/api.js";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let item;
    export let user;

    let input_bid;

    // get the bids on this item
    let bids = [];
    let userBid = null;
    onMount(async () => {
        refresh_bids();
    });
    async function refresh_bids() {
        let res = await getItemBids(item.id);
        if (res.status) {
            bids = res.data.bids;
            userBid = bids.find(b => b.bidBy == user.name);
        }
        res = await getItemDetails(item.id);
        if (res.status) {
            item = res.data.data;
        }
    }
    function refresh_items() {
        dispatch('refresh');
    }

    async function on_delete_item() {
        await send_request(async () => deleteItem(item.id), refresh_items, "Item deleted successfully", refresh_items);
    }
    async function on_delete_bid() {
        await send_request(async () => deleteBid(userBid.id), refresh_bids, "Bid cancelled successfully");
    }
    async function on_submit_bid() {
        let bid = input_bid ?? 0;
        if (bid <= 0 || bid < item.startingBid || bid < item.currentBid) {
            toast.push("Please check bid amount must be greater than starting and current bid.", {theme: {"--toastBackground": "red"}});
            return;
        }
        await send_request(async () => submitBid({ itemId:item.id, bidAmount:input_bid, bidBy: user.name }), refresh_bids, "Bid Success");
        input_bid = undefined;
    }
    async function send_request(req_func, on_success, success_msg, on_error=()=>{}) {
        let response = await req_func();
        if (response.status) {
            toast.push(success_msg);
            on_success();
        } else {
            toast.push(response?.message, {theme: {"--toastBackground": "red"}});
            on_error();
        }
    }
</script>

<div class="border border-gray-200 rounded-lg flex flex-col items-center">
    <img class="rounded-t-lg" src="https://picsum.photos/160/120?random={item.id}&blur=8" alt="{item.description}"/>
    <h5 class="mb-2 text-2xl font-bold text-gray-900">{item.description}</h5>
    <p class="px-5 py-2.5">{item.type} Painting by {item.author} in {item.year}</p>
    <table class="table-auto border-spacing-x-2 border border-separate">
        <tbody>
        <tr>
            <td>Start Date</td>
            <td>{item.createdAt.slice(0,10)}</td>
        </tr>
        <tr>
            <td>End Date</td>
            <td>{item.endAt ?? 'N/A'}</td>
        </tr>
        <tr>
            <td>Start Bid</td>
            <td>{item.startingBid}</td>
        </tr>
        <tr>
            <td>Current Bid</td>
            <td>{item.currentBid ?? 'N/A'}</td>
        </tr>
        <tr>
            <td>Bids By</td>
            <td>{bids.length > 0 ? bids.map(b => b.bidBy).join(',') : 'N/A'}</td>
        </tr>
        </tbody>
    </table>
    {#if user.isAdmin}
        <button type="button" class="text-white bg-red-700 hover:bg-green-800 rounded-lg px-5 py-2.5" on:click={on_delete_item}>Delete Item</button>
    {:else if userBid}
        <button type="button" class="text-white bg-red-700 hover:bg-green-800 rounded-lg px-5 py-2.5" on:click={on_delete_bid}>Cancel My Bid</button>
    {:else}
        <div class="flex">
            <input bind:value={input_bid} type="number" class="w-3/4" pattern="\d+" placeholder="Enter bid amount"/>
            <button type="button" class="w-1/4 text-white bg-lime-700 hover:bg-green-800 rounded-lg px-1 py-2.5" on:click={on_submit_bid}>Bid</button>
        </div>
    {/if}
</div>
