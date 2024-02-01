const TalkModel = (sequelize, DataTypes) => {
    const Talk = sequelize.define('Talk', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      watchedAt: { type: DataTypes.DATE },
      rate: { type: DataTypes.FLOAT },
      talkerId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    {
      timestamps: false,
      tableName: 'talks',
      underscored: true,
    });
  
    TalkModel.associate = (models) => {
      TalkModel.belongsTo(models.Talker,
        { foreignKey: 'talkerId', as: 'talker' });
    };
  
    return Talk;
  };

  module.exports = TalkModel;