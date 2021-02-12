const router = require('express').Router();
const registerValidator = require('../validators/registerValidator');
const loginValidator = require('../validators/loginValidator');
const authenticate = require('../authenticate');
const {
    loginController,
    registerController,
    allUserController,
    passwordResetController
} = require('../controllers/userController');

router.post('/login', loginValidator, loginController);

router.post('/register', registerValidator, registerController);
router.get('/', authenticate, allUserController);

router.post('/reset-password', passwordResetController);

module.exports = router;