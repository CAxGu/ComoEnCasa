import marked from 'marked';

class LocalCtrl{
    constructor(local,User,$sce,$rootScope,$scope,$anchorScroll,$location){
        'ngInject';
        this.local = local;
        this.currentUser = User.current;

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
}
export default LocalCtrl;