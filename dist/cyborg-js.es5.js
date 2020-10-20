var EventNames;
(function (EventNames) {
    EventNames["DOCUMENT_READY"] = "DOMContentLoaded";
    EventNames["NODE_REMOVED"] = "DOMNodeRemovedFromDocument";
})(EventNames || (EventNames = {}));

var Notification = /** @class */ (function () {
    function Notification(pTarget, pName, pHandler) {
        this.name = pName;
        this.handler = pHandler;
        this.target = pTarget;
    }
    return Notification;
}());

var NotificationBody = /** @class */ (function () {
    function NotificationBody(pType, pPayload) {
        this.notification = pType;
        this.payload = pPayload || {};
    }
    return NotificationBody;
}());

var NotificationController = /** @class */ (function () {
    function NotificationController() {
        if (NotificationController._instance) {
            throw new Error('Use NotificationController.getInstance()');
        }
        NotificationController._instance = this;
        this._listeners = [];
    }
    NotificationController.getInstance = function () {
        if (NotificationController._instance) {
            return NotificationController._instance;
        }
        return new NotificationController();
    };
    /**
     * emit a notification
     * @param pType
     * @param pParams
     */
    NotificationController.prototype.notify = function (pType, pParams) {
        var listeners = this._listeners;
        var notes = listeners.filter(function (listener) {
            return listener.name === pType;
        });
        notes.forEach(function (note) {
            var body = new NotificationBody(pType, pParams || {});
            note.handler(body);
        });
    };
    /**
     * Add a Notification Listener
     * @param pTarget
     * @param pType
     * @param pHandler
     */
    NotificationController.prototype.addNotificationListener = function (pTarget, pType, pHandler) {
        var note = new Notification(pTarget, pType, pHandler.bind(pTarget));
        this._listeners.push(note);
    };
    /**
     * Remove a given listener. This only removes one record.
     * @param pType string Notification name
     * @param pTarget Component object
     */
    NotificationController.prototype.removeNotificationListener = function (pType, pTarget) {
        var listeners = this._listeners;
        var index = listeners.findIndex(function (notification) {
            return (notification.name === pType) && (notification.target === pTarget);
        });
        this._listeners = listeners.splice(index, 1);
    };
    NotificationController.prototype.removeAllListenersFor = function (pInstance) {
        var listeners = this._listeners;
        this._listeners = listeners.filter(function (notification) {
            return (notification.target.name !== pInstance.name);
        });
    };
    Object.defineProperty(NotificationController.prototype, "listeners", {
        get: function () {
            return this._listeners;
        },
        enumerable: false,
        configurable: true
    });
    return NotificationController;
}());

