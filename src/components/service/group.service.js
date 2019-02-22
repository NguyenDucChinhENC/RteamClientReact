import React from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../constan';

export function createGroup(current_user, data){
    var header = {
        'RT-AUTH-TOKEN': current_user.authentication_token
    };

    var result = axios.post('https://rteamserver.herokuapp.com/api/groups', data, {headers: header}).then(response =>{
        if(response.status == 200){
            console.log('tao xong roi =))');
        }
    })
}