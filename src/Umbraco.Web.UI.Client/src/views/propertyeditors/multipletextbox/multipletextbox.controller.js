﻿function MultipleTextBoxController($scope) {

    if (!$scope.model.value) {
        $scope.model.value = [];
    }
    
    //add any fields that there isn't values for
    if ($scope.model.config.min.value > 0) {
        for (var i = 0; i < $scope.model.config.min.value; i++) {
            if ((i + 1) > $scope.model.value.length) {
                $scope.model.value.push({ value: "" });
            }
        }
    }

    $scope.add = function () {
        if ($scope.model.config.max.value <= 0 || $scope.model.value.length < $scope.model.config.max.value) {
            $scope.model.value.push({ value: "" });
        }
    };

    $scope.remove = function(index) {
        var remainder = [];
        for (var x = 0; x < $scope.model.value.length; x++) {
            if (x !== index) {
                remainder.push($scope.model.value[x]);
            }
        }
        $scope.model.value = remainder;
    };

}

angular.module("umbraco").controller("Umbraco.Editors.MultipleTextBoxController", MultipleTextBoxController);
