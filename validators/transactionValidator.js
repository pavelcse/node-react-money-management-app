const { body } = require('express-validator')

module.exports = [
    body('amount')
        .not().isEmpty().withMessage('Amount must not be empty'),
    body('type')
        .not().isEmpty().withMessage('Type must not be empty')
]