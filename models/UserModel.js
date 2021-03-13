module.exports = (sequelize, Sequelize) => {
    const UserModel = sequelize.define('USER',{
        'USER_ID' :{
            type : Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            field: 'USER_ID'
        },
        'USER_EMAIL' :{
            primaryKey: true,
            type : Sequelize.STRING,
            field: 'USER_EMAIL'
        },
        'USER_PASSWORD' :{
            type : Sequelize.STRING,
            field: 'USER_PASSWORD'
        },
    },{
        freezeTableName: true,
        timestamps: false
    });

    UserModel.associate = function (models){
        UserModel.hasMany(models.PendidikanModel,{
            foreignKey :'USER_EMAIL',
            as :'PENDIDIKAN'
        });
        
    }

    return UserModel;
}