/**
 * Controller for portfolio
 */
mikael.controller('portfolioCtrl', function($scope, $document, $window) {

    // Open modal
    $scope.openCard = function(card) {
        ga('send', {
          'hitType': 'event',          // Required.
          'eventCategory': 'portfolio-work',   // Required.
          'eventAction': 'open',      // Required.
          'eventLabel': 'Portfolio work open',
          'eventValue': card.title
        });
        if(!card.open_url_directly) $scope.card = card;
        else $window.location = card.url;
    };

    // Squeeze the duck!
    $scope.duckie = function(play) {
        if (!$scope.kvaak) {
            $scope.kvaak = new Audio('/assets/audio/kvaak.mp3');
            ga('send', {
              'hitType': 'event',          // Required.
              'eventCategory': 'duck',   // Required.
              'eventAction': 'load',      // Required.
              'eventLabel': 'Duck loaded'
            });
        }

        // ngMouseover will just load this (and not play), hence the boolean
        if(play) {
          $scope.kvaak.play();
          ga('send', {
            'hitType': 'event',          // Required.
            'eventCategory': 'duck',   // Required.
            'eventAction': 'play',      // Required.
            'eventLabel': 'Duck!'
          });
        }
    }


    // Portfolio contents
    $scope.works = $window.portfolio;

    // Open modal
    $scope.card = false;

    $scope.cardURL = function(card) {
        return (card.open_url_directly) ? card.url : '#';
    };

    // Close modal
    $scope.closeCard = function() {
        ga('send', {
          'hitType': 'event',          // Required.
          'eventCategory': 'portfolio-work',   // Required.
          'eventAction': 'close',      // Required.
          'eventLabel': 'Portfolio work closed',
          'eventValue': $scope.card.title
        });
        $scope.card = false;
    };
    // Close modal on Esc
    $document.bind('keydown', function(e) {
        if(e.which === 27) { // Esc
            $scope.closeCard();
            $scope.$apply();
        }
    });



});
