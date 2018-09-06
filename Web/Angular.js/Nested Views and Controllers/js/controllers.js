angular.module('myApp').controller('homeCtrl', function($scope) {
    $scope.name = "home";
}).controller('roomCtrl', function($scope) {
    $scope.area = "STREET";
}).controller('kitchenCtrl', function($scope) {
    $scope.area2 = "CITY";
}).controller('main', function($scope) {
    $scope.location = 'entrance: WELCOME';
});