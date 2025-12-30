// Magnus Archives GM Tool - Combat Tracker

let combatants = [];
let currentTurn = 0;
let combatActive = false;
let combatPhase = "setup"; // 'setup', 'initiative', 'active'
let expandedCombatants = {}; // Track which combatants are expanded

// ==================== SETUP PHASE ==================== //

function addPartyMemberToCombat(memberId) {
  if (typeof partyMembers === "undefined") return;

  const member = partyMembers.find((m) => m.id === memberId);
  if (!member) return;

  // Check if already added
  if (combatants.some((c) => c.sourceId === memberId && c.type === "PC")) {
    alert(`${member.name} is already in the encounter.`);
    return;
  }

  const newCombatant = {
    id: Date.now(),
    sourceId: memberId,
    type: "PC",
    name: member.name || "Unnamed PC",
    initiative: null,
    // PC Data
    stress: member.stress || 0,
    damage: member.damage || "Hale",
    might: { ...member.might },
    speed: { ...member.speed },
    intellect: { ...member.intellect },
    effort: member.effort || 1,
    location: "",
    notes: "",
  };

  // If combat is active, prompt for initiative and insert in order
  if (combatPhase === "active" && combatActive) {
    const initiativeChoice = prompt(
      `Combat is active! Set initiative for ${newCombatant.name}:\n\nEnter a number (1-20):`,
      "10"
    );

    if (initiativeChoice === null) return; // User cancelled

    newCombatant.initiative = parseInt(initiativeChoice) || 10;

    // Insert in correct initiative order
    insertCombatantInOrder(newCombatant);
  } else {
    combatants.push(newCombatant);
  }

  renderCombatTracker();
}

function addAllPartyToCombat() {
  if (typeof partyMembers === "undefined" || partyMembers.length === 0) {
    alert("No party members to add.");
    return;
  }

  let added = 0;
  partyMembers.forEach((member) => {
    if (!combatants.some((c) => c.sourceId === member.id && c.type === "PC")) {
      combatants.push({
        id: Date.now() + added,
        sourceId: member.id,
        type: "PC",
        name: member.name || "Unnamed PC",
        initiative: null,
        stress: member.stress || 0,
        damage: member.damage || "Hale",
        might: { ...member.might },
        speed: { ...member.speed },
        intellect: { ...member.intellect },
        effort: member.effort || 1,
        location: "",
        notes: "",
      });
      added++;
    }
  });

  if (added > 0) {
    renderCombatTracker();
    alert(`Added ${added} party member(s) to combat.`);
  } else {
    alert("All party members are already in combat.");
  }
}

function addNPCToCombatTracker(npcId) {
  if (typeof npcs === "undefined") return;

  const npc = npcs.find((n) => n.id === npcId);
  if (!npc) return;

  const newCombatant = {
    id: Date.now(),
    sourceId: npcId,
    type: "NPC",
    name: npc.name || "Unnamed NPC",
    initiative: null,
    level: npc.level || 1,
    health: npc.health || 3,
    currentHealth: npc.currentHealth || npc.health || 3,
    damage: npc.damage || 2,
    armor: npc.armor || 0,
    abilities: npc.abilities || "",
    location: "",
    notes: "",
  };

  // If combat is active, prompt for initiative and insert in order
  if (combatPhase === "active" && combatActive) {
    const initiativeChoice = prompt(
      `Combat is active! Set initiative for ${newCombatant.name}:\n\nEnter a number (1-20) or type 'random' for random roll:`,
      "random"
    );

    if (initiativeChoice === null) return; // User cancelled

    if (initiativeChoice.toLowerCase() === "random") {
      newCombatant.initiative = Math.floor(Math.random() * 20) + 1;
      alert(
        `${newCombatant.name} rolled ${newCombatant.initiative} for initiative.`
      );
    } else {
      newCombatant.initiative = parseInt(initiativeChoice) || 10;
    }

    // Insert in correct initiative order
    insertCombatantInOrder(newCombatant);
  } else {
    combatants.push(newCombatant);
  }

  renderCombatTracker();
}

