import { combineReducers } from 'redux';
import current_user from './userReducer';
import current_user_status from './userStatusReducer';

const rootProducer = combineReducers({
    current_user,
    current_user_status
});

export default rootProducer;