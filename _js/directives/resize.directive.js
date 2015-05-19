/**
 * Resizable Directive
 * @namespace Directives
 * @link http://microblog.anthonyestebe.com/2013-11-30/window-resize-event-with-angular/
 */
 /*
(function() {

  angular
      .module('app')
      .directive('resizable', resizable);

  * @ngInject *
  function resizable($window) {
      'use strict';
      return {
          restrict: 'A',
          link: function(scope, element, attrs) {
              function doWindowSize() {
                scope.windowHeight = $window.innerHeight;
                scope.windowWidth = $window.innerWidth;
                console.log('resize!');
              }
              doWindowSize();
              angular.element($window).bind('resize', function() {
                doWindowSize();
                scope.$apply();
              });
          }
      };
  }

})();
*/
/*

(function() {
 'use strict';

  angular
      .module('app')
      .directive('resizable', appResizable);

  / @ngInject *
  function appResizable($scope, $window) {
    return function(scope) {
      function doWindowSize() {
        scope.windowHeight = $window.innerHeight;
        scope.windowWidth = $window.innerWidth;
      }
      doWindowSize();
      return angular.element($window).bind('resize', function() {
        doWindowSize();
        return scope.$apply();
      });
    };
  }

})();
*/
