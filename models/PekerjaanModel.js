module.exports = (sequelize, Sequelize) => {
    const PekerjaanModel = sequelize.define('PENDIDIKAN', {
        'PEKERJAAN_ID': {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'PEKERJAAN_ID'
        },
        'USER_EMAIL': {
            type: Sequelize.STRING,
            field: 'USER_EMAIL'
        },
        'PEKERJAAN_NAMA': {
            type: Sequelize.STRING,
            field: 'PEKERJAAN_NAMA'
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });

    PekerjaanModel.associate = function (models) {
        PekerjaanModel.belongsTo(models.UserModel, {
            foreignKey: 'USER_EMAIL',
            as: 'USER'
        });


    }

    return PekerjaanModel;
}