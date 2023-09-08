<script>
    import Topbar from "../components/Topbar.svelte";
    import ItemList from "../components/ItemList.svelte";
    import FilterSearch from "../components/FilterSearch.svelte";

    let items = [];
</script>

<Topbar isAdminPage=true subtitle="This is the admin page used to delete or add items!" />
<div class="container mx-auto w-4/5">
    <FilterSearch bind:items={items} />
</div>
<div class="container mx-auto w-4/5">
    <ItemList bind:items={items} />
</div>