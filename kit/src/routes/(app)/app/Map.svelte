<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import axios from "axios";
    import { location } from "../../../stores.js";
    import {fly} from "svelte/transition";

    let mapElement
    let map
    let marker

    onMount(async () => {
        if(browser) {
            const leaflet = await import('leaflet');

            let markerIcon = leaflet.icon({
                iconUrl: '../icons/mapIcon.svg',
                iconSize: [25, 31],
            });

            map = leaflet.map(mapElement).setView([45.230414929592946, 13.932037353515627], 8);

            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            map.on('click', async (e) => {
                const { lat, lng } = e.latlng;
                if (marker){
                    marker.remove()
                }
                marker = leaflet.marker([lat, lng], { icon: markerIcon }).addTo(map).bindPopup('<h2>Your Rental</h2>').openPopup();
                const res = await axios.get(`https://eu1.locationiq.com/v1/reverse?key=pk.b0684d8772104fb506272ca8dda4596c&lat=${lat}&lon=${lng}&format=json`)
                location.set(res.data.display_name)
            });

        }
    });

    onDestroy(async () => {
        if(map) {
            map.remove();
        }
    });
</script>


<div in:fly="{{ y: -200, duration: 250 }}" out:fly="{{ y: -200, duration: 250 }}" class="h-72 w-full" bind:this={mapElement}></div>

<style>
    @import 'leaflet/dist/leaflet.css';
</style>