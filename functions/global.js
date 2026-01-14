// Magnus Archives GM Tool - Global Function Declarations
// All functions are exposed to the window object for inline event handlers
// This executes immediately when the script loads (synchronously)

// ==================== HORROR MODE HELPERS ====================
// Helper function to get theme-appropriate colors
window.getThemeColor = function (type = "primary") {
  const isHorrorMode = document.body.classList.contains("horror-mode-active");

  const colors = {
    normal: {
      primary: "#4caf50",
      primaryDark: "#317e30",
      primaryLight: "#66bb6a",
      primaryRgba: (alpha) => `rgba(76, 175, 80, ${alpha})`,
      primaryDark2: "#2E7D32",
      primaryDark3: "#2a6528",
    },
    horror: {
      primary: "#ff0000",
      primaryDark: "#8b0000",
      primaryLight: "#ff6b6b",
      primaryRgba: (alpha) => `rgba(255, 0, 0, ${alpha})`,
      primaryDark2: "#8b0000",
      primaryDark3: "#6b0000",
    },
  };

  const theme = isHorrorMode ? colors.horror : colors.normal;
  return theme[type] || theme.primary;
};

// ==================== NPC FUNCTIONS ====================
if (typeof addNPC !== "undefined") window.addNPC = addNPC;
if (typeof removeNPC !== "undefined") window.removeNPC = removeNPC;
if (typeof updateNPC !== "undefined") window.updateNPC = updateNPC;
if (typeof toggleNPCFavourite !== "undefined")
  window.toggleNPCFavourite = toggleNPCFavourite;
if (typeof getSelectedEntities !== "undefined")
  window.getSelectedEntities = getSelectedEntities;
if (typeof updateNPCEntities !== "undefined")
  window.updateNPCEntities = updateNPCEntities;
if (typeof renderNPCList !== "undefined") window.renderNPCList = renderNPCList;
if (typeof addNPCToCombat !== "undefined")
  window.addNPCToCombat = addNPCToCombat;
if (typeof addFromBestiary !== "undefined")
  window.addFromBestiary = addFromBestiary;
if (typeof saveNPCData !== "undefined") window.saveNPCData = saveNPCData;
if (typeof loadNPCData !== "undefined") window.loadNPCData = loadNPCData;
if (typeof exportNPCsJSON !== "undefined")
  window.exportNPCsJSON = exportNPCsJSON;
if (typeof importNPCsJSON !== "undefined")
  window.importNPCsJSON = importNPCsJSON;
if (typeof downloadNPCsTemplate !== "undefined")
  window.downloadNPCsTemplate = downloadNPCsTemplate;

// ==================== PARTY FUNCTIONS ====================
if (typeof addPartyMember !== "undefined")
  window.addPartyMember = addPartyMember;
if (typeof importCharacterSheet !== "undefined")
  window.importCharacterSheet = importCharacterSheet;
if (typeof addImportedCharacter !== "undefined")
  window.addImportedCharacter = addImportedCharacter;
if (typeof updateCharacterSheet !== "undefined")
  window.updateCharacterSheet = updateCharacterSheet;
if (typeof toggleCharacterDetails !== "undefined")
  window.toggleCharacterDetails = toggleCharacterDetails;
if (typeof removePartyMember !== "undefined")
  window.removePartyMember = removePartyMember;
if (typeof updatePartyMember !== "undefined")
  window.updatePartyMember = updatePartyMember;
if (typeof renderPartyList !== "undefined")
  window.renderPartyList = renderPartyList;
if (typeof savePartyData !== "undefined") window.savePartyData = savePartyData;
if (typeof loadPartyData !== "undefined") window.loadPartyData = loadPartyData;
if (typeof updateDashboardPartyStats !== "undefined")
  window.updateDashboardPartyStats = updateDashboardPartyStats;

// ==================== COMBAT FUNCTIONS ====================
if (typeof addPartyMemberToCombat !== "undefined")
  window.addPartyMemberToCombat = addPartyMemberToCombat;
