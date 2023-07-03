db.getCollection("contenido").find({})


db.contenido.aggregate([
        {$match: {tipo: "pelicula"}},
        {
        $project: {
               titulo: 1,
               descripcion: 1,
               generos: 1,
               premios: 1,
               duracion: 1,
               director: 1,
               quizAvg: { $avg: "$valoraciones.puntuacion"},
               
             }
        },
        {
            $sort: {quizAvg: -1}
        },
        {
            $limit: 10
        }
        ])