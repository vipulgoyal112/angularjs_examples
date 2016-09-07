angular.module('html5-mode', [])
/*
.constant('initUrl', 'http://www.example.com/base/path?a=b#h')
.constant('baseHref', '/base/index.html')
.value('$sniffer', { history: true })*/

.controller("LocationController", function($scope, $location, $http) {
  /*$scope.$location = {};
  angular.forEach("protocol host port path search hash".split(" "), function(method){
   $scope.$location[method] = function(){
     var result = $location[method].call($location);
     return angular.isObject(result) ? angular.toJson(result) : result;
   };
  });
  */
	
	var fn = function (_url) {
		console.log("_url" + _url);
		$http.get(_url).success(function(res){
			  $("#jq_html").html(res);
		  });
	};
	
	
	
	$scope.$on("$locationChangeSuccess", function (event)
    {
		console.log($location.absUrl().indexOf("index"));
		if ($location.absUrl().indexOf("index") < 0) {
			console.log("1 : " + $location.absUrl());
			fn($location.absUrl());
		}
    });
	
	
	
	$scope.test2 = function () {
		  var _url = '/static/html/test-button1.html';
		  $location.path(_url);
		  //fn(_url);
	  };
	  
	$scope.test2();  
	
  $scope.test = function () {
	  var _url = '/static/html/test-button.html';
	  $location.path(_url);
	  //fn(_url);
  };
})

.config(function($locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
})

.run(function($rootElement) {
  $rootElement.on('click', function(e) { e.stopPropagation(); });
});