///<reference path="../lib/pixi.d.ts" />
///<reference path="../lib/Signal.ts" />
module com.cc {




    export class Keyboard {

        public keyboardSignal:Signal;
        private _isDown:bool;
        private _isUp:bool;
        private pressed:Object ={};


        public static KEYBOARD_UP:string = "keyboard up";
        public static KEYBOARD_DOWN:string = "keyboard down";

        constructor() {

            this.keyboardSignal = new Signal();
            window.addEventListener("keydown",  event => this.keyDown(event) , false);
            window.addEventListener("keyup",    event => this.keyUp  (event) , false);
        }

        public isDown(keyCode){

            return this.pressed[keyCode];
        }

        public keyUp(e:Event) {
            //console.log(e.keyCode);
            this.keyboardSignal.dispatch(Keyboard.KEYBOARD_UP, e.keyCode);
            delete this.pressed[e.keyCode];
        }
        public keyDown(e:Event) {

            this.keyboardSignal.dispatch(Keyboard.KEYBOARD_DOWN, e.keyCode);

            this.pressed[e.keyCode] = true;


        }

    }
}