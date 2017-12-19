class HomeCtrl {
  constructor(User, Categorias, AppConstants, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$scope = $scope;

    // Get list of all categorias
    Categorias
      .getAll()
      .then(
        (categorias) => {
          this.categoriasLoaded = true;
          this.categorias = categorias;
        }
      );

    // Set current list to either feed or all, depending on auth status.
    /* this.listConfig = {
      type: User.current ? 'feed' : 'all'
    }; */

  }

/* 
  changeList(newList) {
  //   console.log(newList);
    this._$scope.$broadcast('setListTo', newList);
  } */


}

export default HomeCtrl;
