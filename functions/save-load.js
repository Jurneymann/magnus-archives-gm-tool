// Magnus Archives GM Tool - Campaign Save/Load System

// ==================== SAVE ALL CAMPAIGN DATA ==================== //
function saveAllCampaignData() {
  const campaignName = localStorage.getItem("gmTool_campaignName") || "";

  const campaignData = {
    version: "1.0",
    timestamp: new Date().toISOString(),
    campaignName: campaignName,
    data: {
      partyMembers: JSON.parse(
        localStorage.getItem("gmTool_partyMembers") || "[]"
      ),
      npcs: JSON.parse(localStorage.getItem("gmTool_npcs") || "[]"),
      sessionNotes: JSON.parse(
        localStorage.getItem("gmTool_sessionNotes") || "[]"
      ),
      plotThreads: JSON.parse(
        localStorage.getItem("gmTool_plotThreads") || "[]"
      ),
      customEnemies: JSON.parse(
        localStorage.getItem("gmTool_customEnemies") || "[]"
      ),
      customArtefacts: JSON.parse(
        localStorage.getItem("gmTool_customArtefacts") || "[]"
      ),
      customLeitners: JSON.parse(
        localStorage.getItem("gmTool_customLeitners") || "[]"
      ),
      customLocations: JSON.parse(
        localStorage.getItem("gmTool_customLocations") || "[]"
      ),
    },
  };

  // Create and download file
  const dataStr = JSON.stringify(campaignData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;

  // Generate filename with campaign name and date
  const date = new Date().toISOString().split("T")[0];
  const campaignSlug = campaignName
    ? campaignName.replace(/[^a-z0-9]/gi, "-").toLowerCase()
    : "campaign";
  link.download = `${campaignSlug}-${date}.json`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  // Show confirmation
  const totalItems =
    campaignData.data.partyMembers.length +
    campaignData.data.npcs.length +
    campaignData.data.sessionNotes.length +
    campaignData.data.plotThreads.length +
    campaignData.data.customEnemies.length +
    campaignData.data.customArtefacts.length +
    campaignData.data.customLeitners.length +
    campaignData.data.customLocations.length;

  alert(
    `✅ Campaign saved successfully!\n\nSaved:\n- ${campaignData.data.partyMembers.length} Player Characters\n- ${campaignData.data.npcs.length} NPCs\n- ${campaignData.data.sessionNotes.length} Session Notes\n- ${campaignData.data.plotThreads.length} Plot Threads\n- ${campaignData.data.customEnemies.length} Custom Enemies\n- ${campaignData.data.customArtefacts.length} Custom Artefacts\n- ${campaignData.data.customLeitners.length} Custom Leitners\n- ${campaignData.data.customLocations.length} Custom Locations\n\nTotal: ${totalItems} items`
  );
}

// ==================== LOAD ALL CAMPAIGN DATA ==================== //
function loadAllCampaignData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const campaignData = JSON.parse(e.target.result);

      // Validate data structure
      if (!campaignData.data) {
        throw new Error("Invalid campaign file format");
      }

      // Load campaign name if present
      if (campaignData.campaignName) {
        localStorage.setItem("gmTool_campaignName", campaignData.campaignName);
        const campaignInput = document.getElementById("campaignName");
        if (campaignInput) {
          campaignInput.value = campaignData.campaignName;
        }
      }

      // Confirm before overwriting
      const totalItems =
        (campaignData.data.partyMembers?.length || 0) +
        (campaignData.data.npcs?.length || 0) +
        (campaignData.data.sessionNotes?.length || 0) +
        (campaignData.data.plotThreads?.length || 0) +
        (campaignData.data.customEnemies?.length || 0) +
        (campaignData.data.customArtefacts?.length || 0) +
        (campaignData.data.customLeitners?.length || 0) +
        (campaignData.data.customLocations?.length || 0);

      const confirmMessage = `⚠️ WARNING: This will replace ALL current campaign data!\n\nFile contains:\n- ${
        campaignData.data.partyMembers?.length || 0
      } Player Characters\n- ${campaignData.data.npcs?.length || 0} NPCs\n- ${
        campaignData.data.sessionNotes?.length || 0
      } Session Notes\n- ${
        campaignData.data.plotThreads?.length || 0
      } Plot Threads\n- ${
        campaignData.data.customEnemies?.length || 0
      } Custom Enemies\n- ${
        campaignData.data.customArtefacts?.length || 0
      } Custom Artefacts\n- ${
        campaignData.data.customLeitners?.length || 0
      } Custom Leitners\n- ${
        campaignData.data.customLocations?.length || 0
      } Custom Locations\n\nTotal: ${totalItems} items\n\nDo you want to continue?`;

      if (!confirm(confirmMessage)) {
        // Reset file input
        event.target.value = "";
        return;
      }

      // Load all data into localStorage
      if (campaignData.data.partyMembers) {
        localStorage.setItem(
          "gmTool_partyMembers",
          JSON.stringify(campaignData.data.partyMembers)
        );
      }
      if (campaignData.data.npcs) {
        localStorage.setItem(
          "gmTool_npcs",
          JSON.stringify(campaignData.data.npcs)
        );
      }
      if (campaignData.data.sessionNotes) {
        localStorage.setItem(
          "gmTool_sessionNotes",
          JSON.stringify(campaignData.data.sessionNotes)
        );
      }
      if (campaignData.data.plotThreads) {
        localStorage.setItem(
          "gmTool_plotThreads",
          JSON.stringify(campaignData.data.plotThreads)
        );
      }
      if (campaignData.data.customEnemies) {
        localStorage.setItem(
          "gmTool_customEnemies",
          JSON.stringify(campaignData.data.customEnemies)
        );
      }
      if (campaignData.data.customArtefacts) {
        localStorage.setItem(
          "gmTool_customArtefacts",
          JSON.stringify(campaignData.data.customArtefacts)
        );
      }
      if (campaignData.data.customLeitners) {
        localStorage.setItem(
          "gmTool_customLeitners",
          JSON.stringify(campaignData.data.customLeitners)
        );
      }
      if (campaignData.data.customLocations) {
        localStorage.setItem(
          "gmTool_customLocations",
          JSON.stringify(campaignData.data.customLocations)
        );
      }

      // Reload all data and refresh displays
      if (typeof loadPartyData === "function") loadPartyData();
      if (typeof loadNPCData === "function") loadNPCData();
      if (typeof loadSessionNotes === "function") loadSessionNotes();
      if (typeof loadPlotThreads === "function") loadPlotThreads();
      if (typeof loadCustomEnemies === "function") loadCustomEnemies();
      if (typeof loadCustomArtefacts === "function") loadCustomArtefacts();
      if (typeof loadCustomLeitners === "function") loadCustomLeitners();
      if (typeof loadCustomLocations === "function") loadCustomLocations();

      // Refresh all displays
      if (typeof renderPartyList === "function") renderPartyList();
      if (typeof renderNPCList === "function") renderNPCList();
      if (typeof renderCustomEnemies === "function") renderCustomEnemies();
      if (typeof renderCustomArtefacts === "function") renderCustomArtefacts();
      if (typeof renderCustomLeitners === "function") renderCustomLeitners();
      if (typeof renderCustomLocations === "function") renderCustomLocations();
      if (typeof renderPlotThreads === "function") renderPlotThreads();

      alert(`✅ Campaign loaded successfully!\n\nLoaded ${totalItems} items.`);

      // Reset file input
      event.target.value = "";
    } catch (error) {
      console.error("Error loading campaign:", error);
      alert(
        `❌ Error loading campaign file:\n${error.message}\n\nPlease ensure you're loading a valid campaign save file.`
      );
      event.target.value = "";
    }
  };

  reader.readAsText(file);
}

