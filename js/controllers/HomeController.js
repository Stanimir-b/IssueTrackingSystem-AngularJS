'use strict';

angular.module('issueSystem.home', [
        'issueSystem.users.authentication'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        })
    }])
    .controller('HomeController', [
        '$scope',
        '$location',
        'authentication',
        'notifyService',
        function ($scope, $location, authentication, notifyService) {
            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function (loggedInUser) {
                        notifyService.showInfo('You have successfully logged in!');
                        $location.path('/dashboard');
                    }, function (err) {
                        notifyService.showError('You were unable to login. Check your credentials!', err.error);
                    });
            };

            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        notifyService.showInfo('You have successfully registered!');
                        $location.path('/dashboard');
                    }, function (err) {
                        notifyService.showError('You were unable to register! Check the length of your password.', err.error);
                    });
            };
        }]);