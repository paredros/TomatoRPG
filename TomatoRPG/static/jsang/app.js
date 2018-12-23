'use strict';

var app = angular.module('mainApp', ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider, $interpolateProvider, $logProvider) { //
    $locationProvider.html5Mode({
        enabled: false //true
    });
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    $routeProvider.when('/', {
        templateUrl: '/static/htmlang/mainview.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
    });
    //    .when('/test', {templateUrl:'/static/htmlang/view-test.html',controller:'TestController',controllerAs: 'vm'});
    $logProvider.debugEnabled(true);
});

app.controller('MainCtrl', function ($scope) {

});

app.controller('KanbanApp', function ($scope,$timeout) {
    $scope.models = {
        selected: null,
        lists: {"A": [], "B": []}
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.A.push({label: "Item A" + i});
        $scope.models.lists.B.push({label: "Item B" + i});
    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);
});


app.controller('TestController', function ($scope) {
    this.mymodel = "I'm using the custom symbols";
    $scope.contador = 0;
    var updateClock = function () {
        $scope.contador += 0.1;
        $scope.clock = new Date();
    };
    setInterval(function () {
        $scope.$apply(updateClock)
    }, 1000);
    updateClock();
});

app.controller('TestController2', function () {
    this.mymodel = "OtroTexto";
});