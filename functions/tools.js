// Magnus Archives GM Tool - Random Generators & Tools

function generateRandomNPC() {
  const container = document.getElementById("randomNPCOutput");
  if (!container) return;

  // Random descriptor if available
  const descriptors = [
    "Bold",
    "Cautious",
    "Cynical",
    "Enigmatic",
    "Inquisitive",
    "Nervous",
    "Scholarly",
    "Suspicious",
  ];
  const descriptor =
    descriptors[Math.floor(Math.random() * descriptors.length)];

  // Random occupation
  const occupations = [
    "Librarian",
    "Journalist",
    "Archivist",
    "Police Officer",
    "Academic",
    "Researcher",
    "Paranormal Investigator",
    "Museum Curator",
    "Bookstore Owner",
    "Artist",
    "Technician",
  ];
  const occupation =
    occupations[Math.floor(Math.random() * occupations.length)];

  // Random personality trait
  const traits = [
    "skeptical",
    "believer",
    "terrified",
    "curious",
    "obsessed",
    "haunted",
    "desperate",
    "determined",
  ];
  const trait = traits[Math.floor(Math.random() * traits.length)];

  // Random entity connection (if applicable)
  const entities = [
    "The Eye",
    "The Spiral",
    "The Stranger",
    "The Flesh",
    "The Web",
    "The End",
    "The Buried",
    "The Dark",
    "The Lonely",
    "The Vast",
    "The Hunt",
    "The Corruption",
    "The Desolation",
    "The Slaughter",
    "None (mundane)",
  ];
  const entity = entities[Math.floor(Math.random() * entities.length)];

  const primaryColor = window.getThemeColor("primary");
  const primaryRgba = window.getThemeColor("primaryRgba");

  container.innerHTML = `
    <div style="background: ${primaryRgba(
      0.1
    )}; padding: 15px; border-radius: 6px; border: 1px solid ${primaryColor}; margin-top: 10px;">
      <h4 style="color: ${primaryColor}; margin-top: 0;">Generated NPC</h4>
      <p><strong>Personality:</strong> ${descriptor}, ${trait}</p>
      <p><strong>Occupation:</strong> ${occupation}</p>
      <p><strong>Entity Connection:</strong> ${entity}</p>
      <button class="button" onclick="createNPCFromGenerated('${descriptor}', '${occupation}', '${entity}')" style="margin-top: 10px;">Create NPC</button>
    </div>
  `;
}

function createNPCFromGenerated(descriptor, occupation, entity) {
  if (typeof addNPC === "function") {
    addNPC();
    // Pre-fill with generated data
    const lastNPC = npcs[npcs.length - 1];
    if (lastNPC) {
      lastNPC.name = `${descriptor} ${occupation}`;
      lastNPC.description = `A ${descriptor.toLowerCase()} ${occupation.toLowerCase()}${
        entity !== "None (mundane)" ? ` with a connection to ${entity}` : ""
      }`;
      renderNPCList();
    }
    switchToTab("npcs");
  }
}

function generateRandomEncounter() {
  const container = document.getElementById("randomEncounterOutput");
  if (!container || !customEnemies || customEnemies.length === 0) {
    if (container) {
      container.innerHTML =
        '<p style="color: #888;">No creatures available. Create custom enemies to generate random encounters.</p>';
    }
    return;
  }

  const tierInput = document.getElementById("encounterTier");
  const partyTier = tierInput ? parseInt(tierInput.value) : 1;

  // Filter creatures appropriate for the party tier
  const appropriateCreatures = customEnemies.filter((c) => {
    const level = parseInt(c.level) || 1;
    return level >= partyTier - 1 && level <= partyTier + 2;
  });

  if (appropriateCreatures.length === 0) {
    container.innerHTML =
      '<p style="color: #888;">No appropriate creatures found for this tier.</p>';
    return;
  }

  // Select random creature
  const creature =
    appropriateCreatures[
      Math.floor(Math.random() * appropriateCreatures.length)
    ];

  // Determine number of creatures
  const creatureLevel = parseInt(creature.level) || 1;
  let count = 1;
  if (creatureLevel < partyTier) {
    count = Math.floor(Math.random() * 3) + 2; // 2-4 weaker creatures
  } else if (creatureLevel === partyTier) {
    count = Math.floor(Math.random() * 2) + 1; // 1-2 equal creatures
  }

  const primaryColor = window.getThemeColor("primary");
  const primaryRgba = window.getThemeColor("primaryRgba");

  container.innerHTML = `
    <div style="background: ${primaryRgba(
      0.1
    )}; padding: 15px; border-radius: 6px; border: 1px solid ${primaryColor}; margin-top: 10px;">
      <h4 style="color: ${primaryColor}; margin-top: 0;">Random Encounter</h4>
      <p><strong>${count}x ${creature.name}</strong> (Level ${
    creature.level
  })</p>
      ${
        creature.entity
          ? `<p><strong>Entity:</strong> ${creature.entity}</p>`
          : ""
      }
      ${creature.description ? `<p>${creature.description}</p>` : ""}
      <div style="margin-top: 10px;">
        <strong>Stats per creature:</strong><br>
        Health: ${creature.health || 3} | Armor: ${
    creature.armor || 0
  } | Damage: ${creature.damage || 2}
      </div>
    </div>
  `;
}

