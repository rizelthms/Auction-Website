<script>
    import Topbar from "../components/Topbar.svelte";
    import { createUser } from "../lib/api.js";
    import { toast } from "@zerodevx/svelte-toast";

    let username
    let password1;
    let password2;
    async function on_register() {
        if (!(username && password1 && password2)) {
            toast.push("Please enter all values.", {theme: {"--toastBackground": "red"}});
            return;
        }
        if (password1 != password2) {
            toast.push("Password confirmation not the same.", {theme: {"--toastBackground": "red"}});
            return;
        }
        if (password1.length < 5) {
            toast.push("Password length must be at least 5.", {theme: {"--toastBackground": "red"}});
            return;
        }
        let res = await createUser({name: username, password: password1});
        if (res.status) {
            document.getElementById("submit").disabled = true;
            toast.push("Registered successfully, please log in with new user...");
            const sleep = t => new Promise(resolve => setTimeout(resolve, t));
            await sleep(1200);
            window.location.href = "/auction";
        } else {
            toast.push(res?.message, {theme: {"--toastBackground": "red"}});
        }
    }
</script>

<Topbar subtitle="Fill the form to register and access the auction site!" />
<div class="container mx-auto w-4/5">
    <div class="mb-6">
        <label for="username" class="">Username</label>
        <input bind:value={username} type="text" id="username" class="border focus:ring-blue-500 w-full p-2.5" required placeholder="Enter username" />
    </div>
    <div class="mb-6">
        <label for="password1" class="">Password</label>
        <input bind:value={password1} type="password" id="password1" class="border focus:ring-blue-500 w-full p-2.5" required placeholder="Enter password (at least 5 characters)" />
    </div>
    <div class="mb-6">
        <label for="password2" class="">Confirm Password</label>
        <input bind:value={password2} type="password" id="password2" class="border focus:ring-blue-500 w-full p-2.5" required placeholder="Confirm same password" />
    </div>
    <button id="submit" on:click={on_register} type="submit" class="text-white bg-lime-700 hover:bg-lime-800 rounded-lg px-5 py-2.5">Submit Registration</button>
</div>
