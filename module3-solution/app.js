(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiPath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);

function FoundItems() {
    var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
            list: '<foundList'
        }
    };
    return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var menu = this;

    var foundMenu = MenuSearchService;
    menu.getMatchedMenuItems = function() {
        var promise = MenuSearchService.getMatchMenuItems(menu.searchTerm);
        promise.then(function(value){
            menu.found = value;
        });
    }

    menu.removeItem = function(itemIndex) {
        console.log("remove item");
        MenuSearchService.removeItem(itemIndex);
    }
}

MenuSearchService.$inject = ['$http', 'ApiPath'];
function MenuSearchService($http, ApiPath) {
    var service = this;
    var found = [];
    service.getMatchMenuItems = function(searchTerm) {
        found = []; 
        return $http({
            method: "GET",
            url: (ApiPath + "/menu_items.json")
        }).then(function(response){
            var menuItems = response.data.menu_items;
            for (var i = 0; i < menuItems.length; i++) {
                var item = menuItems[i];
                var desc = item.description;
                if (desc.indexOf(searchTerm) > -1) {
                    found.push(item);
                }
            }
            //console.log(found);
            return found;
        })
        .catch(function(error) {
            log.error("Fail to fetch data");
        });
    }

    service.getItems = function() {
        console.log(found);
        return found;
    }

    service.removeItem = function(itemIndex) {
        found.splice(itemIndex, 1);
    }
}

})();