// ==================== UTILITY FUNCTIONS ==================== //
function promptLoadCampaignFile() {
  document.getElementById("campaignFileInput")?.click();
}

// ==================== AUTOSAVE FUNCTIONS ==================== //
let autosaveInterval = null;

function showAutosaveIndicator() {
  console.log("[Autosave] Showing autosave indicator");
  // Remove any existing indicator
  const existing = document.getElementById("autosave-indicator");
  if (existing) {
    existing.remove();
  }

  // Create indicator
  const indicator = document.createElement("div");
  indicator.id = "autosave-indicator";
  indicator.textContent = "💾 Campaign Autosaved";
  indicator.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    border: 2px solid #4caf50;
    border-radius: 8px;
    padding: 12px 20px;
    color: #4caf50;
    font-weight: bold;
    font-size: 1em;
    box-shadow: 0 4px 20px rgba(76, 175, 80, 0.4), 0 0 15px rgba(76, 175, 80, 0.2);
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;

  document.body.appendChild(indicator);

  // Fade in
  setTimeout(() => {
    indicator.style.opacity = "1";
  }, 10);

  // Fade out and remove after 3 seconds
  setTimeout(() => {
    indicator.style.opacity = "0";
    setTimeout(() => {
      indicator.remove();
    }, 300);
  }, 3000);
}

