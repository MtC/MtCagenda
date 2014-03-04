console.log('MtCcalender geladen');
angular.module('MtCcalender',[])
    
    .controller('CalenderCtrl',['$scope', '$routeParams', '$location', function ($scope, $routeParams, $location) {
        var Ag          = MtC,
            month, week, day;
        if (typeof($routeParams.id) !== 'undefined' && $routeParams.id >= Ag.config.minYear && $routeParams.id <= Ag.config.maxYear()) {
            $scope.thisYear = $routeParams.id;
            Ag.setYear($routeParams.id);
        } else {
            $location.path('/agenda/calender/' + (new Date).getFullYear());
        }
        console.log(Ag.getFirstDayOfWeek(1));
        $scope.month    = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
        $scope.total    = [];
        $scope.days = [];
        for (month = 1; month <= 12; month = month + 1) {
            var firstDay = Ag.getDayOfFirstDay(month),
                lastDay  = Ag.getLastDayOfMonth(month),
                lastDayLastMonth =   Ag.getLastDayOfMonth(month - 1),
                firstWeek=  Ag.getMinWeekNumber(month), 
                lastWeek =  Ag.getMaxWeekNumber(month),
                firstDayFirstWeek;
            $scope.days[month] = {};
            
            if (Ag.getMinWeekNumber(month) > Ag.getMaxWeekNumber(month)) {
                var tempWeek = [];
                if (month === 1) {
                    var tempDate = new Date(),
                        show     = false,
                        tempFirstDayFirstWeek, tempFirst = {};
                    for (day = 1; day < 4; day = day + 1) {
                        if ((new Date(Ag.getYear(),0,day)).getWeek() === 1) {
                            firstDayFirstWeek = day;
                            break;
                        }
                    }
                    tempDate.setFullYear(Ag.getYear(),1,1);
                    tempFirstDayFirstWeek = 31 - (firstDay - 1);
                    for (day = 1; day <= 7; day = day + 1) {
                        tempFirstDayFirstWeek++;
                        if (tempFirstDayFirstWeek === 32) {
                            tempFirstDayFirstWeek = 1;
                            show = true;
                        }
                        tempWeek.push({show:show,day:tempFirstDayFirstWeek});
                    }
                    tempFirst[firstWeek] = tempWeek;
                    console.log(JSON.stringify(tempFirst));
                } else {
                    var tempDate = new Date(),
                        show     = true,
                        tempLast = {1: []},
                        tempDay, tempFirstDayLastWeek, tempLastDayLastWeek;
                    tempDate.setFullYear(Ag.getYear(),11,24);
                    lastWeek = tempDate.getWeek();
                    tempDate.setFullYear(Ag.getYear(), 11, 31);
                    tempDay = tempDate.getDay();
                    tempFirstDayLastWeek = 31 - (7 - tempDay) + 1;
                    tempLastDayLastWeek = tempFirstDayLastWeek + 6 - 31;
                    for (day = 1; day <= 7; day = day + 1) {
                        tempFirstDayLastWeek++;
                        if (tempFirstDayLastWeek === 32) {
                            tempFirstDayLastWeek = 1;
                            show = false;
                        }
                        tempWeek.push({show:show,day:tempFirstDayLastWeek});
                    }
                    tempLast[1] = tempWeek;
                }
            }
            var countDay = 1,
                show     = true;
            if (typeof(tempFirst) !== 'undefined' && month === 1) {
                firstWeek = 1;
                firstDay  = 7;
                countDay  = firstDayFirstWeek;
                console.log(firstDayFirstWeek);
            }
            $scope.days[month].week = [];
            for (week = firstWeek; week <= lastWeek; week = week + 1) {
                var oWeek   = {};
                oWeek[week] = [];
                for (day = 1; day <= 7; day = day + 1) {
                    if (week === firstWeek && day < firstDay) {
                        oWeek[week].push({show:false,day:lastDayLastMonth - (firstDay - day) + 1});
                    } else if (countDay > lastDay) {
                        countDay = 1;
                        show     = false;
                        oWeek[week].push({show:false,day: countDay});
                        countDay++;
                    } else {
                        oWeek[week].push({show:show,day:countDay});
                        countDay++;
                    }
                }
                $scope.days[month].week.push(oWeek);
            }
            if (typeof(tempFirst) !== 'undefined' && month === 1) {
                $scope.days[month].week.unshift(tempFirst);
            }
            if (typeof(tempLast) !== 'undefined') {
                $scope.days[month].week.push(tempLast);
            }
            $scope.total[month] = JSON.stringify($scope.days[month]);
        }
    }]);