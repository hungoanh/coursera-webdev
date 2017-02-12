(function(){
'use strict';

angular.module('Data', [])
.controller('MenuDataController', MenuDataController);

MenuDataController.$inject = ['MenuDataService'];
function MenuDataController(MenuDataService) {
}

})();
