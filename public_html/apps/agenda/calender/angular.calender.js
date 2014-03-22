angular.module('MtCcalender',[])
    
    .controller('CalenderCtrl',['$scope', '$routeParams', '$location', '$log', function ($scope, $routeParams, $location, $log) {
        var Ag          = MtC;
        if (typeof($routeParams.spec) !== 'undefined' && $routeParams.spec >= Ag.config.minYear && $routeParams.spec <= Ag.config.maxYear()) {
            $scope.thisYear = $routeParams.spec;
            $scope.lastYear = $routeParams.spec - 1;
            $scope.nextYear = parseInt($routeParams.spec, 10) + 1;
            Ag.setYear($routeParams.spec);
        } else {
            $location.path('/agenda/calender/' + (new Date).getFullYear());
        }
        
        $scope.month    = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
        $scope.weekdays = ['','ma','di','wo','do','vr','za','zo'];
        
        var tempDate              = new Date($routeParams.spec, 0, 1),
            firstWeek             = tempDate.getWeek(),
            countDay              = tempDate.getFirstDayOfWeek(),
            tempWeek              = [{week: firstWeek}],
            tempMonth             = [],
            thisMonth             = 0,
            dateformat            = 'D-M-Y',
            day;
        $scope.result         = {0:[]};
            
        for (day = 0; day < 380; day = day + 1) {
            if (day % 7 === 0 && day !== 0) {
                var monthFirstDay = countDay.addDays(day - 7).getMonth(),
                    monthLastDay  = countDay.addDays(day - 1).getMonth(),
                    firstWeekDay  = countDay.addDays(day - 7).getDate();
                if (day <= 7 && countDay.addDays(day - 7).getWeek() > 1) {
                    tempMonth.push(tempWeek);
                } else if (firstWeekDay === 1) {
                    $scope.result[thisMonth] = [];
                    $scope.result[thisMonth].push(tempMonth);
                    $scope.result[thisMonth + 1] = [];
                    thisMonth++;
                    if (thisMonth === 12) break;
                    tempMonth     = [];
                    tempWeekClone = [{week: tempWeek[0].week}];
                    for (i = 1; i <= 7; i = i + 1) {
                        tempWeekClone[i] = {
                            day: tempWeek[i].day,
                            show: !tempWeek[i].show,
                            showDate: tempWeek[i].showDate
                        };
                    }
                    tempMonth.push(tempWeekClone);
                } else if (monthFirstDay !== monthLastDay && day > 7) {
                    tempMonth.push(tempWeek);
                    $scope.result[thisMonth].push(tempMonth);
                    $scope.result[thisMonth + 1] = [];
                    thisMonth++;
                    if (thisMonth === 12) break;
                    tempMonth     = [];
                    tempWeekClone = [{week: tempWeek[0].week}];
                    for (i = 1; i <= 7; i = i + 1) {
                        tempWeekClone[i] = {
                            day: tempWeek[i].day,
                            show: !tempWeek[i].show,
                            showDate: tempWeek[i].showDate
                        };
                    }
                    tempMonth.push(tempWeekClone);
                } else {
                    tempMonth.push(tempWeek);
                }
                tempWeek = [{week:countDay.addDays(day).getWeek()}, {day: countDay.addDays(day).getDate(), show: thisMonth === countDay.addDays(day).getMonth() ? true : false, showDate: countDay.addDays(day).getToday(dateformat)}];
            } else {
                tempWeek.push({day: countDay.addDays(day).getDate(), show: thisMonth === countDay.addDays(day).getMonth() ? true : false, showDate: countDay.addDays(day).getToday(dateformat)});
            }
        }
        console.log(JSON.stringify($scope.result));
        $scope.results = JSON.stringify($scope.result);
    }]);