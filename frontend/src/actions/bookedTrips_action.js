import axios from "axios";
import { BOOKING_DETAILS, BOOK_PROPERTY, FETCH_BOOKINGS } from './types';
import {BACKEND_HOST} from './host_config'

export const booking_details = (values, callback) => dispatch =>{
    const token = localStorage.getItem('jwt_token');   
    axios.get( BACKEND_HOST + '/bookingDetails', values, {headers:{Authorization: 'Bearer ' + token}})
        .then((res) => {
            if(res.status === 200){  
                callback(res.data);
            }
        });
    }


//function / action to book the property
export const bookProperty = (values, callback) => dispatch => {
    console.log("Booking property: " + JSON.stringify(values));
    const token = localStorage.getItem('jwt_token');
    //const property_id = localStorage.getItem('property_id');

    axios.post( BACKEND_HOST + '/bookNow', values, {headers:{Authorization: 'Bearer ' + token}})
        .then((res) => {
            if(res.status ===200){
                dispatch({
                    type : BOOK_PROPERTY,
                    payload: res.data
                });
                callback(res.data);
            }
        });
}


//function / action to fetch all bookings
export const fetchBookings = (callback) => dispatch => {
    console.log("Fetching all bookings for this user: ");
    const token = localStorage.getItem('jwt_token');
    //const property_id = localStorage.getItem('property_id');

    axios.get( BACKEND_HOST + '/bookedTrips', {headers:{Authorization: 'Bearer ' + token}})
        .then((res) => {
            if(res.status ===200){
                dispatch({
                    type : FETCH_BOOKINGS,
                    payload: res.data
                });
                callback(res.data);
            }
        });
}
