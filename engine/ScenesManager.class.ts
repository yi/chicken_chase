/**
 * User: Christopher
 * Date: 09/08/13 Time: 00:41
 */
///<reference path="../lib/pixi.d.ts" />
///<reference path="Scene.class.ts" />
///<reference path="../game/Bunny.Sprite.ts" />
///<reference path="../lib/greensock.d.ts" />
// Module
module com.cc {

    export class ScenesManager {
        private static scenes: any = {}; // should be hashmap but a JS object is fine too :)
        public static currentScene: Scene;
        public static renderer: PIXI.IRenderer;
        public static ratio:number = 1;
        public static defaultWidth: number;
        public static defaultHeight: number;
        public static width: number;
        public static height: number;
        private static stats:any;

        public static create(width: number, height: number) {

            this.stats = new Stats();
            this.stats.setMode(3);
            document.body.appendChild( this.stats.domElement );
            this.stats.domElement.style.position = "absolute";
            this.stats.domElement.style.top = "0px";

        if (ScenesManager.renderer) return this;

        ScenesManager.renderer = PIXI.autoDetectRenderer(width, height);
        document.body.appendChild(ScenesManager.renderer.view);
        requestAnimFrame(ScenesManager.loop);




        return this;
    }
        private static loop() {

            ScenesManager.stats.begin();
            requestAnimFrame(function () { ScenesManager.loop() });

            if (!currentScene || currentScene.isPaused()) return;
            currentScene.update();
            ScenesManager.renderer.render(currentScene);
            ScenesManager.stats.end();
        }

        public static createScene(id: string, TScene: new () => Scene = Scene): Scene {
            if (ScenesManager.scenes[id]) return undefined;



            var scene = new TScene();
            ScenesManager.scenes[id] = scene;
            return scene;
        }

        public static goToScene(id: string): bool {

            if (ScenesManager.scenes[id]) {
                if (ScenesManager.currentScene) ScenesManager.currentScene.pause();
                ScenesManager.currentScene = ScenesManager.scenes[id];
                ScenesManager.currentScene.resume();
                return true;
            }
            return false;
        }

        public static pause() {
            ScenesManager.currentScene.pause();
        }
        public static resume() {
            ScenesManager.currentScene.resume();
        }
    }

}