var MotherBoard = /** @class */ (function () {
    function MotherBoard() {
        this.componentsMap = [];
        this._components = [];
        this._data = {};
        if (MotherBoard._instance) {
            throw new Error('Use MotherBoard.getInstance()');
        }
        MotherBoard._instance = this;
        this.init();
    }
    MotherBoard.getInstance = function () {
        if (MotherBoard._instance) {
            return MotherBoard._instance;
        }
        return new MotherBoard();
    };
    /**
     * Init Application.
     */
    MotherBoard.prototype.init = function () {
        var _this = this;
        window.onload = function () {
            _this.onload();
        };
        window.onunload = function () {
            _this.onunload();
        };
        window.onpagehide = function () {
            _this.destroy();
        };
        document.addEventListener(EventNames.DOCUMENT_READY, function () {
            _this.bind();
        }, false);
    };
    /**
     * Document ready handler
     */
    MotherBoard.prototype.bind = function () {
        var html = document.querySelector('html');
        if (!html) {
            throw Error('No html tag available');
        }
        html.classList.remove('no-js');
        html.classList.add('js');
        this.build(html);
    };
    MotherBoard.prototype.build = function (pEl) {
        var _this = this;
        var componentsList = Array.from(pEl.querySelectorAll('[data-component]'));
        if (componentsList.length > 0) {
            componentsList.forEach(function (el) {
                var dataset = el.dataset;
                if (dataset && dataset.component) {
                    var componentsArray = dataset.component
                        .replace(' ', '')
                        .split(',');
                    componentsArray.forEach(function (componentString) {
                        var ComponentClass = MotherBoard.getComponentMapByName(_this.componentsMap, componentString);
                        if (ComponentClass) {
                            var component = new ComponentClass.class();
                            console.log('component', component);
                            if (component.notifications &&
                                component.notifications.length > 0) {
                                _this.registerNotification({
                                    name: componentString,
                                    notifications: component.notifications,
                                    classRef: component,
                                });
                            }
                            component.bind(el);
                            _this._components.push(component);
                            _this.destroyComponentListener(component, el);
                        }
                    });
                }
            });
        }
    };
    /**
     * Window onload handler
     */
    MotherBoard.prototype.onload = function () {
        this._components.forEach(function (pComponent) {
            pComponent.onload();
        });
    };
    MotherBoard.prototype.onunload = function () {
        this._components.forEach(function (pComponent) {
            pComponent.onunload();
        });
    };
    MotherBoard.prototype.destroyComponentListener = function (pComponent, pEl) {
        var component = pComponent;
        var el = pEl;
        if (el) {
            if (window.MutationObserver) {
                var observer_1 = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        mutation.removedNodes.forEach(function (removedNode) {
                            if (component && removedNode === pEl) {
                                component.destroy();
                                if (observer_1) {
                                    observer_1.disconnect();
                                    observer_1 = null;
                                }
                                component = null;
                                el = null;
                            }
                        });
                    });
                });
                observer_1.observe(document, {
                    childList: true,
                    subtree: true,
                });
            }
            else {
                pComponent.addEventListener(EventNames.NODE_REMOVED, function () {
                    pComponent.destroy();
                    component = null;
                    el = null;
                });
            }
        }
    };
    MotherBoard.prototype.registerNotification = function (pObject) {
        var _this = this;
        if (pObject.notifications) {
            var notifications = pObject.notifications;
            var classRef_1 = pObject.classRef;
            notifications.forEach(function (pNotification) {
                _this.notifier.addNotificationListener(classRef_1, pNotification, 
                // eslint-disable-next-line @typescript-eslint/unbound-method
                classRef_1.handleNotifications);
            });
        }
    };
    Object.defineProperty(MotherBoard.prototype, "notifier", {
        /**
         * Get NotificationController access.
         * @returns {NotificationController}
         */
        get: function () {
            return NotificationController.getInstance();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MotherBoard.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MotherBoard.prototype, "components", {
        get: function () {
            return this._components;
        },
        enumerable: false,
        configurable: true
    });
    /**
     */
    MotherBoard.getComponentMapByName = function (pArray, pName) {
        if (pArray && (pArray.length > 0)) {
            var component = pArray.find(function (pRec) { return pRec.reference === pName; }) || null;
            return component;
        }
        return null;
    };
    /**
     * destroy application
     */
    MotherBoard.prototype.destroy = function () {
        while (this._components.length > 0) {
            var component = this._components[0];
            if (component && component.el) {
                component.el.remove();
            }
            this._components.shift();
        }
    };
    return MotherBoard;
}());

function walkDom(pEl, pCallback) {
    if (pEl) {
        pCallback(pEl);
        pEl = pEl.firstElementChild;
        while (pEl) {
            walkDom(pEl, pCallback);
            pEl = pEl.nextElementSibling;
        }
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function cyborgEval(pExpression, pDataContext, pAdditionalHelperVariables) {
    var additionalHelperVariables = pAdditionalHelperVariables || {};
    if (typeof pExpression === 'function') {
        return pExpression.call(pDataContext);
    }
    return new (Function.bind.apply(Function, __spreadArrays([void 0], Object.keys(additionalHelperVariables), ["var __cyborg_result; with($data) { __cyborg_result = " + pExpression + " }; return __cyborg_result"])))().apply(void 0, __spreadArrays([pDataContext], Object.values(additionalHelperVariables)));
}

var Component = /** @class */ (function () {
    function Component() {
        var _this = this;
        this._name = '';
        this._notifications = [];
        this._motherboard = MotherBoard.getInstance();
        this._events = [];
        this._addEventListener = function (pTarget, pEventName, pHandler) {
            var handler = pHandler.bind(_this);
            _this._events.push({
                target: pTarget,
                name: pEventName,
                handler: handler,
            });
            return handler;
        };
        this._removeEventListener = function (pTarget, pEventName, pHandler) {
            var index = _this._events.findIndex(function (evtObj) {
                return (evtObj.name === pEventName &&
                    evtObj.handler === pHandler);
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
            walkDom(this._el, function (element) {
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
                            cyborgEval(_this._motherboard.data, pAttribute.value);
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

var CyborgJS = { MotherBoard: MotherBoard, Component: Component, Notification: Notification, NotificationBody: NotificationBody };

export default CyborgJS;
//# sourceMappingURL=cyborg-js.es5.js.map
