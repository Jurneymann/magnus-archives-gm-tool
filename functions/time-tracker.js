// =========================
// TIME TRACKER SYSTEM
// =========================

// Game time object
let gameTime = {
  year: 1996,
  month: 1,
  day: 1,
  hour: 12,
  minute: 0,
};

// Month names for display
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Days in each month
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Check if a year is a leap year
 */
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Get the number of days in a month
 */
function getDaysInMonth(month, year) {
  if (month === 2 && isLeapYear(year)) {
    return 29;
  }
  return daysInMonth[month - 1];
}

/**
 * Load game time from localStorage
 */
function loadGameTime() {
  const saved = localStorage.getItem("magnusArchivesGameTime");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      gameTime = {
        year: parsed.year || 1996,
        month: parsed.month || 1,
        day: parsed.day || 1,
        hour: parsed.hour || 12,
        minute: parsed.minute || 0,
      };
    } catch (e) {
      console.error("Failed to parse saved game time:", e);
    }
  }
  renderGameTime();
  updateTimeInputs();
}

/**
 * Save game time to localStorage
 */
function saveGameTime() {
  localStorage.setItem("magnusArchivesGameTime", JSON.stringify(gameTime));
}

/**
 * Render the game time display
 */
function renderGameTime() {
  const dateEl = document.getElementById("gameDate");
  const timeEl = document.getElementById("gameTime");

  if (dateEl) {
    const monthName = monthNames[gameTime.month - 1];
    dateEl.textContent = `${monthName} ${gameTime.day}, ${gameTime.year}`;
  }

  if (timeEl) {
    const hours = String(gameTime.hour).padStart(2, "0");
    const minutes = String(gameTime.minute).padStart(2, "0");
    timeEl.textContent = `${hours}:${minutes}`;
  }
}

/**
 * Update the input fields in the modal
 */
function updateTimeInputs() {
  const yearInput = document.getElementById("timeYear");
  const monthInput = document.getElementById("timeMonth");
  const dayInput = document.getElementById("timeDay");
  const hourInput = document.getElementById("timeHour");
  const minuteInput = document.getElementById("timeMinute");

  if (yearInput) yearInput.value = gameTime.year;
  if (monthInput) monthInput.value = gameTime.month;
  if (dayInput) dayInput.value = gameTime.day;
  if (hourInput) hourInput.value = gameTime.hour;
  if (minuteInput) minuteInput.value = gameTime.minute;
}

/**
 * Toggle the time tracker modal
 */
function toggleTimeTracker() {
  const modal = document.getElementById("timeTrackerModal");
  if (modal) {
    if (modal.style.display === "none") {
      modal.style.display = "flex";
      updateTimeInputs();
    } else {
      modal.style.display = "none";
    }
  }
}

/**
 * Update game time from the input fields
 */
function updateGameTime() {
  const yearInput = document.getElementById("timeYear");
  const monthInput = document.getElementById("timeMonth");
  const dayInput = document.getElementById("timeDay");
  const hourInput = document.getElementById("timeHour");
  const minuteInput = document.getElementById("timeMinute");

  if (yearInput) gameTime.year = parseInt(yearInput.value) || 1996;
  if (monthInput) {
    gameTime.month = Math.max(1, Math.min(12, parseInt(monthInput.value) || 1));
  }
  if (dayInput) {
    const maxDays = getDaysInMonth(gameTime.month, gameTime.year);
    gameTime.day = Math.max(
      1,
      Math.min(maxDays, parseInt(dayInput.value) || 1)
    );
  }
  if (hourInput) {
    gameTime.hour = Math.max(0, Math.min(23, parseInt(hourInput.value) || 0));
  }
  if (minuteInput) {
    gameTime.minute = Math.max(
      0,
      Math.min(59, parseInt(minuteInput.value) || 0)
    );
  }

  // Update the max day value if month/year changed
  if (dayInput) {
    const maxDays = getDaysInMonth(gameTime.month, gameTime.year);
    dayInput.max = maxDays;
    if (gameTime.day > maxDays) {
      gameTime.day = maxDays;
      dayInput.value = maxDays;
    }
  }

  saveGameTime();
  renderGameTime();
}

/**
 * Advance game time by a number of minutes
 */
function advanceTime(minutes) {
  gameTime.minute += minutes;

  // Handle minute overflow
  while (gameTime.minute >= 60) {
    gameTime.minute -= 60;
    gameTime.hour++;
  }

  // Handle hour overflow
  while (gameTime.hour >= 24) {
    gameTime.hour -= 24;
    gameTime.day++;
  }

  // Handle day overflow
  let maxDays = getDaysInMonth(gameTime.month, gameTime.year);
  while (gameTime.day > maxDays) {
    gameTime.day -= maxDays;
    gameTime.month++;

    // Handle month overflow
    if (gameTime.month > 12) {
      gameTime.month = 1;
      gameTime.year++;
    }

    maxDays = getDaysInMonth(gameTime.month, gameTime.year);
  }

  saveGameTime();
  renderGameTime();
  updateTimeInputs();
}

// Initialize time tracker on page load
document.addEventListener("DOMContentLoaded", () => {
  loadGameTime();
});