if (typeof addAllPartyToCombat !== "undefined")
  window.addAllPartyToCombat = addAllPartyToCombat;
if (typeof addNPCToCombatTracker !== "undefined")
  window.addNPCToCombatTracker = addNPCToCombatTracker;
if (typeof addBestiaryToCombat !== "undefined")
  window.addBestiaryToCombat = addBestiaryToCombat;
if (typeof removeCombatant !== "undefined")
  window.removeCombatant = removeCombatant;
if (typeof quickAddCombatant !== "undefined")
  window.quickAddCombatant = quickAddCombatant;
if (typeof updateInitiative !== "undefined")
  window.updateInitiative = updateInitiative;
if (typeof randomizeInitiative !== "undefined")
  window.randomizeInitiative = randomizeInitiative;
if (typeof randomizeAllNPCInitiative !== "undefined")
  window.randomizeAllNPCInitiative = randomizeAllNPCInitiative;
if (typeof confirmInitiativeOrder !== "undefined")
  window.confirmInitiativeOrder = confirmInitiativeOrder;
if (typeof nextTurn !== "undefined") window.nextTurn = nextTurn;
if (typeof endCombat !== "undefined") window.endCombat = endCombat;
if (typeof updateCombatantField !== "undefined")
  window.updateCombatantField = updateCombatantField;
if (typeof toggleCombatantExpanded !== "undefined")
  window.toggleCombatantExpanded = toggleCombatantExpanded;
if (typeof renderCombatTracker !== "undefined")
  window.renderCombatTracker = renderCombatTracker;
if (typeof initializeCombatTracker !== "undefined")
  window.initializeCombatTracker = initializeCombatTracker;
if (typeof navigateToPartyTab !== "undefined")
  window.navigateToPartyTab = navigateToPartyTab;
if (typeof navigateToBestiaryTab !== "undefined")
  window.navigateToBestiaryTab = navigateToBestiaryTab;
if (typeof navigateToNPCsTab !== "undefined")
  window.navigateToNPCsTab = navigateToNPCsTab;

// ==================== DASHBOARD FUNCTIONS ====================
if (typeof switchToTab !== "undefined") window.switchToTab = switchToTab;
if (typeof initializeDashboard !== "undefined")
  window.initializeDashboard = initializeDashboard;
if (typeof updatePartyStats !== "undefined")
  window.updatePartyStats = updatePartyStats;
if (typeof addToRollLog !== "undefined") window.addToRollLog = addToRollLog;
if (typeof updateRollLogDisplay !== "undefined")
  window.updateRollLogDisplay = updateRollLogDisplay;
if (typeof clearRollLog !== "undefined") window.clearRollLog = clearRollLog;
if (typeof rollGroupInitiative !== "undefined")
  window.rollGroupInitiative = rollGroupInitiative;
if (typeof saveSessionNotes !== "undefined")
  window.saveSessionNotes = saveSessionNotes;
if (typeof loadSessionNotes !== "undefined")
  window.loadSessionNotes = loadSessionNotes;
if (typeof viewPastSessions !== "undefined")
  window.viewPastSessions = viewPastSessions;
if (typeof updateSessionHistoryDisplay !== "undefined")
  window.updateSessionHistoryDisplay = updateSessionHistoryDisplay;
if (typeof loadSession !== "undefined") window.loadSession = loadSession;
if (typeof editSessionFromHistory !== "undefined")
  window.editSessionFromHistory = editSessionFromHistory;
if (typeof deleteSessionFromHistory !== "undefined")
  window.deleteSessionFromHistory = deleteSessionFromHistory;
if (typeof toggleSessionDetails !== "undefined")
  window.toggleSessionDetails = toggleSessionDetails;
if (typeof sortSessionsBy !== "undefined")
  window.sortSessionsBy = sortSessionsBy;
