let express = require('express');
let router = express.Router();
let sequelize = require('../db')
let logModel = sequelize.import('../models/profiles.js');



router.get('/profiles', function (req, res){
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

router.post('/createpost', function (req, res){
    let imdbID = req.body.movie.imdbID;
    let Title = req.body.movie.Title;
    let Plot = req.body.movie.Plot;
    let Year = req.body.movie.Year;
    let Poster = req.body.movie.Poster;
    let Rating = req.body.profiles.Rating;
    let Comments= req.body.profiles.Comments
    let owner= req.user.id
    logModel.create({
        imdbID: imdbID,
        Title: Title,
        Plot: Plot,
        Year: Year,
        Poster: Poster,
        Rating: Rating,
        Comments: Comments,
        owner: owner
        
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
    let imdbID = req.body.movie.imdbID;
    let Title = req.body.movie.Title;
    let Plot = req.body.movie.Plot;
    let Year = req.body.movie.Year;
    let Poster = req.body.movie.Poster;
    let Rating = req.body.profiles.Rating;
    let Comments= req.body.profiles.Comments
    let owner=userid=req.user.id
    logModel.update({
        imdbID: imdbID,
        Title: Title,
        Plot: Plot,
        Year: Year,
        Poster: Poster,
        Rating: Rating,
        Comments: Comments,
        owner: owner

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