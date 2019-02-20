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

export function editpro(users, current_user,updateSuccess){
    var headers = {
        'RT-AUTH-TOKEN': current_user.authentication_token
    }
    console.log(users);
    console.log('kjdskjsdkj');
    var result = axios.patch('https://rteamserver.herokuapp.com/api/users/' + current_user.id, users, {headers: headers}).then(response => {
        if (response.status == 200){
            getProfile(users.id,updateSuccess)
        }
    });
}