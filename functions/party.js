// Magnus Archives GM Tool - Party Management

let partyMembers = [];

function addPartyMember() {
  const member = {
    id: Date.now(),
    name: "",
    descriptor: "",
    type: "",
    focus: "",
    tier: 1,
    might: { current: 10, max: 10, edge: 0 },
    speed: { current: 10, max: 10, edge: 0 },
    intellect: { current: 10, max: 10, edge: 0 },
    damage: "Hale",
    stress: 0,
    notes: "",
    imported: false,
    fullData: null,
  };

  partyMembers.push(member);
  renderPartyList();
}

function importCharacterSheet() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        addImportedCharacter(data);
      } catch (error) {
        alert("Error reading character file: " + error.message);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function addImportedCharacter(data) {
  // Check if character already exists
  const existingIndex = partyMembers.findIndex(
    (m) => m.name === data.name && m.imported
  );

  const member = {
    id: existingIndex >= 0 ? partyMembers[existingIndex].id : Date.now(),
    name: data.name || "Unknown",
    descriptor: data.descriptor || "",
    type: data.type || "",
    focus: data.focus1 || "",
    tier: data.tier || 1,
    xp: data.xp || 0,
    effort: data.effort || 1,
    might: {
      current: data.currentPools?.Might || data.mightPool?.current || 10,
      max: data.stats?.Might || data.mightPool?.max || 10,
      edge: data.edge?.Might || data.mightEdge || 0,
    },
    speed: {
      current: data.currentPools?.Speed || data.speedPool?.current || 10,
      max: data.stats?.Speed || data.speedPool?.max || 10,
      edge: data.edge?.Speed || data.speedEdge || 0,
    },
    intellect: {
      current:
        data.currentPools?.Intellect || data.intellectPool?.current || 10,
      max: data.stats?.Intellect || data.intellectPool?.max || 10,
      edge: data.edge?.Intellect || data.intellectEdge || 0,
    },
    damage: data.damageTrack || data.damageState || data.damage || "Hale",
    stress: data.stress || data.stressLevel || 0,
    cyphers: data.assignedCyphers || [],
    cypherLimit: data.cypherSlots || 2,
    notes: "",
    imported: true,
    fullData: {
      ...data,
      superStress: 10, // Always set max supernatural stress to 10
    },
    lastUpdated: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    partyMembers[existingIndex] = member;
    alert(`Updated ${member.name}'s character data`);
  } else {
    partyMembers.push(member);
    alert(`Imported ${member.name}`);
  }

  renderPartyList();
}

function updateCharacterSheet(id) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        const member = partyMembers.find((m) => m.id === id);
        if (member && member.imported) {
          // Update with new data
          Object.assign(member, {
            name: data.name || member.name,
            descriptor: data.descriptor || member.descriptor,
            type: data.type || member.type,
            focus: data.focus1 || member.focus,
            tier: data.tier || member.tier,
            xp: data.xp || 0,
            effort: data.effort || member.effort,
            might: {
              current:
                data.currentPools?.Might ||
                data.mightPool?.current ||
                member.might.current,
              max: data.stats?.Might || data.mightPool?.max || member.might.max,
              edge: data.edge?.Might || data.mightEdge || member.might.edge,
            },
            speed: {
              current:
                data.currentPools?.Speed ||
                data.speedPool?.current ||
                member.speed.current,
              max: data.stats?.Speed || data.speedPool?.max || member.speed.max,
              edge: data.edge?.Speed || data.speedEdge || member.speed.edge,
            },
            intellect: {
              current:
                data.currentPools?.Intellect ||
                data.intellectPool?.current ||
                member.intellect.current,
              max:
                data.stats?.Intellect ||
                data.intellectPool?.max ||
                member.intellect.max,
              edge:
                data.edge?.Intellect ||
                data.intellectEdge ||
                member.intellect.edge,
            },
            damage:
              data.damageTrack ||
              data.damageState ||
              data.damage ||
              member.damage,
            stress: data.stress || data.stressLevel || member.stress,
            cyphers: data.assignedCyphers || member.cyphers,
            cypherLimit: data.cypherSlots || member.cypherLimit,
            fullData: {
              ...data,
              superStress: 10, // Always set max supernatural stress to 10
            },
            lastUpdated: new Date().toISOString(),
          });
          renderPartyList();
          alert(`Updated ${member.name}'s data`);
        }
      } catch (error) {
        alert("Error reading character file: " + error.message);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function toggleCharacterDetails(id) {
  const detailsDiv = document.getElementById(`details-${id}`);
  const arrow = document.getElementById(`arrow-${id}`);
  if (detailsDiv && arrow) {
    const isHidden = detailsDiv.style.display === "none";
    detailsDiv.style.display = isHidden ? "block" : "none";
    arrow.textContent = isHidden ? "▼" : "▶";
  }
}

function removePartyMember(id) {
  if (confirm("Remove this party member?")) {
    partyMembers = partyMembers.filter((m) => m.id !== id);
    renderPartyList();
  }
}

function updatePartyMember(id, field, value) {
  const member = partyMembers.find((m) => m.id === id);
  if (member) {
    if (field.includes(".")) {
      const parts = field.split(".");
      if (parts.length === 2) {
        const [obj, prop] = parts;

        // Prevent current pool from exceeding max pool
        if (
          prop === "current" &&
          (obj === "might" || obj === "speed" || obj === "intellect")
        ) {
          const maxValue = member[obj].max;
          value = Math.min(value, maxValue);
        }

        member[obj][prop] = value;
      } else if (parts.length === 3) {
        // Handle nested properties like fullData.supernaturalStress
        const [obj1, obj2, prop] = parts;
        if (!member[obj1]) member[obj1] = {};
        if (!member[obj1][obj2]) member[obj1][obj2] = {};

        // Prevent supernatural stress from exceeding max
        if (obj2 === "supernaturalStress" && member[obj1]?.superStress) {
          value = Math.min(value, member[obj1].superStress);
        }

        // Ensure supernatural stress never exceeds 10
        if (obj2 === "supernaturalStress") {
          value = Math.min(value, 10);
        }

        member[obj1][obj2] = value;
      }
    } else {
      member[field] = value;
    }
    savePartyData();
    renderPartyList();
  }
}

function renderPartyList() {
  const container = document.getElementById("partyMembersList");
  if (!container) return;

  if (partyMembers.length === 0) {
    container.innerHTML =
      '<p class="empty-state" style="text-align: center; color: #888; padding: 40px;">No party members yet. Import character sheets or add manually below.</p>';
    return;
  }

  // Store which details sections are currently expanded
  const expandedStates = {};
  partyMembers.forEach((member) => {
    const detailsDiv = document.getElementById(`details-${member.id}`);
    if (detailsDiv) {
      expandedStates[member.id] = detailsDiv.style.display !== "none";
    }
  });

  const isAvatar = (m) => m.fullData?.avatar?.isAvatar || false;
  const avatarEntity = (m) =>
    m.fullData?.avatar?.entityName || m.fullData?.avatar?.entity || "";

  container.innerHTML = partyMembers
    .map(
      (member) => `
    <div class="party-member-card" style="background: linear-gradient(135deg, #1a1a1a 0%, #0d1a0d 100%); padding: 20px; border-radius: 10px; border: 3px solid ${
      isAvatar(member) ? "#8b0000" : "#4CAF50"
    }; box-shadow: 0 4px 15px rgba(49, 126, 48, 0.3); position: relative;">
      <div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 8px; align-items: center;">
        ${
          member.imported
            ? '<div style="background: rgba(76, 175, 80, 0.2); border: 1px solid #4CAF50; padding: 4px 8px; border-radius: 4px; font-size: 0.8em; color: #4CAF50;">📄 Imported</div>'
            : ""
        }
        ${
          isAvatar(member)
            ? '<div style="background: rgba(139, 0, 0, 0.3); border: 1px solid #8b0000; padding: 4px 8px; border-radius: 4px; font-size: 0.8em; color: #ff6b6b; animation: avatarPulse 2s infinite;">👁️ Avatar</div>'
            : ""
        }
        <button onclick="event.stopPropagation(); addPartyMemberToCombat(${
          member.id
        })" style="background: #ff9800; border: none; color: white; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.9em;" title="Add to Combat Tracker">⚔️ Combat</button>
        <button onclick="event.stopPropagation(); removePartyMember(${
          member.id
        })" style="background: #d32f2f; border: none; color: white; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.9em;">Remove</button>
      </div>
      
      <!-- Collapsed View -->
      <div style="cursor: pointer;" onclick="toggleCharacterDetails(${
        member.id
      })">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
          <span id="arrow-${
            member.id
          }" style="color: #4CAF50; font-size: 1.2em;">${
        expandedStates[member.id] ? "▼" : "▶"
      }</span>
          ${
            member.imported
              ? `<h3 style="margin: 0; color: ${
                  isAvatar(member) ? "#ff6b6b" : "#4CAF50"
                }; font-size: 1.3em;">${member.name}</h3>`
              : `<input 
                  type="text" 
                  value="${member.name || ""}" 
                  placeholder="Character Name" 
                  onchange="updatePartyMember(${member.id}, 'name', this.value)"
                  onclick="event.stopPropagation()"
                  style="font-size: 1.2em; font-weight: bold; background: rgba(0,0,0,0.3); border: 1px solid #4CAF50; padding: 8px; border-radius: 4px; color: #4CAF50;"
                />`
          }
          <span style="background: rgba(76, 175, 80, 0.2); padding: 4px 10px; border-radius: 4px; color: #4CAF50; font-weight: bold; font-size: 0.9em;">Tier ${
            member.tier
          }</span>
        </div>
        <div style="color: #888; margin-left: 32px; font-size: 0.95em;">
          ${
            member.descriptor && member.type && member.focus
              ? `<em>${member.descriptor} ${member.type} who ${member.focus}</em>`
              : '<em style="color: #666;">No character statement</em>'
          }
          ${
            isAvatar(member) && avatarEntity(member)
              ? `<span style="color: #ff6b6b; margin-left: 10px;">• Serves ${avatarEntity(
                  member
                )}</span>`
              : ""
          }
        </div>
      </div>
      
      <!-- Expanded Details Section -->
      <div id="details-${member.id}" style="display: ${
        expandedStates[member.id] ? "block" : "none"
      }; margin-top: 20px; padding-top: 20px; border-top: 2px solid rgba(76, 175, 80, 0.3);">
        ${
          member.imported
            ? `
        <div style="margin-bottom: 20px;">
          <button onclick="updateCharacterSheet(${
            member.id
          })" class="button primary-button" style="width: 100%; padding: 12px;">
            📤 Update from Character Sheet
          </button>
          ${
            member.lastUpdated
              ? `<div style="color: #666; font-size: 0.85em; margin-top: 5px; text-align: center;">Last updated: ${new Date(
                  member.lastUpdated
                ).toLocaleString()}</div>`
              : ""
          }
        </div>
        `
            : ""
        }
        
        
        
        <!-- Progression Stats -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-bottom: 15px;">
          <div style="padding: 10px; background: rgba(76, 175, 80, 0.1); border-radius: 6px;">
            <label style="color: #888; font-size: 0.9em; display: block; margin-bottom: 5px;">Tier</label>
            <input type="number" value="${
              member.tier
            }" min="1" max="6" onchange="updatePartyMember(${
        member.id
      }, 'tier', parseInt(this.value))" style="width: 60px; font-size: 1.1em; font-weight: bold;" />
          </div>
          ${
            member.xp !== undefined
              ? `
          <div style="padding: 10px; background: rgba(76, 175, 80, 0.1); border-radius: 6px;">
            <label style="color: #888; font-size: 0.9em; display: block; margin-bottom: 5px;">XP</label>
            <input type="number" value="${member.xp}" min="0" onchange="updatePartyMember(${member.id}, 'xp', parseInt(this.value))" style="width: 60px; font-size: 1.1em; font-weight: bold;" />
          </div>
          `
              : ""
          }
           ${
             member.effort !== undefined
               ? `
          <div style="padding: 10px; background: rgba(76, 175, 80, 0.1); border-radius: 6px;">
            <label style="color: #888; font-size: 0.9em; display: block; margin-bottom: 5px;">Effort</label>
            <input type="number" value="${member.effort}" min="1" max="6" onchange="updatePartyMember(${member.id}, 'effort', parseInt(this.value))" style="width: 50px; font-size: 1.1em; font-weight: bold;" />
          </div>
          `
               : ""
           }
           </div>
        
        
        <!-- Stress & Damage -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-bottom: 15px;">
          <div style="padding: 10px; background: rgba(255, 152, 0, 0.1); border-radius: 6px;">
            <label style="color: #888; font-size: 0.9em; display: block; margin-bottom: 5px;">Stress</label>
            <div style="display: flex; align-items: center; gap: 8px;">
              <input type="number" value="${
                member.stress
              }" min="0" onchange="updatePartyMember(${
        member.id
      }, 'stress', parseInt(this.value))" style="width: 60px; font-size: 1.1em; font-weight: bold;" />
              <span style="color: #888; font-size: 0.85em;">Level: <strong style="color: #ff9800;">${Math.floor(
                member.stress / 3
              )}</strong></span>
            </div>
          </div>
          ${
            member.fullData?.supernaturalStress !== undefined
              ? `
          <div style="padding: 10px; background: rgba(139, 0, 139, 0.1); border-radius: 6px;">
            <label style="color: #888; font-size: 0.9em; display: block; margin-bottom: 5px;">Supernatural Stress</label>
            <div style="display: flex; align-items: center; gap: 8px;">
              <input type="number" value="${member.fullData.supernaturalStress}" min="0" max="10" onchange="updatePartyMember(${member.id}, 'fullData.supernaturalStress', parseInt(this.value))" style="width: 60px; font-size: 1.1em; font-weight: bold; color: #b19cd9;" />
              <span style="color: #888;">/ 10</span>
            </div>
          </div>
          `
              : ""
          }
           <div style="padding: 10px; background: rgba(255, 152, 0, 0.1); border-radius: 6px;">
            <label style="color: #888; font-size: 0.9em; display: block; margin-bottom: 5px;">Damage State</label>
            <select onchange="updatePartyMember(${
              member.id
            }, 'damage', this.value)" style="width: 100%; font-size: 0.95em;">
              <option value="Hale" ${
                member.damage === "Hale" || member.damage === "hale"
                  ? "selected"
                  : ""
              }>Hale</option>
              <option value="Impaired" ${
                member.damage === "Impaired" || member.damage === "impaired"
                  ? "selected"
                  : ""
              }>Impaired</option>
              <option value="Debilitated" ${
                member.damage === "Debilitated" ||
                member.damage === "debilitated"
                  ? "selected"
                  : ""
              }>Debilitated</option>
              <option value="Dead" ${
                member.damage === "Dead" || member.damage === "dead"
                  ? "selected"
                  : ""
              }>Dead</option>
            </select>
          </div>
        
         
        </div>
        
        <!-- Stat Pools -->
        <div style="background: rgba(76, 175, 80, 0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(76, 175, 80, 0.2); margin-bottom: 15px;">
          <h4 style="margin: 0 0 10px 0; color: #4CAF50;">Stat Pools</h4>
          <div style="display: grid; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="width: 80px; color: #66bb6a; font-weight: bold;">Might:</span>
              <input type="number" value="${
                member.might.current
              }" onchange="updatePartyMember(${
        member.id
      }, 'might.current', parseInt(this.value))" style="width: 55px;" />
              <span>/</span>
              <input type="number" value="${
                member.might.max
              }" onchange="updatePartyMember(${
        member.id
      }, 'might.max', parseInt(this.value))" style="width: 55px;" />
              <span style="color: #888; margin-left: 15px; font-size: 0.9em;">Edge:</span>
              <input type="number" value="${
                member.might.edge
              }" onchange="updatePartyMember(${
        member.id
      }, 'might.edge', parseInt(this.value))" style="width: 50px;" />
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="width: 80px; color: #66bb6a; font-weight: bold;">Speed:</span>
              <input type="number" value="${
                member.speed.current
              }" onchange="updatePartyMember(${
        member.id
      }, 'speed.current', parseInt(this.value))" style="width: 55px;" />
              <span>/</span>
              <input type="number" value="${
                member.speed.max
              }" onchange="updatePartyMember(${
        member.id
      }, 'speed.max', parseInt(this.value))" style="width: 55px;" />
              <span style="color: #888; margin-left: 15px; font-size: 0.9em;">Edge:</span>
              <input type="number" value="${
                member.speed.edge
              }" onchange="updatePartyMember(${
        member.id
      }, 'speed.edge', parseInt(this.value))" style="width: 50px;" />
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="width: 80px; color: #66bb6a; font-weight: bold;">Intellect:</span>
              <input type="number" value="${
                member.intellect.current
              }" onchange="updatePartyMember(${
        member.id
      }, 'intellect.current', parseInt(this.value))" style="width: 55px;" />
              <span>/</span>
              <input type="number" value="${
                member.intellect.max
              }" onchange="updatePartyMember(${
        member.id
      }, 'intellect.max', parseInt(this.value))" style="width: 55px;" />
              <span style="color: #888; margin-left: 15px; font-size: 0.9em;">Edge:</span>
              <input type="number" value="${
                member.intellect.edge
              }" onchange="updatePartyMember(${
        member.id
      }, 'intellect.edge', parseInt(this.value))" style="width: 50px;" />
            </div>
          </div>
        </div>
        
        <!-- Character Arc -->
        ${
          member.fullData?.characterArc
            ? `
        <details style="margin-bottom: 15px; background: rgba(0,0,0,0.3); border-radius: 6px; border: 1px solid #4CAF50;">
          <summary style="padding: 12px; cursor: pointer; font-weight: bold; color: #4CAF50;">Character Arc</summary>
          <div style="padding: 15px;">
            ${
              member.fullData.characterArc.currentArc
                ? `
              <div><strong style="color: #4CAF50;">Current Arc:</strong> ${
                member.fullData.characterArc.arcName ||
                member.fullData.characterArc.currentArc
              }</div>
              ${
                member.fullData.characterArc.arcNotes
                  ? `<div style="color: #ccc; margin-top: 5px;">${member.fullData.characterArc.arcNotes}</div>`
                  : ""
              }
            `
                : '<div style="color: #888;">No active character arc</div>'
            }
          </div>
        </details>
        `
            : ""
        }
        
        <!-- Skills -->
        ${
          member.fullData?.skillsData && member.fullData.skillsData.length > 0
            ? `
        <details style="margin-bottom: 15px; background: rgba(0,0,0,0.3); border-radius: 6px; border: 1px solid #4CAF50;">
          <summary style="padding: 12px; cursor: pointer; font-weight: bold; color: #4CAF50;">Skills (${
            member.fullData.skillsData.length
          })</summary>
          <div style="padding: 15px;">
            ${member.fullData.skillsData
              .map(
                (skill) => `
              <div style="margin-bottom: 8px;">
                <strong style="color: #66bb6a;">${skill.skill}</strong>
                <span style="color: #888; margin-left: 10px;">(${skill.stat})</span>
                <span style="color: #4CAF50; margin-left: 10px;">${skill.ability}</span>
              </div>
            `
              )
              .join("")}
          </div>
        </details>
        `
            : ""
        }
        
        <!-- Abilities -->
        ${
          member.fullData?.selectedTypeAbilities &&
          member.fullData.selectedTypeAbilities.length > 0
            ? `
        <details style="margin-bottom: 15px; background: rgba(0,0,0,0.3); border-radius: 6px; border: 1px solid #4CAF50;">
          <summary style="padding: 12px; cursor: pointer; font-weight: bold; color: #4CAF50;">Type Abilities (${
            member.fullData.selectedTypeAbilities.length
          })</summary>
          <div style="padding: 15px;">
            ${member.fullData.selectedTypeAbilities
              .map((abilityName) => {
                const isSupernatural =
                  abilityName.toLowerCase().includes("supernatural") ||
                  abilityName.toLowerCase().includes("entity") ||
                  abilityName.toLowerCase().includes("avatar") ||
                  abilityName.toLowerCase().includes("fear") ||
                  abilityName.toLowerCase().includes("ritual") ||
                  abilityName.toLowerCase().includes("marked");
                return `
              <div style="margin-bottom: 5px; color: ${
                isSupernatural ? "#b19cd9" : "#ccc"
              }; font-weight: ${
                  isSupernatural ? "bold" : "normal"
                };">• ${abilityName}</div>
            `;
              })
              .join("")}
          </div>
        </details>
        `
            : ""
        }
        
        <!-- Cyphers -->
        ${
          member.cyphers && member.cyphers.length > 0
            ? `
        <details style="margin-bottom: 15px; background: rgba(0,0,0,0.3); border-radius: 6px; border: 1px solid #4CAF50;">
          <summary style="padding: 12px; cursor: pointer; font-weight: bold; color: #4CAF50;">Cyphers (${
            member.cyphers.length
          }/${member.cypherLimit || 2})</summary>
          <div style="padding: 15px;">
            ${member.cyphers
              .map(
                (cypher, idx) => `
              <div style="margin-bottom: 10px; padding: 8px; background: rgba(76, 175, 80, 0.1); border-radius: 4px;">
                <strong style="color: #4CAF50;">${
                  cypher.name || "Unknown Cypher"
                }</strong>
                ${
                  cypher.level
                    ? `<span style="color: #ff9800; margin-left: 8px;">Level ${cypher.level}</span>`
                    : ""
                }
                ${
                  cypher.effect
                    ? `<div style="color: #ccc; font-size: 0.9em; margin-top: 4px;">${cypher.effect}</div>`
                    : ""
                }
              </div>
            `
              )
              .join("")}
          </div>
        </details>
        `
            : ""
        }
        
        <!-- Avatar Section -->
        ${
          isAvatar(member)
            ? `
        <div style="background: linear-gradient(135deg, #2a0000 0%, #1a0000 100%); padding: 15px; border-radius: 8px; border: 2px solid #8b0000; margin-bottom: 15px;">
          <h4 style="margin: 0 0 10px 0; color: #ff6b6b;">👁️ Avatar Status</h4>
          <div style="color: #ccc; margin-bottom: 10px;">
            <strong style="color: #ff6b6b;">Entity:</strong> ${avatarEntity(
              member
            )}
          </div>
          ${
            member.fullData?.avatar?.tetheredPowerName
              ? `
            <div style="color: #ccc;"><strong style="color: #ff6b6b;">Tethered Power:</strong> ${member.fullData.avatar.tetheredPowerName}</div>
          `
              : ""
          }
          ${
            member.fullData?.avatar?.powerChanges !== undefined
              ? `
            <div style="color: #ccc;"><strong style="color: #ff6b6b;">Power Changes:</strong> ${member.fullData.avatar.powerChanges}</div>
          `
              : ""
          }
        </div>
        `
            : ""
        }
        
        <!-- GM Notes -->
        <div style="margin-top: 15px;">
          <label style="display: block; margin-bottom: 5px; color: #888; font-weight: bold;">GM Notes</label>
          <textarea 
            placeholder="Private notes about this character..." 
            onchange="updatePartyMember(${member.id}, 'notes', this.value)"
            style="width: 100%; min-height: 80px; background: rgba(0,0,0,0.3); border: 1px solid #4CAF50; padding: 8px; border-radius: 4px; color: #e0e0e0;"
          >${member.notes || ""}</textarea>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  savePartyData();
}

function savePartyData() {
  localStorage.setItem("gmTool_partyMembers", JSON.stringify(partyMembers));
  updateDashboardPartyStats();
}

function loadPartyData() {
  const saved = localStorage.getItem("gmTool_partyMembers");
  if (saved) {
    partyMembers = JSON.parse(saved);
    renderPartyList();
  }
}

function updateDashboardPartyStats() {
  const partySize = document.getElementById("partySize");
  const avgTier = document.getElementById("avgTier");
  const activePlayers = document.getElementById("activePlayers");

  if (partySize) partySize.textContent = partyMembers.length;
  if (activePlayers) activePlayers.textContent = partyMembers.length;

  if (avgTier && partyMembers.length > 0) {
    const avg =
      partyMembers.reduce((sum, m) => sum + m.tier, 0) / partyMembers.length;
    avgTier.textContent = avg.toFixed(1);
  }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  loadPartyData();
});
