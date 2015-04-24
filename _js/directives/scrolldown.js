/*
 * Scroll down from cover image
 */
//mikael.directive('gotocontent', ['$document', function($document) {
//  return function(scope, element, attr) {
//    element.click(function(){
//      $document.scrollToElement( angular.element(document.getElementById('container')), 30, 200 );
//    });
//  };
//}]);

//mikael.directive('gotocontent', function($document) {
//  return function(scope, element, attrs, $document) {
//    var scrollDown = function($document) {
//      $document.scrollToElement( angular.element(document.getElementById('container')), 30, 200 );
//    };
//    element.bind('click', scrollDown);
//  }
//});
//mikael.directive('gotocontent', ['$document', function($document) {
////mikael.directive('gotocontent', function($document){
//     return {
//       restrict: 'A',
//       scope: true,
//       template: '<button class="down" ng-click="goToDown()"></button>',
//       controller: function($scope, $element, $document){
//         $scope.goToDown = function(){
//           $document.scrollToElement( angular.element(document.getElementById('container')), 30, 200 );
//         }
//       }
//     }
// //  });
//}]);
