(function(){
	var tempData = {
		maxValue:50,
		minValue:5,
		currentValue:10,
		alarm:false
	};
	var app = angular.module('mcuTest', []);
	app.controller("TempController", function(pollingService, $http) {
		var self = this;
		self.temp = pollingService.result;
		
		$http.get('/getTemp').then(function(response){
                            self.temp.maxValue=response.data.maxValue;
                            self.temp.data.minValue=response.data.minValue;
                            self.temp.data.currentValue=response.data.currentValue;
							self.temp.data.alarm=response.data.alarm;
                        });		
		
		this.setTemp = function(ctrl){
			$http.post("/setTemp", ctrl.temp).success(function(response){
				self.temp.maxValue=response.data.maxValue;
				self.temp.data.minValue=response.data.minValue;
				self.temp.data.currentValue=response.data.currentValue;
				self.temp.data.alarm=response.data.alarm;
			});
		};
	});

	app.factory("pollingService", function($http, $timeout){
		var data = tempData;
		var poller = function(){
			$http.get('/getTempCurrentValue').then(function(response){
                            data.currentValue=response.data.currentValue;
							data.alarm=response.data.alarm;
							$timeout(poller, 1000);
                        });
		};
		poller();
		return {result: data};
	});
})();
