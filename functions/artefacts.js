// Magnus Archives GM Tool - Artefacts Management

// Custom storage
let customArtefacts = [];
let editingArtefactId = null;

// ==================== CUSTOM ARTEFACTS ==================== //
function loadCustomArtefacts() {
  const saved = localStorage.getItem("gmTool_customArtefacts");
  if (saved) {
    try {
      customArtefacts = JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load custom artefacts:", e);
      customArtefacts = [];
    }
  }
}

function saveCustomArtefacts() {
  localStorage.setItem(
    "gmTool_customArtefacts",
    JSON.stringify(customArtefacts)
  );
}

function toggleCustomArtefactForm() {
  const form = document.getElementById("customArtefactForm");
  if (form) {
    const isHidden = form.style.display === "none" || !form.style.display;
    form.style.display = isHidden ? "block" : "none";
    if (isHidden) {
      document.getElementById("customArtefactName")?.focus();
    }
  }
}

// Custom multiselect functions for artefact entity selection
function toggleArtefactEntityDropdown() {
  const dropdown = document.getElementById("customArtefactEntityDropdown");
  if (dropdown) {
    dropdown.style.display =
      dropdown.style.display === "none" ? "block" : "none";
  }
}

function updateArtefactEntityDisplay() {
  const dropdown = document.getElementById("customArtefactEntityDropdown");
  const display = document.getElementById("customArtefactEntityDisplay");
  if (!dropdown || !display) return;

  const checkboxes = dropdown.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  const selected = Array.from(checkboxes).map((cb) => cb.value);

  if (selected.length === 0) {
    display.textContent = "Select Entity/Entities...";
    display.style.color = "#888";
  } else {
    display.textContent = selected.join(", ");
    display.style.color = "#e0e0e0";
  }
}

function getSelectedArtefactEntities() {
  const dropdown = document.getElementById("customArtefactEntityDropdown");
  if (!dropdown) return [];

  const checkboxes = dropdown.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  return Array.from(checkboxes).map((cb) => cb.value);
}

function populateCustomArtefactFilters() {
  const entityFilter = document.getElementById("customArtefactFilterEntity");
  if (entityFilter && customArtefacts.length > 0) {
    while (entityFilter.options.length > 1) {
      entityFilter.remove(1);
    }

    const allEntities = customArtefacts.flatMap((a) => {
      if (Array.isArray(a.relatedEntity)) {
        return a.relatedEntity;
      }
      return a.relatedEntity ? [a.relatedEntity] : [];
    });
    const entities = [...new Set(allEntities)].sort();
    entities.forEach((entity) => {
      const option = document.createElement("option");
      option.value = entity;
      option.textContent = entity;
      entityFilter.appendChild(option);
    });
  }
}

function saveCustomArtefact() {
  const name = document.getElementById("customArtefactName")?.value.trim();
  const level = document.getElementById("customArtefactLevel")?.value;
  const selectedEntities = getSelectedArtefactEntities();
  const description = document
    .getElementById("customArtefactDescription")
    ?.value.trim();
  const stressAmount = document.getElementById(
    "customArtefactStressAmount"
  )?.value;
  const stressWhen = document
    .getElementById("customArtefactStressWhen")
    ?.value.trim();
  const fear = document.getElementById("customArtefactFear")?.value.trim();
  const gmNotes = document
    .getElementById("customArtefactGMNotes")
    ?.value.trim();

  if (!name) {
    alert("Please enter an artefact name.");
    return;
  }

  const artefact = {
    id: editingArtefactId || Date.now(),
    name: name,
    level: level ? (level.includes("d") ? level : parseInt(level)) : undefined,
    relatedEntity: selectedEntities.length > 0 ? selectedEntities : undefined,
    description: description || undefined,
    stress:
      stressAmount && stressWhen
        ? {
            amount: parseInt(stressAmount),
            when: stressWhen,
          }
        : undefined,
    fear: fear || undefined,
    gmNotes: gmNotes || undefined,
  };

  if (editingArtefactId) {
    const index = customArtefacts.findIndex((a) => a.id === editingArtefactId);
    if (index !== -1) {
      customArtefacts[index] = artefact;
    }
    editingArtefactId = null;
  } else {
    customArtefacts.push(artefact);
  }

  saveCustomArtefacts();
  clearCustomArtefactForm();
  renderCustomArtefacts();

  const form = document.getElementById("customArtefactForm");
  if (form) form.style.display = "none";
}

