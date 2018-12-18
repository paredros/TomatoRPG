'use strict';

var app = angular.module('demoApp', ["ngRoute"]);


app.config(function($routeProvider,$locationProvider,$interpolateProvider,$logProvider){ //
    $locationProvider.html5Mode({
              enabled:false //true
    });
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    $routeProvider.when('/', {templateUrl:'/static/htmlang/view-test.html',controller:'TestController2',controllerAs: 'vm'})
        .when('/test', {templateUrl:'/static/htmlang/view-test.html',controller:'TestController',controllerAs: 'vm'});
    $logProvider.debugEnabled(true);
 });

app.controller('TestController', function($scope) {
      this.mymodel = "I'm using the custom symbols";
      var updateClock = function () {
          $scope.clock = new Date();
      };
      setInterval(function () {
          $scope.$apply(updateClock)
      },1000);
      updateClock();
});

app.controller('TestController2', function() {
      this.mymodel = "OtroTexto";
});
