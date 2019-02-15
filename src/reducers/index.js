import { combineReducers } from 'redux';
import current_user from './userReducer';

const rootProducer = combineReducers({
    current_user
});

export default rootProducer;