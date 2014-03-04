var MtC = {
    config: {
        year: 0,
        minYear: 2010,
        nowYear: function () {
            var tempDate = new Date();
            return tempDate.getFullYear();
        },
        maxYear: function () {
            return MtC.config.nowYear() + 5;
        }
    },

    /**
     * 
     * @returns {Number}
     */
    getYear: function () {
        if (this.config.year === 0) {
            var tempDate        = new Date();
            this.config.year    = tempDate.getFullYear();
        }
        return this.config.year;
    },

    /**
     * 
     * @param {type} iYear
     * @returns {undefined}
     */
    setYear: function(iYear) {
        if (iYear >= this.config.minYear && iYear <= this.config.maxYear()) {
            MtC.config.year = iYear;
        } else {
            alert('Error message: year must be set between ' + MtC.config.minYear + ' and ' + MtC.config.maxYear() + ' (see config).');
        }
        return;
    },

    /**
     * 
     * @param {Number} iMonth
     * @returns {Number}
     */
    getMinWeekNumber: function (iMonth) {
        var tempDate = new Date();
        tempDate.setYear(MtC.getYear());
        tempDate.setMonth(iMonth - 1);
        tempDate.setDate(1);
        return tempDate.getWeek();
    },

    /**
     * 
     * @param {Number} iMonth
     * @returns {Number}
     */
    getMaxWeekNumber: function (iMonth) {
        var tempDate = new Date();
        tempDate.setYear(MtC.getYear());
        tempDate.setMonth(iMonth);
        tempDate.setDate(0);
        return tempDate.getWeek();
    },

    /**
     * 
     * @param {Number} iMonth
     * @returns {Number}
     */
    getDayOfFirstDay: function (iMonth) {
        var tempDate = new Date();
        tempDate.setYear(MtC.getYear());
        tempDate.setMonth(iMonth - 1);
        tempDate.setDate(1);
        return tempDate.getDay() === 0 ? 7 : tempDate.getDay();
    },

    /**
     * return last day of the month
     * 
     * @param {Number} iMonth - ranges from 1 (Januari) to 12 (December)
     * @returns {Number} Day number
     */
    getLastDayOfMonth: function (iMonth) {
        var tempDate = new Date();
        tempDate.setYear(MtC.getYear());
        tempDate.setMonth(iMonth);
        tempDate.setDate(0);
        return tempDate.getDate();
    },
    
    getFirstDayOfWeek: function (iWeek) {
        var d       = new Date(MtC.getYear(), 0, 1),
            offset  = d.getTimezoneOffset();
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000 * (iWeek + (parseInt(MtC.getYear(),10) === d.getFullYear() ? -1 : 0 )));
        d.setTime(d.getTime() + (d.getTimezoneOffset() - offset) * 60 * 1000);
        d.setDate(d.getDate() - 3);
        return d;
    },
    
    getLastDayOfWeek: function (iWeek) {
        
    },
    
    getFirstDayOfWeeknumber: function (iWeek) {
        return MtC.getFirstDayOfWeek(iWeek).getDate();
    },
    
    getMonthOfWeeknumber: function (iWeek) {
        return MtC.getFirstDayOfWeek(iWeek).getFullYear();
    }
};