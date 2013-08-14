/**
 * User: Christopher
 * Date: 09/08/13 Time: 04:59
 *

module com.cc {

    export class Main {
        constructor() {
        }
        public  create() {
            console.log("blah")
        }
    }
}
 */
    ///<reference path="../lib/pixi.d.ts" />
    ///<reference path="../engine/Keyboard.class.ts" />
module com.cc {

    export class Hero extends PIXI.DisplayObjectContainer{

        private  bunny:PIXI.Sprite;
        private  rocket:PIXI.Sprite;
        private  _heroSprite:PIXI.Sprite;
        private blah:String;
        public  dragging:bool;

        private yVel:Number = 0;
        private gravity:Number = 0.1;
        private isJumping:bool = true;
        private boost:Number = 0;
        private count:Number = 0;
        private jumping:bool;

        public floorY:Number;

        private light1:PIXI.Sprite;
        private light2:PIXI.Sprite;

        private keyboard:com.cc.Keyboard;

        constructor(){
            super();
            console.log("Hero init");
            this.bunny = PIXI.Sprite.fromImage("img/bunny.png");
            this.rocket = PIXI.Sprite.fromImage("img/rocket.png");
            // center the sprites anchor point
            this.bunny.anchor.x = 0.5;
            this.bunny.anchor.y = 1;
            // move the sprite t the center of the screen
            this.bunny.position.x = 0;
            this.bunny.position.y = 0;
            this.addChild(this.bunny);
            //this.bunny.visible = false;

            this.rocket.anchor.x = 0.5;
            this.rocket.anchor.y = 0.5;
            // move the sprite t the center of the screen
             this.rocket.position.x = 350;
            this.rocket.position.y = -350;
            this.addChild(this.rocket);
            this._heroSprite = this.rocket;
            this.blah = "blah blah";
            this.jumping = false;
            this.keyboard = new com.cc.Keyboard;
            this.floorY = 300;


            this.light2 = PIXI.Sprite.fromImage("img/LightRotate2.png");
            this.light2.anchor.x = 0.5;
            this.light2.anchor.y = 0.5;
            this.addChild( this.light2);
            this.light2.width = 300;
            this.light2.height= 300;
            this.light2.alpha = 0.1;

            this.light1 = PIXI.Sprite.fromImage("img/LightRotate1.png");
            this.light1.anchor.x = 0.5;
            this.light1.anchor.y = 0.5;
            this.light1.width = 300;
            this.light1.height= 300;
            this.light1.alpha = 0.2;
            this.addChild(this.light1);


        }
        public  create() {
            console.log(this.blah)
        }

        public switch(){
            this.rocket.visible = !this.rocket.visible;
            this.bunny.visible = !this.rocket.visible;
        }

        public update() {

            this.yVel += this.gravity - this.boost;

            this.rocket.position.y += this.yVel;

            if(this.rocket.position.y+(this.rocket.height/2) > this.floorY) {
                this.jumping = false;
                this.yVel = 0;
                this.rocket.position.y =  this.floorY - this.rocket.height/2;
            }

            this.light1.position.x = this.rocket.position.x;
            this.light1.position.y = this.rocket.position.y;
            this.light2.position.x = this.rocket.position.x;
            this.light2.position.y = this.rocket.position.y;

            this.light1.rotation+=0.02;
            this.light2.rotation+=0.04;

            this.checkKeyboard();
        }
        public boostup() {
            this.boost=7;
           /*
            if(this.boost<0.5) {
                this.boost+=0.02;
            }
            */
        }
        public boostdown() {
            if(this.boost>0){
                this.boost-=2;
            }
        }
        private checkKeyboard() {

            if(this.keyboard.isDown(32) && !this.jumping){
           // if(this.keyboard.isDown(32)){
                this.jumping=true;
                this.boostup();
            } else {

                this.boostdown();
            }
        }

        public uiJump() {
            this.jumping=true;
            this.boostup();
        }

        public jump() {
            //this._heroSprite.position.y = 200;
        }

        get heroSprite(){
            return this._heroSprite;
        }


    }
}