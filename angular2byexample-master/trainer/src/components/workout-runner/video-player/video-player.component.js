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
var bootstrap_1 = require('angular2-modal/plugins/bootstrap');
var angular2_modal_1 = require('angular2-modal');
var video_dialog_component_1 = require('./video-dialog.component');
var VideoPlayerComponent = (function () {
    function VideoPlayerComponent(modal) {
        this.modal = modal;
        this.playbackStarted = new core_1.EventEmitter();
        this.playbackEnded = new core_1.EventEmitter();
    }
    VideoPlayerComponent.prototype.playVideo = function (videoId) {
        var _this = this;
        this.playbackStarted.emit(null);
        var dialog = this.modal.open(video_dialog_component_1.VideoDialogComponent, angular2_modal_1.overlayConfigFactory(new video_dialog_component_1.VideoDialogContext(videoId)));
        dialog
            .then(function (d) { return d.result; })
            .then(function () { _this.playbackEnded.emit(null); }, function (error) { _this.playbackEnded.emit(null); });
    };
    ;
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], VideoPlayerComponent.prototype, "videos", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
    ], VideoPlayerComponent.prototype, "playbackStarted", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_b = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _b) || Object)
    ], VideoPlayerComponent.prototype, "playbackEnded", void 0);
    VideoPlayerComponent = __decorate([
        core_1.Component({
            selector: 'video-player',
            templateUrl: '/src/components/workout-runner/video-player/video-player.html'
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof bootstrap_1.Modal !== 'undefined' && bootstrap_1.Modal) === 'function' && _c) || Object])
    ], VideoPlayerComponent);
    return VideoPlayerComponent;
    var _a, _b, _c;
}());
exports.VideoPlayerComponent = VideoPlayerComponent;
