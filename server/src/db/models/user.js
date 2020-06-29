const { DataTypes, Model } = require('sequelize');

const user = class User extends Model {

  static initialize(sequalize) {
    
    this.init({
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true
      },
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize: sequalize, 
      modelName: 'User'
    });
  }

}

module.exports = user;
