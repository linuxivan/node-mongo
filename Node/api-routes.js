let router = require('express').Router();




router.get('/', function(req, res){
    res.json({
        status: "api is Working"
    })
})

var peliController = require('./peliController');
router.route('/pelis').get(peliController.index).post(peliController.new);
router.route('/pelis/:peli_id').delete(peliController.delete).put(peliController.update).get(peliController.getById).post(peliController.addValoracion);
router.route('/pelis/genero/:genero').get(peliController.getByGenero);
router.route('/pelis/top10').get(peliController.top10);



var serieController = require('./serieController');
router.route('/series').get(serieController.index).post(serieController.new);
router.route('/series/:serie_id').delete(serieController.delete).put(serieController.update).get(serieController.getById).post(serieController.addValoracion);
router.route('/series/top10').get(serieController.top10);
router.route('/series/genero/:genero').get(serieController.getByGenero);

module.exports = router;