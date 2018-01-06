function AuthConfig($stateProvider, $httpProvider) {
  'ngInject';

  $stateProvider

  .state('app.login', {
    url: '/login',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Sign in',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(false);
      }
    }
  })

  .state('app.register', {
    url: '/register',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Sign up',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(false);
      }
    }
  })


  .state('app.active', {
    url: '/active/:token',
    controller: 'AuthCtrl as $ctrl',
    resolve: {

        auth: function(User, $state, $stateParams) {

          return User.get($stateParams.token).then(
            (User)=> $state.go('app.home').then(window.alert("todo ok")),
            (err) => $state.go('app.home').then(window.alert("error al activar cuenta"))
          );

      }
    }
  });

};

export default AuthConfig;
