export default class Contact {
    constructor(AppConstants, $http) {
    'ngInject';
    this._AppConstants = AppConstants;
    this._$http = $http;
    }   

    sendMail(payload){
        return this._$http({
                url: `${this._AppConstants.api}/contact/sendmail`,
                method: 'POST',
                data: payload
            }).then((res) => {res.data.succes},(err) => {res.data.err});
        }
}