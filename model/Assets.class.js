var com;
(function (com) {
    (function (cc) {
        var Assets = (function () {
            function Assets() {
                this.explosionTextures = [];
                this.wheelTextures = [];
                this.runnerTextures = [];
                var suffix = "";
                for(var i = 0; i < 30; i++) {
                    if(i < 9) {
                        suffix = "0" + (i + 1);
                    } else {
                        suffix = (i + 1);
                    }
                    var texture = PIXI.Texture.fromFrame("jumper_00" + suffix + ".png");
                    this.explosionTextures.push(texture);
                    var rtexture = PIXI.Texture.fromFrame("runner_00" + suffix + ".png");
                    this.runnerTextures.push(rtexture);
                }
                console.log("assets ready");
            }
            return Assets;
        })();
        cc.Assets = Assets;        
    })(com.cc || (com.cc = {}));
    var cc = com.cc;
})(com || (com = {}));
//@ sourceMappingURL=Assets.class.js.map
