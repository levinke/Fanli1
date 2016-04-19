// Based on AngularJS 1.4.2
/*
 * 在when处添加路由，如make路由
 */
var FanliApp = angular.module('FanliApp', ['ngRoute']);

FanliApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/admin/LoginView', {
			templateUrl: 'admin/login/LoginView.html'
		}).
		when('/admin/MakeView', {
			templateUrl: 'admin/make/MakeView.html'
		}).
		otherwise({
			redirectTo: '/admin/LoginView'
		});
	}
]);

// save a handle to the $rootScope obj 
var rootScope;

FanliApp.run(['$rootScope', function($rootScope) {
	rootScope = $rootScope;
}]);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function goto_view(v) {
	var baseUrl = window.location.href;
	baseUrl = (baseUrl.indexOf('#') > 0 ? baseUrl.substr(0, baseUrl.indexOf('#')) : baseUrl);
	window.location.href = baseUrl + "#/" + v;
}

var apiconn = new APIConnection();
var upload_path="http://112.124.70.60:8081/cgi-bin/upload.pl";
var download_path="http://112.124.70.60:8081/cgi-bin/download.pl?fid=";

apiconn.client_info.clienttype = "web";

apiconn.state_changed_handler = function() {
	console.log("state: " + apiconn.from_state + " => " + apiconn.conn_state);
	apiconn.connect();
};

apiconn.response_received_handler = function(jo) {
	rootScope.$apply(function() {
		rootScope.$broadcast("RESPONSE_RECEIVED_HANDLER", jo);
	});
};

apiconn.wsUri = "ws://112.124.70.60:51717/we";
apiconn.connect();