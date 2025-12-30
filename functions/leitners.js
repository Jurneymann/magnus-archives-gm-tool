// Magnus Archives GM Tool - Leitners Management

// Custom storage
let customLeitners = [];
let editingLeitnerId = null;

// ==================== CUSTOM LEITNERS ==================== //
function loadCustomLeitners() {
  const saved = localStorage.getItem("gmTool_customLeitners");
  if (saved) {
    try {
      customLeitners = JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load custom Leitners:", e);
      customLeitners = [];
    }
  }
}

function saveCustomLeitners() {
  localStorage.setItem("gmTool_customLeitners", JSON.stringify(customLeitners));
}

function toggleCustomLeitnerForm() {
  const form = document.getElementById("customLeitnerForm");
  if (form) {
    const isHidden = form.style.display === "none" || !form.style.display;
    form.style.display = isHidden ? "block" : "none";
    if (isHidden) {
      document.getElementById("customLeitnerName")?.focus();
    }
  }
}

// Custom multiselect functions for leitner entity selection
function toggleLeitnerEntityDropdown() {
  const dropdown = document.getElementById("customLeitnerEntityDropdown");
  if (dropdown) {
    dropdown.style.display =
      dropdown.style.display === "none" ? "block" : "none";
  }
}

function updateLeitnerEntityDisplay() {
  const dropdown = document.getElementById("customLeitnerEntityDropdown");
  const display = document.getElementById("customLeitnerEntityDisplay");
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

function getSelectedLeitnerEntities() {
  const dropdown = document.getElementById("customLeitnerEntityDropdown");
  if (!dropdown) return [];

  const checkboxes = dropdown.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  return Array.from(checkboxes).map((cb) => cb.value);
}

function populateCustomLeitnerFilters() {
  const entityFilter = document.getElementById("customLeitnerFilterEntity");
  if (entityFilter && customLeitners.length > 0) {
    while (entityFilter.options.length > 1) {
      entityFilter.remove(1);
    }

    const allEntities = customLeitners.flatMap((l) => {
      if (Array.isArray(l.relatedEntity)) {
        return l.relatedEntity;
      }
      return l.relatedEntity ? [l.relatedEntity] : [];
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

function saveCustomLeitner() {
  const name = document.getElementById("customLeitnerName")?.value.trim();
  const level = document.getElementById("customLeitnerLevel")?.value;
  const selectedEntities = getSelectedLeitnerEntities();
  const description = document
    .getElementById("customLeitnerDescription")
    ?.value.trim();
  const stressAmount = document.getElementById(
    "customLeitnerStressAmount"
  )?.value;
  const stressWhen = document
    .getElementById("customLeitnerStressWhen")
    ?.value.trim();
  const fear = document.getElementById("customLeitnerFear")?.value.trim();
  const gmNotes = document.getElementById("customLeitnerGMNotes")?.value.trim();

  if (!name) {
    alert("Please enter a book title.");
    return;
  }

  const leitner = {
    id: editingLeitnerId || Date.now(),
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

  if (editingLeitnerId) {
    const index = customLeitners.findIndex((l) => l.id === editingLeitnerId);
    if (index !== -1) {
      customLeitners[index] = leitner;
    }
    editingLeitnerId = null;
  } else {
    customLeitners.push(leitner);
  }

  saveCustomLeitners();
  clearCustomLeitnerForm();
  renderCustomLeitners();

  const form = document.getElementById("customLeitnerForm");
  if (form) form.style.display = "none";
}

function clearCustomLeitnerForm() {
  document.getElementById("customLeitnerName").value = "";
  document.getElementById("customLeitnerLevel").value = "";

  // Clear entity checkboxes
  const dropdown = document.getElementById("customLeitnerEntityDropdown");
  if (dropdown) {
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((cb) => (cb.checked = false));
    updateLeitnerEntityDisplay();
  }

  document.getElementById("customLeitnerDescription").value = "";
  document.getElementById("customLeitnerStressAmount").value = "";
  document.getElementById("customLeitnerStressWhen").value = "";
  document.getElementById("customLeitnerFear").value = "";
  document.getElementById("customLeitnerGMNotes").value = "";

  editingLeitnerId = null;

  // Hide the form
  const form = document.getElementById("customLeitnerForm");
  if (form) {
    form.style.display = "none";
  }
}

function editCustomLeitner(id) {
  const leitner = customLeitners.find((l) => l.id === id);
  if (!leitner) return;

  editingLeitnerId = id;

  document.getElementById("customLeitnerName").value = leitner.name || "";
  document.getElementById("customLeitnerLevel").value = leitner.level || "";

  // Set entity checkboxes
  const dropdown = document.getElementById("customLeitnerEntityDropdown");
  if (dropdown && leitner.relatedEntity) {
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((cb) => {
      if (Array.isArray(leitner.relatedEntity)) {
        cb.checked = leitner.relatedEntity.includes(cb.value);
      } else {
        cb.checked = cb.value === leitner.relatedEntity;
      }
    });
    updateLeitnerEntityDisplay();
  }

  document.getElementById("customLeitnerDescription").value =
    leitner.description || "";
  document.getElementById("customLeitnerStressAmount").value =
    leitner.stress?.amount || "";
  document.getElementById("customLeitnerStressWhen").value =
    leitner.stress?.when || "";
  document.getElementById("customLeitnerFear").value = leitner.fear || "";
  document.getElementById("customLeitnerGMNotes").value = leitner.gmNotes || "";

  const form = document.getElementById("customLeitnerForm");
  if (form) {
    form.style.display = "block";
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function deleteCustomLeitner(id) {
  if (!confirm("Are you sure you want to delete this Leitner book?")) return;

  customLeitners = customLeitners.filter((l) => l.id !== id);
  saveCustomLeitners();
  renderCustomLeitners();
}

function filterCustomLeitners() {
  customLeitnersFilters.name =
    document.getElementById("customLeitnerSearchName")?.value.toLowerCase() ||
    "";
  customLeitnersFilters.entity =
    document.getElementById("customLeitnerFilterEntity")?.value || "";
  renderCustomLeitners();
}

function clearCustomLeitnersFilters() {
  const nameInput = document.getElementById("customLeitnerSearchName");
  const entitySelect = document.getElementById("customLeitnerFilterEntity");

  if (nameInput) nameInput.value = "";
  if (entitySelect) entitySelect.selectedIndex = 0;

  customLeitnersFilters = { name: "", entity: "" };
  renderCustomLeitners();
}

function renderCustomLeitners() {
  const container = document.getElementById("customLeitnersContainer");
  if (!container) return;

  if (customLeitners.length === 0) {
    container.innerHTML =
      '<p style="color: #888; text-align: center; padding: 20px;">No Leitner books created yet.</p>';
    return;
  }

  let filtered = customLeitners;

  if (customLeitnersFilters.name) {
    filtered = filtered.filter(
      (leitner) =>
        leitner.name.toLowerCase().includes(customLeitnersFilters.name) ||
        (leitner.description &&
          leitner.description
            .toLowerCase()
            .includes(customLeitnersFilters.name))
    );
  }

  if (customLeitnersFilters.entity) {
    filtered = filtered.filter((leitner) => {
      if (Array.isArray(leitner.relatedEntity)) {
        return leitner.relatedEntity.includes(customLeitnersFilters.entity);
      }
      return leitner.relatedEntity === customLeitnersFilters.entity;
    });
  }

  if (filtered.length === 0) {
    container.innerHTML =
      '<p style="color: #888; text-align: center; padding: 20px;">No Leitner books found matching filters.</p>';
    return;
  }

  // Sort alphabetically by name, ignoring "The", "A", "An" prefix
  filtered.sort((a, b) => {
    const nameA = (a.name || "").replace(/^(The|A|An)\s+/i, "");
    const nameB = (b.name || "").replace(/^(The|A|An)\s+/i, "");
    return nameA.localeCompare(nameB);
  });

  populateCustomLeitnerFilters();

  container.innerHTML =
    `<div style="color: #888; margin-bottom: 15px; font-size: 0.9em;">Showing ${filtered.length} of ${customLeitners.length} Leitner books</div>` +
    filtered
      .map(
        (leitner) => `
      <details style="margin-bottom: 10px; background: rgba(0,0,0,0.3); border-radius: 6px; border: 1px solid #4CAF50; box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);">
        <summary style="padding: 12px; cursor: pointer; font-weight: bold; color: #4CAF50;">
          ${leitner.name}
          ${
            leitner.level
              ? `<span style="color: #ff9800; margin-left: 8px;">Level ${leitner.level}</span>`
              : ""
          }
          ${(() => {
            if (Array.isArray(leitner.relatedEntity)) {
              return `<span style="color: #888; font-weight: normal; margin-left: 10px; font-size: 0.9em;">• ${leitner.relatedEntity.join(
                ", "
              )}</span>`;
            }
            return leitner.relatedEntity
              ? `<span style="color: #888; font-weight: normal; margin-left: 10px; font-size: 0.9em;">• ${leitner.relatedEntity}</span>`
              : "";
          })()}
        </summary>
        <div style="padding: 15px; border-top: 1px solid rgba(76, 175, 80, 0.3);">
          ${
            leitner.description
              ? `<p style="margin-bottom: 12px; color: #ccc; white-space: pre-wrap;">${leitner.description}</p>`
              : ""
          }
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-bottom: 15px; padding: 10px; background: rgba(76, 175, 80, 0.1); border-radius: 4px;">
            ${
              leitner.level
                ? `<div style="text-align: center;"><div style="color: #888; font-size: 0.85em; margin-bottom: 3px;">Level</div><div style="color: #4CAF50; font-weight: bold; font-size: 1.1em;">${leitner.level}</div></div>`
                : ""
            }
            ${(() => {
              if (Array.isArray(leitner.relatedEntity)) {
                return `<div style="text-align: center;"><div style="color: #888; font-size: 0.85em; margin-bottom: 3px;">Entity</div><div style="color: #4CAF50; font-weight: bold; font-size: 1.1em;">${leitner.relatedEntity.join(
                  ", "
                )}</div></div>`;
              }
              return leitner.relatedEntity
                ? `<div style="text-align: center;"><div style="color: #888; font-size: 0.85em; margin-bottom: 3px;">Entity</div><div style="color: #4CAF50; font-weight: bold; font-size: 1.1em;">${leitner.relatedEntity}</div></div>`
                : "";
            })()}
          </div>
          
          ${
            leitner.stress
              ? `
            <div style="margin-bottom: 12px; padding: 10px; background: rgba(255, 152, 0, 0.1); border-left: 3px solid #ff9800; border-radius: 4px;">
              <strong style="color: #ff9800;">Stress:</strong> ${leitner.stress.amount} points<br>
              <span style="color: #ccc; font-size: 0.9em;">${leitner.stress.when}</span>
            </div>
          `
              : ""
          }
          
          ${
            leitner.fear
              ? `
            <div style="margin-bottom: 12px; padding: 10px; background: rgba(244, 67, 54, 0.1); border-left: 3px solid #f44336; border-radius: 4px;">
              <strong style="color: #f44336;">Fear:</strong> <span style="color: #ccc;">${leitner.fear}</span>
            </div>
          `
              : ""
          }
          
          ${
            leitner.gmNotes
              ? `
            <div style="margin-bottom: 8px; padding: 10px; background: rgba(158, 158, 158, 0.1); border-left: 3px solid #9e9e9e; border-radius: 4px;">
              <strong style="color: #9e9e9e;">GM Notes:</strong> <span style="color: #ccc; white-space: pre-wrap;">${leitner.gmNotes}</span>
            </div>
          `
              : ""
          }
          
          <div style="display: flex; gap: 10px; margin-top: 15px;">
            <button class="button" onclick="editCustomLeitner(${
              leitner.id
            })" style="flex: 1; background: rgba(33, 150, 243, 0.2); border-color: #2196F3; color: #64B5F6;">✏️ Edit</button>
            <button class="button" onclick="deleteCustomLeitner(${
              leitner.id
            })" style="flex: 1; background: rgba(244, 67, 54, 0.2); border-color: #f44336; color: #ef5350;">🗑️ Delete</button>
          </div>
        </div>
      </details>
    `
      )
      .join("");
}

function exportLeitnersJSON() {
  if (customLeitners.length === 0) {
    alert("No Leitner books to export. Create some books first!");
    return;
  }

  const dataStr = JSON.stringify(customLeitners, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `leitners-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  alert(`Exported ${customLeitners.length} Leitner books to JSON file!`);
}

function importLeitnersJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);

      if (!Array.isArray(imported)) {
        alert("Invalid JSON format. Expected an array of Leitner books.");
        return;
      }

      const validLeitners = imported.filter((leitner) => leitner.name);

      if (validLeitners.length === 0) {
        alert("No valid Leitner books found. Each needs a 'name' field.");
        return;
      }

      let shouldMerge = false;
      if (customLeitners.length > 0) {
        shouldMerge = confirm(
          `You have ${customLeitners.length} existing Leitner books.\n\n` +
            `Click OK to ADD ${validLeitners.length} new books.\n` +
            `Click Cancel to REPLACE all existing books.`
        );
      }

      if (shouldMerge) {
        const maxId = customLeitners.reduce(
          (max, l) => Math.max(max, l.id || 0),
          0
        );
        validLeitners.forEach((leitner, index) => {
          leitner.id = maxId + index + 1;
          customLeitners.push(leitner);
        });
      } else {
        customLeitners = validLeitners.map((leitner, index) => ({
          ...leitner,
          id: index + 1,
        }));
      }

      saveCustomLeitners();
      clearCustomLeitnersFilters();
      renderCustomLeitners();

      alert(
        `Successfully imported ${validLeitners.length} Leitner books!${
          imported.length !== validLeitners.length
            ? `\n(${
                imported.length - validLeitners.length
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

function downloadLeitnersTemplate() {
  const template = [
    {
      name: "Example Leitner Book Title",
      level: "1d6",
      relatedEntity: ["The Entity Name"],
      stress: {
        amount: 2,
        when: "Describe when stress is gained (e.g., 'Upon reading the book; each hour spent studying it')",
      },
      description:
        "A detailed description of the book's appearance, what happens when it is read or used, any specific knowledge it contains, defense rolls required, duration of effects, and any conditions or limitations. Be specific about mechanical effects and narrative consequences.",
      fear: "Describe the worst possible outcome or horrifying consequence of reading or possessing this book. This should be something that makes players think twice about using it.",
      gmNotes:
        "Optional: Add any private GM notes about using this book in your campaign.",
    },
  ];

  const dataStr = JSON.stringify(template, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "leitners-template.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  alert(
    "Downloaded Leitners template! Edit this file with your own Leitner books and upload it using the 'Upload JSON' button."
  );
}
