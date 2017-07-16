(function () {
  /**
   * 
   */
  angular.module('test.service')
    .factory('testDelivery', ['$http', function ($http) {
      var getTestData = function () {
        return $http.get('json/test_delivery.json').then(function (response) {
          return response.data;
        });
      }
      return {
        getTestData: getTestData
      }
    }])
})();