///<reference path="../engine/Scene.class.ts" />
///<reference path="../lib/pixi.d.ts" />
///<reference path="../lib/greensock.d.ts" />
///<reference path="../lib/Signal.js" />
///<reference path="../engine/ScenesManager.class.ts" />
///<reference path="../engine/Keyboard.class.ts" />
///<reference path="../engine/Background.class.ts" />
///<reference path="Bunny.Sprite.ts" />
///<reference path="Floor.class.ts" />
///<reference path="IntroScene.class.ts" />
module com.cc {

    // Class
    export class GameScene extends Scene {

        private bunny: PIXI.Sprite;
        private hero: Hero;
        private arr_enemies: Array;
        private keyboard:Keyboard;
        private bg:Background;
        private floor:FloorItem;
        private floorActive:FloorItem;
        public gameSpeed:number;
        private alive:bool;

        constructor() {
            super();

            // add a background
            this.bg = new Background();
            this.addChild(this.bg);

            //add a bunny :) 
            this.bunny = PIXI.Sprite.fromImage("img/bunny.png");
            // center the sprites anchor point

            this.bunny.anchor.x = 0.5;
            this.bunny.anchor.y = 0.5;
            // move the sprite t the center of the screen
            this.bunny.position.x = 50;
            this.bunny.position.y = 50;

            this.addChild(this.bunny);

            /**
             * Lets add a custom displayObject !!!!!!!
             *
             */

            this.hero = new Hero;
            var hero = this.hero;
            hero.position.x = 0;
            hero.position.y = 0;
            this.addChild(hero);
            hero.create();
            hero.heroSprite.setInteractive(true);
            hero.heroSprite.buttonMode = true;
           // hero.heroSprite.dragging = true;
            hero.heroSprite.mousedown = hero.heroSprite.touchstart = function(data)
            {
                console.log("click");
                this.data = data;
                this.alpha = 0.9;
                this.dragging = true;
            };
            hero.heroSprite.mouseup = hero.heroSprite.mouseupoutside = hero.heroSprite.touchend = hero.heroSprite.touchendoutside = function(data)
            {
                this.alpha = 1
                this.dragging = false;
                // set the interaction data to null
                this.data = null;
            };
            hero.heroSprite.mousemove = hero.heroSprite.touchmove = function(data)
            {
                if(this.dragging)
                {
                    // need to get parent coords..
                    var newPosition = this.data.getLocalPosition(this.parent);
                    this.position.x = newPosition.x;
                    this.position.y = newPosition.y;
                }
            }



            var _this = this;
            var button = new PIXI.Sprite(PIXI.Texture.fromImage("img/button.png"));
            button.position.x = 100;//ScenesManager.defaultWidth - 200;
            button.scale.x = 0.5;
            button.scale.y = 0.5;
            button.click = button.tap = function (data) {
                if (_this.isPaused()) return;
                //ScenesManager.goToScene('menu');
                //hero.switch();
                hero.uiJump();
            }
            button.setInteractive(true);
            this.addChild(button);

            this.setInteractive(true);

            this.createEnemies();

             this.gameSpeed = 5;


            /**
             * Add keyboard
             */
             this.keyboard = new Keyboard;
            this.keyboard.keyboardSignal.add(this.onKeyboard, this);

             this.createFloor(100);
             this.alive = true;
             //var int=self.setInterval(function(){clock()},1000);

            //var t = setInterval(() =>this.createFloor(100), 3200);
        }

        public onKeyboard(keyCode) {
           // console.log("keyCode: "+keyCode);

            switch (keyCode) {
                case 107:
                    this.gameSpeed++;
                    console.log("gamespeed: "+this.gameSpeed);
                    break;
                case 109:
                    this.gameSpeed--;
                    console.log("gamespeed: "+this.gameSpeed);
                    break;
            }
        }

        public resume() {
             super.resume();
             this.bunny.position.y = 50;
         }

        public update() {
            super.update();
            this.hero.update();

            if(this.alive){
                this.calcDelta();
                this.checkCollisions();
                this.moveEnemies();
                this.checkKeyboard();
                this.moveBackground();
                this.manageFloors();
             }
        }

        private checkKeyboard() {

            if(this.keyboard.isDown(32)){
                this.hero.jump();
            }
        }

        private createEnemies() {
            this.arr_enemies = new Array;
            for (var n = 0; n < 10; n++)
            {
                var b = PIXI.Sprite.fromImage("img/bunny.png");
                b.anchor.x = 0.5;
                b.anchor.y = 0.5;
                b.position.x = Math.floor(Math.random() * (window.innerWidth));
                b.position.y = 200;//Math.floor(Math.random() * (window.innerHeight));

                this.addChild(b);
                this.arr_enemies.push(b);
            }
        }

