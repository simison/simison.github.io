/*
 * Tooltips
 * Usage: <a href="#" tt title="I'm a tooltip!">Foo</a>
 */
(function() {
  'use strict';

  angular
    .module('app')
    .directive('tt', mkTooltip);

  /* @ngInject */
  function mkTooltip($document) {
    return function(scope, element, attr) {
      element.hover(function(){
        // Hover over code
        var title = element.attr('title');
        element.data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('fast');
      }, function() {
        // Hover out code
        element.attr('title', element.data('tipText'));
        $('.tooltip').remove();
      }).mousemove(function(e) {
        var mousex = e.pageX + 20; //Get X coordinates
        var mousey = e.pageY + 10; //Get Y coordinates
        $('.tooltip').css({ top: mousey, left: mousex });
      });
    };
  }

})();
