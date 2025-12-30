# Bestiary JSON Format

## Overview

The Magnus Archives GM Tool now uses a fully editable bestiary system. You can create enemies individually through the interface or import/export them as JSON files.

**Note**: You don't need to write JSON files manually! Create entries directly in the app using the interface, then export them as JSON files for backup or sharing. You can also download a template JSON file from within the app to see the correct format.

## JSON Structure

Each enemy in the bestiary should have the following structure:

```json
[
  {
    "id": 1,
    "name": "Creature Name",
    "description": "Description of the creature",
    "level": 5,
    "entity": ["The Hunt", "The Flesh"],
    "health": 15,
    "stress": 10,
    "damageInflicted": "5 points",
    "movement": "Short",
    "combat": "Claws as level 6",
    "modifications": "Speed defense as level 6",
    "abilities": [
      {
        "name": "Ability Name",
        "effect": "Description of what the ability does"
      }
    ],
    "gmNotes": "Private notes for the GM"
  }
]
```

## Required Fields

- **name**: The creature's name (string)
- **level**: Difficulty level 1-10 (number)

## Optional Fields

- **id**: Unique identifier (auto-generated if not provided)
- **description**: Flavor text about the creature
- **entity**: Single string or array of entity alignments
- **health**: Hit points (defaults to level × 3)
- **stress**: Stress points
- **damageInflicted**: Damage description (e.g., "5 points")
- **movement**: Movement range description
- **combat**: Combat modifier description
- **modifications**: Any stat modifications
- **abilities**: Array of ability objects with `name` and `effect`
- **gmNotes**: Private notes (highlighted in orange)

## Importing JSON

1. Click the **"📤 Upload JSON"** button in the Bestiary tab
2. Select your JSON file
3. Choose to either:
   - **Merge** with existing enemies (adds new ones)
   - **Replace** all existing enemies

## Exporting JSON

1. Click the **"💾 Export JSON"** button
2. Your bestiary will download as a dated JSON file
3. Share with other GMs or keep as backup

## Example Complete Entry

```json
[
  {
    "id": 1,
    "name": "The Anglerfish",
    "description": "A servant of The Stranger, wearing the face of someone you once knew.",
    "level": 6,
    "entity": ["The Stranger"],
    "health": 18,
    "stress": 0,
    "damageInflicted": "6 points",
    "movement": "Short",
    "combat": "Attacks as level 7 when disguised",
    "modifications": "Deception and disguise as level 8",
    "abilities": [
      {
        "name": "Stolen Face",
        "effect": "Perfectly mimics the appearance and mannerisms of someone the target knows. Intellect defense task at level 7 to recognize the deception."
      },
      {
        "name": "Memory Drain",
        "effect": "On a successful attack, the target must make an Intellect defense roll. On failure, they lose a memory related to the person being mimicked."
      }
    ],
    "gmNotes": "Use sparingly - very effective for paranoia-inducing encounters"
  }
]
```

## Tips

- Keep entity names consistent (e.g., always use "The Hunt" not "Hunt")
- Level typically ranges from 1-10
- Health is often level × 3, but can vary
- Abilities should be clear and actionable for quick reference
- Use gmNotes for encounter ideas and timing suggestions

## Copyright Notice

This tool is designed for use with your own custom content. Do not include copyrighted material from published sourcebooks in your JSON files for distribution. Use official content only for personal, non-commercial gameplay.
