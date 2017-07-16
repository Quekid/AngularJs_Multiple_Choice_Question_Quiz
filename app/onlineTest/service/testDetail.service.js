(function () {
  /**
   * 
   */
  angular.module('test.service')
    .factory('testDetails', ['$http', function ($http) {
      var getTestDetails = function () {
        return $http.get('json/test_details.json').then(function (response) {
          return response.data;
        });
      }
      return {
        getTestDetails: getTestDetails
      }
    }])
})();