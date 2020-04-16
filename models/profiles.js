module.exports= function(sequelize, DataTypes){

    return sequelize.define('profiles',{
        imdbID: DataTypes.STRING,
        Title: DataTypes.STRING,
        Plot: DataTypes.STRING,
        Year: DataTypes.STRING,
        Poster: DataTypes.STRING,
        Rating: DataTypes.STRING,
        Comments: DataTypes.STRING,
        owner: DataTypes.INTEGER

    })
}
