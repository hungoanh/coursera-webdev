(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://the-golden-pears.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
