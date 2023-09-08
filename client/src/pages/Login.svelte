<script>
    import Topbar from "../components/Topbar.svelte";
    import Login from "../components/Login.svelte";

    export let params;
</script>

<Topbar isAdminPage={params.isAdminPage} subtitle="Login to access the page." />
<div class="container mx-auto w-1/4 ">
    <Login {...params}/>
</div>