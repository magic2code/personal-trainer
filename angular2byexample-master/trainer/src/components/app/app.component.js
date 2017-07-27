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
var angular2_modal_1 = require('angular2-modal');
var TrainerAppComponent = (function () {
    function TrainerAppComponent(overlay, viewContainer) {
        overlay.defaultViewContainer = viewContainer;
    }
    TrainerAppComponent = __decorate([
        core_1.Component({
            selector: 'trainer-app',
            template: "<div class=\"navbar navbar-default navbar-fixed-top top-navbar\">\n                <div class=\"container app-container\">\n                  <header></header>\n                </div>\n             </div>\n             <div class=\"container body-content app-container\">\n                <router-outlet></router-outlet>\n             </div>"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof angular2_modal_1.Overlay !== 'undefined' && angular2_modal_1.Overlay) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ViewContainerRef !== 'undefined' && core_1.ViewContainerRef) === 'function' && _b) || Object])
    ], TrainerAppComponent);
    return TrainerAppComponent;
    var _a, _b;
}());
exports.TrainerAppComponent = TrainerAppComponent;
