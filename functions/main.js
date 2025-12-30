// Magnus Archives GM Tool - Main Initialization Script

console.log("Magnus Archives GM Tool - Initializing...");

// ==================== INITIALIZATION ==================== //
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded - Starting initialization...");

  // Initialize tab system (handled by tab-system.js)
  console.log("✓ Tab system loaded");

  // Initialize dashboard
  if (typeof initializeDashboard === "function") {
    initializeDashboard();
    console.log("✓ Dashboard initialized");
  }

  // Load saved data
  if (typeof loadPartyData === "function") {
    loadPartyData();
    console.log("✓ Party data loaded");
  }

  if (typeof loadCampaignName === "function") {
    loadCampaignName();
    console.log("✓ Campaign name loaded");
  }

  if (typeof loadNPCData === "function") {
    loadNPCData();
    console.log("✓ NPC data loaded");
  }

  if (typeof loadPlotThreads === "function") {
    loadPlotThreads();
    console.log("✓ Plot threads loaded");
  }

  // Initialize reference library
  if (typeof initializeReference === "function") {
    initializeReference();
    console.log("✓ Reference library initialized");
  }

  // Close multiselect dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-multiselect")) {
      // Close all NPC entity dropdowns
      document
        .querySelectorAll('[id^="entity-dropdown-"]')
        .forEach((dropdown) => {
          dropdown.style.display = "none";
        });
      document
        .querySelectorAll('[id^="entity-trigger-"]')
        .forEach((trigger) => {
          trigger.classList.remove("open");
        });

      // Close custom enemy entity dropdown
      const customDropdown = document.getElementById(
        "customEnemyEntityDropdown"
      );
      const customTrigger = document.getElementById("customEnemyEntityTrigger");
      if (customDropdown) customDropdown.style.display = "none";
      if (customTrigger) customTrigger.classList.remove("open");
    }
  });

  console.log("✓ Magnus Archives GM Tool fully loaded and ready!");
});
