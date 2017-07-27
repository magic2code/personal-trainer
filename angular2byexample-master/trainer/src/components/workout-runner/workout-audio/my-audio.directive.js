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
var MyAudioDirective = (function () {
    function MyAudioDirective(element) {
        this.audioPlayer = element.nativeElement;
    }
    MyAudioDirective.prototype.stop = function () {
        this.audioPlayer.pause();
    };
    MyAudioDirective.prototype.start = function () {
        this.audioPlayer.play();
    };
    Object.defineProperty(MyAudioDirective.prototype, "currentTime", {
        get: function () {
            return this.audioPlayer.currentTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyAudioDirective.prototype, "duration", {
        get: function () {
            return this.audioPlayer.duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyAudioDirective.prototype, "playbackComplete", {
        get: function () {
            return this.duration == this.currentTime;
        },
        enumerable: true,
        configurable: true
    });
    MyAudioDirective = __decorate([
        core_1.Directive({
            selector: 'audio',
            exportAs: 'MyAudio'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
    ], MyAudioDirective);
    return MyAudioDirective;
    var _a;
}());
exports.MyAudioDirective = MyAudioDirective;
