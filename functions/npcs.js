// Magnus Archives GM Tool - NPC Management
console.log("==== NPCS.JS FILE IS LOADING ====");

let npcs = [];
let isEditingNPC = false;
let editingNPCId = null;

const NPC_ENTITIES = [
  "The Buried",
  "The Corruption",
  "The Dark",
  "The Desolation",
  "The End",
  "The Eye",
  "The Flesh",
  "The Hunt",
  "The Lonely",
  "The Slaughter",
  "The Spiral",
  "The Stranger",
  "The Vast",
  "The Web",
];

// ===== FUNCTION DECLARATIONS =====

var showNPCForm = function () {
  const form = document.getElementById("npcCreatorForm");
  if (form) {
    form.style.display = form.style.display === "none" ? "block" : "none";
    if (form.style.display === "block") {
      // Reset form when opening
      clearNPCForm();
    }
  }
};
window.showNPCForm = showNPCForm;

var clearNPCForm = function () {
  document.getElementById("npcFormName").value = "";
  document.getElementById("npcFormLevel").value = "1";
  document.getElementById("npcFormHealth").value = "10";
  document.getElementById("npcFormDamage").value = "3 points";
  document.getElementById("npcFormRole").value = "";
  document.getElementById("npcFormAffiliation").value = "";
  document.getElementById("npcFormDescription").value = "";
  document.getElementById("npcFormAbilities").value = "";
  document.getElementById("npcFormGMNotes").value = "";

  // Clear entity selection
  window.npcFormSelectedEntities = [];
  updateNPCFormEntityDisplay();

  isEditingNPC = false;
  editingNPCId = null;

  const submitBtn = document.getElementById("npcFormSubmit");
  if (submitBtn) {
    submitBtn.textContent = "Save NPC";
  }
};
window.clearNPCForm = clearNPCForm;

var saveNPCFromForm = function () {
  const name = document.getElementById("npcFormName")?.value.trim();
  const level = parseInt(document.getElementById("npcFormLevel")?.value) || 1;
  const health =
    parseInt(document.getElementById("npcFormHealth")?.value) || 10;
  const damage =
    document.getElementById("npcFormDamage")?.value.trim() || "3 points";
  const role = document.getElementById("npcFormRole")?.value.trim() || "";
  const affiliation =
    document.getElementById("npcFormAffiliation")?.value.trim() || "";
  const description =
    document.getElementById("npcFormDescription")?.value.trim() || "";
  const abilities =
    document.getElementById("npcFormAbilities")?.value.trim() || "";
  const gmNotes = document.getElementById("npcFormGMNotes")?.value.trim() || "";
  const entities = window.npcFormSelectedEntities || [];

  if (!name) {
    alert("Please enter an NPC name.");
    return;
  }

  if (isEditingNPC && editingNPCId) {
    // Update existing NPC
    const npc = npcs.find((n) => n.id === editingNPCId);
    if (npc) {
      npc.name = name;
      npc.level = level;
      npc.health = health;
      npc.damage = damage;
      npc.role = role;
      npc.affiliation = affiliation;
      npc.description = description;
      npc.entity = entities;
      npc.abilities = abilities;
      npc.gmNotes = gmNotes;
    }
  } else {
    // Create new NPC
    const npc = {
      id: Date.now(),
      name,
      favourite: false,
      level,
      health,
      damage,
      role,
      affiliation,
      description,
      entity: entities,
      abilities,
      gmNotes,
    };
    npcs.push(npc);
  }

  saveNPCData();
  renderNPCList();
  clearNPCForm();

  // Hide form after saving
  const form = document.getElementById("npcCreatorForm");
  if (form) form.style.display = "none";
};
window.saveNPCFromForm = saveNPCFromForm;

