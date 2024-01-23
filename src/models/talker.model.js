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

    Talker.associate = (models) => {
        Talker.hasMany(models.Talks,
          { foreignKey: 'talkerId', as: 'talks' });
      };

    await Talker.sync({ force: true });
    return Talker;
}
module.exports = TalkerModel;