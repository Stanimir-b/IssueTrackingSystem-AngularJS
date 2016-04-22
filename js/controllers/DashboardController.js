'use strict';

angular.module('issueSystem.dashboard', [
        'issueSystem.dashboard.myDashboard'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'templates/dashboard.html',
            controller: 'DashboardController'
        })
    }])
    .controller('DashboardController', [
        '$scope',
        'myDashboard',
        function ($scope, myDashboard) {
            var projectIds = [];

            myDashboard.getLatestIssues()
                .then(function (latestIssues) {
                    var issues = latestIssues.Issues;
                    $scope.latestIssues = issues;

                    for (var i = 0; i < issues.length; i++) {
                        var issue = issues[i];
                        projectIds.push(issue.Project.Id);
                    }
                });

            myDashboard.getProjectsWithCurrentUserAsLead()
                .then(function (myProjects) {
                    var projects = myProjects.Projects;

                    $scope.myProjects = projects;

                    for (var i = 0; i < projects.length; i++) {
                        var project = projects[i];
                        projectIds.push(project.Id);
                    }

                    $scope.projectIds = projectIds;
                });
        }]);