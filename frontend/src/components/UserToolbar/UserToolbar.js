import React, {Component} from 'react';
import './UserToolbar.css';
import cookie from 'react-cookies';

class UserToolbar extends Component{
    constructor(props){
        super(props);

        this.state = {
            user_type: cookie.load('user_type'),
        };
    }

    render(){
        return(
            <div className="container mt-5 pt-5">
                <ul className="nav nav-pills border-bottom">
                    <li className="nav-item">
                        <a className={this.props.tab === 'mytrips'? "nav-link active" : "nav-link"} href={this.state.user_type === 'traveler' ? "./TravelerTrips" : "./OwnerProperties"}>{this.state.user_type === 'traveler' ? "My Trips" : "My Properties"}</a>
                    </li>
                    <li className="nav-item">
                        <a className={this.props.tab === 'profile'? "nav-link active" : "nav-link"} href="./userProfile">Profile</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default UserToolbar;