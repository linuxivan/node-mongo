var Serie = require('./serieModel');

exports.index = function (req, res) {
    Serie.get(function (err, series) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            status: "success",
            message: "Series si",
            data: series
        });
    });
};

exports.new = function (req, res) {
    var serie = new Serie();
    serie.titulo = req.body.titulo ? req.body.titulo : serie.titulo;
    serie.tipo = "serie";
    serie.descripcion = req.body.descripcion ? req.body.descripcion : serie.descripcion;
    serie.valoraciones = req.body.valoraciones ? req.body.valoraciones : serie.valoraciones;
    serie.generos = req.body.generos ? req.body.generos : serie.generos;
    serie.numeroRepro = req.body.numeroRepro ? req.body.numeroRepro : 0;
    serie.premios = req.body.premios ? req.body.premios : serie.premios;
    serie.temporadas = req.body.temporadas ? req.body.temporadas : serie.temporadas;


    serie.save(function (err) {
        if (err) {
            res.json({
                message: "Error",
                data: err
            })
        }
        res.json({
            message: "serie Añadida",
            data: serie
        })
    })
}
exports.update = function (req, res) {
    Serie.findById(req.params.serie_id, function (err, serie) {
        if (err) {
            res.send(err)
        }
        serie.titulo = req.body.titulo ? req.body.titulo : serie.titulo;
        serie.descripcion = req.body.descripcion ? req.body.descripcion : serie.descripcion;
        serie.valoraciones = req.body.valoraciones ? req.body.valoraciones : serie.valoraciones;
        serie.generos = req.body.generos ? req.body.generos : serie.generos;
        serie.premios = req.body.premios ? req.body.premios : serie.premios;
        serie.temporadas = req.body.temporadas ? req.body.temporadas : serie.temporadas;

        serie.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({
                message: 'Serie guardada',
                data: serie
            })
        })
    })
}


exports.delete = function (req, res) {
    Serie.remove({
        _id: req.params.serie_id
    }, function (err, serie) {
        if (err) {
            res.send(err)
        }
        res.json({
            message: "Serie deleted",
            data: serie
        })
    })
}


exports.getByGenero = function (req, res){
    Serie.find({
        generos: req.params.genero
    }, function (err, series){
        if(err){
            res.send(err)
        }
        res.json({
            message: "Series obtenidas",
            data: series
        })
    })
}


exports.top10 = function(req, res){
    Serie.aggregate([
        {$match: {tipo: "serie"}},
        {
        $project: {
               titulo: 1,
               descripcion: 1,
               generos: 1,
               premios: 1,
               temporadas: 1,
               quizAvg: { $avg: "$valoraciones.puntuacion"},
               
             }
        },
        {
            $sort: {quizAvg: -1}
        },
        {
            $limit: 10
        }
        ], function(err, series){
            if(err){
                res.send(err)
            }
            res.json({
                message: "Top 10 obtenido",
                data: series
            })
        })
}


exports.getById = function(req, res){
    Serie.findById(req.params.serie_id, function(err, serie){
        if(err){
            res.send(err)
        }
        res.json({
            data:serie
        })
    })
}


exports.addValoracion = function (req, res) {
    Serie.updateOne({
        _id: req.params.serie_id
    }, {
        $push: {
            valoraciones: {
                nick: req.body.nick,
                puntuacion: req.body.puntuacion,
                comentario: req.body.comentario
            }
        }
    }, function(err, serie){
        if(err){
            res.send(err)
        }
        res.json({
            data:serie
        })
    })
}