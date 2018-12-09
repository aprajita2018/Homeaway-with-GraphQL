import { combineReducers } from "redux";
//import { reducer as formReducer } from "redux-form";
import users_reducer from "./users_reducer";
import bookedTrips_reducer  from "./bookedTrips_reducer";
import ownerProperties_reducer  from "./ownerProperties_reducer";

const rootReducer = combineReducers({
  users: users_reducer,
  bookedTrips: bookedTrips_reducer,
  properties: ownerProperties_reducer
  //form: formReducer
});

export default rootReducer;
