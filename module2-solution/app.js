(function() {
    'use strict';
    
    angular.module('ShoppingListApp', [])
    .controller('ShoppingListCtrl1', ShoppingListCtrl1)
    .controller('ShoppingListCtrl2', ShoppingListCtrl2)
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

    ShoppingListCtrl1.$inject = ['ShoppingListService'];
    function ShoppingListCtrl1(ShoppingListService) {
        var list1 = this;

        list1.items = ShoppingListService.getBuyItems();

        list1.removeItem = function(itemIndex) {
            ShoppingListService.removeItem(itemIndex);
        };
    }

    ShoppingListCtrl2.$inject = ['ShoppingListService'];
    function ShoppingListCtrl2(ShoppingListService) {
        var list2 = this;
        
        list2.items = ShoppingListService.getBoughtItems();
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