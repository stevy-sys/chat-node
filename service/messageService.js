const { Message, User ,Conversation ,Membre} = require("../models/")

const createMessage = async (conversation_id, newMessage, user_id) => {
    const message = await Message.create({
        conversation_id,
        message: newMessage,
        user_id
    })
    return message;
}


const loadMessage = async (message_id) => {
    const message = await Message.findOne({
        where: { id: message_id },
        include: [
            {
                model: Conversation,
                as: 'conversation',
                include: [
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
            },
        ],
    })
    return message;
}

const listMessage = async (conversation_id) => {
    const data = await Message.findAll({
        where: { conversation_id },
        include: [
            {
                model: User,
                as: 'user'
            },
        ],
    })
    return data
}

module.exports = { listMessage, createMessage, loadMessage };
