import React,{Component} from 'react';
import './TravelerTrips.css';
import NavBar from '../NavBar/NavBar';
import UserToolbar from '../UserToolbar/UserToolbar';
import axios from 'axios';
import BookedTrips from '../BookedTrips/BookedTrips';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

import {getTravellerTrips} from '../../queries/queries';
import { compose, graphql } from 'react-apollo';

class TravelerTrips extends Component{
    
    displayTrips(){
        var data = this.props.data;
        if(data.loading){
            return (<div>Loading your past trips...</div>);
        }
        else{
            return data.userDetails.tBookings.map(booking =>{
                return(
                <BookedTrips key={booking.id} booking={booking} />
                );
            });
            //return (<div>{JSON.stringify(data)}</div>)
        }
    }
    render(){
        let redirectVar = null;
        if(cookie.load('user_type') !== 'traveler'){
            redirectVar = <Redirect to="/travellerLogin" />;
        }
        return(
            <div className = "container">
                {redirectVar}
                <NavBar location="TravelerTrips" />
                <UserToolbar user="traveler" tab="mytrips"/>
                <div className="d-block w-100">
                    <h3 className="mt-3 font-weight-bold text-info">My trips dashboard</h3>
                    <div id="my_trips" className="container">
                        {this.displayTrips()}
                    </div>
                </div>
            </div>
        );
    }
}

export default graphql(getTravellerTrips, {
    options: () => ({ variables: { id: cookie.load('user_id') }}),
    },
    {name: "getTravellerTrips"}
)(TravelerTrips);