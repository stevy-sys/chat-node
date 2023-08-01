const router = require('express').Router();
const authController = require('../controllers/user.controllers');

router.get('/', authController.users);

module.exports = router;