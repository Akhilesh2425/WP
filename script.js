document.addEventListener("DOMContentLoaded", function() {
    const monthYear = document.getElementById("monthYear");
    const datesContainer = document.getElementById("dates");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    
    const modal = document.getElementById("eventModal");
    const closeModal = document.querySelector(".close");
    const selectedDateText = document.getElementById("selectedDate");
    const eventInput = document.getElementById("eventInput");
    const saveEventBtn = document.getElementById("saveEvent");

    let currentDate = new Date();
    let events = {};

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        monthYear.textContent = new Date(year, month).toLocaleDateString("en-US", { month: "long", year: "numeric" });
        
        datesContainer.innerHTML = "";
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Create empty cells for alignment
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.classList.add("empty");
            datesContainer.appendChild(emptyCell);
        }

        // Create day cells
        for (let day = 1; day <= daysInMonth; day++) {
            const dateCell = document.createElement("div");
            dateCell.classList.add("date");
            dateCell.textContent = day;
            
            const dateKey = `${year}-${month + 1}-${day}`;
            if (events[dateKey]) {
                dateCell.style.backgroundColor = "#ffd700";
            }

            dateCell.addEventListener("click", function() {
                selectedDateText.textContent = `Selected Date: ${dateKey}`;
                eventInput.value = events[dateKey] || "";
                modal.style.display = "block";

                saveEventBtn.onclick = function() {
                    const eventText = eventInput.value.trim();
                    if (eventText) {
                        events[dateKey] = eventText;
                        dateCell.style.backgroundColor = "#ffd700";
                    } else {
                        delete events[dateKey];
                        dateCell.style.backgroundColor = "";
                    }
                    modal.style.display = "none";
                };
            });

            datesContainer.appendChild(dateCell);
        }
    }

    prevMonthBtn.addEventListener("click", function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener("click", function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Close modal when clicking on close button
    closeModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Close modal when clicking outside it
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    renderCalendar();
});
