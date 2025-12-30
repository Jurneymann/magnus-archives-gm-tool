# NPCs JSON Format

## Overview

The Magnus Archives GM Tool allows you to create and manage non-player characters through a simple JSON import system. You can build NPCs individually through the interface or import entire rosters as JSON files.

**Note**: You don't need to write JSON files manually! Create NPCs directly in the app using the interface, then export them as JSON files for backup or sharing. You can also download a template JSON file from within the app to see the correct format.

## JSON Structure

Each NPC in your JSON file should follow this structure:

```json
[
  {
    "id": 1234567890,
    "name": "NPC Name",
    "favourite": false,
    "level": 5,
    "health": 15,
    "damage": "Low",
    "affiliation": "Organization Name",
    "description": "A detailed description of the NPC's personality, background, and role in your campaign.",
    "entity": ["The Hunt", "The Eye"],
    "abilities": "Ability Name: Description of what the ability does.\n\nSecond Ability: Another ability description with mechanical details.",
    "gmNotes": "Private notes about how to use this NPC, their secrets, or plot hooks.",
    "role": "Job Title or Role"
  }
]
```

## Required Fields

- **name**: The NPC's name (string)
- **level**: Difficulty level 1-10 (number)

## Optional Fields

- **id**: Unique identifier (auto-generated if not provided)
- **favourite**: Mark as favorite for quick access (boolean)
- **health**: Hit points (number, often level × 3)
- **damage**: Damage description like "Low", "Moderate", or specific values
- **affiliation**: Organization or faction they belong to
- **description**: Personality, appearance, background, and motivations
- **entity**: Array of entity alignments (e.g., ["The Hunt", "The Eye"])
- **abilities**: Special abilities with names and effects (use \n\n for line breaks)
- **gmNotes**: Private GM notes for encounter design and plot hooks
- **role**: Their job title or function

## Importing JSON

1. Click the **"📤 Import JSON"** button in the NPCs tab
2. Select your JSON file
3. Choose to either:
   - **Merge** with existing NPCs (adds new ones, keeps existing)
   - **Replace** all existing NPCs

## Exporting JSON

1. Click the **"💾 Export JSON"** button
2. Your NPC roster will download as a dated JSON file
3. Share with other GMs or keep as backup

## Example Complete Entry

```json
[
  {
    "id": 1766697719928,
    "name": "Dr. Evelyn Harrow",
    "favourite": false,
    "level": 7,
    "health": 24,
    "damage": "Moderate",
    "affiliation": "The Whitmore Foundation",
    "description": "Dr. Evelyn Harrow is a composed, iron-willed woman whose presence radiates control rather than comfort. She speaks precisely, wastes no words, and treats fear as a tool to be applied carefully rather than indulged.",
    "entity": ["The Hunt"],
    "abilities": "Seasoned Hunter: Gains advantage on tracking, investigation, or pursuit rolls involving known entities or recurring threats.\n\nPrepared Always: Once per scene, may reveal she has already taken a reasonable precaution (wards in place, exits planned, weapon cached).\n\nCold Authority: Can issue a command that compels hesitation or compliance from Foundation staff or civilians aware of her reputation.",
    "gmNotes": "Dr. Harrow is not reckless — she survives by caution, planning, and knowing when to step back. Her Hunt alignment manifests as obsession with closing the chase, not thrill-seeking.",
    "role": "Director of the Whitmore Foundation"
  }
]
```

## Tips

- Use **favourite** for recurring or important NPCs to quickly find them
- Keep entity alignments consistent with your bestiary
- Use `\n\n` in abilities and gmNotes for line breaks
- Health is often level × 3, but adjust for important characters
- Store plot secrets in gmNotes rather than description
- Affiliation helps organize NPCs by faction or location
- Level determines difficulty if the NPC becomes hostile

## Adding NPCs to Combat

NPCs can be added directly to the Combat Tracker:

1. Click the **"⚔️ Combat"** button next to any NPC
2. If combat is already active, you'll be prompted to set their initiative
3. Type a number (1-20) or "random" for automatic roll
4. They'll be inserted in the correct initiative order

## Copyright Notice

This tool is designed for use with your own custom content. Do not include copyrighted material from published sourcebooks in your JSON files for distribution. Use official content only for personal, non-commercial gameplay.