if (typeof filterSessions !== "undefined")
  window.filterSessions = filterSessions;
if (typeof clearSessionFilters !== "undefined")
  window.clearSessionFilters = clearSessionFilters;

// ==================== REFERENCE FUNCTIONS ====================
if (typeof initializeReference !== "undefined")
  window.initializeReference = initializeReference;
if (typeof populateBestiary !== "undefined")
  window.populateBestiary = populateBestiary;
if (typeof filterBestiary !== "undefined")
  window.filterBestiary = filterBestiary;
if (typeof clearBestiaryFilters !== "undefined")
  window.clearBestiaryFilters = clearBestiaryFilters;
if (typeof renderBestiary !== "undefined")
  window.renderBestiary = renderBestiary;
if (typeof toggleCustomLeitnerForm !== "undefined")
  window.toggleCustomLeitnerForm = toggleCustomLeitnerForm;
if (typeof saveCustomLeitner !== "undefined")
  window.saveCustomLeitner = saveCustomLeitner;
if (typeof clearCustomLeitnerForm !== "undefined")
  window.clearCustomLeitnerForm = clearCustomLeitnerForm;
if (typeof editCustomLeitner !== "undefined")
  window.editCustomLeitner = editCustomLeitner;
if (typeof deleteCustomLeitner !== "undefined")
  window.deleteCustomLeitner = deleteCustomLeitner;
if (typeof filterCustomLeitners !== "undefined")
  window.filterCustomLeitners = filterCustomLeitners;
if (typeof clearCustomLeitnersFilters !== "undefined")
  window.clearCustomLeitnersFilters = clearCustomLeitnersFilters;
if (typeof renderCustomLeitners !== "undefined")
  window.renderCustomLeitners = renderCustomLeitners;
if (typeof toggleLeitnerEntityDropdown !== "undefined")
  window.toggleLeitnerEntityDropdown = toggleLeitnerEntityDropdown;
if (typeof updateLeitnerEntityDisplay !== "undefined")
  window.updateLeitnerEntityDisplay = updateLeitnerEntityDisplay;
if (typeof exportLeitnersJSON !== "undefined")
  window.exportLeitnersJSON = exportLeitnersJSON;
if (typeof importLeitnersJSON !== "undefined")
  window.importLeitnersJSON = importLeitnersJSON;
if (typeof downloadLeitnersTemplate !== "undefined")
  window.downloadLeitnersTemplate = downloadLeitnersTemplate;
if (typeof toggleCustomArtefactForm !== "undefined")
  window.toggleCustomArtefactForm = toggleCustomArtefactForm;
if (typeof saveCustomArtefact !== "undefined")
  window.saveCustomArtefact = saveCustomArtefact;
if (typeof clearCustomArtefactForm !== "undefined")
  window.clearCustomArtefactForm = clearCustomArtefactForm;
if (typeof editCustomArtefact !== "undefined")
  window.editCustomArtefact = editCustomArtefact;
if (typeof deleteCustomArtefact !== "undefined")
  window.deleteCustomArtefact = deleteCustomArtefact;
if (typeof filterCustomArtefacts !== "undefined")
  window.filterCustomArtefacts = filterCustomArtefacts;
if (typeof clearCustomArtefactsFilters !== "undefined")
  window.clearCustomArtefactsFilters = clearCustomArtefactsFilters;
if (typeof renderCustomArtefacts !== "undefined")
  window.renderCustomArtefacts = renderCustomArtefacts;
if (typeof toggleArtefactEntityDropdown !== "undefined")
  window.toggleArtefactEntityDropdown = toggleArtefactEntityDropdown;
if (typeof updateArtefactEntityDisplay !== "undefined")
  window.updateArtefactEntityDisplay = updateArtefactEntityDisplay;
if (typeof exportArtefactsJSON !== "undefined")
  window.exportArtefactsJSON = exportArtefactsJSON;
if (typeof importArtefactsJSON !== "undefined")
  window.importArtefactsJSON = importArtefactsJSON;
