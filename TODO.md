# TODO

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
