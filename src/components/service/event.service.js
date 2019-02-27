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

export function updateEvent(current_user, id_event, data, saveSuccess){
    var headers = {
        'RT-AUTH-TOKEN': current_user.authentication_token
    }

    var result = axios.patch(SERVER_URL + 'events/' + id_event, data, {headers: headers}).then(response => {
        if (response.status == 200){
            saveSuccess();
        }
    })
}

export function getEvent(current_user, id_event, getSuccess){
    var headers = {
        'RT-AUTH-TOKEN': current_user.authentication_token
    };

    var result = axios.get(SERVER_URL + 'events/' + id_event, {headers: headers}).then(response => {
        if(response.status == 200){
            getSuccess(response.data.data)
        } else {
            console.log('dell')
        }
    });
}

export function joinEvent(current_user, id_event, joinSuccess){
    var headers = {
        'RT-AUTH-TOKEN': current_user.authentication_token
    };

    var param = {
        id: id_event
    }

    var result = axios.post(SERVER_URL + 'member_events', param, {headers: headers}).then(response => {
        if(response.status == 200){
            debugger
            joinSuccess(response.data.member_event);
        }
    })
}

export function leaveEvent(current_user, id_member, leaveSuccess){
    var headers = {
        'RT-AUTH-TOKEN': current_user.authentication_token
    };

    var result = axios.delete(SERVER_URL + 'member_events/' + id_member, {headers: headers}).then(response => {
        if(response.status == 200){
            leaveSuccess();
        }
    })
}

export function addAdminEvent(current_user, user_id, event_id, addSuccess){
    var headers = {
        'RT-AUTH-TOKEN': current_user.authentication_token
    };

    var params = {
        event_id: event_id,
        user_id: user_id
    }

    var result = axios.post(SERVER_URL + 'admin_events', params, {headers: headers}).then(response => {
        if(response.status == 200){
            addSuccess();
        }
    })
}

export function getAllEvents(current_user,getSuccess){
    var headers = {
        'RT-AUTH-TOKEN' : current_user.authentication_token
    };

    var result = axios.get(SERVER_URL + 'events', {headers: headers}).then(response => {
        if(response.status == 200){
            getSuccess(response.data.data);
        }
    })

}