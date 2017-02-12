(function(){
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);
// items made available via state's resolve
ItemsController.$inject = ['items'];
function ItemsController(items) {
    var itemDetail = this;
    itemDetail.cat = items.data.category;
    itemDetail.items = items.data.menu_items;
} 
})();