// Magnus Archives GM Tool - Dashboard Functions

// Function to switch tabs programmatically
function switchToTab(tabId) {
  // Handle backwards compatibility for old tab names
  const tabAliases = {
    combat: "encounters",
    party: "players",
    dashboard: "players",
    monsters: "bestiary",
    notes: "story-notes",
  };

  // Use alias if exists
  const actualTabId = tabAliases[tabId] || tabId;
  console.log(`Switching to tab: ${actualTabId}`);

  // Hide all tab contents
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
    content.style.display = "none";
  });

  // Remove active class from all buttons
  document.querySelectorAll(".tab-button").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected tab
  const targetTab = document.getElementById(actualTabId);
  if (targetTab) {
    targetTab.classList.add("active");
    targetTab.style.display = "block";
  }

  // Add active class to corresponding button
  const targetButton = document.querySelector(`[data-tab="${actualTabId}"]`);
  if (targetButton) {
    targetButton.classList.add("active");
  }
}

// Initialize session date to today
function initializeDashboard() {
  const dateInput = document.getElementById("sessionDate");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.value = today;
  }

  updatePartyStats();
  loadSessionNotes();
}

// Update party stats display
function updatePartyStats() {
  // Placeholder - will be implemented with party management
  const partySize = document.getElementById("partySize");
  const avgTier = document.getElementById("avgTier");
  const activePlayers = document.getElementById("activePlayers");

  if (partySize) partySize.textContent = "0";
  if (avgTier) avgTier.textContent = "1";
  if (activePlayers) activePlayers.textContent = "0";
}

// Roll log functionality
let rollHistory = [];

function addToRollLog(description, result) {
  const timestamp = new Date().toLocaleTimeString();
  rollHistory.unshift({ timestamp, description, result });

  // Keep only last 20 rolls
  if (rollHistory.length > 20) {
    rollHistory = rollHistory.slice(0, 20);
  }

  updateRollLogDisplay();
}

function updateRollLogDisplay() {
  const logContainer = document.getElementById("recentRollsLog");
  if (!logContainer) return;

  if (rollHistory.length === 0) {
    logContainer.innerHTML =
      '<p class="empty-state" style="text-align: center; color: #888;">Roll history will appear here during play.</p>';
    return;
  }

  const primaryColor = window.getThemeColor("primary");
  const primaryRgba = window.getThemeColor("primaryRgba");

  logContainer.innerHTML = rollHistory
    .map(
      (roll) => `
    <div style="padding: 8px; border-bottom: 1px solid ${primaryRgba(
      0.2,
    )}; display: flex; justify-content: space-between;">
      <span style="color: #888;">${roll.timestamp}</span>
      <span>${roll.description}</span>
      <span style="color: ${primaryColor}; font-weight: bold;">${
        roll.result
      }</span>
    </div>
  `,
    )
    .join("");
}

function clearRollLog() {
  if (confirm("Clear all roll history?")) {
    rollHistory = [];
    updateRollLogDisplay();
  }
}

// Quick roll group initiative placeholder
function rollGroupInitiative() {
  alert("Group initiative rolling will be implemented in the Combat Tracker.");
  switchToTab("encounters");
}

// Session Notes functionality
let sessionNotes = [];
let sessionSortBy = "number-desc"; // 'number-desc', 'number-asc', 'date-desc', 'date-asc', 'title-asc', 'title-desc'
let sessionFilterText = "";

// Make sessionNotes accessible globally for onclick handlers
if (typeof window !== "undefined") {
  window.sessionNotes = sessionNotes;
}

function saveSessionNotes() {
  let sessionNumber = parseInt(
    document.getElementById("currentSessionNumber")?.value || 1,
  );
  const sessionDate =
    document.getElementById("currentSessionDate")?.value || "";
  const investigationName =
    document.getElementById("investigationName")?.value || "";
  const statementGiver = document.getElementById("statementGiver")?.value || "";
  const notes = document.getElementById("currentSessionNotes")?.value || "";

  if (!notes.trim()) {
    alert("Please enter some notes before saving.");
    return;
  }

  // Check if session number is already used, find next available if so
  const existingSession = sessionNotes.find((s) => s.number === sessionNumber);
  if (existingSession) {
    // Find the highest session number
    const maxSessionNumber =
      sessionNotes.length > 0
        ? Math.max(...sessionNotes.map((s) => s.number))
        : 0;
    sessionNumber = maxSessionNumber + 1;

    // Update the input field to show the new number
    document.getElementById("currentSessionNumber").value = sessionNumber;

    alert(
      `Session ${
        sessionNumber - 1
      } already exists. Auto-incremented to Session ${sessionNumber}.`,
    );
  }

  const session = {
    number: sessionNumber,
    date: sessionDate,
    investigationName: investigationName,
    statementGiver: statementGiver,
    notes: notes,
    timestamp: new Date().toISOString(),
  };

  sessionNotes.push(session);

  // Sort by session number
  sessionNotes.sort((a, b) => b.number - a.number);

  // Save to localStorage
  localStorage.setItem("gmTool_sessionNotes", JSON.stringify(sessionNotes));

  alert(`Session ${sessionNumber} notes saved!`);
  updateSessionHistoryDisplay();
}

