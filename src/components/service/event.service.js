import React from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../constan';

export function createEvent(current_user, data){
    var header = {
        'RT-AUTH-TOKEN': current_user.authentication_token
    };

    var result = axios.post(SERVER_URL + 'events', data, {header: header}).then(response =>{
        if(response.status == 200){
            console.log('tao xong roi =))');
        }
    })
}