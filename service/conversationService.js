const { Conversation, Membre, User, Message } = require("../models/");

const verificationConversation = async (user_id, auth_id) => {
    const conversationsUser1 = await Conversation.findAll({
        where: { type: 'prive' },
        include: [
            {
                model: Membre,
                where: {
                    user_id: user_id,
                },
                attributes: [],
            },
        ],
    });

    // Requête pour récupérer les conversations du deuxième utilisateur
    const conversationsUser2 = await conversation.findAll({
        where: { type: 'prive' },
        include: [
            {
                model: Membre,
                where: {
                    user_id: auth_id,
                },
                attributes: [],
            },
        ],
    });

    let commonConversation = null;

    for (const conversationUser1 of conversationsUser1) {
        for (const conversationUser2 of conversationsUser2) {
            if (conversationUser1.id === conversationUser2.id) {
                commonConversation = conversationUser1;
                break;
            }
        }
        if (commonConversation) {
            break;
        }
    }
    return commonConversation;
}


const allConversation = async (user_id, type) => {
    const data = await Conversation.findAll({
        where: { type },
        include: [
            {
                model: Membre,
                where: { user_id: user_id },
                attributes: [], //ne recupere pas
            },
            {
                model: Message, as: 'last_message'
            },
            {
                model: Membre,
                as: 'talked',
                include: [{
                    model: User,
                    as: "user"
                }],
                required: false,
            },
        ],
    })

    return data
}

const createConversation = async (name = null, type = "prive") => {
    const newConversation = await Conversation.create({
        name, type
    });
    return newConversation;
}



module.exports = { verificationConversation, allConversation, createConversation };