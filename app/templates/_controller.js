/**
 * Greeting controller.
 */
define(['angular', './module'], function(angular, moduleName) {
    'use strict';

    var name = <%= controllerDescription %>;
    angular.module(moduleName).controller(name, ['$scope',
        function($scope) {
            $scope.message = {
                name: 'World',
                salutation: 'Mr.',
                greeting: 'Hello'
            };
        }
    ]);

    console.debug('Controller [' + name + '] attached to module: [' + moduleName + ']');
    return name;
});
