class AuthCtrl {
  constructor(User, $state) {
    'ngInject';

    this._User = User;
    this._$state = $state;

    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');

  }

  submitForm() {
    this.isSubmitting = true;
    this._User.attemptAuth(this.authType, this.formData).then(
      (res) => {
        if(res.config.url=="http://localhost:3000/api/users"){
          this._User.logout();
          this._$state.go('app.home');
          window.alert("Se ha enviado un email a su bandeja de entrada para activar su cuenta. Verifique su bandeja de entrada");
        }else{
          this._$state.go('app.home');
        }    
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    )
  }
}

export default AuthCtrl;
