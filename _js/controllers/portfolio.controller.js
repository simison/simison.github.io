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

})();
