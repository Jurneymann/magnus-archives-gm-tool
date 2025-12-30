# Leitner's Books JSON Format

## Overview

The Magnus Archives GM Tool allows you to create and manage cursed books from Jurgen Leitner's collection (or similar supernatural tomes). These books are dangerous sources of knowledge that can grant power at a terrible price.

**Note**: You don't need to write JSON files manually! Create books directly in the app using the interface, then export them as JSON files for backup or sharing. You can also download a template JSON file from within the app to see the correct format.

## JSON Structure

Each book in your JSON file should follow this structure:

```json
[
  {
    "name": "Book Title",
    "level": 5,
    "relatedEntity": ["The Entity Name"],
    "stress": {
      "amount": 3,
      "when": "Upon realizing the book's power; 1 with each use"
    },
    "description": "A detailed description of the book's physical appearance (binding, age, condition, language), its contents, and what happens when someone reads it. Include what defense rolls are required, what abilities or effects it grants or imposes, duration of effects, and any conditions for use.",
    "fear": "Describe the worst possible outcome or horrifying consequence of reading or possessing this book."
  }
]
```

## Required Fields

- **name**: The book's title (string)
- **description**: Full details of appearance, contents, and effects (string)

## Optional Fields

- **level**: Power level 1-10 (number, used for defense rolls)
- **relatedEntity**: Array of entity alignments (e.g., ["The Spiral", "The Eye"])
- **stress**: Object with `amount` (number) and `when` (string describing trigger)
- **fear**: Worst-case scenario or dire warning (string)

## Stress Object Format

The stress field uses a nested object:

```json
"stress": {
  "amount": 3,
  "when": "Upon reading the first page; 2 additional stress upon finishing the book"
}
```

- **amount**: How much stress is gained (number)
- **when**: When stress is triggered (string)

## Importing JSON

1. Click the **"📤 Import JSON"** button in the Leitner's Books tab
2. Select your JSON file
3. Choose to either:
   - **Merge** with existing books (adds new ones)
   - **Replace** all existing books

## Exporting JSON

1. Click the **"💾 Export JSON"** button
2. Your book collection will download as a dated JSON file
3. Share with other GMs or keep as backup

## Example Complete Entry

```json
[
  {
    "name": "Threads Within Threads: A Compendium of Hidden Hands",
    "level": 6,
    "relatedEntity": ["The Web"],
    "description": "A dense, footnoted volume purporting to catalogue conspiracy theories, secret societies, and unseen influences shaping global events. The text constantly cross-references itself, drawing connections between unrelated incidents, institutions, and individuals.\n\nWhen kept in its transparent containment unit, the book manifests small, pale spiders which rapidly spin webbing along the interior surfaces. Over time, the web arranges itself into symbols, diagrams, or short written messages — often answers to questions that were never spoken aloud.",
    "stress": {
      "amount": 1,
      "when": "Reading more than a single section in one sitting, or attempting to verify or act on information provided by the book."
    },
    "fear": "The reader becomes convinced they are acting independently, making clever connections and uncovering hidden truths — while in reality they are following a path carefully laid out for them. By the time the manipulation becomes apparent, their actions have already served someone else’s design.",
    "gmNotes": "The book never lies outright; it selectively frames truth, exaggerating coincidences and omitting context to guide conclusions.\n\nThe spiders’ web-messages may appear prophetic or responsive, but they are simply relaying wider information that The Web is aware of to influence receptive individuals.\n\nProlonged interaction increases the book’s influence: readers may begin seeing patterns elsewhere, even when the book is not present."
  }
]
```

## Tips

- **Level** typically ranges from 1-10 and determines defense difficulty
- Use **relatedEntity** to connect books to specific entities in your campaign
- **Stress triggers** should be clear and connected to reading or using the book
- **Description** should include:
  - Physical appearance (binding, cover, condition, age)
  - Language and readability
  - Contents and subject matter
  - What happens when read
  - Defense rolls required
  - Mechanical effects (abilities granted, compulsions imposed)
  - Duration and conditions
- **Fear** section should escalate stakes beyond immediate effects
- Consider long-term consequences for readers
- Books can grant knowledge, abilities, or compulsions

## Leitner Book Design Philosophy

**Knowledge as Corruption**: Reading should provide something valuable (information, abilities, insight) but at a cost to the reader's sanity or freedom.

**Temptation**: Make books tempting by offering real mechanical benefits or critical information, forcing players to weigh risks against rewards.

**Progressive Danger**: Consider escalating consequences for repeated reading or prolonged possession.

**Entity Themes**: Each book should reflect its entity's nature:

- **The Web**: Compulsions, manipulation, false choices
- **The Eye**: Forbidden knowledge, loss of ignorance
- **The Spiral**: Distorted perception, madness
- **The Stranger**: Identity loss, uncanny transformations
- **The Vast**: Insignificance, agoraphobia, scale

**Reading vs. Possession**: Some books are dangerous to read once; others corrupt through prolonged possession.

## Book Collections

You can organize books thematically:

- **Leitner's Original Collection**: Books touched by specific entities
- **Modern Cursed Texts**: Contemporary supernatural writings
- **Research Volumes**: Academic works with dangerous truths
- **Ritual Manuals**: Step-by-step guides to entity contact

## Copyright Notice

This tool is designed for use with your own custom content. Do not include copyrighted material from published sourcebooks in your JSON files for distribution. Use official content only for personal, non-commercial gameplay.
