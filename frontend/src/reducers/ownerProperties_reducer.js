import {FETCH_PROPERTIES, LIST_PROPERTY, FETCH_PROPERTY, SEARCH_PROPERTIES} from "../actions/types";

const intialState = {
};

export default function(state = intialState, action) {
    switch (action.type) {
      case FETCH_PROPERTIES:
        return {
          ...state,
          properties: action.payload.properties
        }

        case LIST_PROPERTY:
        return {
          ...state
        }

        case FETCH_PROPERTY:
        return {
          ...state,
          property: action.payload.property
        }
        case SEARCH_PROPERTIES:
        return {
          ...state,
          properties: action.payload.properties
        }

      default:
        return state;
    }
  }
  
  