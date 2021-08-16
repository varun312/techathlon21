const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/login', authController.login_get);
router.get('/mslogin', authController.mslogin_get);
router.get('/redirect', authController.redirect_get);
router.get('/logout', authController.logout_get);

module.exports = router;