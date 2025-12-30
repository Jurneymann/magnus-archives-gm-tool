// Magnus Archives GM Tool - Locations Management

// Storage
let customLocations = [];
let editingLocationId = null;
let customLocationsFilters = { name: "", type: "" };

// Temporary storage for items being added to a location
let tempLocationNPCs = [];
let tempLocationEnemies = [];
let tempLocationArtefacts = [];
let tempLocationLeitners = [];

// ==================== ENTITY POPUP SYSTEM ==================== //
// Store entity data globally for popup access
window.entityPopupData = {};

function escapeHtml(text) {
  if (!text) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function showEntityPopup(type, dataId, targetTab) {
  console.log("=== showEntityPopup called ===");
  console.log("Type:", type);
  console.log("DataId:", dataId);
  console.log("TargetTab:", targetTab);
  console.log("Available data IDs:", Object.keys(window.entityPopupData));

  const data = window.entityPopupData[dataId];
  console.log("Retrieved data:", data);

  if (!data) {
    console.error("Entity data not found for ID:", dataId);
    console.error(
      "Available IDs in entityPopupData:",
      Object.keys(window.entityPopupData)
    );
    alert("Error: Entity data not found. Check console for details.");
    return;
  }

  console.log("Creating popup for:", data.name);

  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "entity-popup-overlay";
  console.log("Overlay created");

  // Create popup
  const popup = document.createElement("div");
  popup.className = "entity-popup";

  // Build content based on type
  let content = "";
  let title = "";

  switch (type) {
    case "npc":
      title = escapeHtml(data.name || "Unknown NPC");
      content = `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Name</span>
          <div class="entity-popup-value">${escapeHtml(
            data.name || "N/A"
          )}</div>
        </div>
        ${
          data.role
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Role</span>
          <div class="entity-popup-value">${escapeHtml(data.role)}</div>
        </div>
        `
            : ""
        }
        ${
          data.affiliation
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Affiliation</span>
          <div class="entity-popup-value">${escapeHtml(data.affiliation)}</div>
        </div>
        `
            : ""
        }
        ${
          data.entity
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Entity</span>
          <div class="entity-popup-value">${escapeHtml(
            Array.isArray(data.entity) ? data.entity.join(", ") : data.entity
          )}</div>
        </div>
        `
            : ""
        }
        ${
          data.description
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Description</span>
          <div class="entity-popup-value">${escapeHtml(data.description)}</div>
        </div>
        `
            : ""
        }
      `;
      break;

    case "enemy":
      title = escapeHtml(data.name || "Unknown Enemy");
      content = `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Name</span>
          <div class="entity-popup-value">${escapeHtml(
            data.name || "N/A"
          )}</div>
        </div>
        ${
          data.level
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Level</span>
          <div class="entity-popup-value">${escapeHtml(
            String(data.level)
          )}</div>
        </div>
        `
            : ""
        }
        ${
          data.health
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Health</span>
          <div class="entity-popup-value">${escapeHtml(
            String(data.health)
          )}</div>
        </div>
        `
            : ""
        }
        ${
          data.stress
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Stress</span>
          <div class="entity-popup-value">${escapeHtml(
            String(data.stress)
          )}</div>
        </div>
        `
            : ""
        }
        ${
          data.damage
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Damage</span>
          <div class="entity-popup-value">${escapeHtml(data.damage)}</div>
        </div>
        `
            : ""
        }
        ${
          data.entity
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Entity</span>
          <div class="entity-popup-value">${escapeHtml(
            Array.isArray(data.entity) ? data.entity.join(", ") : data.entity
          )}</div>
        </div>
        `
            : ""
        }
        ${
          data.movement
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Movement</span>
          <div class="entity-popup-value">${escapeHtml(data.movement)}</div>
        </div>
        `
            : ""
        }
        ${
          data.combat
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Combat</span>
          <div class="entity-popup-value">${escapeHtml(data.combat)}</div>
        </div>
        `
            : ""
        }
        ${
          data.modifications
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Modifications</span>
          <div class="entity-popup-value">${escapeHtml(
            data.modifications
          )}</div>
        </div>
        `
            : ""
        }
      `;
      break;

    case "artefact":
      title = escapeHtml(data.name || "Unknown Artefact");
      content = `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Name</span>
          <div class="entity-popup-value">${escapeHtml(
            data.name || "N/A"
          )}</div>
        </div>
        ${
          data.level
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Level</span>
          <div class="entity-popup-value">${escapeHtml(
            String(data.level)
          )}</div>
        </div>
        `
            : ""
        }
        ${
          data.entity || data.relatedEntity
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Entity</span>
          <div class="entity-popup-value">${escapeHtml(
            Array.isArray(data.entity || data.relatedEntity)
              ? (data.entity || data.relatedEntity).join(", ")
              : data.entity || data.relatedEntity
          )}</div>
        </div>
        `
            : ""
        }
        ${
          data.stress
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Stress</span>
          <div class="entity-popup-value">${escapeHtml(
            typeof data.stress === "object" && data.stress.amount
              ? String(data.stress.amount)
              : String(data.stress)
          )}</div>
        </div>
        `
            : ""
        }
        ${
          (data.stress &&
            typeof data.stress === "object" &&
            data.stress.when) ||
          data.stressTrigger
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">When Stress is Gained</span>
          <div class="entity-popup-value">${escapeHtml(
            (typeof data.stress === "object" && data.stress.when) ||
              data.stressTrigger
          )}</div>
        </div>
        `
            : ""
        }
      `;
      break;

    case "leitner":
      title = escapeHtml(data.name || "Unknown Book");
      content = `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Name</span>
          <div class="entity-popup-value">${escapeHtml(
            data.name || "N/A"
          )}</div>
        </div>
        ${
          data.level
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Level</span>
          <div class="entity-popup-value">${escapeHtml(
            String(data.level)
          )}</div>
        </div>
        `
            : ""
        }
        ${
          data.entity || data.relatedEntity
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Entity</span>
          <div class="entity-popup-value">${escapeHtml(
            Array.isArray(data.entity || data.relatedEntity)
              ? (data.entity || data.relatedEntity).join(", ")
              : data.entity || data.relatedEntity
          )}</div>
        </div>
        `
            : ""
        }
        ${
          data.stress
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">Stress</span>
          <div class="entity-popup-value">${escapeHtml(
            typeof data.stress === "object" && data.stress.amount
              ? String(data.stress.amount)
              : String(data.stress)
          )}</div>
        </div>
        `
            : ""
        }
        ${
          (data.stress &&
            typeof data.stress === "object" &&
            data.stress.when) ||
          data.stressTrigger
            ? `
        <div class="entity-popup-field">
          <span class="entity-popup-label">When Stress is Gained</span>
          <div class="entity-popup-value">${escapeHtml(
            (typeof data.stress === "object" && data.stress.when) ||
              data.stressTrigger
          )}</div>
        </div>
        `
            : ""
        }
      `;
      break;
  }

  popup.innerHTML = `
    <div class="entity-popup-header">
      <h2 class="entity-popup-title">${title}</h2>
      <button class="entity-popup-close" onclick="this.closest('.entity-popup-overlay').remove()">✕</button>
    </div>
    <div class="entity-popup-content">
      ${content}
    </div>
    <div class="entity-popup-actions">
      <button class="entity-popup-button secondary" onclick="this.closest('.entity-popup-overlay').remove()">Close</button>
      <button class="entity-popup-button primary" onclick="switchToTab('${targetTab}'); this.closest('.entity-popup-overlay').remove();">Go to ${
    type === "npc"
      ? "NPCs"
      : type === "enemy"
      ? "Bestiary"
      : type === "artefact"
      ? "Artefacts"
      : "Leitner Books"
  } Tab</button>
    </div>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);
  console.log("Popup appended to body");

  // Close on overlay click
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });

  // Close on escape key
  const escHandler = (e) => {
    if (e.key === "Escape") {
      overlay.remove();
      document.removeEventListener("keydown", escHandler);
    }
  };
  document.addEventListener("keydown", escHandler);
}

