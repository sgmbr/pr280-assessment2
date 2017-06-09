/* jshint undef: true, unused: true, esversion: 6, asi: true */

window.angular
    .module('timeLogger', [])
    .controller('MainController', MainController)
    .controller('SummaryController', SummaryController)
    .controller('FileController', FileController)
    .controller('EditController', EditController)
    .directive('timeLogTable', TimeLogTable.directiveFactory)
    .directive('summary', Summary.directiveFactory)
    .directive('onReadFile', OnReadFile.directiveFactory)
    .service('dateProcessor', DateProcessor)
    .service('timeLogger', TimeLogger)
    .service('message', Message)
    .service('parser', Parser)
