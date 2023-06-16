<script>
    import { Splide, SplideSlide } from '@splidejs/svelte-splide';
    import '@splidejs/svelte-splide/css';
</script>
<main class="bg-gradient-to-r from-[#1E2E3C] to-[#055999] flex flex-col md:flex-row justify-center items-start gap-10 md:items-center px-10 md:px-0 text-light-white md:text-center py-10 md:py-24">
    <div class="flex flex-col justify-center items-start md:items-center gap-10 md:gap-20 max-w-2xl">
        <h1 class="font-bold text-2xl md:text-5xl leading-snug">Control and Manage your booking process of your rental properties</h1>
        <p>The best free to use Vacation Rental Software.</p>
        <div class="flex text-center md:text-base w-full md:w-auto flex-col md:flex-row items-center justify-center gap-4 md:gap-6 font-bold">
            <a class="nav-link text-5xl md:text-xl w-full whitespace-nowrap hover:bg-light-white hover:text-gray ring-2 ring-light-white rounded-md transition-all ease-in px-8 py-4" href="/login">Login</a>
            Or
            <a class="nav-link text-5xl md:text-xl w-full whitespace-nowrap bg-light-white text-gray rounded-md px-8 py-4 hover:text-light-white hover:bg-blue transition-all ease-in" href="/register">Get started</a>
        </div>
    </div>
    <div class="flex justify-center items-center">
        <img class="w-48 md:w-80" src="main.svg" alt="Main Image">
    </div>
</main>
<div class="bg-light-white flex flex-col gap-10 justify-center items-center py-10 md:py-18">
    <h1 class="font-bold text-2xl md:text-3xl text-center text-gray">Why Us?</h1>
    <div class="flex flex-col md:flex-row items-end justify-center md:max-w-7xl gap-16">
        <div class="bg-gray w-72 md:w-80 text-light-white rounded-xl flex flex-col justify-center items-center gap-8 py-10 px-5">
            <img src="fast.svg" alt="Fast Control">
            <h2 class="font-bold text-xl">Fast Control</h2>
            <p>You can control and manage your booking process fast and easy, we have fast servers that keep up the speed of the application.</p>
        </div>
        <div class="bg-blue w-72 md:w-80 text-light-white rounded-xl flex flex-col justify-center items-center gap-8 py-10 md:py-20 px-5">
            <img src="noMoney.svg" alt="Free to Use">
            <h2 class="font-bold text-xl">Free to Use</h2>
            <p>Our software is free to use,which means everyone can use it for free and you don’t have to pay anything to use our software. You don’t have any limitations or restrictions.</p>
        </div>
        <div class="bg-gray w-72 md:w-80 text-light-white rounded-xl flex flex-col justify-center items-center gap-8 py-10 px-5">
            <img src="technology.svg" alt="New Technology">
            <h2 class="font-bold text-xl">New Technology</h2>
            <p>Our software uses recently developed technology for everything you need to control and manage your booking process of your rental properties.</p>
        </div>
    </div>
