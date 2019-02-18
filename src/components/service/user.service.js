import React from 'react';
import axios from 'axios';

export function getProfile(user_id,getSuccess) {
    var result = axios.get('https://rteamserver.herokuapp.com/api/users/' + user_id).then(response => {
        if (response.status == 200) {
            console.log('get info success');
            getSuccess(response.data.data.user);
            console.log(response.data);
        }
    });
}

export function editpro(user, current_user){
    var headers = {
        'RT-AUTH-TOKEN': current_user.authentication_token
    }
    var user = {
        user
    }
    var result = axios.patch('https://rteamserver.herokuapp.com/api/users/' + current_user.id, current_user, {headers: headers}).then(response => {
        if (response.status == 200){
            console.log("update success");
            // localStorage.removeItem('current_user');
            // callback();
        }
    });
}