function switchToTab(tabId) {
  const tabButton = document.querySelector(`[data-tab="${tabId}"]`);
  if (tabButton) {
    tabButton.click();
  }
}

function initializeLocations() {
  console.log("initializeLocations called");
  loadCustomLocations();
  console.log("After loadCustomLocations:", customLocations);
  clearCustomLocationsFilters();
  renderCustomLocations();
}

// ==================== STORAGE ==================== //
function loadCustomLocations() {
  const saved = localStorage.getItem("gmTool_customLocations");
  if (saved) {
    try {
      customLocations = JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load custom locations:", e);
      customLocations = [];
    }
  }
}

function saveCustomLocations() {
  localStorage.setItem(
    "gmTool_customLocations",
    JSON.stringify(customLocations)
  );
}

// ==================== FORM MANAGEMENT ==================== //
function toggleCustomLocationForm() {
  const form = document.getElementById("customLocationForm");
  if (form) {
    if (form.style.display === "none") {
      form.style.display = "block";
      document.getElementById("customLocationName")?.focus();
      // Populate the selects when showing the form
      populateLocationNPCsSelect();
      populateLocationEnemiesSelect();
      populateLocationArtefactsSelect();
      populateLocationLeitnersSelect();
    } else {
      form.style.display = "none";
    }
  }
}

function clearCustomLocationForm() {
  document.getElementById("customLocationName").value = "";
  document.getElementById("customLocationAddress").value = "";
  document.getElementById("customLocationDescription").value = "";
  document.getElementById("customLocationEquipment").value = "";
  document.getElementById("customLocationSupernatural").value = "";
  document.getElementById("customLocationGMNotes").value = "";

  tempLocationNPCs = [];
  tempLocationEnemies = [];
  tempLocationArtefacts = [];
  tempLocationLeitners = [];

  updateLocationNPCsList();
  updateLocationEnemiesList();
  updateLocationArtefactsList();
  updateLocationLeitnersList();

  editingLocationId = null;
  const formTitle = document.getElementById("customLocationFormTitle");
  if (formTitle) formTitle.textContent = "➕ Create New Location";

  // Hide the form after clearing
  const form = document.getElementById("customLocationForm");
  if (form) form.style.display = "none";
}

