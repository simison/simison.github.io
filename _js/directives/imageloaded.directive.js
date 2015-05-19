/**
 * Directive to add CSS class to loaded images (to perform animation)
 */
(function() {

  angular
      .module('app')
      .directive('imageloaded', imageloaded);

  /* @ngInject */
  function imageloaded() {
      'use strict';
      return {
          restrict: 'A',
          link: function(scope, element, attrs) {
              var cssClass = attrs.loadedclass;
              element.bind('load', function (e) {
                  angular.element(element).addClass(cssClass);
              });
          }
      };
  }

})();
