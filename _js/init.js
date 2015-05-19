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
