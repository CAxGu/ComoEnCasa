import marked from 'marked';

class LocalCtrl{
    constructor(local,User,$sce,$rootScope,$scope,$anchorScroll,$location){
        'ngInject';
        this.local = local;
        console.warn(local);
        this.currentUser = User.current;

        if(!this.local.foto){
            this.local.foto = "https://www.wien.info/media/images/41993-das-loft-sofitel-19to1.jpeg";
        }
        //this.local._id = $sce.trustAsHtml(marked(this.local._id, { sanitize: true }));
        //this.local.nombre = $sce.trustAsHtml(marked(this.local.nombre, { sanitize: true }));
        //this.local.telf = $sce.trustAsHtml(marked(this.local.telf, { sanitize: true }));
        //this.local.direccion = $sce.trustAsHtml(marked(this.local.direccion, { sanitize: true }));
        //this.local.poblacion = $sce.trustAsHtml(marked(this.local.poblacion, { sanitize: true }));
        //this.local.provincia = $sce.trustAsHtml(marked(this.local.provincia, { sanitize: true }));
        //this.local.latitud = $sce.trustAsHtml(marked(this.local.latitud, { sanitize: true }));
        //this.local.longitud = $sce.trustAsHtml(marked(this.local.longitud, { sanitize: true }));
        //this.local.foto = $sce.trustAsHtml(marked(this.local.foto, { sanitize: true }));

        $rootScope.setPageTitle(this.local.nombre);
        $scope.gotoAnchor = function(x) {
            var newHash = 'anchor' + x;
            if ($location.hash() !== newHash) {
              // set the $location.hash to `newHash` and
              // $anchorScroll will automatically scroll to it
              $location.hash('anchor' + x);
            } else {
              // call $anchorScroll() explicitly,
              // since $location.hash hasn't changed
              $anchorScroll();
            }
        };
    }
}
export default LocalCtrl;