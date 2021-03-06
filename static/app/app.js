var xoryApp = angular.module('xoryApp', [
  'ngRoute',
]);

xoryApp.factory('questionService', function($http) { 
  var result; 
  return {
      qdata : function(callback, name) {
          if (!result || name) {
             console.log('lodeit');
              result = $http.get('quiz/' + name).success(callback);  
          }
          return result;
      },
      refreshQdata : function (callback) {
         return $http.get('static/question.json').success(callback);  
      },
      setData: function(data) {
        result = data;
      }
  };
});
 
xoryApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/question/:name', {
        templateUrl: 'static/question.html',
        controller: 'QuestionCtrl'
      }).
      when('/question/', {
        templateUrl: 'static/question.html',
        controller: 'QuestionCtrl'
      }).
      when('/answer', {
        templateUrl: 'static/answer.html',
        controller: 'QuestionCtrl'
      }).
      when('/result', {
        templateUrl: 'static/result.html',
        controller: 'QuestionCtrl'
      }).
      when('/create', {
        templateUrl: 'static/create.html',
        controller: 'CreateCtrl'
      }).
      otherwise({
        redirectTo: '/questions'
      });
  }]);

function CreateCtrl($scope, $location, $http) {
  $scope.data = {'name': '', 'xchoice': '', 'ychoice': '', questions: []}

  $scope.add_question = function() {
    $scope.data.questions.push({'question':'', 'answer':''})
  }

  $scope.create = function() { 
    $http({
            method : 'POST',
            url : '/save',
            data : $scope.data
        }).success(function(data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
          $location.path("question/" + data)
        })
  }
}

function QuestionCtrl($scope, $location, questionService, $routeParams) {
  $scope.name = $routeParams.name

  $scope.qdata = questionService.qdata(function(results) {
        results.quiz.x = 0;
        results.quiz.rightAnswers = 0;
        results.quiz.res = false,
        $scope.qdata = results.quiz;
  }, $scope.name); 
  
  $scope.answer1 = function() {
    $location.path("answer")
    if ($scope.qdata.questions[$scope.qdata.x].answer == "x") {
      $scope.qdata.rightAnswers = $scope.qdata.rightAnswers + 1
      $scope.qdata.res = true
      $scope.qdata.answer = $scope.qdata.xchoice
    }
    else {
      $scope.qdata.res = false
      $scope.qdata.answer = $scope.qdata.ychoice
    }
    $scope.qdata.x = $scope.qdata.x + 1
    questionService.setData($scope.qdata)
    return false;
  }

  $scope.answer2 = function () {
    $location.path("answer")
    if ($scope.qdata.questions[$scope.qdata.x].answer == "y") {
      $scope.qdata.rightAnswers = $scope.qdata.rightAnswers + 1
      $scope.qdata.res = true
    }
    else {
      $scope.qdata.res = false
    }
    $scope.qdata.x = $scope.qdata.x + 1
    questionService.setData($scope.qdata)
    return false;
  }

  $scope.nextQuestion = function() {
    if ($scope.qdata.x == $scope.qdata.questions.length ) {
      $location.path("result")
    }
    else {
      $location.path("question/")
    }
  }
};


