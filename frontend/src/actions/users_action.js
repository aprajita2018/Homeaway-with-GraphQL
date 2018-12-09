import axios from "axios";
import {LOGIN_USER, SIGNUP_USER, UPDATE_USER, GET_USERDETAILS,GET_USERDETAILS_BYID, FETCH_OWNER, SEND_MSG, RECEIVE_MSGS, LOGOUT_USER} from './types';
import {BACKEND_HOST} from './host_config'

//function/ action to post the login form
export const login = (values, callback) => dispatch =>  {    
    axios.post(BACKEND_HOST + '/login', values)
        .then((res) => {
            if(res.status === 200){  
                localStorage.setItem('jwt_token', res.data.token);
                dispatch({
                    type : LOGIN_USER,
                    payload: res.data
                });
                callback(res.data);
            }
            else{
                console.log("Some error")
                callback({status: "ERROR", message: "Could not log in"});
            }
            
        });
}

//function/ action to post the user sign up form
export const signup = (values, callback) => dispatch => {        
    axios.post( BACKEND_HOST + '/userSignup', values)
        .then((res) => {
            if(res.status === 200){  
                dispatch({
                    type : SIGNUP_USER,
                    payload: res.data
                });
                callback(res.data);
            }
        });
}

//function/ action to post the updated user details
export const update = (values, callback) => dispatch => {
    const token = localStorage.getItem('jwt_token');
    
    axios.post( BACKEND_HOST + '/updateProfile', values,
        {headers: {Authorization: 'Bearer ' + token }})
        .then((res) => {
            if(res.status === 200){ 
                dispatch({
                    type : UPDATE_USER,
                    payload: res.data
                });
                callback(res.data);
            }
        });
}

//function / action to fetch the user details
export const getUserDetails = (callback) => dispatch => {
    console.log("Fetching user details...");
    const token = localStorage.getItem('jwt_token');

    axios.get( BACKEND_HOST + '/userDetails', {headers:{Authorization: 'Bearer ' + token}})
        .then((res) => {
            if(res.status ===200){
                dispatch({
                    type : GET_USERDETAILS,
                    payload: res.data
                });
                callback();
            }
        });
}

//function/ action to fetch the user details
export const userDetailsByID = (user_id, callback) => dispatch => {
    console.log("Fetching user details...");
    const token = localStorage.getItem('jwt_token');

    axios.get( BACKEND_HOST + '/userDetailsByID', {headers:{Authorization: 'Bearer ' + token}, params:{id: user_id}})
        .then((res) => {
            if(res.status ===200){
                dispatch({
                    type : GET_USERDETAILS_BYID,
                    payload: res.data
                });
                callback(res.data);
            }
        });
}
//function / action to fetch the owner details
export const fetchOwner = (owner_id, callback) => dispatch => {
    console.log("Fetching owner details for ownerDetails...");
    const token = localStorage.getItem('jwt_token');
    //const owner_id = localStorage.getItem('owner_id');

    axios.get( BACKEND_HOST + '/ownerDetails?id='+owner_id, {headers:{Authorization: 'Bearer ' + token}})
        .then((res) => {
            if(res.status ===200){
                dispatch({
                    type : FETCH_OWNER,
                    payload: res.data
                });
                callback(res.data);
            }
        });
}

//function/ action to send message
export const sendMsg = (msgData, callback) => dispatch => {
    const token = localStorage.getItem('jwt_token');
    
    axios.post( BACKEND_HOST + '/sendMessage', msgData,
        {headers: {Authorization: 'Bearer ' + token }})
        .then((res) => {
            if(res.status === 200){ 
                dispatch({
                    type : SEND_MSG,
                    payload: res.data
                });
                callback(res.data);
            }
        });
}

//function/ action to receive message
export const receiveMsgs = (callback) => dispatch => {
    console.log("Fetching messages for receiveMsgs...");
    const token = localStorage.getItem('jwt_token');

    axios.get( BACKEND_HOST + '/receiveMessages', {headers:{Authorization: 'Bearer ' + token}})
        .then((res) => {
            if(res.status ===200){
                dispatch({
                    type : RECEIVE_MSGS,
                    payload: res.data
                });
                callback(res.data);
            }
        });
}


//function/ action to logout user
export const logout = (callback) => dispatch =>  { 
    console.log("Logout user action called")  
    const token = localStorage.getItem('jwt_token');
    axios.post( BACKEND_HOST + '/logout', {}, {headers:{Authorization: 'Bearer ' + token}})
        .then((res) => {
            if(res.status === 200){  
                console.log("Logging out the user. Will clean up tokens")
                localStorage.removeItem('jwt_token');
                dispatch({
                    type : LOGOUT_USER,
                    payload: res.data
                });
                callback();
            }
        });
}
