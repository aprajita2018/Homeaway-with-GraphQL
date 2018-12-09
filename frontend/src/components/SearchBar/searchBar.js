import React, {Component} from 'react';
import './searchBar.css';
import {Redirect} from 'react-router-dom';
import {searchProperties} from '../../actions/property_action';
import {connect} from 'react-redux';

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            properties: [],
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch = ()=>{
        if(document.getElementById('input_city').value === "" || document.getElementById('input_fromDate').value === "" || document.getElementById('toDate').value === "" || document.getElementById('noOfGuests').value === "")
        {
            alert("Oops! Looks like you missed on some search criteria. Please enter all the fields for us to give you an accurate result.");    
        }
        else{
            const params = {
                        city: document.getElementById('input_city').value,
                        fromDate: document.getElementById('input_fromDate').value,
                        toDate: document.getElementById('toDate').value,
                        numSleep: document.getElementById('noOfGuests').value,
                    };
            this.props.searchProperties(params, (res) => {
                console.log("Searched properties. Moving on to Search Result Page now");
                //this.props.history.push("/searchResultPage");
                window.location = "/searchResultPage"
            });
        }
    }
    render(){
        return(
             <div className="container flex-row flex-box" id="searchBar">
                <form className="searchForm" >
                    <div className="row py-3 px-1 align-self-center font-size-small">
                        <div className="col-4 input-group">
                            <input type="text" id="input_city" name="city" className="w-100 form-control" placeholder="Enter the location" required/>
                            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                        </div>
                        <div className="col-2" >
                            <input type="date" id="input_fromDate" name="fromDate"  className="w-100 form-control" placeholder="Arive" required />
                        </div>
                        <div className="col-2">
                            <input type="date" id="toDate" name="toDate" className="w-100 form-control" placeholder="Depart" required />
                        </div>
                        <div className="col-2">
                            <input type="number" min="1" id="noOfGuests" name="numSleep" className="w-100 form-control" placeholder="No of Guests" required />
                        </div>
                        <div className="col-2  align-self-center">
                            <button type="button" className="btn btn-primary rounded py-0 w-100 themebtn" data-effect = "ripple" onClick={this.handleSearch}>Search</button>
                        </div> 
                    </div>
                 </form>
            </div>
        )
    }
}

export default connect(null, {searchProperties})(SearchBar);