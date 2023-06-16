<script>
    import {page} from "$app/stores";
    import { Splide, SplideSlide } from '@splidejs/svelte-splide';
    import '@splidejs/svelte-splide/css';
    import {Icon, Check} from "svelte-hero-icons";
    import Calendar from "../../Calendar.svelte";

    let bookings = [
        {
            start: new Date(2023, 5, 3),
            end: new Date(2023, 5, 10)
        }
    ];

    let {images, name, description, location, night, beds, rooms, guests, area, air, smoke, pets, customData} = $page.data.rental

    const getLink = (img) => {
        return `http://localhost:3000/uploads/${img}`
    }

    const boolToText = (bool) => {
        if (bool === true) {
            return "Yes"
        } else {
            return "No"
        }
    }
</script>

<main class="flex flex-col md:flex-row justify-center items-start gap-10 md:items-center px-10 md:px-0 text-gray md:text-center py-10 md:py-24">
    <div class="flex w-full mx-32 flex-col items-start justify-center p-10 bg-light-gray rounded-md gap-5">
        <div class="flex justify-center items-center gap-10">
            <h2 class="text-gray text-2xl font-bold">{name}</h2>
            <span class="flex justify-center items-center gap-2">
                <img src="../../icons/Star 1.svg" alt="Star">
                <img src="../../icons/Star 1.svg" alt="Star">
                <img src="../../icons/Star 1.svg" alt="Star">
                <img src="../../icons/Star 1.svg" alt="Star">
                <img src="../../icons/Star 1.svg" alt="Star">
            </span>
        </div>
        <div class="flex w-full justify-between items-center">
            <div style="max-width: 300px" class="flex justify-center text-blue gap-2 items-center">
                <img src="../../icons/Vector (1).svg" alt="Location Icon">
                <a target="_blank" href={`http://maps.google.com/?q=${location}`} class="overflow-x-clip whitespace-nowrap underline">{location}</a>
            </div>
            <h2 class="text-blue text-2xl font-bold">From {night}$ per night</h2>
        </div>
        <Splide>
            {#each images as image}
                <SplideSlide  class="w-64 md:w-80 text-light-white rounded-xl flex flex-col justify-center items-start gap-6 py-10 px-5">
                    <img height="513" class="rounded-md" src={getLink(image)} alt="Rental Image">
                </SplideSlide>
            {/each}
        </Splide>
        <button class="bg-blue rounded-md py-3 px-10 text-light-white w-full hover:ring-2 hover:ring-blue hover:bg-light-white hover:text-gray transition-all">Book Now</button>
        <div class="flex items-center justify-center gap-14 pt-8">
            <div class="flex flex-col justify-center items-start">
                <p>Beds</p>
                <div class="flex justify-center items-center gap-2">
                    <img draggable="false" class="text-blue" src="../../icons/Vector (2).svg" alt="#">
                    <p class="font-bold">{beds}</p>
                </div>
            </div>
            <div class="flex flex-col justify-center items-start">
                <p>Guests</p>
                <div class="flex justify-center items-center gap-2">
                    <img draggable="false" src="../../icons/guests.svg" alt="#">
                    <p class="font-bold">{guests}</p>
                </div>
            </div>
            <div class="flex flex-col justify-center items-start">
                <p>Area m<sup>2</sup></p>
                <div class="flex justify-center items-center gap-2">
                    <img draggable="false" src="../../icons/Rectangle 89.svg" alt="#">
                    <p class="font-bold">{area}</p>
                </div>
            </div>
            <div class="flex flex-col justify-center items-start">
                <p>Pets Allowed</p>
                <div class="flex justify-center items-center gap-2">
                    <img draggable="false" src="../../icons/pet.svg" alt="#">
                    <p class="font-bold">{boolToText(pets)}</p>
                </div>
            </div>
            <div class="flex flex-col justify-center items-start">
                <p>Air Conditioning</p>
                <div class="flex justify-center items-center gap-2">
                    <img draggable="false" src="../../icons/air.svg" alt="#">
                    <p class="font-bold">{boolToText(air)}</p>
                </div>
            </div>
            <div class="flex flex-col justify-center items-start">
                <p>Smoking allowed</p>
                <div class="flex justify-center items-center gap-2">
                    <img draggable="false" src="../../icons/smoke.svg" alt="#">
                    <p class="font-bold">{boolToText(smoke)}</p>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-center gap-5 pt-5">
            {#each customData as data}
                <div class="flex justify-center gap-2">
                    <Icon class="w-7 h-7 top-1.5 text-blue" src="{Check}" />
                    {data}
                </div>
            {/each}
        </div>
        <div class="flex flex-col items-start justify-center gap-5 pt-5">
            <h2 class="text-blue text-xl font-bold">Description</h2>
            <p>{description}</p>
        </div>
        <div class="flex w-full flex-col items-start justify-center gap-5 pt-5">
            <h2 class="text-blue text-xl font-bold">Availability Calendar</h2>
            <Calendar {bookings} />
        </div>
    </div>
</main>