import React from 'react';
import axios from 'axios';

export function loginUser(account,loginSuccess) {
    var acc = {
        user: {
            "email": account.mail,
            "password": account.password
        }
    }
    var result = axios.post('https://rteamserver.herokuapp.com/api/sign_in',acc).then(response => {
        if (response.status == 200){
            console.log(response.data.data.user_info);
            localStorage.setItem('current_user', JSON.stringify(response.data.data.user_info));
            loginSuccess(response.data.data.user_info);
        }
    });
    
}

export function logoutUser(current_user, callback){
    var headers = {
        'RT-AUTH-TOKEN': current_user.authentication_token
    }
    var result = axios.delete('https://rteamserver.herokuapp.com/api/sign_out', {headers: headers}).then(response => {
        if (response.status == 200){
            console.log("logout success");
            localStorage.removeItem('current_user');
            callback();
        }
    });
}

export function checkCurrentUser(callback){
    let current_user = localStorage.getItem('current_user') || false;
    
    if (!current_user){
        // checkLogined();
    } else {
        callback(JSON.parse(current_user))
        // console.log(current_user);
    }
}

