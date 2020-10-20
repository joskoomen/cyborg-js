"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
var Notification_1 = require("./Notification");
var NotificationBody_1 = require("./NotificationBody");
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
            var body = new NotificationBody_1.NotificationBody(pType, pParams || {});
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
        var note = new Notification_1.Notification(pTarget, pType, pHandler.bind(pTarget));
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
exports.NotificationController = NotificationController;
//# sourceMappingURL=NotificationController.js.map