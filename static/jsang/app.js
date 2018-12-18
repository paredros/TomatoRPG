'use strict';

var app = angular.module('demoApp', ["ngRoute"]);


app.config(function($routeProvider,$locationProvider,$interpolateProvider){
    $locationProvider.html5Mode({
              enabled:true
    });
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    $routeProvider
        .when('/', {controller:'TestController', templateURL:'static/htmlang/view-test.html'})
        .when('/test', {controller:'TestController2',templateURL:'static/htmlang/view-test.html'})
        .otherwise({redirectTo:'/'})
 });

app.controller('TestController', function() {
      this.mymodel = "I'm using the custom symbols";
});

app.controller('TestController2', function() {
      this.mymodel = "OtroTexto";
});
