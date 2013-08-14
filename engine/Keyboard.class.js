var com;
(function (com) {
    (function (cc) {
        var Keyboard = (function () {
            function Keyboard() {
                var _this = this;
                this.pressed = {
                };
                this.keyboardSignal = new Signal();
                window.addEventListener("keydown", function (event) {
                    return _this.keyDown(event);
                }, false);
                window.addEventListener("keyup", function (event) {
                    return _this.keyUp(event);
                }, false);
            }
            Keyboard.prototype.isDown = function (keyCode) {
                return this.pressed[keyCode];
            };
            Keyboard.prototype.keyUp = function (e) {
                delete this.pressed[e.keyCode];
            };
            Keyboard.prototype.keyDown = function (e) {
                this.keyboardSignal.dispatch(e.keyCode);
                this.pressed[e.keyCode] = true;
            };
            return Keyboard;
        })();
        cc.Keyboard = Keyboard;        
    })(com.cc || (com.cc = {}));
    var cc = com.cc;
})(com || (com = {}));
//@ sourceMappingURL=Keyboard.class.js.map
