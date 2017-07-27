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
var my_audio_directive_1 = require('./my-audio.directive');
var WorkoutAudioComponent = (function () {
    function WorkoutAudioComponent() {
    }
    WorkoutAudioComponent.prototype.stop = function () {
        this.ticks.stop();
        this.nextUp.stop();
        this.halfway.stop();
        this.aboutToComplete.stop();
        this.nextUpExercise.stop();
    };
    WorkoutAudioComponent.prototype.resume = function () {
        this.ticks.start();
        if (this.nextUp.currentTime > 0 && !this.nextUp.playbackComplete)
            this.nextUp.start();
        else if (this.nextUpExercise.currentTime > 0 && !this.nextUpExercise.playbackComplete)
            this.nextUpExercise.start();
        else if (this.halfway.currentTime > 0 && !this.halfway.playbackComplete)
            this.halfway.start();
        else if (this.aboutToComplete.currentTime > 0 && !this.aboutToComplete.playbackComplete)
            this.aboutToComplete.start();
    };
    WorkoutAudioComponent.prototype.onExerciseProgress = function (progress) {
        if (progress.runningFor == Math.floor(progress.exercise.duration / 2)
            && progress.exercise.exercise.name != "rest") {
            this.halfway.start();
        }
        else if (progress.timeRemaining == 3) {
            this.aboutToComplete.start();
        }
    };
    WorkoutAudioComponent.prototype.onExerciseChanged = function (state) {
        var _this = this;
        if (state.current.exercise.name == "rest") {
            this.nextupSound = state.next.exercise.nameSound;
            setTimeout(function () { return _this.nextUp.start(); }, 2000);
            setTimeout(function () { return _this.nextUpExercise.start(); }, 3000);
        }
    };
    __decorate([
        core_1.ViewChild('ticks'), 
        __metadata('design:type', my_audio_directive_1.MyAudioDirective)
    ], WorkoutAudioComponent.prototype, "ticks", void 0);
    __decorate([
        core_1.ViewChild('nextUp'), 
        __metadata('design:type', my_audio_directive_1.MyAudioDirective)
    ], WorkoutAudioComponent.prototype, "nextUp", void 0);
    __decorate([
        core_1.ViewChild('nextUpExercise'), 
        __metadata('design:type', my_audio_directive_1.MyAudioDirective)
    ], WorkoutAudioComponent.prototype, "nextUpExercise", void 0);
    __decorate([
        core_1.ViewChild('halfway'), 
        __metadata('design:type', my_audio_directive_1.MyAudioDirective)
    ], WorkoutAudioComponent.prototype, "halfway", void 0);
    __decorate([
        core_1.ViewChild('aboutToComplete'), 
        __metadata('design:type', my_audio_directive_1.MyAudioDirective)
    ], WorkoutAudioComponent.prototype, "aboutToComplete", void 0);
    WorkoutAudioComponent = __decorate([
        core_1.Component({
            selector: 'workout-audio',
            templateUrl: '/src/components/workout-runner/workout-audio/workout-audio.html'
        }), 
        __metadata('design:paramtypes', [])
    ], WorkoutAudioComponent);
    return WorkoutAudioComponent;
}());
exports.WorkoutAudioComponent = WorkoutAudioComponent;