if (typeof downloadArtefactsTemplate !== "undefined")
  window.downloadArtefactsTemplate = downloadArtefactsTemplate;
if (typeof populateDifficulties !== "undefined")
  window.populateDifficulties = populateDifficulties;
if (typeof addToEncounter !== "undefined")
  window.addToEncounter = addToEncounter;
if (typeof addCustomAbility !== "undefined")
  window.addCustomAbility = addCustomAbility;
if (typeof removeCustomAbility !== "undefined")
  window.removeCustomAbility = removeCustomAbility;
if (typeof saveCustomEnemy !== "undefined")
  window.saveCustomEnemy = saveCustomEnemy;
if (typeof clearCustomEnemyForm !== "undefined")
  window.clearCustomEnemyForm = clearCustomEnemyForm;
if (typeof renderCustomEnemies !== "undefined")
  window.renderCustomEnemies = renderCustomEnemies;
if (typeof addCustomToEncounter !== "undefined")
  window.addCustomToEncounter = addCustomToEncounter;
if (typeof deleteCustomEnemy !== "undefined")
  window.deleteCustomEnemy = deleteCustomEnemy;
if (typeof saveCustomEnemies !== "undefined")
  window.saveCustomEnemies = saveCustomEnemies;
if (typeof loadCustomEnemies !== "undefined")
  window.loadCustomEnemies = loadCustomEnemies;

// ==================== TOOLS FUNCTIONS ====================
if (typeof generateRandomNPC !== "undefined")
  window.generateRandomNPC = generateRandomNPC;
if (typeof createNPCFromGenerated !== "undefined")
  window.createNPCFromGenerated = createNPCFromGenerated;
if (typeof generateRandomEncounter !== "undefined")
  window.generateRandomEncounter = generateRandomEncounter;
if (typeof generateRandomCypher !== "undefined")
  window.generateRandomCypher = generateRandomCypher;
if (typeof generateInvestigationHook !== "undefined")
  window.generateInvestigationHook = generateInvestigationHook;
if (typeof quickRoll !== "undefined") window.quickRoll = quickRoll;
if (typeof addPlotThread !== "undefined") window.addPlotThread = addPlotThread;
if (typeof removePlotThread !== "undefined")
  window.removePlotThread = removePlotThread;
if (typeof updatePlotThread !== "undefined")
  window.updatePlotThread = updatePlotThread;
if (typeof renderPlotThreads !== "undefined")
  window.renderPlotThreads = renderPlotThreads;
if (typeof savePlotThreads !== "undefined")
  window.savePlotThreads = savePlotThreads;
if (typeof loadPlotThreads !== "undefined")
  window.loadPlotThreads = loadPlotThreads;

// ==================== SAVE/LOAD CAMPAIGN FUNCTIONS ====================
if (typeof saveAllCampaignData !== "undefined")
  window.saveAllCampaignData = saveAllCampaignData;
if (typeof loadAllCampaignData !== "undefined")
  window.loadAllCampaignData = loadAllCampaignData;
if (typeof promptLoadCampaignFile !== "undefined")
  window.promptLoadCampaignFile = promptLoadCampaignFile;
if (typeof saveAutosave !== "undefined") window.saveAutosave = saveAutosave;
if (typeof loadAutosave !== "undefined") window.loadAutosave = loadAutosave;
if (typeof startAutosave !== "undefined") window.startAutosave = startAutosave;
if (typeof resetCampaign !== "undefined") window.resetCampaign = resetCampaign;

// ==================== LOCATION FUNCTIONS ====================
if (typeof toggleCustomLocationForm !== "undefined")
  window.toggleCustomLocationForm = toggleCustomLocationForm;
if (typeof clearCustomLocationForm !== "undefined")
  window.clearCustomLocationForm = clearCustomLocationForm;
if (typeof saveCustomLocation !== "undefined")
  window.saveCustomLocation = saveCustomLocation;
