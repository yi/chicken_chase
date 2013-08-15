var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var com;
(function (com) {
    (function (cc) {
        var FloorItem = (function (_super) {
            __extends(FloorItem, _super);
            function FloorItem(randomWidth) {
                        _super.call(this);
                this.floor = new PIXI.Graphics();
                var floor = this.floor;
                floor = new PIXI.Graphics();
                floor.beginFill(0x333333);
                floor.lineStyle(0, 0xFF0000);
                floor.drawRect(0, 0, randomWidth, 300);
                floor.setInteractive(true);
                this.addChild(floor);
                this.width = randomWidth;
                floor.hitArea = new PIXI.Rectangle(0, 0, randomWidth, 10);
                floor.click = function (data) {
                    console.log('hit rect');
                };
                floor.y = 400;
                var skytexture = PIXI.Texture.fromImage("img/grass.png");
                var floorTile = new PIXI.TilingSprite(skytexture, randomWidth, 400);
                this.addChild(floorTile);
            }
            return FloorItem;
        })(PIXI.DisplayObjectContainer);
        cc.FloorItem = FloorItem;        
    })(com.cc || (com.cc = {}));
    var cc = com.cc;
})(com || (com = {}));
//@ sourceMappingURL=Floor.class.js.map
