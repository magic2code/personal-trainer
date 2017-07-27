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
var router_1 = require('@angular/router');
var workout_service_1 = require("../../services/workout-service");
var StartComponent = (function () {
    function StartComponent(router, workoutService) {
        this.router = router;
        this.workoutService = workoutService;
        this.workoutList = [];
        this.notFound = false;
    }
    StartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.workoutService.getWorkouts()
            .subscribe(function (workoutList) { return _this.workoutList = workoutList; }, function (err) { return console.error(err); });
    };
    StartComponent.prototype.onSelect = function (workout) {
        this.router.navigate(['/workout', workout.name]);
    };
    StartComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    StartComponent = __decorate([
        core_1.Component({
            selector: 'start',
            templateUrl: '/src/components/start/start.html',
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, workout_service_1.WorkoutService])
    ], StartComponent);
    return StartComponent;
    var _a;
}());
exports.StartComponent = StartComponent;
