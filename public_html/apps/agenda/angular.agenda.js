angular.module('MtCagenda', ['MtCcalender','MtCdate'])

    .controller('AgendaCtrl', ['$scope', '$location', 'HoveredLink', function ($scope, $location, HoveredLink) {
        HoveredLink.setPath(['agenda', 'calender']);
        $location.path('agenda/calender');
    }]);