function loadSessionNotes() {
  const saved = localStorage.getItem("gmTool_sessionNotes");
  if (saved) {
    const loadedSessions = JSON.parse(saved);
    // Convert all session numbers to integers to ensure consistency
    sessionNotes = loadedSessions.map((session) => ({
      ...session,
      number: parseInt(session.number),
    }));
    // Update window reference to point to the same array
    if (typeof window !== "undefined") {
      window.sessionNotes = sessionNotes;
    }
    updateSessionHistoryDisplay();
  }

  // Set current date
  const dateInput = document.getElementById("currentSessionDate");
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split("T")[0];
  }
}

function viewPastSessions() {
  if (sessionNotes.length === 0) {
    alert("No past sessions recorded yet.");
    return;
  }

  const sessionList = sessionNotes
    .map((s) => `Session ${s.number} (${s.date || "No date"})`)
    .join("\n");
  const selected = prompt(
    `Enter session number to view:\n\n${sessionList}`,
    sessionNotes[0].number,
  );

  if (selected) {
    const session = sessionNotes.find((s) => s.number === parseInt(selected));
    if (session) {
      document.getElementById("currentSessionNumber").value = session.number;
      document.getElementById("currentSessionDate").value = session.date || "";
      document.getElementById("investigationName").value =
        session.investigationName || "";
      document.getElementById("statementGiver").value =
        session.statementGiver || "";
      document.getElementById("currentSessionNotes").value =
        session.notes || "";
    }
  }
}

