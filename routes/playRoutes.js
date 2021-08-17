const { Router } = require('express');
const playController = require('../controllers/playController');
const { requireAuth, checkUser, levelInfo, stopBanned } = require('../middleware/Middleware')

const router = Router();


router.post('/play', checkUser, requireAuth, stopBanned, levelInfo, playController.play_post);
router.get('/play', requireAuth, stopBanned, levelInfo, playController.play_get);
router.get('/play/lordgodalmighty', (req, res) => {res.render('lordgodalmighty')});
router.get('/leaderboard', playController.leaderboard_get);
router.get('/getQuestion', requireAuth, stopBanned, levelInfo, playController.question_get);



module.exports = router;