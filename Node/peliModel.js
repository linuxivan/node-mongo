var mongoose = require('mongoose');

var peliSchema = mongoose.Schema(
    {
        titulo:{
            type: String,
            required: true
        },
        tipo: String,
        descripcion: String,
        valoraciones: Array,
        generos: Array,
        numeroRepro: Number,
        premios: Array,
        duracion: String,
        director: String
    }, {collection: 'contenido'}
)

var Peli = module.exports = mongoose.model('peli', peliSchema);

module.exports.get = function(callback, limit){
    Peli.find({tipo: "pelicula"},callback).limit(limit);
}