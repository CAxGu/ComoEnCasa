var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var User = mongoose.model('User');
//var slug = require('slug');

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

mongoose.model('locales', LocalesSchema);
