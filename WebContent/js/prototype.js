var prototypeApp = angular.module('prototype',[]);

prototypeApp.controller('prototypeCntrl',['$scope','$compile', function($scope,$compile){
	
	$scope.name = "Angular Testing App";
	$scope.click = function () {
		console.log("click");
		$scope.name = "I have done intial testing of angular";
		
		$scope.text = "hi";
		
		$scope.fn1 = function() {
			console.log("function fn1  !!!  ");
		};
		
		//calling a directive
		var html = "<first-div name='name' text='text'></first-div>";
		var content = $compile(html)($scope);
		$("#jq-same").html(content);
	};
	
	//$scope.click();
	
}]);

prototypeApp.directive('firstDiv', function(){
	return {
		restrict : 'E',
		scope : {
			name : "=",
			text : "="
		},
		compile : function (tEle, tAttrs) {
			console.log("level-one" + tEle.html());
			tEle.append("Hello****" + tAttrs.name);
			return {
				pre : function ($scope, iEle, iAttrs) {
					console.log("pre" + iEle.html());
				},
				post : function ($scope, iEle, iAttrs) {
					console.log("post" + iEle.html());
					iEle.append("doremon******" + $scope.name);
				}
			};
		},
		controller : ['$scope', function ($scope) {
			$scope.abc = $scope.name;
			$scope.name = "xyz";
			$scope.as = $scope.text;
			$scope.text = "Bye";
		}],
		template: "<input type='text' value='{{abc}}'>{{abc}}{{text}}{{as}}"
	};
});

