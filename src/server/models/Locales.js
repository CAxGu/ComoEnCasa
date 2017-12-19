var mongoose = require('mongoose');
/* var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug'); */

var LocalesSchema = new mongoose.Schema({
/*   slug: {type: String, lowercase: true, unique: true}, */
  nombre : String,
	telf : String,
	direccion : String,
	poblacion : String,
	provincia : String,
	latitud : String,
	longitud : String,
	foto : String,
	categorias : {
    categoria : String,
		subcategoria : Array
  }


});

/* CategoriaSchema.plugin(uniqueValidator, {message: 'is already taken'}); */

/* CategoriaSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
}); */

/* CategoriaSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
}; */

/* CategoriaSchema.methods.updateFavoriteCount = function() {
  var article = this;

  return User.count({favorites: {$in: [article._id]}}).then(function(count){
    article.favoritesCount = count;

    return article.save();
  });
}; */

/* CategoriaSchema.methods.toJSONFor = function(){
  return {
    name:this.name,
    description: this.description,
  };
};  */
mongoose.model('locales', LocalesSchema);
