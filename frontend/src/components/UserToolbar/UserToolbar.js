import React, {Component} from 'react';
import './UserToolbar.css';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";

class UserToolbar extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let firstLink = (this.props.user_type === 'traveler') ? '/TravelerTrips' : 'OwnerProperties';
        let firstText = (this.props.user_type === 'traveler') ? 'My Trips' : 'My Properties';
        return(
            <div className="container mt-5 pt-5">
                <ul className="nav nav-pills border-bottom">
                    <li className="nav-item">
                        <Link to="/inbox">
                            <span className={this.props.tab === 'inbox'? "nav-link active" : "nav-link"}>My Inbox</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={firstLink}>
                            <span className={this.props.tab === 'mytrips'? "nav-link active" : "nav-link"}>{firstText}</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/userProfile">
                            <span className={this.props.tab === 'profile'? "nav-link active" : "nav-link"}>Profile</span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.users.token,
    user: state.users.user,
    name: state.users.name,
    user_type: state.users.user_type
});

export default connect(mapStateToProps, {})(UserToolbar);