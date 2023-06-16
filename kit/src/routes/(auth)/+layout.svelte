<script>
    import "../../app.postcss";
    import { slide } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';

    let open = false;
</script>

<nav class="bg-light-white py-5 flex items-center justify-between px-10 md:px-32 text-gray">
    <div class="flex justify-center items-center">
        <a href="/">
            <img class="w-24" src="logo.svg" alt="Rentery Logo">
        </a>
    </div>
    <div class="flex justify-center items-center md:hidden">
        <button on:click={() => open = !open}>
            {#if !open}
                <img transition:slide={{ duration: 250, easing: quadOut, axis: 'x' }} src="menuopen.svg" alt="Menu Icon Open">
            {:else}
                <img transition:slide={{ duration: 250, easing: quadOut, axis: 'x' }} src="menuclosed.svg" alt="Menu Icon Closed">
            {/if}
        </button>
    </div>
    <div class="hidden md:flex items-center justify-center gap-6 md:gap-12">
        <a class="nav-link whitespace-nowrap hover:ring-2 hover:ring-blue rounded-md transition-all ease-in px-3 py-2" href="/">Home</a>
        <a class="nav-link whitespace-nowrap hover:ring-2 hover:ring-blue rounded-md transition-all ease-in px-3 py-2" href="/features">Features</a>
        <a class="nav-link whitespace-nowrap hover:ring-2 hover:ring-blue rounded-md transition-all ease-in px-3 py-2" href="/faq">FAQ</a>
        <a class="nav-link whitespace-nowrap hover:ring-2 hover:ring-blue rounded-md transition-all ease-in px-3 py-2" href="/contact">Contact us</a>
    </div>
    <div class="hidden md:flex items-center justify-center gap-3 md:gap-6 font-bold">
        <a class="nav-link whitespace-nowrap hover:ring-2 hover:ring-blue rounded-md transition-all ease-in px-3 py-2" href="/login">Login</a>
        <a class="nav-link whitespace-nowrap ring-2 ring-blue rounded-md px-3 py-2 hover:text-light-white hover:bg-blue transition-all ease-in" href="/register">Get started</a>
    </div>
</nav>
{#if open}
    <div transition:slide={{ duration: 250, easing: quadOut, axis: 'x' }} class="flex w-full flex-col gap-4 justify-center items-center text-center bg-light-white text-4xl relative h-screen md:hidden">
        <a on:click={() => open = !open} class="nav-link w-full whitespace-nowrap hover:ring-2 hover:ring-blue rounded-md transition-all ease-in px-3 py-2" href="/">Home</a>
        <a on:click={() => open = !open} class="nav-link w-full whitespace-nowrap hover:ring-2 hover:ring-blue rounded-md transition-all ease-in px-3 py-2" href="/features">Features</a>
        <a on:click={() => open = !open} class="nav-link w-full whitespace-nowrap hover:ring-2 hover:ring-blue rounded-md transition-all ease-in px-3 py-2" href="/faq">FAQ</a>
        <a on:click={() => open = !open} class="nav-link w-full whitespace-nowrap hover:ring-2 hover:ring-blue rounded-md transition-all ease-in px-3 py-2" href="/contact">Contact us</a>
    </div>
{/if}
<slot />
<div class="bg-light-white py-20 text-light-white">
</div>
<div class="bg-dark-blue text-light-white flex flex-col justify-center items-center gap-14 py-10 px-12 md:px-24">
    <div class="flex gap-10 md:gap-0 flex-col md:flex-row w-full justify-center md:justify-between items-start md:items-center">
        <div class="flex flex-col gap-5 justify-center items-start">
            <a href="/">
                <img src="Group 8.svg" alt="Rentery Logo">
            </a>
            <div class="flex justify-center items-center gap-3">
                <a href="#"><img class="w-10" src="icons/Frame 30.svg" alt="Instagram icon"></a>
                <a href="#"><img class="w-10" src="icons/Frame 31.svg" alt="Twitter icon"></a>
                <a href="#"><img class="w-10" src="icons/Frame 32.svg" alt="Facebook icon"></a>
                <a href="#"><img class="w-10" src="icons/Frame 33.svg" alt="Email icon"></a>
            </div>
        </div>
        <div class="flex flex-col md:flex-row justify-center gap-10 items-start">
            <div class="flex flex-col gap-5 justify-center items-start">
                <h2 class="font-bold uppercase">Software</h2>
                <div class="flex flex-col gap-3 justify-center items-start">
                    <a href="/">Home</a>
                    <a href="/features">Features</a>
                </div>
            </div>
            <div class="flex flex-col gap-5 justify-center items-start">
                <h2 class="font-bold uppercase">Resources</h2>
                <div class="flex flex-col gap-3 justify-center items-start">
                    <a href="/contact">Contact</a>
                    <a href="/faq">FAQ</a>
                </div>
            </div>
            <div class="flex flex-col gap-5 justify-center items-start">
                <h2 class="font-bold uppercase">Company</h2>
                <div class="flex flex-col gap-3 justify-center items-start">
                    <a href="#">About us</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </div>
        </div>
    </div>
    <p>© 2023 Rentery. All rights reserved.</p>
</div>