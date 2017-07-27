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
var local_storage_1 = require('./local-storage');
var core_1 = require('@angular/core');
var WorkoutHistoryTracker = (function () {
    function WorkoutHistoryTracker(storage) {
        this.storage = storage;
        this.maxHistoryItems = 20;
        this.currentWorkoutLog = null;
        this.workoutHistory = [];
        this.storageKey = "workouts";
        this.workoutHistory = (storage.getItem(this.storageKey) || [])
            .map(function (item) {
            item.startedOn = new Date(item.startedOn.toString());
            item.endedOn = item.endedOn == null ? null : new Date(item.endedOn.toString());
            return item;
        });
    }
    Object.defineProperty(WorkoutHistoryTracker.prototype, "tracking", {
        get: function () {
            return this.workoutTracked;
        },
        enumerable: true,
        configurable: true
    });
    WorkoutHistoryTracker.prototype.startTracking = function () {
        this.workoutTracked = true;
        this.currentWorkoutLog = new WorkoutLogEntry(new Date());
        if (this.workoutHistory.length >= this.maxHistoryItems) {
            this.workoutHistory.shift();
        }
        this.workoutHistory.push(this.currentWorkoutLog);
        this.storage.setItem(this.storageKey, this.workoutHistory);
    };
    WorkoutHistoryTracker.prototype.exerciseComplete = function (exercise) {
        this.currentWorkoutLog.lastExercise = exercise.exercise.title;
        ++this.currentWorkoutLog.exercisesDone;
        this.storage.setItem(this.storageKey, this.workoutHistory);
    };
    WorkoutHistoryTracker.prototype.endTracking = function (completed) {
        this.currentWorkoutLog.completed = completed;
        this.currentWorkoutLog.endedOn = new Date();
        this.currentWorkoutLog = null;
        this.workoutTracked = false;
        this.storage.setItem(this.storageKey, this.workoutHistory);
    };
    ;
    WorkoutHistoryTracker.prototype.getHistory = function () {
        return this.workoutHistory;
    };
    WorkoutHistoryTracker = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [local_storage_1.LocalStorage])
    ], WorkoutHistoryTracker);
    return WorkoutHistoryTracker;
}());
exports.WorkoutHistoryTracker = WorkoutHistoryTracker;
var WorkoutLogEntry = (function () {
    function WorkoutLogEntry(startedOn, completed, exercisesDone, lastExercise, endedOn) {
        if (completed === void 0) { completed = false; }
        if (exercisesDone === void 0) { exercisesDone = 0; }
        this.startedOn = startedOn;
        this.completed = completed;
        this.exercisesDone = exercisesDone;
        this.lastExercise = lastExercise;
        this.endedOn = endedOn;
    }
    return WorkoutLogEntry;
}());
exports.WorkoutLogEntry = WorkoutLogEntry;
