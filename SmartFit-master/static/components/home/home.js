'use strict';

angular.module('myApp.home', [
  'ngRoute'
])

    .config([
              '$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
          templateUrl: 'components/home/home.html',
          controller: 'HomeCtrl'
        });
      }])

    .controller('HomeCtrl', function($scope, $http) {

      $http({
              method: 'GET',
              url: 'get_title'
            })
          .then(function(success) {
            $scope.title = success.data;
          }, function(error) {
            $scope.title = 'Failed to Get Title';
          });

      $http({
              method: 'GET',
              url: 'get_user/User'
            })
          .then(function(success) {
            $scope.user = success.data;
          }, function(error) {
            $scope.user = 'No User Found';

          });

    });