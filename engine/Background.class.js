var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var com;
(function (com) {
    (function (cc) {
        var Background = (function (_super) {
            __extends(Background, _super);
            function Background() {
                        _super.call(this);
                var texture = PIXI.Texture.fromImage("img/tiletexture.png");
                var skytexture = PIXI.Texture.fromImage("img/bggrass.jpg");
                this.skyTile = new PIXI.TilingSprite(skytexture, window.innerWidth, window.innerHeight);
                this.addChild(this.skyTile);
                this.skyTile.position.y = 0;
                this.tilingSprite = new PIXI.TilingSprite(texture, window.innerWidth, window.innerHeight);
                this.addChild(this.tilingSprite);
                this.tilingSprite.position.y = 150;
            }
            Background.prototype.update = function (delta) {
                this.tilingSprite.tilePosition.x -= delta * 200;
                this.skyTile.tilePosition.x -= delta * 40;
            };
            return Background;
        })(PIXI.DisplayObjectContainer);
        cc.Background = Background;        
    })(com.cc || (com.cc = {}));
    var cc = com.cc;
})(com || (com = {}));
//@ sourceMappingURL=Background.class.js.map
