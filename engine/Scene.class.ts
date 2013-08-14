/**
 * User: Christopher
 * Date: 09/08/13 Time: 00:41
 */
///<reference path="../lib/pixi.d.ts" />
// Module
module com.cc {

    export class Scene extends PIXI.Stage {
        private paused: bool = false;
        private updateCB = function () { };

        constructor() {
            super();
        }
        public onUpdate(updateCB: () => void ) {
            this.updateCB = updateCB;
        }

        public update() {
            this.updateCB();
        }
        public pause() {
            this.paused = true;
        }
        public resume() {

            this.paused = false;
        }
        public isPaused() {
            return this.paused;
        }

    }

}