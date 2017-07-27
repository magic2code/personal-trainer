"use strict";
var testing_1 = require('@angular/core/testing');
var http_1 = require('@angular/http');
var testing_2 = require('@angular/http/testing');
require('rxjs/add/observable/of');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/do');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/map');
require('rxjs/add/observable/forkJoin');
var workout_service_1 = require('./workout-service');
var model_1 = require("./model");
var makeWorkoutData = function () { return [
    { name: "Workout1", title: "workout1" },
    { name: "Workout2", title: "workout2" },
    { name: "Workout3", title: "workout3" },
    { name: "Workout4", title: "workout4" }
]; };
describe('Workout Service', function () {
    var collectionUrl = 'https://api.mongolab.com/api/1/databases/personaltrainer/collections';
    var apiKey = '9xfTWt1ilKhqIqzV9Z_8jvCzo5ksjexx';
    var params = '?apiKey=' + apiKey;
    var workoutService;
    var mockBackend;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                workout_service_1.WorkoutService,
                { provide: http_1.XHRBackend, useClass: testing_2.MockBackend }
            ]
        });
    }));
    it('can instantiate service when inject service', testing_1.inject([workout_service_1.WorkoutService], function (service) {
        expect(service instanceof workout_service_1.WorkoutService).toBe(true);
    }));
    it('can instantiate service with "new"', testing_1.inject([http_1.Http], function (http) {
        expect(http).not.toBeNull('http should be provided');
        var service = new workout_service_1.WorkoutService(http);
        expect(service instanceof workout_service_1.WorkoutService).toBe(true, 'new service should be ok');
    }));
    it('can provide the mockBackend as XHRBackend', testing_1.inject([http_1.XHRBackend], function (backend) {
        expect(backend).not.toBeNull('backend should be provided');
    }));
    it("should return all workout plans", testing_1.fakeAsync((testing_1.inject([http_1.XHRBackend, workout_service_1.WorkoutService], function (backend, service) {
        var result;
        backend.connections.subscribe(function (connection) {
            expect(connection.request.url).toBe(collectionUrl + "/workouts" + params);
            var response = new http_1.ResponseOptions({ body: '[{ "name": "Workout1", "title": "workout1" }, { "name": "Workout1", "title": "workout1" }]' });
            connection.mockRespond(new http_1.Response(response));
        });
        service.getWorkouts().subscribe(function (response) {
            result = response;
        });
        expect(result.length).toBe(2);
        expect(result[0] instanceof model_1.WorkoutPlan).toBe(true);
    }))));
    it("should return a workout plan with a specific name", testing_1.fakeAsync((testing_1.inject([http_1.XHRBackend, workout_service_1.WorkoutService], function (backend, service) {
        var result;
        backend.connections.subscribe(function (connection) {
            if (connection.request.url === collectionUrl + "/workouts/Workout1" + params) {
                var response = new http_1.ResponseOptions({
                    body: '{ "name" : "Workout1" , "title" : "Workout 1" , "exercises" : [ { "name" : "exercise1" , "duration" : 30}]}'
                });
                connection.mockRespond(new http_1.Response(response));
            }
            else {
                connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                    body: [{ name: "exercise1", title: "exercise 1" }]
                })));
            }
        });
        service.getWorkout("Workout1").subscribe(function (response) {
            result = response;
        });
        expect(result.name).toBe('Workout1');
    }))));
    it("should map exercises to workout plan correctly in getWorkout", testing_1.fakeAsync((testing_1.inject([http_1.XHRBackend, workout_service_1.WorkoutService], function (backend, service) {
        var result;
        backend.connections.subscribe(function (connection) {
            if (connection.request.url === collectionUrl + "/workouts/Workout1" + params) {
                var response = new http_1.ResponseOptions({
                    body: { name: "Workout1", title: "Workout 1", restBetweenExercise: 30, exercises: [{ name: "exercise2", duration: 31 }, { name: "exercise4", duration: 31 }] }
                });
                connection.mockRespond(new http_1.Response(response));
            }
            else {
                connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                    body: [{ name: "exercise1", title: "exercise 1" }, { name: "exercise2", title: "exercise 2" }, { name: "exercise3", title: "exercise 3" }, { name: "exercise4", title: "exercise 4" }]
                })));
            }
        });
        service.getWorkout("Workout1").subscribe(function (response) {
            result = response;
        });
        expect(result.name).toBe('Workout1');
        expect(result.exercises.length).toBe(2);
        expect(result.exercises[0].name).toBe("exercise2");
        expect(result.exercises[1].name).toBe("exercise4");
    }))));
});
