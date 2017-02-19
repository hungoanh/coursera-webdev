(function () {
"use strict";

angular.module('public')
.controller('CustomerInfoController', CustomerInfoController);

CustomerInfoController.$inject = ['customerInfo', 'ApiPath'];
function CustomerInfoController(customerInfo, ApiPath) {
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
  }
}
})();