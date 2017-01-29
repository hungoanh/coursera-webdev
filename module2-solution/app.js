(function() {
    'use strict';
    
    angular.module('ShoppingListApp', [])
    .controller('ShoppingListCtrl', ShoppingListCtrl)
    .provider('ShoppingListService', ShoppingListServiceProvider)
    .config(Config);

    Config.$inject = ["ShoppingListServiceProvider"];
    function Config(ShoppingListServiceProvider) {
        ShoppingListServiceProvider.defaults.buyItems = [
            {
                name: "bags of tangerines",
                quantity: "3"
            },
            {
                name: "tubs of mint chocolate ice cream",
                quantity: "2"
            },
            {
                name: "boxes of Krispy Kreme Donuts",
                quantity: "2"
            },
            {
                name: "loaves of French baguettes",
                quantity: "5"
            },
            {
                name: "rotisserie chickens",
                quantity: "4"
            }
        ];
    }

    ShoppingListCtrl.$inject = ['ShoppingListService'];
    function ShoppingListCtrl(ShoppingListService) {
        var list1 = this;

        list1.items = ShoppingListService.getBuyItems();
        
        list1.boughtItems = ShoppingListService.getBoughtItems();

        list1.removeItem = function(itemIndex) {
            console.log(itemIndex);
            ShoppingListService.removeItem(itemIndex);
        };
    }

    function ShoppingListService(items) {
        var service = this;
        
        var boughtItems = [];

        service.removeItem = function(item) {
            boughtItems.push(items[item]);
            items.splice(item, 1);
        };

        service.getBuyItems = function() {
            return items;
        };

        service.getBoughtItems = function() {
            return boughtItems;
        }
    }

    function ShoppingListServiceProvider() {
        var provider = this;

        provider.defaults = {buyItems: []};
        provider.$get = function() {
            return new ShoppingListService(provider.defaults.buyItems);
        };        
    }
})();