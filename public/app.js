(function(){
	var tempData = {
		maxValue:50,
		minValue:0,
		currentValue:10,
		alarm:true
	};
	var app = angular.module('mcuTest', []);
	app.controller("TempController", function($http,$interval){
		this.temp = tempData;
		$http.get("/getTemp").success(function(data){                           
                            this.temp=data;                                
                        });
		var timer = $interval( function(){
                    $http.get("/getTemp").success(function(data){                           
                            this.temp=data;                                
                        }
                    );
                }, 3000);
	});	
	
})();
