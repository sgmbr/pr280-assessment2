/* jshint undef: true, unused: true, esversion: 6, asi: true */

window.angular
    .module('timeLogger', [])
    .controller('MainController', MainController)
    .controller('SummaryController', SummaryController)
    .directive('timeLogTable', TimeLogTable.directiveFactory)
    .directive('summary', Summary.directiveFactory)
    .service('dateProcessor', DateProcessor)
    .service('timeLogger', ['dateProcessor', TimeLogger])
