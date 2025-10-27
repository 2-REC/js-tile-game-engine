/* engine.js */


export class Engine {

    // TODO: rename fields
    #main;
    #time_step;
    #time_delta;
    #time;
    #updated;
    #animation_frame_request;


    constructor(time_step, main) {
        this.#main = main;

        this.#time_step = time_step;
        this.#time_delta = 0;
        this.#time = undefined;

        this.#updated = false;
        this.#animation_frame_request = undefined;

    }

    start() {
        this.#time_delta = this.#time_step;
        this.#time = window.performance.now();
        this.#animation_frame_request = window.requestAnimationFrame((time) => { this.loop(time); });
    }

    stop() {
        window.cancelAnimationFrame(this.#animation_frame_request);
    }

    // TODO: FIX FPS!
    loop(time) {

        this.#animation_frame_request = window.requestAnimationFrame((time) => { this.loop(time); });

        this.#time_delta += (time - this.#time);
        this.#time = time;

// TODO: use? why 3?
        /* Don't allow three full frames to pass without an update.
                This is not ideal, but at least the user won't crash their cpu. */
        if (this.#time_delta >= this.#time_step * 3) {
            this.#time_delta = this.#time_step;
        }

        while (this.#time_delta >= this.#time_step) {
            this.#time_delta -= this.#time_step;
            this.#main.update(time);
            this.#updated = true;
        }

        if (this.#updated) {
            this.#updated = false;
            this.#main.render(time);
        }

    }

}
