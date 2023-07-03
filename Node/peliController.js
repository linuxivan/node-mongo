var Peli = require('./peliModel');

exports.index = function (req, res) {
    Peli.get(function (err, pelis) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            status: "success",
            message: "Pelis si",
            data: pelis
        });
    });
};


exports.new = function (req, res) {
    var peli = new Peli();
    peli.titulo = req.body.titulo ? req.body.titulo : peli.titulo;
    peli.tipo = "pelicula";
    peli.descripcion = req.body.descripcion ? req.body.descripcion : peli.descripcion;
    peli.valoraciones = req.body.valoraciones ? req.body.valoraciones : peli.valoraciones;
    peli.generos = req.body.generos ? req.body.generos : peli.generos;
    peli.numeroRepro = req.body.numeroRepro ? req.body.numeroRepro : 0;
    peli.premios = req.body.premios ? req.body.premios : peli.premios;
    peli.duracion = req.body.duracion ? req.body.duracion : peli.duracion;
    peli.director = req.body.director ? req.body.director : peli.director;



    peli.save(function (err) {
        if (err) {
            res.json({
                message: "Error",
                data: err
            })
        }
        res.json({
            message: "Pelicula Añadida",
            data: peli
        })
    })
}

exports.update = function (req, res) {
    Peli.findById(req.params.peli_id, function (err, peli) {
        if (err) {
            res.send(err)
        }
        peli.titulo = req.body.titulo ? req.body.titulo : peli.titulo;
        peli.descripcion = req.body.descripcion ? req.body.descripcion : peli.descripcion;
        peli.valoraciones = req.body.valoraciones ? req.body.valoraciones : peli.valoraciones;
        peli.generos = req.body.generos ? req.body.generos : peli.generos;
        peli.premios = req.body.premios ? req.body.premios : peli.premios;
        peli.temporadas = req.body.temporadas ? req.body.temporadas : peli.temporadas;
        peli.duracion = req.body.duracion ? req.body.duracion : peli.duracion;
        peli.director = req.body.director ? req.body.director : peli.director;

        peli.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({
                message: 'peli guardada',
                data: peli
            })
        })
    })
}
exports.delete = function (req, res) {
    Peli.remove({
        _id: req.params.peli_id
    }, function (err, peli) {
        if (err) {
            res.send(err)
        }
        res.json({
            message: "Peli deleted",
            data: peli
        })
    })
}

exports.getByGenero = function (req, res) {
    Peli.find({
        generos: req.params.genero
    }, function (err, pelis) {
        if (err) {
            res.send(err)
        }
        res.json({
            message: "pelis obtenidas",
            data: pelis
        })
    })
}

exports.top10 = function (req, res) {
    Peli.aggregate([{
            $match: {
                tipo: "pelicula"
            }
        },
        {
            $project: {
                titulo: 1,
                descripcion: 1,
                generos: 1,
                premios: 1,
                duracion: 1,
                director: 1,
                quizAvg: {
                    $avg: "$valoraciones.puntuacion"
                },

            }
        },
        {
            $sort: {
                quizAvg: -1
            }
        },
        {
            $limit: 10
        }
    ], function (err, pelis) {
        if (err) {
            res.send(err)
        }
        res.json({
            message: "Top 10 obtenido",
            data: pelis
        })
    })
}

exports.getById = function (req, res) {
    Peli.findById(req.params.peli_id, function (err, peli) {
        if (err) {
            res.send(err)
        }
        res.json({
            data: peli
        })
    })
}


exports.addValoracion = function (req, res) {
    Peli.updateOne({
        _id: req.params.peli_id
    }, {
        $push: {
            valoraciones: {
                nick: req.body.nick,
                puntuacion: req.body.puntuacion,
                comentario: req.body.comentario
            }
        }
    }, function(err, peli){
        if(err){
            res.send(err)
        }
        res.json({
            data:peli
        })
    })
}