        private arr_Floors:Array = new Array();
        private createFloor(ypos:Number) {

            var randomWidth:Number = Math.floor(Math.random()*1000);
            this.floor = new FloorItem(randomWidth);
            this.addChild(this.floor);
            this.floor.position.x = window.innerWidth;
            this.floor.position.y = 200 + Math.random()*ypos;
            this.arr_Floors.push( this.floor );



        }
        //http://localhost/PixiChicken/index2.html
        private manageFloors() {
            var lastFloor:FloorItem =  this.arr_Floors[this.arr_Floors.length-1];
            var firstFloor:FloorItem =  this.arr_Floors[0];
            if( (lastFloor.position.x + lastFloor.width) < (window.innerWidth - Math.random()*250 ) ) {
                  this.createFloor(100);
            }

            if( firstFloor.position.x + firstFloor.width < 0 ) {
                this.removeChild(firstFloor);
                this.arr_Floors.splice(0,1);
            }


        }


        private now;
        private delta;
        private then=Date.now();

        private calcDelta() {

            this.now = Date.now();
            this.delta = (this.now - this.then) / 1000; // seconds since last frame
            this.then = this.now;

        }

        private moveBackground() {
            this.bg.update(this.delta * this.gameSpeed/20);
        }

        private moveEnemies() {

            var arr = this.arr_enemies;
            var distance = (50 * this.delta) * this.gameSpeed;


            for (var n = 0; n < arr.length; n++)
            {

                arr[n].position.x =  (arr[n].position.x - distance);
                if( arr[n].position.x < 0 ) {
                    arr[n].position.x = (window.innerWidth);
                    arr[n].position.y = Math.floor(Math.random() * (window.innerHeight));
                }
            }
        }

        private checkCollisions() {


            var hero = this.hero.heroSprite;
            var arr = this.arr_enemies;

            for (var n = 0; n < arr.length; n++)
            {
                var pickup = arr[n];

                var xdist = pickup.position.x - this.hero.heroSprite.position.x;

                if(xdist > - (pickup.width/2+(this.hero.heroSprite.width/2)) && xdist < pickup.width/2+(this.hero.heroSprite.width/2))
                {
                    var ydist = pickup.position.y - this.hero.heroSprite.position.y;

                    if(ydist > -(pickup.height/2+(this.hero.heroSprite.height/2)) && ydist < pickup.height/2+(this.hero.heroSprite.height/2))
                    {

                        pickup.position.x = (window.innerWidth) + Math.floor(Math.random() * (window.innerWidth));
                        pickup.position.y = Math.floor(Math.random() * (window.innerHeight));;


                    }
                }
            }

            var distance = (100 * this.delta) * this.gameSpeed;

            for (var i = 0; i < this.arr_Floors.length; i++)
            {
                this.arr_Floors[i].position.x  -= distance;
            }

            for (var i = 0; i < this.arr_Floors.length; i++)
            {

                var leftFloor:Number = this.arr_Floors[i].position.x;
                var rightFloor:Number = this.arr_Floors[i].position.x + this.arr_Floors[i].width;

                // get the currently active floor
                if( (hero.position.x > leftFloor) && (hero.position.x<rightFloor) ) {
                    this.floorActive =  this.arr_Floors[i];

                    if((hero.position.y+32) > this.floorActive.position.y) {
                        this.alive = false;
                        this.hero.floorY = 800;
                        this.hero.position.x -= 32;
                    } else {
                        this.hero.floorY = this.floorActive.position.y;
                    }

                   /* if((hero.position.y < this.arr_Floors[i].position.y)) {
                       this.hero.floorY = this.arr_Floors[i].position.y;
                   }  else {


                        this.gameSpeed = 0;
                        this.hero.floorY = 800;
                        this.hero.position.x -= 32;
                        this.alive = false;
                   }  */

                    return;
                } else {
                    //this.floorActive = null;
                   // console.log("NO FLOOR");
                    this.hero.floorY = 500;
                }

               // if( this.floorActive != null) this.hero.floorY = 500;
            }






           // this.floor.position.y +=  Math.random() > 0.5 ? 1 : -1;

            //console.log("hero: "+hero.position.y +" floor: "+this.floor.y);

          //  if(hero.position.y+(hero.height/2) > this.floor.position.y - (5)) {

          //      hero.position.y =  (this.floor.position.y) - hero.height/2;
          //  }


        }
    }

}