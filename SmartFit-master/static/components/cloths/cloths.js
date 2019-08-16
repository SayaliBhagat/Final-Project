'use strict';

angular.module('myApp.cloths', [
  'ngRoute'
])

    .config([
              '$routeProvider', function($routeProvider) {
        $routeProvider.when('/cloths', {
          templateUrl: 'components/cloths/cloths.html',
          controller: 'ClothCtrl'
        });
      }])

    .controller('ClothCtrl', function($scope, $http,$location) {
        $scope.showtrial=false;
    $scope.firstimg = 'components/cloths/1.jpg'
    $scope.secondimg = 'components/cloths/2.jpg'
    $scope.thirdimg = 'components/cloths/example_clothing.jpg'
    $scope.fourthimg = 'components/cloths/example_output.png'
        $scope.setFile = function(element) {
  $scope.currentFile = element.files[0];
   var reader = new FileReader();

  reader.onload = function(event) {
    $scope.clothimg = event.target.result
    $scope.$apply()

  }
  // when the file is read it triggers the onload event above.
  reader.readAsDataURL(element.files[0]);
}

  $scope.setmodelFile = function(element) {
  $scope.currentFile = element.files[0];
   var reader = new FileReader();

  reader.onload = function(event) {
    $scope.modelimg = event.target.result
    $scope.$apply()

  }
  // when the file is read it triggers the onload event above.
  reader.readAsDataURL(element.files[0]);
}

  $scope.settrialFile = function(element) {
  $scope.currentFile = element.files[0];
   var reader = new FileReader();

  reader.onload = function(event) {
    $scope.trialimg = event.target.result
    $scope.$apply()

  }
  // when the file is read it triggers the onload event above.
  reader.readAsDataURL(element.files[0]);
}

$scope.resulttrial =function () {
        $scope.showtrial = true;

}

$scope.checkout = function () {

        alert("Item added to cart successfully")
    $location.path('/home')
}

    });