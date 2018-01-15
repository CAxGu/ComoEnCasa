function StripeConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.stripe', {
            url: '/checkout',
            controller: 'StripeCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'stripe/checkout.html',
            title: 'Stripe',
            resolve: {
                auth: function(User) {
                    return User.ensureAuthIs(true);
                }
            }
        })
        .state('app.shopping', {
            url: '/shopping',
            controller: 'ShoppingCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'stripe/shopping-cart.html',
            title: 'Shopping',
            resolve: {
                auth: function(User) {
                 //   return User.ensureAuthIs(true);
                }
            }
        });
    };
    
export default StripeConfig;