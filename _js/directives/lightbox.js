
/*
 * LightBox directive using FancyBox
 *
 * @link https://github.com/fancyapps/fancyBox
 */

//mikael.directive('lightbox', function() {
//  return {
//    restrict: 'A',
//    link: function(scope, element) {
//      if (scope.$last) setTimeout(function() {
//       $('.lightbox').fancybox({
//          openEffect : 'elastic',
//          theme : 'dark',
//          padding : 0
//        });
//       }, 1);
//    }
//  };
//});
 $('.lightbox').fancybox({
          openEffect : 'elastic',
          padding : 0
        });