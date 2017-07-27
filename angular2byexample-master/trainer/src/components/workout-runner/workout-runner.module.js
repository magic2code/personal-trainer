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
var shared_module_1 = require("../shared/shared.module");
var platform_browser_1 = require('@angular/platform-browser');
var workout_runner_component_1 = require('./workout-runner.component');
var workout_container_component_1 = require('./workout-container/workout-container.component');
var exercise_description_component_1 = require('./exercise-description/exercise-description.component');
var video_player_component_1 = require('./video-player/video-player.component');
var video_dialog_component_1 = require('./video-player/video-dialog.component');
var workout_audio_component_1 = require('./workout-audio/workout-audio.component');
var my_audio_directive_1 = require('./workout-audio/my-audio.directive');
var WorkoutRunnerModule = (function () {
    function WorkoutRunnerModule() {
    }
    WorkoutRunnerModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                shared_module_1.SharedModule],
            declarations: [
                workout_runner_component_1.WorkoutRunnerComponent,
                exercise_description_component_1.ExerciseDescriptionComponent,
                video_player_component_1.VideoPlayerComponent,
                video_dialog_component_1.VideoDialogComponent,
                workout_container_component_1.WorkoutContainerCompnent,
                workout_audio_component_1.WorkoutAudioComponent,
                my_audio_directive_1.MyAudioDirective],
            exports: [workout_container_component_1.WorkoutContainerCompnent],
            entryComponents: [video_dialog_component_1.VideoDialogComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], WorkoutRunnerModule);
    return WorkoutRunnerModule;
}());
exports.WorkoutRunnerModule = WorkoutRunnerModule;
