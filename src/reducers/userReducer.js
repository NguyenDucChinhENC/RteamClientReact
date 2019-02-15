export default function userReducer(state = {}, action){
    switch(action.type) {
        case 'ADD_CURRENT_USER':
            return action.current_user;
        default:
            return state;
    }
}