</div>
<div class="hidden bg-gradient-to-r from-[#1574BC] to-[#0A537C] md:flex flex-col gap-10 justify-center items-center py-10 md:py-18">
    <h1 class="font-bold text-2xl md:text-3xl text-center text-light-white">What do others think?</h1>
    <div class="flex flex-col md:flex-row items-start justify-center md:max-w-7xl gap-16">
        <div class="w-64 md:w-80 text-light-white rounded-xl flex flex-col justify-center items-start gap-6 py-10 px-5">
            <div class="flex justify-center items-center gap-5">
                <img src="avatar-gen114c624edd85c6ff8abc59e6eb214202 1.png" alt="Avatar">
                <h2 class="text-xl">Rohan Powers</h2>
            </div>
            <p>“ I have recently started using this software and I’m incredibly happy with it. This software has truly helped me streamline the entire process of managing and controlling the booking of my rental properties. There are some things
                that can be better but in the end
                it is a very good software “</p>
            <div class="flex flex-col justify-center items-start text-yellow gap-1 w-full">
                <p class="text-xl">4/5</p>
                <div class="ring-2 ring-light-white w-full">
                    <div class="bg-yellow py-2 w-4/5"></div>
                </div>
            </div>
        </div>
        <div class="w-64 md:w-80 text-light-white rounded-xl flex flex-col justify-center items-start gap-6 py-10 px-5">
            <div class="flex justify-center items-center gap-5">
                <img src="avatar-gen95dbabb02bcc07f0592b52fc7c119830 1.png" alt="Avatar">
                <h2 class="text-xl">Pippa Abbott</h2>
            </div>
            <p>“ The customer interface is so excellent, allowing for a frictionless booking process for potential customers. The reporting features that come with this software also make it incredibly easy to track my rental properties data, occupancy, performance and most importantly revenue. “</p>
            <div class="flex flex-col justify-center items-start text-yellow gap-1 w-full">
                <p class="text-xl">5/5</p>
                <div class="ring-2 ring-light-white w-full">
                    <div class="bg-yellow py-2 w-5/5"></div>
                </div>
            </div>
        </div>
        <div class="w-64 md:w-80 text-light-white rounded-xl flex flex-col justify-center items-start gap-6 py-10 px-5">
            <div class="flex justify-center items-center gap-5">
                <img src="avatar-gen1e7a6d99c4c66f6b15f62c2371d10174 1.png" alt="Avatar">
                <h2 class="text-xl">Blake Nelson</h2>
            </div>
            <p>“ This software has definitely made my life as a rental property manager a lot easier and I would highly recommend it to anyone looking to manage their own rental properties. Everything is fast and smooth, it can’t be better.“</p>
            <div class="flex flex-col justify-center items-start text-yellow gap-1 w-full pt-12">
                <p class="text-xl">5/5</p>
                <div class="ring-2 ring-light-white w-full">
                    <div class="bg-yellow py-2 w-5/5"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="md:hidden bg-gradient-to-r from-[#1574BC] px-10 to-[#0A537C] py-10 md:py-18">
    <h1 class="font-bold text-2xl md:text-3xl text-center text-light-white">What do others think?</h1>
    <Splide options={{arrows: false}}>
        <SplideSlide  class="w-64 md:w-80 text-light-white rounded-xl flex flex-col justify-center items-start gap-6 py-10 px-5">
            <div class="flex justify-center items-center gap-5">
                <img src="avatar-gen114c624edd85c6ff8abc59e6eb214202 1.png" alt="Avatar">
                <h2 class="text-xl">Rohan Powers</h2>
            </div>
            <p>“ I have recently started using this software and I’m incredibly happy with it. This software has truly helped me streamline the entire process of managing and controlling the booking of my rental properties. There are some things
                that can be better but in the end
                it is a very good software “</p>
            <div class="flex flex-col justify-center items-start text-yellow gap-1 w-full">
                <p class="text-xl">4/5</p>
                <div class="ring-2 ring-light-white w-full">
                    <div class="bg-yellow py-2 w-4/5"></div>
                </div>
            </div>
        </SplideSlide>
        <SplideSlide class="w-64 md:w-80 text-light-white rounded-xl flex flex-col justify-center items-start gap-6 py-10 px-5">
            <div class="flex justify-center items-center gap-5">
                <img src="avatar-gen95dbabb02bcc07f0592b52fc7c119830 1.png" alt="Avatar">
                <h2 class="text-xl">Pippa Abbott</h2>
            </div>
            <p>“ The customer interface is so excellent, allowing for a frictionless booking process for potential customers. The reporting features that come with this software also make it incredibly easy to track my rental properties data, occupancy, performance and most importantly revenue. “</p>
            <div class="flex flex-col justify-center items-start text-yellow gap-1 w-full">
                <p class="text-xl">5/5</p>
                <div class="ring-2 ring-light-white w-full">
                    <div class="bg-yellow py-2 w-5/5"></div>
                </div>
            </div>
        </SplideSlide>
        <SplideSlide class="w-64 md:w-80 text-light-white rounded-xl flex flex-col justify-center items-start gap-6 py-10 px-5">
            <div class="flex justify-center items-center gap-5">
                <img src="avatar-gen1e7a6d99c4c66f6b15f62c2371d10174 1.png" alt="Avatar">
                <h2 class="text-xl">Blake Nelson</h2>
            </div>
            <p>“ This software has definitely made my life as a rental property manager a lot easier and I would highly recommend it to anyone looking to manage their own rental properties. Everything is fast and smooth, it can’t be better.“</p>
            <div class="flex flex-col justify-center items-start text-yellow gap-1 w-full pt-12">
                <p class="text-xl">5/5</p>
                <div class="ring-2 ring-light-white w-full">
                    <div class="bg-yellow py-2 w-5/5"></div>
                </div>
            </div>
        </SplideSlide>
    </Splide>
</div>