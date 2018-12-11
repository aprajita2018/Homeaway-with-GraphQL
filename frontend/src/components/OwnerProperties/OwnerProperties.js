import React,{Component} from 'react';
import NavBar from '../NavBar/NavBar';
import UserToolbar from '../UserToolbar/UserToolbar';
import SearchResult from '../SearchResult/SearchResult';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';

import {getOwnerProperties} from '../../queries/queries';
import { compose, graphql } from 'react-apollo';

class OwnerProperties extends Component{
    displayProperties(){
        var data = this.props.data;
        if(data.loading){
            return (<div>Loading your Properties...</div>);
        }
        else{
            return data.userDetails.listings.map(property =>{
                return(
                <SearchResult key={property.id} property={property} />
                );
            });
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
                <UserToolbar user="owner" tab="mytrips"/>
                <div className="d-block w-100">
                    <h2 className="mt-3 font-weight-bold">My Properties</h2>
                    <div id="my_properties" className="container">
                        {this.displayProperties()}
                    </div>
                </div>
            </div>
        );
    }
}

export default graphql(getOwnerProperties, {
    options: () => ({ variables: { id: cookie.load('user_id') }}),
    },
    {name: "getOwnerProperties"}
)(OwnerProperties);