class ContactCtrl {
  constructor(Contact, AppConstants, $scope, $state, toastr) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this._Contact = Contact;
    this._$state = $state;
    this._toastr = toastr;

    $scope.SubmitContact = () => {
      let data = {"name": $scope.contact.inputName,"to": $scope.contact.inputEmail, "subject": $scope.contact.inputSubject, "text": $scope.contact.inputMessage ,"from": 'nipontourpruebas@gmail.com'};
      this._Contact.sendMail(data).then(
        (success) => {
          console.log("Se envio correctamente");
          $scope.message = 'Se envio correctamente'; 
          toastr.success('Se envio correctamente','Email');
          setTimeout(() => {
            $state.go('app.home');
          },5000);
        },
        (err) => {
          toastr.error('Ha habido algun error intentalo mas tarde','Email');
          $scope.message = 'Ha habido algun error intentalo';
        }
      );
    }
  }
}

export default ContactCtrl;