function clearCustomArtefactForm() {
  document.getElementById("customArtefactName").value = "";
  document.getElementById("customArtefactLevel").value = "";

  // Clear entity checkboxes
  const dropdown = document.getElementById("customArtefactEntityDropdown");
  if (dropdown) {
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((cb) => (cb.checked = false));
    updateArtefactEntityDisplay();
  }

  document.getElementById("customArtefactDescription").value = "";
  document.getElementById("customArtefactStressAmount").value = "";
  document.getElementById("customArtefactStressWhen").value = "";
  document.getElementById("customArtefactFear").value = "";
  document.getElementById("customArtefactGMNotes").value = "";

  editingArtefactId = null;

  // Hide the form
  const form = document.getElementById("customArtefactForm");
  if (form) {
    form.style.display = "none";
  }
}

function editCustomArtefact(id) {
  const artefact = customArtefacts.find((a) => a.id === id);
  if (!artefact) return;

  editingArtefactId = id;

  document.getElementById("customArtefactName").value = artefact.name || "";
  document.getElementById("customArtefactLevel").value = artefact.level || "";

  // Set entity checkboxes
  const dropdown = document.getElementById("customArtefactEntityDropdown");
  if (dropdown && artefact.relatedEntity) {
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((cb) => {
      if (Array.isArray(artefact.relatedEntity)) {
        cb.checked = artefact.relatedEntity.includes(cb.value);
      } else {
        cb.checked = cb.value === artefact.relatedEntity;
      }
    });
    updateArtefactEntityDisplay();
  }

  document.getElementById("customArtefactDescription").value =
    artefact.description || "";
  document.getElementById("customArtefactStressAmount").value =
    artefact.stress?.amount || "";
  document.getElementById("customArtefactStressWhen").value =
    artefact.stress?.when || "";
  document.getElementById("customArtefactFear").value = artefact.fear || "";
  document.getElementById("customArtefactGMNotes").value =
    artefact.gmNotes || "";

  const form = document.getElementById("customArtefactForm");
  if (form) {
    form.style.display = "block";
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function deleteCustomArtefact(id) {
  if (!confirm("Are you sure you want to delete this artefact?")) return;

  customArtefacts = customArtefacts.filter((a) => a.id !== id);
  saveCustomArtefacts();
  renderCustomArtefacts();
}

function filterCustomArtefacts() {
  customArtefactsFilters.name =
    document.getElementById("customArtefactSearchName")?.value.toLowerCase() ||
    "";
  customArtefactsFilters.entity =
    document.getElementById("customArtefactFilterEntity")?.value || "";
  renderCustomArtefacts();
}

function clearCustomArtefactsFilters() {
  const nameInput = document.getElementById("customArtefactSearchName");
  const entitySelect = document.getElementById("customArtefactFilterEntity");

  if (nameInput) nameInput.value = "";
  if (entitySelect) entitySelect.selectedIndex = 0;

  customArtefactsFilters = { name: "", entity: "" };
  renderCustomArtefacts();
}

function renderCustomArtefacts() {
  const container = document.getElementById("customArtefactsContainer");
  if (!container) return;

  if (customArtefacts.length === 0) {
    container.innerHTML =
      '<p style="color: #888; text-align: center; padding: 20px;">No artefacts created yet.</p>';
    return;
  }

  let filtered = customArtefacts;

  if (customArtefactsFilters.name) {
    filtered = filtered.filter(
      (artefact) =>
        artefact.name.toLowerCase().includes(customArtefactsFilters.name) ||
        (artefact.description &&
          artefact.description
            .toLowerCase()
            .includes(customArtefactsFilters.name))
    );
  }

  if (customArtefactsFilters.entity) {
    filtered = filtered.filter((artefact) => {
      if (Array.isArray(artefact.relatedEntity)) {
        return artefact.relatedEntity.includes(customArtefactsFilters.entity);
      }
      return artefact.relatedEntity === customArtefactsFilters.entity;
    });
  }

  if (filtered.length === 0) {
    container.innerHTML =
      '<p style="color: #888; text-align: center; padding: 20px;">No artefacts found matching filters.</p>';
    return;
  }

  // Sort alphabetically by name, ignoring "The", "A", "An" prefix
  filtered.sort((a, b) => {
    const nameA = (a.name || "").replace(/^(The|A|An)\s+/i, "");
    const nameB = (b.name || "").replace(/^(The|A|An)\s+/i, "");
    return nameA.localeCompare(nameB);
  });

  populateCustomArtefactFilters();

  container.innerHTML =
    `<div style="color: #888; margin-bottom: 15px; font-size: 0.9em;">Showing ${filtered.length} of ${customArtefacts.length} artefacts</div>` +
    filtered
      .map(
        (artefact) => `
      <details style="margin-bottom: 10px; background: rgba(0,0,0,0.3); border-radius: 6px; border: 1px solid #4CAF50; box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);">
        <summary style="padding: 12px; cursor: pointer; font-weight: bold; color: #4CAF50;">
          ${artefact.name}
          ${
            artefact.level
              ? `<span style="color: #ff9800; margin-left: 8px;">Level ${artefact.level}</span>`
              : ""
          }
          ${(() => {
            if (Array.isArray(artefact.relatedEntity)) {
              return `<span style="color: #888; font-weight: normal; margin-left: 10px; font-size: 0.9em;">• ${artefact.relatedEntity.join(
                ", "
              )}</span>`;
            }
            return artefact.relatedEntity
              ? `<span style="color: #888; font-weight: normal; margin-left: 10px; font-size: 0.9em;">• ${artefact.relatedEntity}</span>`
              : "";
          })()}
        </summary>
        <div style="padding: 15px; border-top: 1px solid rgba(76, 175, 80, 0.3);">
          ${
            artefact.description
              ? `<p style="margin-bottom: 12px; color: #ccc; white-space: pre-wrap;">${artefact.description}</p>`
              : ""
          }
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-bottom: 15px; padding: 10px; background: rgba(76, 175, 80, 0.1); border-radius: 4px;">
            ${
              artefact.level
                ? `<div style="text-align: center;"><div style="color: #888; font-size: 0.85em; margin-bottom: 3px;">Level</div><div style="color: #4CAF50; font-weight: bold; font-size: 1.1em;">${artefact.level}</div></div>`
                : ""
            }
            ${(() => {
              if (Array.isArray(artefact.relatedEntity)) {
                return `<div style="text-align: center;"><div style="color: #888; font-size: 0.85em; margin-bottom: 3px;">Entity</div><div style="color: #4CAF50; font-weight: bold; font-size: 1.1em;">${artefact.relatedEntity.join(
                  ", "
                )}</div></div>`;
              }
              return artefact.relatedEntity
                ? `<div style="text-align: center;"><div style="color: #888; font-size: 0.85em; margin-bottom: 3px;">Entity</div><div style="color: #4CAF50; font-weight: bold; font-size: 1.1em;">${artefact.relatedEntity}</div></div>`
                : "";
            })()}
          </div>
          
          ${
            artefact.stress
              ? `
            <div style="margin-bottom: 12px; padding: 10px; background: rgba(255, 152, 0, 0.1); border-left: 3px solid #ff9800; border-radius: 4px;">
              <strong style="color: #ff9800;">Stress:</strong> ${artefact.stress.amount} points<br>
              <span style="color: #ccc; font-size: 0.9em;">${artefact.stress.when}</span>
            </div>
          `
              : ""
          }
          
          ${
            artefact.fear
              ? `
            <div style="margin-bottom: 12px; padding: 10px; background: rgba(244, 67, 54, 0.1); border-left: 3px solid #f44336; border-radius: 4px;">
              <strong style="color: #f44336;">Fear:</strong> <span style="color: #ccc;">${artefact.fear}</span>
            </div>
          `
              : ""
          }
          
          ${
            artefact.gmNotes
              ? `
            <div style="margin-bottom: 8px; padding: 10px; background: rgba(158, 158, 158, 0.1); border-left: 3px solid #9e9e9e; border-radius: 4px;">
              <strong style="color: #9e9e9e;">GM Notes:</strong> <span style="color: #ccc; white-space: pre-wrap;">${artefact.gmNotes}</span>
            </div>
          `
              : ""
          }
          
          <div style="display: flex; gap: 10px; margin-top: 15px;">
            <button class="button" onclick="editCustomArtefact(${
              artefact.id
            })" style="flex: 1; background: rgba(33, 150, 243, 0.2); border-color: #2196F3; color: #64B5F6;">✏️ Edit</button>
            <button class="button" onclick="deleteCustomArtefact(${
              artefact.id
            })" style="flex: 1; background: rgba(244, 67, 54, 0.2); border-color: #f44336; color: #ef5350;">🗑️ Delete</button>
          </div>
        </div>
      </details>
    `
      )
      .join("");
}

function exportArtefactsJSON() {
  if (customArtefacts.length === 0) {
    alert("No artefacts to export. Create some artefacts first!");
    return;
  }

  const dataStr = JSON.stringify(customArtefacts, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `artefacts-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  alert(`Exported ${customArtefacts.length} artefacts to JSON file!`);
}

function importArtefactsJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);

      if (!Array.isArray(imported)) {
        alert("Invalid JSON format. Expected an array of artefacts.");
        return;
      }

      const validArtefacts = imported.filter((artefact) => artefact.name);

      if (validArtefacts.length === 0) {
        alert("No valid artefacts found. Each needs a 'name' field.");
        return;
      }

      let shouldMerge = false;
      if (customArtefacts.length > 0) {
        shouldMerge = confirm(
          `You have ${customArtefacts.length} existing artefacts.\n\n` +
            `Click OK to ADD ${validArtefacts.length} new artefacts.\n` +
            `Click Cancel to REPLACE all existing artefacts.`
        );
      }

      if (shouldMerge) {
        const maxId = customArtefacts.reduce(
          (max, a) => Math.max(max, a.id || 0),
          0
        );
        validArtefacts.forEach((artefact, index) => {
          artefact.id = maxId + index + 1;
          customArtefacts.push(artefact);
        });
      } else {
        customArtefacts = validArtefacts.map((artefact, index) => ({
          ...artefact,
          id: index + 1,
        }));
      }

      saveCustomArtefacts();
      clearCustomArtefactsFilters();
      renderCustomArtefacts();

      alert(
        `Successfully imported ${validArtefacts.length} artefacts!${
          imported.length !== validArtefacts.length
            ? `\n(${
                imported.length - validArtefacts.length
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

function downloadArtefactsTemplate() {
  const template = [
    {
      name: "Example Artefact Name",
      level: 5,
      relatedEntity: ["The Entity Name"],
      stress: {
        amount: 3,
        when: "Describe when stress is gained (e.g., 'Upon realizing the artefact's power; 1 with each use')",
      },
      description:
        "A detailed description of the artefact's appearance, physical properties, and how it functions. Include what happens when someone uses it, what defense rolls are required, duration of effects, and any conditions or limitations. Be specific about mechanical effects and narrative consequences.",
      fear: "Describe the worst possible outcome or horrifying consequence of using or possessing this artefact. This should be something that makes players think twice about keeping or using it.",
      gmNotes:
        "Optional: Add any private GM notes about using this artefact in your campaign.",
    },
  ];

  const dataStr = JSON.stringify(template, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "artefacts-template.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  alert(
    "Downloaded artefacts template! Edit this file with your own artefacts and upload it using the 'Upload JSON' button."
  );
}
