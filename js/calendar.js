// Back button
document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "dashboard.html";
});

const calendar = document.getElementById("calendar");
const monthYearEl = document.getElementById("monthYear");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let currentDate = new Date();
let selectedDayEl = null;

// Calendar habit data (date-based)
let calendarData =
  JSON.parse(localStorage.getItem("calendarHabits")) || {};

// Render calendar
function renderCalendar() {
  calendar.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYearEl.textContent = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("calendar-day");
    dayDiv.textContent = day;

    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    // Today
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayDiv.classList.add("today");
    }

    // Completed habit day
    if (calendarData[dateStr]) {
      dayDiv.classList.add("completed");
    }

    dayDiv.addEventListener("click", () => {
      if (selectedDayEl) selectedDayEl.classList.remove("selected");

      dayDiv.classList.add("selected");
      selectedDayEl = dayDiv;

      calendarData[dateStr] = !calendarData[dateStr];
      localStorage.setItem("calendarHabits", JSON.stringify(calendarData));

      renderCalendar();
    });

    calendar.appendChild(dayDiv);
  }
}

// Navigation
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Initial load
renderCalendar();