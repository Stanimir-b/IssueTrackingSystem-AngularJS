'use strict';

var app = angular.module('issueSystem', [
    'ngRoute',
    'ui.router',
    'issueSystem.home',
    'issueSystem.users.identity'
]);

app.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/api/');

app.config(function ($stateProvider) {
    $stateProvider.state('root', {
        url: '',
        controller: function ($state) {
            if($state.is('root')) {
                $state.go(sessionStorage['currentUser'] ? "dashboard" : "anonymous");
            }
        }
    });

    $stateProvider.state('anonymous', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    });

    $stateProvider.state('dashboard', {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardController'
    });
});
