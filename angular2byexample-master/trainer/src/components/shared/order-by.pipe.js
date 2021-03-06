"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var OrderByPipe = (function () {
    function OrderByPipe() {
    }
    OrderByPipe.prototype.transform = function (value, field) {
        if (value == null || value.length == 1) {
            return value;
        }
        if (field.startsWith("-")) {
            field = field.substring(1);
            if (typeof value[0][field] === 'string' || value[0][field] instanceof String) {
                return value.slice().sort(function (a, b) { return b[field].localeCompare(a[field]); });
            }
            return value.slice().sort(function (a, b) { return b[field] - a[field]; });
        }
        else {
            if (typeof value[0][field] === 'string' || value[0][field] instanceof String) {
                return value.slice().sort(function (a, b) { return -b[field].localeCompare(a[field]); });
            }
            return value.slice().sort(function (a, b) { return a[field] - b[field]; });
        }
    };
    OrderByPipe = __decorate([
        core_1.Pipe({
            name: 'orderBy'
        }), 
        __metadata('design:paramtypes', [])
    ], OrderByPipe);
    return OrderByPipe;
}());
exports.OrderByPipe = OrderByPipe;
