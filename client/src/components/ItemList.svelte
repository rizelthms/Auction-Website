<script>
    import Item from "../components/Item.svelte";
    import {userInfo} from "../lib/Store.js"
    import {
        getItemList,
    } from "../lib/api.js";
    import { onMount } from 'svelte';

    // allow items to be bind to let filter work
    export let items = [];
    onMount(async () => {
        refresh_items();
    });
    async function refresh_items() {
        let res = await getItemList();
        if (res.status) {
            items = res.data.item;
            // show new items first by default
            items.reverse();
        }
    }
</script>

<div class="grid gap-6 grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
    {#each items as item (item.id)}
        <Item {item} user={$userInfo} on:refresh={refresh_items}/>
    {/each}
</div>