// ==================== ADDING ITEMS TO LOCATION ==================== //
// New multi-select functions that populate from existing data
function populateLocationNPCsSelect() {
  const select = document.getElementById("locationNPCsSelect");
  if (!select) return;

  // Get NPCs from global npcs array
  const npcsList = typeof npcs !== "undefined" ? npcs : [];

  // Filter out NPCs already added to this location
  const alreadyAddedIds = tempLocationNPCs.map((n) => n.id);
  const availableNPCs = npcsList.filter(
    (npc) => !alreadyAddedIds.includes(npc.id)
  );

  if (availableNPCs.length === 0) {
    select.innerHTML = '<option value="">-- All NPCs already added --</option>';
    select.disabled = true;
  } else {
    select.disabled = false;
    select.innerHTML =
      '<option value="">-- Select NPCs --</option>' +
      availableNPCs
        .sort((a, b) => {
          const nameA = (a.name || "").replace(/^(The|A|An)\s+/i, "");
          const nameB = (b.name || "").replace(/^(The|A|An)\s+/i, "");
          return nameA.localeCompare(nameB);
        })
        .map(
          (npc) =>
            `<option value="${npc.id}">${npc.name || "Unnamed NPC"}</option>`
        )
        .join("");
  }
}

function populateLocationEnemiesSelect() {
  const select = document.getElementById("locationEnemiesSelect");
  if (!select) return;

  // Get enemies from global customEnemies array
  const enemiesList = typeof customEnemies !== "undefined" ? customEnemies : [];

  select.innerHTML =
    '<option value="">-- Select Enemies --</option>' +
    enemiesList
      .sort((a, b) => {
        const nameA = (a.name || "").replace(/^(The|A|An)\s+/i, "");
        const nameB = (b.name || "").replace(/^(The|A|An)\s+/i, "");
        return nameA.localeCompare(nameB);
      })
      .map(
        (enemy) =>
          `<option value="${enemy.id}">${
            enemy.name || "Unnamed Enemy"
          }</option>`
      )
      .join("");
}

function populateLocationArtefactsSelect() {
  const select = document.getElementById("locationArtefactsSelect");
  if (!select) return;

  // Get artefacts from global customArtefacts array
  const artefactsList =
    typeof customArtefacts !== "undefined" ? customArtefacts : [];

  // Filter out artefacts already added to this location
  const alreadyAddedIds = tempLocationArtefacts.map((a) => a.id);
  const availableArtefacts = artefactsList.filter(
    (artefact) => !alreadyAddedIds.includes(artefact.id)
  );

  if (availableArtefacts.length === 0) {
    select.innerHTML =
      '<option value="">-- All Artefacts already added --</option>';
    select.disabled = true;
  } else {
    select.disabled = false;
    select.innerHTML =
      '<option value="">-- Select Artefacts --</option>' +
      availableArtefacts
        .sort((a, b) => {
          const nameA = (a.name || "").replace(/^(The|A|An)\s+/i, "");
          const nameB = (b.name || "").replace(/^(The|A|An)\s+/i, "");
          return nameA.localeCompare(nameB);
        })
        .map(
          (artefact) =>
            `<option value="${artefact.id}">${
              artefact.name || "Unnamed Artefact"
            }</option>`
        )
        .join("");
  }
}

function populateLocationLeitnersSelect() {
  const select = document.getElementById("locationLeitnersSelect");
  if (!select) return;

  // Get leitners from global customLeitners array
  const leitnersList =
    typeof customLeitners !== "undefined" ? customLeitners : [];

  // Filter out leitners already added to this location
  const alreadyAddedIds = tempLocationLeitners.map((l) => l.id);
  const availableLeitners = leitnersList.filter(
    (leitner) => !alreadyAddedIds.includes(leitner.id)
  );

  if (availableLeitners.length === 0) {
    select.innerHTML =
      '<option value="">-- All Leitners already added --</option>';
    select.disabled = true;
  } else {
    select.disabled = false;
    select.innerHTML =
      '<option value="">-- Select Leitner Books --</option>' +
      availableLeitners
        .sort((a, b) => {
          const nameA = (a.name || "").replace(/^(The|A|An)\s+/i, "");
          const nameB = (b.name || "").replace(/^(The|A|An)\s+/i, "");
          return nameA.localeCompare(nameB);
        })
        .map(
          (leitner) =>
            `<option value="${leitner.id}">${
              leitner.name || "Unnamed Book"
            }</option>`
        )
        .join("");
  }
}

