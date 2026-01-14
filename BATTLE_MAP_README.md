# Battle Map System

## Overview

The Battle Map System provides comprehensive visual position tracking for combat encounters in the Magnus Archives GM Tool. It integrates seamlessly with the Combat Tracker to help Game Masters manage tactical positioning during fights, with support for dynamic lighting, fog of war, multi-layer maps, and full keyboard navigation.

## Core Features

### Grid-Based Map

- Each square represents 1 metre
- Configurable map size (5-50 metres in width and height)
- Visual grid with hover effects
- **Multiple layers** for ground floors, upper levels, and separate areas
- **2D and Isometric** view modes
- **Background images** for pre-made maps

### Combatant Tokens

- **Player Characters (🎭)**: Green tokens
- **NPCs (👤)**: Blue tokens
- **Enemies (💀)**: Red tokens
- **Individual naming**: Multiple enemies of the same type are automatically numbered ("Cultist 1", "Cultist 2", etc.) and can be renamed via Display Name field
- **Custom token images**: Upload your own character portraits
- **Expanded token emoji library**: 24 options for PCs, 24 for NPCs, 36 for enemies
- **Configurable sizes**: Medium (1×1), Large (2×2), Huge (3×3), Gargantuan (4×4)
- **Elevation indicators**: Track flying, climbing, or underground positions
- **Facing indicators**: Show which direction combatants are facing (enabled by default)
- **Smooth animations**: Tokens glide smoothly to new positions and rotate naturally
- **Live distance tracking**: See how far you've moved a token while dragging
- Click to select, drag to move, or use keyboard navigation

### Terrain Tools

- **🖐️ Move**: Select and move combatants
- **🔄 Rotate**: Change combatant facing direction
- **⬆️ Elevation**: Adjust vertical position (flying, climbing)
- **📏 Measure**: Measure distances between points
- **🧱 Wall**: Place impassable walls (gray)
- **🪑 Furniture**: Add furniture obstacles (brown)
- **🌳 Landscape**: Create scenery elements (green)
- **💧 Water**: Mark water areas (blue)
- **⚠️ Difficult**: Designate difficult terrain (orange)
- **🗑️ Erase**: Remove terrain

### Dynamic Lighting System

- **Place light sources** anywhere on the map
- **Adjustable radius** (1-15 squares)
- **Customizable colors** (torches, artificial lights, daylight)
- **Variable intensity** (0-100%)
- **Fog transparency control**: Lights can partially reveal fogged areas
- Lights interact with fog of war to create atmospheric effects

### Fog of War

- **Two modes**:
  - **Line of Sight**: See only what PCs can currently see
  - **Exploration**: Permanently reveal explored areas
- **Adjustable vision distance** (1-20 squares)
- **Light transparency slider**: Control how much lights reveal fogged areas
- **Player View integration**: Separate screen for players shows their view
- **Enemy/NPC glimpses**: Slightly visible in lit fogged areas for tactical awareness

### Area of Effect Templates

- **Circle**: Standard blast radius
- **Cone**: Directional weapons or supernatural abilities
- **Line**: Directional weapons
- **Square**: Falling objects or collapsing buildings
- **Adjustable size and rotation**
- **Visual templates** with semi-transparent overlays

### Multi-Layer Support

- **Create unlimited layers** for different floors or areas
- **Independent terrain and lighting** per layer
- **Easy layer switching** with labeled tabs
- **Rename and delete layers** as needed

### Grid & Movement Options

- **Snap modes**: Full square, half square, or free movement
- **Snap types**: Center or corner snapping
- **Distance display**: Show move distance when dragging
- **Drag-and-drop movement** with visual preview

### Map Controls

- **Zoom In/Out**: Scale the map from 50% to 200% (Z/X keys)
- **Reset Zoom**: Return to 100% view
- **Toggle Names**: Show/hide all combatant names
- **Toggle Facing**: Show/hide directional indicators
- **View Mode**: Switch between 2D and Isometric views
- **Clear Terrain**: Remove all terrain while keeping combatants
- **Clear Lights**: Remove all light sources
- **Clear Background**: Remove background image
- **Save Map**: Export current map as a JSON file (includes lights)
- **Load Map**: Import a saved map configuration

### Keyboard Navigation ⌨️

**Tool Selection:**

- **M** - Move tool
- **T** - Terrain tools (wall/furniture)
- **L** - Light placement tool
- **R** - Rotate tool
- **E** - Erase tool
- **A** - Area of Effect tool
- **F** - Toggle fog of war
- **G** - Toggle distance display

**Navigation:**

