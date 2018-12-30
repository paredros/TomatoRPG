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


app.controller("KanbanApp2", function($scope,$window, $timeout) {
    var undoFlag=false;
    var undoPointer=0;
    $scope.history = [];
    $scope.models = {
        canUndo:false,
        canRedo:false,
        selected: null,
        allowedTypes: ['container'],
        allowedTypes2: ['item'],

        templates: [
            {type: "item", id: 2},
            {type: "container", id: 1, cards: [[]]}
        ],
        globalCreator:{
            status:"Empty",
            value:""
        },
        dropzones: {
            "A": [
                {
                    "type": "container",
                    "label": "ToDo",
                    status:"Ready",
                    "id": 1,
                    "input":{
                            status:"Empty",
                            value:""
                        },
                    "cards":[
                        [
                            {
                                "type": "item",
                                "label": "tarea 1",
                                status:"Ready",
                                "id": "1"
                            },
                            {
                                "type": "item",
                                "label": "tarea 2",
                                status:"Ready",
                                "id": "2"
                            }
                        ]
                        ]

                },
                {
                    "type": "container",
                    "label": "Doing",
                    status:"Ready",
                    "id": 10,
                    "input":{
                            status:"Empty",
                            value:""
                        },
                    "cards":[
                        [
                            {
                                "type": "item",
                                "label": "hacer 1",
                                status:"Ready",
                                "id": "11"
                            },
                            {
                                "type": "item",
                                "label": "hacer 2",
                                status:"Ready",
                                "id": "12"
                            }
                        ]
                        ]

                },
                {
                    "type": "container",
                    "label": "Done",
                    status:"Ready",
                    "id": "2",
                    "input":{
                            status:"Empty",
                            value:""
                        },
                    "cards": [
                        [
                            {
                                "type": "item",
                                "label": "hecha 1",
                                status:"Ready",
                                "id": "9"
                            },
                            {
                                "type": "item",
                                "label": "hecha 2",
                                status:"Ready",
                                "id": "10"
                            },
                            {
                                "type": "item",
                                "label": "hecha 3",
                                status:"Ready",
                                "id": "11"
                            }
                        ]
                    ]
                }
            ]

        }
    };

    $scope.$watch('models.dropzones', function(model) {
        console.log(undoFlag)
        $scope.modelAsJson = angular.toJson(model, true);
        if(!undoFlag){
            $scope.saveHistory($scope.modelAsJson);
            undoPointer=0;
        }else{
            undoFlag=false;
        }
    }, true);

    $scope.preAddItem = function(name,groupIndex){
        $scope.models.dropzones.A[groupIndex].input.status="ToFill";
        var element = $window.document.getElementById('InputCont-'+groupIndex);//angular.element("#Input-"+name);
        $timeout(function () {
            element.focus();
        },100);

    };
    $scope.addItem = function(groupIndex){
        var txt = $scope.models.dropzones.A[groupIndex].input.value;
        if(txt!="") {
            $scope.models.dropzones.A[groupIndex].cards[0].push({label: txt, type: "item", status: "Ready"});
        }
        $scope.models.dropzones.A[groupIndex].input.value="";
        $scope.models.dropzones.A[groupIndex].input.status="Empty";
    };
    $scope.cancelAddItem = function(groupIndex){
        $scope.models.dropzones.A[groupIndex].input.status="Empty";
        $scope.models.dropzones.A[groupIndex].input.value="";
    };
    $scope.hoverIn = function(){
        this.hoverFocus = true;
    };

    $scope.hoverOut = function(){
        this.hoverFocus = false;
    };
    $scope.hoverInContainer = function(){
        this.hoverFocusContainer = true;
    };

    $scope.hoverOutContainer = function(){
        this.hoverFocusContainer = false;
    };
    $scope.deleteItem = function(indexGroup,index){
        $scope.models.dropzones.A[indexGroup].cards[0].splice(index,1);
    };
    $scope.editItem = function (indexGroup,index) {
        $scope.models.dropzones.A[indexGroup].cards[0][index].status="Edit";
        var element = $window.document.getElementById('Input-'+indexGroup+'-'+index);//angular.element("#Input-"+name);
        $timeout(function () {
            element.focus();
        },100);
    };
    $scope.cancelEditItem = function (indexGroup,index) {
        $scope.models.dropzones.A[indexGroup].cards[0][index].status="Ready";
    };
    $scope.preAddContainer = function () {
        $scope.models.globalCreator.status = "ToFill";
        var element = $window.document.getElementById('InputGlobalCreator');//angular.element("#Input-"+name);
        $timeout(function () {
            element.focus();
        },100);
    };
    $scope.cancelAddContainer = function () {
        $scope.models.globalCreator.status = "Empty";
        $scope.models.globalCreator.value = "";
    }
    $scope.addContainer = function(){
        var txt = $scope.models.globalCreator.value;
        if(txt!="") {
            $scope.models.dropzones.A.push({
                    "type": "container",
                    "label": txt,
                    status: "Ready",
                    "id": "2",
                    "input": {
                        status: "Empty",
                        value: ""
                    },
                    "cards": [
                        []
                    ]
                }

            );
        }
        $scope.models.globalCreator.value="";
        $scope.models.globalCreator.status="Empty";
    };
    $scope.deleteContainer = function(indexGroup){
        $scope.models.dropzones.A.splice(indexGroup,1);
    };
    $scope.editContainer = function (indexGroup) {
        $scope.models.dropzones.A[indexGroup].status="Edit";
        var element = $window.document.getElementById('InputNameContainer-'+indexGroup);//angular.element("#Input-"+name);
        $timeout(function () {
            element.focus();
        },100);
    };
    $scope.cancelEditContainer = function (indexGroup) {
        $scope.models.dropzones.A[indexGroup].status="Ready";
    };
    $scope.undo = function () {
        if($scope.history.length-1-undoPointer>0) {
            undoFlag=true;
            undoPointer++;
            $scope.models.dropzones = angular.fromJson($scope.history[$scope.history.length - 1 - undoPointer], true);

        }
        $scope.checkCanUndoRedo();
        //$scope.modelAsJson = angular.toJson(model, true);
    };
    $scope.redo = function () {
        if(undoPointer>0) {
            undoFlag=true;
            undoPointer--;
            $scope.models.dropzones = angular.fromJson($scope.history[$scope.history.length - 1 - undoPointer], true);
        }
        $scope.checkCanUndoRedo();
    };
    $scope.checkCanUndoRedo=function(){
        if($scope.history.length-1-undoPointer>0) {
            $scope.models.canUndo = true;
        }else {
            $scope.models.canUndo = false;
        }
        if(undoPointer>0){
            $scope.models.canRedo = true;
        }else{
            $scope.models.canRedo = false;
        }
    }
    $scope.saveHistory = function (toSave) {
        console.log("llamado")
        if(undoPointer>0){
            var tmp = [];
            for(var i= 0 ;i<$scope.history.length-0-undoPointer;i++){
                tmp.push($scope.history[i]);
            }
            $scope.history=tmp;
            undoPointer=0;
        }
        /*if($scope.history.length>0){
            $scope.models.canUndo = true;
        }*/
        $scope.history.push(toSave);
        $scope.checkCanUndoRedo();
        //
        if($scope.history.length>10){
            $scope.history.shift();
        }
    }
    //$scope.saveHistory(angular.toJson($scope.models.dropzones, true));
    //$scope.history.push(angular.toJson($scope.models.dropzones, true));
});