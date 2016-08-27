/**
 * Portfolio Factory
 * @namespace Factories
 */
(function() {
  'use strict';

  angular
    .module('app')
    .factory('PortfolioService', PortfolioService);

  /**
   * @namespace PortfolioService
   * @desc Portfolio service used for communicating with the REST endpoint
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
            $log.error('XHR Failed for portfolio.' + error.data);
        }
    }
  }

})();
