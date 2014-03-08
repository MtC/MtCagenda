angular.module('MtCworkflow',['ngRoute', 'MtCindex', 'MtCagenda'])

    .config(function($routeProvider) {
        $routeProvider.
			when('/:app', {
				templateUrl: function (url) {
                    //console.log(url.app);
					return url.app + '/' + url.app + '.html';
				}
			}).
            when('/:app/:sub', {
				templateUrl: function (url) {
                    //console.log(url.app + ':' + url.sub);
                    //url.sub === 'today' ? url.sub = 'date' : (url.sub === 'this-week' ? 'week' : url.sub);
					return url.app + '/' + url.sub + '/' + url.sub + '.html';
				}
			}).
            when('/:app/:sub/:spec', {
				templateUrl: function (url) {
                    //console.log(url.app + ':' + url.sub);
					return url.app + '/' + url.sub + '/' + url.sub + '.html';
				}
			}).
			otherwise({ redirectTo: '/index/'});
    })
    
    .config(function($locationProvider) {
        $locationProvider.html5Mode(false).hashPrefix('!');
    })

    .config(function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
		if (!$httpProvider.defaults.headers.get) {
			$httpProvider.defaults.headers.get = {};    
		}
		$httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    })
    
    .controller('NavCtrl',['$scope', '$location', function ($scope, $location) {
        $scope.findTemplate = function (url) {
            console.log(url);
            $location.path(url);
        };
    }]);