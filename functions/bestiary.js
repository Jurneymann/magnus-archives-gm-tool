// Magnus Archives GM Tool - Bestiary Management

// Custom storage
let customEnemies = [];
let customAbilityCount = 0;
let isEditingCustomEnemy = false;
let editingCustomEnemyId = null;

// ==================== BESTIARY (Reference) ==================== //
function populateBestiary() {
  if (!customEnemies || customEnemies.length === 0) return;

  // Populate entity filter dropdown
  const entityFilter = document.getElementById("bestiaryFilterEntity");
  if (entityFilter) {
    // Clear existing options except the first "All Entities" option
    while (entityFilter.options.length > 1) {
      entityFilter.remove(1);
    }

    // Extract all entity values from arrays and flatten
    const allEntities = customEnemies.flatMap((c) => {
      const entityValue = c.entity || c.relatedEntity;
      if (Array.isArray(entityValue)) {
        return entityValue;
      }
      return entityValue ? [entityValue] : [];
    });
    const entities = [...new Set(allEntities)].sort();
    entities.forEach((entity) => {
      const option = document.createElement("option");
      option.value = entity;
      option.textContent = entity;
      entityFilter.appendChild(option);
    });
  }

  renderBestiary();
}

function filterBestiary() {
  bestiaryFilters.name =
    document.getElementById("bestiarySearchName")?.value.toLowerCase() || "";
  bestiaryFilters.entity =
    document.getElementById("bestiaryFilterEntity")?.value || "";
  bestiaryFilters.level =
    document.getElementById("bestiaryFilterLevel")?.value || "";

  renderBestiary();
}

function clearBestiaryFilters() {
  const nameInput = document.getElementById("bestiarySearchName");
  const entitySelect = document.getElementById("bestiaryFilterEntity");
  const levelSelect = document.getElementById("bestiaryFilterLevel");

  if (nameInput) nameInput.value = "";
  if (entitySelect) entitySelect.selectedIndex = 0;
  if (levelSelect) levelSelect.selectedIndex = 0;

  bestiaryFilters = { name: "", entity: "", level: "" };
  renderBestiary();
}

