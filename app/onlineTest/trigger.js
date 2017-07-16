//Inititalize the test launch module.
(function () {
  angular.module("test.controllers",[]);
  angular.module("test.service",['ngResource']);
  angular.module("test-directives",[]);
  angular.module("test", [
      "test.service",
      "test-directives",
      "test.controllers",
      "ngRoute"]);
})();


