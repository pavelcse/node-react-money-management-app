import { combineReducers } from "redux";
import authReducer from "./authReducers";
import transactionReducer from "./transactionReducers";

const rootReducer = combineReducers({
    auth: authReducer,
    transactions: transactionReducer
});

export default rootReducer;