function updateSessionHistoryDisplay() {
  const historyContainer = document.getElementById("sessionHistoryList");
  if (!historyContainer) return;

  const primaryColor = window.getThemeColor("primary");

  if (sessionNotes.length === 0) {
    historyContainer.innerHTML =
      '<p class="empty-state" style="text-align: center; color: #888;">No previous sessions recorded yet.</p>';
    return;
  }

  // Filter sessions
  let filteredSessions = sessionNotes.filter((session) => {
    if (!sessionFilterText.trim()) return true;
    const searchText = sessionFilterText.toLowerCase();
    const matchesTitle = (session.investigationName || "")
      .toLowerCase()
      .includes(searchText);
    const matchesGiver = (session.statementGiver || "")
      .toLowerCase()
      .includes(searchText);
    const matchesNumber = session.number.toString().includes(searchText);
    return matchesTitle || matchesGiver || matchesNumber;
  });

  // Sort sessions
  filteredSessions.sort((a, b) => {
    switch (sessionSortBy) {
      case "number-desc":
        return b.number - a.number;
      case "number-asc":
        return a.number - b.number;
      case "date-desc":
        return (b.date || "").localeCompare(a.date || "");
      case "date-asc":
        return (a.date || "").localeCompare(b.date || "");
      case "title-asc":
        return (a.investigationName || "").localeCompare(
          b.investigationName || "",
        );
      case "title-desc":
        return (b.investigationName || "").localeCompare(
          a.investigationName || "",
        );
      case "giver-asc":
        return (a.statementGiver || "").localeCompare(b.statementGiver || "");
      case "giver-desc":
        return (b.statementGiver || "").localeCompare(a.statementGiver || "");
      default:
        return b.number - a.number;
    }
  });

  if (filteredSessions.length === 0) {
    historyContainer.innerHTML =
      '<p class="empty-state" style="text-align: center; color: #888;">No sessions match your filter.</p>';
    return;
  }

  historyContainer.innerHTML = filteredSessions
    .map(
      (session) => `
    <div style="padding: 15px; border: 1px solid rgba(76, 175, 80, 0.3); border-radius: 6px; margin-bottom: 10px; background: rgba(0, 0, 0, 0.2);">
      <div onclick="toggleSessionDetails(${
        session.number
      })" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span id="arrow-${
            session.number
          }" style="color: #4CAF50; font-size: 1.2em;">▶</span>
          <strong style="color: #4CAF50;">Session ${session.number}</strong>
          ${
            session.investigationName
              ? `<span style="color: #66bb6a; font-weight: 600; font-size: 0.95em;">- ${session.investigationName}</span>`
              : ""
          }
        </div>
        <span style="color: #888;">${session.date || "No date"}</span>
      </div>
      <div id="details-${session.number}" style="display: none;">
        ${
          session.statementGiver
            ? `<div style="color: #888; font-size: 0.85em; margin-bottom: 8px;">Statement by: ${session.statementGiver}</div>`
            : ""
        }
        <div style="color: #ddd; font-size: 0.9em; max-height: 100px; overflow: hidden;">
          ${session.notes
            .split("\n")
            .filter((line) => line.trim())
            .slice(0, 10)
            .map((line) => `• ${line.trim()}`)
            .join("<br>")}${
            session.notes.split("\n").filter((line) => line.trim()).length > 10
              ? "<br>..."
              : ""
          }
        </div>
        <div style="display: flex; gap: 8px; margin-top: 8px;">
          <button class="button" onclick="event.stopPropagation(); loadSession(${
            session.number
          })" style="padding: 5px 12px; font-size: 0.9em; background: ${primaryColor}; color: white; border: none;">
            Load
          </button>
          <button class="button" onclick="event.stopPropagation(); editSessionFromHistory(${
            session.number
          })" style="padding: 5px 12px; font-size: 0.9em; background: #ff9800; color: white; border: none;">
            Edit
          </button>
          <button class="button" onclick="event.stopPropagation(); deleteSessionFromHistory(${
            session.number
          })" style="padding: 5px 12px; font-size: 0.9em; background: #d32f2f; color: white; border: none;">
            Delete
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

function sortSessionsBy(sortType) {
  sessionSortBy = sortType;
  updateSessionHistoryDisplay();
}

function filterSessions(searchText) {
  sessionFilterText = searchText;
  updateSessionHistoryDisplay();
}

function clearSessionFilters() {
  sessionFilterText = "";
  const filterInput = document.getElementById("sessionFilterInput");
  if (filterInput) {
    filterInput.value = "";
  }
  updateSessionHistoryDisplay();
}

function toggleSessionDetails(sessionNumber) {
  const detailsDiv = document.getElementById(`details-${sessionNumber}`);
  const arrow = document.getElementById(`arrow-${sessionNumber}`);
  if (detailsDiv && arrow) {
    const isHidden = detailsDiv.style.display === "none";
    detailsDiv.style.display = isHidden ? "block" : "none";
    arrow.textContent = isHidden ? "▼" : "▶";
  }
}

function loadSession(sessionNumber) {
  const session = sessionNotes.find((s) => s.number === sessionNumber);
  if (session) {
    document.getElementById("currentSessionNumber").value = session.number;
    document.getElementById("currentSessionDate").value = session.date || "";
    document.getElementById("investigationName").value =
      session.investigationName || "";
    document.getElementById("statementGiver").value =
      session.statementGiver || "";
    document.getElementById("currentSessionNotes").value = session.notes || "";
  }
}

function editSessionFromHistory(sessionNumber) {
  // Ensure sessionNumber is a number
  sessionNumber = parseInt(sessionNumber);

  // Access sessionNotes from window if needed
  const notes = window.sessionNotes || sessionNotes;

  console.log(
    "Edit session:",
    sessionNumber,
    "Available sessions:",
    notes.map((s) => s.number),
  );

  const session = notes.find((s) => s.number === sessionNumber);
  if (!session) {
    alert("Session not found.");
    return;
  }

  // Load the session into the editor
  document.getElementById("currentSessionNumber").value = session.number;
  document.getElementById("currentSessionDate").value = session.date || "";
  document.getElementById("investigationName").value =
    session.investigationName || "";
  document.getElementById("statementGiver").value =
    session.statementGiver || "";
  document.getElementById("currentSessionNotes").value = session.notes || "";

  alert(
    `Session ${sessionNumber} loaded for editing. Make your changes and click "Save Current Session" to update.`,
  );
}

function deleteSessionFromHistory(sessionNumber) {
  // Ensure sessionNumber is a number
  sessionNumber = parseInt(sessionNumber);

  // Access sessionNotes from window if needed
  const notes = window.sessionNotes || sessionNotes;

  console.log(
    "Delete session:",
    sessionNumber,
    "Available sessions:",
    notes.map((s) => s.number),
  );

  const session = notes.find((s) => s.number === sessionNumber);
  if (!session) {
    alert("Session not found.");
    return;
  }

  const confirmDelete = confirm(
    `Delete Session ${sessionNumber}?\n\nDate: ${
      session.date || "No date"
    }\nInvestigation: ${
      session.investigationName || "N/A"
    }\n\nThis action cannot be undone.`,
  );

  if (confirmDelete) {
    sessionNotes = sessionNotes.filter((s) => s.number !== sessionNumber);
    window.sessionNotes = sessionNotes;
    localStorage.setItem("gmTool_sessionNotes", JSON.stringify(sessionNotes));
    updateSessionHistoryDisplay();
    alert(`Session ${sessionNumber} deleted.`);
  }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  initializeDashboard();
  loadSessionNotes();
});