function addSelectedNPCsToLocation() {
  const select = document.getElementById("locationNPCsSelect");
  if (!select) return;

  const selectedOptions = Array.from(select.selectedOptions);
  const npcsList = typeof npcs !== "undefined" ? npcs : [];

  selectedOptions.forEach((option) => {
    const npcId = parseInt(option.value);
    if (npcId) {
      const npc = npcsList.find((n) => n.id === npcId);
      if (npc) {
        tempLocationNPCs.push({ id: npc.id, name: npc.name, data: npc });
      }
    }
  });

  updateLocationNPCsList();
  populateLocationNPCsSelect(); // Refresh dropdown to show remaining options
}

function addSelectedEnemiesToLocation() {
  const select = document.getElementById("locationEnemiesSelect");
  if (!select) return;

  const selectedOptions = Array.from(select.selectedOptions);
  const enemiesList = typeof customEnemies !== "undefined" ? customEnemies : [];

  // Allow adding same enemy multiple times (duplicates are allowed)
  selectedOptions.forEach((option) => {
    const enemyId = parseInt(option.value);
    if (enemyId) {
      const enemy = enemiesList.find((e) => e.id === enemyId);
      if (enemy) {
        // Create unique instance with timestamp for each addition
        tempLocationEnemies.push({
          id: Date.now() + Math.random(), // Unique instance ID
          sourceId: enemy.id, // Original enemy ID
          name: enemy.name,
          data: enemy,
        });
      }
    }
  });

  updateLocationEnemiesList();
  select.selectedIndex = 0; // Reset selection
}

function addSelectedArtefactsToLocation() {
  const select = document.getElementById("locationArtefactsSelect");
  if (!select) return;

  const selectedOptions = Array.from(select.selectedOptions);
  const artefactsList =
    typeof customArtefacts !== "undefined" ? customArtefacts : [];

  selectedOptions.forEach((option) => {
    const artefactId = parseInt(option.value);
    if (artefactId) {
      const artefact = artefactsList.find((a) => a.id === artefactId);
      if (artefact) {
        tempLocationArtefacts.push({
          id: artefact.id,
          name: artefact.name,
          data: artefact,
        });
      }
    }
  });

  updateLocationArtefactsList();
  populateLocationArtefactsSelect(); // Refresh dropdown to show remaining options
}

function addSelectedLeitnersToLocation() {
  const select = document.getElementById("locationLeitnersSelect");
  if (!select) return;

  const selectedOptions = Array.from(select.selectedOptions);
  const leitnersList =
    typeof customLeitners !== "undefined" ? customLeitners : [];

  selectedOptions.forEach((option) => {
    const leitnerId = parseInt(option.value);
    if (leitnerId) {
      const leitner = leitnersList.find((l) => l.id === leitnerId);
      if (leitner) {
        tempLocationLeitners.push({
          id: leitner.id,
          name: leitner.name,
          data: leitner,
        });
      }
    }
  });

  updateLocationLeitnersList();
  populateLocationLeitnersSelect(); // Refresh dropdown to show remaining options
}

function removeLocationNPC(id) {
  tempLocationNPCs = tempLocationNPCs.filter((npc) => npc.id !== id);
  updateLocationNPCsList();
  populateLocationNPCsSelect(); // Refresh dropdown to show removed item
}

function updateLocationNPCsList() {
  const container = document.getElementById("locationNPCsList");
  if (!container) return;

  if (tempLocationNPCs.length === 0) {
    container.innerHTML =
      '<p style="color: #888; font-size: 0.9em;">No NPCs added yet</p>';
    return;
  }

  container.innerHTML = tempLocationNPCs
    .map((npc) => {
      const role = npc.data?.role || "";
      const affiliation = npc.data?.affiliation || "";
      const subtitle = [role, affiliation].filter((s) => s).join(" • ");

      return `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: rgba(76, 175, 80, 0.1); border: 1px solid #4CAF50; border-radius: 4px; margin-bottom: 8px;">
      <div style="flex: 1;">
        <div style="color: #4CAF50; font-weight: bold;">${npc.name}</div>
        ${
          subtitle
            ? `<div style="color: #888; font-size: 0.85em; margin-top: 2px;">${subtitle}</div>`
            : ""
        }
      </div>
      <button onclick="removeLocationNPC(${
        npc.id
      })" style="background: rgba(244, 67, 54, 0.2); border: 1px solid #f44336; color: #ef5350; padding: 4px 8px; border-radius: 3px; cursor: pointer;">✕</button>
    </div>
  `;
    })
    .join("");
}

function removeLocationEnemy(id) {
  tempLocationEnemies = tempLocationEnemies.filter((enemy) => enemy.id !== id);
  updateLocationEnemiesList();
}

