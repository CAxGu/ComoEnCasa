class LocalCtrl{
    constructor(local,User,$sce,$rootScope,$scope,$anchorScroll,$location, productos, toastr){
        'ngInject';
        this.local = local;
        this._User = User;
        this.currentUser = User.current;
        this.productos = productos;
        this._toastr = toastr;

        if(!this.local.foto){
            this.local.foto = "https://www.wien.info/media/images/41993-das-loft-sofitel-19to1.jpeg";
        }

        $rootScope.setPageTitle(this.local.nombre);
        $scope.gotoAnchor = function(x) {
            var newHash = 'anchor' + x;
            if ($location.hash() !== newHash) {

              $location.hash('anchor' + x);
            } else {
              $anchorScroll();
            }
        };
    }
    addCart(product) {
        this._User.addProduct(product);
        this._toastr.success('Se añadio correctamente','Carrito');
    };
}
export default LocalCtrl;