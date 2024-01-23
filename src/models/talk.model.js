// src/models/address.model.js

module.exports = (sequelize, DataTypes) => {
    const Talk = sequelize.define('Talk', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      watchedAt: {type: DataTypes.DATE},
      rate: {type: DataTypes.FLOAT},
      talkerId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    {
      timestamps: false,
      tableName: 'talks',
      underscored: true,
    });
  
    Talk.associate = (models) => {
      Talk.belongsTo(models.Talker,
        { foreignKey: 'talkerId', as: 'talkers' });
    };
  
    return Talk;
  };