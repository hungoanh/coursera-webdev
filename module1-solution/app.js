(function() {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        // Define the text for result statement
        var stmt = {
            NODATA: "Please Enter Data First!",
            ENJOY : "Enjoy!",
            TOO_MUCH : "Too Much!"
        };
        $scope.food = "";
        $scope.result_statement = "";

        $scope.checkFoodItems = function () {
            // Flag empty entry
            if ($scope.food.length === 0) {
                $scope.result_statement = stmt.NODATA;
                return;
            }
            // Split entry into an array
            var foodItems = $scope.food.split(",");
            var actualCnt = 0;
            // Remove empty items (empty spaces)
            for (var i = 0; i < foodItems.length; i++) {
                if (foodItems[i] !== "") {
                    actualCnt += 1;
                }
            }
            // Compare result and issue statement
            if (actualCnt <= 3) {
                $scope.result_statement = stmt.ENJOY;
            } else {
                $scope.result_statement = stmt.TOO_MUCH;
            } 
        };
    };
})();