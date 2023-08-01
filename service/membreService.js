const {Membre} = require("../models");

const createMembres = async (conversation_id,tabUser) => {
    tabUser.forEach( async (user_id) => {
        await Membre.create({conversation_id,user_id})
    });
}

module.exports = { createMembres };
