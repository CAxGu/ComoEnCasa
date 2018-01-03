import angular from 'angular';

// Create the module where our functionality can attach to
let localModule = angular.module('app.local', []);

// Include our UI-Router config settings
import LocalConfig from './local.config';
localModule.config(LocalConfig);

// Controllers
import LocalCtrl from './local.controller';
localModule.controller('LocalCtrl', LocalCtrl);


export default localModule;
