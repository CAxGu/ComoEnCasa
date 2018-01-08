class LocalesCtrl {
    constructor(User, Locales, AppConstants, $scope, PagerService, $state) {
      'ngInject';
  
      var vm = this;
      vm.pager = {};
      vm.setPage = setPage;
      this.appName = AppConstants.appName;
      this._$scope = $scope;
      this.authType = $state.current.name.replace('app.', '');//locales
      this.category = this.authType.charAt(0).toUpperCase() + this.authType.substr(1).toLowerCase();//Locales
    
      function initController() {
        // initialize to page 1
        vm.setPage(1);
      }

      function setPage(page) {
        if (page < 1 || page > vm.pager.totalPages) {
            return;
        }

        // get pager object from service
        vm.pager = PagerService.GetPager(vm.dummyItems.length, page);

        // get current page of items
        vm.items = vm.dummyItems.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
      }

      // Get list of all locals
      Locales
        .getAll()
        .then(
          (locales) => {

            this.localesLoaded = true;
            this.locales = locales;
            this.locals = [];
            
            if(this.authType === 'locales'){
              this.locals = this.locales;
            }else{
              locales.forEach(element => {
                if(element.categorias.categoria == this.authType){
                  this.locals.push(element);
                }
              });
            }
            vm.dummyItems = this.locals;
            console.log(vm.dummyItems);
            initController();
          }
        ); 
    }
  }
  
  export default LocalesCtrl;
  