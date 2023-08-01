const router = require('express').Router();
const authController = require('../controllers/auth.controllers');

router.post('/connexion', authController.connexion);
router.get('/deconnect', authController.deconnect);
router.post('/register', authController.register);

module.exports = router;