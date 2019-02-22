import React from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../constan';

export function createEvent(current_user, data, id_group){
    var header = {
        'RT-AUTH-TOKEN': current_user.authentication_token
    };

    var param = {
        id_group: id_group,
        event: data
    }

    var result = axios.post(SERVER_URL + 'events', param, {headers: header}).then(response =>{
        if(response.status == 200){

        }
    })
}