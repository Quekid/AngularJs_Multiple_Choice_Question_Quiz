//Test Locker directive.
(function () {
  angular.module("test-directives").directive("testLocker", function ($rootScope) {
    return {
      restrict: "E",
      scope: {},
      templateUrl: "onlineTest/templates/testLocker.html",
      controller: ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {
        //Check if user is enrolled for the test.
        $rootScope.isUserEnrolled = function () {
          if ($rootScope.userName == null) {
            $rootScope.locker = true;
            return false;
          }
          return true;
        }
        //Unlock test if the user is enrolled for the test.
        $scope.unlockLoacker = function () {
          if ($scope.userName) {
            $rootScope.userName = $scope.userName;
            if ($rootScope.userName) {
              $rootScope.locker = false;
              $state.go('testLaunch');
            }
          }else{
            $scope.isError =true;
            $scope.errorMessage = "Please enter your name";
          }
        }
      }]
    };
  });
})();