function addBestiaryToCombat(creatureName, customCreature = null) {
  let creature = customCreature;

  // If not a custom creature, look in customEnemies array
  if (!creature && typeof customEnemies !== "undefined") {
    creature = customEnemies.find((c) => c.name === creatureName);
    if (!creature) {
      alert(`Creature "${creatureName}" not found in bestiary.`);
      return;
    }
  }

  if (!creature) {
    alert("Creature data not available.");
    return;
  }

  const quantity =
    parseInt(prompt(`How many ${creatureName} to add?`, "1")) || 1;

  const inActiveCombat = combatPhase === "active" && combatActive;
  let initiativeValue = null;

  // If combat is active, ask for initiative once for all creatures
  if (inActiveCombat) {
    const initiativeChoice = prompt(
      `Combat is active! Set initiative for ${creature.name}${
        quantity > 1 ? ` (all ${quantity})` : ""
      }:\n\nEnter a number (1-20) or type 'random' for random roll:`,
      "random"
    );

    if (initiativeChoice === null) return; // User cancelled

    if (initiativeChoice.toLowerCase() === "random") {
      initiativeValue = Math.floor(Math.random() * 20) + 1;
      alert(`${creature.name} rolled ${initiativeValue} for initiative.`);
    } else {
      initiativeValue = parseInt(initiativeChoice) || 10;
    }
  }

  for (let i = 0; i < quantity; i++) {
    const suffix = quantity > 1 ? ` ${i + 1}` : "";
    const newCombatant = {
      id: Date.now() + i,
      type: "Creature",
      name: creature.name + suffix,
      initiative: initiativeValue,
      level: creature.level || 1,
      health: creature.health || creature.level * 3,
      currentHealth: creature.health || creature.level * 3,
      damageInflicted: creature.damageInflicted || `${creature.level} points`,
      movement: creature.movement || "",
      combat: creature.combat || "",
      abilities: creature.abilities || [],
      location: "",
      notes: "",
      custom: creature.custom || false,
    };

    if (inActiveCombat) {
      insertCombatantInOrder(newCombatant);
    } else {
      combatants.push(newCombatant);
    }
  }

  renderCombatTracker();
}

function removeCombatant(id) {
  combatants = combatants.filter((c) => c.id !== id);
  delete expandedCombatants[id];
  renderCombatTracker();
}

function insertCombatantInOrder(newCombatant) {
  // Find the correct position to insert based on initiative order
  // Higher initiative comes first, ties go to existing combatants
  let insertIndex = combatants.length;

  for (let i = 0; i < combatants.length; i++) {
    if (newCombatant.initiative > combatants[i].initiative) {
      insertIndex = i;
      break;
    }
  }

  // Adjust currentTurn if inserting before the current combatant
  if (insertIndex <= currentTurn) {
    currentTurn++;
  }

  combatants.splice(insertIndex, 0, newCombatant);

  // Show where they were inserted in initiative order
  const position = insertIndex + 1;
  console.log(
    `Inserted ${newCombatant.name} at position ${position} (Initiative ${newCombatant.initiative})`
  );
}

function quickAddCombatant() {
  const name = prompt("Combatant name:");
  if (!name) return;

  const type = confirm("Is this a player character? (OK = PC, Cancel = NPC)")
    ? "PC"
    : "NPC";

  if (type === "PC") {
    combatants.push({
      id: Date.now(),
      type: "PC",
      name: name,
      initiative: null,
      stress: 0,
      damage: "Hale",
      might: { current: 10, max: 10, edge: 0 },
      speed: { current: 10, max: 10, edge: 0 },
      intellect: { current: 10, max: 10, edge: 0 },
      effort: 1,
      location: "",
      notes: "",
    });
  } else {
    const level = parseInt(prompt("NPC Level:", "1")) || 1;
    const health = level * 3;
    combatants.push({
      id: Date.now(),
      type: "NPC",
      name: name,
      initiative: null,
      level: level,
      health: health,
      currentHealth: health,
      damage: level,
      armor: 0,
      abilities: "",
      location: "",
      notes: "",
    });
  }

  renderCombatTracker();
}

// ==================== INITIATIVE PHASE ==================== //

function updateInitiative(id, value) {
  const combatant = combatants.find((c) => c.id === id);
  if (combatant) {
    combatant.initiative = parseInt(value) || null;
  }
}

function randomizeInitiative(id) {
  const combatant = combatants.find((c) => c.id === id);
  if (combatant) {
    combatant.initiative = Math.floor(Math.random() * 20) + 1;
    const input = document.querySelector(`input[data-init-id="${id}"]`);
    if (input) input.value = combatant.initiative;
  }
}

function randomizeAllNPCInitiative() {
  combatants.forEach((c) => {
    if (c.type !== "PC") {
      c.initiative = Math.floor(Math.random() * 20) + 1;
    }
  });
  renderCombatTracker();
}

