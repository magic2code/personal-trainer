"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ExercisesComponent = (function () {
    function ExercisesComponent(router, workoutService) {
        this.router = router;
        this.workoutService = workoutService;
    }
    ExercisesComponent.prototype.ngOnInit = function () {
        this.exerciseList = this.workoutService.getExercises();
    };
    ExercisesComponent.prototype.onSelect = function (exercise) {
        this.router.navigate(['./builder/exercise', exercise.name]);
    };
    ExercisesComponent = __decorate([
        core_1.Component({
            selector: 'exercises',
            templateUrl: '/src/components/workout-builder/exercises/exercises.component.html',
        })
    ], ExercisesComponent);
    return ExercisesComponent;
}());
exports.ExercisesComponent = ExercisesComponent;
