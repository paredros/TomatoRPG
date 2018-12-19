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
    var TIME_RELAX_SHORT=5;
    var TIME_RELAX_LONG=15;
    $scope.ammount=0;
    $scope.ammountMax=10;
    $scope.status = "stopped";
    $scope.momentum="pomodoro";
    $scope.timer = 0;
    var timerTo = new Date();
    var timerToDiffMax = new Date();
    var timerHold = 0;
    var timerPreRelax=0;
    $scope.timerNorm=100;
    var updateClock = function () {
        if($scope.status=="running" || $scope.status=="relaxing"){
            var d = new Date();
            $scope.timer = timerTo-d;
            //console.log("ACA" + timerTo+":"+$scope.timer + " , " +(timerTo-d));
            //console.log("ACA" + timerTo+":"+$scope.timer + " , " +(timerTo-d));
            $scope.timerNorm = ($scope.timer/timerToDiffMax)*100;
            if($scope.timer<=0){
                stopClock();
            }
        }else if($scope.status=="torelax"){
            var d = new Date();
            if(timerPreRelax-d <= 0){
                stopClock();
            }
        }
        $timeout(updateClock, 1000);
    };
    var resetClock = function (tt) {
        var d = new Date();
        d.setSeconds(d.getSeconds() + tt);
        $scope.timer = d - (new Date());
    };
    var getFutureTime = function (tt) {
        var d = getFutureTimePre(tt);
        return d - (new Date());
    }
    var getFutureTimePre = function (tt) {
        var d = new Date();
        return d.setSeconds(d.getSeconds() + tt);
    }
    var getFutureTimePreMillis = function (tt) {
        var d = new Date();
        return d.setMilliseconds(d.getMilliseconds() + tt);
    }

    var stopClock = function(){
        if($scope.status=="running") {
            $scope.status = "torelax";
            $scope.momentum = "relax";
            $scope.ammount=$scope.ammount+1;
            timerPreRelax = getFutureTimePre(TIME_RELAX_SHORT);
            resetClock(TIME_RELAX_SHORT);
        }else if($scope.status=="relaxing" || $scope.status=="torelax"){
            $scope.status = "stopped";
            $scope.momentum = "pomodoro";
            resetClock(TIME_POMODORO);
        }
        $scope.timerNorm = 100;
    };
    $scope.pauseButton = function () {
        $scope.status="paused";
    };
    $scope.continueButton = function () {
        //timerTo = (new Date())+millis($scope.timer);
        //var d = new Date();
        //timerTo = d.setMilliseconds( d.getMilliseconds() + $scope.timer);
        timerTo = getFutureTimePreMillis($scope.timer);
        //console.log(timerTo+":"+$scope.timer);
        $scope.status="running";
        //updateClock();
    };
    $scope.startRelax = function(){
        if($scope.status=="torelax"){
            $scope.status="relaxing";
            //var d = new Date();
            //d.setMinutes(d.getMinutes() + TIME_POMODORO);
            //d.setSeconds(d.getSeconds() + TIME_RELAX_SHORT);
            //timerToDiffMax = d - (new Date());
            timerToDiffMax = getFutureTime(TIME_RELAX_SHORT);
            timerTo=getFutureTimePre(TIME_RELAX_SHORT);
            $scope.timerNorm=100;
            //updateClock();
        };
    };
    $scope.stopRelax=function(){
        stopClock();
    };
    $scope.startButton = function () {
        if($scope.status=="stopped"){
            $scope.status="running";
            //var d = new Date();
            //d.setMinutes(d.getMinutes() + TIME_POMODORO);
            //d.setSeconds(d.getSeconds() + TIME_POMODORO);
            //timerToDiffMax = d - (new Date());
            timerToDiffMax = getFutureTime(TIME_POMODORO);
            timerTo=getFutureTimePre(TIME_POMODORO);
            $scope.timerNorm=100;
            //updateClock();
        };
    };
    resetClock(TIME_POMODORO);
    updateClock();
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