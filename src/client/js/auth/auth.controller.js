class AuthCtrl {
  constructor(User, $state, toastr) {
    'ngInject';

    this._User = User;
    this._$state = $state;

    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');
    this._toastr = toastr;

  }

  submitForm() {

    this.formData.respwd = this._$state.params.recuperapwd;
    this.isSubmitting = true;
    this._User.attemptAuth(this.authType, this.formData).then(
      (res) => {

        switch(res.config.url){
          case 'http://localhost:3000/api/users':
            this._User.logout();
            this._$state.go('app.home');
            setTimeout(() => {
              this._toastr.success('Revise su bandeja de entrada para activar su cuenta','activación');
            },800);       
            //window.alert("Revise su bandeja de entrada para activar su cuenta.");
          break;
          case 'http://localhost:3000/api/users/recover':
            this._User.logout();
            this._$state.go('app.home');
            setTimeout(() => {
              this._toastr.success('"Revise su bandeja de entrada para recuperar su contraseña','contraseña');
            },800);       
            //window.alert("Revise su bandeja de entrada para recuperar su contraseña.");
          break;
          case 'http://localhost:3000/api/users/newpass':
            this._User.logout();
            this._$state.go('app.home');
            setTimeout(() => {
              this._toastr.success('Contraseña actualizada','actualizada');
            },800); 
            //window.alert("Contraseña actualizada.");
          break;
          default:
            this._$state.go('app.home');
          break;
        }
       /*  if(res.config.url=="http://localhost:3000/api/users"){
          this._User.logout();
          this._$state.go('app.home');
          window.alert("Revise su bandeja de entrada para activar su cuenta.");
        }else if(res.config.url=="http://localhost:3000/api/users/recover"){
          this._User.logout();
          this._$state.go('app.home');
          window.alert("Revise su bandeja de entrada para recuperar su contraseña.");
        }else if(res.config.url=="http://localhost:3000/api/users/newpass"){
          this._User.logout();
          this._$state.go('app.home');
          window.alert("Contraseña actualizada.");
        }else{
          this._$state.go('app.home');
        }   */  
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    )
  }
}

export default AuthCtrl;
