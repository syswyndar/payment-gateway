'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TopupBalance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TopupBalance.init({
    UserId: DataTypes.INTEGER,
    topupAmount: DataTypes.INTEGER,
    isPayed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'TopupBalance',
  });
  return TopupBalance;
};