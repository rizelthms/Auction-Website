<script>
    export let items;
    let items_all = [];
    $: if (items != null && items_all.length == 0) {
        items_all = [...items];
    }

    let filter_search;
    let filter_type="Any";
    let filter_author="Any";
    let filter_sort="Default";
    let filter_year_min;
    let filter_year_max;
    function on_filter() {
        items = items_all.filter(i => {
            return check_type(i, filter_type) && check_author(i, filter_author) && check_year(i, filter_year_min, filter_year_max) && check_search(i, filter_search);
        });
        if (filter_sort != "Default") {
            items.sort((a, b) => {
                let priceA = a.currentBid ?? a.startingBid;
                let priceB = b.currentBid ?? b.startingBid;
                if (filter_sort == "PRICE_ASC") {
                    return priceA - priceB;
                }
                return priceB - priceA;
            })
        }
    }
    function check_search(i, search) {
        return !search || i.description.toLowerCase().includes(search.toLowerCase());
    }
    function check_type(i, type) {
        return type == "Any" || i.type == type;
    }
    function check_author(i, author) {
        return author == "Any" || i.author == author;
    }
    function check_year(i, min, max) {
        if (min && min > i.year) {
            return false;
        }
        if (max && max < i.year) {
            return false;
        }
        return true;
    }
</script>

<div class="container flex items-center mx-auto py-2.5 px-2">
    <input bind:value={filter_search} class="w-1/5 border rounded-lg p-2.5" type="text" placeholder="Enter search description" on:input={on_filter}/>
    <label class="w-1/4 border rounded-lg p-2.5">Filter by year:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input bind:value={filter_year_min} class="w-1/4" type="number" pattern="\d+" placeholder="Min Year" on:input={on_filter}/>
        <input bind:value={filter_year_max} class="w-1/4" type="number" pattern="\d+" placeholder="Max Year" on:input={on_filter}/>
    </label>
    <select bind:value={filter_type} class="w-1/6 border rounded-lg p-2.5" on:change={on_filter}>
        <option value="Any">Filter by painting type</option>
        <option value="Any">Any</option>
        {#each [...new Set(items_all.map(i => i.type))] as type}
            <option value="{type}">{type}</option>
        {/each}
    </select>
    <select bind:value={filter_author} class="w-1/6 border rounded-lg p-2.5" on:change={on_filter}>
        <option value="Any">Filter by artist</option>
        <option value="Any">Any</option>
        {#each [...new Set(items_all.map(i => i.author))] as author}
            <option value="{author}">{author}</option>
        {/each}
    </select>
    <select bind:value={filter_sort} class="w-1/6 border rounded-lg p-2.5" on:change={on_filter}>
        <option value="Default">Default sort</option>
        <option value="PRICE_ASC">Price ↑</option>
        <option value="PRICE_DSC">Price ↓</option>
    </select>
</div>
