# Changelog

All notable changes to The Magnus Archives GM Tool will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Version 2.0.0] - 2026-01-13

### ⏰ In-Game Time Tracker - NEW FEATURE

Keep track of in-game time with a persistent clock that stays visible on all tabs.

#### Features

- **Always visible display**: Clock icon (🕐) in the header shows current in-game time and date
- **Quick time advances**: Fast-forward time with one click
  - +10 minutes, +30 minutes, +1 hour, +10 hours, or +1 day
  - Aligned with recovery roll time periods from the rulebook
- **Detailed time editor**: Click the display to manually set exact date and time
  - Automatically handles leap years and correct days per month
  - Changes save automatically
- **Horror Mode themed**: Changes from green to red when Horror Mode is active
- **Persistent**: Your in-game time is saved even when you close the browser

---

### 🗺️ Battle Map System - NEW FEATURE

A complete visual tactical combat system to enhance your game sessions.

#### Core Battle Map Features

- **Grid-based tactical map** with adjustable size (5-50 meters)
- **Drag-and-drop combatant tokens** to move characters around
- **Multiple layers** for different floors or separate areas
- **2D and Isometric views** for different perspectives
- **Custom background images** to use your own pre-made maps
- **Zoom controls** (50%-200%) for better visibility
- **Smooth animations**: Tokens glide smoothly to new positions and rotate naturally

#### Combatant Tokens

- **Color-coded**: Green (PCs), Blue (NPCs), Red (Enemies)
- **Default symbols**: 🎭 (Players), 👤 (NPCs), 💀 (Enemies)
- **Custom images**: Upload your own character portraits
- **Size options**: Medium (1×1), Large (2×2), Huge (3×3), Gargantuan (4×4)
- **Elevation tracking**: Mark if someone is flying, climbing, or underground
- **Facing arrows**: Show which direction characters are looking
- **Movement distance**: See how far you've moved a token while dragging it

#### Terrain Tools

- **🖐️ Move Tool**: Click and drag tokens to reposition them
- **🔄 Rotate Tool**: Change which way a character is facing
- **⬆️ Elevation Tool**: Adjust vertical position
- **📏 Measure Tool**: Measure distances between any two points
- **Terrain Brushes**: Paint different terrain types
  - 🧱 Walls (gray) - Impassable barriers
  - 🪑 Furniture (brown) - Obstacles
  - 🌳 Landscape (green) - Scenery
  - 💧 Water (blue) - Water areas
  - ⚠️ Difficult Terrain (orange) - Harder to move through
- **🗑️ Erase Tool**: Remove terrain

#### Dynamic Lighting

- **Place light sources** anywhere on the map
- **Adjustable radius** (1-15 squares) and colors
- **Light intensity** control (0-100%)
- **Realistic shadows**:
  - Walls completely block light
  - Furniture partially blocks light (50%)
  - Landscape minimally blocks light (30%)
- **Fog transparency**: Control how much lights reveal fogged areas
- **Enhanced terrain visibility**: Borders and textures make terrain stand out

#### Fog of War

- **Line of Sight mode**: Only see what PCs can currently see
- **Exploration mode**: Permanently reveal areas as they're explored
- **Adjustable vision distance** (1-20 squares)
- **Enemy glimpses**: Enemies are slightly visible in lit but fogged areas

#### Area of Effect Templates

- **Circle template**: Standard blast radius
- **Cone template**: Directional attacks (60° arc)
- **Line template**: Beam attacks (5 sq width)
- **Square template**: Area attacks
- **Adjustable size and rotation** for all templates
- **Semi-transparent overlays** for clear visibility

#### Movement & Grid Options

- **Three snap modes**: Full square, half square, free movement
- **Two snap types**: Center snapping or corner snapping
- **Distance overlay**: Shows squares moved during drag operations
- **Precise positioning** with visual grid feedback
- **Animated token movement**

#### Map Management

- **Save Map**: Export complete map configuration as JSON (includes combatants, terrain, lights, layers)
- **Load Map**: Import saved map presets
- **Clear functions**:
  - Clear all terrain (keep combatants)
  - Clear all lights
  - Clear background image
- **Layer management**: Create, rename, delete, and switch between layers

#### Keyboard Navigation

- **Tool shortcuts**: 1-9 for quick tool selection
- **Zoom controls**: Z (zoom in), X (zoom out), R (reset)
- **View toggles**: N (names), F (facing), V (view mode)
- **Token controls**: Arrow keys for precise movement, +/- for rotation
- **Delete key**: Remove selected tokens or terrain

#### Player View Window

- **Dedicated player display**: Separate browser window for player screen
- **Fog of war rendering**: Shows only what players can see
- **Auto-sync**: Updates in real-time with GM map changes
- **Clean interface**: Removes GM-only controls and information

---

### 🎭 Horror Mode - NEW FEATURE

A comprehensive alternative theme system for running horror-focused campaigns.

#### Horror Mode Interface

- **Toggle button**: Persistent skull icon (☠) button below tab navigation
- **Animated activation**: Pulsing effects when Horror Mode is active
- **Dramatic header**: Replaces standard header image with Horror Mode banner
  - "THE MAGNUS ARCHIVES" title in large crimson text
  - "HORROR MODE" subtitle with blood-red styling
  - Integrated horror level controls (+/- buttons)
  - Animated pulsing red glow effects

#### Horror Level System

- **10 levels of horror intensity** (Level 1-10)
- **Visual level indicator**: Displayed prominently in Horror Mode banner
- **Quick increment/decrement**: +/- buttons for easy adjustment
- **Level persistence**: Saved with campaign data
- **GM tool for atmosphere**: Track escalating horror throughout sessions