function renderBestiary() {
  const container = document.getElementById("bestiaryList");
  if (!container || !customEnemies || customEnemies.length === 0) {
    if (container) {
      container.innerHTML =
        '<p style="color: #888; text-align: center; padding: 20px;">No creatures found. Create custom enemies to populate the bestiary.</p>';
    }
    return;
  }

  let filtered = customEnemies;

  // Apply filters
  if (bestiaryFilters.name) {
    filtered = filtered.filter(
      (creature) =>
        creature.name.toLowerCase().includes(bestiaryFilters.name) ||
        (creature.description &&
          creature.description.toLowerCase().includes(bestiaryFilters.name))
    );
  }

  if (bestiaryFilters.entity) {
    filtered = filtered.filter((creature) => {
      const entityValue = creature.entity || creature.relatedEntity;
      if (Array.isArray(entityValue)) {
        return entityValue.includes(bestiaryFilters.entity);
      }
      return entityValue === bestiaryFilters.entity;
    });
  }

  if (bestiaryFilters.level) {
    filtered = filtered.filter(
      (creature) => String(creature.level) === bestiaryFilters.level
    );
  }

  if (filtered.length === 0) {
    container.innerHTML =
      '<p style="color: #888; text-align: center; padding: 20px;">No creatures found matching filters.</p>';
    return;
  }

  container.innerHTML =
    `
    <div style="color: #888; margin-bottom: 15px; font-size: 0.9em;">
      Showing ${filtered.length} of ${customEnemies.length} creatures
    </div>
  ` +
    filtered
      .map(
        (creature) => `
    <details style="margin-bottom: 10px; background: rgba(0,0,0,0.3); border-radius: 6px; border: 1px solid #4CAF50; box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);">
      <summary style="padding: 12px; cursor: pointer; font-weight: bold; color: #4CAF50;">
        ${creature.name} 
        <span style="color: #ff9800; margin-left: 8px;">Level ${
          creature.level
        }</span>
        ${(() => {
          const entityValue = creature.entity || creature.relatedEntity;
          if (Array.isArray(entityValue)) {
            return `<span style="color: #888; font-weight: normal; margin-left: 10px;">• ${entityValue.join(
              ", "
            )}</span>`;
          }
          return entityValue
            ? `<span style="color: #888; font-weight: normal; margin-left: 10px;">• ${entityValue}</span>`
            : "";
        })()}
      </summary>
      <div style="padding: 15px; border-top: 1px solid rgba(76, 175, 80, 0.3);">
        ${
          creature.description
            ? `<p style="margin-bottom: 15px; color: #ccc;">${creature.description}</p>`
            : ""
        }
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-bottom: 15px; padding: 10px; background: rgba(76, 175, 80, 0.1); border-radius: 4px;">
          <div><strong style="color: #4CAF50;">Level:</strong> ${
            creature.level
          }</div>
          <div><strong style="color: #4CAF50;">Health:</strong> ${
            creature.health !== undefined ? creature.health : "N/A"
          }</div>
          <div><strong style="color: #4CAF50;">Stress:</strong> ${
            creature.stress !== undefined ? creature.stress : "N/A"
          }</div>
          <div><strong style="color: #4CAF50;">Damage:</strong> ${
            creature.damageInflicted || "Varies"
          }</div>
        </div>
        
        ${
          creature.movement
            ? `<p style="margin-bottom: 8px;"><strong style="color: #4CAF50;">Movement:</strong> ${creature.movement}</p>`
            : ""
        }
        ${
          creature.combat
            ? `<p style="margin-bottom: 8px;"><strong style="color: #4CAF50;">Combat:</strong> ${creature.combat}</p>`
            : ""
        }
        ${
          creature.modifications
            ? `<p style="margin-bottom: 8px;"><strong style="color: #4CAF50;">Modifications:</strong> ${creature.modifications}</p>`
            : ""
        }
        ${
          creature.abilities && creature.abilities.length > 0
            ? `
          <div style="margin-top: 15px;">
            <strong style="color: #4CAF50; font-size: 1.05em;">Abilities:</strong>
            <ul style="margin: 8px 0; padding-left: 20px;">
              ${creature.abilities
                .map(
                  (ability) =>
                    `<li style="margin-bottom: 8px;"><strong style="color: #66bb6a;">${ability.name}:</strong> ${ability.effect}</li>`
                )
                .join("")}
            </ul>
          </div>
        `
            : ""
        }
        <button 
          class="button" 
          style="margin-top: 15px; width: 100%; background: rgba(76, 175, 80, 0.2); border: 1px solid #4CAF50;"
          onclick="addToEncounter('${creature.name.replace(/'/g, "\\'")}')"
          title="Add this creature to the combat tracker">
          ⚔️ Add to Encounter
        </button>
      </div>
    </details>
  `
      )
      .join("");
}

