import * as Types from '../actions/types';

const transactionReducer = (state=[], action) => {
    switch (action.type) {
        case Types.LOAD_TRANSACTIONS : {
            return action.payload.transactions
        }
        case Types.CREATE_TRANSACTIONS : {
            let transactions = [...state]
            transactions.unshift(action.payload.transactions)
            return transactions
        }
        case Types.DELETE_TRANSACTION : {
            let transactions = [...state]
            return transactions.filter(trans => {
                return trans._id !== action.payload.id
            })
        }
        case Types.UPDATE_TRANSACTION : {
            let transactions = [...state]
            return transactions.map(tran => {
                if (tran._id === action.payload.transaction._id) {
                    return action.payload.transaction
                }
                return tran
            })
        }
        case Types.CREATE_TRANSACTIONS_ERROR : {
            return {
                error: action.payload.error
            }
        }
        default: return state
    }
}

export default transactionReducer