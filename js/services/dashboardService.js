'use strict';
angular.module('issueSystem.dashboard.myDashboard', [])
    .factory('myDashboard', [
        '$http',
        '$q',
        'BASE_URL',
        'authentication',
        function ($http, $q, BASE_URL, authentication) {
            function getLatestIssues() {
                var headers = authentication.getAuthHeaders();

                var request = {
                    method: 'GET',
                    url: BASE_URL + 'issues/me?orderBy=Project.Name desc, IssueKey&pageSize=2&pageNumber=1',
                    headers: {
                        'Authorization': headers
                    }
                };

                var deferred = $q.defer();

                $http(request)
                    .then(function (issues) {
                        deferred.resolve(issues.data);
                    }, function (error) {
                        deferred.reject(error.data);
                    });

                return deferred.promise;
            }

            function getProjectsWithCurrentUserAsLead() {
                var headers = authentication.getAuthHeaders();

                var leadId = authentication.getUserInfo().Id;

                var request = {
                    method: 'GET',
                    url: BASE_URL + 'projects?filter=Lead.Id="92925a62-07ab-435a-819e-33dd6ac907ef"&pageSize=4&pageNumber=1',
                    headers: {
                        'Authorization': headers
                    }
                };

                var deferred = $q.defer();

                $http(request)
                    .then(function (issues) {
                        deferred.resolve(issues.data);
                    }, function (error) {
                        deferred.reject(error.data);
                    });

                return deferred.promise;
            }

            return {
                getLatestIssues: getLatestIssues,
                getProjectsWithCurrentUserAsLead: getProjectsWithCurrentUserAsLead
            }
        }]);