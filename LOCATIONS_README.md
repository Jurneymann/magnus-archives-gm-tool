# Locations JSON Format

## Overview

The Magnus Archives GM Tool allows you to create and manage campaign locations as JSON files. Locations serve as encounter sites, investigation hubs, and can contain NPCs, enemies, artefacts, and Leitner books all in one organized package.

**Note**: You don't need to write JSON files manually! Create locations directly in the app using the interface, then export them as JSON files for backup or sharing. You can also download a template JSON file from within the app to see the correct format.

## JSON Structure

Each location in your JSON file should follow this structure:

```json
[
  {
    "id": 1234567890,
    "name": "Location Name",
    "address": "123 Example Street, City, Country",
    "description": "A detailed description of the location's appearance, atmosphere, history, and notable features.",
    "npcs": [
      {
        "id": 1234567891,
        "name": "NPC Name",
        "data": {
          "full NPC data object here"
        }
      }
    ],
    "enemies": [
      {
        "id": 1234567892,
        "name": "Enemy Name",
        "data": {
          "full enemy data object here"
        }
      }
    ],
    "artefacts": [
      {
        "id": 1234567893,
        "name": "Artefact Name",
        "data": {
          "full artefact data object here"
        }
      }
    ],
    "leitners": [
      {
        "id": 1234567894,
        "name": "Book Title",
        "data": {
          "full book data object here"
        }
      }
    ],
    "equipment": "List of general items and equipment:\n- Item 1\n- Item 2\n- Item 3",
    "supernatural": "Description of Entity influence, paranormal phenomena, or reality distortions.",
    "gmNotes": "Private GM notes, plot hooks, secrets, or usage reminders."
  }
]
```

## Required Fields

- **name**: The location's name (string)
- **description**: Description of appearance, atmosphere, and features (string)

## Optional Fields

- **id**: Unique identifier (auto-generated if not provided)
- **address**: Physical address or location details (string)
- **npcs**: Array of NPC objects with full NPC data (see NPCS_README.md)
- **enemies**: Array of enemy/creature objects with full bestiary data (see BESTIARY_README.md)
- **artefacts**: Array of artefact objects with full artefact data (see ARTEFACTS_README.md)
- **leitners**: Array of book objects with full book data (see LEITNERS_README.md)
- **equipment**: General items available at the location (string with `\n` line breaks)
- **supernatural**: Entity influence and paranormal phenomena present (string)
- **gmNotes**: Private notes for the GM (string)

## Simplified Format

For simpler locations, you can use a lightweight format with just names and locations:

```json
[
  {
    "name": "Abandoned Warehouse",
    "address": "47 Industrial Road",
    "description": "A rusted metal structure with broken windows and a collapsed roof section.",
    "npcs": [
      {
        "name": "Homeless Man",
        "location": "Sleeping in the corner"
      }
    ],
    "enemies": [
      {
        "name": "Flesh Hound",
        "location": "Basement, behind the locked door"
      }
    ],
    "artefacts": [
      {
        "name": "Blood-Stained Mirror",
        "location": "Propped against the far wall"
      }
    ],
    "equipment": "- Rusty tools\n- Old shipping crates\n- Emergency flares",
    "supernatural": "The building is watched by The Flesh. Anyone who stays overnight begins to hear wet, slithering sounds in the walls.",
    "gmNotes": "Use this as a quick encounter when the party is traveling. The mirror is a red herring."
  }
]
```

## Full Format with Complete Data

When using the full format, NPCs, enemies, artefacts, and books include their complete data objects:

```json
{
  "npcs": [
    {
      "id": 1766697719928,
      "name": "Dr. Evelyn Harrow",
      "data": {
        "id": 1766697719928,
        "name": "Dr. Evelyn Harrow",
        "level": 7,
        "health": 24,
        "damage": "Moderate",
        "affiliation": "The Whitmore Foundation",
        "description": "Full NPC description...",
        "entity": ["The Hunt"],
        "abilities": "Full ability descriptions...",
        "gmNotes": "Full GM notes...",
        "role": "Director"
      }
    }
  ]
}
```

## Importing JSON

1. Click the **"📤 Import JSON"** button in the Locations tab
2. Select your JSON file
3. Choose to either:
   - **Merge** with existing locations (adds new ones)
   - **Replace** all existing locations

## Exporting JSON

1. Click the **"💾 Export JSON"** button
2. Your locations will download as a dated JSON file
3. Share with other GMs or keep as backup

## Example Complete Entry

