(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiPath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var menu = this;

    menu.getMatchedItems = function() {
        MenuSearchService.getMatchMenuItems(menu.searchTerm);
    }

    menu.items = MenuSearchService.getItems();

    console.log(menu.items);

    menu.removeItem = function(itemIndex) {
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
            return found;
        })
        .catch(function(error) {
            log.error("Fail to fetch data");
        });
    }

    service.getItems = function() {
        return found;
    }

    service.removeItem = function(itemIndex) {
        items.splice(itemIndex, 1);
    }
}

FoundItems.$inject = ['MenuSearchService'];
function FoundItems() {
    var ddo = {
        scope: {
            list: '=foundItems'
        },
        templateURL: './foundItems.html'
    };
    return ddo;
}

})();