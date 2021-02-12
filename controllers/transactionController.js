const Transaction = require('../models/Transaction');
const User = require('../models/User');
const {serverError} = require('../utilities/error')

module.exports = {
    createTransaction(req, res) {
        let { amount, type, note } = req.body;
        let  userId = req.user._id;

        let transaction = new Transaction({
            amount, type, note, author: userId
        });

        transaction.save()
            .then(trans => {
                let updatedUser = {...req.user._doc}
                if(type === 'income') {
                    updatedUser.balance = updatedUser.balance + amount;
                    updatedUser.income = updatedUser.income + amount;
                } else if(type === 'expense') {
                    updatedUser.balance = updatedUser.balance - amount;
                    updatedUser.income = updatedUser.expense + amount;
                }
                updatedUser.transactions.unshift(trans._id);
                User.findByIdAndUpdate(updatedUser._id, { $set: updatedUser }, { new: true })
                    .then(result => {
                        res.status(201).json({
                            message: 'Transaction Created Successfully.',
                            ...trans._doc,
                            user: result
                        })
                    })
                    .catch(error => serverError(res, error));
            })
            .catch( error => serverError(res, error) )
    },
    getAllTransactions(req, res) {
        Transaction.find({author: req.user._id}).sort({'updatedAt': -1})
            .then(trans => {
                if(trans.length === 0) {
                    res.status(200).json({
                        message: 'No Transaction Found'
                    });
                } else {
                    res.status(200).json(trans);
                }
            })
            .catch(error => serverError(res, error))
    },
    getSingleTransaction(req, res) {
        let { transactionId } = req.params;
        Transaction.findById(transactionId)
            .then(trans => {
                if(!trans) {
                    res.status(200).json({ message: 'No Transaction Found' });
                } else {
                    res.status(200).json( trans );
                }
            })
            .catch(error => serverError(res, error))
    },
    updateTransaction(req, res) {
        let { transactionId } = req.params;
        let { amount, type, note } = req.body;
        let  userId = req.user._id;

        Transaction.findOneAndUpdate({_id: transactionId}, { $set: req.body },
            { new: true})
            .then(trans => {
                res.status(200).json({
                    message: 'Transaction Updated Successfully.',
                    transaction: trans
                })
            })
            .catch( error => serverError(res, error) )
    },
    deleteTransaction(req, res) {
        let { transactionId } = req.params;
        Transaction.findOneAndDelete({_id: transactionId})
            .then(trans => {
                res.status(200).json({
                    message: 'Transaction Deleted Successfully.',
                    ...trans._doc
                });
            })
            .catch(error => serverError(res, error))
    }
}