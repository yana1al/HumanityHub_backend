
module.exports = (sequelize, DataTypes) => {
    const Testimony = sequelize.define('Testimony', {
      name: DataTypes.STRING,
      testimony: DataTypes.TEXT,
      rating: DataTypes.INTEGER,
      donatedAmount: DataTypes.INTEGER,
      userId: DataTypes.INTEGER, 
    });
  
    Testimony.associate = function(models) {
      Testimony.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };
  
    return Testimony;
  };
  