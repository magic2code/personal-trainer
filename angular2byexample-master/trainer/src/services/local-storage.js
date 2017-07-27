"use strict";
var LocalStorage = (function () {
    function LocalStorage() {
    }
    LocalStorage.prototype.getItem = function (key) {
        if (localStorage[key]) {
            return JSON.parse(localStorage[key]);
        }
        return null;
    };
    LocalStorage.prototype.setItem = function (key, item) {
        localStorage[key] = JSON.stringify(item);
    };
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;
