var mongoose = require('mongoose');

var ProductoSchema = new mongoose.Schema({

    id_creator:{ type: String, ref: 'locales' },
    nombre: String,
    foto: String,
    descripcion: String,
    price: Number

},{timestamps: true});

mongoose.model('Producto', ProductoSchema);