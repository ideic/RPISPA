(function(){
	var tempController = {
		maxValue:50,
		minValue:0,
		currentValue:10,
		alarm:true
	};
	var app = angular.module('mcuTest', []);
	app.controller("TempController", function(){
		this.temp = tempController;
	});	
})();
