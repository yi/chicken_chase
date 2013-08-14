var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var com;
(function (com) {
    (function (cc) {
        var Scene = (function (_super) {
            __extends(Scene, _super);
            function Scene() {
                        _super.call(this);
                this.paused = false;
                this.updateCB = function () {
                };
            }
            Scene.prototype.onUpdate = function (updateCB) {
                this.updateCB = updateCB;
            };
            Scene.prototype.update = function () {
                this.updateCB();
            };
            Scene.prototype.pause = function () {
                this.paused = true;
            };
            Scene.prototype.resume = function () {
                this.paused = false;
            };
            Scene.prototype.isPaused = function () {
                return this.paused;
            };
            return Scene;
        })(PIXI.Stage);
        cc.Scene = Scene;        
    })(com.cc || (com.cc = {}));
    var cc = com.cc;
})(com || (com = {}));
//@ sourceMappingURL=Scene.class.js.map
