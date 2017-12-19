import angular from 'angular';

// Create the module where our functionality can attach to
let localesModule = angular.module('app.locales', []);

// Include our UI-Router config settings
import LocalesConfig from './locales.config';
localesModule.config(LocalesConfig);


// Controllers
import LocalesCtrl from './locales.controller';
localesModule.controller('LocalesCtrl', LocalesCtrl);


export default localesModule;
