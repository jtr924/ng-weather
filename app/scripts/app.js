'use strict';

/**
 * @ngdoc overview
 * @name chathamApp
 * @description
 * # chathamApp
 *
 * Main module of the application.
 */
var mainApp = angular
  .module('chathamApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller:'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
  
  //TODO: Move factory to separate file
  mainApp.factory('weatherService', ['$http', '$q', function ($http, $q){
      function getWeather (zip) {

        var deferred = $q.defer();
        
        var currentUrl = 'http://api.openweathermap.org/data/2.5/weather?&appid=273249d907ed2208cd61690e70fbf435&units=imperial&zip=' + zip + ',us';
        var outlookUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?&units=imperial&cnt=7&appid=273249d907ed2208cd61690e70fbf435&zip=' + zip + ',us';         
        
        //create promise for current weather
        var promise1 = $http.get(currentUrl)
          .success(function(data){
            console.log(data);
          })
          .error(function(err){
            //TODO: create error message when there is no response
            console.log('Error retrieving forecast');
            deferred.reject(err);
          });
        
        //create promise for 7 day forecast  
        var promise2 = $http.get(outlookUrl)
          .success(function(data){
            console.log(data);
          })
          .error(function(err){
            //TODO: create error message when there is no response
            console.log('Error retrieving forecast');
            deferred.reject(err);
          });

        //combine promises and wait for them to resolve
        $q.all([promise1, promise2]).then(function(data){
          //fulfill promise
          deferred.resolve(data);
        });
      
        return deferred.promise;
      }
      
      return {
        getWeather: getWeather
      };
    }]);