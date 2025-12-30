// Magnus Archives GM Tool - Global Function Declarations
// All functions are exposed to the window object for inline event handlers
// This executes immediately when the script loads (synchronously)

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
window.addPartyMember = addPartyMember;
window.importCharacterSheet = importCharacterSheet;
window.addImportedCharacter = addImportedCharacter;
window.updateCharacterSheet = updateCharacterSheet;
window.toggleCharacterDetails = toggleCharacterDetails;
window.removePartyMember = removePartyMember;
window.updatePartyMember = updatePartyMember;
window.renderPartyList = renderPartyList;
window.savePartyData = savePartyData;
window.loadPartyData = loadPartyData;
window.updateDashboardPartyStats = updateDashboardPartyStats;

// ==================== COMBAT FUNCTIONS ====================
window.addPartyMemberToCombat = addPartyMemberToCombat;
window.addAllPartyToCombat = addAllPartyToCombat;
window.addNPCToCombatTracker = addNPCToCombatTracker;
window.addBestiaryToCombat = addBestiaryToCombat;
window.removeCombatant = removeCombatant;
window.quickAddCombatant = quickAddCombatant;
window.updateInitiative = updateInitiative;
window.randomizeInitiative = randomizeInitiative;
window.randomizeAllNPCInitiative = randomizeAllNPCInitiative;
window.confirmInitiativeOrder = confirmInitiativeOrder;
window.nextTurn = nextTurn;
window.endCombat = endCombat;
window.updateCombatantField = updateCombatantField;
window.toggleCombatantExpanded = toggleCombatantExpanded;
window.renderCombatTracker = renderCombatTracker;
window.initializeCombatTracker = initializeCombatTracker;
window.navigateToPartyTab = navigateToPartyTab;
window.navigateToBestiaryTab = navigateToBestiaryTab;
window.navigateToNPCsTab = navigateToNPCsTab;

// ==================== DASHBOARD FUNCTIONS ====================
window.switchToTab = switchToTab;
window.initializeDashboard = initializeDashboard;
window.updatePartyStats = updatePartyStats;
window.addToRollLog = addToRollLog;
window.updateRollLogDisplay = updateRollLogDisplay;
window.clearRollLog = clearRollLog;
window.rollGroupInitiative = rollGroupInitiative;
window.saveSessionNotes = saveSessionNotes;
window.loadSessionNotes = loadSessionNotes;
window.viewPastSessions = viewPastSessions;
window.updateSessionHistoryDisplay = updateSessionHistoryDisplay;
window.loadSession = loadSession;
window.editSessionFromHistory = editSessionFromHistory;
window.deleteSessionFromHistory = deleteSessionFromHistory;
window.toggleSessionDetails = toggleSessionDetails;
window.sortSessionsBy = sortSessionsBy;
window.filterSessions = filterSessions;
window.clearSessionFilters = clearSessionFilters;

// ==================== REFERENCE FUNCTIONS ====================
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
