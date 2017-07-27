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
var model_1 = require('../../services/model');
var workout_history_tracker_1 = require('../../services/workout-history-tracker');
var workout_service_1 = require("../../services/workout-service");
var WorkoutRunnerComponent = (function () {
    function WorkoutRunnerComponent(router, tracker, workoutService) {
        this.router = router;
        this.tracker = tracker;
        this.workoutService = workoutService;
        this.dataLoaded = false;
        this.exercisePaused = new core_1.EventEmitter();
        this.exerciseResumed = new core_1.EventEmitter();
        this.exerciseProgress = new core_1.EventEmitter();
        this.exerciseChanged = new core_1.EventEmitter();
        this.workoutStarted = new core_1.EventEmitter();
        this.workoutComplete = new core_1.EventEmitter();
        this.onKeyPressed = function (event) {
            if (event.which == 80 || event.which == 112) {
                this.pauseResumeToggle();
            }
        };
    }
    WorkoutRunnerComponent.prototype.ngOnInit = function () {
        this.getWorkout(this.workoutName);
    };
    WorkoutRunnerComponent.prototype.ngDoCheck = function () {
        if (!this.dataLoaded) {
            this.start();
        }
    };
    WorkoutRunnerComponent.prototype.getWorkout = function (name) {
        var _this = this;
        this.workoutService.getWorkout(name)
            .subscribe(function (data) {
            _this.workoutPlan = data;
        }, function (err) {
            console.error(err);
        });
    };
    WorkoutRunnerComponent.prototype.start = function () {
        if (this.workoutPlan) {
            this.dataLoaded = true;
            this.restExercise = new model_1.ExercisePlan(new model_1.Exercise("rest", "Relax!", "Relax a bit", "rest.png"), this.workoutPlan.restBetweenExercise);
            this.tracker.startTracking();
            this.workoutTimeRemaining = this.workoutPlan.totalWorkoutDuration();
            this.currentExerciseIndex = 0;
            this.startExercise(this.workoutPlan.exercises[this.currentExerciseIndex]);
            this.workoutStarted.emit(this.workoutPlan);
        }
    };
    WorkoutRunnerComponent.prototype.pause = function () {
        clearInterval(this.exerciseTrackingInterval);
        this.workoutPaused = true;
        this.exercisePaused.emit(this.currentExerciseIndex);
    };
    WorkoutRunnerComponent.prototype.resume = function () {
        this.startExerciseTimeTracking();
        this.workoutPaused = false;
        this.exerciseResumed.emit(this.currentExerciseIndex);
    };
    WorkoutRunnerComponent.prototype.pauseResumeToggle = function () {
        if (this.workoutPaused) {
            this.resume();
        }
        else {
            this.pause();
        }
    };
    WorkoutRunnerComponent.prototype.startExercise = function (exercisePlan) {
        this.currentExercise = exercisePlan;
        this.exerciseRunningDuration = 0;
        this.startExerciseTimeTracking();
    };
    WorkoutRunnerComponent.prototype.getNextExercise = function () {
        var nextExercise = null;
        if (this.currentExercise === this.restExercise) {
            nextExercise = this.workoutPlan.exercises[this.currentExerciseIndex + 1];
        }
        else if (this.currentExerciseIndex < this.workoutPlan.exercises.length - 1) {
            nextExercise = this.restExercise;
        }
        return nextExercise;
    };
    WorkoutRunnerComponent.prototype.startExerciseTimeTracking = function () {
        var _this = this;
        this.exerciseTrackingInterval = window.setInterval(function () {
            if (_this.exerciseRunningDuration >= _this.currentExercise.duration) {
                clearInterval(_this.exerciseTrackingInterval);
                if (_this.currentExercise !== _this.restExercise) {
                    _this.tracker.exerciseComplete(_this.workoutPlan.exercises[_this.currentExerciseIndex]);
                }
                var next = _this.getNextExercise();
                if (next) {
                    if (next !== _this.restExercise) {
                        _this.currentExerciseIndex++;
                    }
                    _this.startExercise(next);
                    _this.exerciseChanged.emit(new model_1.ExerciseChangedEvent(next, _this.getNextExercise()));
                }
                else {
                    _this.tracker.endTracking(true);
                    _this.workoutComplete.emit(_this.workoutPlan);
                    _this.router.navigate(['/finish', _this.workoutName]);
                }
                return;
            }
            ++_this.exerciseRunningDuration;
            --_this.workoutTimeRemaining;
            _this.exerciseProgress.emit(new model_1.ExerciseProgressEvent(_this.currentExercise, _this.exerciseRunningDuration, _this.currentExercise.duration - _this.exerciseRunningDuration, _this.workoutTimeRemaining));
        }, 1000);
    };
    WorkoutRunnerComponent.prototype.ngOnDestroy = function () {
        this.tracker.endTracking(false);
        if (this.exerciseTrackingInterval)
            clearInterval(this.exerciseTrackingInterval);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WorkoutRunnerComponent.prototype, "workoutName", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
    ], WorkoutRunnerComponent.prototype, "exercisePaused", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_b = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _b) || Object)
    ], WorkoutRunnerComponent.prototype, "exerciseResumed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_c = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _c) || Object)
    ], WorkoutRunnerComponent.prototype, "exerciseProgress", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_d = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _d) || Object)
    ], WorkoutRunnerComponent.prototype, "exerciseChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_e = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _e) || Object)
    ], WorkoutRunnerComponent.prototype, "workoutStarted", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_f = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _f) || Object)
    ], WorkoutRunnerComponent.prototype, "workoutComplete", void 0);
    WorkoutRunnerComponent = __decorate([
        core_1.Component({
            selector: 'workout-runner',
            templateUrl: '/src/components/workout-runner/workout-runner.html'
        }), 
        __metadata('design:paramtypes', [(typeof (_g = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _g) || Object, workout_history_tracker_1.WorkoutHistoryTracker, workout_service_1.WorkoutService])
    ], WorkoutRunnerComponent);
    return WorkoutRunnerComponent;
    var _a, _b, _c, _d, _e, _f, _g;
}());
exports.WorkoutRunnerComponent = WorkoutRunnerComponent;
