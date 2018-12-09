import React, {Component} from 'react';
//import axios from 'axios';
//import { Field, reduxForm, change} from "redux-form";
import {connect} from "react-redux";
import {fetchProperty} from "../../actions/property_action";


class BookedTrips extends Component{
        constructor(props){
            super(props);
            this.state = {
                isLoading: true,
                photoURL: ""
            }

            this.props.fetchProperty(this.props.booking.property_id, (res) => {
                this.setState({
                    isLoading: false,
                    ...res.property
                })
            })
        }

    render(){
        return(
            <div className="container bg-light my-2 py-2 bookedTripsPanel">
                <div className="card flex-row my-2" >                
                    {/* loading spinner overlay */}
                    <div className="loadingOverlay w-100 h-100" style={{position:"absolute", 'z-index':"2024", display: this.state.isLoading ? 'block' : 'none'}}>
                        <img src="img/loading_spinner.gif" style={{width:"60px", height:"60px", 'margin-left':"auto", 'margin-right':"auto", 'vertical-align':"middle", display:"block"}}/>
                    </div>
                    {/* card containing the booked propety details  */}
                    <div className="card-header border-0">
                        <img src={this.state.photoURL === null ? "" : this.state.photoURL.split(";")[0]} alt="property_image" width="200px"/>
                    </div>
                    <div className="card-body px-2 float-right">
                        <h5 className="card-title font-weight-bold">{this.state.title}</h5>
                        <p className="card-text">{this.state.description}</p>
                        <p className="card-text">{this.state.streetAddress}. {this.state.city}, {this.state.state}</p>
                        <p className="card-text font-weight-bold">Stay from {this.props.booking.fromDate.substring(0,10)} until {this.props.booking.toDate.substring(0,10)} </p>
                        <p className="card-text font-weight-bold">You paid: ${this.props.booking.priceTotal}</p>
                        <p className="card-text">
                            <span className="col-2">
                                <i className="fas fa-home" />
                                Property: {this.state.type}
                            </span>
                            <span className="col-2">
                                <i className="fas fa-users" />
                                Sleeps: {this.state.numSleep}
                            </span>
                            <span className="col-2">
                                <i className="fas fa-bed" />
                                Bedroom: {this.state.numBed}
                            </span>
                            <span className="col-2">
                                <i className="fas fa-bath" />
                                Bathroom: {this.state.numBath}
                            </span>
                            <span className="col-2">
                                <i className="far fa-moon" />
                                Minimum stay: {this.state.minStay} nights
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {fetchProperty})(BookedTrips);
