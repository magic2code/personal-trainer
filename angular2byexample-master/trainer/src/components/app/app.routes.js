"use strict";
var router_1 = require('@angular/router');
var workout_container_component_1 = require('../workout-runner/workout-container/workout-container.component');
var start_component_1 = require('../start/start.component');
var finish_component_1 = require('../finish/finish.component');
var workout_history_component_1 = require('../workout-history/workout-history.component');
var workoutBuilderRoutes = [
    {
        path: 'builder',
        loadChildren: 'dist/components/workout-builder/workout-builder.module#WorkoutBuilderModule'
    }
];
exports.routes = [
    { path: 'start', component: start_component_1.StartComponent },
    { path: 'workout/:id', component: workout_container_component_1.WorkoutContainerCompnent },
    { path: 'finish', component: finish_component_1.FinishComponent },
    { path: 'history', component: workout_history_component_1.WorkoutHistoryComponent }
].concat(workoutBuilderRoutes, [
    { path: '**', redirectTo: '/start' }
]);
exports.routing = router_1.RouterModule.forRoot(exports.routes);