var editNPC = function (id) {
  const npc = npcs.find((n) => n.id === id);
  if (!npc) return;

  // Populate form
  document.getElementById("npcFormName").value = npc.name || "";
  document.getElementById("npcFormLevel").value = npc.level || 1;
  document.getElementById("npcFormHealth").value = npc.health || 10;
  document.getElementById("npcFormDamage").value = npc.damage || "3 points";
  document.getElementById("npcFormRole").value = npc.role || "";
  document.getElementById("npcFormAffiliation").value = npc.affiliation || "";
  document.getElementById("npcFormDescription").value = npc.description || "";
  document.getElementById("npcFormAbilities").value = npc.abilities || "";
  document.getElementById("npcFormGMNotes").value = npc.gmNotes || "";

  // Set entity selection
  window.npcFormSelectedEntities = npc.entity || [];
  updateNPCFormEntityDisplay();

  isEditingNPC = true;
  editingNPCId = id;

  const submitBtn = document.getElementById("npcFormSubmit");
  if (submitBtn) {
    submitBtn.textContent = "Update NPC";
  }

  // Show form
  const form = document.getElementById("npcCreatorForm");
  if (form) form.style.display = "block";

  // Scroll to form
  form.scrollIntoView({ behavior: "smooth", block: "start" });
};
window.editNPC = editNPC;

window.editNPC = editNPC;

var removeNPC = function (id) {
  if (confirm("Remove this NPC?")) {
    npcs = npcs.filter((n) => n.id !== id);
    saveNPCData();
    renderNPCList();
  }
};
window.removeNPC = removeNPC;

var toggleNPCFavourite = function (id) {
  const npc = npcs.find((n) => n.id === id);
  if (npc) {
    npc.favourite = !npc.favourite;
    saveNPCData();
    renderNPCList();
  }
};
window.toggleNPCFavourite = toggleNPCFavourite;

// Form entity management
var toggleNPCFormEntity = function (entity) {
  if (!window.npcFormSelectedEntities) {
    window.npcFormSelectedEntities = [];
  }

  const index = window.npcFormSelectedEntities.indexOf(entity);
  if (index > -1) {
    window.npcFormSelectedEntities.splice(index, 1);
  } else {
    window.npcFormSelectedEntities.push(entity);
  }

  updateNPCFormEntityDisplay();
};
window.toggleNPCFormEntity = toggleNPCFormEntity;

var removeNPCFormEntity = function (entity) {
  if (!window.npcFormSelectedEntities) {
    window.npcFormSelectedEntities = [];
  }

  window.npcFormSelectedEntities = window.npcFormSelectedEntities.filter(
    (e) => e !== entity
  );
  updateNPCFormEntityDisplay();
};
window.removeNPCFormEntity = removeNPCFormEntity;

var toggleNPCFormEntityDropdown = function () {
  const dropdown = document.getElementById("npcFormEntityDropdown");
  const trigger = document.getElementById("npcFormEntityTrigger");

  if (!dropdown || !trigger) return;

  if (dropdown.style.display === "none") {
    dropdown.style.display = "block";
    trigger.classList.add("open");
  } else {
    dropdown.style.display = "none";
    trigger.classList.remove("open");
  }
};
window.toggleNPCFormEntityDropdown = toggleNPCFormEntityDropdown;

var updateNPCFormEntityDisplay = function () {
  const trigger = document.getElementById("npcFormEntityTrigger");
  const dropdown = document.getElementById("npcFormEntityDropdown");

  if (!trigger || !dropdown) return;

  const entities = window.npcFormSelectedEntities || [];

  // Update trigger display
  if (entities.length > 0) {
    trigger.innerHTML = entities
      .map(
        (e) => `
      <span class="multiselect-tag">
        ${e.replace("The ", "")}
        <span class="multiselect-tag-remove" onclick="event.stopPropagation(); removeNPCFormEntity('${e}')">×</span>
      </span>
    `
      )
      .join("");
  } else {
    trigger.innerHTML =
      '<span class="multiselect-placeholder">Select entities...</span>';
  }

  // Update dropdown checkboxes
  const options = dropdown.querySelectorAll(".multiselect-option");
  options.forEach((option) => {
    const entityValue = option.getAttribute("data-entity");
    const checkbox = option.querySelector('input[type="checkbox"]');

    if (entities.includes(entityValue)) {
      option.classList.add("selected");
      if (checkbox) checkbox.checked = true;
    } else {
      option.classList.remove("selected");
      if (checkbox) checkbox.checked = false;
    }
  });
};
window.updateNPCFormEntityDisplay = updateNPCFormEntityDisplay;

