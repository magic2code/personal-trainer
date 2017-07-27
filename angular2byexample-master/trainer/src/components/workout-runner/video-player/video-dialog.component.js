"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var angular2_modal_1 = require('angular2-modal');
var bootstrap_1 = require('angular2-modal/plugins/bootstrap');
var platform_browser_1 = require('@angular/platform-browser');
var VideoDialogContext = (function (_super) {
    __extends(VideoDialogContext, _super);
    function VideoDialogContext(videoId) {
        _super.call(this);
        this.videoId = videoId;
        this.size = "sm";
    }
    return VideoDialogContext;
}(bootstrap_1.BSModalContext));
exports.VideoDialogContext = VideoDialogContext;
var VideoDialogComponent = (function () {
    function VideoDialogComponent(dialog, sanitizer) {
        this.dialog = dialog;
        this.sanitizer = sanitizer;
        this.youtubeUrlPrefix = '//www.youtube.com/embed/';
    }
    VideoDialogComponent.prototype.ngOnInit = function () {
        this.videoId = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeUrlPrefix + this.dialog.context.videoId);
    };
    VideoDialogComponent.prototype.ok = function () {
        this.dialog.close();
    };
    VideoDialogComponent = __decorate([
        core_1.Component({
            selector: 'video-dialog',
            template: "<div class=\"modal-header\">\n                <h3 class=\"modal-title\">Workout Video</h3>\n            </div>\n            <div class=\"modal-body\">\n                <iframe width=\"100%\" height=\"480\" [src]=\"videoId\" frameborder=\"0\" allowfullscreen></iframe>\n            </div>\n            <div class=\"modal-footer\">\n                <button class=\"btn btn-primary\" (click)=\"ok()\">OK</button>\n            </div>",
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof angular2_modal_1.DialogRef !== 'undefined' && angular2_modal_1.DialogRef) === 'function' && _a) || Object, (typeof (_b = typeof platform_browser_1.DomSanitizer !== 'undefined' && platform_browser_1.DomSanitizer) === 'function' && _b) || Object])
    ], VideoDialogComponent);
    return VideoDialogComponent;
    var _a, _b;
}());
exports.VideoDialogComponent = VideoDialogComponent;
