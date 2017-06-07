/* jshint undef: true, unused: true, esversion: 6, asi: true */

// https://www.sitepoint.com/writing-angularjs-apps-using-es6/

class OnReadFile {
    constructor(message) {
        //the directive can be used as an attribute only
        this.restrict = 'A'
        this.message = message
    }

    /*
    link is a function that defines functionality of directive
    scope: scope associated with the element
    element: element on which this directive used
    attrs: key value pair of element attributes
    */
    link(scope, element, attrs) {
        let message = this.message
        element.on('change', function(changeEvent) {
            let files = changeEvent.target.files

            let r = new FileReader()
            r.onload = function(e) {
                let contents = e.target.result

                // http://haroldrv.com/2015/02/using-scope-apply-in-angularjs/
                // Angular only monitors variables used in expressions and anything inside of a $watch living inside the $scope.
                message.setMessage(contents)
                scope.$apply()
            }

            r.readAsText(files[0])
        })
    }

    static directiveFactory(message) {
        OnReadFile.instance = new OnReadFile(message)
        return OnReadFile.instance
    }
}

OnReadFile.$inject = ['message']
