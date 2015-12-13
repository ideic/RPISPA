(function(){
	var tempController = {
		maxValue:50,
		minValue:0,
		currentValue:10,
		alarm:false
	};
	var app = angular.module('mcuTest', []);
	app.controller("MainController", function(){
		this.temp = tempController;
	});	
})();