```json
[
  {
    "id": 1766697074391,
    "name": "The Whitmore Foundation",
    "address": "Corner of Whitmore Street and Stout Street, Wellington, New Zealand",
    "description": "A worn sandstone Neo-Renaissance building in the centre of the Wellington CBD. The vibrant cafe and tourist trap conceal the secretive esoteric organisation housed inside.",
    "npcs": [
      {
        "id": 1766697719928,
        "name": "Dr. Evelyn Harrow",
        "data": {
          "id": 1766697719928,
          "name": "Dr. Evelyn Harrow",
          "level": 7,
          "health": 24,
          "affiliation": "The Whitmore Foundation",
          "description": "Director of the Foundation, Hunt-aligned veteran investigator.",
          "entity": ["The Hunt"],
          "abilities": "Seasoned Hunter, Prepared Always, Cold Authority",
          "role": "Director of the Whitmore Foundation"
        }
      }
    ],
    "enemies": [],
    "artefacts": [],
    "leitners": [],
    "equipment": "- Security keycards\n- Research equipment\n- Historical records\n- Containment materials\n- Emergency supplies",
    "supernatural": "The building itself is mundane, but the artefacts and books stored in its vaults carry traces of multiple Entities. Protective wards prevent most manifestations, but staff report occasional dreams of being watched.",
    "gmNotes": "This is the party's home base. Use NPCs here to provide information, resources, and mission briefings. The Foundation's resources are extensive but not infinite."
  }
]
```

## Tips

### Structure and Organization

- Use locations to organize your campaign's key sites
- Group related NPCs, enemies, and items together geographically
- Include both major hubs and one-off encounter locations

### Description Writing

- Include sensory details: sights, sounds, smells, atmosphere
- Mention architectural features and layout
- Note entry/exit points and important rooms
- Describe the location's history or current state

### NPCs and Enemies

- Use the **full format** for important, recurring characters with complete stats
- Use the **simplified format** for minor characters or one-off encounters
- Include "location" field in simplified format to note where they're found

### Equipment

- List mundane items players might search for
- Include location-specific tools or resources
- Note any valuable or plot-relevant items
- Use `\n` for line breaks between items

### Supernatural Field

- Describe Entity influence or alignment
- Note any ongoing paranormal effects
- Mention reality distortions or manifestations
- Include mechanical effects if applicable (stress, defense rolls, etc.)

### GM Notes

- Plot hooks and encounter ideas
- Secrets not immediately obvious to players
- Timing suggestions or prerequisites
- Connections to other locations or plot threads
- Alternative uses for the location

## Location Design Philosophy

**Purpose**: Every location should serve a clear purpose - investigation site, encounter arena, safe haven, social hub, or story revelation point.

**Atmosphere**: Use description and supernatural elements to create memorable, distinctive locations that reflect their Entity alignment or history.

**Resources**: Balance what players can find (equipment, information, allies) against risks (enemies, artefacts, environmental hazards).

**Interconnection**: Consider how locations connect to each other, creating a web of places that form your campaign's geography.

**Flexibility**: Design locations that can serve multiple purposes - today's safe house could become tomorrow's investigation site.

## Common Location Types

### Safe Havens

- Player headquarters or home base
- Friendly organizations
- Neutral ground
- Include helpful NPCs and resources

### Investigation Sites

- Crime scenes
- Haunted locations
- Entity manifestation points
- Include clues, environmental storytelling, minor encounters

### Encounter Arenas

- Enemy strongholds
- Ritual sites
- Dangerous territories
- Focus on enemies, artefacts, and tactical features

### Social Hubs

- Meeting places
- Information brokers
- Faction headquarters
- Emphasize NPCs and relationship opportunities

## Entity-Aligned Locations

Consider designing locations with specific Entity alignments:

- **The Buried**: Cramped spaces, underground, crushing atmosphere
- **The Corruption**: Decay, infestation, disease, unwanted life
- **The Dark**: Lightless places, sensory deprivation, fear of the unseen
- **The Desolation**: Burned ruins, ash, loss, emptiness
- **The End**: Morgues, hospitals, places of death and inevitability
- **The Eye**: Archives, libraries, places of observation and knowledge
- **The Flesh**: Butcheries, medical facilities, places of body horror
- **The Hunt**: Hunting grounds, chase routes, predator territories
- **The Lonely**: Isolated places, fog-shrouded areas, separation
- **The Slaughter**: Battlefields, riot zones, places of violence
- **The Spiral**: Impossible architecture, maze-like layouts, distorted perception
- **The Stranger**: Uncanny spaces, circuses, places of wrong familiarity
- **The Vast**: Open spaces, heights, places of overwhelming scale
- **The Web**: Manipulative spaces, libraries of forbidden knowledge, places of control

## Copyright Notice

This tool is designed for use with your own custom content. Do not include copyrighted material from published sourcebooks in your JSON files for distribution. Use official content only for personal, non-commercial gameplay.
