import {LOGIN_USER, SIGNUP_USER,UPDATE_USER, GET_USERDETAILS,GET_USERDETAILS_BYID,FETCH_OWNER,SEND_MSG, RECEIVE_MSGS, LOGOUT_USER} from "../actions/types";

const intialState = {
  user: {},
  token: "",
  name: "",
  user_type: "",
  owner: ""
};

export default function(state = intialState, action) {
    switch (action.type) {
      case LOGIN_USER:
        return {
          ...state,
          token: action.payload.token,  //Adding token to application state store
          user: action.payload.user,     //Adding user object to store
          name: action.payload.user.name,
          user_type: action.payload.user.user_type
        }

      case SIGNUP_USER:
        return {
          ...state,
        }

      case UPDATE_USER:
        return {
          ...state,
          user: action.payload.user,
          name: action.payload.user.f_name + " " + action.payload.user.l_name
        }

      case GET_USERDETAILS:
        console.log("Sending user details to store");
        return {
          ...state,
          user: action.payload.user  // getting all user details and setting them in store
        }

      case FETCH_OWNER:
        console.log("Sending owner details to store.");
        return{
          ...state,
          owner: action.payload.owner
        }
      
      case SEND_MSG:
        return{
          ...state,
          new_message: action.payload.msg
        }
      
      case RECEIVE_MSGS:
        console.log("Sending message to store.");
        return{
          ...state,
          messages: action.payload.userMessages
        }
      
      case GET_USERDETAILS_BYID:
        console.log("Sending user details to store");
        return {
          ...state,
          //sender: action.payload.details  // getting all user details and setting them in store
        }
          

      case LOGOUT_USER:
        console.log("Logging out user. Resetting users store");
        return {
          ...intialState  // resetting the state
        }

      default:
        return state;
    }
  }
  
  