"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var model_1 = require('../../../services/model');
var ExerciseBuilderService = (function () {
    function ExerciseBuilderService(workoutService) {
        this.workoutService = workoutService;
    }
    ExerciseBuilderService.prototype.startBuildingNew = function () {
        this.buildingExercise = new model_1.Exercise("", "", "", "");
        this.newExercise = true;
        return this.buildingExercise;
    };
    ExerciseBuilderService.prototype.startBuildingExisting = function (name) {
        this.newExercise = false;
        return this.workoutService.getExercise(name);
    };
    ExerciseBuilderService.prototype.save = function () {
        var exercise = this.newExercise ?
            this.workoutService.addExercise(this.buildingExercise) :
            this.workoutService.updateExercise(this.buildingExercise);
        this.newExercise = false;
        return exercise;
    };
    ExerciseBuilderService.prototype.delete = function () {
        this.workoutService.deleteExercise(this.buildingExercise.name);
    };
    ExerciseBuilderService.prototype.addVideo = function () {
        if (!this.buildingExercise.videos) {
            this.buildingExercise.videos = [];
        }
        this.buildingExercise.videos.push("");
    };
    ExerciseBuilderService.prototype.canDeleteExercise = function () {
        return !this.newExercise;
    };
    ExerciseBuilderService.prototype.deleteVideo = function (index) {
        if (index >= 0)
            this.buildingExercise.videos.splice(index, 1);
    };
    ExerciseBuilderService = __decorate([
        core_1.Injectable()
    ], ExerciseBuilderService);
    return ExerciseBuilderService;
}());
exports.ExerciseBuilderService = ExerciseBuilderService;
