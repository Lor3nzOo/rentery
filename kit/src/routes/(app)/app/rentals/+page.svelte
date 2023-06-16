<script>
    import {page} from "$app/stores";
    import {ArrowLeftCircle, ArrowRightCircle, Icon} from "svelte-hero-icons";

    let rentals = $page.data.rentals

    let currentPage = 0;
    const itemsPerPage = 6;
    let displayedRentals
    let startIndex
    let endIndex

    $: {
        startIndex = currentPage * itemsPerPage;
        endIndex = startIndex + itemsPerPage;
        displayedRentals = rentals.slice(startIndex, endIndex);
    }

    function convertToSlug(Text, route) {
        return `/app/${route}/` + Text.toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }
</script>
<main class="flex flex-col md:flex-row justify-center items-start gap-10 md:items-center px-10 md:px-0 text-gray md:text-center py-10 md:py-24">
    <div class="flex flex-col justify-center items-start md:items-center gap-10">
        <h1 class="font-bold text-2xl md:text-4xl leading-snug">My Rentals</h1>
        <div class="grid gap-10 grid-cols-3">
            {#each displayedRentals as { id, area, beds, description, guests, location, name, night, rooms, images }}
                <div class="flex flex-col bg-light-gray justify-center items-center rounded-md">
                    <img height="240" class="w-full rounded-t-md" style="max-height: 240px" src={`http://localhost:3000/uploads/${images[0]}-resized.jpg`} alt="Property Image">
                    <div class="flex p-6 flex-col justify-center items-start gap-6">
                        <div class="flex justify-center items-center gap-10">
                            <h2 class="text-gray font-bold">{name}</h2>
                            <span class="flex justify-center items-center gap-2">
                                <img src="../icons/Star 1.svg" alt="Star">
                                <img src="../icons/Star 1.svg" alt="Star">
                                <img src="../icons/Star 1.svg" alt="Star">
                                <img src="../icons/Star 1.svg" alt="Star">
                                <img src="../icons/Star 1.svg" alt="Star">
                            </span>
                        </div>
                        <div style="max-width: 300px" class="flex justify-center text-blue gap-2 items-center">
                            <img src="../icons/Vector (1).svg" alt="Location Icon">
                            <a target="_blank" href={`http://maps.google.com/?q=${location}`} class="overflow-x-clip whitespace-nowrap underline">{location}</a>
                        </div>
                        <div class="flex justify-between items-center w-full">
                            <div class="flex items-start justify-center flex-col gap-2">
                                <p>Beds</p>
                                <div class="flex items-center gap-2 font-bold justify-center">
                                    <img src="../icons/Vector (2).svg" alt="#">
                                    <p>{beds}</p>
                                </div>
                            </div>
                            <div class="flex items-start justify-center flex-col gap-2">
                                <p>Guests</p>
                                <div class="flex items-center gap-2 font-bold justify-center">
                                    <img src="../icons/guests.svg" alt="#">
                                    <p>{guests}</p>
                                </div>
                            </div>
                            <div class="flex items-start justify-center flex-col gap-2">
                                <p>Area m<sup>2</sup></p>
                                <div class="flex items-center gap-2 font-bold justify-center">
                                    <img src="../icons/Rectangle 89.svg" alt="#">
                                    <p>{area}</p>
                                </div>
                            </div>
                        </div>
                        <p class="font-bold">From {night}$ Per Night</p>
                        <div class="flex justify-center items-center gap-5">
                            <a href={convertToSlug(id, 'edit')} class="bg-blue rounded-md py-3 px-10 text-light-white w-full hover:bg-gray hover:text-light-white transition-all">Edit</a>
                            <a href={convertToSlug(id, 'preview')} class="bg-light-white rounded-md py-3 px-10 text-blue w-full hover:bg-blue hover:text-light-white transition-all">Preview</a>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        <div class="flex justify-center gap-2 items-center w-full">
            {#if rentals.length > 0}
                <button on:click={() => currentPage--} disabled={currentPage === 0} class="cursor-pointer">
                    <Icon class="w-10 h-10 text-blue hover:bg-blue hover:text-light-white transition-all rounded-full" src={ArrowLeftCircle} />
                </button>
                <div class="flex justify-center items-center gap-4">
                    {#each Array.from({ length: Math.ceil(rentals.length / itemsPerPage) }) as _, i}
                        <button class="ring-2 ring-blue rounded-full w-7 h-7 hover:bg-blue hover:text-light-white transition-all" on:click={() => currentPage = i} class:selected={i === currentPage}>
                            {i + 1}
                        </button>
                    {/each}
                </div>
                <button on:click={() => currentPage++} disabled={endIndex >= rentals.length} class="cursor-pointer">
                    <Icon class="w-10 h-10 text-blue hover:bg-blue hover:text-light-white transition-all rounded-full" src={ArrowRightCircle} />
                </button>
                {:else }
                <h2>No rentals</h2>
            {/if}
        </div>
        <a class="bg-blue flex justify-center items-center rounded-md py-3 px-10 text-light-white w-full hover:ring-2 hover:ring-blue hover:bg-light-white hover:text-gray transition-all" href="/app/new"><span class="font-bold mr-1 text-xl">+</span>Add new property</a>
    </div>
</main>