/**
 * User: Christopher
 * Date: 15/08/13 Time: 03:15
 */
///<reference path="../lib/pixi.d.ts" />
module com.cc {

    export class Assets {

        public explosionTextures = [];
        public wheelTextures = [];
        public runnerTextures = [];

        constructor() {

            var suffix = "";
            for (var i=0; i < 30; i++)
            {

                if(i<9) {
                    suffix = "0"+(i+1);

                }   else {
                    suffix = (i+1);
                }
                //console.log(suffix);
                var texture = PIXI.Texture.fromFrame("jumper_00" + suffix + ".png");
                this.explosionTextures.push(texture);

                //var wtexture = PIXI.Texture.fromFrame("circ00" + suffix + ".png");
                var rtexture = PIXI.Texture.fromFrame("runner_00" + suffix + ".png");

               // this.wheelTextures.push(wtexture);
                this.runnerTextures.push(rtexture);
            }

            console.log("assets ready");
        }

    }
}
