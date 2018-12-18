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

app.controller('ClockApp', function ($scope,$timeout) {
    var TIME_POMODORO=25;//in minutes
    $scope.status = "stopped";
    $scope.contador = 0;
    $scope.timer = 0;
    var timerTo = new Date();
    var timerToDiffMax = new Date();
    var timerHold = 0;
    $scope.timerNorm=100;
    var updateClock = function () {
        if($scope.status=="running"){
            $timeout(updateClock, 1000);
            var d = new Date();
            $scope.timer = timerTo-d;
            //console.log("ACA" + timerTo+":"+$scope.timer + " , " +(timerTo-d));
            //console.log("ACA" + timerTo+":"+$scope.timer + " , " +(timerTo-d));
            $scope.timerNorm = ($scope.timer/timerToDiffMax)*100;
            if($scope.timer<=0){
                stopClock();
            }
        }

    };
    var stopClock = function(){
        $scope.status="stopped";
        $scope.timer = 0;
        $scope.timerNorm=100;
    };
    $scope.pauseButton = function () {
        $scope.status="paused";

    };
    $scope.continueButton = function () {
        //timerTo = (new Date())+millis($scope.timer);
        var d = new Date();
        timerTo = d.setMilliseconds( d.getMilliseconds() + $scope.timer);
        //console.log(timerTo+":"+$scope.timer);
        $scope.status="running";
        updateClock();
    }
    $scope.startButton = function () {
        if($scope.status=="stopped"){
            $scope.status="running";
            var d = new Date();
            d.setMinutes(d.getMinutes() + TIME_POMODORO);
            timerToDiffMax = d - (new Date());
            timerTo=d;
            $scope.timerNorm=100;
            updateClock();
        };
    };
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