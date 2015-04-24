/**
 * Main Controller
 */
mikael.controller('mainCtrl', function($scope, $rootScope, $window, $document, $browser, $timeout) {

    /**
     * Improve scrolling performance by disabling hover during scroll events
     * @link http://www.thecssninja.com/javascript/pointer-events-60fps
     */
    $scope.scrolling = false;
    var scrollTimer;
    angular.element($window).bind("scroll", function() {
        $scope.scrolling = true;

        if(scrollTimer != false) $timeout.cancel(scrollTimer);

        scrollTimer = $timeout(function(){
            $scope.scrolling = false;
            //$timeout.cancel(scrollTimer);
            scrollTimer = false;
        }, 350);

        //$scope.$apply();
    });


	/*
	 * Header animation while scrolling
	 */
	var $naviBg = $("#navigation-bg"),
	    $coverBlur = $("#cover-blur"),
	    $headerDown = $("#page-header .down"),
	    $headerTitle = $("#page-header .title");

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

});
