import React from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../constan';

export function createGroup(current_user, data){
    var header = {
        'RT-AUTH-TOKEN': current_user.authentication_token
    };

    var result = axios.post('https://rteamserver.herokuapp.com/api/groups', data, {headers: header}).then(response =>{
        if(response.status == 200){
            console.log(response);
        }
    })
}

export function getGroup(current_user, id_group, getSuccess){
    var headers = {
        'RT-AUTH-TOKEN': current_user.authentication_token
    };

    var result = axios.get(SERVER_URL + 'groups/' + id_group, {headers: headers}).then(response => {
        if(response.status == 200){
            getSuccess(response.data.data)
        } else {
            console.log('dell')
        }
    });
}

export function leaveGroup(current_user,id_membered_group, leaveSuccess){
    var headers = {
        'RT-AUTH-TOKEN': current_user.authentication_token
    };

    var result = axios.delete(SERVER_URL + 'member_groups/' + id_membered_group, {headers: headers}).then(response => {
        if(response.status == 200){
            debugger;
            leaveSuccess(response.data.data)
        }
    })
}

export function joinGroup(current_user,id_group, joinSuccess){
    var headers = {
        'RT-AUTH-TOKEN': current_user.authentication_token
    };

    var data = {
        id: id_group
    }

    var result = axios.post(SERVER_URL + 'member_groups', data, {headers: headers}).then(response => {
        if(response.status == 200){
            joinSuccess(response.data.data)
        }
    })
}
