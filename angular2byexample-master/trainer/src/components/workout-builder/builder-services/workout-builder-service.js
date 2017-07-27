"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var model_1 = require('../../../services/model');
var WorkoutBuilderService = (function () {
    function WorkoutBuilderService(workoutService) {
        this.workoutService = workoutService;
        this.firstExercise = true;
    }
    WorkoutBuilderService.prototype.startBuildingNew = function () {
        var exerciseArray = [];
        this.buildingWorkout = new model_1.WorkoutPlan("", "", 30, exerciseArray);
        this.newWorkout = true;
        return this.buildingWorkout;
    };
    WorkoutBuilderService.prototype.startBuildingExisting = function (name) {
        this.newWorkout = false;
        return this.workoutService.getWorkout(name);
    };
    WorkoutBuilderService.prototype.removeExercise = function (exercise) {
        var currentIndex = this.buildingWorkout.exercises.map(function (e) { return e.exercise.name; }).indexOf(exercise.exercise.name);
        this.buildingWorkout.exercises.splice(currentIndex, 1);
    };
    WorkoutBuilderService.prototype.addExercise = function (exercisePlan) {
        if (this.newWorkout && this.firstExercise) {
            this.buildingWorkout.exercises.splice(0, 1);
            this.firstExercise = false;
        }
        this.buildingWorkout.exercises.push(exercisePlan);
    };
    WorkoutBuilderService.prototype.moveExerciseTo = function (exercise, toIndex) {
        if (toIndex < 0 || toIndex >= this.buildingWorkout.exercises.length)
            return;
        var currentIndex = this.buildingWorkout.exercises.indexOf(exercise);
        this.buildingWorkout.exercises.splice(toIndex, 0, this.buildingWorkout.exercises.splice(currentIndex, 1)[0]);
    };
    WorkoutBuilderService.prototype.save = function () {
        var workout = this.newWorkout ?
            this.workoutService.addWorkout(this.buildingWorkout) :
            this.workoutService.updateWorkout(this.buildingWorkout);
        this.newWorkout = false;
        return workout;
    };
    WorkoutBuilderService = __decorate([
        core_1.Injectable()
    ], WorkoutBuilderService);
    return WorkoutBuilderService;
}());
exports.WorkoutBuilderService = WorkoutBuilderService;
