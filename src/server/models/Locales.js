var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var User = mongoose.model('User');
/* var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug'); */

var LocalesSchema = new mongoose.Schema({
/*   slug: {type: String, lowercase: true, unique: true}, */
    _id: {type: String, unique: true},
    nombre: String,
    telefono: String,
    direccion: String,
    poblacion: String,
    provincia: String,
    latitud: String,
    longitud: String,
    foto: String,
    categorias:{
        categoria:String,
        subcategoria: Array
    }

},{timestamps: true});

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

LocalesSchema.methods.toJSONFor = function(user){
  return {
    _id: this._id,
    nombre: this.nombre,
    telefono: this.telefono,
    direccion: this.direccion,
    poblacion: this.poblacion,
    provincia: this.provincia,
    latitud: this.latitud,
    longitud: this.longitud,
    foto: this.foto,
    categoria: this.categoria
  };
};

/* CategoriaSchema.methods.toJSONFor = function(){
  return {
    name:this.name,
    description: this.description,
  };
};  */
mongoose.model('locales', LocalesSchema);
