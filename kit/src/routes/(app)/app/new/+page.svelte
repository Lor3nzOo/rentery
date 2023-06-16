<script>
    import {MapPin, Icon, Check, PlusCircle, XCircle} from "svelte-hero-icons";
    import Map from "../Map.svelte";
    import {location} from "../../../../stores.js";
    import {field, form} from "svelte-forms";
    import {required, min} from "svelte-forms/validators";
    import axios from "axios";

    let loc
    location.subscribe(v => loc = v)

    let showMap = false
    let showBox = false
    let customData = []
    let customText = ""

    const name = field('name', '', [required()]);
    const description = field('description', '', [required()]);
    const price = field('price', '', [required(), min(1)]);
    const beds = field('beds', '', [required(), min(1)])
    const rooms = field('rooms', '', [required(), min(1)])
    const guests = field('guests', '', [required(), min(1)])
    const area = field('area', '', [required(), min(1)])
    const air = field('air', false, [required()])
    const smoke = field('smoke', false, [required()])
    const pets = field('pets', false, [required()])
    const rentalForm = form(name, description, price, beds, rooms, guests, area, air, smoke, pets);

    let file
    let images
    let fileNames = []
    let mainImage

    const addRental = async () => {
        let rental = rentalForm.summary()
        rental.location = loc
        rental.customData = customData

        const formData = new FormData()
        for (let i = 0; i < images.length; i++) {
            formData.append(`file${i}`, images[i], images[i].name)
        }
        formData.append('name', $name.value)
        formData.append('description', $description.value)
        formData.append('price', $price.value)
        formData.append('beds', $beds.value)
        formData.append('rooms', $rooms.value)
        formData.append('guests', $guests.value)
        formData.append('area', $area.value)
        formData.append('air', $air.value)
        formData.append('smoke', $smoke.value)
        formData.append('pets', $pets.value)
        formData.append('location', loc)
        formData.append('customData', customData.toString())

        try {
            const res = await axios.post("http://localhost:3000/rental/new", formData, { withCredentials: true, 'Content-Type': `multipart/form-data; boundary=${formData._boundary}` })
            alert("Rental created successfully!")
        } catch (e) {
            alert(e.response.data.message)
        }
        loc = ""
        customData = []
    }

    const onFileSelected = async (e) =>{
        let image = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            mainImage = e.target.result
        };
        for(let i = 0; i < e.target.files.length; i++) {
            fileNames = [...fileNames, e.target.files[i].name]
        }
        images = e.target.files;
    }
</script>

