/* jshint undef: true, unused: true, esversion: 6, asi: true */

window.angular
    .module('timeLogger', [])
    .controller('MainController', MainController)
    .directive('timeLogTable', TimeLogTable.directiveFactory)
    .service('dateProcessor', DateProcessor)
    .service('timeLogger', ['dateProcessor', TimeLogger])
