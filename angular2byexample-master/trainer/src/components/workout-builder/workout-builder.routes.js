"use strict";
var router_1 = require('@angular/router');
var exercise_guard_1 = require("./exercise/exercise.guard");
var workout_guard_1 = require("./workout/workout.guard");
var workout_builder_component_1 = require("./workout-builder.component");
var exercise_component_1 = require('./exercise/exercise.component');
var exercises_component_1 = require('./exercises/exercises.component');
var workout_component_1 = require('./workout/workout.component');
var workouts_component_1 = require('./workouts/workouts.component');
exports.workoutBuilderRoutes = [
    {
        path: '',
        component: workout_builder_component_1.WorkoutBuilderComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'workouts' },
            { path: 'workouts/workout-not-found', component: workouts_component_1.WorkoutsComponent },
            { path: 'workouts', component: workouts_component_1.WorkoutsComponent },
            { path: 'workout/new', component: workout_component_1.WorkoutComponent },
            { path: 'workout/:id', component: workout_component_1.WorkoutComponent, canActivate: [workout_guard_1.WorkoutGuard] },
            { path: 'exercises', component: exercises_component_1.ExercisesComponent },
            { path: 'exercise/new', component: exercise_component_1.ExerciseComponent },
            { path: 'exercise/:id', component: exercise_component_1.ExerciseComponent, canActivate: [exercise_guard_1.ExerciseGuard] }
        ]
    }
];
exports.workoutBuilderRouting = router_1.RouterModule.forChild(exports.workoutBuilderRoutes);
