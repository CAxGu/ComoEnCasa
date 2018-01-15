export default class Locals {
    constructor(AppConstants, $http, $q) {
        'ngInject';
        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$q = $q;
    }


///    query(config) {
///        debugger;
///        // Create the $http object for this request
///        let request = {
///            url: this._AppConstants.api + '/locals' + ((config.type === 'feed') ? '/feed' : ''),
///            method: 'GET',
///            params: config.filters ? config.filters : null
///        };
///        return this._$http(request).then((res) => res.data);
///    }

    get(id) {
        let deferred = this._$q.defer();
        if (!id.replace(" ", "")) {
            deferred.reject("Local id is empty");
            return deferred.promise;
        }
        this._$http({
            url: this._AppConstants.api + '/locales/local/' + id,
            method: 'GET'
        }).then(
            (res) => deferred.resolve(res.data.local),
            (err) => deferred.reject(err)
        );
        return deferred.promise;
    }
    getProducts(id) {
        console.log('jalo'+id);
        let deferred = this._$q.defer();
        if (!id.replace(" ", "")) {
            deferred.reject("Product id is empty");
            return deferred.promise;
        }
        this._$http({
            url: this._AppConstants.api + '/locales/productos/' + id,
            method: 'GET'
        }).then(
            (res) => deferred.resolve(res.data.productos),
            (err) => deferred.reject(err)
        );
        return deferred.promise;
    }
}