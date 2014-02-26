angular.module('MtCagenda',['ngRoute'])

    .config(function($locationProvider, $httpProvider, $routeProvider) {
        $httpProvider.defaults.useXDomain = true;
		if (!$httpProvider.defaults.headers.get) {
			$httpProvider.defaults.headers.get = {};    
		}
		$httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
        $locationProvider.html5Mode(false).hashPrefix('!');
        $routeProvider.
			when('/:url*', {
				templateUrl: function (url) {
					return 'templates/' + url.url + '.html';
				}
			}).
			otherwise({ redirectTo: '/index'});
    })
    
    .controller('NavCtrl',['$scope', '$location', function ($scope, $location) {
        $scope.findTemplate = function (url) {
            $location.path(url);
        };
    }])
    
    .controller('YearCtrl',['$scope', function ($scope) {
        var Ag          = MtC,
            month;
        $scope.days = [];
        for (month = 1; month <= 12; month = month + 1) {
            $scope.days[month] = {
                firstDay:   Ag.getDayOfFirstDay(month),
                lastDay:    Ag.getLastDayOfMonth(month)
            };
        }
    }]);