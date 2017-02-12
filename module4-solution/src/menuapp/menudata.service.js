(function(){
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");;

MenuDataService.$inject = ['$q', '$http', 'ApiBasePath']
function MenuDataService($q, $http, ApiBasePath) {
    var service = this;

    service.getAllCategories = function() {
        var response = $http({
            method: "GET",
            url: (ApiBasePath + '/categories.json')
        });
        //deferred.resolve();
        return response;
    };

    service.getItemsForCategory = function(categoryShortName) {
        var response = $http({
            method: "GET",
            url: (ApiBasePath + '/menu_items.json'),
            params: {
                category: categoryShortName
            }
        });
        return response;
    };
}
})();