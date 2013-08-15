var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var com;
(function (com) {
    (function (cc) {
        var GameScene = (function (_super) {
            __extends(GameScene, _super);
            function GameScene() {
                var _this = this;
                        _super.call(this);
                this.arr_Floors = new Array();
                this.count = 0;
                this.currentheight = 400;
                this.then = Date.now();
                this.bg = new cc.Background();
                this.addChild(this.bg);
                this.bunny = PIXI.Sprite.fromImage("img/bunny.png");
                this.bunny.anchor.x = 0.5;
                this.bunny.anchor.y = 0.5;
                this.bunny.position.x = 150;
                this.bunny.position.y = 50;
                this.addChild(this.bunny);
                this.hero = new cc.Hero();
                var hero = this.hero;
                hero.position.x = 0;
                hero.position.y = 0;
                this.addChild(hero);
                hero.create();
                hero.heroSprite.setInteractive(true);
                hero.heroSprite.buttonMode = true;
                hero.heroSprite.mousedown = hero.heroSprite.touchstart = function (data) {
                    console.log("click");
                    this.data = data;
                    this.alpha = 0.9;
                    this.dragging = true;
                };
                hero.heroSprite.mouseup = hero.heroSprite.mouseupoutside = hero.heroSprite.touchend = hero.heroSprite.touchendoutside = function (data) {
                    this.alpha = 1;
                    this.dragging = false;
                    this.data = null;
                };
                hero.heroSprite.mousemove = hero.heroSprite.touchmove = function (data) {
                    if(this.dragging) {
                        var newPosition = this.data.getLocalPosition(this.parent);
                        this.position.x = newPosition.x;
                        this.position.y = newPosition.y;
                    }
                };
                var _this = this;
                var button = new PIXI.Sprite(PIXI.Texture.fromImage("img/button.png"));
                button.position.x = 100;
                button.scale.x = 0.5;
                button.scale.y = 0.5;
                button.click = button.tap = function (data) {
                    if(_this.isPaused()) {
                        return;
                    }
                    hero.uiJump();
                };
                button.setInteractive(true);
                this.setInteractive(true);
                this.createEnemies();
                this.gameSpeed = 8;
                this.keyboard = new cc.Keyboard();
                this.keyboard.keyboardSignal.add(this.onKeyboard, this);
                this.createFloor(100);
                this.alive = true;
                setInterval(function () {
                    return _this.setGradient();
                }, 3000);
            }
            GameScene.prototype.setGradient = function () {
                console.log("grad " + this.grad);
                this.grad = Math.random() > 0.5 ? true : false;
            };
            GameScene.prototype.onKeyboard = function (keyCode) {
                switch(keyCode) {
                    case 107:
                        this.gameSpeed++;
                        console.log("gamespeed: " + this.gameSpeed);
                        break;
                    case 109:
                        this.gameSpeed--;
                        console.log("gamespeed: " + this.gameSpeed);
                        break;
                }
            };
            GameScene.prototype.resume = function () {
                _super.prototype.resume.call(this);
                this.bunny.position.y = 50;
            };
            GameScene.prototype.update = function () {
                _super.prototype.update.call(this);
                this.hero.update(this.gameSpeed);
                if(this.alive) {
                    this.calcDelta();
                    this.checkCollisions();
                    this.moveEnemies();
                    this.checkKeyboard();
                    this.moveBackground();
                    this.manageFloors();
                }
            };
            GameScene.prototype.checkKeyboard = function () {
                if(this.keyboard.isDown(32)) {
                    this.hero.jump();
                }
            };
            GameScene.prototype.createEnemies = function () {
                this.arr_enemies = new Array();
                for(var n = 0; n < 110; n++) {
                    var b = PIXI.Sprite.fromImage("img/bunny.png");
                    b.anchor.x = 0.5;
                    b.anchor.y = 0.5;
                    b.position.x = Math.floor(Math.random() * (window.innerWidth));
                    b.position.y = 200;
                    this.addChild(b);
                    this.arr_enemies.push(b);
                }
            };
            GameScene.prototype.createFloor = function (ypos) {
                var randomWidth = Math.floor(Math.random() * 100);
                this.floor = new cc.FloorItem(randomWidth);
                this.addChild(this.floor);
                if(this.arr_Floors.length > 0) {
                    this.floor.position.x = this.arr_Floors[this.arr_Floors.length - 1].position.x + this.arr_Floors[this.arr_Floors.length - 1].width;
                } else {
                    this.floor.position.x = window.innerWidth;
                }
                if(this.grad) {
                    this.currentheight++;
                } else {
                    this.currentheight--;
                }
                if((this.currentheight > 470) || (this.currentheight < 350)) {
                    this.grad = !this.grad;
                }
                this.floor.position.y = this.currentheight;
                this.arr_Floors.push(this.floor);
            };
            GameScene.prototype.manageFloors = function () {
                var lastFloor = this.arr_Floors[this.arr_Floors.length - 1];
                var firstFloor = this.arr_Floors[0];
                if((lastFloor.position.x + lastFloor.width) < (window.innerWidth)) {
                    this.createFloor(100);
                }
                if(firstFloor.position.x + firstFloor.width < 0) {
                    this.removeChild(firstFloor);
                    this.arr_Floors.splice(0, 1);
                }
            };
            GameScene.prototype.calcDelta = function () {
                this.now = Date.now();
                this.delta = (this.now - this.then) / 1000;
                this.then = this.now;
            };
            GameScene.prototype.moveBackground = function () {
                this.bg.update(this.delta * this.gameSpeed / 20);
            };
            GameScene.prototype.moveEnemies = function () {
                var arr = this.arr_enemies;
                var distance = (50 * this.delta) * this.gameSpeed;
                for(var n = 0; n < arr.length; n++) {
                    arr[n].position.x = (arr[n].position.x - distance);
                    if(arr[n].position.x < 0) {
                        arr[n].position.x = (window.innerWidth);
                        arr[n].position.y = Math.floor(Math.random() * (window.innerHeight));
                    }
                }
            };
            GameScene.prototype.checkCollisions = function () {
                var hero = this.hero.heroSprite;
                var arr = this.arr_enemies;
                for(var n = 0; n < arr.length; n++) {
                    var pickup = arr[n];
                    var xdist = pickup.position.x - this.hero.heroSprite.position.x;
                    if(xdist > -(pickup.width / 2 + (this.hero.heroSprite.width / 2)) && xdist < pickup.width / 2 + (this.hero.heroSprite.width / 2)) {
                        var ydist = pickup.position.y - this.hero.heroSprite.position.y;
                        if(ydist > -(pickup.height / 2 + (this.hero.heroSprite.height / 2)) && ydist < pickup.height / 2 + (this.hero.heroSprite.height / 2)) {
                            pickup.position.x = (window.innerWidth) + Math.floor(Math.random() * (window.innerWidth));
                            pickup.position.y = Math.floor(Math.random() * (window.innerHeight));
                            ;
                        }
                    }
                }
                var distance = (100 * this.delta) * this.gameSpeed;
                for(var i = 0; i < this.arr_Floors.length; i++) {
                    this.arr_Floors[i].position.x -= distance;
                }
                for(var i = 0; i < this.arr_Floors.length; i++) {
                    var leftFloor = this.arr_Floors[i].position.x;
                    var rightFloor = this.arr_Floors[i].position.x + this.arr_Floors[i].width;
                    if((hero.position.x > leftFloor) && (hero.position.x < rightFloor)) {
                        this.floorActive = this.arr_Floors[i];
                        if((hero.position.y) > this.floorActive.position.y) {
                            this.alive = false;
                            this.hero.floorY = 800;
                            this.hero.position.x -= 32;
                        } else {
                            this.hero.floorY = this.floorActive.position.y;
                        }
                        return;
                    } else {
                        this.hero.floorY = 500;
                    }
                }
            };
            return GameScene;
        })(cc.Scene);
        cc.GameScene = GameScene;        
    })(com.cc || (com.cc = {}));
    var cc = com.cc;
})(com || (com = {}));
//@ sourceMappingURL=GameScene.class.js.map
