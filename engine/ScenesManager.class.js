var com;
(function (com) {
    (function (cc) {
        var ScenesManager = (function () {
            function ScenesManager() { }
            ScenesManager.scenes = {
            };
            ScenesManager.ratio = 1;
            ScenesManager.create = function create(width, height) {
                if(ScenesManager.renderer) {
                    return this;
                }
                ScenesManager.renderer = PIXI.autoDetectRenderer(width, height);
                document.body.appendChild(ScenesManager.renderer.view);
                requestAnimFrame(ScenesManager.loop);
                return this;
            };
            ScenesManager.loop = function loop() {
                requestAnimFrame(function () {
                    ScenesManager.loop();
                });
                if(!ScenesManager.currentScene || ScenesManager.currentScene.isPaused()) {
                    return;
                }
                ScenesManager.currentScene.update();
                ScenesManager.renderer.render(ScenesManager.currentScene);
            };
            ScenesManager.createScene = function createScene(id, TScene) {
                if (typeof TScene === "undefined") { TScene = cc.Scene; }
                if(ScenesManager.scenes[id]) {
                    return undefined;
                }
                var scene = new TScene();
                ScenesManager.scenes[id] = scene;
                return scene;
            };
            ScenesManager.goToScene = function goToScene(id) {
                if(ScenesManager.scenes[id]) {
                    if(ScenesManager.currentScene) {
                        ScenesManager.currentScene.pause();
                    }
                    ScenesManager.currentScene = ScenesManager.scenes[id];
                    ScenesManager.currentScene.resume();
                    return true;
                }
                return false;
            };
            ScenesManager.pause = function pause() {
                ScenesManager.currentScene.pause();
            };
            ScenesManager.resume = function resume() {
                ScenesManager.currentScene.resume();
            };
            return ScenesManager;
        })();
        cc.ScenesManager = ScenesManager;        
    })(com.cc || (com.cc = {}));
    var cc = com.cc;
})(com || (com = {}));
//@ sourceMappingURL=ScenesManager.class.js.map
