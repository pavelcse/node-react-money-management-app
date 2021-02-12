import Axios from 'axios';
import * as Types from './types';

export const loadTransactions = (transaction, history) => dispatch => {
    Axios.get('/api/transactions/', transaction)
        .then(res => {
            dispatch({
                type: Types.LOAD_TRANSACTIONS,
                payload: {
                    transactions: res.data
                }
            })
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}

export const createTransactions = transaction => dispatch => {
    Axios.post('/api/transactions/', transaction)
        .then(res => {
            dispatch({
                type: Types.CREATE_TRANSACTIONS,
                payload: {
                    transactions: res.data
                }
            })
            console.log(res)
        })
        .catch(err => {
            dispatch({
                type: Types.CREATE_TRANSACTIONS_ERROR,
                payload: {
                    error: err.response.data.errors
                }
            })
        })
}

export const deleteTransactions = transactionId => dispatch => {
    Axios.delete(`/api/transactions/${transactionId}`)
        .then(res => {
            dispatch({
                type: Types.DELETE_TRANSACTION,
                payload: {
                    id: res.data._id
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const updateTransactions = (id, transaction) => dispatch => {
    Axios.put(`/api/transactions/${id}`, transaction)
        .then(res => {
            dispatch({
                type: Types.UPDATE_TRANSACTION,
                payload: {
                    transaction: res.data.transaction
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
}