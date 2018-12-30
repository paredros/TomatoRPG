'use strict';

var app = angular.module('mainApp', ["ngRoute","dndLists"]);

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

app.controller('KanbanApp', function ($scope, $window, $timeout) {
    $scope.models = {
        selected: null,
        lists: {"A": [], "B": []},
        //lists: [{"A": []}, {"B": []}],
        inputs: {"A": {status:"Empty", value:""}, "B": {status:"Empty", value:""}}
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.A.push({label: "Item A" + i, type:"Task", status:"Ready"});
        $scope.models.lists.B.push({label: "Item B" + i, type:"Task", status:"Ready"});
    }

    $scope.preAddItem = function(name){
        //alert("FFFF:"+name);
        $scope.models.inputs[name].status="ToFill";
        var element = $window.document.getElementById('Input-'+name);//angular.element("#Input-"+name);
        console.log(element);
        $timeout(function () {
            element.focus();
        },100);

    };

    $scope.addItem = function(name){
        var txt = $scope.models.inputs[name].value;
        $scope.models.lists[name].push({label:txt, type:"Task", status:"Ready"});
        $scope.models.inputs[name].value="";
        $scope.models.inputs[name].status="Empty";
    };
    $scope.cancelAddItem = function(name){
        $scope.models.inputs[name].value="";
        $scope.models.inputs[name].status="Empty";
    };
    $scope.deleteItem = function(name,index){
        $scope.models.lists[name].splice(index,1);
    };
    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

    $scope.hoverIn = function(){
        this.hoverFocus = true;
    };

    $scope.hoverOut = function(){
        this.hoverFocus = false;
    };
    
    $scope.editItem = function (name,index) {
        $scope.models.lists[name][index].status="Edit";
        var element = $window.document.getElementById('Input-'+name+'-'+index);//angular.element("#Input-"+name);
        $timeout(function () {
            element.focus();
        },100);
    };
    $scope.cancelEditItem = function (name,index) {
        $scope.models.lists[name][index].status="Ready";
    }
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