- **Arrow Keys** - Navigate grid / Move selected combatant
- **Space/Enter** - Select combatant or activate cell
- **Tab** - Cycle through combatants (Shift+Tab for reverse)

**Combatant Actions:**

- **1-4** - Set size (Medium/Large/Huge/Gargantuan)
- **+/-** - Adjust elevation
- **Delete** - Remove selected combatant from map

**View Controls:**

- **Z** - Zoom in
- **X** - Zoom out
- **Escape** - Cancel action / Deselect
- **?** - Show keyboard shortcuts help

### Player View

- **Separate window** for players (`player-view.html`)
- **Real-time sync** with GM's map
- **Smooth animations**: Tokens move and rotate fluidly for players
- **Zoom and pan**: Players can zoom in/out and scroll around large maps
- **Respects fog of war**: Players only see what their characters can see
- **No GM controls**: Clean view for immersion
- **Automatic updates**: Changes instantly reflect on player screen
- **Image caching**: Background images load smoothly without flickering

## How to Use

### Setting Up a Battle Map

1. **Open the Combat Tracker** tab
2. **Expand the Battle Map** section by clicking the header
3. **Configure Map Size**:
   - Set width and height in metres (e.g., 15m × 12m for a warehouse)
   - Map automatically adjusts to new dimensions
4. **Optional - Add layers** for multi-floor buildings or separate areas
5. **Optional - Upload background image** for pre-made maps

### Adding Terrain

1. **Select a terrain tool** (Wall, Furniture, etc.)
2. **Click on grid squares** to place terrain
3. **Click the same square again** to change terrain type
4. **Use the Erase tool** to remove terrain

### Setting Up Dynamic Lighting

1. **Click "Place Light"** in the Dynamic Lighting section
2. **Click on the map** where you want the light source
3. **Adjust settings**:
   - **Radius slider**: How far the light reaches (1-15 squares)
   - **Intensity slider**: Brightness of the light (0-100%)
   - **Color button**: Change light color (torch, magic, etc.)
4. **Click light indicators** on the map to remove individual lights
5. **Use "Clear All Lights"** to remove all light sources

### Configuring Fog of War

1. **Enable Fog of War** with the ON button
2. **Choose mode**:
   - **Line of Sight**: Only see what PCs currently see
   - **Exploration**: Permanently reveal explored areas
3. **Set Vision Distance**: How far PCs can see (in squares)
4. **Adjust Light Transparency**: How much lights reveal fogged areas (0-100%)
5. **Use with Player View** for immersive gameplay

### Managing Combatants

1. **Add combatants** through the Combat Tracker
2. **Combatants automatically appear** on the map
3. **Individual naming**: When adding multiple enemies of the same type, they are automatically numbered (e.g., "Cultist 1", "Cultist 2", "Cultist 3")
   - Edit the "Display Name" field in the Combat Tracker's expanded view to customize names
   - Custom names appear on both the GM battle map and player view
4. **Move combatants** using any method:
   - **Drag-and-drop**: Click and hold, drag to position, release
     - Distance indicator follows your cursor showing movement in metres and squares
     - Tokens smoothly glide to their new position
   - **Click-to-move**: Select Move tool, click combatant, click destination
   - **Keyboard**: Select with Tab, move with Arrow keys
5. **Rotate combatants**: Use Rotate tool or right-click token
   - Tokens smoothly rotate to face the new direction
6. **Set elevation**: Use Elevation tool or +/- keys
7. **Customize tokens**: Right-click token to change image or emoji (expanded library: 24 PC options, 24 NPC options, 36 enemy options)
8. **Adjust size**: Right-click token or use 1-4 keys (Medium/Large/Huge/Gargantuan)

### Using Area of Effect Templates

1. **Select AoE type** (Circle, Cone, Line, or Square)
2. **Adjust size/length** with slider
3. **For cones**: Adjust width slider
4. **Click "Place on Map"**
5. **Click target location** on map
6. **For cones**: Click again to set direction
7. **Use "Clear All"** to remove templates

### Measuring Distances

1. **Select the Measure tool** (📏)
2. **Click starting point** on the map
3. **Click ending point** to see distance
4. **Distance shows** in metres and squares
5. **Click again** to start new measurement

### Saving and Loading Maps

#### Save a Map Preset

1. Set up your map with terrain and lighting
2. Click **"💾 Save Map"**
3. Enter a name for the preset
4. Map downloads as a JSON file including:
   - Terrain placement
   - Light sources (positions, colors, radius, intensity)
   - Map dimensions
   - Background image (if any)

#### Load a Map Preset

