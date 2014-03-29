angular.module('MtCworkflow',['ngRoute', 'MtCindex', 'MtCagenda'])

    .config(function($routeProvider) {
        $routeProvider.
			when('/:app', {
				templateUrl: function (url) {
                    //console.log(url.app);
					return 'apps/' + url.app + '/' + url.app + '.html';
				}
			}).
            when('/:app/:sub', {
				templateUrl: function (url) {
                    //console.log(url.app + ':' + url.sub);
                    //url.sub === 'today' ? url.sub = 'date' : (url.sub === 'this-week' ? 'week' : url.sub);
					return 'apps/' + url.app + '/' + url.sub + '/' + url.sub + '.html';
				}
			}).
            when('/:app/:sub/:spec', {
				templateUrl: function (url) {
                    //console.log(url.app + ':' + url.sub);
					return 'apps/' + url.app + '/' + url.sub + '/' + url.sub + '.html';
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
    
    .factory('HoveredLink', ['$rootScope', function ($rootScope) { 
        var sPath = '';
        return {
            setPath: function (path) {
                sPath = path;
                $rootScope.$broadcast('showPath', sPath);
            }
        };
    }])
    
    .controller('AppCtrl',['$scope', 'HoveredLink', '$location', function ($scope, HoveredLink, $location) {
        $scope.showPath = false;
        $scope.$on('showPath', function(event, sPath) {
            $scope.paths = sPath;
            $scope.showPath = sPath[0] === '' ? false : true;
        });
        $scope.goHome = function () {
            $location.path('');
        };
        $scope.goto = function (url) {
            $location.path(url);
        };
    }]);