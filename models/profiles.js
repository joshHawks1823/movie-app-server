module.exports= function(sequelize, DataTypes){

    return sequelize.define('profiles',{
        movie_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        poster: DataTypes.STRING,
        description: DataTypes.STRING,
        release_date: DataTypes.STRING,
        rating: DataTypes.STRING,
        ranking: DataTypes.INTEGER,
        comments: DataTypes.STRING,
        owner: DataTypes.INTEGER

    })
}
