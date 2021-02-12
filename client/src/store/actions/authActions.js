import Axios from 'axios';
import jwtDecode from "jwt-decode";
import * as Types from './types';
import setAuthToken from '../../utils/setAuthToken'

export const register = (user, history) => dispatch => {
    Axios.post('/api/users/register', user)
        .then(res => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: {}
                }
            })
            console.log(res)
            history.push('/login')
        })
        .catch(err => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: err.response.data.errors
                }
            })
        })
}

export const login = (user, history) => dispatch => {
    Axios.post('/api/users/login', user)
        .then(res => {
            let token = res.data.token;
            setAuthToken(token);

            localStorage.setItem('auth_token', token);
            let decode = jwtDecode(token);

            dispatch({
                type: Types.SET_USER,
                payload: {
                    user: decode
                }
            });
            history.push('/')
        })
        .catch(err => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: err.response.data.errors
                }
            })
        })
}

export const logout = history => {
    localStorage.removeItem('auth_token');
    history.push('/login')
    return {
        type: Types.SET_USER,
        payload: {
            user: {}
        }
    }
}