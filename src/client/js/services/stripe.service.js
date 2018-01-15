export default class Stripe {
    constructor(JWT, AppConstants, $http, $q, toastr) {
    'ngInject';
        this._AppConstants = AppConstants;
        this._$http = $http;
        this._toastr = toastr;
    }

    charge(token, cart, email) {
        console.log("Service Stripe");
        return this._$http({
            url: this._AppConstants.api + '/stripe/',
            method: 'POST',
            data:{
                stripeToken: token,
                cart: JSON.stringify(cart),
                email: email
            }
        }).then((res) => {
            console.log('Ok ;+)');
            this._toastr.success('Se ha pagado correctamente', 'Checkout')
        },
        (err) => {
            console.log('err stripe service')
            return err
        });
    }

}