#### Comprehensive Theme System

- **Complete color transformation**: All green UI elements become red
- **Dynamic theme switching**: Instant visual feedback when toggled
- **Multi-layer CSS overrides**: Affects all interface elements
  - Headers and titles (h1, h2, h3)
  - Section containers and borders
  - Tab navigation and active indicators
  - Toolbar borders and panels
  - Card glows (Player, NPC, Artefact, Leitner, Bestiary, Location, Save/Load)
  - Dashboard cards and generator cards
  - Combat tracker elements
  - Input fields and form controls
  - Buttons and interactive elements
  - Progress bars and stat displays
  - Scrollbars and tooltips
  - Table headers and borders
  - Shimmer animations and glow effects

#### Color Scheme

- **Primary Red**: #ff0000 (replaces #4caf50 green)
- **Dark Red**: #8b0000 (replaces #317e30 dark green)
- **Light Red**: #ff6b6b (replaces #66bb6a light green)
- **Red Glows**: rgba(255, 0, 0, X) and rgba(139, 0, 0, X)

#### JavaScript Integration

- **Dynamic color helper**: `getThemeColor()` function in global.js
- **Theme-aware rendering**: Reference tables, toolbar, and dashboard adapt colors
- **Persistent state**: Horror Mode state saved to localStorage and campaign files
- **Automatic restoration**: Horror Mode settings restored on page load

#### Visual Effects

- **Animated banner pulse**: Subtle breathing effect on Horror Mode header
- **Enhanced shadows**: Deeper, more dramatic red glows and shadows
- **Gradient backgrounds**: Dark red gradients throughout interface
- **Smooth transitions**: All color changes animate smoothly

---

### 🔧 Technical Improvements

#### Save/Load System

- **Horror Mode persistence**: Horror Mode state and level saved with campaigns
- **Battle Map support**: Map configurations saved in campaign data
- **Extended data structure**: Compatible with previous versions while adding new features

#### JavaScript Organization

- **battle-map.js**: Complete battle map system (new file)
- **combat.js enhancements**: Horror Mode functions and state management
- **global.js additions**: Theme color helper function

#### CSS Architecture

- **gm-tools.css additions**: Battle map styling and Horror Mode overrides
- **save-load.css additions**: Horror Mode support for save/load interface
- **tabs.css additions**: Horror Mode tab styling
- **toolbar.css additions**: Horror Mode toolbar and panel styling
- **base.css additions**: Core Horror Mode theme variables

#### Performance

- **Optimized rendering**: Battle map canvas optimizations for smooth drag operations
- **Efficient fog calculation**: Line of sight algorithm optimized for large maps
- **Responsive zoom**: Smooth scaling with minimal performance impact

---

### 📚 Documentation

#### New Documentation Files

- **BATTLE_MAP_README.md**: Complete battle map system documentation
- **BATTLE_MAP_QUICK_START.md**: Quick start guide for battle map features
- **BATTLE_MAP_IMPLEMENTATION.md**: Technical implementation details
- **CHANGELOG.md**: This file

#### Updated Documentation

- **README.md**: Updated with battle map and Horror Mode feature descriptions

---

### 🎨 User Experience

#### Visual Improvements

- **Consistent theming**: Horror Mode provides cohesive alternative aesthetic
- **Enhanced feedback**: Better visual indicators for interactive elements
- **Improved spacing**: Horror Mode banner matches standard header dimensions
- **Smooth animations**: All theme transitions are animated

#### Accessibility

- **Keyboard shortcuts**: Extensive keyboard support for battle map
- **Clear icons**: Unicode symbols and emoji for easy recognition
- **Hover feedback**: All interactive elements show hover states
- **Visual contrast**: Both normal and Horror Mode maintain good contrast ratios

---

## [Version 1.0.0] - Initial Release

### Core Features

- **Dashboard**: Campaign overview and quick stats
- **Party Management**: Full player character tracking
- **NPC System**: Custom NPC creation and management
- **Combat Tracker**: Initiative tracking with three phases
- **Bestiary**: Custom enemy/creature database
- **Artefacts**: Supernatural item tracking
- **Leitner Books**: Cursed book management
- **Locations**: World building and location tracking
- **Reference Tables**: Difficulty, stress, damage, and special rolls
- **Save/Load System**: JSON-based campaign import/export
- **Autosave**: Automatic localStorage backup every 10 minutes
- **Session Notes**: Roll history and session tracking
- **Character Import**: Import character sheets from JSON

---

## Future Planned Features

- **Battle Map Enhancements**:

  - Weather and environmental effects
  - More terrain types (lava, ice, etc.)

- **Horror Mode Enhancements**:

  - Custom horror level effects/descriptions

- **General Features**:
  - Random NPC generator
  - Random location generator
  - Printable character sheets
  - Cloud save support
  - Multi-user collaboration

---

## Credits

**Created by**: [Jurneymann](https://github.com/Jurneymann)
**Please support me if you can at**: [https://buymeacoffee.com/jurneymann](https://buymeacoffee.com/jurneymann)

**Based on**: [The Magnus Archives](https://rustyquill.com/the-magnus-archives/) by Jonathan Sims and Rusty Quill

**The Magnus Archives Roleplaying Game is required to use this application. The corebook and other items can be purchased from the Monte Cook Games website**: [The Magnus Archives Roleplaying Game](https://www.montecookgames.com/store/product/the-magnus-archives-roleplaying-game/) by Monte Cook Games

This is an unofficial fan-made tool and is not affiliated with, endorsed by, or sponsored by Rusty Quill or Monte Cook Games.
