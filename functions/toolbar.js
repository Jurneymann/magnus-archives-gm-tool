// Quick Reference Toolbar

function initializeToolbar() {
  createToolbar();
  createReferencePanels();
}

function createToolbar() {
  const toolbar = document.createElement("div");
  toolbar.className = "quick-ref-toolbar";
  toolbar.innerHTML = `
    <button class="toolbar-button" onclick="toggleRefPanel('difficulty')">Task Difficulty</button>
    <button class="toolbar-button" onclick="toggleRefPanel('stress')">Stress</button>
    <button class="toolbar-button" onclick="toggleRefPanel('special')">Special Rolls</button>
    <button class="toolbar-button" onclick="toggleRefPanel('damage')">Damage Track</button>
  `;
  // Insert toolbar at the top of the body, before all other content
  document.body.insertBefore(toolbar, document.body.firstChild);
}

function createReferencePanels() {
  // Difficulty Panel
  const difficultyPanel = document.createElement("div");
  difficultyPanel.id = "ref-panel-difficulty";
  difficultyPanel.className = "ref-panel";
  difficultyPanel.innerHTML = `
    <h3>Task Difficulty Reference</h3>
    <div class="ref-panel-content">
      <table>
        <thead>
          <tr>
            <th>Difficulty</th>
            <th>Target #</th>
            <th>Description</th>
            <th>Guidance</th>
          </tr>
        </thead>
        <tbody>
          ${DIFFICULTIES.map(
            (d) => `
            <tr>
              <td><strong>${d.difficulty}</strong></td>
              <td style="text-align: center;"><strong style="color: #4CAF50;">${d.targetNumber}</strong></td>
              <td>${d.description}</td>
              <td style="text-align: center;">${d.guidance}</td>
            </tr>
          `
          ).join("")}
        </tbody>
      </table>
    </div>
  `;
  document.body.appendChild(difficultyPanel);

  // Stress Panel
  const stressPanel = document.createElement("div");
  stressPanel.id = "ref-panel-stress";
  stressPanel.className = "ref-panel";
  stressPanel.innerHTML = `
    <h3>Stress System</h3>
    <div class="ref-panel-content">
      <div class="stress-info-box">
        <h4>What is Stress?</h4>
        <p>Stress represents mental and emotional strain from frightening, disturbing, or supernatural encounters, as well as minor injuries.<br>The GM can assign stress points based on the situation, with more or less Stress points depending on the severity.</p>
      </div>
      
      <div class="stress-info-box">
        <h4>Gaining Stress</h4>
        <p><strong>1 Point of Stress:</strong><ul><li>Witnessing a supernatural event or creature from a distance.</li><li>Minor damage like a small cut or hard punch.</li></ul></p>
        <p><strong>2 Points of Stress:</strong><ul><li>Experiencing something "impossible" or deeply unsettling.</li><li>A serious injury like falling down the stairs or a hard punch to the face.</li></ul></p>
        <p><strong>3 Points of Stress:</strong><ul><li>Experiencing something that challengers your sense of reality.</li><li>Being grazed by a bullet.</li></ul></p>
             </div>
      
      <div class="stress-info-box">
        <h4>Stress Levels & Effects</h4>
        <p><ul>
        <li>Each <strong>3 points</strong> of accumulated stress  is a Stress Level</li></p>
        <p><li>Each Stress Level hinders all actions by <strong>1 step</strong> until the Stress is reduced</li></p>
        <p><li>After <strong>4 accumulated Stress Levels</strong>, each Stress Level thereafter is also a serious injury and takes the player character 1 step down the Damage Track</li>
        </ul></p>
      </div>
      
      <div class="stress-info-box">
        <h4>Stress from Supernatural Sources</h4><ul><li>
        <p>Players must keep track of Stress incurred from Supernatural sources. This can be the shock of seeing something supernatural or experiencing otherworldly phenomena, damage from supernatural creatures, or other related events, or prolonged exposure to an artefact or Leitner.</p></li>
        <li><p>Once gained, Stress from Supernatural Sources <strong class="warning-text">cannot be removed.</strong></p></li>
        <li><p>A player who has gained 10 Stress from Supernatural Sources has been touched by the Entities, and may take a supernatural aspect to themselves.</p></li></ul>
      </div>
      
<div class="stress-info-box">
        <h4>Avoiding or Resisting Stress</h4>
        <p>In certain situations, the GM may allow a player to make a Stress Resistance roll to avoid gaining Stress.</p>
        <p>This is typically an Intellect-based roll at the difficulty level of the creature or effect, or as set by the GM.</p>
        <p>Stress can only be avoided in situations where an injury can be avoided, such as slipping on muddy ground or witnessing a supernatural event. This is at the discretion of the GM.</p>
        <p>If a player fails a Defence check in combat, they typically cannot avoid the Stress.</p>
      </div>

      <div class="stress-info-box">
        <h4>Recovering Stress</h4>
        <p><strong>Rest & Safety:</strong> 3 points per hour in a safe environment</p>
        <p><strong>Healing action:</strong> Another player can make a healing check once per hour. The task difficulty is equal to the amount of Stress they want to reduce.</p>
        <p><strong>Eating or drinking:</strong> 3 points. Requires at least one action.</p>
        <p><strong>Mindful activities:</strong> Such as interacting with friends or a pet or meditating reduce +1 Stress per hour.</p>
        <p><strong>Recovery Rolls:</strong> A Recovery Roll automatically reduces Stress by 1 point per hour.</p>
      </div>
    </div>
  `;
  document.body.appendChild(stressPanel);

  // Special Rolls Panel
  const specialPanel = document.createElement("div");
  specialPanel.id = "ref-panel-special";
  specialPanel.className = "ref-panel";
  specialPanel.innerHTML = `
    <h3>Special Rolls</h3>
    <div class="ref-panel-content">
      <div class="special-roll-box">
        <h4>Natural 1 (Automatic Failure)</h4>
        <p>Rolling a 1 on a d20 is <strong class="danger-text">always a failure</strong>, regardless of modifiers.</p>
        <p>GM may apply additional complications or consequences.</p>
      </div>
      
      <div class="special-roll-box">
        <h4>Natural 17+ (Minor Effect)</h4>
        <p>Rolling 17-19 on a d20 grants a <strong class="warning-text">minor effect</strong>:</p>
        <p><strong>Combat:</strong> Additional damage (+1 for 17, +2 for 18, +3 for 19) OR additional effect (knock back, daze, etc.)</p>
        <p><strong>Non-Combat:</strong> Additional benefit, clue, or advantage</p>
      </div>
      
      <div class="special-roll-box">
        <h4>Natural 20 (Major Effect)</h4>
        <p>Rolling a 20 on a d20 grants a <strong style="color: #4CAF50;">major effect</strong>:</p>
        <p><strong>Combat:</strong> +4 damage OR major effect (stun, disarm, etc.)</p>
        <p><strong>Non-Combat:</strong> Exceptional success with major bonus</p>
      </div>
      
      <div class="special-roll-box">
        <h4>Group Rolls</h4>
        <p>When the party acts together, one player rolls for the group.</p>
        <p><strong>Assets:</strong> An assisting player can ease or hinder a task based on the relevant skill.</p>
        <p><strong>Abilities:</strong> Some abilities can affect other player's rolls.</p>
      </div>
      
      <div class="special-roll-box">
        <h4>Retrying Failed Tasks</h4>
        <p>Cannot retry the same approach to a failed task.</p>
        <p><strong>Reroll:</strong> Costs 1XP to reroll a failed task</p>
        <p><strong>New Approach:</strong> Try different method, use different skill, or wait for circumstances to change</p>
        <p><strong>GM Intrusion:</strong> May allow retry with complications</p>
      </div>     
    </div>
  `;
  document.body.appendChild(specialPanel);

  // Damage Track Panel
  const damagePanel = document.createElement("div");
  damagePanel.id = "ref-panel-damage";
  damagePanel.className = "ref-panel";
  damagePanel.innerHTML = `
    <h3>Damage Track</h3>
    <div class="ref-panel-content">
      <div class="damage-info-box">
        <h4>Hale</h4>
        <p><strong>Condition:</strong> Healthy and uninjured</p>
        <p><strong>Effect:</strong> <span class="warning-text">No penalties.</span></p>
      </div>
      
      <div class="damage-info-box">
        <h4>Hurt</h4>
        <p><strong>Condition:</strong> Minor injuries. Only available to certain tough characters.</p>
        <p><strong>Effect:</strong> <span class="warning-text">No penalties.</span></p>
      </div>

      <div class="damage-info-box">
        <h4 class="warning-text">Impaired</h4>
        <p><strong>Condition:</strong> Wounded or injured.</p>
        <p><strong>Effect:</strong> <span class="warning-text">Effort costs 1 extra point per level applied. </span></p>
        <p><strong>Combat:</strong> No minor or major effects or bonus damage on combat rolls.</p>
        
      </div>
      
      <div class="damage-info-box">
        <h4 class="danger-text">Debilitated</h4>
        <p><strong>Condition:</strong> Critically injured</p>
        <p><strong>Effect:</strong> <span class="danger-text">Cannot take actions except to move</span></p>
      </div>
      
      <div class="damage-info-box" style="border-color: #f44336;">
        <h4 class="danger-text">Dead</h4>
        <p><strong>Condition:</strong> <span class="danger-text">Character death</span></p>
      </div>
           
      <div class="damage-info-box">
        <h4>Recovery</h4>
        <p><strong>Healing action:</strong> To move each step up the damage track, one hour action with a difficulty of 6.</p>
        <p><strong>Medical attention:</strong> Professional medical care and lots of rest can restore the character to <strong>Hale</strong>.</p>
      </div>
    </div>
  `;
  document.body.appendChild(damagePanel);
}

