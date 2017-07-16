(function () {
  angular.module('test.controllers').controller('testResultCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $rootScope.isUserEnrolled();
    $rootScope.candidateName = $rootScope.userName;
    $scope.testResult = JSON.parse(localStorage.getItem($rootScope.candidateName))
    $scope.score = parseInt($scope.testResult.score);
    $scope.wrongAnswers = parseInt($scope.testResult.wrongAnswers);
    $scope.totalQuestions = parseInt($scope.testResult.totalQuestions);
    $scope.scoreInPercentage = ($scope.score/$scope.totalQuestions)*100;
    $scope.wrongAnswerInPercentage = ($scope.wrongAnswers/$scope.totalQuestions)*100;
 }])
})();