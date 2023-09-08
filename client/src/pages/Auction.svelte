<script>
    import Topbar from "../components/Topbar.svelte";
    import ItemList from "../components/ItemList.svelte";
    import FilterSearch from "../components/FilterSearch.svelte";

    let items = [];
</script>

<Topbar subtitle="This page shows all items available to bid on. Use the filters to search for your item!" />
<div class="container mx-auto w-4/5">
    <FilterSearch bind:items={items} />
</div>
<div class="container mx-auto w-4/5">
    <ItemList bind:items={items} />
</div>