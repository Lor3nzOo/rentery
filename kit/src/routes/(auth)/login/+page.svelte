<script>
    import {field, form, style} from "svelte-forms";
    import { Icon, Eye, EyeSlash } from "svelte-hero-icons";
    import {email, min, required} from "svelte-forms/validators";
    import axios from "axios";
    import {goto} from "$app/navigation";

    const emailField = field('email', '', [required(), email()]);
    const password = field('password', '', [required(), min(8)]);

    const loginForm = form(emailField, password);

    let type = "password";

    const login = async () => {
        try {
            loginForm.validate
            const created = await axios.post('http://localhost:3000/auth/login', $loginForm.summary, { withCredentials: true })
            alert(created.data)
            await goto('/app')
        } catch (e) {
            alert(e.response.data.message)
        }
    }
</script>
<main class="bg-gradient-to-l from-[#1E2E3C] to-[#055999] flex flex-col justify-center gap-14 items-center px-10 md:px-0 text-light-white text-left md:text-center py-10 md:py-24">
    <h1 class="font-bold text-2xl md:text-4xl leading-snug">Log in our software </h1>
    <div class="flex flex-col md:flex-row justify-center w-full gap-10 items-center">
        <div class="flex flex-col justify-center max-w-md items-start gap-7 w-full">
            <input use:style={{ field: emailField, valid: "ring-[#169612]", invalid: "ring-[#fa2d2d]" }} class="outline-0 w-full focus:ring-blue py-2 w-full px-5 rounded-md ring-2 bg-dark-blue transition-all" type="email" placeholder="Email" bind:value={$emailField.value}>
            <div class="relative w-full">
                {#if type === 'password' }
                    <input use:style={{ field: password, valid: "ring-[#169612]", invalid: "ring-[#fa2d2d]" }} class="outline-0 w-full focus:ring-blue py-2 w-full px-5 rounded-md ring-2 bg-dark-blue transition-all" type="password" placeholder="Password" bind:value={$password.value}>
                {:else if type === 'text'}
                    <input use:style={{ field: password, valid: "ring-[#169612]", invalid: "ring-[#fa2d2d]" }} class="outline-0 w-full focus:ring-blue py-2 w-full px-5 rounded-md ring-2 bg-dark-blue transition-all" type="text" placeholder="Password" bind:value={$password.value}>
                {/if}
                {#if type === "password"}
                    <span on:click={() => type = "text"}>
                        <Icon class="absolute w-7 h-7 top-1.5 right-5 cursor-pointer" src="{Eye}" />
                    </span>
                    {:else }
                    <span on:click={() => type = "password"}>
                        <Icon class="absolute w-7 h-7 top-1.5 right-5 cursor-pointer" src="{EyeSlash}" />
                    </span>
                {/if}
            </div>
            <button disabled={!$loginForm.valid} class="bg-blue rounded-md py-3 px-10 text-light-white w-full hover:ring-2 hover:ring-blue hover:bg-light-white hover:text-gray transition-all" on:click={() => login()}>Login</button>
            <p>Don't have an account? <a class="font-bold" href="/register">Register</a>.</p>
        </div>
        <img class="w-64 md:w-80" src="undraw_home_settings_re_pkya 1.svg" alt="Login Illustration">
    </div>
</main>