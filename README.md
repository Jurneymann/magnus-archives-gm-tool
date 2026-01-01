# The Magnus Archives - Game Master Tool

A comprehensive web-based toolset for running tabletop RPG campaigns set in The Magnus Archives universe. This application provides Game Masters with everything they need to manage parties, NPCs, enemies, locations, session notes, and more.

**Created by**: [Jurneymann](https://github.com/Jurneymann)

This project is free for use, but if you would like to contribute to my development costs, you can support me at [buymeacoffee/jurneymann](buymeacoffee.com/jurneymann)

![Magnus Archives GM Tool](assets/MagnusHeader.png)

## About The Magnus Archives

**[The Magnus Archives](https://rustyquill.com/the-magnus-archives/)** is a horror fiction podcast created by Jonathan Sims and produced by **[Rusty Quill](https://rustyquill.com)**. If you haven't listened to the podcast yet, we highly encourage you to experience this incredible story of supernatural horror and mystery!

This GM Tool is designed to support the **[The Magnus Archives Roleplaying Game](https://www.montecookgames.com/store/product/the-magnus-archives-roleplaying-game/)**, published by **[Monte Cook Games](https://www.montecookgames.com)**. **Please note: You will need to purchase the official rulebook to play the game.** This tool provides campaign management utilities but does not contain the rules or copyrighted content from the sourcebooks.

**This is an unofficial fan-made tool and is not affiliated with, endorsed by, or sponsored by Rusty Quill or Monte Cook Games.**

## Features

### 📊 Campaign Management

- **Dashboard**: Quick overview of party stats
- **Campaign Save/Load**: Export and import complete campaign data as JSON files
- **Autosave**: Automatic campaign backup every 10 minutes to localStorage
- **Campaign Reset**: Clean slate for starting new campaigns

### 👥 Party & NPCs

- **Party Manager**: Track player characters with full stats, damage state, stress, abilities, and skills
- **Character Import**: Import character sheets from JSON files
- **NPC Database**: Create and manage custom NPCs with affiliations, relationships, and detailed descriptions
- **Reference Popups**: Quick reference tools for difficulty, stress, damage and special rolls

### ⚔️ Combat System

- **Combat Tracker**: Full-featured initiative tracker with three phases (Setup, Initiative, Active)
- **Quick Add**: Rapidly add combatants with name, health, and armor
- **Random Initiative**: Roll initiative for all NPCs with one click
- **Health/Stress Tracking**: Real-time tracking of combatant status with visual indicators
- **Defeat Detection**: Automatic detection of defeated combatants

### 🗺️ World Building

- **Entity Associations**: Link locations to specific Magnus Archives entities
- **Location Import/Export**: Share locations via JSON templates

### 📚 Reference Libraries

- **Bestiary**: Create and manage custom enemies with stats, abilities, and entity associations
- **Locations**: Create detailed locations with descriptions, NPCs, enemies, artefacts, and Leitner books
- **Artefacts**: Custom cursed objects with stress effects and fear properties
- **Leitner Books**: Dangerous tomes with entity connections and supernatural effects
- **Difficulty Table**: Quick reference for task difficulties (0-10)

### 🎲 GM Tools

- **Plot Thread Tracker**: Manage ongoing storylines with clues, NPCs, related entities, and connected content
- **Session Notes**: Rich text editor for recording session events and notes
- **Session History**: Archive past sessions with automatic dating and session numbers

## Getting Started

### Installation

1. **Clone or download** this repository
2. **Open `index.html`** in a modern web browser (Chrome, Firefox, Edge recommended)
3. **Start creating** your campaign!

No server or build process required - this is a pure client-side application.

### First Steps

1. **Name Your Campaign**: Enter a campaign name at the top of the dashboard
2. **Add Players**: Navigate to the "Party" tab and add your player characters
3. **Create Content**: Build your custom bestiary, NPCs, locations, and artefacts
4. **Import Data**: Use the JSON import features to load pre-made content
5. **Save Regularly**: Download campaign exports as backups (autosave runs every 10 minutes)

## Data Management

### Import/Export

Each content type supports JSON import/export:

- **Campaign Data**: Full campaign export/import from the Save/Load panel
- **Bestiary**: Import/export custom enemies
- **Locations**: Share location databases
- **Artefacts**: Transfer cursed objects between campaigns
- **Leitner Books**: Import/export dangerous tomes

### Templates

Download blank JSON templates from each creation section to see the required data structure.

### Storage

- **localStorage**: All data is stored in your browser's localStorage
- **Autosave**: Automatic backup every 10 minutes
- **Manual Save**: Download full campaign JSON files anytime
- **No Server**: All data stays in your browser - nothing is sent to external servers

### Data Privacy

This application:

- ✅ Stores all data locally in your browser
- ✅ Works completely offline (after first load)
- ✅ Includes Google Analytics for usage statistics only
- ❌ Does not send campaign data to any server
- ❌ Does not track personal information

## File Structure

```
Magnus Archives GM Tool/
├── index.html                  # Main application file
├── LICENSE                     # MIT License with disclaimers
├── README.md                   # This file - main documentation
├── BESTIARY_README.md          # Bestiary JSON format guide
├── NPCS_README.md              # NPCs JSON format guide
├── ARTEFACTS_README.md         # Artefacts JSON format guide
├── LEITNERS_README.md          # Leitner's Books JSON format guide
├── LOCATIONS_README.md         # Locations JSON format guide
├── assets/                     # Images and icons
│   ├── favicon.png
│   ├── MagnusHeader.png
│   └── magnusbackground.jpg
├── databases/                  # JSON templates and examples
│   ├── artefacts-template.json
│   ├── bestiary-template.json
│   ├── leitners-template.json
│   └── locations-template.json
├── functions/                  # Core JavaScript modules
│   ├── artefacts.js            # Artefact management
│   ├── bestiary.js             # Enemy/creature management
│   ├── combat.js               # Combat tracker system
│   ├── dashboard.js            # Dashboard and stats
│   ├── global.js               # Global function exports
│   ├── leitners.js             # Leitner book management
│   ├── locations.js            # Location management
│   ├── main.js                 # Application initialization
│   ├── npcs.js                 # NPC management
│   ├── party.js                # Party member management
│   ├── reference.js            # Reference library
│   ├── save-load.js            # Campaign save/load/autosave
│   ├── tab-system.js           # Tab navigation
│   ├── toolbar.js              # Quick reference toolbar
│   └── tools.js                # GM tools and generators
├── styles/                     # CSS styling
│   ├── base.css                # Base layout and typography
│   ├── gm-tools.css            # GM tools styling
│   ├── save-load.css           # Save/load panel styling
│   ├── tabs.css                # Tab system styling
│   └── toolbar.css             # Toolbar styling
├── tables/                     # Reference data
│   └── difficulties.js         # Difficulty reference table
└── reference/                  # Example character sheets
    └── [save location for player character sheet .json files]
```

### Documentation Files

- **README.md**: Main documentation with features, setup, and usage
- **BESTIARY_README.md**: Complete guide to creating and importing custom enemies
- **NPCS_README.md**: Guide to NPC creation, abilities, and combat integration
- **ARTEFACTS_README.md**: Documentation for cursed objects with stress mechanics
- **LEITNERS_README.md**: Guide to creating dangerous supernatural books
- **LOCATIONS_README.md**: Location creation with NPCs, enemies, and items

## Browser Compatibility

- ✅ **Chrome/Edge** (v90+): Fully supported
- ✅ **Firefox** (v88+): Fully supported
- ✅ **Safari** (v14+): Supported with minor quirks
- ⚠️ **Mobile Browsers**: Functional but optimized for desktop use

## Tips & Best Practices

### Performance

- Keep your bestiary under 100 creatures for optimal performance
- Regularly export campaign data as backups
- Clear old session notes periodically

### Organization

- Use entity tags consistently across NPCs, locations, and enemies
- Name conventions: Use clear, searchable names
- Plot threads: Link all relevant NPCs, artefacts, and locations

### Campaign Management

1. **Session Start**: Review plot threads and relevant NPCs
2. **During Play**: Track rolls in the dashboard, take quick notes
3. **Session End**: Save detailed session notes, update plot threads
4. **Between Sessions**: Export campaign backup, plan encounters

## Copyright & Content

### Application

This GM Tool application is provided as-is for personal use.

### The Magnus Archives IP

The Magnus Archives is created by Rusty Quill. This tool is an unofficial fan-made resource and is not affiliated with or endorsed by Rusty Quill or any official Magnus Archives products.

### Pre-loaded Content

This version of the tool **does not include** pre-loaded creatures, artefacts, or Leitner books from any published game manuals to respect copyright. Users must:

- Create their own custom content
- Import content they legally own
- Use the provided template systems

## Support & Issues

### Troubleshooting

**Lost data after browser update?**

- Check if autosave data exists (Load Autosave button)
- Restore from your last campaign export file

**Autosave not working?**

- Check browser console for errors (F12)
- Verify localStorage is not full (5-10MB limit)
- Try a different browser

**Import failing?**

- Verify JSON format matches template structure
- Check for syntax errors in JSON file
- Ensure all required fields are present

### Known Limitations

- localStorage has a ~5-10MB limit per domain
- Very large campaigns may need periodic cleanup
- No multi-user/online collaboration features
- No built-in backup to cloud services

## Changelog

### Latest Updates

- ✅ Removed copyrighted bestiary content
- ✅ Added comprehensive autosave logging
- ✅ Migrated bestiary to custom-only system
- ✅ Cleaned up unused functions and assets
- ✅ Improved code organization and documentation

## Acknowledgments

### Original Works

**[The Magnus Archives Podcast](https://rustyquill.com/the-magnus-archives/)**  
Created by Jonathan Sims and produced by Rusty Quill Ltd.  
© Rusty Quill Ltd. All rights reserved.  
Website: https://rustyquill.com

**[The Magnus Archives Roleplaying Game](https://www.montecookgames.com/store/product/the-magnus-archives-roleplaying-game/)**  
Published by Monte Cook Games  
Based on the Cypher System  
© Monte Cook Games, LLC. All rights reserved.  
Website: https://www.montecookgames.com

### Community

Thanks to all Magnus Archives TTRPG fans and players who contribute to keeping this amazing universe alive through gameplay!

### Tool Development

This GM Tool was created by **[Jurneymann](https://github.com/Jurneymann)** to support Game Masters running campaigns in The Magnus Archives universe.

**Listen to the podcast**: https://rustyquill.com/the-magnus-archives/  
**Purchase the rulebook**: https://www.montecookgames.com/store/product/the-magnus-archives-roleplaying-game/

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Important**: This is an unofficial fan-made tool. The Magnus Archives and related intellectual property are owned by their respective copyright holders. This tool contains no copyrighted content from the official sourcebooks or podcast. Users are responsible for ensuring their use complies with all applicable copyright laws.

---

**Version**: 1.0  
**Last Updated**: December 2025  
**Repository**: https://github.com/Jurneymann/magnus-archives-gm-tool

For questions, suggestions, or contributions, please use the repository's issue tracker or discussions section.
