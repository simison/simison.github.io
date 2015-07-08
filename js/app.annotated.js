/**
 * modal modal
 * @link http://codepen.io/hakimel/pen/wFfGs
 */
(function(){

  var container = document.documentElement,
    popup = document.querySelector( '.modal-popup' ),
    cover = document.querySelector( '.modal-cover' ),
    currentState = null;

  // Deactivate on ESC
  function onDocumentKeyUp( event ) {
    if( event.keyCode === 27 ) {
      deactivate();
    }
  }

  // Deactivate on click outside
  function onDocumentClick( event ) {
    if( event.target === cover ) {
      deactivate();
    }
  }

  function activate( state ) {
    document.addEventListener( 'keyup', onDocumentKeyUp, false );
    document.addEventListener( 'click', onDocumentClick, false );

    removeClass( popup, currentState );
    addClass( popup, 'no-transition' );
    addClass( popup, state );

    setTimeout( function() {
      removeClass( popup, 'no-transition' );
      addClass( container, 'modal-active' );
    }, 0 );

    currentState = state;
  }

  function deactivate() {
    document.removeEventListener( 'keyup', onDocumentKeyUp, false );
    document.removeEventListener( 'click', onDocumentClick, false );

    removeClass( container, 'modal-active' );
  }

  function disableBlur() {
    addClass( document.documentElement, 'no-blur' );
  }

  function addClass( element, name ) {
    element.className = element.className.replace( /\s+$/gi, '' ) + ' ' + name;
  }

  function removeClass( element, name ) {
    element.className = element.className.replace( name, '' );
  }

  window.modal = {
    activate: activate,
    deactivate: deactivate,
    disableBlur: disableBlur
  };

})();

//'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
  // Init module configuration options
  var applicationModuleName = 'mk';
  var applicationModuleVendorDependencies = [
                                              'ngAnimate',
                                              'ngSanitize',
                                              'akoenig.deckgrid',
                                              'angular-flexslider',
                                              'ui.keypress',
                                              '720kb.tooltips'
                                            ];

  // Add a new vertical module
  var registerModule = function(moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
  };
})();

(function() {
  'use strict';

  // Main module and add the module dependencies
  angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

  // Setting HTML5 Location Mode
  /*
  angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
    function($locationProvider) {
      $locationProvider.html5Mode(true).hashPrefix('!');
    }
  ]);
  */

  // Define the init function for starting up the application
  angular.element(document).ready(function() {
    // Init the app
    angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
  });
  
})();

(function() {
  'use strict';

  // Use Application configuration module to register a new module
  ApplicationConfiguration.registerModule('app');
})();

/**
 * Portfolio Factory
 * @namespace Factories
 */
//(function() {
//  'use strict';
//
//  angular
//    .module('app')
//    .factory('PortfolioService', PortfolioService);
//
//  /**
//   * @namespace PortfolioService
//   * @desc Portfolio service used returning portfolio contents
//   * @memberOf Factories
//   */
//  /* @ngInject */
//  function PortfolioService($http) {
//
//    var service = {
//      get: getPortfolio
//    };
//
//    return service;
//
//    function getPortfolio() {
//      return $http.get('/portfolio/contents.json')
//          .then(getPortfolioComplete)
//          .catch(function(message) {
//            exception.catcher('XHR Failed for PortfolioService->get()')(message);
//          });
//      function getPortfolioComplete(data, status, headers, config) {
//        console.log('->getPortfolioComplete');
//        console.log(data, status, headers, config);
//        return data.works;
//      }
//    }
//
//  }
//
//})();

/**
 * Bookmarks Factory
 * @namespace Factories
 */
(function() {
  'use strict';

  angular
    .module('app')
    .factory('PortfolioService', PortfolioService);

  /**
   * @namespace BookmarksService
   * @desc Bookmarks service used for communicating with the REST endpoint
   * @memberOf Factories
   */
  /* @ngInject */
  function PortfolioService($http, $log) {

    return {
        getPortfolio: getPortfolio
    };

    function getPortfolio() {
        return $http.get('/portfolio/contents.json')
            .then(getPortfolioComplete)
            .catch(getPortfolioFailed);

        function getPortfolioComplete(response) {
            return response.data.works;
        }

        function getPortfolioFailed(error) {
            $log.error('XHR Failed for getAvengers.' + error.data);
        }
    }
  }
  PortfolioService.$inject = ['$http', '$log'];

})();

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

/**
 * Controller for Application
 */
