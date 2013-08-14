/**
 * User: Christopher
 * Date: 10/08/13 Time: 09:01
 */
///<reference path="../lib/pixi.d.ts" />
module com.cc {

    export class Background extends PIXI.DisplayObjectContainer {

        private texture:PIXI.Texture;
        private skytexture:PIXI.Texture;
        private skyTile:PIXI.TilingSprite;
        private tilingSprite:PIXI.TilingSprite;

        constructor(){
            super();

            var texture = PIXI.Texture.fromImage("img/tiletexture.png");
            var skytexture = PIXI.Texture.fromImage("img/bggrass.jpg");

            this.skyTile = new PIXI.TilingSprite(skytexture, window.innerWidth, window.innerHeight)
            this.addChild(this.skyTile);
            this.skyTile.position.y = 0;
            this.tilingSprite = new PIXI.TilingSprite(texture, window.innerWidth, window.innerHeight)
            this.addChild(this.tilingSprite);
            this.tilingSprite.position.y = 150;
        }

        public update(delta) {

          //  this.tilingSprite.tilePosition.x -= delta*20;
           // this.tilePosition.x -= delta*10;

            this.tilingSprite.tilePosition.x -= delta*200;
            this.skyTile.tilePosition.x -= delta*40;
        }

    }


}
