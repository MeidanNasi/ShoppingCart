import { LOG_IN , LOG_OUT  } from './action-types/auth-actions'
import axios from 'axios';


export function logInUser(usr,psw){
    return(dispatch)=>{
        return axios.post('/auth/login', { username: usr, password: psw} ).then((response)=>{
            console.log("res=",response)
            dispatch(logIn(response));
        })
    }
}
//user wants to login
export const logIn= (response)=>{
    return{
        type: LOG_IN,
        response
    }
}
