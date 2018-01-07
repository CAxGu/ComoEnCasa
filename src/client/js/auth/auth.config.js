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
            (User)=> {$state.go('app.home'); return User.ensureAuthIs(false)},
            (err) => {$state.go('app.home')}
          );
      }
    }
  })

  .state('app.recover', {
    url: '/recover',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/recover.view.html',
    title: 'Recover password',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(false);
      }
    }
  })

  .state('app.newpass', {
    url: '/newpass/:recuperapwd',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/newpass.view.html',
    title: 'Change password',
    resolve: {     
              auth: function(User, $state, $stateParams) {
                return User.ensureAuthIs(false);
            }
          }

  })
  .state('app.social',{
    url: '/social',
    controller: 'SocialCtrl as $crtl',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(false);
      }
    }
  });



};

export default AuthConfig;