function generateRandomCypher() {
  const container = document.getElementById("randomCypherOutput");
  if (!container || typeof CYPHERS_DATA === "undefined") return;

  const levelInput = document.getElementById("cypherLevel");
  const requestedLevel = levelInput ? parseInt(levelInput.value) : 1;

  // Filter cyphers by level range
  const appropriateCyphers = CYPHERS_DATA.filter((c) => {
    const minLevel = parseInt(c.minLevel) || 1;
    const maxLevel = parseInt(c.maxLevel) || 10;
    return requestedLevel >= minLevel && requestedLevel <= maxLevel;
  });

  if (appropriateCyphers.length === 0) {
    container.innerHTML =
      '<p style="color: #888;">No appropriate cyphers found for this level.</p>';
    return;
  }

  const cypher =
    appropriateCyphers[Math.floor(Math.random() * appropriateCyphers.length)];

  const primaryColor = window.getThemeColor("primary");
  const primaryRgba = window.getThemeColor("primaryRgba");

  container.innerHTML = `
    <div style="background: ${primaryRgba(
      0.1
    )}; padding: 15px; border-radius: 6px; border: 1px solid ${primaryColor}; margin-top: 10px;">
      <h4 style="color: ${primaryColor}; margin-top: 0;">${cypher.name}</h4>
      <p><strong>Level:</strong> ${requestedLevel}d6</p>
      ${cypher.entity ? `<p><strong>Entity:</strong> ${cypher.entity}</p>` : ""}
      ${cypher.form ? `<p><strong>Form:</strong> ${cypher.form}</p>` : ""}
      ${cypher.effect ? `<p><strong>Effect:</strong> ${cypher.effect}</p>` : ""}
      ${cypher.notes ? `<p><em>${cypher.notes}</em></p>` : ""}
    </div>
  `;
}

function generateInvestigationHook() {
  const container = document.getElementById("investigationHookOutput");
  if (!container) return;

  // Random investigation elements
  const locations = [
    "abandoned library",
    "old bookshop",
    "university archive",
    "psychiatric hospital",
    "private collection",
    "museum basement",
    "condemned building",
    "storage facility",
    "antique shop",
    "old theater",
  ];
  const mysteries = [
    "strange disappearances",
    "recurring nightmares",
    "impossible geometry",
    "missing persons case",
    "unexplained phenomena",
    "cursed object",
    "supernatural creature",
    "reality distortions",
    "temporal anomalies",
    "entity manifestation",
  ];
  const witnesses = [
    "terrified witness",
    "obsessed researcher",
    "haunted survivor",
    "skeptical detective",
    "desperate family member",
    "anonymous tip",
    "former colleague",
    "mysterious informant",
  ];

  const location = locations[Math.floor(Math.random() * locations.length)];
  const mystery = mysteries[Math.floor(Math.random() * mysteries.length)];
  const witness = witnesses[Math.floor(Math.random() * witnesses.length)];

  // Random entity
  const entities = [
    "The Eye",
    "The Spiral",
    "The Stranger",
    "The Flesh",
    "The Web",
    "The End",
    "The Buried",
    "The Dark",
    "The Lonely",
    "The Vast",
    "The Hunt",
    "The Corruption",
    "The Desolation",
    "The Slaughter",
  ];
  const entity = entities[Math.floor(Math.random() * entities.length)];

  const primaryColor = window.getThemeColor("primary");
  const primaryRgba = window.getThemeColor("primaryRgba");

  container.innerHTML = `
    <div style="background: ${primaryRgba(
      0.1
    )}; padding: 15px; border-radius: 6px; border: 1px solid ${primaryColor}; margin-top: 10px;">
      <h4 style="color: ${primaryColor}; margin-top: 0;">Investigation Hook</h4>
      <p>A <strong>${witness}</strong> reports <strong>${mystery}</strong> at a <strong>${location}</strong>.</p>
      <p style="margin-top: 10px;"><strong>Potential Entity:</strong> ${entity}</p>
      <div style="margin-top: 15px; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 4px;">
        <strong>GM Tip:</strong> Consider what drew the Entity's attention to this location. What makes it significant? What do the investigators find first?
      </div>
    </div>
  `;
}

function quickRoll(sides) {
  const result = Math.floor(Math.random() * sides) + 1;
  const container = document.getElementById("quickRollResult");

  const primaryColor = window.getThemeColor("primary");

  if (container) {
    container.innerHTML = `
      <div style="font-size: 2em; color: ${primaryColor}; font-weight: bold;">
        ${result}
      </div>
      <div style="color: #888; margin-top: 5px;">
        Rolled 1d${sides}
      </div>
    `;
  }

  // Add to roll log
  if (typeof addToRollLog === "function") {
    addToRollLog(`d${sides}`, result);
  }
}

// Plot threads management
let plotThreads = [];
let plotThreadsFilters = { name: "", entity: "" };

function addPlotThread() {
  const thread = {
    id: Date.now(),
    title: "",
    description: "",
    status: "active",
    entities: [],
    clues: [],
    npcs: [],
    artefacts: [],
    leitners: [],
    enemies: [],
    collapsed: false,
    editMode: true,
  };

  plotThreads.push(thread);
  renderPlotThreads();
}

function togglePlotThreadEditMode(id) {
  const thread = plotThreads.find((t) => t.id === id);
  if (thread) {
    thread.editMode = !thread.editMode;
    renderPlotThreads();
    savePlotThreads();
  }
}

function removePlotThread(id) {
  if (confirm("Remove this plot thread?")) {
    plotThreads = plotThreads.filter((t) => t.id !== id);
    renderPlotThreads();
    savePlotThreads();
  }
}

function togglePlotThread(id, isOpen) {
  const thread = plotThreads.find((t) => t.id === id);
  if (thread) {
    thread.collapsed = !isOpen;
    savePlotThreads();
  }
}

function updatePlotThread(id, field, value) {
  const thread = plotThreads.find((t) => t.id === id);
  if (thread) {
    thread[field] = value;
    savePlotThreads();
  }
}

