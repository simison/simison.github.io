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

})();
