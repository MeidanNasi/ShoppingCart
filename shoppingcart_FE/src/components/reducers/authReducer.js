
import { LOG_IN , LOG_OUT } from '../actions/action-types/auth-actions'
import axios from 'axios';



let user = JSON.parse(localStorage.getItem('user'));
const initialState = { users: [] }

const authReducer = (state = initialState, action)=>{
    switch(action.type){
        case LOG_IN: { 
            if(action.response.status === 200){
                return action.response;
            }
            else{
                return "Failed"
            }
        }
        default: return state

    }
}
export default authReducer
