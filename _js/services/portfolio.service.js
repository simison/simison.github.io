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

})();
