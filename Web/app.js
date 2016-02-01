angular.module('BlankApp', ['ngMaterial']).controller('AppCtrl', function($scope, $http, $interval) {

	$scope.serverData = [];
	$scope.topBrags = [];

	var update;
	var reloadData;

	$scope.getItems = function() {
		callServer();

    	reloadData = $interval(function() {
	    	callServer();
		}, 60000);

		update = $interval(function() {
            shuffle($scope.serverData);
			$scope.topBrags = $scope.serverData.slice(0,10);
        }, 10000);
    };

	$scope.getTopBrags = function() {
		var temp = $scope.serverData.slice(0, $scope.serverData > 20 ? 20 : $scope.serverData.length);
		shuffle(temp);
		$scope.topBrags = temp.slice(0,10);
	}

	function shuffle(o){
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}

	function callServer() {
		$http({
		    method: 'GET',
		    // url: 'http://10.141.178.61:3001/brags'
		    url: 'https://sezhg1f3l6.execute-api.us-east-1.amazonaws.com/prod/OrrFellowshipBragBoard'
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
            $scope.serverData = response.data;
            $scope.getTopBrags();

		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}

});