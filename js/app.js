'use strict';

var app = angular.module('issueSystem', [
    'ngRoute',
    'issueSystem.home',
    'issueSystem.users.identity',
    'issueSystem.dashboard'
]);

app.constant('BASE_URL_API', 'http://softuni-issue-tracker.azurewebsites.net/api/');
app.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    });

    $routeProvider.otherwise({redirectTo: '/'});
}]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboard', {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardController'
    });

    $routeProvider.otherwise({redirectTo: '/'});
}]);

app.run(function ($rootScope, $location, authentication) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if($location.path().indexOf("/user/") != -1 && !authentication.isLoggedIn()) {
            $location.path('/');
        }
    })
})