module.exports = (sequelize, Sequelize) => {
    const PendidikanModel = sequelize.define('PENDIDIKAN', {
        'PENDIDIKAN_ID': {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'PENDIDIKAN_ID'
        },
        'USER_EMAIL': {
            type: Sequelize.STRING,
            field: 'USER_EMAIL'
        },
        'PENDIDIKAN_AKADEMIK': {
            type: Sequelize.STRING,
            field: 'PENDIDIKAN_AKADEMIK'
        },
        'PENDIDIKAN_JURUSAN': {
            type: Sequelize.STRING,
            field: 'PENDIDIKAN_JURUSAN'
        },
        'PENDIDIKAN_TAHUN_LULUS': {
            type: Sequelize.STRING,
            field: 'PENDIDIKAN_TAHUN_LULUS'
        },
        'PENDIDIKAN_IPK': {
            type: Sequelize.STRING,
            field: 'PENDIDIKAN_IPK'
        },
    }, {
        freezeTableName: true,
        timestamps: true
    });

    PendidikanModel.associate = function (models) {
        PendidikanModel.belongsTo(models.UserModel, {
            foreignKey: 'USER_EMAIL',
            as: 'USER'
        });

    }

    return PendidikanModel;
}