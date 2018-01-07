class SocialCtrl {
    constructor(User, $state) {
        'ngInject';
    
        this._User = User;
        this._$state = $state;
        this.authType = $state.current.name.replace('app.', '');

        this._User.attemptAuth(this.authType, null).then(
            (res) => {
                this._$state.go('app.home');
            },
            (err) => {
                this._$state.go('app.login');
            }
        )
    }
}
export default SocialCtrl;