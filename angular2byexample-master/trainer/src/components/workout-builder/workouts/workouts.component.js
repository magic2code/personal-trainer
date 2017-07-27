"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var WorkoutsComponent = (function () {
    function WorkoutsComponent(route, router, workoutService) {
        this.route = route;
        this.router = router;
        this.workoutService = workoutService;
        this.workoutList = [];
        this.notFound = false;
    }
    WorkoutsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.route.snapshot.url[1] && this.route.snapshot.url[1].path === 'workout-not-found')
            this.notFound = true;
        this.subscription = this.workoutService.getWorkouts()
            .subscribe(function (workoutList) { return _this.workoutList = workoutList; }, function (err) { return console.error(err); });
    };
    WorkoutsComponent.prototype.onSelect = function (workout) {
        this.router.navigate(['./builder/workout', workout.name]);
    };
    WorkoutsComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    WorkoutsComponent = __decorate([
        core_1.Component({
            selector: 'workouts',
            templateUrl: '/src/components/workout-builder/workouts/workouts.component.html'
        })
    ], WorkoutsComponent);
    return WorkoutsComponent;
}());
exports.WorkoutsComponent = WorkoutsComponent;
