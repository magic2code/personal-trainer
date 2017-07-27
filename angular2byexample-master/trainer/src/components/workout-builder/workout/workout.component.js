"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var WorkoutComponent = (function () {
    function WorkoutComponent(route, router, workoutBuilderService, workoutService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.workoutBuilderService = workoutBuilderService;
        this.workoutService = workoutService;
        this.submitted = false;
        this.removeTouched = false;
        this.isExistingWorkout = false;
        this.save = function (formWorkout) {
            _this.submitted = true;
            if (!formWorkout.valid)
                return;
            var savePromise = _this.workoutBuilderService.save().toPromise();
            savePromise.then(function (data) { return _this.router.navigate(['/builder/workouts']); }, function (err) { return console.error(err); });
            return savePromise;
        };
        this.validateWorkoutName = function (name) {
            if (_this.workoutName === name)
                return Promise.resolve(true);
            return _this.workoutService.getWorkout(name)
                .toPromise()
                .then(function (workout) {
                return !workout;
            }, function (error) {
                return true;
            });
        };
        this.durations = [{ title: "15 seconds", value: 15 },
            { title: "30 seconds", value: 30 },
            { title: "45 seconds", value: 45 },
            { title: "1 minute", value: 60 },
            { title: "1 minute 15 seconds", value: 75 },
            { title: "1 minute 30 seconds", value: 90 },
            { title: "1 minute 45 seconds", value: 105 },
            { title: "2 minutes", value: 120 },
            { title: "2 minutes 15 seconds", value: 135 },
            { title: "2 minutes 30 seconds", value: 150 },
            { title: "2 minutes 45 seconds", value: 165 },
            { title: "3 minutes", value: 180 },
            { title: "3 minutes 15 seconds", value: 195 },
            { title: "3 minutes 30 seconds", value: 210 },
            { title: "3 minutes 45 seconds", value: 225 },
            { title: "4 minutes", value: 240 },
            { title: "4 minutes 15 seconds", value: 255 },
            { title: "4 minutes 30 seconds", value: 270 },
            { title: "4 minutes 45 seconds", value: 285 },
            { title: "5 minutes", value: 300 }];
    }
    WorkoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (!params['id']) {
                _this.workout = _this.workoutBuilderService.startBuildingNew();
            }
            else {
                _this.workoutName = params['id'];
                _this.isExistingWorkout = true;
                _this.workoutBuilderService.startBuildingExisting(_this.workoutName)
                    .subscribe(function (data) {
                    _this.workout = data;
                    if (!_this.workout) {
                        _this.router.navigate(['/builder/workouts/workout-not-found']);
                    }
                    else {
                        _this.workoutBuilderService.buildingWorkout = _this.workout;
                    }
                }, function (err) {
                    if (err.status === 404) {
                        _this.router.navigate(['/builder/workouts/workout-not-found']);
                    }
                    else {
                        console.error(err);
                    }
                });
            }
        });
    };
    WorkoutComponent.prototype.addExercise = function (exercisePlan) {
        this.workoutBuilderService.addExercise(exercisePlan);
    };
    WorkoutComponent.prototype.moveExerciseTo = function (exercisePlan, location) {
        this.workoutBuilderService.moveExerciseTo(exercisePlan, location);
    };
    WorkoutComponent.prototype.removeExercise = function (exercisePlan) {
        this.removeTouched = true;
        this.workoutBuilderService.removeExercise(exercisePlan);
    };
    WorkoutComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    WorkoutComponent = __decorate([
        core_1.Component({
            selector: 'workout',
            templateUrl: '/src/components/workout-builder/workout/workout.component.html'
        })
    ], WorkoutComponent);
    return WorkoutComponent;
}());
exports.WorkoutComponent = WorkoutComponent;
