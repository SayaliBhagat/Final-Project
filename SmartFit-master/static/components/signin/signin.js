'use strict';

angular.module('myApp.signin', ['ngRoute'])

    .config([
              '$routeProvider', function($routeProvider) {
        $routeProvider.when('/signin', {
          templateUrl: 'components/signin/signin.html',
          controller: 'SignInCtrl'
        });
      }])

    .controller('SignInCtrl', function($scope,$http,$location) {
        $scope.new ="working"
            $scope.id='';
    $scope.pass='';
    $scope.signin = function () {
        $http.post('/login', {'id':$scope.id,'pass':$scope.pass}).success(function (data) {

            if(data.ok){
                $location.path('/cloths')
            }
            else {
                alert("Wrong credentials")
                $location.path('/home')
            }
        })
    }
    });