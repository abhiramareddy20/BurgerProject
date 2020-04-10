import * as actionTypes from './actionTypes';

import axios from 'axios';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return{
        type: actionTypes.AUTH_SUCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (err) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: err
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout());
        }, expirationTime *1000);
    };
};

export const auth = (email, password , isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email : email,
            password: password,
            returnSecureToken: true
        };
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClM5kJWZ1P40IODxAIPpadrioJRFhYsIg';
        if(!isSignup)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClM5kJWZ1P40IODxAIPpadrioJRFhYsIg';
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeOut(response.data.expiresIn));
        })
        .catch(err =>{
            dispatch(authFail(err.response.data.error));
        });
    };
};

export const setAuthRedirectPath = (path ) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};