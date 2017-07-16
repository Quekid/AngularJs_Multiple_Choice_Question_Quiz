(function () {
  angular.module('test.controllers').controller('testLaunchCtrl', ['$http', '$scope', 'testDetails','$rootScope', function ($http, $scope, testDetails, $rootScope) {
    $rootScope.isUserEnrolled();
    $rootScope.candidateName = $rootScope.userName;
    testDetails.getTestDetails().then(function (data) {
      $scope.testDetails = data;
    }).catch(function (error) {
      console.log("Error:", error);
    });
  }])
})();