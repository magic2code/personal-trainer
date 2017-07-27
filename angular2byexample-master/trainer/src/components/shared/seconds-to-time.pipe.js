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
var SecondsToTimePipe = (function () {
    function SecondsToTimePipe() {
    }
    SecondsToTimePipe.prototype.transform = function (value) {
        if (!isNaN(value)) {
            var hours = Math.floor(value / 3600);
            var minutes = Math.floor((value - (hours * 3600)) / 60);
            var seconds = value - (hours * 3600) - (minutes * 60);
            return ("0" + hours).substr(-2) + ':'
                + ("0" + minutes).substr(-2) + ':'
                + ("0" + seconds).substr(-2);
        }
        return;
    };
    SecondsToTimePipe = __decorate([
        core_1.Pipe({
            name: 'secondsToTime'
        }), 
        __metadata('design:paramtypes', [])
    ], SecondsToTimePipe);
    return SecondsToTimePipe;
}());
exports.SecondsToTimePipe = SecondsToTimePipe;
