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
            debugger
            editSuccess(response.data.object.body);
        }
    })
}