// ==================== CUSTOM ENEMIES ==================== //
function populateCustomEnemyFilters() {
  // Populate entity filter dropdown
  const entityFilter = document.getElementById("customEnemyFilterEntity");
  if (entityFilter && customEnemies.length > 0) {
    // Clear existing options except the first "All Entities" option
    while (entityFilter.options.length > 1) {
      entityFilter.remove(1);
    }

    // Extract all entity values from arrays and flatten
    const allEntities = customEnemies.flatMap((e) => {
      if (Array.isArray(e.entity)) {
        return e.entity;
      }
      return e.entity ? [e.entity] : [];
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

function addCustomAbility() {
  customAbilityCount++;
  const container = document.getElementById("customEnemyAbilitiesList");
  if (!container) return;

  const abilityDiv = document.createElement("div");
  abilityDiv.id = `customAbility${customAbilityCount}`;
  abilityDiv.style.cssText =
    "display: grid; grid-template-columns: 1fr 2fr auto; gap: 10px; margin-bottom: 10px; padding: 10px; background: rgba(0, 0, 0, 0.2); border-radius: 4px;";
  abilityDiv.innerHTML = `
    <input type="text" id="abilityName${customAbilityCount}" placeholder="Ability name..." style="padding: 6px; background: rgba(0, 0, 0, 0.3); border: 1px solid #4caf50; border-radius: 4px; color: #e0e0e0;" />
    <input type="text" id="abilityEffect${customAbilityCount}" placeholder="Effect description..." style="padding: 6px; background: rgba(0, 0, 0, 0.3); border: 1px solid #4caf50; border-radius: 4px; color: #e0e0e0;" />
    <button class="button" onclick="removeCustomAbility(${customAbilityCount})" style="padding: 6px 12px; background: rgba(211, 47, 47, 0.2); border-color: #d32f2f;">✕</button>
  `;
  container.appendChild(abilityDiv);
}

function removeCustomAbility(id) {
  const element = document.getElementById(`customAbility${id}`);
  if (element) element.remove();
}

function saveCustomEnemy() {
  const name = document.getElementById("customEnemyName")?.value.trim();
  const description = document
    .getElementById("customEnemyDescription")
    ?.value.trim();
  const level = parseInt(document.getElementById("customEnemyLevel")?.value);

  // Get entities from custom multiselect
  const entities = window.customEnemySelectedEntities || [];

  const health = parseInt(document.getElementById("customEnemyHealth")?.value);
  const stress =
    parseInt(document.getElementById("customEnemyStress")?.value) || 0;
  const damageInflicted = document
    .getElementById("customEnemyDamage")
    ?.value.trim();
  const movement = document.getElementById("customEnemyMovement")?.value.trim();
  const combat = document.getElementById("customEnemyCombat")?.value.trim();
  const modifications = document
    .getElementById("customEnemyModifications")
    ?.value.trim();
  const gmNotes = document.getElementById("customEnemyGMNotes")?.value.trim();

  // Validation
  if (!name) {
    alert("Please enter a name for the enemy.");
    return;
  }
  if (!level || level < 1 || level > 10) {
    alert("Please enter a valid level (1-10).");
    return;
  }
  if (!health || health < 1) {
    alert("Please enter a valid health value.");
    return;
  }
  if (!damageInflicted) {
    alert("Please enter damage inflicted.");
    return;
  }

  // Collect abilities
  const abilities = [];
  const abilityContainer = document.getElementById("customEnemyAbilitiesList");
  if (abilityContainer) {
    const abilityDivs = abilityContainer.querySelectorAll(
      '[id^="customAbility"]'
    );
    abilityDivs.forEach((div) => {
      const id = div.id.replace("customAbility", "");
      const nameInput = document.getElementById(`abilityName${id}`);
      const effectInput = document.getElementById(`abilityEffect${id}`);
      if (nameInput?.value.trim() && effectInput?.value.trim()) {
        abilities.push({
          name: nameInput.value.trim(),
          effect: effectInput.value.trim(),
        });
      }
    });
  }

  if (isEditingCustomEnemy && editingCustomEnemyId) {
    // Update existing enemy
    const enemy = customEnemies.find((e) => e.id === editingCustomEnemyId);
    if (enemy) {
      enemy.name = name;
      enemy.description = description;
      enemy.level = level;
      enemy.entity = entities;
      enemy.health = health;
      enemy.stress = stress;
      enemy.damageInflicted = damageInflicted;
      enemy.movement = movement || "Short";
      enemy.combat = combat || "";
      enemy.modifications = modifications || "";
      enemy.abilities = abilities;
      enemy.gmNotes = gmNotes || "";
    }
    alert(`Enemy "${name}" updated successfully!`);
  } else {
    // Create new enemy
    const enemy = {
      id: Date.now(),
      name,
      description: description || "",
      level,
      entity: entities,
      health,
      stress,
      damageInflicted,
      movement: movement || "Short",
      combat: combat || "",
      modifications: modifications || "",
      abilities,
      gmNotes: gmNotes || "",
      custom: true,
    };
    customEnemies.push(enemy);
    alert(`Enemy "${name}" created successfully!`);
  }

  saveCustomEnemies();
  renderCustomEnemies();
  clearCustomEnemyForm();

  // Hide form after saving
  const form = document.getElementById("customEnemyForm");
  if (form) form.style.display = "none";
}

function clearCustomEnemyForm() {
  document.getElementById("customEnemyName").value = "";
  document.getElementById("customEnemyDescription").value = "";
  document.getElementById("customEnemyLevel").value = "1";

  // Clear custom multiselect entities
  window.customEnemySelectedEntities = [];
  updateCustomEnemyEntityDisplay();

  document.getElementById("customEnemyHealth").value = "10";
  document.getElementById("customEnemyStress").value = "0";
  document.getElementById("customEnemyDamage").value = "3 points";
  document.getElementById("customEnemyMovement").value = "";
  document.getElementById("customEnemyCombat").value = "";
  document.getElementById("customEnemyModifications").value = "";
  document.getElementById("customEnemyAbilitiesList").innerHTML = "";
  document.getElementById("customEnemyGMNotes").value = "";
  customAbilityCount = 0;

  isEditingCustomEnemy = false;
  editingCustomEnemyId = null;

  // Reset form title
  const formTitle = document.getElementById("customEnemyFormTitle");
  if (formTitle) {
    formTitle.textContent = "Create New Enemy";
  }

  // Hide the form
  const form = document.getElementById("customEnemyForm");
  if (form) {
    form.open = false;
  }
}

function toggleCustomEnemyForm() {
  const form = document.getElementById("customEnemyForm");
  if (form) {
    if (form.style.display === "none") {
      form.style.display = "block";
      clearCustomEnemyForm();
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      form.style.display = "none";
    }
  }
}

function toggleCustomEnemyEntity(entity) {
  if (!window.customEnemySelectedEntities) {
    window.customEnemySelectedEntities = [];
  }

  const index = window.customEnemySelectedEntities.indexOf(entity);
  if (index > -1) {
    window.customEnemySelectedEntities.splice(index, 1);
  } else {
    window.customEnemySelectedEntities.push(entity);
  }

  updateCustomEnemyEntityDisplay();
}

function removeCustomEnemyEntity(entity) {
  if (!window.customEnemySelectedEntities) {
    window.customEnemySelectedEntities = [];
  }

  window.customEnemySelectedEntities =
    window.customEnemySelectedEntities.filter((e) => e !== entity);
  updateCustomEnemyEntityDisplay();
}

function toggleCustomEnemyEntityDropdown() {
  const dropdown = document.getElementById("customEnemyEntityDropdown");
  const trigger = document.getElementById("customEnemyEntityTrigger");

  if (!dropdown || !trigger) return;

  if (dropdown.style.display === "none") {
    dropdown.style.display = "block";
    trigger.classList.add("open");
  } else {
    dropdown.style.display = "none";
    trigger.classList.remove("open");
  }
}

function updateCustomEnemyEntityDisplay() {
  const trigger = document.getElementById("customEnemyEntityTrigger");
  const dropdown = document.getElementById("customEnemyEntityDropdown");

  if (!trigger || !dropdown) return;

  const entities = window.customEnemySelectedEntities || [];

  // Update trigger display
  if (entities.length > 0) {
    trigger.innerHTML = entities
      .map(
        (e) => `
      <span class="multiselect-tag">
        ${e.replace("The ", "")}
        <span class="multiselect-tag-remove" onclick="event.stopPropagation(); removeCustomEnemyEntity('${e}')">×</span>
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
}

function renderCustomEnemies() {
  const container = document.getElementById("customEnemiesContainer");
  if (!container) return;

  if (customEnemies.length === 0) {
    container.innerHTML =
      '<p style="color: #888; text-align: center; padding: 20px;">No enemies created yet.</p>';
    return;
  }

  let filtered = customEnemies;

  // Apply filters
  if (customEnemyFilters.name) {
    filtered = filtered.filter(
      (enemy) =>
        enemy.name.toLowerCase().includes(customEnemyFilters.name) ||
        (enemy.description &&
          enemy.description.toLowerCase().includes(customEnemyFilters.name))
    );
  }

  if (customEnemyFilters.entity) {
    filtered = filtered.filter((enemy) => {
      if (Array.isArray(enemy.entity)) {
        return enemy.entity.includes(customEnemyFilters.entity);
      }
      return enemy.entity === customEnemyFilters.entity;
    });
  }

  if (customEnemyFilters.level) {
    filtered = filtered.filter(
      (enemy) => String(enemy.level) === customEnemyFilters.level
    );
  }

  if (filtered.length === 0) {
    container.innerHTML =
      '<p style="color: #888; text-align: center; padding: 20px;">No enemies found matching filters.</p>';
    return;
  }

  // Sort alphabetically, ignoring articles
  filtered.sort((a, b) => {
    const nameA = (a.name || "").replace(/^(The|A|An)\s+/i, "");
    const nameB = (b.name || "").replace(/^(The|A|An)\s+/i, "");
    return nameA.localeCompare(nameB);
  });

  // Update entity filter dropdown with current entities
  populateCustomEnemyFilters();

  container.innerHTML =
    `
    <div style="color: #888; margin-bottom: 15px; font-size: 0.9em;">
      Showing ${filtered.length} of ${customEnemies.length} custom enemies
    </div>
  ` +
    filtered
      .map(
        (enemy) => `
    <details style="margin-bottom: 10px; background: rgba(0,0,0,0.3); border-radius: 6px; border: 1px solid #4CAF50; box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);">
      <summary style="padding: 12px; cursor: pointer; font-weight: bold; color: #4CAF50;">
        ${enemy.name} 
        <span style="color: #ff9800; margin-left: 8px;">Level ${
          enemy.level
        }</span>
        <span style="color: #888; font-weight: normal; margin-left: 10px; font-size: 0.9em;">${
          enemy.entity
        }</span>
      </summary>
      <div style="padding: 15px; border-top: 1px solid rgba(76, 175, 80, 0.3);">
        ${
          enemy.description
            ? `<p style="margin-bottom: 12px; font-style: italic; color: #ccc;">${enemy.description}</p>`
            : ""
        }
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-bottom: 15px; padding: 10px; background: rgba(76, 175, 80, 0.1); border-radius: 4px;">
          <div style="text-align: center;">
            <div style="color: #888; font-size: 0.85em; margin-bottom: 3px;">Level</div>
            <div style="color: #4CAF50; font-weight: bold; font-size: 1.1em;">${
              enemy.level
            }</div>
          </div>
          <div style="text-align: center;">
            <div style="color: #888; font-size: 0.85em; margin-bottom: 3px;">Health</div>
            <div style="color: #4CAF50; font-weight: bold; font-size: 1.1em;">${
              enemy.health
            }</div>
          </div>
          <div style="text-align: center;">
            <div style="color: #888; font-size: 0.85em; margin-bottom: 3px;">Stress</div>
            <div style="color: #4CAF50; font-weight: bold; font-size: 1.1em;">${
              enemy.stress
            }</div>
          </div>
          <div style="text-align: center;">
            <div style="color: #888; font-size: 0.85em; margin-bottom: 3px;">Damage</div>
            <div style="color: #4CAF50; font-weight: bold; font-size: 1.1em;">${
              enemy.damageInflicted
            }</div>
          </div>
        </div>
        
        ${
          enemy.entity && enemy.entity.length > 0
            ? `<p style="margin-bottom: 8px;"><strong style="color: #4CAF50;">Entity:</strong> ${enemy.entity
                .map((e) => e.replace("The ", ""))
                .join(", ")}</p>`
            : ""
        }
        ${
          enemy.movement
            ? `<p style="margin-bottom: 8px;"><strong style="color: #4CAF50;">Movement:</strong> ${enemy.movement}</p>`
            : ""
        }
        ${
          enemy.combat
            ? `<p style="margin-bottom: 8px;"><strong style="color: #4CAF50;">Combat:</strong> ${enemy.combat}</p>`
            : ""
        }
        ${
          enemy.modifications
            ? `<p style="margin-bottom: 8px;"><strong style="color: #4CAF50;">Modifications:</strong> ${enemy.modifications}</p>`
            : ""
        }
        ${
          enemy.abilities && enemy.abilities.length > 0
            ? `
          <div style="margin-top: 15px;">
            <strong style="color: #4CAF50; font-size: 1.05em;">Abilities:</strong>
            <ul style="margin: 8px 0; padding-left: 20px;">
              ${enemy.abilities
                .map(
                  (ability) =>
                    `<li style="margin-bottom: 8px;"><strong style="color: #81c784;">${ability.name}:</strong> ${ability.effect}</li>`
                )
                .join("")}
            </ul>
          </div>
        `
            : ""
        }
        ${
          enemy.gmNotes
            ? `<div style="margin-top: 15px; padding: 10px; background: rgba(255, 152, 0, 0.1); border-left: 3px solid #ff9800; border-radius: 4px;"><strong style="color: #ff9800;">GM Notes:</strong><div style="margin-top: 5px; color: #ddd;">${enemy.gmNotes.replace(
                /\n/g,
                "<br>"
              )}</div></div>`
            : ""
        }
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 15px;">
          <button 
            class="button" 
            style="background: rgba(76, 175, 80, 0.2); border: 1px solid #4CAF50; color: #fff; padding: 6px 12px;"
            onclick="addCustomToEncounter(${enemy.id})"
            title="Add this enemy to the combat tracker">
            ⚔️ Add to Encounter
          </button>

          <button 
            class="button" 
            style="background: #2196F3; color: #fff; padding: 6px 12px;"
            onclick="editCustomEnemy(${enemy.id})"
            title="Edit this custom enemy">
            ✏️ Edit
          </button>
          <button 
            class="button" 
            style="background: rgba(211, 47, 47, 0.2); border: 1px solid #d32f2f; color: #fff; padding: 6px 12px;"
            onclick="deleteCustomEnemy(${enemy.id})"
            title="Delete this custom enemy">
            🗑️ Delete
          </button>
        </div>
      </div>
    </details>
  `
      )
      .join("");
}

function filterCustomEnemies() {
  customEnemyFilters.name =
    document.getElementById("customEnemySearchName")?.value.toLowerCase() || "";
  customEnemyFilters.entity =
    document.getElementById("customEnemyFilterEntity")?.value || "";
  customEnemyFilters.level =
    document.getElementById("customEnemyFilterLevel")?.value || "";

  renderCustomEnemies();
}

function clearCustomEnemyFilters() {
  const nameInput = document.getElementById("customEnemySearchName");
  const entitySelect = document.getElementById("customEnemyFilterEntity");
  const levelSelect = document.getElementById("customEnemyFilterLevel");

  if (nameInput) nameInput.value = "";
  if (entitySelect) entitySelect.selectedIndex = 0;
  if (levelSelect) levelSelect.selectedIndex = 0;

  customEnemyFilters = { name: "", entity: "", level: "" };
  renderCustomEnemies();
}

function addCustomToEncounter(enemyId) {
  const enemy = customEnemies.find((e) => e.id === enemyId);
  if (!enemy) return;

  if (typeof addBestiaryToCombat === "function") {
    addBestiaryToCombat(enemy.name, enemy);
  } else {
    alert("Combat tracker not available.");
  }
}

function deleteCustomEnemy(enemyId) {
  const enemy = customEnemies.find((e) => e.id === enemyId);
  if (!enemy) return;

  if (confirm(`Delete "${enemy.name}"?`)) {
    customEnemies = customEnemies.filter((e) => e.id !== enemyId);
    saveCustomEnemies();
    renderCustomEnemies();
  }
}

function editCustomEnemy(enemyId) {
  const enemy = customEnemies.find((e) => e.id === enemyId);
  if (!enemy) return;

  // Populate form fields
  document.getElementById("customEnemyName").value = enemy.name || "";
  document.getElementById("customEnemyDescription").value =
    enemy.description || "";
  document.getElementById("customEnemyLevel").value = enemy.level || 1;

  // Set entity selection
  window.customEnemySelectedEntities = enemy.entity || [];
  updateCustomEnemyEntityDisplay();

  document.getElementById("customEnemyHealth").value = enemy.health || 10;
  document.getElementById("customEnemyStress").value = enemy.stress || 0;
  document.getElementById("customEnemyDamage").value =
    enemy.damageInflicted || "3 points";
  document.getElementById("customEnemyMovement").value = enemy.movement || "";
  document.getElementById("customEnemyCombat").value = enemy.combat || "";
  document.getElementById("customEnemyModifications").value =
    enemy.modifications || "";
  document.getElementById("customEnemyGMNotes").value = enemy.gmNotes || "";

  // Clear and populate abilities
  const abilitiesList = document.getElementById("customEnemyAbilitiesList");
  abilitiesList.innerHTML = "";
  customAbilityCount = 0;

  if (enemy.abilities && enemy.abilities.length > 0) {
    enemy.abilities.forEach((ability) => {
      addCustomAbility();
      const abilityId = customAbilityCount;
      document.getElementById(`abilityName${abilityId}`).value = ability.name;
      document.getElementById(`abilityEffect${abilityId}`).value =
        ability.effect;
    });
  }

  // Set editing mode
  isEditingCustomEnemy = true;
  editingCustomEnemyId = enemyId;

  // Update form title
  const formTitle = document.getElementById("customEnemyFormTitle");
  if (formTitle) {
    formTitle.textContent = "Edit Enemy";
  }

  // Show form and scroll to it
  const form = document.getElementById("customEnemyForm");
  if (form) {
    form.style.display = "block";
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function saveCustomEnemies() {
  localStorage.setItem("gmTool_customEnemies", JSON.stringify(customEnemies));
}

function loadCustomEnemies() {
  const saved = localStorage.getItem("gmTool_customEnemies");
  if (saved) {
    customEnemies = JSON.parse(saved);
    populateCustomEnemyFilters();
  }
}

// ==================== JSON IMPORT/EXPORT FOR BESTIARY ==================== //
function exportBestiaryJSON() {
  if (customEnemies.length === 0) {
    alert("No enemies to export. Create some enemies first!");
    return;
  }

  const dataStr = JSON.stringify(customEnemies, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `bestiary-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  alert(`Exported ${customEnemies.length} enemies to JSON file!`);
}

function importBestiaryJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);

      if (!Array.isArray(imported)) {
        alert("Invalid JSON format. Expected an array of enemies.");
        return;
      }

      // Validate each enemy has required fields
      const validEnemies = imported.filter((enemy) => {
        return enemy.name && enemy.level;
      });

      if (validEnemies.length === 0) {
        alert(
          "No valid enemies found in the file. Each enemy needs at least a 'name' and 'level' field."
        );
        return;
      }

      // Ask if user wants to merge or replace
      let shouldMerge = false;
      if (customEnemies.length > 0) {
        shouldMerge = confirm(
          `You have ${customEnemies.length} existing enemies.\\n\\n` +
            `Click OK to ADD ${validEnemies.length} new enemies.\\n` +
            `Click Cancel to REPLACE all existing enemies.`
        );
      }

      if (shouldMerge) {
        // Ensure unique IDs
        const maxId = customEnemies.reduce(
          (max, e) => Math.max(max, e.id || 0),
          0
        );
        validEnemies.forEach((enemy, index) => {
          enemy.id = maxId + index + 1;
          customEnemies.push(enemy);
        });
      } else {
        // Replace all
        customEnemies = validEnemies.map((enemy, index) => ({
          ...enemy,
          id: index + 1,
        }));
      }

      saveCustomEnemies();
      clearCustomEnemyFilters();
      renderCustomEnemies();

      alert(
        `Successfully imported ${validEnemies.length} enemies!${
          imported.length !== validEnemies.length
            ? `\\n(${
                imported.length - validEnemies.length
              } entries skipped due to missing required fields)`
            : ""
        }`
      );

      // Clear the file input so the same file can be selected again
      event.target.value = "";
    } catch (error) {
      alert(`Error reading JSON file: ${error.message}`);
    }
  };

  reader.readAsText(file);
}

// Download bestiary template
function downloadBestiaryTemplate() {
  const template = [
    {
      name: "Example Enemy",
      level: 3,
      health: 12,
      stress: 0,
      description:
        "A detailed description of the enemy's appearance, behavior, and motivations. Include physical characteristics, personality traits, and any background information relevant to encounters.",
      entity: ["The Entity Name"],
      damageInflicted: "Serious injury",
      movement: "Short",
      combat:
        "Description of how this enemy fights, what weapons or methods it uses, and any special combat tactics or preferences.",
      modifications:
        "Any skill modifications (e.g., 'Stealth as level 5; perception as level 4')",
      abilities: [
        {
          name: "Ability Name",
          effect:
            "Detailed description of what the ability does, including any defense rolls required, damage dealt, duration of effects, and special conditions.",
        },
        {
          name: "Second Ability",
          effect:
            "Another ability description following the same format. Add as many abilities as needed for your enemy.",
        },
      ],
      gmNotes:
        "Optional: Add any private GM notes about using this enemy in your campaign.",
    },
  ];

  const dataStr = JSON.stringify(template, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "bestiary-template.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  alert(
    "Downloaded bestiary template! Edit this file with your own enemies and upload it using the 'Upload JSON' button."
  );
}