function confirmInitiativeOrder() {
  // Check all have initiative
  const missing = combatants.filter(
    (c) => c.initiative === null || c.initiative === undefined
  );
  if (missing.length > 0) {
    alert(
      `Please set initiative for all combatants. Missing: ${missing
        .map((c) => c.name)
        .join(", ")}`
    );
    return;
  }

  // Sort by initiative (descending), then by name for ties
  combatants.sort((a, b) => {
    if (b.initiative !== a.initiative) {
      return b.initiative - a.initiative;
    }
    return a.name.localeCompare(b.name);
  });

  // Let GM choose starting position
  const startIndex =
    parseInt(
      prompt(
        `Initiative order set! Start with which position? (1-${combatants.length})`,
        "1"
      )
    ) || 1;
  currentTurn = Math.max(0, Math.min(startIndex - 1, combatants.length - 1));

  combatPhase = "active";
  combatActive = true;
  renderCombatTracker();
}

// ==================== ACTIVE COMBAT PHASE ==================== //

function nextTurn() {
  if (!combatActive || combatPhase !== "active") {
    alert("Combat hasn't been started yet.");
    return;
  }

  // Check if current combatant is dead/defeated
  checkCombatantStatus();

  // Move to next alive combatant
  let attempts = 0;
  do {
    currentTurn = (currentTurn + 1) % combatants.length;
    attempts++;

    // Prevent infinite loop if all are dead
    if (attempts > combatants.length) {
      alert("All combatants are defeated!");
      return;
    }
  } while (isCombatantDefeated(combatants[currentTurn]));

  renderCombatTracker();

  const current = combatants[currentTurn];
  if (typeof addToRollLog === "function") {
    addToRollLog("Turn", `${current.name}'s turn`);
  }
}

function isCombatantDefeated(combatant) {
  if (combatant.type === "PC") {
    return combatant.damage === "Dead";
  } else {
    return combatant.currentHealth <= 0;
  }
}

function checkCombatantStatus() {
  combatants.forEach((c) => {
    if (isCombatantDefeated(c)) {
      c.defeated = true;
    }
  });
}

function endCombat() {
  if (
    !confirm(
      "End this combat encounter? This will sync changes back to the Party tab."
    )
  ) {
    return;
  }

  // Sync PC data back to party members
  combatants.forEach((combatant) => {
    if (combatant.type === "PC" && combatant.sourceId) {
      const member = partyMembers.find((m) => m.id === combatant.sourceId);
      if (member) {
        member.stress = combatant.stress;
        member.damage = combatant.damage;
        member.might = { ...combatant.might };
        member.speed = { ...combatant.speed };
        member.intellect = { ...combatant.intellect };
        member.effort = combatant.effort;
      }
    }
  });

  // Save and render party data
  if (typeof savePartyData === "function") {
    savePartyData();
  }
  if (typeof renderPartyList === "function") {
    renderPartyList();
  }

  // Reset combat
  combatants = [];
  expandedCombatants = {};
  currentTurn = 0;
  combatActive = false;
  combatPhase = "setup";

  if (typeof addToRollLog === "function") {
    addToRollLog("Combat", "Ended");
  }

  renderCombatTracker();
}

// ==================== COMBATANT UPDATES ==================== //

function updateCombatantField(id, field, value) {
  const combatant = combatants.find((c) => c.id === id);
  if (!combatant) return;

  // Handle nested fields
  if (field.includes(".")) {
    const [parent, child] = field.split(".");
    if (combatant[parent]) {
      combatant[parent][child] = isNaN(value) ? value : parseFloat(value);
    }
  } else {
    combatant[field] = isNaN(value)
      ? value
      : field === "name" ||
        field === "location" ||
        field === "notes" ||
        field === "abilities"
      ? value
      : parseFloat(value);
  }

  // Auto-update stress level for PCs
  if (field === "stress" && combatant.type === "PC") {
    // Stress level is calculated, no need to store
  }

  renderCombatTracker();
}

function toggleCombatantExpanded(id) {
  expandedCombatants[id] = !expandedCombatants[id];
  renderCombatTracker();
}

// ==================== RENDER FUNCTIONS ==================== //

