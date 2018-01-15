import Stripe from "../services/stripe.service";

class StripeCtrl {
    constructor(User, $state, stripe, Stripe, toastr, $scope) {
      'ngInject';
  
      this._User = User;
      this._$state = $state;
      this._stripe = stripe;
      this._Stripe = Stripe;
      this._toastr = toastr
      this._$scope = $scope;
    }
    submitForm(){
      let name = this.formData.cardHolder;
      let numberCard = this.formData.card1+this.formData.card2+this.formData.card3+this.formData.card4
      let exp_month = this.formData.expMonth ? this.formData.expMonth : '01';
      let exp_year = this.formData.expYear;
      let cvv = this.formData.cvv;
      let email = this.formData.email;
      this._stripe.card.createToken({
        number: numberCard,
        name: name,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: cvv,
        address_zip: '12345'
      }, (status, response) => {
        if (status === 200) {
            let token = response.id;
            let cart = [...this._User.cart];
            let email = email;
            this.message = `Success! Card token ${token}.`;
            console.log(this.message);
            this._Stripe.charge(token, cart, email).then((err)=> {
              if(err){
                this._toastr.error(err,'No Pagado');
              }else{
                this._User.clearCart();
                this._toastr.success('All OK', 'Pagado');
                this._$state.go('app.home');
              }
            });
        } else {
          this.message = response.error.message;
          this._toastr.error(this.message,'Checkout');
        }
      });
    };
  
  }
  
  export default StripeCtrl;