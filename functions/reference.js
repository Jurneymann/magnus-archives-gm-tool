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

  const primaryColor = window.getThemeColor("primary");
  const primaryLight = window.getThemeColor("primaryLight");
  const primaryRgba = window.getThemeColor("primaryRgba");

  container.innerHTML = `
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background: ${primaryRgba(0.2)};">
          <th style="padding: 12px; text-align: center; border-bottom: 2px solid ${primaryColor}; width: 80px;">Difficulty</th>
          <th style="padding: 12px; text-align: center; border-bottom: 2px solid ${primaryColor}; width: 80px;">Target #</th>
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid ${primaryColor}; width: 120px;">Description</th>
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid ${primaryColor};">Guidance</th>
        </tr>
      </thead>
      <tbody>
        ${DIFFICULTIES.map(
          (diff) => `
          <tr style="border-bottom: 1px solid ${primaryRgba(0.2)};">
            <td style="padding: 12px; text-align: center; font-weight: bold; color: ${primaryColor};">${
            diff.difficulty
          }</td>
            <td style="padding: 12px; text-align: center; font-weight: bold;">${
              diff.targetNumber
            }</td>
            <td style="padding: 12px; font-weight: bold; color: ${primaryLight};">${
            diff.description
          }</td>
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