function saveAutosave() {
  const campaignData = {
    version: "1.0",
    timestamp: new Date().toISOString(),
    data: {
      partyMembers: JSON.parse(
        localStorage.getItem("gmTool_partyMembers") || "[]"
      ),
      npcs: JSON.parse(localStorage.getItem("gmTool_npcs") || "[]"),
      sessionNotes: JSON.parse(
        localStorage.getItem("gmTool_sessionNotes") || "[]"
      ),
      plotThreads: JSON.parse(
        localStorage.getItem("gmTool_plotThreads") || "[]"
      ),
      customEnemies: JSON.parse(
        localStorage.getItem("gmTool_customEnemies") || "[]"
      ),
      customArtefacts: JSON.parse(
        localStorage.getItem("gmTool_customArtefacts") || "[]"
      ),
      customLeitners: JSON.parse(
        localStorage.getItem("gmTool_customLeitners") || "[]"
      ),
      customLocations: JSON.parse(
        localStorage.getItem("gmTool_customLocations") || "[]"
      ),
    },
  };

  // Save to localStorage as autosave
  localStorage.setItem("gmTool_autosave", JSON.stringify(campaignData));

  const totalItems =
    campaignData.data.partyMembers.length +
    campaignData.data.npcs.length +
    campaignData.data.sessionNotes.length +
    campaignData.data.plotThreads.length +
    campaignData.data.customEnemies.length +
    campaignData.data.customArtefacts.length +
    campaignData.data.customLeitners.length +
    campaignData.data.customLocations.length;

  console.log("[Autosave] Completed at", new Date().toLocaleTimeString());
  console.log("[Autosave] Saved items:", {
    partyMembers: campaignData.data.partyMembers.length,
    npcs: campaignData.data.npcs.length,
    sessionNotes: campaignData.data.sessionNotes.length,
    plotThreads: campaignData.data.plotThreads.length,
    customEnemies: campaignData.data.customEnemies.length,
    customArtefacts: campaignData.data.customArtefacts.length,
    customLeitners: campaignData.data.customLeitners.length,
    customLocations: campaignData.data.customLocations.length,
    total: totalItems,
  });

  // Show visual indicator
  showAutosaveIndicator();
}

