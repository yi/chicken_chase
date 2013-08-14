var EventModule;
(function (EventModule) {
    var EventObj = (function () {
        function EventObj() {
        }
        EventObj.prototype.bind = function (event, fct) {
            this._events = this._events || {
            };
            this._events[event] = this._events[event] || [];
            this._events[event].push(fct);
        };
        EventObj.prototype.unbind = function (event, fct) {
            this._events = this._events || {
            };
            if(event in this._events === false) {
                return;
            }
            this._events[event].splice(this._events[event].indexOf(fct), 1);
        };
        EventObj.prototype.unbindEvent = function (event) {
            this._events = this._events || {
            };
            this._events[event] = [];
        };
        EventObj.prototype.unbindAll = function () {
            this._events = this._events || {
            };
            for(var event in this._events) {
                this._events[event] = false;
            }
        };
        EventObj.prototype.trigger = function (event) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            this._events = this._events || {
            };
            if(event in this._events === false) {
                return;
            }
            for(var i = 0; i < this._events[event].length; i++) {
                this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
            }
        };
        EventObj.prototype.registerEvent = function (evtname) {
            this[evtname] = function (callback, replace) {
                if(typeof callback == 'function') {
                    if(replace) {
                        this.unbindEvent(evtname);
                    }
                    this.bind(evtname, callback);
                }
                return this;
            };
        };
        return EventObj;
    })();
    EventModule.EventObj = EventObj;    
})(EventModule || (EventModule = {}));
//@ sourceMappingURL=EventModule.class.js.map
