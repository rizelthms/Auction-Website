<script>
    import { toast } from "@zerodevx/svelte-toast";

    // Specify the login request async func to use
    export let login_func_async;
    // Specify the destination route after logging in
    export let login_destination;

    // input bindings
    let name;
    let password;

    const login = async () => {
        let response = await login_func_async({ name, password });
        if (response.status) {
            localStorage.setItem("userInfo", JSON.stringify({
                name: response.data.user.name,
                isAdmin: response.data.user.isAdmin,
                token: response.data.token
            }));
            window.location.href = login_destination;
            toast.push("Successfully logged in");
        } else {
            toast.push(response?.message, {
                theme: {
                    "--toastBackground": "red",
                },
            });
        }
    };
</script>

<div class="mb-6">
    <label for="username" class="">Username</label>
    <input bind:value={name} type="username" id="username" class="border focus:ring-blue-500 w-full p-2.5" required>
</div>
<div class="mb-6">
    <label for="password" class="">Password</label>
    <input bind:value={password} type="password" id="password" class="border focus:ring-blue-500 w-full p-2.5" required>
</div>
<button on:click={login} type="submit" class="text-white bg-pink-700 hover:bg-blue-800 rounded-lg px-5 py-2.5">Log In</button>
