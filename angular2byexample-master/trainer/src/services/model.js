"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var WorkoutPlan = (function () {
    function WorkoutPlan(name, title, restBetweenExercise, exercises, description) {
        this.name = name;
        this.title = title;
        this.restBetweenExercise = restBetweenExercise;
        this.exercises = exercises;
        this.description = description;
    }
    WorkoutPlan.prototype.totalWorkoutDuration = function () {
        if (!this.exercises)
            return 0;
        var total = this.exercises.map(function (e) { return e.duration; }).reduce(function (previous, current) { return parseInt(previous) + parseInt(current); });
        return ((this.restBetweenExercise ? this.restBetweenExercise : 0) * (this.exercises.length - 1)) + total;
    };
    WorkoutPlan = __decorate([
        core_1.Injectable()
    ], WorkoutPlan);
    return WorkoutPlan;
}());
exports.WorkoutPlan = WorkoutPlan;
var ExercisePlan = (function () {
    function ExercisePlan(exercise, duration) {
        this.exercise = exercise;
        this.duration = duration;
    }
    ExercisePlan = __decorate([
        core_1.Injectable()
    ], ExercisePlan);
    return ExercisePlan;
}());
exports.ExercisePlan = ExercisePlan;
var Exercise = (function () {
    function Exercise(name, title, description, image, nameSound, procedure, videos) {
        this.name = name;
        this.title = title;
        this.description = description;
        this.image = image;
        this.nameSound = nameSound;
        this.procedure = procedure;
        this.videos = videos;
    }
    return Exercise;
}());
exports.Exercise = Exercise;
var ExerciseProgressEvent = (function () {
    function ExerciseProgressEvent(exercise, runningFor, timeRemaining, workoutTimeRemaining) {
        this.exercise = exercise;
        this.runningFor = runningFor;
        this.timeRemaining = timeRemaining;
        this.workoutTimeRemaining = workoutTimeRemaining;
    }
    return ExerciseProgressEvent;
}());
exports.ExerciseProgressEvent = ExerciseProgressEvent;
var ExerciseChangedEvent = (function () {
    function ExerciseChangedEvent(current, next) {
        this.current = current;
        this.next = next;
    }
    return ExerciseChangedEvent;
}());
exports.ExerciseChangedEvent = ExerciseChangedEvent;
