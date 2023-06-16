<script>
    export let bookings = [];
    export let selectedDateRange = null;

    let currentDate = new Date();
    let selectedStartDate = null;
    let selectedEndDate = null;
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let selectionLocked = false;

    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    function getDaysInMonth(year, month) {
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];

        // Calculate the offset to align the first day of the month
        const offset = (firstDayOfMonth + 6) % 7;

        // Add empty placeholders for days before the first day of the month
        for (let i = 0; i < offset; i++) {
            days.push(null);
        }

        // Add the days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    }

    let daysInMonth = getDaysInMonth(currentYear, currentMonth);

    function selectStartDate(date) {
        if (selectionLocked) {
            return;
        }

        if (selectedStartDate === date) {
            selectedStartDate = null;
            selectedEndDate = null;
        } else {
            selectedStartDate = date;
            selectedEndDate = null;
        }
    }

    function isDatePastToday(date) {
        return date < currentDate;
    }

    function isDateAvailable(date) {
        return !isDateBooked(date) && !isDatePastToday(date);
    }

    function selectEndDate(date) {
        if (selectionLocked || !selectedStartDate || date < selectedStartDate) {
            return;
        }

        selectedEndDate = date;
        selectionLocked = true;
    }

    function isDateBooked(date) {
        return bookings.some((booking) => {
            const bookingStartDate = new Date(booking.start);
            const bookingEndDate = new Date(booking.end);
            return date >= bookingStartDate && date <= bookingEndDate;
        });
    }

    function prevMonth() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        daysInMonth = getDaysInMonth(currentYear, currentMonth);
    }

    function nextMonth() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        daysInMonth = getDaysInMonth(currentYear, currentMonth);
    }

    $: {
        if (selectedStartDate && selectedEndDate) {
            selectedDateRange = {
                start: selectedStartDate,
                end: selectedEndDate,
            };
        } else {
            selectedDateRange = null;
        }
    }

    function saveSelection() {
        selectedDateRange = {
            start: selectedStartDate,
            end: selectedEndDate,
        };
    }
</script>

<div class="w-full calendar">
    <div class="font-bold text-2xl py-4 bg-blue text-light-white text-center mb-2 flex justify-between px-4 items-center">
        <button class="cursor-pointer bg-light-white text-blue rounded-full p-2 flex" on:click={prevMonth}>&lt;</button>
        {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
            new Date(currentYear, currentMonth)
        )}
        <button class="cursor-pointer bg-light-white text-blue rounded-full p-2 flex" on:click={nextMonth}>&gt;</button>
    </div>
    <div class="flex justify-between bg-gray text-light-white px-8 font-bold text-xl">
        {#each daysOfWeek as day}
            <div class="w-10 text-center">{day}</div>
        {/each}
    </div>
    <div class="grid-cols-7 grid mt-2 gap-2 text-light-white font-bold text-xl">
        {#each daysInMonth as date}
            {#if date === null}
                <div class="invisible"></div>
            {:else}
                <div
                        class="w-full h-16 flex items-center justify-center cursor-pointer
      {isDateAvailable(date) ? 'bg-yellow' : ''}
      {isDateBooked(date) ? 'bg-dark-blue' : ''}
      {date >= selectedStartDate && date <= selectedEndDate ? 'bg-blue' : ''}
      {isDatePastToday(date) ? 'bg-gray line-through cursor-not-allowed' : ''}
      {date >= selectedStartDate && date <= selectedEndDate && !isDateAvailable(date) ? 'bg-gray' : ''}"
                        style="background-color: {date >= selectedStartDate && date <= selectedEndDate ? '#002B4D' : ''};
        {isDateBooked(date) ? 'background-color: #055999 !important;' : ''}"
                        on:click={() => {
        if (isDatePastToday(date) || isDateBooked(date)) {
          return;
        }
        if (selectedStartDate && !selectedEndDate) {
          selectEndDate(date);
          saveSelection();
        } else {
          selectStartDate(date);
          selectedEndDate = null;
          selectionLocked = false;
        }
      }}
                >
                    {date.getDate()}
                </div>
            {/if}
        {/each}
    </div>
</div>
