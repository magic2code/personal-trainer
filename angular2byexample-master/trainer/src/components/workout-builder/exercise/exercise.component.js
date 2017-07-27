"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var alphanumeric_validator_1 = require("../alphanumeric-validator");
var ExerciseComponent = (function () {
    function ExerciseComponent(route, router, exerciseBuilderService, formBuilder) {
        this.route = route;
        this.router = router;
        this.exerciseBuilderService = exerciseBuilderService;
        this.formBuilder = formBuilder;
        this.submitted = false;
        this.videoArray = new forms_1.FormArray([]);
        this.dataLoaded = false;
    }
    ExerciseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (!params['id']) {
                _this.exercise = _this.exerciseBuilderService.startBuildingNew();
            }
            else {
                var exerciseName = params['id'];
                _this.exerciseBuilderService.startBuildingExisting(exerciseName)
                    .subscribe(function (data) {
                    _this.exercise = data;
                    if (!_this.exercise) {
                        _this.router.navigate(['/builder/exercises']);
                    }
                    else {
                        _this.exerciseBuilderService.buildingExercise = _this.exercise;
                    }
                }, function (err) {
                    if (err.status === 404) {
                        _this.router.navigate(['/builder/exercises']);
                    }
                    else {
                        console.error(err);
                    }
                });
            }
        });
    };
    ExerciseComponent.prototype.ngDoCheck = function () {
        if (!this.dataLoaded) {
            this.buildExerciseForm();
        }
    };
    ExerciseComponent.prototype.buildExerciseForm = function () {
        if (this.exercise) {
            this.dataLoaded = true;
            this.exerciseForm = this.formBuilder.group({
                'name': [this.exercise.name, [forms_1.Validators.required, alphanumeric_validator_1.AlphaNumericValidator.invalidAlphaNumeric]],
                'title': [this.exercise.title, forms_1.Validators.required],
                'description': [this.exercise.description, forms_1.Validators.required],
                'image': [this.exercise.image, forms_1.Validators.required],
                'nameSound': [this.exercise.nameSound],
                'procedure': [this.exercise.procedure],
                'videos': this.addVideoArray()
            });
        }
    };
    ExerciseComponent.prototype.addVideoArray = function () {
        var _this = this;
        if (this.exercise.videos) {
            this.exercise.videos.forEach(function (video) {
                _this.videoArray.push(new forms_1.FormControl(video, forms_1.Validators.required));
            });
        }
        return this.videoArray;
    };
    ExerciseComponent.prototype.onSubmit = function (formExercise) {
        this.submitted = true;
        if (!formExercise.valid)
            return;
        this.mapFormValues(formExercise);
        this.exerciseBuilderService.save();
        this.router.navigate(['/builder/exercises']);
    };
    ExerciseComponent.prototype.delete = function () {
        this.exerciseBuilderService.delete();
        this.router.navigate(['/builder/exercises']);
    };
    ExerciseComponent.prototype.addVideo = function () {
        this.exerciseBuilderService.addVideo();
        var vidArray = this.exerciseForm.controls['videos'];
        vidArray.push(new forms_1.FormControl("", forms_1.Validators.required));
    };
    ExerciseComponent.prototype.canDeleteExercise = function () {
        this.exerciseBuilderService.canDeleteExercise();
    };
    ExerciseComponent.prototype.deleteVideo = function (index) {
        this.exerciseBuilderService.deleteVideo(index);
        var vidArray = this.exerciseForm.controls['videos'];
        vidArray.removeAt(index);
    };
    ExerciseComponent.prototype.mapFormValues = function (form) {
        this.exercise.name = form.controls['name'].value;
        this.exercise.title = form.controls['title'].value;
        this.exercise.description = form.controls['description'].value;
        this.exercise.image = form.controls['image'].value;
        this.exercise.nameSound = form.controls['nameSound'].value;
        this.exercise.procedure = form.controls['procedure'].value;
        this.exercise.videos = form.controls['videos'].value;
    };
    ExerciseComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ExerciseComponent = __decorate([
        core_1.Component({
            selector: 'exercise',
            templateUrl: '/src/components/workout-builder/exercise/exercise.component.html',
        })
    ], ExerciseComponent);
    return ExerciseComponent;
}());
exports.ExerciseComponent = ExerciseComponent;
