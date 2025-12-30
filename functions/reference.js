// Magnus Archives GM Tool - Reference Library

// Track filter states
let leitnersFilters = { name: "", entity: "" };
let artefactsFilters = { name: "", entity: "" };
let bestiaryFilters = { name: "", entity: "", level: "" };
let customEnemyFilters = { name: "", entity: "", level: "" };
let customArtefactsFilters = { name: "", entity: "" };
let customLeitnersFilters = { name: "", entity: "" };

function initializeReference() {
  populateDifficulties();
  // Reference databases (artefacts and leitners) are hidden for copyright reasons
  // populateLeitners();
  // populateArtefacts();
  populateBestiary();
  loadCustomEnemies();
  clearCustomEnemyFilters();
  renderCustomEnemies();
  loadCustomArtefacts();
  clearCustomArtefactsFilters();
  renderCustomArtefacts();
  loadCustomLeitners();
  clearCustomLeitnersFilters();
  renderCustomLeitners();
}

// ==================== DIFFICULTIES ==================== //
function populateDifficulties() {
  const container = document.getElementById("difficultiesReference");
  if (!container || typeof DIFFICULTIES === "undefined") return;

  container.innerHTML = `
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background: rgba(76, 175, 80, 0.2);">
          <th style="padding: 12px; text-align: center; border-bottom: 2px solid #4CAF50; width: 80px;">Difficulty</th>
          <th style="padding: 12px; text-align: center; border-bottom: 2px solid #4CAF50; width: 80px;">Target #</th>
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid #4CAF50; width: 120px;">Description</th>
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid #4CAF50;">Guidance</th>
        </tr>
      </thead>
      <tbody>
        ${DIFFICULTIES.map(
          (diff) => `
          <tr style="border-bottom: 1px solid rgba(76, 175, 80, 0.2);">
            <td style="padding: 12px; text-align: center; font-weight: bold; color: #4CAF50;">${diff.difficulty}</td>
            <td style="padding: 12px; text-align: center; font-weight: bold;">${diff.targetNumber}</td>
            <td style="padding: 12px; font-weight: bold; color: #66bb6a;">${diff.description}</td>
            <td style="padding: 12px; color: #ccc;">${diff.guidance}</td>
          </tr>
        `
        ).join("")}
      </tbody>
    </table>
  `;
}

// ==================== ADD TO ENCOUNTER ==================== //
function addToEncounter(creatureName) {
  if (typeof addBestiaryToCombat === "function") {
    addBestiaryToCombat(creatureName);
  } else {
    alert("Combat tracker not available.");
  }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  initializeReference();
});
