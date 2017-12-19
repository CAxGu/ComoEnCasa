export default class Categorias {
    constructor(JWT, AppConstants, $http, $q) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
  
  
    }
  
    getAll() {
  
      return this._$http({
        url: this._AppConstants.api + '/categorias',
        method: 'GET',
      }).then((res) => res.data.categorias);
  
    }
  
  
  }