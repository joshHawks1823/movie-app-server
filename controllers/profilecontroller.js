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
    let movie_id = req.body.profiles.movie_id;
    let name = req.body.profiles.name;
    let poster = req.body.profiles.poster;
    let description = req.body.profiles.description;
    let release_date = req.body.profiles.release_date;
    let rating = req.body.profiles.rating
    let ranking= req.body.profiles.ranking;
    let comments= req.body.profiles.comments;
    let owner= req.user.id
    logModel.create({
        movie_id: movie_id,
        name: name,
        poster: poster,
        description: description,
        release_date: release_date,
        rating: rating,
        ranking: ranking,
        comments: comments,
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
    let movie_id = req.body.profiles.movie_id;
    let name = req.body.profiles.name;
    let poster = req.body.profiles.poster;
    let description = req.body.profiles.description;
    let release_date = req.body.profiles.release_date;
    let rating = req.body.profiles.rating
    let ranking= req.body.profiles.ranking;
    let comments= req.body.profiles.comments
    let owner=userid=req.user.id
    logModel.update({
        movie_id: movie_id,
        name: name,
        poster: poster,
        description: description,
        release_date: release_date,
        rating: rating,
        ranking: ranking,
        comments: comments

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