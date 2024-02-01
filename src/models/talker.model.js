const TalkerModel = (sequelize, DataTypes) => {
    const Talker = sequelize.define('Talker', {
        fullName: DataTypes.STRING,
        age: DataTypes.INTEGER,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        timestamps: false,
        tableName: 'talkers',
        underscored: true,
    });

    TalkerModel.associate = (models) => {
        TalkerModel.hasMany(models.Talk,
          { foreignKey: 'talkerId', as: 'talks' });
      };

    return Talker;
}
module.exports = TalkerModel;