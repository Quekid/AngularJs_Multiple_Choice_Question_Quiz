(function () {
  // This prevents you from using variables without declaring them first. New in js 1.8.5.
  // Previous js versions ignore it.
  "use strict";

  /**
   * Inject dependancies for the app. 
   */
  var app = angular.module('onlineTest', [
    'ui.router',
    'ngSanitize',
    'test'
  ])

  /**
   * App Configuration.
   */
  app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/testLaunch');

    $stateProvider

      // testLaunch state for test launch view.
      .state('testLaunch', {
        url: '/testLaunch',
        views: {
          '': {
            controller: 'testLaunchCtrl as testLn',
            templateUrl: 'onlineTest/view/testLaunch.html'
          }
        }
      })
      // testDelivery state for Test Delivery view.
      .state('testDelivery', {
        url: '/testDelivery',
        views: {
          '': {
            controller: 'testDeliveryCtrl as testDelivery',
            templateUrl: 'onlineTest/view/testDelivery.html'
          }
        }
      })
      // testResult state for Test result view.
      .state('testResult', {
        url: '/testResult',
        views: {
          '': {
            controller: 'testResultCtrl as testResult',
            templateUrl: 'onlineTest/view/testResult.html'
          }
        }
      });
  })

})();     
