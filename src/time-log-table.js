/* jshint undef: true, unused: true, esversion: 6, asi: true */

class TimeLogTable {
    constructor() {
        this.restrict = 'E'
        this.templateUrl = 'template/time-log-table.html'
    }

    static directiveFactory() {
        TimeLogTable.instance = new TimeLogTable()
        return TimeLogTable.instance
    }
}