if (typeof renderCustomLocations !== "undefined")
  window.renderCustomLocations = renderCustomLocations;
if (typeof viewCustomLocation !== "undefined")
  window.viewCustomLocation = viewCustomLocation;
if (typeof editCustomLocation !== "undefined")
  window.editCustomLocation = editCustomLocation;
if (typeof deleteCustomLocation !== "undefined")
  window.deleteCustomLocation = deleteCustomLocation;
if (typeof filterCustomLocations !== "undefined")
  window.filterCustomLocations = filterCustomLocations;
if (typeof clearCustomLocationsFilters !== "undefined")
  window.clearCustomLocationsFilters = clearCustomLocationsFilters;
if (typeof populateLocationNPCsSelect !== "undefined")
  window.populateLocationNPCsSelect = populateLocationNPCsSelect;
if (typeof populateLocationEnemiesSelect !== "undefined")
  window.populateLocationEnemiesSelect = populateLocationEnemiesSelect;
if (typeof populateLocationArtefactsSelect !== "undefined")
  window.populateLocationArtefactsSelect = populateLocationArtefactsSelect;
if (typeof populateLocationLeitnersSelect !== "undefined")
  window.populateLocationLeitnersSelect = populateLocationLeitnersSelect;
if (typeof addSelectedNPCsToLocation !== "undefined")
  window.addSelectedNPCsToLocation = addSelectedNPCsToLocation;
if (typeof addSelectedEnemiesToLocation !== "undefined")
  window.addSelectedEnemiesToLocation = addSelectedEnemiesToLocation;
if (typeof addSelectedArtefactsToLocation !== "undefined")
  window.addSelectedArtefactsToLocation = addSelectedArtefactsToLocation;
if (typeof addSelectedLeitnersToLocation !== "undefined")
  window.addSelectedLeitnersToLocation = addSelectedLeitnersToLocation;
if (typeof removeLocationNPC !== "undefined")
  window.removeLocationNPC = removeLocationNPC;
if (typeof updateLocationNPCsList !== "undefined")
  window.updateLocationNPCsList = updateLocationNPCsList;
if (typeof removeLocationEnemy !== "undefined")
  window.removeLocationEnemy = removeLocationEnemy;
if (typeof updateLocationEnemiesList !== "undefined")
  window.updateLocationEnemiesList = updateLocationEnemiesList;
if (typeof removeLocationArtefact !== "undefined")
  window.removeLocationArtefact = removeLocationArtefact;
if (typeof updateLocationArtefactsList !== "undefined")
  window.updateLocationArtefactsList = updateLocationArtefactsList;
if (typeof removeLocationLeitner !== "undefined")
  window.removeLocationLeitner = removeLocationLeitner;
if (typeof updateLocationLeitnersList !== "undefined")
  window.updateLocationLeitnersList = updateLocationLeitnersList;
if (typeof saveCustomLocations !== "undefined")
  window.saveCustomLocations = saveCustomLocations;
if (typeof loadCustomLocations !== "undefined")
  window.loadCustomLocations = loadCustomLocations;
if (typeof exportLocationsJSON !== "undefined")
  window.exportLocationsJSON = exportLocationsJSON;
if (typeof importLocationsJSON !== "undefined")
  window.importLocationsJSON = importLocationsJSON;

// ==================== TOOLBAR FUNCTIONS ====================
if (typeof initializeToolbar !== "undefined")
  window.initializeToolbar = initializeToolbar;
if (typeof createToolbar !== "undefined") window.createToolbar = createToolbar;
if (typeof createReferencePanels !== "undefined")
  window.createReferencePanels = createReferencePanels;
if (typeof toggleRefPanel !== "undefined")
  window.toggleRefPanel = toggleRefPanel;

// ==================== TAB SYSTEM FUNCTIONS ====================
if (typeof initializeTabSystem !== "undefined")
  window.initializeTabSystem = initializeTabSystem;
