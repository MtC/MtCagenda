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
    }
};