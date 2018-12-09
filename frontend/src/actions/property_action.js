import axios from "axios";
import {FETCH_PROPERTIES, LIST_PROPERTY, FETCH_PROPERTY, SEARCH_PROPERTIES} from './types';
import store from '../store';
import {BACKEND_HOST} from './host_config';


//function/ action to post the property listing
export const listProperty = (values, callback) => dispatch => {
    const token = localStorage.getItem('jwt_token');
    
    axios.post(BACKEND_HOST + '/listingProperty', values,
        {headers: {Authorization: 'Bearer ' + token }})
        .then((res) => {
            if(res.status === 200){ 
                dispatch({
                    type : LIST_PROPERTY,
                    payload: res.data
                });
                callback(res.data);
            }
        });
}

//function / action to fetch the property details
export const fetchProperties = (callback) => dispatch => {
    console.log("Fetching properties details for ownerProperties...");
    const token = localStorage.getItem('jwt_token');

    axios.get(BACKEND_HOST + '/ownerProperties', {headers:{Authorization: 'Bearer ' + token}})
        .then((res) => {
            if(res.status ===200){
                dispatch({
                    type : FETCH_PROPERTIES,
                    payload: res.data
                });
                callback(res.data.properties);
            }
        });
}

//function / action to fetch the property details
export const fetchProperty = (property_id, callback) => dispatch => {
    console.log("Fetching property details for propertyDetails...");
    const token = localStorage.getItem('jwt_token');
    //const property_id = localStorage.getItem('property_id');

    axios.get( BACKEND_HOST + '/propertyDetails?id='+property_id, {headers:{Authorization: 'Bearer ' + token}})
        .then((res) => {
            if(res.status ===200){
                dispatch({
                    type : FETCH_PROPERTY,
                    payload: res.data
                });
                callback(res.data);
            }
        });
}


//function / action to fetch the property details
export const searchProperties = (values, callback) => dispatch => {
    console.log("Searching properties...");
    const token = localStorage.getItem('jwt_token');
    //const property_id = localStorage.getItem('property_id');

    axios.get( BACKEND_HOST + '/searchProperties', {
        headers:{Authorization: 'Bearer ' + token},
        params: values
    })
        .then((res) => {
            if(res.status ===200){
                dispatch({
                    type : SEARCH_PROPERTIES,
                    payload: res.data
                });
                callback(res.data);
            }
        });
}

