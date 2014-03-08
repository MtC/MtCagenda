/*Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};
*/
Date.prototype.getWeekYear = function() {
    var date = new Date(this.getTime());
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    return date.getFullYear();
};

Date.prototype.getWeek = function () {
	var target  = new Date(this.valueOf()),
        dayNr, firstThursday;
	dayNr   = (this.getDay() + 6) % 7;
	target.setDate(target.getDate() - dayNr + 3);
	firstThursday = target.valueOf();
	target.setMonth(0, 1);
	if (target.getDay() !== 4) {
		target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
	}
	return 1 + Math.ceil((firstThursday - target) / 604800000);
};

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

Date.prototype.getFirstDayOfWeek = function (iWeek) {
    var dat     = new Date(this.valueOf()),
        year    = dat.getFullYear(),
        offset  = dat.getTimezoneOffset();
    dat.setDate(dat.getDate() + 4 - (dat.getDay() || 7));
    dat.setTime(dat.getTime() + 7 * 24 * 60 * 60 * 1000 * (iWeek + year === dat.getFullYear() ? -1 : 0 ));
    dat.setTime(dat.getTime() + (dat.getTimezoneOffset() - offset) * 60 * 1000);
    dat.setDate(dat.getDate() - 3);
    return dat;
};

Date.prototype.getDaysOfMonth = function (iMonth, iYear) {
    var dat     = new Date();
    dat.setYear(iYear);
    dat.setMonth(iMonth + 1);
    dat.setDate(0);
    return dat.getDate();
};

Date.prototype.getToday = function (format, delimiter) {
    var dat     = new Date(this.valueOf()),
        sDelimiter, aVars = [], aResponse = [], i;
    sDelimiter  = delimiter || '-';
    aVars       = format.split(sDelimiter);
    for (i = 0; i < aVars.length; i = i + 1) {
        switch(aVars[i]) {
            case 'Y':
                aResponse[i] = dat.getFullYear();
                break;
            case 'y':
                aResponse[i] = dat.getYear();
                break;
            case 'M':
                aResponse[i] = dat.getMonth() + 1 < 10 ? '0' + (dat.getMonth() + 1) : (dat.getMonth() + 1);
                break;
            case 'm':
                aResponse[i] = dat.getMonth() + 1;
                break;
            case 'D':
                aResponse[i] = dat.getDate() < 10 ? '0' + dat.getDate() : dat.getDate();
                break;
            case 'd':
                aResponse[i] = dat.getDate();
                break;
            default:
                aResponse[i] = '@';
        }
    }
    return aResponse.join(sDelimiter);
};