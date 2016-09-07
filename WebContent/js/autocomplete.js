

var myApp = angular.module('autocomplete', []);

myApp.controller('autoCompleteController', ['$scope','$http', '$compile', function($scope, $http, $compile){
	
	$scope.search = function () {
		
		$("#jqi-ac-in").show();
		
		var fn = function() {
			/*var html = "<search-card></search-card>";
			var content = $compile(html)($scope);
			$("#jq-channel-cards").html(content);
			*/
			
			var html = "<duplicate-card></duplicate-card>";
			var content = $compile(html)($scope);
			$("#jq-channel-cards").html(content);
			
			var html = "<duplicate-card></duplicate-card>";
			var content = $compile(html)($scope);
			$("#jq-channel-cards1").html(content);
		};
			
		
		setTimeout(fn, 1000);
	};
	
	
	
}]);

myApp.directive('duplicateCard',['autoCompleteService', function(autoCompleteService) {
	return {
		restrict: 'E',
		controller: ['$http','$scope','$compile','$q','$timeout', function($http, $scope, $compile, $q, $timeout) {
			$scope.res="123";
		}],
		templateUrl: function(elem, attr) {
			return '../html/duplicate.html';
		}
	};
}]);


myApp.directive('searchCard',['autoCompleteService', function(autoCompleteService) {
	return {
		restrict: 'E',
		controller: ['$http','$scope','$compile','$q','$timeout', function($http, $scope, $compile, $q, $timeout) {
			
			$scope.getRecentSearch = function () {
				$scope.recentSearchRes = "123";
			};
			
			$scope.autoCompText = "123";
			
			$scope.getRecentSearch();
				
		}],
		templateUrl: function(elem, attr) {
			return '../html/search.html';
		},
		link: function (scope, element) {
			var _sel = $("#jqi-ac-in");
			_sel.on("keypress", function(event) {
				if (event.keyCode === 13) {
					$("#jqi-ac-btn").trigger('click');
					}
			}).autocomplete({
				source: function(request, response) {
					console.info("request raise");
					var q = $.trim(request.term);
					
					
					
					
					if(q) {
						
						// Abort previous request if any
						var prevJqXHR = _sel.data("jqXHR");
						if(prevJqXHR) {
							prevJqXHR.abort();
							_sel.removeData("jqXHR");
							
							
					}
						
						scope.data = q;
						console.log(scope.data);
						scope.autoCompText = scope.data;
						autoCompleteService(scope);
						console.log(scope.data);
						scope.autoCompText = scope.data;
						
						var data = {"q": q};
					
						var _selH = $(".jq-srch-hv");
						data.type = _selH.attr("type");
						data.bucketEntityType = _selH.attr("bucketCompanyType");
						data.removeSubsidiaries = _selH.attr("rs");
					
						var jqXHR = $.ajax({url: "searchAutocomplete",
							data: data,
							cache: false,
							
							//dataType: 'json',
							dataType: 'html',
							success: function(res) {
								/*response( $.map( res.data, function( item ) {
									return {
										label: item.name,
										value: item.searchToken,
										meta: item
									};
								}));*/
					
								
								$(".jq-recent-search").show();
								$(".jq-auto-complete-list").show().html(res);
								searchAutocompeteReady();
						}
					});
				
						_sel.data("jqXHR", jqXHR);
				}
			
				},
				minLength: 0
			}).on("focus", function() {
				console.info("on focus comes here");
				$(this).autocomplete('search', $(this).val());
		    });
		}
	};
}]);

/*myApp.service("autoCompleteService", ['$http', function($http) {
	
	$http.get('getKeyPhrases',{'params':{'searchToken': $scope.query}})
	.success(function(res) {
		$scope.res = res.data;
		$scope.searchToken = $scope.query;
	});
	
	
}]);*/



myApp.factory("autoCompleteService", ['$http', function($http) {
	return function($scope) {
		console.info($scope.data);
		$scope.data = "11";
		$http.get('getKeyPhrases',{'params':{'searchToken': $scope.query}})
		.success(function(res) {
			$scope.res = res.data;
			$scope.searchToken = $scope.query;
		});
	};
}]);