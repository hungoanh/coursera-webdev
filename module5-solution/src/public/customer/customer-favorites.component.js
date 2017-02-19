(function(){
    
angular.module('public')
.component('favoriteList', {
    templateUrl: 'src/public/customer/templates/favoritelist.template.html',
    bindings: {
        item: '<'
    }
});

})();