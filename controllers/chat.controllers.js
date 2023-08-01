const { allConversation, createConversation } = require("../service/conversationService");
const { createMembres } = require("../service/membreService");
const { listMessage, createMessage, loadMessage } = require("../service/messageService");

module.exports.allConversation = async (req, res) => {
    const prive = await allConversation(res.locals.user.id, 'prive')
    const groupe = await allConversation(res.locals.user.id, 'groupe')
    return res.status(200).json({ prive, groupe });
};

module.exports.allDiscussion = async (req, res) => {
    const { idConversation } = req.params
    const message = await listMessage(idConversation)
    return res.status(200).json({ message });
};

module.exports.sendMessage = async (req, res) => {
    let { conversation_id, user_id, name, type, message } = await req.body
    let newMessage = await null;
    if (!conversation_id) {
        const conversation = await createConversation(name, type)
        user_id.push(res.locals.user.id);
        const membre = await createMembres(conversation.id, user_id)
        newMessage = await createMessage(conversation.id, message, res.locals.user.id)
    } else {
        newMessage = await createMessage(conversation_id, message, res.locals.user.id)
    }
    newMessage = await loadMessage(newMessage.id)
    return res.status(200).json({ data : newMessage });
};




