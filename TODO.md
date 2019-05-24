# TODO

- GAME
  - [ ] Fix size problem: when changing size of tiles, the whole game breaks.
    => Due to hardcoded value, not depending on the tiles size (look for "SIZE-FACTOR" comments in code), and for "doors" in level files (JSON).
    (! - for doors, the x & y destination positions need to change depending on the tile size as well, but not proportionnally? (with size 64, adding(when at left of screen)/subtracting(when at right of screen) 32 seems ok)

- LEVELS
  => Do as in Replica:
  - [ ] Handle several visual layers (with z-index, speeds, etc.: background(s), foreground(s), overlay?)
  - [ ] Use binary files for layers
  - [ ] ! - But use JSON instead of XML
  - [ ] Handle more than 1 tileset
    => Different ones for each level, each object, etc.
  - [ ] Add fixed "objects" to level (similar to grass, but static, and as tiles)

- OBJECTS
  - [ ] Change objects handling
    => As in Replica (object layer with IDs)
  - [ ] Remove carrots stuff, and adapt levels/zones ...
  - [ ] Change grass to "graphical objects"
  - [ ] Doors
    - [ ] Use an "ID" for doors (determined by "HOTSPOT_DOOR + ID"), as well as a "destination ID" (-1 for default?)
      => When loading new zone/level, position player at door with "desitnation ID" (-1 for the "main" door)
      - [ ] Make sure to avoid "cycles" problems when positioning player in front of a door
        => Use a small offset.
    - [ ] Handle different types of doors:
      - [ ] Inter-level: loads a level
        => Door object (from Objects & Hotspots layers - as in Replica)
      - [ ] Intra-level: loads a zone (in same level)
        => 2 types:
          - [ ] "Normal" - as in Replica: Door object (from Objects & Hotspots layers)
          - [ ] "Passage" - as currently in engine: Zone (delimited by collision rectangle) (typically adjacent to an edge of the level)
            => Keep player's position when entering, and position player at same X or Y depending on the zone's position (side edge => keep Y, and use X of door ; top/bottom edge => keep X, and use Y of door)
  - [ ] ? - Make separate source files for objects? (classify?)
  - [ ] Add more object types ...

- ENGINE
- [ ] Fix tunnelling problem the right way (IT IS A COLLISION PROBLEM)
    => PROBLEM ALSO OCCURS AFTER "FIX", WHEN JUMPING FROM RIGHT TO LEFT THROUGH A "U" SHAPED TILE!
- [ ] Handle separate sheets for sprites and map (1 per object)
- [ ] Add more animation states
- [ ] Add loop handling for animations (stop at end or loop)
- [ ] Remove possibility to jump when falling!
- [ ] See if can easily handle worlds bigger than screen (scrolling)
    (then add parallax scrolling, etc.)
- [ ] Get parameters from configuration (file?)
    - velocity, friction, jump force, etc.
- [ ] Use PIXI.js for graphics/sprites
- [ ] main.js
    - [ ] resize function:
        - [ ] set "32" as a parameter (could want 0, or other value)
- [ ] Differentiate 2 types of controls, and set some "continuous" (such as "move"), others not ("jump").
    => Do the "active = false" stuff for non continuous.
    (could be useful for rapid fire for example)
- [ ] Add TOP/SIDE handling (from param?)
    - game.js
        - [ ] no Y friction when SIDE
        - [ ] don't add gravity when TOP
        - [ ] set Player's parameters when instantiating (not using all defaults...)
- [ ] Set buttons configurable (keyboard + gamepad?)

- [ ] Create resources
    - [ ] Tilesheets (& delete current "tilesheet.png"
    - [ ] Maps (use Tiled?)
