const router = require('express').Router();
const transactionValidator = require('../validators/transactionValidator');
const authenticate = require('../authenticate');
const {
    getAllTransactions,
    createTransaction,
    getSingleTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactionController');

router.get('/', authenticate, getAllTransactions);

router.post('/', authenticate, transactionValidator, createTransaction);

router.get('/:transactionId', authenticate, getSingleTransaction);

router.put('/:transactionId', authenticate, transactionValidator, updateTransaction);

router.delete('/:transactionId', authenticate, deleteTransaction);

module.exports = router;