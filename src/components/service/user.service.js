import React from 'react';
import axios from 'axios';

export function getProfile(user_id) {
    var result = axios.get('http://localhost:3000/api/users/' + user_id).then(response => {
        if (response.status == 200) {
            console.log('get info success');
            console.log(response.data);
        }
    });
}