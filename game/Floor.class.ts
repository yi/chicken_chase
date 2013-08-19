/**
 * User: Christopher
 * Date: 13/08/13 Time: 03:48
 */
    ///<reference path="../lib/pixi.d.ts" />
    ///<reference path="../engine/Keyboard.class.ts" />
 module com.cc {

    export class FloorItem extends  PIXI.DisplayObjectContainer{


        public floor = new PIXI.Graphics();
        public width:number;

          constructor(randomWidth, floorHeight = 300) {
              super();

              var floor = this.floor;
              floor = new PIXI.Graphics();
              floor.beginFill(0x333333);
              floor.lineStyle(0, 0xFF0000);


              floor.drawRect(0,0,randomWidth,floorHeight);
              floor.setInteractive(true);
              this.addChild(floor);

              this.width = randomWidth;
              floor.hitArea = new PIXI.Rectangle(0,0,randomWidth,10);
              floor.click = function(data){
                  console.log('hit rect');
              }

              floor.y=400;


              var skytexture = PIXI.Texture.fromImage("img/grass.png");

              var floorTile = new PIXI.TilingSprite(skytexture, randomWidth, floorHeight)
              this.addChild(floorTile);
              //floorTile.position.x = floor
          }
    }
}