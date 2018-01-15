class ShoppingCtrl {
    constructor(User, $state, stripe) {
    'ngInject';

        this._User = User;
        this.productos = [...this._User.cart];
        this._$state = $state;
        this.totalPrice = 0;
        if(this.productos.length == 0 ){
            this._$state.go('app.locales');
        }
        this.productos.forEach(producto => {
            this.totalPrice += producto[1].price * producto[1].cant;
            }
        );
    }
    changeCant(i, value){
        let product = this._User.cart.get(this.productos[i][0]);
        product.cant = value;
        this._User.cart.set(this.productos[i][0], product);
        this._$state.reload();
    }
    reload(){
        this._$state.reload();
    }
    removeProduct(i){
        this._User.removeProduct(this.productos[i][0]);
        this._$state.reload();
    }

}

export default ShoppingCtrl;