function updateLocationEnemiesList() {
  const container = document.getElementById("locationEnemiesList");
  if (!container) return;

  if (tempLocationEnemies.length === 0) {
    container.innerHTML =
      '<p style="color: #888; font-size: 0.9em;">No enemies added yet</p>';
    return;
  }

  container.innerHTML = tempLocationEnemies
    .map(
      (enemy) => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: rgba(244, 67, 54, 0.1); border: 1px solid #f44336; border-radius: 4px; margin-bottom: 8px;">
      <div style="flex: 1; color: #f44336; font-weight: bold;">${enemy.name}</div>
      <button onclick="removeLocationEnemy(${enemy.id})" style="background: rgba(244, 67, 54, 0.2); border: 1px solid #f44336; color: #ef5350; padding: 4px 8px; border-radius: 3px; cursor: pointer;">✕</button>
    </div>
  `
    )
    .join("");
}

function removeLocationArtefact(id) {
  tempLocationArtefacts = tempLocationArtefacts.filter(
    (artefact) => artefact.id !== id
  );
  updateLocationArtefactsList();
  populateLocationArtefactsSelect(); // Refresh dropdown to show removed item
}

function updateLocationArtefactsList() {
  const container = document.getElementById("locationArtefactsList");
  if (!container) return;

  if (tempLocationArtefacts.length === 0) {
    container.innerHTML =
      '<p style="color: #888; font-size: 0.9em;">No artefacts added yet</p>';
    return;
  }

  container.innerHTML = tempLocationArtefacts
    .map(
      (artefact) => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: rgba(255, 152, 0, 0.1); border: 1px solid #FF9800; border-radius: 4px; margin-bottom: 8px;">
      <div style="flex: 1; color: #FF9800; font-weight: bold;">${artefact.name}</div>
      <button onclick="removeLocationArtefact(${artefact.id})" style="background: rgba(244, 67, 54, 0.2); border: 1px solid #f44336; color: #ef5350; padding: 4px 8px; border-radius: 3px; cursor: pointer;">✕</button>
    </div>
  `
    )
    .join("");
}

function removeLocationLeitner(id) {
  tempLocationLeitners = tempLocationLeitners.filter(
    (leitner) => leitner.id !== id
  );
  updateLocationLeitnersList();
  populateLocationLeitnersSelect(); // Refresh dropdown to show removed item
}

