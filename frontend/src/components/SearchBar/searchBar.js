import React, {Component} from 'react';
import './searchBar.css';
import axios from 'axios';

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: [],
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch = ()=>{
        if(document.getElementById('input_city').value === "" || document.getElementById('input_fromDate').value === "" || document.getElementById('toDate').value === "" || document.getElementById('noOfGuests').value === "")
        {
            alert("Oops! Looks like you missed on some search criteria. Please enter all the fields for us to give you an accurate result.");    
        }
        else{
            axios.get('/searchBar',{
                params:{
                    city: document.getElementById('input_city').value,
                    fromDate: document.getElementById('input_fromDate').value,
                    toDate: document.getElementById('toDate').value,
                    numSleep: document.getElementById('noOfGuests').value,
                }
            })
            .then((res) =>{
                if(res.status == 200){
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
                            <input type="text" id="input_city" name="city" className="w-100 form-control" placeholder="Enter the location" required/>
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
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

export default SearchBar;