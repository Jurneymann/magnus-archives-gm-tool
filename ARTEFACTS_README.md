# Artefacts JSON Format

## Overview

The Magnus Archives GM Tool allows you to create and manage supernatural artefacts as JSON files. Artefacts are cursed or entity-touched objects that players may discover, use, or attempt to destroy.

**Note**: You don't need to write JSON files manually! Create artefacts directly in the app using the interface, then export them as JSON files for backup or sharing. You can also download a template JSON file from within the app to see the correct format.

## JSON Structure

Each artefact in your JSON file should follow this structure:

```json
[
  {
    "name": "Artefact Name",
    "level": 5,
    "relatedEntity": ["The Entity Name"],
    "stress": {
      "amount": 3,
      "when": "Upon realizing the artefact's power; 1 with each use"
    },
    "description": "A detailed description of the artefact's appearance, physical properties, and how it functions. Include what happens when someone uses it, what defense rolls are required, duration of effects, and any conditions or limitations.",
    "fear": "Describe the worst possible outcome or horrifying consequence of using or possessing this artefact."
  }
]
```

## Required Fields

- **name**: The artefact's name (string)
- **description**: Full details of appearance and function (string)

## Optional Fields

- **level**: Power level 1-10 (number, used for defense rolls)
- **relatedEntity**: Array of entity alignments (e.g., ["The Buried", "The Dark"])
- **stress**: Object with `amount` (number) and `when` (string describing trigger)
- **fear**: Worst-case scenario or dire warning (string)

## Stress Object Format

The stress field uses a nested object:

```json
"stress": {
  "amount": 3,
  "when": "Upon realizing the artefact's power; 1 with each use"
}
```

- **amount**: How much stress is gained (number)
- **when**: When stress is triggered (string)

## Importing JSON

1. Click the **"📤 Import JSON"** button in the Artefacts tab
2. Select your JSON file
3. Choose to either:
   - **Merge** with existing artefacts (adds new ones)
   - **Replace** all existing artefacts

## Exporting JSON

1. Click the **"💾 Export JSON"** button
2. Your artefacts will download as a dated JSON file
3. Share with other GMs or keep as backup

## Example Complete Entry

```json
[
  {
    "name": "The Bone Turner's Flute",
    "level": 7,
    "relatedEntity": ["The Flesh"],
    "stress": {
      "amount": 4,
      "when": "Upon witnessing the flute's effect on a living creature; 2 additional stress if used on a person"
    },
    "description": "A yellowed bone flute carved with anatomical diagrams that seem to shift when not directly observed. When played (requires a difficulty 6 Intellect-based task), any living creature within immediate range must make a Might defense roll against the artefact's level. On failure, their bones begin to twist and reshape, causing 7 points of damage and inflicting the Debilitated condition for one hour. The effect is reversible if treated within 10 minutes with medical intervention and a difficulty 7 healing task. The flute cannot be played more than once per day without the player also suffering 5 points of damage.",
    "fear": "Prolonged possession of the flute causes the owner to hear phantom music in moments of stress. Each time they fail a defense roll, there is a cumulative 10% chance their bones will begin to reshape permanently, requiring immediate intervention to prevent becoming a twisted servant of The Flesh."
  }
]
```

## Tips

- **Level** typically ranges from 1-10 and determines defense difficulty
- Use **relatedEntity** to connect artefacts to your campaign's entities
- **Stress triggers** should be clear: when do players gain stress?
- **Description** should include:
  - Physical appearance
  - How to activate or use it
  - Defense rolls required
  - Mechanical effects (damage, conditions, duration)
  - Limitations or costs
- **Fear** section should escalate tension and create difficult choices
- Consider adding both immediate effects and long-term consequences
- Balance power with risk to prevent players from treating artefacts casually

## Artefact Design Philosophy

**Power vs. Cost**: Artefacts should tempt players but come with significant risks. The more powerful the effect, the greater the stress or consequence.

**Entity Alignment**: Connect artefacts to specific entities to reinforce themes and create recurring patterns in your campaign.

**Mechanical Clarity**: Be specific about defense rolls, damage amounts, and durations so the GM doesn't need to improvise during play.

**Fear Factor**: The "fear" field should make players think twice about keeping or using the artefact, adding tension beyond mechanical effects.

## Copyright Notice

This tool is designed for use with your own custom content. Do not include copyrighted material from published sourcebooks in your JSON files for distribution. Use official content only for personal, non-commercial gameplay.
