function LocalesConfig($stateProvider) {
    'ngInject';
  
    $stateProvider
    .state('app.locales', {
      url: '/locales',
      controller: 'LocalesCtrl',
      controllerAs: 'vm',
      templateUrl: 'locales/locales.view.html',
      title: 'Locales'
    })
    .state('app.restaurante', {
      url: '/restaurante',
      controller: 'LocalesCtrl',
      controllerAs: 'vm',
      templateUrl: 'locales/locales.view.html',
      title: 'Restaurantes'
    })
    .state('app.casual', {
      url: '/casual',
      controller: 'LocalesCtrl',
      controllerAs: 'vm',
      templateUrl: 'locales/locales.view.html',
      title: 'Casual'
    })
    .state('app.fastfood', {
      url: '/fastfood',
      controller: 'LocalesCtrl',
      controllerAs: 'vm',
      templateUrl: 'locales/locales.view.html',
      title: 'FastFood'
    })

  };
  
  export default LocalesConfig;
  