function updateLocationLeitnersList() {
  const container = document.getElementById("locationLeitnersList");
  if (!container) return;

  if (tempLocationLeitners.length === 0) {
    container.innerHTML =
      '<p style="color: #888; font-size: 0.9em;">No Leitner books added yet</p>';
    return;
  }

  container.innerHTML = tempLocationLeitners
    .map(
      (leitner) => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: rgba(156, 39, 176, 0.1); border: 1px solid #9C27B0; border-radius: 4px; margin-bottom: 8px;">
      <div style="flex: 1; color: #9C27B0; font-weight: bold;">${leitner.name}</div>
      <button onclick="removeLocationLeitner(${leitner.id})" style="background: rgba(244, 67, 54, 0.2); border: 1px solid #f44336; color: #ef5350; padding: 4px 8px; border-radius: 3px; cursor: pointer;">✕</button>
    </div>
  `
    )
    .join("");
}

// ==================== SAVE LOCATION ==================== //
function saveCustomLocation() {
  const name = document.getElementById("customLocationName")?.value.trim();
  const address = document
    .getElementById("customLocationAddress")
    ?.value.trim();
  const description = document
    .getElementById("customLocationDescription")
    ?.value.trim();
  const equipment = document
    .getElementById("customLocationEquipment")
    ?.value.trim();
  const supernatural = document
    .getElementById("customLocationSupernatural")
    ?.value.trim();
  const gmNotes = document
    .getElementById("customLocationGMNotes")
    ?.value.trim();

  if (!name) {
    alert("Please enter a location name.");
    return;
  }

  const location = {
    id: editingLocationId || Date.now(),
    name: name,
    address: address || undefined,
    description: description || undefined,
    npcs: tempLocationNPCs.length > 0 ? [...tempLocationNPCs] : undefined,
    enemies:
      tempLocationEnemies.length > 0 ? [...tempLocationEnemies] : undefined,
    artefacts:
      tempLocationArtefacts.length > 0 ? [...tempLocationArtefacts] : undefined,
    leitners:
      tempLocationLeitners.length > 0 ? [...tempLocationLeitners] : undefined,
    equipment: equipment || undefined,
    supernatural: supernatural || undefined,
    gmNotes: gmNotes || undefined,
  };

  if (editingLocationId) {
    const index = customLocations.findIndex((l) => l.id === editingLocationId);
    if (index !== -1) {
      customLocations[index] = location;
    }
    editingLocationId = null;
  } else {
    customLocations.push(location);
  }

  saveCustomLocations();
  clearCustomLocationForm();
  renderCustomLocations();

  const form = document.getElementById("customLocationForm");
  if (form) form.open = false;

  alert(`Location "${name}" saved successfully!`);
}

// ==================== EDIT LOCATION ==================== //
function editCustomLocation(id) {
  const location = customLocations.find((l) => l.id === id);
  if (!location) return;

  editingLocationId = id;

  document.getElementById("customLocationName").value = location.name || "";
  document.getElementById("customLocationAddress").value =
    location.address || "";
  document.getElementById("customLocationDescription").value =
    location.description || "";
  document.getElementById("customLocationEquipment").value =
    location.equipment || "";
  document.getElementById("customLocationSupernatural").value =
    location.supernatural || "";
  document.getElementById("customLocationGMNotes").value =
    location.gmNotes || "";

  tempLocationNPCs = location.npcs ? [...location.npcs] : [];
  tempLocationEnemies = location.enemies ? [...location.enemies] : [];
  tempLocationArtefacts = location.artefacts ? [...location.artefacts] : [];
  tempLocationLeitners = location.leitners ? [...location.leitners] : [];

  updateLocationNPCsList();
  updateLocationEnemiesList();
  updateLocationArtefactsList();
  updateLocationLeitnersList();

  const formTitle = document.getElementById("customLocationFormTitle");
  if (formTitle) formTitle.textContent = "Edit Location";

  const form = document.getElementById("customLocationForm");
  if (form) {
    form.style.display = "block";
    form.scrollIntoView({ behavior: "smooth", block: "nearest" });
    // Populate the selects when editing
    populateLocationNPCsSelect();
    populateLocationEnemiesSelect();
    populateLocationArtefactsSelect();
    populateLocationLeitnersSelect();
  }
}

// ==================== DELETE LOCATION ==================== //
function deleteCustomLocation(id) {
  const location = customLocations.find((l) => l.id === id);
  if (!location) return;

  if (!confirm(`Delete location "${location.name}"?`)) return;

  customLocations = customLocations.filter((l) => l.id !== id);
  saveCustomLocations();
  renderCustomLocations();
}

// ==================== FILTERING ==================== //
function filterCustomLocations() {
  customLocationsFilters.name =
    document.getElementById("customLocationSearchName")?.value.toLowerCase() ||
    "";
  customLocationsFilters.type =
    document.getElementById("customLocationFilterType")?.value || "";
  renderCustomLocations();
}

function clearCustomLocationsFilters() {
  const nameInput = document.getElementById("customLocationSearchName");
  const typeSelect = document.getElementById("customLocationFilterType");

  if (nameInput) nameInput.value = "";
  if (typeSelect) typeSelect.selectedIndex = 0;

  customLocationsFilters = { name: "", type: "" };
  renderCustomLocations();
}

// ==================== RENDERING ==================== //
function renderCustomLocations() {
  console.log("=== renderCustomLocations called ===");
  console.log("customLocations:", customLocations);

  // Clear previous popup data
  window.entityPopupData = {};
  console.log("Cleared previous popup data");

  const container = document.getElementById("customLocationsContainer");
  console.log("Container found:", !!container);

  if (!container) {
    console.error("customLocationsContainer not found!");
    return;
  }

  if (customLocations.length === 0) {
    container.innerHTML =
      '<p style="color: #888; text-align: center; padding: 20px;">No locations created yet.</p>';
    return;
  }

  let filtered = customLocations;

  // Apply name filter
  if (customLocationsFilters.name) {
    filtered = filtered.filter(
      (location) =>
        location.name.toLowerCase().includes(customLocationsFilters.name) ||
        (location.address &&
          location.address
            .toLowerCase()
            .includes(customLocationsFilters.name)) ||
        (location.description &&
          location.description
            .toLowerCase()
            .includes(customLocationsFilters.name))
    );
  }

  // Apply type filter
  if (customLocationsFilters.type) {
    filtered = filtered.filter((location) => {
      switch (customLocationsFilters.type) {
        case "hasNPCs":
          return location.npcs && location.npcs.length > 0;
        case "hasEnemies":
          return location.enemies && location.enemies.length > 0;
        case "hasArtefacts":
          return location.artefacts && location.artefacts.length > 0;
        case "hasLeitners":
          return location.leitners && location.leitners.length > 0;
        case "hasSupernatural":
          return (
            location.supernatural && location.supernatural.trim().length > 0
          );
        default:
          return true;
      }
    });
  }

  if (filtered.length === 0) {
    container.innerHTML =
      '<p style="color: #888; text-align: center; padding: 20px;">No locations found matching filters.</p>';
    return;
  }

  // Sort alphabetically by name, ignoring "The", "A", "An" prefix
  filtered.sort((a, b) => {
    const nameA = (a.name || "").replace(/^(The|A|An)\s+/i, "");
    const nameB = (b.name || "").replace(/^(The|A|An)\s+/i, "");
    return nameA.localeCompare(nameB);
  });

  container.innerHTML =
    `<div style="color: #888; margin-bottom: 15px; font-size: 0.9em;">Showing ${filtered.length} of ${customLocations.length} locations</div>` +
    filtered
      .map(
        (location) => `
      <details style="margin-bottom: 10px; background: rgba(0,0,0,0.3); border-radius: 6px; border: 1px solid #4CAF50;">
        <summary style="padding: 12px; cursor: pointer; font-weight: bold; color: #4CAF50;">
          ${location.name}
          ${
            location.address
              ? `<span style="color: #888; font-weight: normal; margin-left: 10px; font-size: 0.9em;">📍 ${location.address}</span>`
              : ""
          }
        </summary>
        <div style="padding: 15px; border-top: 1px solid rgba(76, 175, 80, 0.3);">
          ${
            location.description
              ? `<p style="margin-bottom: 12px; color: #ccc; white-space: pre-wrap;">${location.description}</p>`
              : ""
          }
          
          ${
            location.npcs && location.npcs.length > 0
              ? `
            <div style="margin-bottom: 12px; padding: 10px; background: rgba(76, 175, 80, 0.1); border-left: 3px solid #4CAF50; border-radius: 4px;">
              <strong style="color: #4CAF50;">NPCs:</strong>
              ${location.npcs
                .map((npc, index) => {
                  const role = npc.data?.role || "";
                  const affiliation = npc.data?.affiliation || "";
                  const subtitle = [role, affiliation]
                    .filter((s) => s)
                    .join(" • ");
                  const dataId =
                    "npc_" +
                    location.id +
                    "_" +
                    index +
                    "_" +
                    Math.random().toString(36).substr(2, 9);
                  window.entityPopupData[dataId] = npc.data || {};
                  return `
                  <div style="margin-bottom: 8px;">
                    <div style="color: #66bb6a; font-weight: bold;">
                      • <span class="entity-clickable" onclick='showEntityPopup("npc", "${dataId}", "npcs")'>${
                    npc.name
                  }</span>
                    </div>
                    ${
                      subtitle
                        ? `<div style="color: #888; font-size: 0.85em; margin-left: 15px;">${subtitle}</div>`
                        : ""
                    }
                  </div>
                `;
                })
                .join("")}
              </div>
            </div>
          `
              : ""
          }
          
          ${
            location.enemies && location.enemies.length > 0
              ? `
            <div style="margin-bottom: 12px; padding: 10px; background: rgba(244, 67, 54, 0.1); border-left: 3px solid #f44336; border-radius: 4px;">
              <strong style="color: #f44336;">Enemies:</strong>
              ${location.enemies
                .map((enemy, index) => {
                  const dataId =
                    "enemy_" +
                    location.id +
                    "_" +
                    index +
                    "_" +
                    Math.random().toString(36).substr(2, 9);
                  window.entityPopupData[dataId] = enemy.data || {};
                  return `
                  <div style="margin-bottom: 6px;">
                    <div style="color: #ef5350; font-weight: bold;">
                      • <span class="entity-clickable" onclick='showEntityPopup("enemy", "${dataId}", "bestiary")'>${
                    enemy.name
                  }</span>
                    </div>
                    ${
                      enemy.location
                        ? `<div style="color: #888; font-size: 0.85em; margin-left: 15px;">📍 ${enemy.location}</div>`
                        : ""
                    }
                  </div>
                `;
                })
                .join("")}
              </div>
            </div>
          `
              : ""
          }
          
          ${
            location.artefacts && location.artefacts.length > 0
              ? `
            <div style="margin-bottom: 12px; padding: 10px; background: rgba(255, 152, 0, 0.1); border-left: 3px solid #ff9800; border-radius: 4px;">
              <strong style="color: #ff9800;">Artefacts:</strong>
              ${location.artefacts
                .map((artefact, index) => {
                  const dataId =
                    "artefact_" +
                    location.id +
                    "_" +
                    index +
                    "_" +
                    Math.random().toString(36).substr(2, 9);
                  window.entityPopupData[dataId] = artefact.data || {};
                  return `
                  <div style="margin-bottom: 6px;">
                    <div style="color: #ffb74d; font-weight: bold;">
                      • <span class="entity-clickable" onclick='showEntityPopup("artefact", "${dataId}", "artefacts")'>${
                    artefact.name
                  }</span>
                    </div>
                    ${
                      artefact.location
                        ? `<div style="color: #888; font-size: 0.85em; margin-left: 15px;">📍 ${artefact.location}</div>`
                        : ""
                    }
                  </div>
                `;
                })
                .join("")}
              </div>
            </div>
          `
              : ""
          }
          
          ${
            location.leitners && location.leitners.length > 0
              ? `
            <div style="margin-bottom: 12px; padding: 10px; background: rgba(156, 39, 176, 0.1); border-left: 3px solid #9C27B0; border-radius: 4px;">
              <strong style="color: #9C27B0;">Leitner Books:</strong>
              ${location.leitners
                .map((leitner, index) => {
                  const dataId =
                    "leitner_" +
                    location.id +
                    "_" +
                    index +
                    "_" +
                    Math.random().toString(36).substr(2, 9);
                  window.entityPopupData[dataId] = leitner.data || {};
                  return `
                  <div style="margin-bottom: 6px;">
                    <div style="color: #BA68C8; font-weight: bold;">
                      • <span class="entity-clickable" onclick='showEntityPopup("leitner", "${dataId}", "artefacts")'>${
                    leitner.name
                  }</span>
                    </div>
                    ${
                      leitner.location
                        ? `<div style="color: #888; font-size: 0.85em; margin-left: 15px;">📍 ${leitner.location}</div>`
                        : ""
                    }
                  </div>
                `;
                })
                .join("")}
              </div>
            </div>
          `
              : ""
          }
          
          ${
            location.equipment
              ? `
            <div style="margin-bottom: 12px; padding: 10px; background: rgba(158, 158, 158, 0.1); border-left: 3px solid #9e9e9e; border-radius: 4px;">
              <strong style="color: #9e9e9e;">Equipment & Items:</strong> <span style="color: #ccc; white-space: pre-wrap;">${location.equipment}</span>
            </div>
          `
              : ""
          }
          
          ${
            location.supernatural
              ? `
            <div style="margin-bottom: 12px; padding: 10px; background: rgba(156, 39, 176, 0.15); border-left: 3px solid #9C27B0; border-radius: 4px;">
              <strong style="color: #9C27B0;">Supernatural Effects:</strong> <span style="color: #ccc; white-space: pre-wrap;">${location.supernatural}</span>
            </div>
          `
              : ""
          }
          
          ${
            location.gmNotes
              ? `
            <div style="margin-bottom: 8px; padding: 10px; background: rgba(255, 235, 59, 0.05); border-left: 3px solid #FDD835; border-radius: 4px;">
              <strong style="color: #FDD835;">GM Notes:</strong> <span style="color: #ccc; white-space: pre-wrap;">${location.gmNotes}</span>
            </div>
          `
              : ""
          }
          
          <div style="display: flex; gap: 10px; margin-top: 15px;">
            <button class="button" onclick="editCustomLocation(${
              location.id
            })" style="flex: 1; background: rgba(33, 150, 243, 0.2); border-color: #2196F3; color: #64B5F6;">✏️ Edit</button>
            <button class="button" onclick="deleteCustomLocation(${
              location.id
            })" style="flex: 1; background: rgba(244, 67, 54, 0.2); border-color: #f44336; color: #ef5350;">🗑️ Delete</button>
          </div>
        </div>
      </details>
    `
      )
      .join("");
}

// ==================== JSON IMPORT/EXPORT ==================== //
function exportLocationsJSON() {
  if (customLocations.length === 0) {
    alert("No locations to export. Create some locations first!");
    return;
  }

  const dataStr = JSON.stringify(customLocations, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `locations-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  alert(`Exported ${customLocations.length} locations to JSON file!`);
}

function importLocationsJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);

      if (!Array.isArray(imported)) {
        alert("Invalid JSON format. Expected an array of locations.");
        return;
      }

      const validLocations = imported.filter((location) => location.name);

      if (validLocations.length === 0) {
        alert("No valid locations found. Each needs a 'name' field.");
        return;
      }

      let shouldMerge = false;
      if (customLocations.length > 0) {
        shouldMerge = confirm(
          `You have ${customLocations.length} existing locations.\n\n` +
            `Click OK to ADD ${validLocations.length} new locations.\n` +
            `Click Cancel to REPLACE all existing locations.`
        );
      }

      if (shouldMerge) {
        const maxId = customLocations.reduce(
          (max, l) => Math.max(max, l.id || 0),
          0
        );
        validLocations.forEach((location, index) => {
          location.id = maxId + index + 1;
          customLocations.push(location);
        });
      } else {
        customLocations = validLocations.map((location, index) => ({
          ...location,
          id: index + 1,
        }));
      }

      saveCustomLocations();
      clearCustomLocationsFilters();
      renderCustomLocations();

      alert(
        `Successfully imported ${validLocations.length} locations!${
          imported.length !== validLocations.length
            ? `\n(${
                imported.length - validLocations.length
              } entries skipped due to missing required fields)`
            : ""
        }`
      );
      event.target.value = "";
    } catch (error) {
      alert(`Error reading JSON file: ${error.message}`);
    }
  };

  reader.readAsText(file);
}

