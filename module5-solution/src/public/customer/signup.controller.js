(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService'];
function SignupController(MenuService) {
  var ctrl = this;

  ctrl.submit = function() { 
    ctrl.error = false;
    var promise = MenuService.getMenuItemByShortName(ctrl.favorite);
    promise.then(function (value) {
      if (value.status === 200) {
        ctrl.item = "Your favorite dish is " + value.data.name;
        MenuService.setCustomerInfo({
          firstname: ctrl.firstname,
          lastname: ctrl.lastname,
          email: ctrl.email,
          phone: ctrl.phone,
          favorite: ctrl.favorite
        });
      } else {
        ctrl.item = "No such menu number exists!";
      }
    });
  }
}
})();