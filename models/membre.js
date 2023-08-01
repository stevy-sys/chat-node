'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Conversation , {foreignKey:"conversation_id"})
      this.belongsTo(models.User , {foreignKey:"user_id" , as : "user"})
    }

    static user({User}) {
      this.belongsTo(User , {foreignKey:"user_id"})
    }
  }
  Membre.init({
    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
  }, {
    sequelize,
    tableName:"membres",
    modelName: 'Membre',
  });
  return Membre;
};