1. Click **"📂 Load Map"**
2. Select a previously saved JSON file
3. Map terrain and lights load automatically
4. Existing combatant positions are preserved

### Using the Player View

1. **Open** `player-view.html` in a separate window/browser
2. **Position** on a second monitor or projector
3. **Players see** only what their characters can see
4. **GM controls** fog of war and lighting from main window
5. **Changes sync** automatically in real-time

### Working with Multiple Layers

1. **Create new layer**: Click "Add Layer" button
2. **Switch layers**: Click layer tab to make it active
3. **Rename layer**: Click "Rename" next to layer name
4. **Delete layer**: Click "Delete" (confirms before removing)
5. **Each layer has**:
   - Independent terrain
   - Independent lighting
   - Shared combatants (they can move between layers)

### Example Map

An example warehouse map (`battle-map-template.json`) is included in the `databases/` folder. Load this to see a pre-built encounter space with walls and furniture.

## Integration with Combat

- The battle map **automatically syncs** with the Combat Tracker
- Adding/removing combatants updates the map
- Ending combat **clears combatant positions** but preserves terrain
- Map state is **saved to browser storage** and persists between sessions

## Tips for Game Masters

### Quick Setup

- Keep a library of common map presets (taverns, streets, warehouses, etc.)
- Load appropriate map when setting up encounters
- Adjust size as needed for the specific scene
- Use layers for multi-story buildings or complex environments

### Dynamic Lighting Tips

- Place torches/lanterns held by PCs as light sources
- Use different colors for magical vs. mundane light
- Adjust intensity to simulate time of day or distance
- Combine with fog of war for dramatic reveals
- Light transparency at 60-80% works well for most scenarios

### Fog of War Best Practices

- **Line of Sight mode**: Best for dungeon crawling and tactical combat
- **Exploration mode**: Better for overland travel and large areas
- **Vision distance 5-7 squares**: Standard for most characters
- **Player View**: Have players watch their screen, not yours
- **Light sources**: PCs carrying lights reveal more area

### During Combat

- Use the Move tool or drag-and-drop to update positions
- Watch the live distance indicator to track movement range
- Smooth animations make token movements easy to follow
- Press Tab to quickly cycle through combatants
- Use keyboard shortcuts for faster operation
- Measure tool helps resolve movement and spell range questions
- AoE templates clarify who's affected by spells
- Elevation indicators track flying enemies and verticality
- Visual positioning helps with line of sight and cover questions
- Zoom in for detailed positioning, zoom out for overview

### Terrain Strategy

- **Walls**: Create rooms, hallways, and cover
- **Furniture**: Add tactical complexity with partial cover
- **Difficult Terrain**: Slow movement through cluttered areas
- **Water/Landscape**: Environmental hazards and flavor
- Use terrain to create chokepoints and tactical options

### Combatant Management

- **Right-click tokens** for quick customization menu
- **Custom images** make encounters more immersive
- **Size matters**: Large creatures take up more space
- **Facing arrows**: Track which direction enemies are looking
- **Elevation**: Track flying, climbing, or underground positions

### Performance

- Large maps (40×40+) may slow down on older devices
- Stick to necessary map size for best performance
- Too many lights can impact performance (10-15 is usually fine)
- Clear terrain and lights when no longer needed
- Use 2D view for better performance than isometric

## Map File Format

Maps are saved as JSON with the following structure:

```json
{
  "name": "Map Name",
  "width": 15,
  "height": 12,
  "terrain": [
    {
      "x": 3,
      "y": 4,
      "type": "wall",
      "color": "#666666"
    }
  ],
  "lights": [
    {
      "id": 1,
      "x": 7,
      "y": 6,
      "radius": 5,
      "color": "#ffeb3b",
      "intensity": 0.8
    }
  ],
  "backgroundImage": "data:image/png;base64,..."
}
```

### Terrain Types

