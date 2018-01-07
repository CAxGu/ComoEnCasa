class LocalesCtrl {
    constructor(User, Locales, AppConstants, $scope) {
      'ngInject';
  
      this.appName = AppConstants.appName;
      this._$scope = $scope;

         // Get list of all locals
      Locales
        .getAll()
        .then(
          (locales) => {

            this.localesLoaded = true;
            this.locales = locales;
            this.restaurantes = [];
            this.casual = [];
            this.fastfood = [];
            
            locales.forEach(element => {
              switch (element.categorias.categoria){
                case 'restaurante':
                  this.restaurantes.push(element);
                break;
                case 'casual':
                  this.casual.push(element);
                break;
                case 'fastfood':
                  this.fastfood.push(element);
                break;              
              }
            });
          }
         
        ); 
    }
  
  }
  
  export default LocalesCtrl;
  