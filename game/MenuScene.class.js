var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var com;
(function (com) {
    (function (cc) {
        var MenuScene = (function (_super) {
            __extends(MenuScene, _super);
            function MenuScene() {
                        _super.call(this);
                this.setBackgroundColor(0xffffff);
                this.bunny = PIXI.Sprite.fromImage("img/bunny.png");
                this.bunny.anchor.x = 0.5;
                this.bunny.anchor.y = 0.5;
                this.bunny.position.x = 50;
                this.bunny.position.y = 50;
                this.addChild(this.bunny);
            }
            MenuScene.prototype.update = function () {
                _super.prototype.update.call(this);
                this.bunny.rotation += 0.1;
            };
            return MenuScene;
        })(cc.Scene);
        cc.MenuScene = MenuScene;        
    })(com.cc || (com.cc = {}));
    var cc = com.cc;
})(com || (com = {}));
//@ sourceMappingURL=MenuScene.class.js.map
