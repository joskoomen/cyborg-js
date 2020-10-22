"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
var MotherBoard_1 = require("./MotherBoard");
var walkDom_1 = require("../functions/walkDom");
var cyborgEval_1 = require("../functions/cyborgEval");
var Component = /** @class */ (function () {
    function Component() {
        var _this = this;
        this._name = '';
        this._notifications = [];
        this._motherboard = MotherBoard_1.MotherBoard.getInstance();
        this._events = [];
        this._addEventListener = function (pTarget, pEventName, pHandler) {
            var handler = pHandler.bind(_this);
            _this._events.push({
                target: pTarget,
                name: pEventName,
                handler: handler
            });
            return handler;
        };
        this._removeEventListener = function (pTarget, pEventName, pHandler) {
            var index = _this._events.findIndex(function (evtObj) {
                return evtObj.name === pEventName && evtObj.handler === pHandler;
            });
            _this._events.splice(index, 1);
            return pTarget;
        };
    }
    /**
     * Bind your component in the system.
     * @param {HTMLElement} pEl Connected Node
     */
    Component.prototype.bind = function (pEl) {
        this._el = pEl;
        this._name = pEl.dataset.component || '';
        this.registerInlineListeners();
    };
    Component.prototype.onload = function () {
        // window.onload trigger for component.
    };
    Component.prototype.onunload = function () {
        // window.onunload trigger for component.
    };
    Component.prototype.addListener = function (pType) {
        this.motherboard.notifier.addNotificationListener(this, pType, 
        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.handleNotifications);
    };
    Component.prototype.removeListener = function (pType) {
        this.motherboard.notifier.removeNotificationListener(pType, this);
    };
    Component.prototype.notify = function (pType, pParams) {
        if (pParams === void 0) { pParams = {}; }
        this.motherboard.notifier.notify(pType, pParams);
    };
    Component.prototype.handleNotifications = function (pObject) {
        pObject.notification;
    };
    Component.prototype.registerInlineListeners = function () {
        var _this = this;
        if (this._el) {
            walkDom_1.walkDom(this._el, function (element) {
                if (element.dataset.component) {
                    return;
                }
                Array.from(element.attributes).forEach(function (pAttribute) {
                    if (!pAttribute.name.startsWith('on'))
                        return;
                    var event = pAttribute.name.replace('data-on:', '');
                    element.dataset[pAttribute.name] = pAttribute.value;
                    element.removeAttribute(pAttribute.name);
                    var isFunction = pAttribute.value.includes('(') && pAttribute.value.includes(')');
                    if (isFunction) {
                        var handler = _this._addEventListener(element, event, new Function("this." + pAttribute.value).bind(_this));
                        element.addEventListener(event, handler);
                    }
                    else {
                        var handler = _this._addEventListener(element, event, function () {
                            cyborgEval_1.cyborgEval(_this._motherboard.data, pAttribute.value);
                        });
                        element.addEventListener(event, handler);
                    }
                });
            });
        }
    };
    Component.prototype.addEventListener = function (pEventName, pHandler) {
        if (this._el) {
            var handler = this._addEventListener(this._el, pEventName, pHandler);
            this._el.addEventListener(pEventName, handler, false);
        }
    };
    Component.prototype.removeEventListener = function (pEventName, pHandler) {
        if (this._el) {
            this._removeEventListener(this._el, pEventName, pHandler);
            this._el.removeEventListener(pEventName, pHandler);
        }
    };
    /**
     * @param {Object} pData Data object to use
     * @param {function} pTemplate template function
     */
    Component.prototype.render = function (pData, pTemplate) {
        if (this._el) {
            if (this._el.children) {
                while (this._el.children.length > 0) {
                    this._el.children[0].remove();
                }
            }
            if (pTemplate) {
                this._el.innerHTML = pTemplate(pData);
            }
            else {
                this._el.innerHTML = this.getTemplate(pData);
            }
            this.motherboard.build(this._el);
        }
    };
    /**
     * @param {Object} pData
     * @returns {string}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Component.prototype.getTemplate = function (pData) {
        pData = pData || {};
        return '';
    };
    Object.defineProperty(Component.prototype, "notifications", {
        get: function () {
            return this._notifications;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "el", {
        get: function () {
            return this._el;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "motherboard", {
        get: function () {
            return this._motherboard;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "events", {
        get: function () {
            return this._events;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Garbage collection ;)
     */
    Component.prototype.destroy = function () {
        this.motherboard.notifier.removeAllListenersFor(this);
        while (this._events.length > 0) {
            var event_1 = this._events[0];
            this._removeEventListener(event_1.target, event_1.name, event_1.handler);
            event_1.target.removeEventListener(event_1.name, event_1.handler);
        }
        if (this._el) {
            this._el.remove();
            this._el = undefined;
        }
    };
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=Component.js.map