export default function userStatusReducer(state = false, action){
    switch(action.type) {
        case 'ADD_STATUS':
            return action.value;
        default:
            return state;
    }
}