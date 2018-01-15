import angular from 'angular';

let stripeModule = angular.module('app.stripe', []);

// Config
import StripeConfig from './stripe.config'
stripeModule.config(StripeConfig);
stripeModule.config(function (stripeProvider) {
    stripeProvider.setPublishableKey('PublisherKey');
});



// Controllers
import StripeCtrl from './stripe.controller';
stripeModule.controller('StripeCtrl', StripeCtrl);

import ShoppingCtrl from './shopping.controller';
stripeModule.controller('ShoppingCtrl', ShoppingCtrl);


export default stripeModule;
