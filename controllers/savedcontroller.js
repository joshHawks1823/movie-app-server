let express = require('express');
let router = express.Router();
let sequelize = require('../db')
let logModel = sequelize.import('../models/saved.js');

//Click to add to our watchlist
//change from 'log'
router.get('/saved', function (req, res){
    let userid = req.user.id;
    logModel.findAll({
        where: {owner: userid}
    }).then(
        function findAllSuccess(data){
            res.json(data);
        },function findAllError(err){
            res.send(500, err);
        }
    )
})

router.post('/createsaved', function (req, res){
    let imdbID = req.body.movie.imdbID;
    let Title = req.body.movie.Title;
    let Plot = req.body.movie.Plot;
    let Year = req.body.movie.Year;
    let Poster = req.body.movie.Poster
    
    logModel.create({
        imdbID: imdbID,
        Title: Title,
        Plot: Plot,
        Year: Year,
        Poster: Poster

        

        
    }).then(
        function createSuccess(response){
            res.json({message: 'success',
            added: response
            })
        }, function createError(err){
            res.send(500, err.message)
        }
    )
})
//Update this endpoint to include delete.  Delete if breaks

router.delete('/movie/delete/:id', function(req,res){
    let primaryKey = req.params.id;
    let userid = req.user.id;
    logModel.destroy({
        where: {id: primaryKey, owner: userid}
    }).then(
        data => {
            return data > 0
            ? res.send('Item was deleted')
            : res.send('Nothing deleted')
        }),err => res.send(500, err.message);
});


router.get('/movie/:id', function(req, res) {
    let primaryKey = req.params.id;
    let userid = req.user.id;
    logModel.findOne({
      where: { id: primaryKey, owner: userid }
    }).then(data => {
      data ? res.json(data) : res.send('Not Authorized to view item');
    }),
      err => res.send(500, err.message);
  });


router.put('/movie/update/:id', function(req,res){
    let movie_id = req.body.movie.movie_id;
    let name = req.body.movie.name;
    let poster = req.body.movie.poster;
    let description = req.body.movie.description;
    let release_date = req.user.release_date;
    let rating = req.body.movie.rating;
   
    logModel.update({
        movie_id: movie_id,
        name: name,
        poster: poster,
        description: description,
        release_date: release_date,
        rating: rating,
        


    },{ where: { id: primaryKey, owner: userid }}
    ).then(
        data => {
            return data > 0
                ? res.send("Item updated!")
                : res.send("No updates where made.")
        }),
        err => res.send(500, err.message)
})
module.exports = router