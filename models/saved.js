module.exports= function(sequelize, DataTypes){

    return sequelize.define('saved',{
        imdbID: DataTypes.STRING,
        Title: DataTypes.STRING,
        Plot: DataTypes.STRING,
        Year: DataTypes.STRING,
        Poster: DataTypes.STRING
       
       
      

    })
}