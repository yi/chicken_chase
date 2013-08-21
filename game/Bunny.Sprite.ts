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

        public yVel:number = 0;
        private gravity:Number = 300;
        private isJumping:bool = true;
        private boost:Number = 500;
        private count:Number = 0;
        public jumping:bool;
        public falling:bool;

        public floorY:Number;

        private light1:PIXI.Sprite;
        private light2:PIXI.Sprite;

        private keyboard:com.cc.Keyboard;

        private mc_running:PIXI.MovieClip;
        private mc_jumping:PIXI.MovieClip;
        private mc_current:PIXI.MovieClip;

        constructor(){
            super();
            console.log("Hero init");
            this.bunny = PIXI.Sprite.fromImage("img/chicken_torso.png");
            this.rocket = PIXI.Sprite.fromImage("img/chicken_torso.png");
            //this.rocket.visible=false;
            // center the sprites anchor point
            this.bunny.anchor.x = 0.5;
            this.bunny.anchor.y = 1;
            // move the sprite t the center of the screen
            this.bunny.position.x = 0;
            this.bunny.position.y = 0;
            this.addChild(this.bunny);
            //this.bunny.visible = false;


            this.rocket.anchor.x = 0.45;
            this.rocket.anchor.y = 0.8;
            // move the sprite t the center of the screen
            this.rocket.position.x = 350;
            this.rocket.position.y = 100;

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

            var assets = new com.cc.Assets();

            this.mc_running = new PIXI.MovieClip(assets.runnerTextures);
            var mc_running = this.mc_running
            this.addChild(mc_running);
            mc_running.play();
            mc_running.scaleX=1;
            mc_running.scaleY=1;
            mc_running.anchor.x = 0.5;
            mc_running.anchor.y = 0.5;
            mc_running.position.x =  0;
            mc_running.position.y =  0;
            mc_running.animationSpeed=0.5;

            this.mc_jumping = new PIXI.MovieClip(assets.explosionTextures);
            var mc_jumping = this.mc_jumping;
            this.addChild(mc_jumping);
            mc_jumping.play();
            mc_jumping.scaleX=1;
            mc_jumping.scaleY=1;
            mc_jumping.anchor.x = 0.5;
            mc_jumping.anchor.y = 0.5;
            mc_jumping.position.x =  0;
            mc_jumping.position.y =  0;
            mc_jumping.animationSpeed=0.5;
            mc_jumping.loop = false;
            this.mc_current = mc_running;
            this.addChild(this.rocket);

            this.configKeyboard();

        }

        private configKeyboard() {

            this.keyboard.keyboardSignal.add( this.onKeyboard, this );
        }

        private keyTimeOut:any;
        private longJump:bool=false;


        private onKeyboard(type,code) {
            console.log("------------------------ "+code);
            switch(type) {
                case com.cc.Keyboard.KEYBOARD_DOWN:
                    if(code==32){
                        this.keyTimeOut = setTimeout( () => this.onJump(true), 50);
                    }
                    break;
                case com.cc.Keyboard.KEYBOARD_UP:
                    if(code==32){
                        this.onJump(false);
                        clearTimeout(this.keyTimeOut);

                    }
                    break;
            }
        }

        public onJump(longJump:bool=false) {
            console.log("------------------------");

            if( (!(this.yVel>0.1)) && !this.jumping ){
                if(longJump  ){
                    this.boost=500;
                }   else {
                    this.boost=300;
                }
                this.yVel = -this.boost;
                this.jumping=true;
            }
        }


        private  create() {

        }

        public switch(){
            this.rocket.visible = !this.rocket.visible;
            this.bunny.visible = !this.rocket.visible;
        }

        public update(gameSpeed, delta) {


            if(!(delta>0)) {
                delta = 0;
            } else {

            }
            delta = delta*2;

            this.yVel += (this.gravity * delta)*3;


            this.rocket.position.y += this.yVel * delta;

            if(this.rocket.position.y+(this.rocket.height/2) > this.floorY) {
                this.jumping = false;
                this.yVel = 0;
                this.rocket.position.y =  this.floorY - this.rocket.height/2;
            }

            this.light1.position.x = this.rocket.position.x;
            this.light1.position.y = this.rocket.position.y;
            this.light2.position.x = this.rocket.position.x;
            this.light2.position.y = this.rocket.position.y;

            this.mc_running.position.x = this.rocket.position.x;
            this.mc_running.position.y = this.rocket.position.y;
            this.mc_jumping.position.x = this.rocket.position.x;
            this.mc_jumping.position.y = this.rocket.position.y;

            this.light1.rotation+=0.02;
            this.light2.rotation+=0.04;

            this.mc_current.animationSpeed = gameSpeed/7;
            this.checkKeyboard();

            if(this.jumping) {
                this.mc_running.stop();
                this.mc_running.visible = false;
                this.mc_jumping.play();
                this.mc_jumping.visible = true;
                this.mc_current = this.mc_jumping;
            } else {
                this.mc_running.play();
                this.mc_running.visible = true;
                this.mc_jumping.stop();
                this.mc_jumping.visible = false;
                this.mc_current = this.mc_running;
            }
        }
        public boostup() {
            //this.boost=4;
           /*
            if(this.boost<0.5) {
                this.boost+=0.02;
            }
            */
        }
        public boostdown() {
            if(this.boost>0){
                this.boost-=1;
            }
        }
        private checkKeyboard() {

            if(this.keyboard.isDown(32) && !this.jumping && (!(this.yVel>0.1))){


               // this.jumping=true;
               // this.mc_jumping.gotoAndPlay(0);
               // this.boostup();
            } else {

               // this.boostdown();
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