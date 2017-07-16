(function () {
  angular.module('test.controllers').controller('testDeliveryCtrl', ['$http', '$scope', '$sce', '$interval', 'testDelivery', 'testDetails','$timeout','$state','$rootScope',
    function ($http, $scope, $sce, $interval, testDelivery, testDetails, $timeout, $state,$rootScope) {
    $rootScope.isUserEnrolled();
    $rootScope.candidateName = $rootScope.userName;
      //Call testDelivery service to get test questions.
      testDelivery.getTestData().then(function (data) {
        $scope.testData = data;
        $scope.currentQuestion = $scope.testData.questions[0];
        $scope.currentQuestionIndex = 0;
        $scope.navigateQuestion(0);
      })
        .catch(function (error) {
          $scope.showError(error);
          $state.go('testLaunch');
        });

      //Time for the test in minutes.
      $scope.min = 20;
      $scope.seconds = 00;

      //Function to update time.
      $scope.updateTime = function () {
        if($scope.min == 0){
          $scope.showError("Test will be auto submitted after time up.")
        }
        if($scope.min == 0 && $scope.seconds == 1){
          $scope.submitAndCheckScore();
          $state.go('testResult');
        }
        if ($scope.seconds == 0 && $scope.min > 0) {
          $scope.min--;
          $scope.seconds = 60;
        }
        $scope.seconds--
      }

      //Update time after every second.
      $interval($scope.updateTime, 1000, 0);

      //Function to navigate between questions.
      $scope.navigateQuestion = function (index) {
        if (index < 0 || index >= $scope.testData.questions.length) {
          $scope.showError("There is no further question.");
          return false;
        }
        $scope.currentQuestion = $scope.testData.questions[index];
        document.getElementById("question").innerHTML = $scope.currentQuestion.questionName;
        $scope.currentQuestionIndex = index;
      }
      
      //User Answers
      $scope.answers = [];

      //Set Answer for the currently selected question.
      $scope.setAnswer = function (answer) {
        if($scope.checkPreviouslySelected(answer)){
          $scope.answers.splice($scope.currentQuestionIndex,1);
          return true;
        } 
        $scope.answers[$scope.currentQuestionIndex] = answer;
      }

      //Get test details with the help of testDetails service
      testDetails.getTestDetails().then(function (data) {
        $scope.testDetails = data;
      }).catch(function (error) {
        $scope.showError(error);
      });

      //Submit answers and check score.
      $scope.submitAndCheckScore = function () {
        if($scope.min > 1){
          if($scope.answers.length < $scope.testData.questions.length){
            $scope.showError("All questions are mandatory.");
            return false;
          }
        }
        $scope.score = 0;
        $scope.wrongAnswers = 0;
        for (i = 0; i < $scope.testData.questions.length; i++) {
          if ($scope.answers[i] == $scope.testData.questions[i].answer) {
            $scope.score++;
          }else if($scope.answers[i] &&  $scope.answers[i] != $scope.testData.questions[i].answer){
            $scope.wrongAnswers++;
          }
        }
        $scope.testResult = {
          "candidateName":$rootScope.candidateName,
          "totalQuestions":$scope.testData.questions.length,
          "score":$scope.score,
          "wrongAnswers":$scope.wrongAnswers
        }
        localStorage.setItem($scope.candidateName, JSON.stringify($scope.testResult));
        $state.go('testResult');
      }

      //Check if answer is previously selected. This will show selected answers while navigating questions.
      $scope.checkPreviouslySelected = function (option) {
        return ($scope.answers[$scope.currentQuestionIndex] === option);
      }

      //Function to show error.
      $scope.showError = function (error) {
        $scope.isError = true;
        $scope.errorMessage = error;
        $timeout($scope.hideError, 5000, 0);
      }

      //Function to hide error
      $scope.hideError = function(){
        $scope.isError = false;
      }
      
    }])
})();