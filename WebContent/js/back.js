angular.module("SO29160622",["ngRoute"] )
.config(function($routeProvider) {
  
  $routeProvider
    .when("/home", {
    templateUrl : "Home.html",
    controller : "MainCtrl"
  })
  .when("/home/:id/", {
    templateUrl : "Home.html",
    controller : "MainCtrl"
  })
  .otherwise("/home");
    
})
.controller("MainCtrl",
   function($scope,$http, $location, $route, $timeout, $routeParams){

        $scope.formData={};
        console.log("Refreshed");
  
        $scope.id = $routeParams.id;
  
        $scope.getAllBrainframes=function(id){
            if(id){
                $scope.url = '/home/'+id+'/'; 
            }else{
               $scope.url = '/home';
            }
          console.log($scope.url);
            $location.path($scope.url);
        };
        
        $scope.test = function () {
        	
        	$scope.url = "/test-button.html";
        	$http.get($scope.url).
        	success(function(data, status, headers, config) {
        		console.log(data);
        		$("#jq_html1").html(data);
        		$location.path($scope.url);
        	  });
        };
        
   
});