- `wall`: Impassable barriers (Dark Gray #424242)
- `furniture`: Obstacles and cover (Dark Brown #6D4C41)
- `landscape`: Trees, rocks, scenery (Green #2E7D32)
- `water`: Water features (Blue #1976D2)
- `difficult`: Rough or cluttered ground (Yellow-Amber #F9A825)

### Light Properties

- `id`: Unique identifier
- `x`, `y`: Grid coordinates
- `radius`: Light reach in squares (1-15)
- `color`: Hex color code
- `intensity`: Brightness multiplier (0.0-1.0)

## Troubleshooting

### Map Not Showing

- Ensure the Battle Map section is expanded (click the header)
- Check that the Combat tab is active
- Try refreshing the page if the map appears blank

### Combatants Not Appearing

- Add combatants through the Combat Tracker first
- Check that combatants are within map boundaries
- Verify you're on the correct layer
- Check if fog of war is hiding them (disable temporarily)

### Lights Not Working

- Ensure lights are placed on the current active layer
- Check that light intensity is above 0%
- Verify fog of war light transparency is set above 0%
- Lights only affect fog, not regular visibility

### Player View Issues

- Ensure both windows are loading from the same location
- Check browser console for errors
- Verify fog of war is enabled for player restrictions
- Changes may take a moment to sync (usually instant)

### Keyboard Shortcuts Not Working

- Click on the battle map canvas to ensure it has focus
- Don't type shortcuts while in input fields
- Press **?** to view all available shortcuts
- Ensure the Battle Map tab is active

### Lost Positions

- Battle map state is saved to browser localStorage
- Clearing browser data will reset all maps
- Export important maps as JSON files for backup
- Each layer saves independently

### Performance Issues

- Reduce map size
- Limit number of light sources (10-15 max recommended)
- Use 2D view instead of isometric
- Clear unnecessary terrain
- Reduce number of active layers
- Close player view if not in use

### Fog of War Not Updating

- Click the map or move a combatant to refresh
- Check that fog mode is set correctly (Line of Sight vs Exploration)
- Verify vision distance is appropriate
- In Exploration mode, revealed areas stay revealed intentionally

## Accessibility Features

The Battle Map system includes comprehensive keyboard navigation and screen reader support:

- **Full keyboard control**: All features accessible without a mouse
- **Screen reader announcements**: Actions announced via ARIA live regions
- **Focus indicators**: Clear yellow highlight shows keyboard focus
- **Logical tab order**: Navigate through combatants with Tab key
- **Keyboard shortcuts**: Fast access to all tools and functions
- **ARIA labels**: Grid cells and controls have descriptive labels
- **Help overlay**: Press **?** to view all keyboard shortcuts

## Advanced Features

### Combatant Customization

- **Token Images**: Upload custom portraits or use emojis
- **Sizes**: Set to Medium, Large, Huge, or Gargantuan
- **Elevation**: Track height above/below ground level
- **Facing**: Show direction the combatant is looking
- **Right-click menu**: Quick access to all customization options

### Grid Snapping

- **Full Square**: Snap to center of squares (standard)
- **Half Square**: Snap to half-square increments (precise positioning)
- **Free Movement**: No snapping (complete freedom)
- **Center vs Corner**: Choose snapping reference point

### View Modes

- **2D View**: Top-down perspective (better performance)
- **Isometric View**: 3D-style angled view (more immersive) with proper perspective transformation for background images
- Both modes support all features equally
- Isometric view uses mathematical projection to warp background images to match grid perspective

## Known Limitations

- Large maps (50×50) may experience performance issues on older hardware
- Maximum 25 light sources recommended for optimal performance
- Fog of war calculations can be intensive on very large maps
- Isometric view requires more processing than 2D view
- Browser localStorage has size limits (~5-10MB typically)
- Background images encoded in JSON can create large files

## Version History

### Version 2.0 (January 2026)

- ✅ Added smooth token movement animations (0.4s transitions)
- ✅ Implemented smooth rotation animations for facing changes
- ✅ Added live distance tracking while dragging tokens
- ✅ Player view now features smooth interpolated animations
- ✅ Vision indicators (facing arrows) enabled by default
- ✅ Added dynamic lighting system with radius, color, and intensity controls
- ✅ Implemented fog of war with Line of Sight and Exploration modes
- ✅ Added light transparency for fog of war
- ✅ Full keyboard navigation with comprehensive shortcuts
- ✅ Screen reader support and accessibility features
- ✅ Multi-layer support for complex maps
- ✅ Isometric view mode
- ✅ Area of Effect templates (Circle, Cone, Line, Square)
- ✅ Custom token images and customization menu
- ✅ Token rotation and facing indicators
- ✅ Elevation tracking for vertical positioning
- ✅ Distance measurement tool
- ✅ Background image support
- ✅ Player view for separate display
- ✅ Grid snapping options (full/half/free)
- ✅ Combatant size options (Medium through Gargantuan)
- ✅ Drag-and-drop combatant movement
- ✅ Enemy/NPC visibility through lit fog areas

### Version 1.0 (Initial Release)

- Basic grid-based map
- Terrain placement tools
- Combatant token management
- Save/load functionality
- Combat tracker integration

## Support

For issues or feature requests, please contact the tool maintainer or submit an issue to the project repository.

---

**Battle Map System v2.0**  
_Part of the Magnus Archives GM Tool_  
_Updated: January 2026_
