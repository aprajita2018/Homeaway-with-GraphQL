import React,{Component} from 'react';
import NavBar from '../NavBar/NavBar';
import UserToolbar from '../UserToolbar/UserToolbar';
import SearchResult from '../SearchResult/SearchResult';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import BookedTrips from '../BookedTrips/BookedTrips';

import {getOwnerBookings} from '../../queries/queries';
import { compose, graphql } from 'react-apollo';

class OwnerBookings extends Component{
    displayBookings(){
        var data = this.props.data;
        if(data.loading){
            return (<div>Loading your all Bookings...</div>);
        }
        else{
            return data.userDetails.oBookings.map(booking =>{
                return(
                <BookedTrips key={booking.id} booking={booking} />
                );
            });
            //return (<div>{JSON.stringify(data)}</div>)
        }
    }

    render(){
        let redirectVar = null;
        if(cookie.load('user_type') !== 'owner'){
            redirectVar = <Redirect to="/ownerLogin" />;
        }
        return(
            <div className = "container">
                {redirectVar}
                <NavBar location="OwnerProperties" />
                <UserToolbar tab="mybookings"/>
                <div className="d-block w-100">
                    <h2 className="mt-3 font-weight-bold">My Properties</h2>
                    <div id="my_bookings" className="container">
                        {this.displayBookings()}
                    </div>
                </div>
            </div>
        );
    }
}

export default graphql(getOwnerBookings, {
    options: () => ({ variables: { id: cookie.load('user_id') }}),
    },
    {name: "getOwnerBookings"}
)(OwnerBookings);