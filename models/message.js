'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      this.belongsTo(models.Conversation , {foreignKey:"conversation_id", as:'conversation'})
      this.belongsTo(models.User , {foreignKey:"user_id" , as:'user'})
    }
  }
  Message.init({
    conversation_id:  {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    user_id: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    message: DataTypes.STRING
  }, {
    sequelize,
    tableName:"messages",
    modelName: 'Message',
  });
  return Message;
};