/* jshint undef: true, unused: true, esversion: 6, asi: true */

class Summary {
    constructor() {
        this.restrict = 'E'
        this.templateUrl = 'templates/summary.html'
    }

    static directiveFactory() {
        Summary.instance = new Summary()
        return Summary.instance
    }
}
