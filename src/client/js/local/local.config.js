function LocalConfig($stateProvider) {
    'ngInject';

    $stateProvider
    .state('app.local', {
      url: '/local/:id',
      controller: 'LocalCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'local/local.html',
      title: 'Local',
      resolve: {
        local: function(Local, $state, $stateParams) {
          return Local.get($stateParams.id).then(
            (local) => local,
            (err) => $state.go('app.home')
          )
        },
        productos: function(Local, $state, $stateParams){
          return Local.getProducts($stateParams.id).then(
            (productos) => productos,
            (err) => $state.go('app.home')
          )
        }
      }
    });
  
  };
  
  export default LocalConfig;