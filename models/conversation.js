'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {

    static associate(models) {
      this.hasMany(models.Membre, { foreignKey: "conversation_id" });
      this.hasMany(models.Message, { foreignKey: "conversation_id" , as:'allMessage' });
      this.hasOne(models.Membre, {
        as: 'talked',
        foreignKey: 'conversation_id',
        constraints: false, // Permet d'ignorer la contrainte sur la clé étrangère pour le cas où Auth::id() est null
        scope: {
          user_id: { [Op.ne]: 1 } // Utiliser Sequelize.Op pour spécifier "!=" (différent de)
        },
      });
      this.hasOne(models.Message, {
        as: 'last_message',
        foreignKey: 'conversation_id',
        constraints: false, // Permet d'ignorer la contrainte sur la clé étrangère pour le cas où Auth::id() est null
        limit: 1,
        order: [['createdAt', 'DESC']]
      });
    }

   

  }


  Conversation.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: "conversations",
    modelName: 'Conversation',
  });
  
  return Conversation;
};