function loadAutosave() {
  console.log("[Autosave] Loading autosave data...");
  const autosaveData = localStorage.getItem("gmTool_autosave");

  if (!autosaveData) {
    console.log("[Autosave] No autosave data found");
    alert("No autosave data found.");
    return;
  }

  try {
    const campaignData = JSON.parse(autosaveData);
    console.log(
      "[Autosave] Successfully parsed autosave data from:",
      campaignData.timestamp
    );

    if (!campaignData.data) {
      throw new Error("Invalid autosave format");
    }

    const totalItems =
      (campaignData.data.partyMembers?.length || 0) +
      (campaignData.data.npcs?.length || 0) +
      (campaignData.data.sessionNotes?.length || 0) +
      (campaignData.data.plotThreads?.length || 0) +
      (campaignData.data.customEnemies?.length || 0) +
      (campaignData.data.customArtefacts?.length || 0) +
      (campaignData.data.customLeitners?.length || 0) +
      (campaignData.data.customLocations?.length || 0);

    const timestamp = new Date(campaignData.timestamp).toLocaleString();
    const confirmMessage = `⚠️ Load from autosave?\n\nAutosave from: ${timestamp}\n\nContains:\n- ${
      campaignData.data.partyMembers?.length || 0
    } Player Characters\n- ${campaignData.data.npcs?.length || 0} NPCs\n- ${
      campaignData.data.sessionNotes?.length || 0
    } Session Notes\n- ${
      campaignData.data.plotThreads?.length || 0
    } Plot Threads\n- ${
      campaignData.data.customEnemies?.length || 0
    } Custom Enemies\n- ${
      campaignData.data.customArtefacts?.length || 0
    } Custom Artefacts\n- ${
      campaignData.data.customLeitners?.length || 0
    } Custom Leitners\n- ${
      campaignData.data.customLocations?.length || 0
    } Custom Locations\n\nTotal: ${totalItems} items\n\nThis will replace your current data. Continue?`;

    if (!confirm(confirmMessage)) {
      return;
    }

    // Load all data into localStorage
    if (campaignData.data.partyMembers) {
      localStorage.setItem(
        "gmTool_partyMembers",
        JSON.stringify(campaignData.data.partyMembers)
      );
    }
    if (campaignData.data.npcs) {
      localStorage.setItem(
        "gmTool_npcs",
        JSON.stringify(campaignData.data.npcs)
      );
    }
    if (campaignData.data.sessionNotes) {
      localStorage.setItem(
        "gmTool_sessionNotes",
        JSON.stringify(campaignData.data.sessionNotes)
      );
    }
    if (campaignData.data.plotThreads) {
      localStorage.setItem(
        "gmTool_plotThreads",
        JSON.stringify(campaignData.data.plotThreads)
      );
    }
    if (campaignData.data.customEnemies) {
      localStorage.setItem(
        "gmTool_customEnemies",
        JSON.stringify(campaignData.data.customEnemies)
      );
    }
    if (campaignData.data.customArtefacts) {
      localStorage.setItem(
        "gmTool_customArtefacts",
        JSON.stringify(campaignData.data.customArtefacts)
      );
    }
    if (campaignData.data.customLeitners) {
      localStorage.setItem(
        "gmTool_customLeitners",
        JSON.stringify(campaignData.data.customLeitners)
      );
    }
    if (campaignData.data.customLocations) {
      localStorage.setItem(
        "gmTool_customLocations",
        JSON.stringify(campaignData.data.customLocations)
      );
    }

    // Reload all data and refresh displays
    if (typeof loadPartyData === "function") loadPartyData();
    if (typeof loadNPCData === "function") loadNPCData();
    if (typeof loadSessionNotes === "function") loadSessionNotes();
    if (typeof loadPlotThreads === "function") loadPlotThreads();
    if (typeof loadCustomEnemies === "function") loadCustomEnemies();
    if (typeof loadCustomArtefacts === "function") loadCustomArtefacts();
    if (typeof loadCustomLeitners === "function") loadCustomLeitners();
    if (typeof loadCustomLocations === "function") loadCustomLocations();

    // Refresh all displays
    if (typeof renderPartyList === "function") renderPartyList();
    if (typeof renderNPCList === "function") renderNPCList();
    if (typeof renderCustomEnemies === "function") renderCustomEnemies();
    if (typeof renderCustomArtefacts === "function") renderCustomArtefacts();
    if (typeof renderCustomLeitners === "function") renderCustomLeitners();
    if (typeof renderCustomLocations === "function") renderCustomLocations();
    if (typeof renderPlotThreads === "function") renderPlotThreads();

    alert(
      `✅ Autosave loaded successfully!\n\nRestored ${totalItems} items from ${timestamp}.`
    );
  } catch (error) {
    console.error("Error loading autosave:", error);
    alert(`❌ Error loading autosave:\n${error.message}`);
  }
}

