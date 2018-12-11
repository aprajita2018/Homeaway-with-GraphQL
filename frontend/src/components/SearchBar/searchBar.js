import React, {Component} from 'react';
import './searchBar.css';
import axios from 'axios';
import { graphql, compose } from 'react-apollo';
import { getSearchProperties} from '../../queries/queries';

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: [],
            city: null,
            fromDate: null,
            toDate: null,
            numSleep: null
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch = ()=>{
        if(document.getElementById('input_city').value === "" || document.getElementById('input_fromDate').value === "" || document.getElementById('toDate').value === "" || document.getElementById('noOfGuests').value === "")
        {
            alert("Oops! Looks like you missed on some search criteria. Please enter all the fields for us to give you an accurate result.");    
        }
        else{
            this.props.getSearchProperties({
                variables:{
                    city: this.state.city,
                    fromDate: this.state.fromDate,
                    toDate: this.state.toDate,
                    numSleep: this.state.numSleep,
                }
            })
            .then((res) =>{
                if(res.status === 200){
                    console.log("Successfully searched for the properties.");
                    window.location =  './searchResultPage?id=' + res.data;
                }
                else{
                    console.log("Error in searching for properties.")
                }
            })
        }
    }
    render(){
        return(
             <div className="container flex-row flex-box" id="searchBar">
                <form className="searchForm" >
                    <div className="row py-3 px-1 align-self-center font-size-small">
                        <div className="col-4 input-group">
                            <input type="text" id="input_city" name="city" className="w-100 form-control" onChange={ (e) => this.setState({ city: e.target.value })} placeholder="Enter the location" required/>
                            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                        </div>
                        <div className="col-2" >
                            <input type="date" id="input_fromDate" name="fromDate"  onChange={ (e) => this.setState({ fromDate: e.target.value })} className="w-100 form-control" placeholder="Arive" required />
                        </div>
                        <div className="col-2">
                            <input type="date" id="toDate" name="toDate" className="w-100 form-control" onChange={ (e) => this.setState({ toDate: e.target.value })} placeholder="Depart" required />
                        </div>
                        <div className="col-2">
                            <input type="number" min="1" id="noOfGuests" name="numSleep" className="w-100 form-control" onChange={ (e) => this.setState({ numSleep: e.target.value })} placeholder="No of Guests" required />
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

// export default graphql(
//     getSearchProperties, {
//         variables: {
//             city: null,
//             fromDate: null,
//             toDate: null,
//             numSleep: null
//         }
//     },
//     { name: "getSearchProperties" }
// )(SearchBar);

export default SearchBar;