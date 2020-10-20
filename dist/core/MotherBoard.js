"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotherBoard = void 0;
var EventNames_1 = require("../constants/EventNames");
var NotificationController_1 = require("../notifications/NotificationController");
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
        document.addEventListener(EventNames_1.EventNames.DOCUMENT_READY, function () {
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
                pComponent.addEventListener(EventNames_1.EventNames.NODE_REMOVED, function () {
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
            return NotificationController_1.NotificationController.getInstance();
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
exports.MotherBoard = MotherBoard;
//# sourceMappingURL=MotherBoard.js.map