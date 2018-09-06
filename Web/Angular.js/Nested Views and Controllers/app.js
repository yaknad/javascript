console.log('loaded');
angular.module('myApp', ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider.state('home', {
            // abstract: true,
            url: '/home',
            templateUrl: './html/home.html',
            controller: 'homeCtrl'
        }).state('home.room', {
            url: '/room',
            templateUrl: './html/room.html',
            controller: 'roomCtrl'
        }).state('home.kitchen', {
            url: '/kitchen',
            templateUrl: './html/kitchen.html',
            controller: 'kitchenCtrl'
        });
    });