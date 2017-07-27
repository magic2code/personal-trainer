"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Rx_1 = require("rxjs/Rx");
var WorkoutGuard = (function () {
    function WorkoutGuard(workoutService, router) {
        this.workoutService = workoutService;
        this.router = router;
    }
    WorkoutGuard.prototype.canActivate = function (route) {
        var _this = this;
        var workoutName = route.params['id'];
        return this.workoutService.getWorkout(workoutName)
            .take(1)
            .map(function (workout) { return !!workout; })
            .do(function (workoutExists) {
            if (!workoutExists)
                _this.router.navigate(['/builder/workouts/workout-not-found']);
        })
            .catch(function (error) {
            if (error.status === 404) {
                _this.router.navigate(['/builder/workouts/workout-not-found']);
                return Rx_1.Observable.of(false);
            }
            else {
                return Rx_1.Observable.throw(error);
            }
        });
    };
    WorkoutGuard = __decorate([
        core_1.Injectable()
    ], WorkoutGuard);
    return WorkoutGuard;
}());
exports.WorkoutGuard = WorkoutGuard;
