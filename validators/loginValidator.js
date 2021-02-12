const { body } = require('express-validator')

module.exports = [
    body('email')
        .not().isEmpty().withMessage('Email must not be empty')
        .trim(),
    body('password')
        .not().isEmpty().withMessage('Password must not be empty')
]