// Search and filter functionality
var filterNPCs = function () {
  const searchTerm =
    document.getElementById("npcSearch")?.value.toLowerCase() || "";
  const entityFilter = document.getElementById("npcFilterEntity")?.value || "";
  const levelFilter = document.getElementById("npcFilterLevel")?.value || "";
  const affiliationFilter =
    document.getElementById("npcFilterAffiliation")?.value || "";
  const sortBy = document.getElementById("npcSortBy")?.value || "name";

  renderNPCList(
    searchTerm,
    entityFilter,
    levelFilter,
    affiliationFilter,
    sortBy
  );
};
window.filterNPCs = filterNPCs;

var clearNPCFilters = function () {
  document.getElementById("npcSearch").value = "";
  document.getElementById("npcFilterEntity").value = "";
  document.getElementById("npcFilterLevel").value = "";
  document.getElementById("npcFilterAffiliation").value = "";
  document.getElementById("npcSortBy").value = "name";
  filterNPCs();
};
window.clearNPCFilters = clearNPCFilters;

var populateNPCAffiliationFilter = function () {
  const affiliationSelect = document.getElementById("npcFilterAffiliation");
  if (!affiliationSelect) return;

  // Get unique affiliations from all NPCs
  const affiliations = [
    ...new Set(npcs.map((npc) => npc.affiliation).filter((a) => a)),
  ].sort();

  // Keep the "All Affiliations" option and add the rest
  const currentValue = affiliationSelect.value;
  affiliationSelect.innerHTML = '<option value="">All Affiliations</option>';
  affiliations.forEach((affiliation) => {
    const option = document.createElement("option");
    option.value = affiliation;
    option.textContent = affiliation;
    affiliationSelect.appendChild(option);
  });
  affiliationSelect.value = currentValue;
};
window.populateNPCAffiliationFilter = populateNPCAffiliationFilter;

// Deprecated - keeping for backwards compatibility
var searchNPCs = function () {
  filterNPCs();
};
window.searchNPCs = searchNPCs;
window.removeNPC = removeNPC;

var updateNPC = function (id, field, value) {
  const npc = npcs.find((n) => n.id === id);
  if (npc) {
    npc[field] = value;
    saveNPCData();
  }
};
window.updateNPC = updateNPC;

var toggleNPCFavourite = function (id) {
  const npc = npcs.find((n) => n.id === id);
  if (npc) {
    npc.favourite = !npc.favourite;
    renderNPCList();
    saveNPCData();
  }
};
window.toggleNPCFavourite = toggleNPCFavourite;

var getSelectedEntities = function (id) {
  const npc = npcs.find((n) => n.id === id);
  return npc ? npc.entity || [] : [];
};
window.getSelectedEntities = getSelectedEntities;

var updateNPCEntities = function (id, entities) {
  const npc = npcs.find((n) => n.id === id);
  if (npc) {
    npc.entity = entities;
    saveNPCData();
    renderNPCList();
  }
};
window.updateNPCEntities = updateNPCEntities;

window.searchNPCs = searchNPCs;

