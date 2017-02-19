(function () {
"use strict";

angular.module('public')
.controller('CustomerInfoController', CustomerInfoController);

CustomerInfoController.$inject = ['customerInfo', 'ApiPath', 'MenuService'];
function CustomerInfoController(customerInfo, ApiPath, MenuService) {
  var customer = this;
  if (angular.isObject(customerInfo) === false) {
    customer.info = null;
  } else { 
    var info = {
      fullname : customerInfo.firstname + " " + customerInfo.lastname,
      email: customerInfo.email,
      phone: customerInfo.phone,
      favorite: customerInfo.favorite
    };
    customer.info = info;
    customer.info.basePath = ApiPath;
    var promise = MenuService.getMenuItemByShortName(customerInfo.favorite);
    promise.then(function (value) {
        customer.info.favoriteName = value.data.name;
        customer.info.favoriteDescription = value.data.description;
    });
  }
}
})();