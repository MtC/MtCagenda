angular.module('MtCagenda', ['ngRoute','MtCcalender'])
    /*
    .config(function($routeProvider) {
        $routeProvider.
			when('/agenda/:page', {
				templateUrl: function (url) {
                    console.log(url.page);
					return 'agenda/' + url.page + '.html';
				}
			}).
            when('/agenda/:page/:id', {
				templateUrl: function (url) {
					return 'agenda/' + url.page + '/' + url.page + '.html';
				}
			}).
			otherwise({ redirectTo: '/index'});
    })
    */
    .controller('NavAgendaCtrl',['$scope', '$location', function ($scope, $location) {
        $scope.findTemplate = function (url) {
            $location.path('agenda/' + url);
        };
    }]);
console.log('MtCagenda is geladen');