const router = require('express').Router();
const { getMyInfo, changeMyInfo } = require('../controllers/users');
const { changeMyInfoValidation } = require('../middlewares/validation');

router.get('users/me', getMyInfo);
router.patch('users/me', changeMyInfoValidation, changeMyInfo);

module.exports = router;
