(function() {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        var stmt = {
            NODATA: "Please Enter Data First!",
            ENJOY : "Enjoy!",
            TOO_MUCH : "Too Much!"
        };
        $scope.food = "";
        $scope.result_statement = "";

        $scope.checkFoodItems = function () {
            if ($scope.food.length === 0) {
                $scope.result_statement = stmt.NODATA;
                return;
            }
            var foodItems = $scope.food.split(",");
            var actualCnt = 0;
            for (var i = 0; i < foodItems.length; i++) {
                if (foodItems[i] !== "") {
                    actualCnt += 1;
                }
            }
            if (actualCnt <= 3) {
                $scope.result_statement = stmt.ENJOY;
            } else {
                $scope.result_statement = stmt.TOO_MUCH;
            } 
        };
    };
})();