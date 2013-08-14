///<reference path="../engine/ScenesManager.class.ts" />
///<reference path="../engine/Scene.class.ts" />
///<reference path="../lib/pixi.d.ts" />
module com.cc {
    // Class
    export class IntroScene extends Scene {

        private logo: PIXI.Sprite;

        constructor() {
            super();
            this.setBackgroundColor(0xffffff);

            this.logo = PIXI.Sprite.fromImage("img/logo.png");
            this.addChild(this.logo);

            this.logo.scale.x = ScenesManager.defaultWidth/250;
            this.logo.scale.y = this.logo.scale.x;

            this.logo.anchor.x = 0.5;
            this.logo.anchor.y = 0.5;
            this.logo.alpha = 0;

            // move the sprite to the center of the screen
            this.logo.position.x = ScenesManager.defaultWidth / 2;
            this.logo.position.y = ScenesManager.defaultHeight /2;

        }

        public update() {
            super.update();
            if (this.logo.alpha < 1) this.logo.alpha += 0.01;
            else ScenesManager.goToScene('menu');
        }
    }

}