(function() {
  'use strict';

  angular
    .module('app')
    .controller('AppController', AppController);

  /* @ngInject */
  function AppController($log, $window, $document, $browser, $timeout) {

    var resizeTimer;

    // ViewModel
    var vm = this;

    // Exposed to the view
    vm.scrolling = false;
    vm.goToContent = goToContent;
    vm.windowHeight = $window.innerHeight;

    /**
     * Update variables when resizing window
     */
    angular.element($window).bind("resize", calculateWindowSize);
    angular.element($window).bind("orientationchange", calculateWindowSize);

    function calculateWindowSize() {

      if(resizeTimer !== false) $timeout.cancel(resizeTimer);

      resizeTimer = $timeout(function(){
        vm.windowHeight = $window.innerHeight;
        resizeTimer = false;
      }, 350);
    }

    /**
     * Improve scrolling performance by disabling hover during scroll events
     * @link http://www.thecssninja.com/javascript/pointer-events-60fps
     */
    var scrollFalseTimer, scrollTrueTimer;
    angular.element($window).bind("scroll", function() {

      // Set scroller flag
      if(scrollTrueTimer !== false) {
        $timeout.cancel(scrollTrueTimer);
      }
      scrollTrueTimer = $timeout(function(){
        vm.scrolling = true;
        scrollTrueTimer = false;
      }, 100);

      // Remove scroller flag
      if(scrollFalseTimer !== false) {
        $timeout.cancel(scrollFalseTimer);
      }
      scrollFalseTimer = $timeout(function(){
        vm.scrolling = false;
        scrollFalseTimer = false;
      }, 350);

    });

    /**
     * Scroll down to content
     */
    function goToContent() {
      $('html, body').animate({
        scrollTop: ($('#content').offset().top - 50)
      }, 250);
    }

    /**
     * Header animation while scrolling
     */
    var $naviBg = angular.element("#navigation-bg"),
        $menuItems = angular.element("#navigation .menuitem"),
        $coverBlur = angular.element("#cover-blur"),
        $headerDown = angular.element("#page-header .down"),
        $headerTitle = angular.element("#page-header .title");

    var whiteHeaderLinks = (["me", "cv"].indexOf(angular.element("body").attr("id")) > -1);
    if(whiteHeaderLinks) {
      $menuItems.css("color", "#fff");
    }

    angular.element($window).bind("scroll", function() {
      var scrolly = $(window).scrollTop();

      // Navigation background color
      $naviBg.css("opacity", scrolly / 70);

      // On these pages, start with white links
      if(whiteHeaderLinks) {
        if(scrolly < 25) {
          $menuItems.css("color", "#fff");
        } else {
          $menuItems.attr("style", "");
        }
      }

      // Header blurry images
      if($coverBlur.length) $coverBlur.css("opacity", scrolly / 240);

      // Fade v-link out when scrolling down
      if($headerDown.length) $headerDown.css("opacity", -(scrolly / 70) + 1 );

      // Title parallax
      if($headerTitle.length) $headerTitle.css("padding-top", Math.round(scrolly / 3.5) + 'px' );

    });

    /**
     * LightBox using FancyBox
     *
     * @todo: turn into directive
     * @link https://github.com/fancyapps/fancyBox
     */
    angular.element('.lightbox').fancybox({
      openEffect : 'elastic',
      padding : 0
    });

  }
  AppController.$inject = ['$log', '$window', '$document', '$browser', '$timeout'];

})();

/**
 * Controller for Portfolio
 */
(function() {
  'use strict';

  angular
    .module('app')
    .controller('PortfolioController', PortfolioController);

  /* @ngInject */
  function PortfolioController($log, $scope, $document, PortfolioService) {

    // ViewModel
    var vm = this;

    // Exposed to the view
    vm.works = [];//PortfolioService.getPortfolio();
    vm.card = false;
    vm.kvaak = null;
    vm.duckie = duckie;
    vm.closeCard = closeCard;

    // DeckGrid requires $scope
    $scope.cardURL = cardURL;
    $scope.openCard = openCard;

    activate();

    function activate() {
      return getPortfolio().then(function() {
        $log.info('Activated Portfolio View');
      });
    }

    function getPortfolio() {
      return PortfolioService.getPortfolio()
        .then(function(data) {
          vm.works = data;
          return vm.works;
        });
    }

    // Open modal
    function openCard(card) {
      ga('send', {
        'hitType': 'event', // Required.
        'eventCategory': 'portfolio-work', // Required.
        'eventAction': 'open', // Required.
        'eventLabel': 'Portfolio work open',
        'eventValue': card.title
      });
      if(!card.open_url_directly) vm.card = card;
      else $window.location = card.url;
    }

    function cardURL(card) {
      return (card.open_url_directly) ? card.url : '#';
    }

    // Close modal
    function closeCard() {
        ga('send', {
          'hitType': 'event', // Required.
          'eventCategory': 'portfolio-work', // Required.
          'eventAction': 'close', // Required.
          'eventLabel': 'Portfolio work closed',
          'eventValue': vm.card.title
        });
        vm.card = false;
    }

    // Close modal on Esc
    $document.bind('keydown', function(e) {
      if(e.which === 27) { // Esc
        closeCard();
      }
    });

    // Squeeze the duck!
    function duckie(play) {
      if (vm.kvaak === null) {
        vm.kvaak = new Audio('/assets/audio/kvaak.mp3');
        ga('send', {
          'hitType': 'event', // Required.
          'eventCategory': 'duck', // Required.
          'eventAction': 'load', // Required.
          'eventLabel': 'Duck loaded'
        });
      }

      // ngMouseover will just load this (and not play), hence the boolean
      if(play) {
        vm.kvaak.play();
        ga('send', {
          'hitType': 'event', // Required.
          'eventCategory': 'duck', // Required.
          'eventAction': 'play', // Required.
          'eventLabel': 'Duck!'
        });
      }
    }

  }
  PortfolioController.$inject = ['$log', '$scope', '$document', 'PortfolioService'];

})();