function startAutosave() {
  console.log("[Autosave] Starting autosave system...");
  // Clear any existing interval
  if (autosaveInterval) {
    console.log("[Autosave] Clearing existing autosave interval");
    clearInterval(autosaveInterval);
  }

  // Save immediately
  console.log("[Autosave] Performing initial save...");
  saveAutosave();

  // Set up autosave every 10 minutes (600000 ms)
  autosaveInterval = setInterval(saveAutosave, 600000);
  console.log(
    "[Autosave] Autosave interval started - will save every 10 minutes (600000ms)"
  );
}

// Start autosave when the page loads
document.addEventListener("DOMContentLoaded", () => {
  startAutosave();
});

// ==================== RESET CAMPAIGN ==================== //
function resetCampaign() {
  const confirmMessage = `⚠️ WARNING: This will DELETE ALL campaign data!\n\nThis includes:\n- All Player Characters\n- All NPCs\n- All Session Notes\n- All Plot Threads\n- All Custom Enemies\n- All Custom Artefacts\n- All Custom Leitners\n- All Custom Locations\n- Autosave data\n\nThis action CANNOT be undone!\n\nAre you absolutely sure you want to reset everything?`;

  if (!confirm(confirmMessage)) {
    return;
  }

  // Double confirmation for safety
  const doubleConfirm = confirm(
    "⚠️ FINAL WARNING!\n\nClick OK to permanently delete all campaign data.\nClick Cancel to keep your data."
  );

  if (!doubleConfirm) {
    return;
  }

  // Clear all campaign data from localStorage
  localStorage.removeItem("gmTool_partyMembers");
  localStorage.removeItem("gmTool_npcs");
  localStorage.removeItem("gmTool_sessionNotes");
  localStorage.removeItem("gmTool_plotThreads");
  localStorage.removeItem("gmTool_customEnemies");
  localStorage.removeItem("gmTool_customArtefacts");
  localStorage.removeItem("gmTool_customLeitners");
  localStorage.removeItem("gmTool_customLocations");
  localStorage.removeItem("gmTool_autosave");
  localStorage.removeItem("gmTool_campaignName");

  // Clear campaign name input
  const campaignInput = document.getElementById("campaignName");
  if (campaignInput) {
    campaignInput.value = "";
  }

  // Reload all data (will be empty now)
  if (typeof loadPartyData === "function") loadPartyData();
  if (typeof loadNPCData === "function") loadNPCData();
  if (typeof loadSessionNotes === "function") loadSessionNotes();
  if (typeof loadPlotThreads === "function") loadPlotThreads();
  if (typeof loadCustomEnemies === "function") loadCustomEnemies();
  if (typeof loadCustomArtefacts === "function") loadCustomArtefacts();
  if (typeof loadCustomLeitners === "function") loadCustomLeitners();
  if (typeof loadCustomLocations === "function") loadCustomLocations();

  // Refresh all displays
  if (typeof renderPartyList === "function") renderPartyList();
  if (typeof renderNPCList === "function") renderNPCList();
  if (typeof renderCustomEnemies === "function") renderCustomEnemies();
  if (typeof renderCustomArtefacts === "function") renderCustomArtefacts();
  if (typeof renderCustomLeitners === "function") renderCustomLeitners();
  if (typeof renderCustomLocations === "function") renderCustomLocations();
  if (typeof renderPlotThreads === "function") renderPlotThreads();

  alert("✅ Campaign reset complete.\n\nAll data has been cleared.");

  console.log("Campaign data reset completed");
}

// ==================== CAMPAIGN NAME FUNCTIONS ==================== //
function saveCampaignName() {
  const campaignInput = document.getElementById("campaignName");
  if (campaignInput) {
    const campaignName = campaignInput.value.trim();
    localStorage.setItem("gmTool_campaignName", campaignName);
    console.log("Campaign name saved:", campaignName);
  }
}

function loadCampaignName() {
  const campaignName = localStorage.getItem("gmTool_campaignName") || "";
  const campaignInput = document.getElementById("campaignName");
  if (campaignInput) {
    campaignInput.value = campaignName;
  }
}
