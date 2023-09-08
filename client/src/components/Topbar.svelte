
<script>
    import {userInfo} from "../lib/Store.js"

    export let isAdminPage = false;
    export let subtitle = "";

    let isLoggedIn = $userInfo && $userInfo.name;

    function on_logout() {
        userInfo.set(null);
        window.location.href = "/";
    }
</script>

<nav class="py-2.5 px-2">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
        <div class="flex flex-row space-x-8">
            {#if isAdminPage}
                <a href="/admin" class="self-center text-xl font-semibold border border-pink-700 rounded-lg px-5 py-2.5">Auction Admin</a>
                <a href="/client/login" class="text-purple-600 underline">Go to Client Page</a>
                {#if isLoggedIn && $userInfo.isAdmin}
                    <a href="/admin/additem" class="text-white bg-purple-700 hover:bg-blue-800 rounded-lg px-5 py-2.5">Add Item Page</a>
                {/if}
            {:else}
                <a href="/auction" class="self-center text-xl font-semibold border border-purple-700 rounded-lg px-5 py-2.5">Auction Client</a>
                <a href="/admin/login" class="text-pink-600 underline">Go to Admin Page</a>
            {/if}
        </div>
        <div class="flex flex-row space-x-8">
            {#if isLoggedIn}
                <span class="">{$userInfo.name}</span>
                <button type="button" class="text-white bg-pink-700 hover:bg-blue-800 rounded-lg px-5 py-2.5" on:click={on_logout}>Log Out</button>
            {:else if !isAdminPage}
                <a href="/register" class="text-white bg-pink-700 hover:bg-blue-800 rounded-lg px-5 py-2.5">Register</a>
            {/if}
        </div>
    </div>
    <div class="container flex flex-wrap justify-between items-start mx-auto">
        <p>{subtitle}</p>
    </div>
</nav>