<main class="flex flex-col md:flex-row justify-center items-start gap-10 md:items-center px-10 md:px-0 text-gray md:text-center py-10 md:pt-24 md:pb-5">
    <div class="flex flex-col justify-center items-start md:items-center gap-10">
        <h1 class="font-bold text-2xl md:text-4xl leading-snug">Add new rental</h1>
        <div class="flex justify-center items-start gap-20">
            <div class="flex flex-col gap-5 justify-center items-start">
                <div class:gap-0={fileNames.length > 0} class="flex justify-center px-5 items-center ring-2 ring-gray rounded-md p-2">
                    <p class="w-80 text-left">
                        {#if fileNames.length > 0}
                            {fileNames}
                        {:else }
                            {"Images"}
                        {/if}
                    </p>
                    <input class="hidden" on:change={(e) => onFileSelected(e)} type="file" multiple accept=".jpg, .jpeg, .png" bind:this={file}>
                    <button on:click={() => file.click()} class="bg-blue flex justify-center items-center rounded-md py-3 px-5 text-light-white w-36 hover:ring-2 hover:ring-blue hover:bg-light-white hover:text-gray transition-all">Select files</button>
                </div>
                <input class="outline-0 w-full focus:ring-blue py-2 w-full p-5 rounded-md ring-2 ring-gray transition-all" type="text" placeholder="Name" bind:value={$name.value}>
                <textarea class="outline-0 w-full focus:ring-blue py-2 w-full px-5 rounded-md ring-2 ring-gray transition-all" placeholder="Description" rows="5" bind:value={$description.value}></textarea>
                <div on:click={() => showMap = !showMap} class="relative w-full">
                    <input disabled class="outline-0 cursor-pointer pr-10 w-full focus:ring-blue py-2 w-full px-5 rounded-md ring-2 ring-gray transition-all" type="text" value={loc} placeholder="Location">
                    <span >
                        <Icon class="absolute w-7 h-7 top-1.5 right-2 cursor-pointer" src="{MapPin}" />
                    </span>
                </div>
                {#if showMap}
                    <Map />
                {/if}
                <input class="outline-0 w-full focus:ring-blue py-2 w-full px-5 rounded-md ring-2 ring-gray transition-all" type="number" placeholder="Price per Night" bind:value={$price.value}>
                <div class="flex w-full justify-between items-center">
                    <input class="outline-0 w-24 focus:ring-blue py-2 px-5 rounded-md ring-2 ring-gray transition-all" type="number" placeholder="Beds" bind:value={$beds.value}>
                    <input class="outline-0 w-24 focus:ring-blue py-2 px-2 rounded-md ring-2 ring-gray transition-all" type="number" placeholder="Rooms" bind:value={$rooms.value}>
                    <input class="outline-0 w-24 focus:ring-blue py-2 px-2 rounded-md ring-2 ring-gray transition-all" type="number" placeholder="Guests" bind:value={$guests.value}>
                    <input class="outline-0 w-24 focus:ring-blue py-2 px-2 rounded-md ring-2 ring-gray transition-all" type="number" placeholder="Area" bind:value={$area.value}>
                </div>
                <div class="flex w-full justify-between items-center">
                    <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                        <input bind:checked={$air.value} class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-blue outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)]" type="checkbox" />
                        <label class="inline-block pl-[0.15rem]">Air conditioning</label>
                    </div>
                    <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                        <input bind:checked={$smoke.value} class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-blue outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)]" type="checkbox" />
                        <label class="inline-block pl-[0.15rem]">Smoking</label>
                    </div>
                    <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                        <input bind:checked={$pets.value} class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-blue outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)]" type="checkbox" />
                        <label class="inline-block pl-[0.15rem]">Pets allowed</label>
                    </div>
                </div>
                <button class="flex justify-center items-center">Add custom properties <img class="transition-all" class:rotate-90={showBox === true} on:click={() => showBox = !showBox} src="../icons/arrow_forward_FILL0_wght400_GRAD0_opsz48 1.svg" alt="#"></button>
                {#if showBox}
                    <div class="flex justify-center gap-5 items-center">
                        <Icon class="w-7 h-7 top-1.5 text-blue" src="{Check}" />
                        <input bind:value={customText} class="outline-0 w-24 focus:ring-blue py-2 px-5 rounded-md ring-2 ring-gray transition-all" type="text">
                        <span on:click={() => {
                            customData = [...customData, customText]
                            customText = ""
                        }}>
                            <Icon class="w-7 h-7 top-1.5 text-blue cursor-pointer" src="{PlusCircle}" />
                        </span>
                    </div>
                    {#each customData as data}
                        <div class="flex justify-center gap-5 items-center">
                            <Icon class="w-7 h-7 top-1.5 text-blue" src="{Check}" />
                            <p>{data}</p>
                            <span on:click={() => customData = customData.filter(x => x !== data)}>
                                <Icon class="w-7 h-7 top-1.5 text-blue cursor-pointer" src="{XCircle}" />
                            </span>
                        </div>
                    {/each}
                {/if}
                <button on:click={() => addRental()} class="bg-blue rounded-md py-3 px-10 text-light-white w-full hover:ring-2 hover:ring-blue hover:bg-light-white hover:text-gray transition-all">Add new rental</button>
            </div>
            <div class="flex flex-col items-center gap-10 justify-center">
                <h2 class="font-bold text-2xl leading-snug">Live preview</h2>
                <div class="flex flex-col bg-light-gray justify-center items-center rounded-md">
                    {#if mainImage}
                        <img height="240" class="w-full rounded-t-md" style="max-height: 240px" src={mainImage} alt="Property Image">
                    {/if}
                    <div class="flex p-6 flex-col justify-center items-start gap-6">
                        <div class="flex justify-center items-center gap-10">
                            <h2 class="text-gray font-bold">{$name.value}</h2>
                        </div>
                        <div style="max-width: 300px" class="flex justify-center text-blue gap-2 items-center">
                            <img src="../icons/Vector (1).svg" alt="Location Icon">
                            <a href='#' class="overflow-x-clip whitespace-nowrap underline">{loc}</a>
                        </div>
                        <div class="flex justify-between items-center w-full">
                            <div class="flex items-start justify-center flex-col gap-2">
                                <p>Beds</p>
                                <div class="flex items-center gap-2 font-bold justify-center">
                                    <img src="../icons/Vector (2).svg" alt="#">
                                    <p>{$beds.value}</p>
                                </div>
                            </div>
                            <div class="flex items-start justify-center flex-col gap-2">
                                <p>Guests</p>
                                <div class="flex items-center gap-2 font-bold justify-center">
                                    <img src="../icons/guests.svg" alt="#">
                                    <p>{$guests.value}</p>
                                </div>
                            </div>
                            <div class="flex items-start justify-center flex-col gap-2">
                                <p>Area m<sup>2</sup></p>
                                <div class="flex items-center gap-2 font-bold justify-center">
                                    <img src="../icons/Rectangle 89.svg" alt="#">
                                    <p>{$area.value}</p>
                                </div>
                            </div>
                        </div>
                        <p class="font-bold">From {$price.value}$ Per Night</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
