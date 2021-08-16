const { Router } = require('express');
const adminController = require('../controllers/adminController');
const { requireAuth, checkUser, levelInfo } = require('../middleware/Middleware')

const router = Router();

router.get('/admin',adminController.adminloginz_get, (req, res) => { res.render('admin')})
router.get('/createQuestion', adminController.adminloginz_get, (req, res) => { res.render('createQuestion')});
router.post('/koshan',adminController.adminloginz_get, adminController.ques_create_post);
router.get('/seeQuestions', adminController.adminloginz_get, adminController.see_questions_get)
router.get('/seeUsers', adminController.adminloginz_get, adminController.see_users_get)
router.get('/editQuestion', adminController.adminloginz_get, (req, res) => { res.render('editQuestion')});
router.post('/deleteKoshan', adminController.adminloginz_get, adminController.ques_delete_post);
router.get('/deleteQuestion', adminController.adminloginz_get, (req, res) => { res.render('deleteQuestion')});
router.post('/editKoshan',adminController.adminloginz_get, adminController.ques_edit_post);
router.post('/banz',adminController.adminloginz_get, adminController.ban_post);
router.get('/banUser',adminController.adminloginz_get,(req, res) => { res.render('banUser')});
router.post('/unbanz',adminController.adminloginz_get, adminController.unban_post);
router.get('/unbanUser',adminController.adminloginz_get,(req, res) => { res.render('unbanUser')});
router.get('/logs',adminController.adminloginz_get,adminController.logs_get)

module.exports = router;