var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var com;
(function (com) {
    (function (cc) {
        var Hero = (function (_super) {
            __extends(Hero, _super);
            function Hero() {
                        _super.call(this);
                this.yVel = 0;
                this.gravity = 0.1;
                this.isJumping = true;
                this.boost = 0;
                this.count = 0;
                console.log("Hero init");
                this.bunny = PIXI.Sprite.fromImage("img/bunny.png");
                this.rocket = PIXI.Sprite.fromImage("img/rocket.png");
                this.rocket.visible = false;
                this.bunny.anchor.x = 0.5;
                this.bunny.anchor.y = 1;
                this.bunny.position.x = 0;
                this.bunny.position.y = 0;
                this.addChild(this.bunny);
                this.rocket.anchor.x = 0.5;
                this.rocket.anchor.y = 0.5;
                this.rocket.position.x = 350;
                this.rocket.position.y = -350;
                this.addChild(this.rocket);
                this._heroSprite = this.rocket;
                this.blah = "blah blah";
                this.jumping = false;
                this.keyboard = new com.cc.Keyboard();
                this.floorY = 300;
                this.light2 = PIXI.Sprite.fromImage("img/LightRotate2.png");
                this.light2.anchor.x = 0.5;
                this.light2.anchor.y = 0.5;
                this.addChild(this.light2);
                this.light2.width = 300;
                this.light2.height = 300;
                this.light2.alpha = 0.1;
                this.light1 = PIXI.Sprite.fromImage("img/LightRotate1.png");
                this.light1.anchor.x = 0.5;
                this.light1.anchor.y = 0.5;
                this.light1.width = 300;
                this.light1.height = 300;
                this.light1.alpha = 0.2;
                this.addChild(this.light1);
                var assets = new com.cc.Assets();
                this.mc_running = new PIXI.MovieClip(assets.runnerTextures);
                var mc_running = this.mc_running;
                this.addChild(mc_running);
                mc_running.play();
                mc_running.scaleX = 1;
                mc_running.scaleY = 1;
                mc_running.anchor.x = 0.5;
                mc_running.anchor.y = 0.5;
                mc_running.position.x = 0;
                mc_running.position.y = 0;
                mc_running.animationSpeed = 0.5;
                this.mc_jumping = new PIXI.MovieClip(assets.explosionTextures);
                var mc_jumping = this.mc_jumping;
                this.addChild(mc_jumping);
                mc_jumping.play();
                mc_jumping.scaleX = 1;
                mc_jumping.scaleY = 1;
                mc_jumping.anchor.x = 0.5;
                mc_jumping.anchor.y = 0.5;
                mc_jumping.position.x = 0;
                mc_jumping.position.y = 0;
                mc_jumping.animationSpeed = 0.5;
                mc_jumping.loop = false;
                this.mc_current = mc_running;
            }
            Hero.prototype.create = function () {
                console.log(this.blah);
            };
            Hero.prototype.switch = function () {
                this.rocket.visible = !this.rocket.visible;
                this.bunny.visible = !this.rocket.visible;
            };
            Hero.prototype.update = function (gameSpeed) {
                this.yVel += this.gravity - this.boost;
                this.rocket.position.y += this.yVel;
                if(this.rocket.position.y + (this.rocket.height / 2) > this.floorY) {
                    this.jumping = false;
                    this.yVel = 0;
                    this.rocket.position.y = this.floorY - this.rocket.height / 2;
                }
                this.light1.position.x = this.rocket.position.x;
                this.light1.position.y = this.rocket.position.y;
                this.light2.position.x = this.rocket.position.x;
                this.light2.position.y = this.rocket.position.y;
                this.mc_running.position.x = this.rocket.position.x;
                this.mc_running.position.y = this.rocket.position.y;
                this.mc_jumping.position.x = this.rocket.position.x;
                this.mc_jumping.position.y = this.rocket.position.y;
                this.light1.rotation += 0.02;
                this.light2.rotation += 0.04;
                this.mc_current.animationSpeed = gameSpeed / 7;
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
            };
            Hero.prototype.boostup = function () {
                this.boost = 7;
            };
            Hero.prototype.boostdown = function () {
                if(this.boost > 0) {
                    this.boost -= 2;
                }
            };
            Hero.prototype.checkKeyboard = function () {
                if(this.keyboard.isDown(32) && !this.jumping) {
                    this.jumping = true;
                    this.mc_jumping.gotoAndPlay(0);
                    this.boostup();
                } else {
                    this.boostdown();
                }
            };
            Hero.prototype.uiJump = function () {
                this.jumping = true;
                this.boostup();
            };
            Hero.prototype.jump = function () {
            };
            Object.defineProperty(Hero.prototype, "heroSprite", {
                get: function () {
                    return this._heroSprite;
                },
                enumerable: true,
                configurable: true
            });
            return Hero;
        })(PIXI.DisplayObjectContainer);
        cc.Hero = Hero;        
    })(com.cc || (com.cc = {}));
    var cc = com.cc;
})(com || (com = {}));
//@ sourceMappingURL=Bunny.Sprite.js.map