function addClueToPlotThread(id) {
  const thread = plotThreads.find((t) => t.id === id);
  if (thread) {
    if (!thread.clues) thread.clues = [];
    thread.clues.push("");
    renderPlotThreads();
    savePlotThreads();
  }
}

function updatePlotThreadClue(threadId, clueIndex, value) {
  const thread = plotThreads.find((t) => t.id === threadId);
  if (thread && thread.clues) {
    thread.clues[clueIndex] = value;
    savePlotThreads();
  }
}

function removePlotThreadClue(threadId, clueIndex) {
  const thread = plotThreads.find((t) => t.id === threadId);
  if (thread && thread.clues) {
    thread.clues.splice(clueIndex, 1);
    renderPlotThreads();
    savePlotThreads();
  }
}

function addNPCToPlotThread(id) {
  const select = document.getElementById(`plotThreadNPCSelect_${id}`);
  if (!select || !select.value) return;

  const thread = plotThreads.find((t) => t.id === id);
  const npcId = parseInt(select.value);
  const npcsList = typeof npcs !== "undefined" ? npcs : [];
  const npc = npcsList.find((n) => n.id === npcId);

  if (thread && npc) {
    if (!thread.npcs) thread.npcs = [];
    if (!thread.npcs.find((n) => n.id === npcId)) {
      thread.npcs.push({ id: npc.id, name: npc.name, data: npc });
      renderPlotThreads();
      savePlotThreads();
    }
  }
}

function removePlotThreadNPC(threadId, npcId) {
  const thread = plotThreads.find((t) => t.id === threadId);
  if (thread && thread.npcs) {
    thread.npcs = thread.npcs.filter((n) => n.id !== npcId);
    renderPlotThreads();
    savePlotThreads();
  }
}

// Plot thread entity checkbox dropdown functions
function togglePlotThreadEntity(threadId, entity) {
  const thread = plotThreads.find((t) => t.id === threadId);
  if (!thread) return;

  if (!thread.entities) thread.entities = [];

  const index = thread.entities.indexOf(entity);
  if (index > -1) {
    thread.entities.splice(index, 1);
  } else {
    thread.entities.push(entity);
  }

  updatePlotThreadEntityDisplay(threadId);
  savePlotThreads();
}

function removePlotThreadEntity(threadId, entity) {
  const thread = plotThreads.find((t) => t.id === threadId);
  if (!thread) return;

  if (!thread.entities) thread.entities = [];
  thread.entities = thread.entities.filter((e) => e !== entity);

  updatePlotThreadEntityDisplay(threadId);
  savePlotThreads();
}

function togglePlotThreadEntityDropdown(threadId) {
  const dropdown = document.getElementById(
    `plotThreadEntityDropdown_${threadId}`
  );
  const trigger = document.getElementById(
    `plotThreadEntityTrigger_${threadId}`
  );

  if (!dropdown || !trigger) return;

  if (dropdown.style.display === "none") {
    dropdown.style.display = "block";
    trigger.classList.add("open");
  } else {
    dropdown.style.display = "none";
    trigger.classList.remove("open");
  }
}

