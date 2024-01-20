const TalkerModel = (sequelize, DataTypes) => {
    const Talker = sequelize.define('Talker', {
        fullName: DataTypes.STRING,
        age: DataTypes.INTEGER,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        tableName: 'Talkers'
    });
    await Talker.sync({ force: true });
    return Talker;
}
module.exports = TalkerModel;