function toggleRefPanel(panelId) {
  const panel = document.getElementById(`ref-panel-${panelId}`);
  const button = event.target;
  const allPanels = document.querySelectorAll(".ref-panel");
  const allButtons = document.querySelectorAll(".toolbar-button");

  // Close all other panels
  allPanels.forEach((p) => {
    if (p.id !== `ref-panel-${panelId}`) {
      p.classList.remove("active");
    }
  });

  // Deactivate all other buttons
  allButtons.forEach((b) => {
    if (b !== button) {
      b.classList.remove("active");
    }
  });

  // Toggle current panel
  if (panel.classList.contains("active")) {
    panel.classList.remove("active");
    button.classList.remove("active");
  } else {
    panel.classList.add("active");
    button.classList.add("active");
  }
}

// Close panels when clicking outside
document.addEventListener("click", function (event) {
  if (
    !event.target.closest(".quick-ref-toolbar") &&
    !event.target.closest(".ref-panel")
  ) {
    const allPanels = document.querySelectorAll(".ref-panel");
    const allButtons = document.querySelectorAll(".toolbar-button");

    allPanels.forEach((p) => p.classList.remove("active"));
    allButtons.forEach((b) => b.classList.remove("active"));
  }
});

// Initialize toolbar when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initializeToolbar();
});
