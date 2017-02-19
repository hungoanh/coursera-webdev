(function(){
    
angular.module('public')
.component('customerInfo', {
    templateUrl: 'src/public/customer/templates/customerlist.template.html',
    bindings: {
        item: '<'
    }
});

})();