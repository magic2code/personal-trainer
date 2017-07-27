"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/forkJoin');
require('rxjs/add/operator/toPromise');
var model_1 = require('./model');
var WorkoutService = (function () {
    function WorkoutService(http) {
        this.http = http;
        this.workouts = [];
        this.exercises = [];
        this.collectionsUrl = 'https://api.mongolab.com/api/1/databases/personaltrainer/collections';
        this.apiKey = '9xfTWt1ilKhqIqzV9Z_8jvCzo5ksjexx';
        this.params = '?apiKey=' + this.apiKey;
    }
    WorkoutService.prototype.getExercises = function () {
        return this.http.get(this.collectionsUrl + '/exercises' + this.params)
            .map(function (res) { return res.json(); })
            .catch(WorkoutService.handleError);
    };
    WorkoutService.prototype.getExercise = function (exerciseName) {
        return this.http.get(this.collectionsUrl + '/exercises/' + exerciseName + this.params)
            .map(function (res) { return res.json(); })
            .catch(WorkoutService.handleError);
    };
    WorkoutService.prototype.updateExercise = function (exercise) {
        for (var i = 0; i < this.exercises.length; i++) {
            if (this.exercises[i].name === exercise.name) {
                this.exercises[i] = exercise;
            }
        }
        return exercise;
    };
    WorkoutService.prototype.addExercise = function (exercise) {
        if (exercise.name) {
            this.exercises.push(exercise);
            return exercise;
        }
    };
    WorkoutService.prototype.deleteExercise = function (exerciseName) {
        var exerciseIndex;
        for (var i = 0; i < this.exercises.length; i++) {
            if (this.exercises[i].name === exerciseName) {
                exerciseIndex = i;
            }
        }
        if (exerciseIndex >= 0)
            this.exercises.splice(exerciseIndex, 1);
    };
    WorkoutService.prototype.getWorkouts = function () {
        return this.http.get(this.collectionsUrl + '/workouts' + this.params)
            .map(function (res) { return res.json(); })
            .map(function (workouts) {
            var result = [];
            if (workouts) {
                workouts.forEach(function (workout) {
                    result.push(new model_1.WorkoutPlan(workout.name, workout.title, workout.restBetweenExercise, workout.exercises, workout.description));
                });
            }
            return result;
        })
            .catch(WorkoutService.handleError);
    };
    WorkoutService.prototype.getWorkout = function (workoutName) {
        return Observable_1.Observable.forkJoin(this.http.get(this.collectionsUrl + '/exercises' + this.params).map(function (res) { return res.json(); }), this.http.get(this.collectionsUrl + '/workouts/' + workoutName + this.params).map(function (res) { return res.json(); })).map(function (data) {
            var allExercises = data[0];
            var workout = new model_1.WorkoutPlan(data[1].name, data[1].title, data[1].restBetweenExercise, data[1].exercises, data[1].description);
            workout.exercises.forEach(function (exercisePlan) { return exercisePlan.exercise = allExercises.find(function (x) { return x.name === exercisePlan.name; }); });
            return workout;
        })
            .catch(WorkoutService.handleError);
    };
    WorkoutService.prototype.addWorkout = function (workout) {
        var workoutExercises = [];
        workout.exercises.forEach(function (exercisePlan) {
            workoutExercises.push({ name: exercisePlan.exercise.name, duration: exercisePlan.duration });
        });
        var body = {
            "_id": workout.name,
            "exercises": workoutExercises,
            "name": workout.name,
            "title": workout.title,
            "description": workout.description,
            "restBetweenExercise": workout.restBetweenExercise
        };
        return this.http.post(this.collectionsUrl + '/workouts' + this.params, body)
            .map(function (res) { return res.json(); })
            .catch(WorkoutService.handleError);
    };
    WorkoutService.prototype.updateWorkout = function (workout) {
        var workoutExercises = [];
        workout.exercises.forEach(function (exercisePlan) {
            workoutExercises.push({ name: exercisePlan.exercise.name, duration: exercisePlan.duration });
        });
        var body = {
            "_id": workout.name,
            "exercises": workoutExercises,
            "name": workout.name,
            "title": workout.title,
            "description": workout.description,
            "restBetweenExercise": workout.restBetweenExercise
        };
        return this.http.put(this.collectionsUrl + '/workouts/' + workout.name + this.params, body)
            .map(function (res) { return res.json(); })
            .catch(WorkoutService.handleError);
    };
    WorkoutService.prototype.deleteWorkout = function (workoutName) {
        return this.http.delete(this.collectionsUrl + '/workouts/' + workoutName + this.params)
            .map(function (res) { return res.json(); })
            .catch(WorkoutService.handleError);
    };
    WorkoutService.handleError = function (error) {
        console.log(error);
        return Observable_1.Observable.throw(error || 'Server error');
    };
    WorkoutService = __decorate([
        core_1.Injectable()
    ], WorkoutService);
    return WorkoutService;
}());
exports.WorkoutService = WorkoutService;
