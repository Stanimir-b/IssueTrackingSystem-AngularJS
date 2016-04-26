'use strict';
angular.module('issueSystem.users.identity', [])
    .factory('identity', [
        '$http',
        '$q',
        'BASE_URL_API',
        function ($http, $q, BASE_URL_API) {

            var deferred = $q.defer();

            var currentUser = undefined;

            var accessToken = '';

            $http.defaults.headers.common.Authorization =
                'Bearer ' + accessToken;

            $http.get(BASE_URL_API + 'me')
                .then(function (response) {
                    currentUser = response.data;
                    deferred.resolve(currentUser);
                });

            return {
                getCurrentUser: function () {
                    if(currentUser) {
                        return $q.when(currentUser);
                    } else {
                        return deferred.promise;
                    }
                },
                isAuthenticated: function () {
                    return true;
                }
            };
        }]);