function updatePlotThreadEntityDisplay(threadId) {
  const thread = plotThreads.find((t) => t.id === threadId);
  if (!thread) return;

  const trigger = document.getElementById(
    `plotThreadEntityTrigger_${threadId}`
  );
  const dropdown = document.getElementById(
    `plotThreadEntityDropdown_${threadId}`
  );

  if (!trigger || !dropdown) return;

  const entities = thread.entities || [];

  // Update trigger display
  if (entities.length > 0) {
    trigger.innerHTML = entities
      .map(
        (e) => `
      <span class="multiselect-tag">
        ${e.replace("The ", "")}
        <span class="multiselect-tag-remove" onclick="event.stopPropagation(); removePlotThreadEntity(${threadId}, '${e}')">×</span>
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

// Artefact management functions
function addArtefactToPlotThread(id) {
  const select = document.getElementById(`plotThreadArtefactSelect_${id}`);
  if (!select || !select.value) return;

  const thread = plotThreads.find((t) => t.id === id);
  const artefactId = parseInt(select.value);
  const artefactsList =
    typeof customArtefacts !== "undefined" ? customArtefacts : [];
  const artefact = artefactsList.find((a) => a.id === artefactId);

  if (thread && artefact) {
    if (!thread.artefacts) thread.artefacts = [];
    if (!thread.artefacts.find((a) => a.id === artefactId)) {
      thread.artefacts.push({
        id: artefact.id,
        name: artefact.name,
        data: artefact,
      });
      renderPlotThreads();
      savePlotThreads();
    }
  }
}

function removePlotThreadArtefact(threadId, artefactId) {
  const thread = plotThreads.find((t) => t.id === threadId);
  if (thread && thread.artefacts) {
    thread.artefacts = thread.artefacts.filter((a) => a.id !== artefactId);
    renderPlotThreads();
    savePlotThreads();
  }
}

// Leitner management functions
function addLeitnerToPlotThread(id) {
  const select = document.getElementById(`plotThreadLeitnerSelect_${id}`);
  if (!select || !select.value) return;

  const thread = plotThreads.find((t) => t.id === id);
  const leitnerId = parseInt(select.value);
  const leitnersList =
    typeof customLeitners !== "undefined" ? customLeitners : [];
  const leitner = leitnersList.find((l) => l.id === leitnerId);

  if (thread && leitner) {
    if (!thread.leitners) thread.leitners = [];
    if (!thread.leitners.find((l) => l.id === leitnerId)) {
      thread.leitners.push({
        id: leitner.id,
        name: leitner.name,
        data: leitner,
      });
      renderPlotThreads();
      savePlotThreads();
    }
  }
}

function removePlotThreadLeitner(threadId, leitnerId) {
  const thread = plotThreads.find((t) => t.id === threadId);
  if (thread && thread.leitners) {
    thread.leitners = thread.leitners.filter((l) => l.id !== leitnerId);
    renderPlotThreads();
    savePlotThreads();
  }
}

// Enemy management functions
function addEnemyToPlotThread(id) {
  const select = document.getElementById(`plotThreadEnemySelect_${id}`);
  if (!select || !select.value) return;

  const thread = plotThreads.find((t) => t.id === id);
  const enemyId = parseInt(select.value);
  const enemiesList = typeof customEnemies !== "undefined" ? customEnemies : [];
  const enemy = enemiesList.find((e) => e.id === enemyId);

  if (thread && enemy) {
    if (!thread.enemies) thread.enemies = [];
    if (!thread.enemies.find((e) => e.id === enemyId)) {
      thread.enemies.push({ id: enemy.id, name: enemy.name, data: enemy });
      renderPlotThreads();
      savePlotThreads();
    }
  }
}

function removePlotThreadEnemy(threadId, enemyId) {
  const thread = plotThreads.find((t) => t.id === threadId);
  if (thread && thread.enemies) {
    thread.enemies = thread.enemies.filter((e) => e.id !== enemyId);
    renderPlotThreads();
    savePlotThreads();
  }
}

function filterPlotThreads() {
  plotThreadsFilters.name =
    document.getElementById("plotThreadSearchName")?.value.toLowerCase() || "";
  plotThreadsFilters.entity =
    document.getElementById("plotThreadFilterEntity")?.value || "";
  renderPlotThreads();
}

function clearPlotThreadsFilters() {
  const nameInput = document.getElementById("plotThreadSearchName");
  const entitySelect = document.getElementById("plotThreadFilterEntity");

  if (nameInput) nameInput.value = "";
  if (entitySelect) entitySelect.selectedIndex = 0;

  plotThreadsFilters = { name: "", entity: "" };
  renderPlotThreads();
}

function sortPlotThreads(sortBy) {
  if (sortBy === "name") {
    plotThreads.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  } else if (sortBy === "status") {
    const statusOrder = { active: 0, paused: 1, resolved: 2 };
    plotThreads.sort(
      (a, b) =>
        statusOrder[a.status || "active"] - statusOrder[b.status || "active"]
    );
  }
  renderPlotThreads();
  savePlotThreads();
}

function renderPlotThreads() {
  const container = document.getElementById("plotThreadsList");
  if (!container) return;

  if (plotThreads.length === 0) {
    container.innerHTML =
      '<p class="empty-state" style="text-align: center; color: #888;">No active plot threads. Add them as your story unfolds.</p>';
    return;
  }

  // Apply filters
  let filtered = plotThreads;

  if (plotThreadsFilters.name) {
    filtered = filtered.filter(
      (thread) =>
        (thread.title || "").toLowerCase().includes(plotThreadsFilters.name) ||
        (thread.description || "")
          .toLowerCase()
          .includes(plotThreadsFilters.name)
    );
  }

  if (plotThreadsFilters.entity) {
    filtered = filtered.filter(
      (thread) =>
        thread.entities && thread.entities.includes(plotThreadsFilters.entity)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML =
      '<p class="empty-state" style="text-align: center; color: #888;">No plot threads found matching filters.</p>';
    return;
  }

  const entities = [
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

  const npcsList = typeof npcs !== "undefined" ? npcs : [];
  const artefactsList =
    typeof customArtefacts !== "undefined" ? customArtefacts : [];
  const leitnersList =
    typeof customLeitners !== "undefined" ? customLeitners : [];
  const enemiesList = typeof customEnemies !== "undefined" ? customEnemies : [];

  container.innerHTML = filtered
    .map((thread) => {
      const isEditMode = thread.editMode !== false; // Default to true if not set

      return `
    <details ${
      thread.collapsed ? "" : "open"
    } style="background: rgba(0, 0, 0, 0.3); padding: 0; border-radius: 6px; border-left: 3px solid #4CAF50; margin-bottom: 10px;" ontoggle="togglePlotThread(${
        thread.id
      }, this.open)">
      <summary style="padding: 12px 15px; cursor: pointer; font-weight: bold; color: #4CAF50; user-select: none;">
        ${
          thread.title || "Untitled Plot Thread"
        } <span style="color: #888; font-weight: normal; font-size: 0.9em;">[${
        thread.status || "active"
      }]</span>
      </summary>
      <div style="padding: 15px; border-top: 1px solid rgba(76, 175, 80, 0.3);">
        ${
          isEditMode
            ? `
        <!-- EDIT MODE: Title, Status, and Buttons on same line -->
        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
          <input 
            type="text" 
            value="${thread.title || ""}" 
            placeholder="Plot thread title..." 
            onchange="updatePlotThread(${
              thread.id
            }, 'title', this.value); renderPlotThreads();"
            style="flex: 1; font-weight: bold; font-size: 1.1em; background: rgba(0,0,0,0.3); border: 1px solid #4CAF50; padding: 6px; border-radius: 4px; color: #4CAF50;"
          />
          <select onchange="updatePlotThread(${
            thread.id
          }, 'status', this.value); renderPlotThreads();" style="padding: 6px; background: rgba(0,0,0,0.3); border: 1px solid #4CAF50; color: #4CAF50; border-radius: 4px;">
            <option value="active" ${
              thread.status === "active" ? "selected" : ""
            }>Active</option>
            <option value="resolved" ${
              thread.status === "resolved" ? "selected" : ""
            }>Resolved</option>
            <option value="paused" ${
              thread.status === "paused" ? "selected" : ""
            }>Paused</option>
          </select>
          <button onclick="togglePlotThreadEditMode(${
            thread.id
          })" style="background: rgba(33, 150, 243, 0.2); border: 1px solid #2196F3; color: #64B5F6; padding: 6px 12px; border-radius: 4px; cursor: pointer; white-space: nowrap;">
            📖 View Mode
          </button>
          <button onclick="removePlotThread(${
            thread.id
          })" style="background: rgba(244, 67, 54, 0.2); border: 1px solid #f44336; color: #ef5350; padding: 6px 12px; border-radius: 4px; cursor: pointer; white-space: nowrap;">Remove</button>
        </div>

        <div style="margin-bottom: 15px;">
          <label style="display: block; color: #888; font-size: 0.9em; margin-bottom: 5px;">Description</label>
          <textarea 
            placeholder="Details about this plot thread..." 
            onchange="updatePlotThread(${thread.id}, 'description', this.value)"
            style="width: 100%; min-height: 60px; background: rgba(0,0,0,0.3); border: 1px solid #4CAF50; padding: 8px; border-radius: 4px; color: #e0e0e0; resize: vertical;"
          >${thread.description || ""}</textarea>
        </div>

        <div style="margin-bottom: 15px;">
          <label style="display: block; color: #888; font-size: 0.9em; margin-bottom: 5px;">Related Entities</label>
          <div class="custom-multiselect">
            <div class="multiselect-trigger" id="plotThreadEntityTrigger_${
              thread.id
            }" onclick="togglePlotThreadEntityDropdown(${thread.id})">
              <span class="multiselect-placeholder">Select entities...</span>
            </div>
            <div class="multiselect-dropdown" id="plotThreadEntityDropdown_${
              thread.id
            }" style="display: none;">
              ${entities
                .map(
                  (e) => `
                <div class="multiselect-option" data-entity="${e}" onclick="event.stopPropagation(); togglePlotThreadEntity(${
                    thread.id
                  }, '${e}')">
                  <input type="checkbox" ${
                    (thread.entities || []).includes(e) ? "checked" : ""
                  } />
                  ${e}
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>

        <script>
          // Initialize entity display for thread ${thread.id}
          setTimeout(() => updatePlotThreadEntityDisplay(${thread.id}), 0);
        </script>

        <div style="margin-bottom: 15px;">
          <label style="display: block; color: #888; font-size: 0.9em; margin-bottom: 5px;">Clues & Omens</label>
          <div id="plotThreadClues_${
            thread.id
          }" style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 8px;">
            ${(thread.clues || [])
              .map(
                (clue, idx) => `
              <div style="display: flex; gap: 6px; align-items: center;">
                <input 
                  type="text" 
                  value="${clue}" 
                  placeholder="Enter clue or omen..." 
                  onchange="updatePlotThreadClue(${thread.id}, ${idx}, this.value)"
                  style="flex: 1; background: rgba(0,0,0,0.3); border: 1px solid #4CAF50; padding: 6px; border-radius: 4px; color: #e0e0e0;"
                />
                <button onclick="removePlotThreadClue(${thread.id}, ${idx})" style="background: rgba(244, 67, 54, 0.2); border: 1px solid #f44336; color: #ef5350; padding: 6px 10px; border-radius: 4px; cursor: pointer;">✕</button>
              </div>
            `
              )
              .join("")}
          </div>
          <button onclick="addClueToPlotThread(${
            thread.id
          })" style="background: rgba(76, 175, 80, 0.2); border: 1px solid #4CAF50; color: #66bb6a; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.9em;">+ Add Clue</button>
        </div>

        <div style="margin-bottom: 15px;">
          <label style="display: block; color: #888; font-size: 0.9em; margin-bottom: 5px;">Related NPCs</label>
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <select id="plotThreadNPCSelect_${
              thread.id
            }" style="flex: 1; background: rgba(0,0,0,0.3); border: 1px solid #4CAF50; padding: 6px; border-radius: 4px; color: #4CAF50;">
              <option value="">-- Select NPC --</option>
              ${npcsList
                .filter(
                  (npc) => !(thread.npcs || []).find((n) => n.id === npc.id)
                )
                .sort((a, b) => {
                  const nameA = (a.name || "").replace(/^(The|A|An)\s+/i, "");
                  const nameB = (b.name || "").replace(/^(The|A|An)\s+/i, "");
                  return nameA.localeCompare(nameB);
                })
                .map(
                  (npc) =>
                    `<option value="${npc.id}">${
                      npc.name || "Unnamed NPC"
                    }</option>`
                )
                .join("")}
            </select>
            <button onclick="addNPCToPlotThread(${
              thread.id
            })" style="background: rgba(76, 175, 80, 0.2); border: 1px solid #4CAF50; color: #66bb6a; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Add</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${(thread.npcs || [])
              .map((npc) => {
                const role = npc.data?.role || "";
                const affiliation = npc.data?.affiliation || "";
                const subtitle = [role, affiliation]
                  .filter((s) => s)
                  .join(" • ");
                const dataId = `plotthread_npc_${thread.id}_${
                  npc.id
                }_${Math.random().toString(36).substr(2, 9)}`;
                window.entityPopupData = window.entityPopupData || {};
                window.entityPopupData[dataId] = npc.data || {};
                return `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: rgba(76, 175, 80, 0.1); border: 1px solid #4CAF50; border-radius: 4px;">
                  <div style="flex: 1;">
                    <div style="color: #4CAF50; font-weight: bold;">
                      <span class="entity-clickable" onclick='showEntityPopup("npc", "${dataId}", "npcs")'>${
                  npc.name
                }</span>
                    </div>
                    ${
                      subtitle
                        ? `<div style="color: #888; font-size: 0.85em; margin-top: 2px;">${subtitle}</div>`
                        : ""
                    }
                  </div>
                  <button onclick="removePlotThreadNPC(${thread.id}, ${
                  npc.id
                })" style="background: rgba(244, 67, 54, 0.2); border: 1px solid #f44336; color: #ef5350; padding: 4px 8px; border-radius: 3px; cursor: pointer;">✕</button>
                </div>
              `;
              })
              .join("")}
          </div>
        </div>

        <div style="margin-bottom: 15px;">
          <label style="display: block; color: #888; font-size: 0.9em; margin-bottom: 5px;">Related Artefacts</label>
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <select id="plotThreadArtefactSelect_${
              thread.id
            }" style="flex: 1; background: rgba(0,0,0,0.3); border: 1px solid #4CAF50; padding: 6px; border-radius: 4px; color: #4CAF50;">
              <option value="">-- Select Artefact --</option>
              ${artefactsList
                .filter(
                  (artefact) =>
                    !(thread.artefacts || []).find((a) => a.id === artefact.id)
                )
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
                .join("")}
            </select>
            <button onclick="addArtefactToPlotThread(${
              thread.id
            })" style="background: rgba(76, 175, 80, 0.2); border: 1px solid #4CAF50; color: #66bb6a; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Add</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${(thread.artefacts || [])
              .map((artefact) => {
                const entity =
                  artefact.data?.relatedEntity || artefact.data?.entity || "";
                const entityDisplay = Array.isArray(entity)
                  ? entity.join(", ")
                  : entity;
                const dataId = `plotthread_artefact_${thread.id}_${
                  artefact.id
                }_${Math.random().toString(36).substr(2, 9)}`;
                window.entityPopupData = window.entityPopupData || {};
                window.entityPopupData[dataId] = artefact.data || {};
                return `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: rgba(76, 175, 80, 0.1); border: 1px solid #4CAF50; border-radius: 4px;">
                  <div style="flex: 1;">
                    <div style="color: #4CAF50; font-weight: bold;">
                      <span class="entity-clickable" onclick='showEntityPopup("artefact", "${dataId}", "artefacts")'>${
                  artefact.name
                }</span>
                    </div>
                    ${
                      entityDisplay
                        ? `<div style="color: #888; font-size: 0.85em; margin-top: 2px;">${entityDisplay}</div>`
                        : ""
                    }
                  </div>
                  <button onclick="removePlotThreadArtefact(${thread.id}, ${
                  artefact.id
                })" style="background: rgba(244, 67, 54, 0.2); border: 1px solid #f44336; color: #ef5350; padding: 4px 8px; border-radius: 3px; cursor: pointer;">✕</button>
                </div>
              `;
              })
              .join("")}
          </div>
        </div>

        <div style="margin-bottom: 15px;">
          <label style="display: block; color: #888; font-size: 0.9em; margin-bottom: 5px;">Related Leitners</label>
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <select id="plotThreadLeitnerSelect_${
              thread.id
            }" style="flex: 1; background: rgba(0,0,0,0.3); border: 1px solid #4CAF50; padding: 6px; border-radius: 4px; color: #4CAF50;">
              <option value="">-- Select Leitner --</option>
              ${leitnersList
                .filter(
                  (leitner) =>
                    !(thread.leitners || []).find((l) => l.id === leitner.id)
                )
                .sort((a, b) => {
                  const nameA = (a.name || "").replace(/^(The|A|An)\s+/i, "");
                  const nameB = (b.name || "").replace(/^(The|A|An)\s+/i, "");
                  return nameA.localeCompare(nameB);
                })
                .map(
                  (leitner) =>
                    `<option value="${leitner.id}">${
                      leitner.name || "Unnamed Leitner"
                    }</option>`
                )
                .join("")}
            </select>
            <button onclick="addLeitnerToPlotThread(${
              thread.id
            })" style="background: rgba(76, 175, 80, 0.2); border: 1px solid #4CAF50; color: #66bb6a; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Add</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${(thread.leitners || [])
              .map((leitner) => {
                const entity =
                  leitner.data?.relatedEntity || leitner.data?.entity || "";
                const entityDisplay = Array.isArray(entity)
                  ? entity.join(", ")
                  : entity;
                const dataId = `plotthread_leitner_${thread.id}_${
                  leitner.id
                }_${Math.random().toString(36).substr(2, 9)}`;
                window.entityPopupData = window.entityPopupData || {};
                window.entityPopupData[dataId] = leitner.data || {};
                return `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: rgba(76, 175, 80, 0.1); border: 1px solid #4CAF50; border-radius: 4px;">
                  <div style="flex: 1;">
                    <div style="color: #4CAF50; font-weight: bold;">
                      <span class="entity-clickable" onclick='showEntityPopup("leitner", "${dataId}", "artefacts")'>${
                  leitner.name
                }</span>
                    </div>
                    ${
                      entityDisplay
                        ? `<div style="color: #888; font-size: 0.85em; margin-top: 2px;">${entityDisplay}</div>`
                        : ""
                    }
                  </div>
                  <button onclick="removePlotThreadLeitner(${thread.id}, ${
                  leitner.id
                })" style="background: rgba(244, 67, 54, 0.2); border: 1px solid #f44336; color: #ef5350; padding: 4px 8px; border-radius: 3px; cursor: pointer;">✕</button>
                </div>
              `;
              })
              .join("")}
          </div>
        </div>

        <div style="margin-bottom: 15px;">
          <label style="display: block; color: #888; font-size: 0.9em; margin-bottom: 5px;">Related Enemies</label>
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <select id="plotThreadEnemySelect_${
              thread.id
            }" style="flex: 1; background: rgba(0,0,0,0.3); border: 1px solid #4CAF50; padding: 6px; border-radius: 4px; color: #4CAF50;">
              <option value="">-- Select Enemy --</option>
              ${enemiesList
                .filter(
                  (enemy) =>
                    !(thread.enemies || []).find((e) => e.id === enemy.id)
                )
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
                .join("")}
            </select>
            <button onclick="addEnemyToPlotThread(${
              thread.id
            })" style="background: rgba(76, 175, 80, 0.2); border: 1px solid #4CAF50; color: #66bb6a; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Add</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${(thread.enemies || [])
              .map((enemy) => {
                const entity = enemy.data?.entity || "";
                const entityDisplay = Array.isArray(entity)
                  ? entity.join(", ")
                  : entity;
                const level = enemy.data?.level || "";
                const subtitle = [entityDisplay, level ? `Level ${level}` : ""]
                  .filter((s) => s)
                  .join(" • ");
                const dataId = `plotthread_enemy_${thread.id}_${
                  enemy.id
                }_${Math.random().toString(36).substr(2, 9)}`;
                window.entityPopupData = window.entityPopupData || {};
                window.entityPopupData[dataId] = enemy.data || {};
                return `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: rgba(76, 175, 80, 0.1); border: 1px solid #4CAF50; border-radius: 4px;">
                  <div style="flex: 1;">
                    <div style="color: #4CAF50; font-weight: bold;">
                      <span class="entity-clickable" onclick='showEntityPopup("enemy", "${dataId}", "bestiary")'>${
                  enemy.name
                }</span>
                    </div>
                    ${
                      subtitle
                        ? `<div style="color: #888; font-size: 0.85em; margin-top: 2px;">${subtitle}</div>`
                        : ""
                    }
                  </div>
                  <button onclick="removePlotThreadEnemy(${thread.id}, ${
                  enemy.id
                })" style="background: rgba(244, 67, 54, 0.2); border: 1px solid #f44336; color: #ef5350; padding: 4px 8px; border-radius: 3px; cursor: pointer;">✕</button>
                </div>
              `;
              })
              .join("")}
          </div>
        </div>
        `
            : `
        <!-- VIEW MODE -->
        <div style="margin-bottom: 15px; padding: 12px; background: rgba(0,0,0,0.3); border: 1px solid #4CAF50; border-radius: 6px;">
        
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 8px; background: rgba(0,0,0,0.2); border: 1px solid rgba(76, 175, 80, 0.5); border-radius: 4px; margin-bottom: 12px;">
            <div>
              <span style="color: #888; font-size: 0.9em;">Status:</span> <span style="color: ${
                thread.status === "active"
                  ? "#4CAF50"
                  : thread.status === "resolved"
                  ? "#2196F3"
                  : "#FF9800"
              }; font-weight: bold;">${thread.status || "active"}</span>
            </div>
            <div style="display: flex; gap: 8px;">
              <button onclick="togglePlotThreadEditMode(${
                thread.id
              })" style="background: rgba(33, 150, 243, 0.2); border: 1px solid #2196F3; color: #64B5F6; padding: 6px 12px; border-radius: 4px; cursor: pointer; white-space: nowrap;">
                ✏️ Edit Mode
              </button>
              <button onclick="removePlotThread(${
                thread.id
              })" style="background: rgba(244, 67, 54, 0.2); border: 1px solid #f44336; color: #ef5350; padding: 6px 12px; border-radius: 4px; cursor: pointer; white-space: nowrap;">Remove</button>
            </div>
          </div>
          ${
            thread.description
              ? `<div style="padding: 12px; background: rgba(0,0,0,0.2); border: 1px solid rgba(76, 175, 80, 0.5); border-radius: 4px; margin-bottom: 12px;">
                   <div style="color: #888; font-size: 0.85em; font-weight: bold; margin-bottom: 6px;">Description</div>
                   <div style="color: #e0e0e0; white-space: pre-wrap;">${thread.description}</div>
                 </div>`
              : '<div style="color: #666; font-style: italic; padding: 8px;">No description</div>'
          }
        </div>

        ${
          thread.entities && thread.entities.length > 0
            ? `
        <div style="margin-bottom: 15px;">
          <div style="color: #888; font-size: 0.9em; font-weight: bold; margin-bottom: 6px;">Related Entities</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${thread.entities
              .map(
                (e) =>
                  `<span style="background: rgba(76, 175, 80, 0.2); border: 1px solid #4CAF50; color: #66bb6a; padding: 4px 10px; border-radius: 4px; font-size: 0.9em;">${e}</span>`
              )
              .join("")}
          </div>
        </div>
        `
            : ""
        }

        ${
          thread.clues && thread.clues.length > 0
            ? `
        <div style="margin-bottom: 15px; padding: 12px; background: rgba(0,0,0,0.2); border: 1px solid rgba(76, 175, 80, 0.5); border-radius: 4px;">
          <div style="color: #888; font-size: 0.85em; font-weight: bold; margin-bottom: 8px;">Clues & Omens</div>
          <ul style="margin: 0; padding-left: 20px; color: #e0e0e0;">
            ${thread.clues
              .map((clue) => `<li style="margin-bottom: 6px;">${clue}</li>`)
              .join("")}
          </ul>
        </div>
        `
            : ""
        }

        ${
          thread.npcs && thread.npcs.length > 0
            ? `
        <div style="margin-bottom: 15px;">
          <div style="color: #888; font-size: 0.9em; font-weight: bold; margin-bottom: 6px;">Related NPCs</div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${(thread.npcs || [])
              .map((npc) => {
                const role = npc.data?.role || "";
                const affiliation = npc.data?.affiliation || "";
                const subtitle = [role, affiliation]
                  .filter((s) => s)
                  .join(" • ");
                const dataId = `plotthread_npc_view_${thread.id}_${
                  npc.id
                }_${Math.random().toString(36).substr(2, 9)}`;
                window.entityPopupData = window.entityPopupData || {};
                window.entityPopupData[dataId] = npc.data || {};
                return `
                <div style="padding: 8px; background: rgba(76, 175, 80, 0.1); border: 1px solid #4CAF50; border-radius: 4px;">
                  <div style="color: #4CAF50; font-weight: bold;">
                    <span class="entity-clickable" onclick='showEntityPopup("npc", "${dataId}", "npcs")'>${
                  npc.name
                }</span>
                  </div>
                  ${
                    subtitle
                      ? `<div style="color: #888; font-size: 0.85em; margin-top: 2px;">${subtitle}</div>`
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
          thread.artefacts && thread.artefacts.length > 0
            ? `
        <div style="margin-bottom: 15px;">
          <div style="color: #888; font-size: 0.9em; font-weight: bold; margin-bottom: 6px;">Related Artefacts</div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${(thread.artefacts || [])
              .map((artefact) => {
                const entity =
                  artefact.data?.relatedEntity || artefact.data?.entity || "";
                const entityDisplay = Array.isArray(entity)
                  ? entity.join(", ")
                  : entity;
                const dataId = `plotthread_artefact_view_${thread.id}_${
                  artefact.id
                }_${Math.random().toString(36).substr(2, 9)}`;
                window.entityPopupData = window.entityPopupData || {};
                window.entityPopupData[dataId] = artefact.data || {};
                return `
                <div style="padding: 8px; background: rgba(76, 175, 80, 0.1); border: 1px solid #4CAF50; border-radius: 4px;">
                  <div style="color: #4CAF50; font-weight: bold;">
                    <span class="entity-clickable" onclick='showEntityPopup("artefact", "${dataId}", "artefacts")'>${
                  artefact.name
                }</span>
                  </div>
                  ${
                    entityDisplay
                      ? `<div style="color: #888; font-size: 0.85em; margin-top: 2px;">${entityDisplay}</div>`
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
          thread.leitners && thread.leitners.length > 0
            ? `
        <div style="margin-bottom: 15px;">
          <div style="color: #888; font-size: 0.9em; font-weight: bold; margin-bottom: 6px;">Related Leitners</div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${(thread.leitners || [])
              .map((leitner) => {
                const entity =
                  leitner.data?.relatedEntity || leitner.data?.entity || "";
                const entityDisplay = Array.isArray(entity)
                  ? entity.join(", ")
                  : entity;
                const dataId = `plotthread_leitner_view_${thread.id}_${
                  leitner.id
                }_${Math.random().toString(36).substr(2, 9)}`;
                window.entityPopupData = window.entityPopupData || {};
                window.entityPopupData[dataId] = leitner.data || {};
                return `
                <div style="padding: 8px; background: rgba(76, 175, 80, 0.1); border: 1px solid #4CAF50; border-radius: 4px;">
                  <div style="color: #4CAF50; font-weight: bold;">
                    <span class="entity-clickable" onclick='showEntityPopup("leitner", "${dataId}", "artefacts")'>${
                  leitner.name
                }</span>
                  </div>
                  ${
                    entityDisplay
                      ? `<div style="color: #888; font-size: 0.85em; margin-top: 2px;">${entityDisplay}</div>`
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
          thread.enemies && thread.enemies.length > 0
            ? `
        <div style="margin-bottom: 15px;">
          <div style="color: #888; font-size: 0.9em; font-weight: bold; margin-bottom: 6px;">Related Enemies</div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${(thread.enemies || [])
              .map((enemy) => {
                const entity = enemy.data?.entity || "";
                const entityDisplay = Array.isArray(entity)
                  ? entity.join(", ")
                  : entity;
                const level = enemy.data?.level || "";
                const subtitle = [entityDisplay, level ? `Level ${level}` : ""]
                  .filter((s) => s)
                  .join(" • ");
                const dataId = `plotthread_enemy_view_${thread.id}_${
                  enemy.id
                }_${Math.random().toString(36).substr(2, 9)}`;
                window.entityPopupData = window.entityPopupData || {};
                window.entityPopupData[dataId] = enemy.data || {};
                return `
                <div style="padding: 8px; background: rgba(76, 175, 80, 0.1); border: 1px solid #4CAF50; border-radius: 4px;">
                  <div style="color: #4CAF50; font-weight: bold;">
                    <span class="entity-clickable" onclick='showEntityPopup("enemy", "${dataId}", "bestiary")'>${
                  enemy.name
                }</span>
                  </div>
                  ${
                    subtitle
                      ? `<div style="color: #888; font-size: 0.85em; margin-top: 2px;">${subtitle}</div>`
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
        `
        }
      </div>
    </details>
  `;
    })
    .join("");

  savePlotThreads();
}

function savePlotThreads() {
  localStorage.setItem("gmTool_plotThreads", JSON.stringify(plotThreads));
}

function loadPlotThreads() {
  const saved = localStorage.getItem("gmTool_plotThreads");
  if (saved) {
    plotThreads = JSON.parse(saved);
    renderPlotThreads();
  }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  loadPlotThreads();
});
