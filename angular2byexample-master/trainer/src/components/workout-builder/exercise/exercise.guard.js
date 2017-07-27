"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Rx_1 = require("rxjs/Rx");
var ExerciseGuard = (function () {
    function ExerciseGuard(workoutService, router) {
        this.workoutService = workoutService;
        this.router = router;
    }
    ExerciseGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        var exerciseName = route.params['id'];
        return this.workoutService.getExercise(exerciseName)
            .take(1)
            .map(function (exercise) { return !!exercise; })
            .do(function (exerciseExists) {
            if (!exerciseExists)
                _this.router.navigate(['/builder/exercises']);
        })
            .catch(function (error) {
            if (error.status === 404) {
                _this.router.navigate(['/builder/exercises']);
                return Rx_1.Observable.of(false);
            }
            else {
                return Rx_1.Observable.throw(error);
            }
        });
    };
    ExerciseGuard = __decorate([
        core_1.Injectable()
    ], ExerciseGuard);
    return ExerciseGuard;
}());
exports.ExerciseGuard = ExerciseGuard;
