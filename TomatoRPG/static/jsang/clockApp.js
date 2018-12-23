app.controller('ClockApp', function ($scope,$timeout) {
    var TIME_POMODORO=25;//in minutes
    var TIME_RELAX_SHORT=5;
    var TIME_RELAX_LONG=15;
    var TIME_IDLE_MAX=15;
    $scope.ammount=0;
    $scope.ammountMax=10;
    $scope.status = "stopped";
    $scope.momentum="pomodoro";
    $scope.timer = 0;
    $scope.relaxShortStream = 0;
    $scope.relaxShortMax = 4;

    var timerTo = new Date();
    var timerToDiffMax = new Date();
    //var timerHold = 0;
    var timerPreRelax=0;

    var currentDay = 0;

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
        if($scope.status!="running" && $scope.status!="relaxing"){
            var d = new Date();
            if(timerPreRelax-d <= 0){
                clearLongRelax();
            }
        }

        $timeout(updateClock, 1000);
    };
    var clearLongRelax = function () {
        resetLongRelax();
        $scope.relaxShortStream = 0;
    };
    var resetLongRelax = function () {
        timerPreRelax = getFutureTimePre(TIME_IDLE_MAX);
    };
    var resetClock = function (tt) {
        var d = new Date();
        d.setSeconds(d.getSeconds() + tt);
        $scope.timer = d - (new Date());
    };
    var getFutureTime = function (tt) {
        var d = getFutureTimePre(tt);
        return d - (new Date());
    };
    var getFutureTimePre = function (tt) {
        var d = new Date();
        return d.setSeconds(d.getSeconds() + tt);
    };
    var getFutureTimePreMillis = function (tt) {
        var d = new Date();
        return d.setMilliseconds(d.getMilliseconds() + tt);
    };
    var compareDay = function(){
        var d = new Date();
        d.setHours(0,0,0,0);
        if(d != currentDay){
            resetDay();
        }
    };
    var resetDay = function(){
        $scope.ammount = 0;
        var d = new Date();
        d.setHours(0,0,0,0);
        currentDay = d;
        clearLongRelax();
    };

    var stopClock = function(){
        compareDay();
        resetLongRelax();
        if($scope.status=="running") {
            $scope.relaxShortStream = $scope.relaxShortStream + 1;
            $scope.status = "torelax";
            $scope.momentum = "relax";
            $scope.ammount=$scope.ammount+1;
            if($scope.relaxShortStream == $scope.relaxShortMax){
                timerPreRelax = getFutureTimePre(TIME_RELAX_LONG);
                resetClock(TIME_RELAX_LONG);
            }else{
                timerPreRelax = getFutureTimePre(TIME_RELAX_SHORT);
                resetClock(TIME_RELAX_SHORT);
            }

        }else if($scope.status=="relaxing" || $scope.status=="torelax"){
            $scope.status = "stopped";
            $scope.momentum = "pomodoro";
            if($scope.relaxShortStream == $scope.relaxShortMax){
                clearLongRelax();
            }
            resetClock(TIME_POMODORO);
        }
        $scope.timerNorm = 100;
    };
    $scope.pauseButton = function () {
        resetLongRelax();
        $scope.status="paused";
    };
    $scope.continueButton = function () {
        resetLongRelax();
        //timerTo = (new Date())+millis($scope.timer);
        //var d = new Date();
        //timerTo = d.setMilliseconds( d.getMilliseconds() + $scope.timer);
        timerTo = getFutureTimePreMillis($scope.timer);
        //console.log(timerTo+":"+$scope.timer);
        $scope.status="running";
        //updateClock();
    };
    $scope.startRelax = function(){
        resetLongRelax();
        if($scope.status=="torelax"){
            $scope.status="relaxing";
            //var d = new Date();
            //d.setMinutes(d.getMinutes() + TIME_POMODORO);
            //d.setSeconds(d.getSeconds() + TIME_RELAX_SHORT);
            //timerToDiffMax = d - (new Date());
            if($scope.relaxShortStream == $scope.relaxShortMax){
                timerToDiffMax = getFutureTime(TIME_RELAX_LONG);
                timerTo = getFutureTimePre(TIME_RELAX_LONG);
                clearLongRelax();
            }else {
                timerToDiffMax = getFutureTime(TIME_RELAX_SHORT);
                timerTo = getFutureTimePre(TIME_RELAX_SHORT);
            }
            $scope.timerNorm=100;
            //updateClock();
        };
    };
    $scope.stopRelax=function(){
        resetLongRelax();
        stopClock();
    };
    $scope.startButton = function () {
        resetLongRelax();
        if($scope.status=="stopped"){
            compareDay();
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
    resetLongRelax();
    resetClock(TIME_POMODORO);
    updateClock();
});