function renderCombatTracker() {
  const container = document.getElementById("initiativeList");
  if (!container) return;

  if (combatants.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: #888;">
        <p style="margin-bottom: 15px;">No combatants added yet.</p>
        <p style="font-size: 0.9em;">Add party members, NPCs, or creatures to begin.</p>
      </div>
    `;
    return;
  }

  if (combatPhase === "setup") {
    renderSetupPhase(container);
  } else if (combatPhase === "initiative") {
    renderInitiativePhase(container);
  } else {
    renderActivePhase(container);
  }
}

function renderSetupPhase(container) {
  container.innerHTML = `
    <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 152, 0, 0.1); border-left: 3px solid #ff9800; border-radius: 4px;">
      <strong style="color: #ff9800;">Setup Phase</strong>
      <p style="color: #ccc; margin-top: 5px; font-size: 0.9em;">Add all combatants, then click "Set Initiative" to continue.</p>
    </div>
    ${combatants.map((c) => renderCombatantSetup(c)).join("")}
  `;
}

function renderInitiativePhase(container) {
  container.innerHTML = `
    <div style="margin-bottom: 20px; padding: 15px; background: rgba(76, 175, 80, 0.1); border-left: 3px solid #4CAF50; border-radius: 4px;">
      <strong style="color: #4CAF50;">Initiative Phase</strong>
      <p style="color: #ccc; margin-top: 5px; font-size: 0.9em;">Enter initiative rolls for all combatants, then confirm to start combat.</p>
    </div>
    ${combatants.map((c) => renderCombatantInitiative(c)).join("")}
  `;
}

function renderActivePhase(container) {
  container.innerHTML = combatants
    .map((c, index) => renderCombatantActive(c, index))
    .join("");
}

function renderCombatantSetup(combatant) {
  return `
    <div style="padding: 12px; margin-bottom: 8px; background: rgba(0, 0, 0, 0.3); border-radius: 6px; border: 1px solid #4CAF50;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-weight: bold; color: #4CAF50;">${combatant.name}</span>
          <span style="color: #888; margin-left: 10px; font-size: 0.9em;">${combatant.type}</span>
        </div>
        <button onclick="removeCombatant(${combatant.id})" style="background: #d32f2f; border: none; color: white; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Remove</button>
      </div>
    </div>
  `;
}

function renderCombatantInitiative(combatant) {
  return `
    <div style="padding: 12px; margin-bottom: 8px; background: rgba(0, 0, 0, 0.3); border-radius: 6px; border: 1px solid #4CAF50; display: flex; align-items: center; gap: 15px;">
      <div style="flex: 1;">
        <span style="font-weight: bold; color: #4CAF50;">${
          combatant.name
        }</span>
        <span style="color: #888; margin-left: 10px; font-size: 0.9em;">${
          combatant.type
        }</span>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <label style="color: #888;">Initiative:</label>
        <input 
          type="number" 
          data-init-id="${combatant.id}"
          value="${combatant.initiative || ""}" 
          onchange="updateInitiative(${combatant.id}, this.value)"
          placeholder="1-20"
          style="width: 80px; padding: 6px; background: rgba(0,0,0,0.5); border: 1px solid #4CAF50; border-radius: 4px; color: #e0e0e0; text-align: center;"
        />
        ${
          combatant.type !== "PC"
            ? `
          <button onclick="randomizeInitiative(${combatant.id})" style="background: #666; border: none; color: white; padding: 6px 12px; border-radius: 4px; cursor: pointer;" title="Random (1-20)">🎲</button>
        `
            : ""
        }
        <button onclick="removeCombatant(${
          combatant.id
        })" style="background: #d32f2f; border: none; color: white; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Remove</button>
      </div>
    </div>
  `;
}

function renderCombatantActive(combatant, index) {
  const isCurrent = index === currentTurn;
  const isDefeated = isCombatantDefeated(combatant);
  const isExpanded = expandedCombatants[combatant.id];

  const opacity = isDefeated ? "0.4" : "1";
  const borderColor = isCurrent ? "#4CAF50" : isDefeated ? "#666" : "#4CAF50";
  const bgColor = isCurrent ? "rgba(76, 175, 80, 0.2)" : "rgba(0, 0, 0, 0.3)";

  if (combatant.type === "PC") {
    return renderPCCombatant(
      combatant,
      isCurrent,
      isDefeated,
      isExpanded,
      opacity,
      borderColor,
      bgColor
    );
  } else {
    return renderNPCCombatant(
      combatant,
      isCurrent,
      isDefeated,
      isExpanded,
      opacity,
      borderColor,
      bgColor
    );
  }
}

function renderPCCombatant(
  combatant,
  isCurrent,
  isDefeated,
  isExpanded,
  opacity,
  borderColor,
  bgColor
) {
  const stressLevel = Math.floor(combatant.stress / 3);

  return `
    <div style="margin-bottom: 10px; border: 2px solid ${borderColor}; border-radius: 8px; background: ${bgColor}; opacity: ${opacity};">
      <!-- Collapsed View -->
      <div 
        onclick="toggleCombatantExpanded(${combatant.id})" 
        style="padding: 15px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;"
      >
        <div style="display: flex; align-items: center; gap: 15px; flex: 1;">
          <span style="font-size: 1.4em; font-weight: bold; color: #4CAF50; min-width: 35px;">${
            combatant.initiative
          }</span>
          <div style="flex: 1;">
            <div style="font-weight: bold; font-size: 1.1em; color: ${
              isCurrent ? "#4CAF50" : "#e0e0e0"
            };">
              ${combatant.name}
              ${
                isCurrent
                  ? '<span style="color: #4CAF50; margin-left: 10px;">◄ ACTIVE</span>'
                  : ""
              }
              ${
                isDefeated
                  ? '<span style="color: #d32f2f; margin-left: 10px;">[DEAD]</span>'
                  : ""
              }
            </div>
            <div style="color: #888; font-size: 0.9em; margin-top: 3px;">
              Stress: ${combatant.stress} (Level ${stressLevel}) • ${
    combatant.damage
  }
            </div>
          </div>
          <div style="color: #888; font-size: 1.2em;">${
            isExpanded ? "▼" : "▶"
          }</div>
        </div>
      </div>
      
      <!-- Expanded View -->
      ${
        isExpanded
          ? `
        <div style="padding: 0 15px 15px 15px; border-top: 1px solid rgba(76, 175, 80, 0.3);">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-top: 15px;">
            <!-- Row 1: Name, Stress, Stress Level -->
            <div>
              <label style="display: block; color: #888; margin-bottom: 5px; font-size: 0.9em;">Name</label>
              <input 
                type="text" 
                value="${combatant.name}" 
                onchange="updateCombatantField(${
                  combatant.id
                }, 'name', this.value)"
                style="width: calc(100% - 16px); padding: 8px; background: rgba(0,0,0,0.5); border: 1px solid #4CAF50; border-radius: 4px; color: #e0e0e0;"
              />
            </div>
            
            <div>
              <label style="display: block; color: #888; margin-bottom: 5px; font-size: 0.9em;">Stress</label>
              <input 
                type="number" 
                value="${combatant.stress}" 
                onchange="updateCombatantField(${
                  combatant.id
                }, 'stress', this.value)"
                style="width: calc(100% - 16px); padding: 8px; background: rgba(0,0,0,0.5); border: 1px solid #b19cd9; border-radius: 4px; color: #b19cd9;"
              />
            </div>
            
            <div>
              <label style="display: block; color: #888; margin-bottom: 5px; font-size: 0.9em;">Stress Level</label>
              <div style="padding: 8px; background: rgba(0,0,0,0.3); border: 1px solid #666; border-radius: 4px; color: #b19cd9; font-weight: bold;">
                ${stressLevel}
              </div>
            </div>
            
            <!-- Row 2: Stat Pools & Edge -->
            <div style="grid-column: 1 / -1;">
              <label style="display: block; color: #4CAF50; margin-bottom: 10px; font-weight: bold;">Stat Pools & Edge</label>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <!-- Might -->
                <div style="display: flex; gap: 10px; align-items: center;">
                  <label style="color: #888; font-size: 0.9em; min-width: 60px;">Might</label>
                  <input type="number" value="${
                    combatant.might.current
                  }" onchange="updateCombatantField(${
              combatant.id
            }, 'might.current', this.value)" style="width: 60px; padding: 6px; background: rgba(0,0,0,0.5); border: 1px solid #4CAF50; border-radius: 4px; color: #e0e0e0; text-align: center;" />
                  <span style="color: #666;">/</span>
                  <div style="width: 60px; padding: 6px; background: rgba(0,0,0,0.3); border: 1px solid #666; border-radius: 4px; color: #888; text-align: center;">${
                    combatant.might.max
                  }</div>
                  <span style="color: #888; font-size: 0.85em; margin-left: 10px;">Edge:</span>
                  <div style="width: 50px; padding: 6px; background: rgba(0,0,0,0.3); border: 1px solid #666; border-radius: 4px; color: #888; text-align: center;">${
                    combatant.might.edge
                  }</div>
                </div>
                
                <!-- Speed -->
                <div style="display: flex; gap: 10px; align-items: center;">
                  <label style="color: #888; font-size: 0.9em; min-width: 60px;">Speed</label>
                  <input type="number" value="${
                    combatant.speed.current
                  }" onchange="updateCombatantField(${
              combatant.id
            }, 'speed.current', this.value)" style="width: 60px; padding: 6px; background: rgba(0,0,0,0.5); border: 1px solid #4CAF50; border-radius: 4px; color: #e0e0e0; text-align: center;" />
                  <span style="color: #666;">/</span>
                  <div style="width: 60px; padding: 6px; background: rgba(0,0,0,0.3); border: 1px solid #666; border-radius: 4px; color: #888; text-align: center;">${
                    combatant.speed.max
                  }</div>
                  <span style="color: #888; font-size: 0.85em; margin-left: 10px;">Edge:</span>
                  <div style="width: 50px; padding: 6px; background: rgba(0,0,0,0.3); border: 1px solid #666; border-radius: 4px; color: #888; text-align: center;">${
                    combatant.speed.edge
                  }</div>
                </div>
                
                <!-- Intellect -->
                <div style="display: flex; gap: 10px; align-items: center;">
                  <label style="color: #888; font-size: 0.9em; min-width: 60px;">Intellect</label>
                  <input type="number" value="${
                    combatant.intellect.current
                  }" onchange="updateCombatantField(${
              combatant.id
            }, 'intellect.current', this.value)" style="width: 60px; padding: 6px; background: rgba(0,0,0,0.5); border: 1px solid #4CAF50; border-radius: 4px; color: #e0e0e0; text-align: center;" />
                  <span style="color: #666;">/</span>
                  <div style="width: 60px; padding: 6px; background: rgba(0,0,0,0.3); border: 1px solid #666; border-radius: 4px; color: #888; text-align: center;">${
                    combatant.intellect.max
                  }</div>
                  <span style="color: #888; font-size: 0.85em; margin-left: 10px;">Edge:</span>
                  <div style="width: 50px; padding: 6px; background: rgba(0,0,0,0.3); border: 1px solid #666; border-radius: 4px; color: #888; text-align: center;">${
                    combatant.intellect.edge
                  }</div>
                </div>
              </div>
            </div>
            
            <!-- Row 3: Damage State, Effort -->
            <div style="grid-column: 1 / 3;">
              <label style="display: block; color: #888; margin-bottom: 5px; font-size: 0.9em;">Damage State</label>
              <select 
                onchange="updateCombatantField(${
                  combatant.id
                }, 'damage', this.value)"
                style="width: calc(100% - 16px); padding: 8px; background: rgba(0,0,0,0.5); border: 1px solid #4CAF50; border-radius: 4px; color: #e0e0e0;"
              >
                <option value="Hale" ${
                  combatant.damage === "Hale" ? "selected" : ""
                }>Hale</option>
                <option value="Impaired" ${
                  combatant.damage === "Impaired" ? "selected" : ""
                }>Impaired</option>
                <option value="Debilitated" ${
                  combatant.damage === "Debilitated" ? "selected" : ""
                }>Debilitated</option>
                <option value="Dead" ${
                  combatant.damage === "Dead" ? "selected" : ""
                }>Dead</option>
              </select>
            </div>
            
            <div>
              <label style="display: block; color: #888; margin-bottom: 5px; font-size: 0.9em;">Effort</label>
              <div style="padding: 8px; background: rgba(0,0,0,0.3); border: 1px solid #666; border-radius: 4px; color: #888;">
                ${combatant.effort}
              </div>
            </div>
            
            <!-- Row 4: Location -->
            <div style="grid-column: 1 / -1;">
              <label style="display: block; color: #888; margin-bottom: 5px; font-size: 0.9em;">Location</label>
              <input 
                type="text" 
                value="${combatant.location || ""}" 
                onchange="updateCombatantField(${
                  combatant.id
                }, 'location', this.value)"
                placeholder="e.g., Behind cover"
                style="width: calc(100% - 16px); padding: 8px; background: rgba(0,0,0,0.5); border: 1px solid #4CAF50; border-radius: 4px; color: #e0e0e0;"
              />
            </div>
            
            <!-- Row 5: Notes -->
            <div style="grid-column: 1 / -1;">
              <label style="display: block; color: #888; margin-bottom: 5px; font-size: 0.9em;">Notes</label>
              <textarea 
                onchange="updateCombatantField(${
                  combatant.id
                }, 'notes', this.value)"
                placeholder="Conditions, effects, reminders..."
                style="width: calc(100% - 16px); min-height: 60px; padding: 8px; background: rgba(0,0,0,0.5); border: 1px solid #4CAF50; border-radius: 4px; color: #e0e0e0; resize: vertical;"
              >${combatant.notes || ""}</textarea>
            </div>
          </div>
        </div>
      `
          : ""
      }
    </div>
  `;
}

function renderNPCCombatant(
  combatant,
  isCurrent,
  isDefeated,
  isExpanded,
  opacity,
  borderColor,
  bgColor
) {
  return `
    <div style="margin-bottom: 10px; border: 2px solid ${borderColor}; border-radius: 8px; background: ${bgColor}; opacity: ${opacity};">
      <!-- Collapsed View -->
      <div 
        onclick="toggleCombatantExpanded(${combatant.id})" 
        style="padding: 15px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;"
      >
        <div style="display: flex; align-items: center; gap: 15px; flex: 1;">
          <span style="font-size: 1.4em; font-weight: bold; color: #4CAF50; min-width: 35px;">${
            combatant.initiative
          }</span>
          <div style="flex: 1;">
            <div style="font-weight: bold; font-size: 1.1em; color: ${
              isCurrent ? "#4CAF50" : "#e0e0e0"
            };">
              ${combatant.name}
              ${
                isCurrent
                  ? '<span style="color: #4CAF50; margin-left: 10px;">◄ ACTIVE</span>'
                  : ""
              }
              ${
                isDefeated
                  ? '<span style="color: #d32f2f; margin-left: 10px;">[DEFEATED]</span>'
                  : ""
              }
            </div>
            <div style="color: #888; font-size: 0.9em; margin-top: 3px;">
              Level ${combatant.level} • Health: ${combatant.currentHealth}/${
    combatant.health
  }
            </div>
          </div>
          <div style="color: #888; font-size: 1.2em;">${
            isExpanded ? "▼" : "▶"
          }</div>
        </div>
      </div>
      
      <!-- Expanded View -->
      ${
        isExpanded
          ? `
        <div style="padding: 0 15px 15px 15px; border-top: 1px solid rgba(76, 175, 80, 0.3);">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
            <!-- Row 1: Name, Level -->
            <div>
              <label style="display: block; color: #888; margin-bottom: 5px; font-size: 0.9em;">Name</label>
              <input 
                type="text" 
                value="${combatant.name}" 
                onchange="updateCombatantField(${
                  combatant.id
                }, 'name', this.value)"
                style="width: calc(100% - 16px); padding: 8px; background: rgba(0,0,0,0.5); border: 1px solid #4CAF50; border-radius: 4px; color: #e0e0e0;"
              />
            </div>
            
            <div>
              <label style="display: block; color: #888; margin-bottom: 5px; font-size: 0.9em;">Level</label>
              <input 
                type="number" 
                value="${combatant.level}" 
                onchange="updateCombatantField(${
                  combatant.id
                }, 'level', this.value)"
                min="1"
                style="width: calc(100% - 16px); padding: 8px; background: rgba(0,0,0,0.5); border: 1px solid #4CAF50; border-radius: 4px; color: #e0e0e0;"
              />
            </div>
            
            <!-- Row 2: Health, Location -->
            <div>
              <label style="display: block; color: #888; margin-bottom: 5px; font-size: 0.9em;">Health</label>
              <div style="display: flex; gap: 5px; align-items: center;">
                <input 
                  type="number" 
                  value="${combatant.currentHealth}" 
                  onchange="updateCombatantField(${
                    combatant.id
                  }, 'currentHealth', this.value)"
                  style="width: 70px; padding: 8px; background: rgba(0,0,0,0.5); border: 1px solid ${
                    combatant.currentHealth <= 0 ? "#d32f2f" : "#4CAF50"
                  }; border-radius: 4px; color: ${
              combatant.currentHealth <= 0 ? "#d32f2f" : "#e0e0e0"
            }; text-align: center;"
                />
                <span style="color: #666;">/</span>
                <div style="width: 70px; padding: 8px; background: rgba(0,0,0,0.3); border: 1px solid #666; border-radius: 4px; color: #888; text-align: center;">${
                  combatant.health
                }</div>
              </div>
            </div>
            
            <div>
              <label style="display: block; color: #888; margin-bottom: 5px; font-size: 0.9em;">Location</label>
              <input 
                type="text" 
                value="${combatant.location || ""}" 
                onchange="updateCombatantField(${
                  combatant.id
                }, 'location', this.value)"
                placeholder="e.g., On rooftop"
                style="width: calc(100% - 16px); padding: 8px; background: rgba(0,0,0,0.5); border: 1px solid #4CAF50; border-radius: 4px; color: #e0e0e0;"
              />
            </div>
            
            <!-- Row 3: Notes -->
            <div style="grid-column: 1 / -1;">
              <label style="display: block; color: #888; margin-bottom: 5px; font-size: 0.9em;">Notes</label>
              <textarea 
                onchange="updateCombatantField(${
                  combatant.id
                }, 'notes', this.value)"
                placeholder="Conditions, tactics, reminders..."
                style="width: calc(100% - 16px); min-height: 60px; padding: 8px; background: rgba(0,0,0,0.5); border: 1px solid #4CAF50; border-radius: 4px; color: #e0e0e0; resize: vertical;"
              >${combatant.notes || ""}</textarea>
            </div>
            
            <!-- Row 4: Movement, Damage Inflicted -->
            ${
              combatant.movement
                ? `
            <div>
              <label style="display: block; color: #888; margin-bottom: 5px; font-size: 0.9em;">Movement</label>
              <div style="padding: 8px; background: rgba(0,0,0,0.3); border: 1px solid #666; border-radius: 4px; color: #ccc;">
                ${combatant.movement}
              </div>
            </div>
            `
                : ""
            }
            
            <div ${combatant.movement ? "" : 'style="grid-column: 1 / -1;"'}>
              <label style="display: block; color: #888; margin-bottom: 5px; font-size: 0.9em;">Damage Inflicted</label>
              <div style="padding: 8px; background: rgba(0,0,0,0.3); border: 1px solid #666; border-radius: 4px; color: #ccc;">
                ${combatant.damageInflicted || "Unknown"}
              </div>
            </div>
            
            <!-- Row 5: Combat -->
            ${
              combatant.combat
                ? `
            <div style="grid-column: 1 / -1;">
              <label style="display: block; color: #888; margin-bottom: 5px; font-size: 0.9em;">Combat</label>
              <div style="padding: 8px; background: rgba(0,0,0,0.3); border: 1px solid #666; border-radius: 4px; color: #ccc;">
                ${combatant.combat}
              </div>
            </div>
            `
                : ""
            }
            
            <!-- Row 6: Abilities -->
            <div style="grid-column: 1 / -1;">
              <label style="display: block; color: #888; margin-bottom: 5px; font-size: 0.9em;">Abilities</label>
              ${
                Array.isArray(combatant.abilities) &&
                combatant.abilities.length > 0
                  ? `
                <div style="padding: 8px; background: rgba(0,0,0,0.3); border: 1px solid #666; border-radius: 4px;">
                  ${combatant.abilities
                    .map(
                      (ability) => `
                    <div style="margin-bottom: 8px;">
                      <strong style="color: #66bb6a;">${ability.name}:</strong>
                      <span style="color: #ccc;"> ${ability.effect}</span>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              `
                  : `
                <textarea 
                  onchange="updateCombatantField(${
                    combatant.id
                  }, 'abilities', this.value)"
                  placeholder="Special abilities, attacks, resistances..."
                  style="width: calc(100% - 16px); min-height: 60px; padding: 8px; background: rgba(0,0,0,0.5); border: 1px solid #4CAF50; border-radius: 4px; color: #e0e0e0; resize: vertical;"
                >${
                  typeof combatant.abilities === "string"
                    ? combatant.abilities
                    : ""
                }</textarea>
              `
              }
            </div>
          </div>
        </div>
      `
          : ""
      }
    </div>
  `;
}

// ==================== NAVIGATION HELPERS ==================== //
function navigateToPartyTab() {
  if (
    confirm(
      "Would you like to navigate to the Party tab to add individual party members?"
    )
  ) {
    switchToTab("players");
  }
}

function navigateToBestiaryTab() {
  if (
    confirm(
      "Would you like to navigate to the Bestiary tab to add creatures to the encounter?"
    )
  ) {
    switchToTab("bestiary");
  }
}

function navigateToNPCsTab() {
  if (
    confirm(
      "Would you like to navigate to the NPCs tab to add NPCs to the encounter?"
    )
  ) {
    switchToTab("npcs");
  }
}

// ==================== INITIALIZATION ==================== //

function initializeCombatTracker() {
  renderCombatTracker();
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  initializeCombatTracker();
});
