<script>
    import { Icon, Eye, EyeSlash } from "svelte-hero-icons";
    import { form, field, style } from 'svelte-forms';
    import { required, matchField, email, min, between, pattern } from 'svelte-forms/validators';
    import axios from "axios";
    import {goto} from "$app/navigation";

    const username = field('username', '', [required(), between(5, 15)]);
    const emailField = field('email', '', [required(), email()]);
    const password = field('password', '', [required(), min(8)]);
    const confirmPassword = field('confirmPassword', '', [matchField(password)]);
    const accept = field('accept', false, [required()])
    const registerForm = form(username, emailField, password, confirmPassword, accept);

    let type = "password";
    let exists = false;
    let existsEmail = false;

    $:  {
        axios.post('http://localhost:3000/auth/username', { username: $username.value }).then(res => exists = res.data)
    }

    $:  {
        axios.post('http://localhost:3000/auth/email', { email: $emailField.value }).then(res => existsEmail = res.data)
    }

    const register = async () => {
        if ($accept.value === true) {
            try {
                registerForm.validate
                if (existsEmail === false && exists === false) {
                    const created = await axios.post('http://localhost:3000/auth/register', $registerForm.summary)
                    alert(created.data)
                    await goto('/login')
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
</script>
<main class="bg-gradient-to-l from-[#1E2E3C] to-[#055999] flex flex-col justify-center gap-14 items-center px-10 md:px-0 text-light-white text-left md:text-center py-10 md:py-24">
    <h1 class="font-bold text-2xl md:text-4xl leading-snug">Register in our software </h1>
    <div class="flex flex-col md:flex-row justify-center w-full gap-10 items-center">
        <div class="flex flex-col justify-center max-w-md items-start gap-7 w-full">
            <input class:ring-[#fa2d2d]="{ exists === true }" use:style={{ field: username, valid: "ring-[#169612]", invalid: "ring-[#fa2d2d]" }} class="outline-0 w-full focus:ring-blue py-2 w-full px-5 rounded-md ring-2 bg-dark-blue transition-all" type="text" placeholder="Username" bind:value={$username.value}>
            {#if $registerForm.hasError('username.between')}
                <span class="absolute text-[#fa2d2d] -mt-80">Invalid username</span>
            {/if}
            {#if exists && $username.value.length > 0}
                <span class="absolute text-[#fa2d2d] -mt-80">Username exists</span>
            {/if}
            <input class:ring-[#fa2d2d]="{ existsEmail === true }" use:style={{ field: emailField, valid: "ring-[#169612]", invalid: "ring-[#fa2d2d]" }} class="outline-0 w-full focus:ring-blue py-2 w-full px-5 rounded-md ring-2 bg-dark-blue transition-all" type="email" placeholder="Email" bind:value={$emailField.value}>
            {#if existsEmail && $emailField.value.length > 0}
                <span class="absolute text-[#fa2d2d] -mt-44">Email exists</span>
            {/if}
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
            {#if $registerForm.hasError('password.min')}
                <span class="absolute -mt-12 text-[#fa2d2d]">Invalid password</span>
            {/if}
            <input use:style={{ field: confirmPassword, valid: "ring-[#169612]", invalid: "ring-[#b51414]" }} class="outline-0 w-full focus:ring-blue py-2 w-full px-5 rounded-md ring-2 bg-dark-blue transition-all" type="password" placeholder="Confirm Password" bind:value={$confirmPassword.value}>
            <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input bind:checked={$accept.value} class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)]" type="checkbox" />
                <label class="inline-block pl-[0.15rem]">I agree to Terms of Service and Privacy Policy</label>
            </div>
            <button class="bg-blue rounded-md py-3 px-10 text-light-white w-full hover:ring-2 hover:ring-blue hover:bg-light-white hover:text-gray transition-all" disabled={!$registerForm.valid} on:click={() => register()}>Register</button>
            <p>Already have an account? <a class="font-bold" href="/login">Login</a>.</p>
        </div>
        <img class="w-64 md:w-80" src="undraw_home_settings_re_pkya 1.svg" alt="Login Illustration">
    </div>
</main>