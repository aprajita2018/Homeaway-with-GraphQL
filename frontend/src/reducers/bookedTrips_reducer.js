import {BOOKING_DETAILS, BOOK_PROPERTY, FETCH_BOOKINGS} from "../actions/types";


const intialState = {
};

export default function(state = intialState, action) {
    switch (action.type) {
      case BOOKING_DETAILS:
        return state;
      case BOOK_PROPERTY:
        return state;
      case FETCH_BOOKINGS:
        return {
          ...state,
          bookings: action.payload.bookings
        }
      default:
        return state;
    }
  } 