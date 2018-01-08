import angular from 'angular';

// Create the module where our functionality can attach to
let localesModule = angular.module('app.locales', []);

import PagerService from './page.factory';
localesModule.factory('PagerService', PagerService);

localesModule.factory('_', ['$window', function($window) {
    return $window._; // assumes underscore has already been loaded on the page
}]);


// Include our UI-Router config settings
import LocalesConfig from './locales.config';
localesModule.config(LocalesConfig);


// Controllers
import LocalesCtrl from './locales.controller';
localesModule.controller('LocalesCtrl', LocalesCtrl);


export default localesModule;
