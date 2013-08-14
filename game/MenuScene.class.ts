///<reference path="../engine/ScenesManager.class.ts" />
///<reference path="../engine/Scene.class.ts" />
///<reference path="../lib/pixi.d.ts" />
module com.cc {
module com.cc {
    // Class
    export class MenuScene extends Scene {

        private button: PIXI.Sprite;
        private bunny: PIXI.Sprite;
        private textureButton: PIXI.Texture;
        private textureButtonDown: PIXI.Texture;
        private textureButtonOver: PIXI.Texture;
        constructor() {
            super();
            this.setBackgroundColor(0xffffff);

            this.bunny = PIXI.Sprite.fromImage("img/bunny.png");
            // center the sprites anchor point

            this.bunny.anchor.x = 0.5;
            this.bunny.anchor.y = 0.5;
            // move the sprite t the center of the screen
            this.bunny.position.x = 50;
            this.bunny.position.y = 50;

            this.addChild(this.bunny);



        }


        public update() {
            super.update();
            this.bunny.rotation += 0.1;
        }

    }

}