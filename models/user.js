module.exports= function(sequelize, DataTypes){
    return sequelize.define('user',{
    
        username: DataTypes.STRING,
        newEmail: DataTypes.STRING,
        passwordhash: DataTypes.STRING,
        userType: DataTypes.INTEGER
    })
    }