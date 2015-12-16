(function(){
	var tempData = {
		maxValue:50,
		minValue:5,
		currentValue:10,
		alarm:false
	};
	var app = angular.module('mcuTest', []);
	app.controller("TempController", function(pollingService) {
		this.temp = pollingService.result;
		this.setTemp = function(ctrl){
			$http.post("setTemp", ctrl.temp).success(function(resultData){
				alert(resultData);
			});
		};
	});

	app.factory("pollingService", function($http, $timeout){
		var data = tempData;
		var poller = function(){
			$http.get('/getTemp').then(function(response){
                            data.maxValue=response.data.maxValue;
                            data.minValue=response.data.minValue;
                            data.currentValue=response.data.currentValue;
							data.alarm=response.data.alarm;
							$timeout(poller, 10000);
                        });
		};
		poller();
		return {result: data};
	});
})();
