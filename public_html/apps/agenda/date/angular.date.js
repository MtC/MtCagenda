angular.module('MtCdate',[])
    
    .controller('DateCtrl',['$scope', '$routeParams', '$location', '$log', function ($scope, $routeParams, $location, $log) {
        $scope.url = 'app: ' + $routeParams.app + ', sub: ' + $routeParams.sub + ', spec: ' + $routeParams.spec;
        if (typeof($routeParams.spec) !== 'undefined') {
            
        } else {
            $location.path('/agenda/date/' + (new Date).getToday('D-M-Y'));
        }
    }]);