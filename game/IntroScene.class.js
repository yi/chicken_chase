var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var com;
(function (com) {
    (function (cc) {
        var IntroScene = (function (_super) {
            __extends(IntroScene, _super);
            function IntroScene() {
                        _super.call(this);
                this.setBackgroundColor(0xffffff);
                this.logo = PIXI.Sprite.fromImage("img/logo.png");
                this.addChild(this.logo);
                this.logo.scale.x = cc.ScenesManager.defaultWidth / 250;
                this.logo.scale.y = this.logo.scale.x;
                this.logo.anchor.x = 0.5;
                this.logo.anchor.y = 0.5;
                this.logo.alpha = 0;
                this.logo.position.x = cc.ScenesManager.defaultWidth / 2;
                this.logo.position.y = cc.ScenesManager.defaultHeight / 2;
            }
            IntroScene.prototype.update = function () {
                _super.prototype.update.call(this);
                if(this.logo.alpha < 1) {
                    this.logo.alpha += 0.01;
                } else {
                    cc.ScenesManager.goToScene('menu');
                }
            };
            return IntroScene;
        })(cc.Scene);
        cc.IntroScene = IntroScene;        
    })(com.cc || (com.cc = {}));
    var cc = com.cc;
})(com || (com = {}));
//@ sourceMappingURL=IntroScene.class.js.map
