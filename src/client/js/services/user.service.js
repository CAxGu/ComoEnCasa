export default class User {
  constructor(JWT, AppConstants, $http, $state, $q) {
    'ngInject';

    this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$state = $state;
    this._$q = $q;

    this.current = null;
    this.cart = new Map();
  }


  attemptAuth(type, credentials) {

    let route = '';

    switch (type){
      case 'login':
        route = '/login';
        break;
      case 'recover':
        route = '/recover';
        break;
      case 'newpass':
        route = '/newpass';
        break;
      case 'social':
        route = '/social';
        break;
      default:
        route = '';
        break;
    }
 console.log(route)
  //  let route = (type === 'login') ? '/login' : '';
    return this._$http({
      url: this._AppConstants.api + '/users' + route,
      method: 'POST',
      data: {
        user: credentials
      }
    }).then(
      (res) => {
        this._JWT.save(res.data.user.token);
        this.current = res.data.user;

        return res;
      }
    );
  }


  get(validatoken) {
    return this._$http({
        url: this._AppConstants.api + '/users/active/' + validatoken,
        method: 'GET'
    }).then(
        (res) => {
          this._JWT.save(res.data.user.token);
          this.current = res.data.user;
          return res;
        }     
    );
  }


  update(fields) {
    return this._$http({
      url:  this._AppConstants.api + '/user',
      method: 'PUT',
      data: { user: fields }
    }).then(
      (res) => {
        this.current = res.data.user;
        return res.data.user;
      }
    )
  }

  logout() {
    this.current = null;
    this._JWT.destroy();
    this._$state.go('app.home', null, { reload: true });
  }

  verifyAuth() {
    let deferred = this._$q.defer();

    // check for JWT token
    if (!this._JWT.get()) {
      deferred.resolve(false);
      return deferred.promise;
    }

    if (this.current) {
      deferred.resolve(true);

    } else {
      this._$http({
        url: this._AppConstants.api + '/user',
        method: 'GET',
        headers: {
          Authorization: 'Token ' + this._JWT.get()
        }
      }).then(
        (res) => {
          this.current = res.data.user;
          deferred.resolve(true);
        },

        (err) => {
          this._JWT.destroy();
          deferred.resolve(false);
        }
      )
    }

    return deferred.promise;
  }


  ensureAuthIs(bool) {
    let deferred = this._$q.defer();

    this.verifyAuth().then((authValid) => {
      if (authValid !== bool) {
        this._$state.go('app.home')
        deferred.resolve(false);
      } else {
        deferred.resolve(true);
      }

    });

    return deferred.promise;
  }

  addProduct(product){
    if(this.cart.get(product._id)){
      let productMap = this.cart.get(product._id);
      productMap.cant += 1;
      this.cart.set(product._id , productMap);
    }else{
      product.cant = 1;
      this.cart.set(product._id,product);
    }
  }
  removeProduct(productId){
    if(this.cart.get(productId)){
      this.cart.delete(productId);
    }
  }
  clearCart(){
    this.cart = new Map();
  }
}
