import React,{Component} from 'react';
import './TravelerTrips.css';
import NavBar from '../NavBar/NavBar';
import UserToolbar from '../UserToolbar/UserToolbar';
import axios from 'axios';
import BookedTrips from '../BookedTrips/BookedTrips';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class TravelerTrips extends Component{
    constructor(props){
        super(props);
        this.state = {
            ids: [],
            name: cookie.load('name'),
            user_type: cookie.load('user_type'),
        };
    }

    componentDidMount(){
        axios.get('/bookedTrips')
        .then((res) => {
            console.log(res.data);
            this.setState({
                ids: this.state.ids.concat(res.data),
            });
        });
    }

    render(){
        let bookings = this.state.ids.map(id =>{
            return(
                <BookedTrips booking_id = {id.booking_id} />
            )
        })
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
                        {bookings}
                    </div>
                </div>
            </div>
        );
    }
}

export default TravelerTrips;