var renderNPCList = function (
  searchTerm = "",
  entityFilter = "",
  levelFilter = "",
  affiliationFilter = "",
  sortBy = "name"
) {
  const container = document.getElementById("npcsContainer");
  if (!container) return;

  // Update affiliation dropdown with current NPCs
  populateNPCAffiliationFilter();

  let filteredNPCs = npcs;

  // Apply search filter
  if (searchTerm) {
    filteredNPCs = filteredNPCs.filter(
      (npc) =>
        (npc.name || "").toLowerCase().includes(searchTerm) ||
        (npc.affiliation || "").toLowerCase().includes(searchTerm) ||
        (npc.description || "").toLowerCase().includes(searchTerm)
    );
  }

  // Apply entity filter
  if (entityFilter) {
    filteredNPCs = filteredNPCs.filter((npc) =>
      (npc.entity || []).includes(entityFilter)
    );
  }

  // Apply level filter
  if (levelFilter) {
    filteredNPCs = filteredNPCs.filter(
      (npc) => npc.level === parseInt(levelFilter)
    );
  }

  // Apply affiliation filter
  if (affiliationFilter) {
    filteredNPCs = filteredNPCs.filter(
      (npc) => npc.affiliation === affiliationFilter
    );
  }

  // Apply sorting
  filteredNPCs.sort((a, b) => {
    switch (sortBy) {
      case "name":
        const nameA = (a.name || "").replace(/^(The|A|An)\s+/i, "");
        const nameB = (b.name || "").replace(/^(The|A|An)\s+/i, "");
        return nameA.localeCompare(nameB);
      case "name-desc":
        const nameADesc = (a.name || "").replace(/^(The|A|An)\s+/i, "");
        const nameBDesc = (b.name || "").replace(/^(The|A|An)\s+/i, "");
        return nameBDesc.localeCompare(nameADesc);
      case "level-asc":
        return (a.level || 0) - (b.level || 0);
      case "level-desc":
        return (b.level || 0) - (a.level || 0);
      case "affiliation":
        return (a.affiliation || "").localeCompare(b.affiliation || "");
      case "affiliation-desc":
        return (b.affiliation || "").localeCompare(a.affiliation || "");
      default:
        return 0;
    }
  });

  if (filteredNPCs.length === 0) {
    container.innerHTML =
      '<p style="color: #888; text-align: center; padding: 20px;">No NPCs found.</p>';
    return;
  }

  container.innerHTML = filteredNPCs
    .map(
      (npc) => `
    <details style="margin-bottom: 10px; background: rgba(0,0,0,0.3); border-radius: 6px; border: 1px solid ${
      npc.favourite ? "#ff9800" : "#66bb6a"
    };">
      <summary style="padding: 12px; cursor: pointer; font-weight: bold; color: ${
        npc.favourite ? "#ff9800" : "#66bb6a"
      };">
        ${npc.favourite ? "★ " : ""}${npc.name || "Unnamed NPC"}
               ${
                 npc.role
                   ? `<span style="color: #888; font-weight: normal; margin-left: 10px; font-size: 0.9em;">• ${npc.role}</span>`
                   : ""
               }
        ${
          npc.affiliation
            ? `<span style="color: #ff9800; font-weight: semibold; font-size: 0.9em;">- ${npc.affiliation}</span>`
            : ""
        }
      </summary>
      <div style="padding: 15px; border-top: 1px solid rgba(102, 187, 106, 0.3);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-bottom: 15px; padding: 10px; background: rgba(102, 187, 106, 0.1); border-radius: 4px;">
          <div style="text-align: center;">
            <div style="color: #888; font-size: 0.85em; margin-bottom: 3px;">Level</div>
            <div style="color: #66bb6a; font-weight: bold; font-size: 1.1em;">${
              npc.level
            }</div>
          </div>
          <div style="text-align: center;">
            <div style="color: #888; font-size: 0.85em; margin-bottom: 3px;">Health</div>
            <div style="color: #66bb6a; font-weight: bold; font-size: 1.1em;">${
              npc.health
            }</div>
          </div>
          <div style="text-align: center;">
            <div style="color: #888; font-size: 0.85em; margin-bottom: 3px;">Damage</div>
            <div style="color: #66bb6a; font-weight: bold; font-size: 1.1em;">${
              npc.damage
            }</div>
          </div>
        </div>

        ${
          npc.role
            ? `<p style="margin-bottom: 8px;"><strong style="color: #66bb6a;">Role:</strong> ${npc.role}</p>`
            : ""
        }
        
        ${
          npc.affiliation
            ? `<p style="margin-bottom: 8px;"><strong style="color: #66bb6a;">Affiliation:</strong> ${npc.affiliation}</p>`
            : ""
        }
        
        ${
          npc.entity && npc.entity.length > 0
            ? `<p style="margin-bottom: 8px;"><strong style="color: #66bb6a;">Entity:</strong> ${npc.entity
                .map((e) => e.replace("The ", ""))
                .join(", ")}</p>`
            : ""
        }
        
        ${
          npc.description
            ? `<p style="margin-bottom: 8px;"><strong style="color: #66bb6a;">Description:</strong> ${npc.description}</p>`
            : ""
        }
        
        ${
          npc.abilities
            ? `<div style="margin-bottom: 8px;"><strong style="color: #66bb6a;">Abilities:</strong><div style="margin-top: 5px; padding-left: 10px;">${npc.abilities.replace(
                /\n/g,
                "<br>"
              )}</div></div>`
            : ""
        }
        
        ${
          npc.gmNotes
            ? `<div style="margin-bottom: 15px; padding: 10px; background: rgba(255, 152, 0, 0.1); border-left: 3px solid #ff9800; border-radius: 4px;"><strong style="color: #ff9800;">GM Notes:</strong><div style="margin-top: 5px; color: #ddd;">${npc.gmNotes.replace(
                /\n/g,
                "<br>"
              )}</div></div>`
            : ""
        }

        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 15px;">
          <button onclick="addNPCToCombat(${
            npc.id
          })" class="button" style="background: #4CAF50; color: #fff; padding: 6px 12px; flex: 1; min-width: 120px;">⚔️ Add to Combat</button>
          <button onclick="customizeNPCToken(${
            npc.id
          })" class="button" style="background: #9C27B0; color: #fff; padding: 6px 12px; flex: 1; min-width: 120px;">🎨 Token</button>
          <button onclick="editNPC(${
            npc.id
          })" class="button" style="background: #2196F3; color: #fff; padding: 6px 12px; flex: 1; min-width: 120px;">✏️ Edit</button>
          <button onclick="toggleNPCFavourite(${
            npc.id
          })" class="button" style="background: ${
        npc.favourite ? "#ff9800" : "#666"
      }; color: #fff; padding: 6px 12px; flex: 1; min-width: 120px;">${
        npc.favourite ? "★" : "☆"
      } Favourite</button>
          <button onclick="removeNPC(${
            npc.id
          })" class="button" style="background: #d32f2f; color: #fff; padding: 6px 12px; flex: 1; min-width: 120px;">🗑️ Delete</button>
        </div>
      </div>
    </details>
  `
    )
    .join("");

  saveNPCData();
};
window.renderNPCList = renderNPCList;

