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

    // ViewModel
    var vm = this;

    // Exposed to the view
    vm.scrolling = false;
    vm.goToContent = goToContent;
    vm.windowHeight = $window.innerHeight;
    //vm.windowWidth = $window.innerWidth;

    /**
     * Improve scrolling performance by disabling hover during scroll events
     * @link http://www.thecssninja.com/javascript/pointer-events-60fps
     */
    var resizeTimer;
    angular.element($window).bind("resize", function() {

        if(resizeTimer !== false) $timeout.cancel(resizeTimer);

        resizeTimer = $timeout(function(){
            vm.windowHeight = $window.innerHeight;
            resizeTimer = false;
        }, 350);
    });


    /**
     * Improve scrolling performance by disabling hover during scroll events
     * @link http://www.thecssninja.com/javascript/pointer-events-60fps
     */
    var scrollTimer;
    angular.element($window).bind("scroll", function() {
        vm.scrolling = true;

        if(scrollTimer !== false) $timeout.cancel(scrollTimer);

        scrollTimer = $timeout(function(){
            vm.scrolling = false;
            scrollTimer = false;
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
        $coverBlur = angular.element("#cover-blur"),
        $headerDown = angular.element("#page-header .down"),
        $headerTitle = angular.element("#page-header .title");

    angular.element($window).bind("scroll", function() {
        var scrolly = $(window).scrollTop();

        // Navigation background color
        $naviBg.css("opacity", scrolly / 70);

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
