'use strict';

/**
 * @ngdoc function
 * @name chathamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chathamApp
 */
angular.module('chathamApp')
  .controller('MainCtrl', ['$scope', 'weatherService', function ($scope, weatherService) {

    $scope.showResults = false;
    $scope.zip = '19348';

    $scope.findWeather = function () {
      $scope.weather = '';
      $scope.ziptest = /[0-9]{5}/.test($scope.zip);
      if (/[0-9]{5}/.test($scope.zip)) {
        weatherService.getWeather($scope.zip).then(function (data) {
          $scope.weather = data;
          $scope.showResults = true;
        });
      }
    };

    $scope.findWeather();

  }]);