var addNPCToCombat = function (id) {
  if (typeof addNPCToCombatTracker === "function") {
    addNPCToCombatTracker(id);
    if (typeof switchToTab === "function") {
      switchToTab("encounters");
    }
  } else {
    alert("Combat tracker not available.");
  }
};
window.addNPCToCombat = addNPCToCombat;

var addFromBestiary = function () {
  alert(
    "Bestiary integration coming soon! For now, you can manually create NPCs based on the bestiary entries in the Bestiary tab."
  );
};
window.addFromBestiary = addFromBestiary;

var saveNPCData = function () {
  localStorage.setItem("gmTool_npcs", JSON.stringify(npcs));
};
window.saveNPCData = saveNPCData;

var loadNPCData = function () {
  const saved = localStorage.getItem("gmTool_npcs");
  if (saved) {
    npcs = JSON.parse(saved);
    renderNPCList();
  }
};
window.loadNPCData = loadNPCData;

console.log("All NPC functions assigned to window:", {
  addNPC: typeof window.addNPC,
  removeNPC: typeof window.removeNPC,
  updateNPC: typeof window.updateNPC,
});

// ===== INITIALIZATION =====

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  loadNPCData();
  renderNPCList();

  // Populate entity dropdown in form
  const dropdown = document.getElementById("npcFormEntityDropdown");
  if (dropdown) {
    NPC_ENTITIES.forEach((entity) => {
      const option = document.createElement("div");
      option.className = "multiselect-option";
      option.innerHTML = `<input type="checkbox" />${entity.replace(
        "The ",
        ""
      )}`;
      option.onclick = function (e) {
        e.stopPropagation();
        toggleNPCFormEntity(entity);
      };
      dropdown.appendChild(option);
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    const formDropdown = document.getElementById("npcFormEntityDropdown");
    if (formDropdown && !e.target.closest(".custom-multiselect")) {
      formDropdown.style.display = "none";
    }
  });
});

