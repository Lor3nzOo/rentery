<script>
    import "../../app.postcss";
    import { slide, fly } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';
    import { page } from "$app/stores";

    let open = false;
    let me = false;
</script>

<nav class="bg-light-white py-5 flex items-center justify-between px-10 md:px-32 text-gray">
    <div class="flex justify-center items-center">
        <a href="/app">
            <img class="w-24" src="../logo.svg" alt="Rentery Logo">
        </a>
    </div>
    <div class="flex justify-center items-center md:hidden">
        <button on:click={() => open = !open}>
            {#if !open}
                <img transition:slide={{ duration: 250, easing: quadOut, axis: 'x' }} src="../menuopen.svg" alt="Menu Icon Open">
            {:else}
                <img transition:slide={{ duration: 250, easing: quadOut, axis: 'x' }} src="../menuclosed.svg" alt="Menu Icon Closed">
            {/if}
        </button>
    </div>
    <div class="hidden md:flex items-center justify-center gap-6 md:gap-12">
        <a class="nav-link whitespace-nowrap hover:ring-2 hover:ring-blue rounded-md transition-all ease-in px-3 py-2" href="/app">Dashboard</a>
        <a class="nav-link whitespace-nowrap hover:ring-2 hover:ring-blue rounded-md transition-all ease-in px-3 py-2" href="/app/rentals">Rentals</a>
        <a class="nav-link whitespace-nowrap hover:ring-2 hover:ring-blue rounded-md transition-all ease-in px-3 py-2" href="/app/bookings">Bookings</a>
        <a class="nav-link whitespace-nowrap hover:ring-2 hover:ring-blue rounded-md transition-all ease-in px-3 py-2" href="/app/settings">Settings</a>
    </div>
    <div class="hidden md:flex items-center justify-center gap-3 md:gap-6 text-light-white">
        <span on:click={() => me = !me} class="bg-gray p-3 px-4 rounded-xl cursor-pointer transition-all hover:bg-blue uppercase">{$page.data.user.username.slice(0, 2)}</span>
    </div>
</nav>
{#if me}
    <div in:fly="{{ y: -200, duration: 250 }}" out:fly="{{ y: -200, duration: 250 }}" class="bg-gray  p-4 rounded-b-xl flex-col gap-4 text-center flex justify-center right-0 absolute items-start">
        <div class="flex justify-center items-center gap-2">
            <span class="bg-light-white p-2 px-3 rounded-md uppercase">{$page.data.user.username.slice(0, 2)}</span>
            <div class="flex flex-col text-light-white justify-center items-start">
                <p class="font-bold">{$page.data.user.username}</p>
                <p>{$page.data.user.email}</p>
            </div>
        </div>
        <div class="w-full h-[0.05rem] bg-light-white"></div>
        <div class="flex flex-col gap-4 justify-center items-center text-center w-full">
            <button class="bg-light-white rounded-md py-3 px-10 text-gray w-full hover:bg-blue hover:text-light-white transition-all">Account Settings</button>
            <form action="/signout" method="POST">
                <button class="bg-light-white rounded-md py-3 px-10 text-gray w-full hover:bg-blue hover:text-light-white transition-all">Sign out</button>
            </form>
        </div>
    </div>
{/if}
{#if open}
    <div transition:slide={{ duration: 250, easing: quadOut, axis: 'x' }} class="flex w-full flex-col gap-4 justify-center items-center text-center bg-light-white text-4xl relative h-screen md:hidden">
        <a on:click={() => open = !open} class="nav-link w-full whitespace-nowrap hover:ring-2 hover:ring-blue rounded-md transition-all ease-in px-3 py-2" href="/app">Dashboard</a>
        <a on:click={() => open = !open} class="nav-link w-full whitespace-nowrap hover:ring-2 hover:ring-blue rounded-md transition-all ease-in px-3 py-2" href="/app/rentals">Rentals</a>
        <a on:click={() => open = !open} class="nav-link w-full whitespace-nowrap hover:ring-2 hover:ring-blue rounded-md transition-all ease-in px-3 py-2" href="/app/bookings">Bookings</a>
        <a on:click={() => open = !open} class="nav-link w-full whitespace-nowrap hover:ring-2 hover:ring-blue rounded-md transition-all ease-in px-3 py-2" href="/app/settings">Settings</a>
    </div>
{/if}
<slot />