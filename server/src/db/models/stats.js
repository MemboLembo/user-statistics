const { DataTypes, Model } = require('sequelize');

const stats = class Stats extends Model {

  static initialize(sequalize) {
    
    this.init({
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date: {
        type: DataTypes.STRING,
        allowNull: true
      },
      pageViews: {
        type: DataTypes.STRING,
        allowNull: false
      },
      clicks: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      sequelize: sequalize, 
      modelName: 'Stats'
    });
  }

}

module.exports = stats;