// ==================== JSON IMPORT/EXPORT ==================== //
var exportNPCsJSON = function () {
  if (npcs.length === 0) {
    alert("No NPCs to export. Create some NPCs first!");
    return;
  }

  const dataStr = JSON.stringify(npcs, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `npcs-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  alert(`Exported ${npcs.length} NPCs to JSON file!`);
};
window.exportNPCsJSON = exportNPCsJSON;

var importNPCsJSON = function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);

      if (!Array.isArray(imported)) {
        alert("Invalid JSON format. Expected an array of NPCs.");
        return;
      }

      const validNPCs = imported.filter((npc) => npc.name);

      if (validNPCs.length === 0) {
        alert("No valid NPCs found. Each needs a 'name' field.");
        return;
      }

      let shouldMerge = false;
      if (npcs.length > 0) {
        shouldMerge = confirm(
          `You have ${npcs.length} existing NPCs.\n\n` +
            `Click OK to ADD ${validNPCs.length} new NPCs.\n` +
            `Click Cancel to REPLACE all existing NPCs.`
        );
      }

      if (shouldMerge) {
        const maxId = npcs.reduce((max, n) => Math.max(max, n.id || 0), 0);
        validNPCs.forEach((npc, index) => {
          npc.id = maxId + Date.now() + index;
          npc.favourite = npc.favourite || false;
          npcs.push(npc);
        });
      } else {
        npcs = validNPCs.map((npc, index) => ({
          ...npc,
          id: Date.now() + index,
          favourite: npc.favourite || false,
        }));
      }

      saveNPCData();
      renderNPCList();

      alert(
        `Successfully imported ${validNPCs.length} NPCs!${
          imported.length !== validNPCs.length
            ? `\n(${
                imported.length - validNPCs.length
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
};
window.importNPCsJSON = importNPCsJSON;

var downloadNPCsTemplate = function () {
  const template = [
    {
      name: "Example NPC Name",
      level: 3,
      health: 15,
      damage: "4 points",
      role: "Merchant",
      affiliation: "The Magnus Institute",
      description:
        "A detailed description of the NPC's appearance, personality, and background. Include physical characteristics, mannerisms, and any notable features that would help identify them.",
      entity: ["The Eye"],
      abilities:
        "Special abilities or skills this NPC possesses:\n- Ability 1: Description\n- Ability 2: Description\n- Ability 3: Description",
      gmNotes:
        "Private notes for the GM about this character's role in the story, secrets they know, or plot hooks they're connected to.",
      favourite: false,
    },
    {
      name: "Another NPC",
      level: 5,
      health: 20,
      damage: "6 points",
      role: "Guard",
      affiliation: "The Hunt",
      description:
        "Another example NPC with different stats and characteristics.",
      entity: ["The Hunt", "The Slaughter"],
      abilities: "Enhanced tracking\nCombat expertise",
      gmNotes: "This NPC guards the entrance to the archives.",
      favourite: false,
    },
  ];

  const dataStr = JSON.stringify(template, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "npcs-template.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
window.downloadNPCsTemplate = downloadNPCsTemplate;
