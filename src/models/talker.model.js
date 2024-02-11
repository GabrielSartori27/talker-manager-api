const TalkerModel = (sequelize, DataTypes) => {
    const Talker = sequelize.define('Talker', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        fullName: DataTypes.STRING,
        age: DataTypes.INTEGER,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        timestamps: false,
        tableName: 'talkers',
        underscored: true,
    });

    Talker.associate = (models) => {
        Talker.hasMany(models.Talk,
          { foreignKey: 'talkerId', as: 'talks' });
      };

    return Talker;
};
module.exports = TalkerModel;