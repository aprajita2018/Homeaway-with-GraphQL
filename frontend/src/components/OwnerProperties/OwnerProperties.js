import React,{Component} from 'react';
import NavBar from '../NavBar/NavBar';
import UserToolbar from '../UserToolbar/UserToolbar';
import SearchResult from '../SearchResult/SearchResult';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';

class OwnerProperties extends Component{
    constructor(props){
        super(props);        
        this.state = {
            ids : [],
            user_type: cookie.load('user_type'),
        };
    }

    componentDidMount () {
        axios.get('/ownerProperties')
        .then((res) =>{
            console.log(res.data);
            this.setState({
                ids: this.state.ids.concat(res.data),
            })
        })
    }

    render(){
        let properties = this.state.ids.map(id => {
            return(
                <SearchResult propertyId = {id.property_id}/>
            )
        })
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
                        {properties}
                    </div>
                </div>
            </div>
        );
    }
}

export default OwnerProperties;