function downloadLocationsTemplate() {
  const template = [
    {
      name: "Example Location Name",
      address: "123 Example Street, London",
      description:
        "A detailed description of the location's appearance, atmosphere, history, and notable features. Include sensory details and anything that would help players visualize the space.",
      npcs: [
        {
          name: "Example NPC Name",
          location: "Reception desk, front entrance",
        },
        {
          name: "Another NPC",
          location: "Office on second floor",
        },
      ],
      enemies: [
        {
          name: "Example Enemy",
          location: "Basement, trapped behind locked door",
        },
      ],
      artefacts: [
        {
          name: "Example Artefact",
          location: "Hidden in a secret compartment in the library",
        },
      ],
      leitners: [
        {
          name: "Example Leitner Book",
          location: "On the top shelf, covered in dust",
        },
      ],
      equipment:
        "List general items and equipment that can be found here:\n- First aid kit in the bathroom\n- Flashlights in the utility closet\n- Old records in the filing cabinets\n- Keys to various rooms in the receptionist's desk",
      supernatural:
        "Describe any Entity influence, paranormal phenomena, or reality distortions present at this location. Include any ongoing effects, manifestations, or dangers that investigators might encounter.",
      gmNotes:
        "Optional: Add any private GM notes about using this location in your campaign, plot hooks, secrets, or reminders.",
    },
  ];

  const dataStr = JSON.stringify(template, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "locations-template.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  alert(
    "Downloaded locations template! Edit this file with your own locations and upload it using the 'Upload JSON' button."
  );
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeLocations);
} else {
  initializeLocations();
}
