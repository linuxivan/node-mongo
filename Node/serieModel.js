var mongoose = require('mongoose');

var serieSchema = mongoose.Schema(
    {
        titulo:{
            type: String,
            required: false
        },
        tipo: String,
        descripcion: String,
        valoraciones: Array,
        generos: Array,
        numeroRepro: Number,
        premios: Array,
        temporadas: Array
    }, {collection: 'contenido'}
)

var Serie = module.exports = mongoose.model('serie', serieSchema);

module.exports.get = function(callback, limit){
    Serie.find({tipo: "serie"},callback).limit(limit);
}