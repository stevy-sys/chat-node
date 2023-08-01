const router = require('express').Router();
const chatController = require('../controllers/chat.controllers');

router.get('/all-conversation', chatController.allConversation);
router.get('/all-discussion/:idConversation', chatController.allDiscussion);
router.post('/send-message', chatController.sendMessage);

module.exports = router;