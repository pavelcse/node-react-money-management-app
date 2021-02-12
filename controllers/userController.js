const bcrypt = require('bcrypt')
const User = require('../models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const validationErrorFormatter = require('../utilities/validationErrorFormatter');
const { serverError } = require('../utilities/error');

module.exports = {
    async loginController(req, res) {
        let { email, password } = req.body;

        let errors = validationResult(req).formatWith(validationErrorFormatter);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() });
        }

        try {
            let user = await User.findOne({email})
            if(!user) {
                return res.status(400).json({ errors: {email: 'Invalid Email!' } });
            }

            let match = await bcrypt.compare(password, user.password)
            if(!match) {
                return res.status(400).json({ errors: {password: 'Invalid Password!' } });
            }

            let token = jwt.sign({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    amount: user.amount,
                    income: user.income,
                    expense: user.expense,
                    transactions: user.transactions
                }, 'SECRET', { expiresIn: '2h' }
            )
            return res.status(200).json({
                message: 'Login Successfully',
                token: `Bearer ${token}`
            });
        } catch (err) {
            serverError (res, err);
        }

    },
    async registerController(req, res) {
        let { name, email, password, confirmPassword } = req.body;

        let errors = validationResult(req).formatWith(validationErrorFormatter)

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() });
        }

        try {
            await bcrypt.hash(password, 11, async (err, hash) => {
                if (err) {
                    serverError (res, err);
                }

                let user = new User({
                    name,
                    email,
                    password: hash,
                    balance: 0,
                    expense: 0,
                    income: 0,
                    transactions: []
                });

                await user.save()
                    .then(user => {
                        return res.status(201).json({ message: 'User Created Successfully', user });
                    })
                    .catch(err => serverError (res, err))

            });
        } catch (err) {
            serverError (res, err)
        }
    },
    allUserController(req, res) {
        User.find()
            .then(user => res.status(200).json({user}))
            .catch(err =>  serverError (res, err))
    },
    passwordResetController(req, res) {
        let { email, password } = req.body;
        return res.json({
            message: 'This is Password Reset Page',
            data: { email, password }
        });
    }
}