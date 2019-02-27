import React from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../constan';

export function editComment(current_user,comment_id,value,editSuccess){
    var headers = {
        'RT-AUTH-TOKEN': current_user.authentication_token
    };

    var params = {
        comment: {
            body: value
        }
    }

    var result = axios.patch(SERVER_URL + 'comments/' + comment_id, params, {headers: headers}).then(response => {
        if (response.status == 200){
            editSuccess(response.data.object.body);
        }
    })
}

export function createComment(current_user,event_id,value,submitSuccess){
    var headers = {
        'RT-AUTH-TOKEN': current_user.authentication_token
    };

    var params = {
        comment: {
            event_id: event_id,
            body: value
        }
    }

    var result = axios.post(SERVER_URL + 'comments', params, {headers: headers}).then(response => {
        if (response.status == 200){
            submitSuccess(response.data);
        }
    })
}

export function deleteComment(current_user,comment_id,deleteSuccess){
    var headers = {
        'RT-AUTH-TOKEN' : current_user.authentication_token
    };

    var result = axios.delete(SERVER_URL + 'comments/' + comment_id, {headers: headers}).then(response => {
        if(response.status == 200){
            deleteSuccess();
        }
    })
}