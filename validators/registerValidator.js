const { body } = require('express-validator')
const User = require('../models/User')

module.exports = [
    body('name')
        .not()
        .isEmpty().withMessage('Name must not be empty')
        .trim(),
    body('email')
        .not()
        .isEmpty().withMessage('Email must not be empty')
        .isEmail().withMessage('Please Provide A Valid Email')
        .custom(async email => {
            let user = await User.findOne({ email })
            if(user) {
                return Promise.reject('Email Already Used!')
            }
        })
        .normalizeEmail(),
    body('password')
        .not()
        .isEmpty().withMessage('Password must not be empty')
        .isLength({min:6}).withMessage('Password Must Be Greater Then 5 Characters'),
    body('confirmPassword')
        .not()
        .isEmpty().withMessage('Confirm Password must not be empty')
        .custom((value, { req }) => {
            if(value !== req.body.password) {
                throw new Error('Password Does Not Match')
            }
            return true
    })
]