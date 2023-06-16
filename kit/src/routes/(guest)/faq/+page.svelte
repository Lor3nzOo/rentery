<script>
    import { fade } from 'svelte/transition';

    let show = [false, false, false, false, false]
</script>
<main class="bg-gradient-to-l from-[#1E2E3C] to-[#055999] flex flex-col justify-center gap-14 items-center px-10 md:px-0 text-light-white text-left md:text-center py-10 md:py-24">
    <h1 class="font-bold text-2xl md:text-4xl leading-snug">FAQ - Frequently Asked Questions</h1>
    <p>Get answers to all questions about our Vacation Rental Software.</p>
    <div class="flex text-center md:text-base w-full md:w-auto flex-col md:flex-row items-center justify-center gap-4 md:gap-6 font-bold">
        <a class="nav-link text-5xl md:text-xl w-full whitespace-nowrap hover:bg-light-white hover:text-gray ring-2 ring-light-white rounded-md transition-all ease-in px-8 py-4" href="/login">Login</a>
        Or
        <a class="nav-link text-5xl md:text-xl w-full whitespace-nowrap bg-light-white text-gray rounded-md px-8 py-4 hover:text-light-white hover:bg-blue transition-all ease-in" href="/register">Get started</a>
    </div>
</main>
<div class="flex bg-light-white flex-col justify-center gap-10 items-center px-10 md:px-40 py-20 text-gray">
    <div class="flex flex-col bg-light-gray justify-center items-start gap-5 w-full px-5 md:px-10 py-5 rounded-2xl">
        <div class="flex w-full justify-between items-center">
            <h2 class="font-bold">How do I create a listing for my property?</h2>
            <button on:click={() => show[0] = !show[0]}>
                {#if show[0]}
                    <img class="w-9 md:w-7" src="icons/button_dropdown (1).svg" alt="Dropdown Icon">
                    {:else}
                    <img class="w-9 md:w-7" src="icons/button_dropdown.svg" alt="Dropdown Icon">
                {/if}
            </button>
        </div>
        {#if show[0]}
            <p transition:fade >To create a listing, simply sign up for an account on our platform and navigate to the "Listings" section. Click on "Add New Listing" and provide all the necessary details about your property, including location, amenities, photos, and availability.</p>
        {/if}
    </div>
    <div class="flex flex-col bg-light-gray justify-center items-start gap-5 w-full px-5 md:px-10 py-5 rounded-2xl">
        <div class="flex w-full justify-between items-center">
            <h2 class="font-bold">How can I manage the availability and pricing of my property?</h2>
            <button on:click={() => show[1] = !show[1]}>
                {#if show[1]}
                    <img class="w-9 md:w-7" src="icons/button_dropdown (1).svg" alt="Dropdown Icon">
                {:else}
                    <img class="w-9 md:w-7" src="icons/button_dropdown.svg" alt="Dropdown Icon">
                {/if}
            </button>
        </div>
        {#if show[1]}
            <p transition:fade >Our software provides an intuitive calendar interface where you can easily manage the availability of your property. You can set specific dates as available, block out dates when the property is not available, and adjust pricing based on different seasons or events.</p>
        {/if}
    </div>
    <div class="flex flex-col bg-light-gray justify-center items-start gap-5 w-full px-5 md:px-10 py-5 rounded-2xl">
        <div class="flex w-full justify-between items-center">
            <h2 class="font-bold">How do I sign up and create an account?</h2>
            <button on:click={() => show[2] = !show[2]}>
                {#if show[2]}
                    <img class="w-9 md:w-7" src="icons/button_dropdown (1).svg" alt="Dropdown Icon">
                {:else}
                    <img class="w-9 md:w-7" src="icons/button_dropdown.svg" alt="Dropdown Icon">
                {/if}
            </button>
        </div>
        {#if show[2]}
            <p transition:fade >To create an account, click on the "Get Started" button on our homepage. Fill out the required information, such as your name, email address, and password. Once completed, you'll have access to all the features and functionalities of our platform.</p>
        {/if}
    </div>
    <div class="flex flex-col bg-light-gray justify-center items-start gap-5 w-full px-5 md:px-10 py-5 rounded-2xl">
        <div class="flex w-full justify-between items-center">
            <h2 class="font-bold">What happens if there is a double booking?</h2>
            <button on:click={() => show[3] = !show[3]}>
                {#if show[3]}
                    <img class="w-9 md:w-7" src="icons/button_dropdown (1).svg" alt="Dropdown Icon">
                {:else}
                    <img class="w-9 md:w-7" src="icons/button_dropdown.svg" alt="Dropdown Icon">
                {/if}
            </button>
        </div>
        {#if show[3]}
            <p transition:fade >We have measures in place to prevent double bookings. In the rare event that a double booking occurs, our customer support team will work with both parties to find a suitable solution, which may include finding an alternative property or providing a full refund.</p>
        {/if}
    </div>
    <div class="flex flex-col bg-light-gray justify-center items-start gap-5 w-full px-5 md:px-10 py-5 rounded-2xl">
        <div class="flex w-full justify-between items-center">
            <h2 class="font-bold">How can I contact customer support for assistance?</h2>
            <button on:click={() => show[4] = !show[4]}>
                {#if show[4]}
                    <img class="w-9 md:w-7" src="icons/button_dropdown (1).svg" alt="Dropdown Icon">
                {:else}
                    <img class="w-9 md:w-7" src="icons/button_dropdown.svg" alt="Dropdown Icon">
                {/if}
            </button>
        </div>
        {#if show[4]}
            <p transition:fade >Our customer support team is available to assist you. You can reach us by clicking on the "Contact us" link on our website, where you'll find options to submit a support ticket or you can email us directly.</p>
        {/if}
    </div>
</div>