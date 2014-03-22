angular.module('MtCindex', ['ngRoute'])

    .controller('IndexCtrl', ['$scope', '$location', 'HoveredLink', function ($scope, $location, HoveredLink) {
        $scope.goto = function (to) {
            //to = to === 'agenda' ? 'agenda/calender' : to;
            $location.path(to);
        };
        $scope.mouseEnter = function (link) {
            HoveredLink.setPath([link]);
        };
        $scope.mouseLeave = function () {
            HoveredLink.setPath(['']);
        };
    }]);