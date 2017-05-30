/* jshint undef: true, unused: true, esversion: 6, asi: true */

window.angular
    .module('timeLogger', [])
    .controller('MainController', MainController)
    .directive('timeLogTable', TimeLogTable.directiveFactory)
    .factory('timeUtil', TimeUtil.getReturn)
    .factory('timeLogger', TimeLogger.getReturn)
