const { Router } = require('express');
const playController = require('../controllers/playController');
const { requireAuth, checkUser, levelInfo, stopBanned } = require('../middleware/Middleware')

const router = Router();


router.post('/play', checkUser, requireAuth, stopBanned, levelInfo, playController.play_post);
router.get('/play', requireAuth, stopBanned, levelInfo, playController.play_get);
router.get('/play/lordgodalmighty', (req, res) => {res.render('lordgodalmighty')});
router.get('/play/feelok', (req, res) => {res.render('itsokaynottofeelokay')});
router.get('/play/kaala', (req, res) => {res.render('kaala')});
router.get('/play/4runner', (req, res) => {res.render('4runner')});
router.get('/play/thelibrarian', (req, res) => {res.redirect('https://pastebin.com/6KGNd3qE')});
router.get('/play/david', (req, res) => {res.render('david')});
router.get('/leaderboard', playController.leaderboard_get);
router.get('/getQuestion', requireAuth, stopBanned, levelInfo, playController.question_get);



module.exports = router;