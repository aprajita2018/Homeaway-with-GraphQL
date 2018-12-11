import React,{Component} from 'react';
import './PropertyDetails.css';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import * as qs from 'query-string';
import cookie from 'react-cookies';

import {getPropertyDetails} from '../../queries/queries';
import {bookPropertyMutation} from '../../mutation/mutation';
import { compose, graphql, withApollo } from 'react-apollo';

class PropertyDetails extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: qs.parse(this.props.location.search).id ,
            user_type: cookie.load('user_type'),
            isLoggedIn: false,
            isBooked: false,
            fromDate: "",
            toDate: "",
            priceTotal: "",
            photoURL: "",
            ownerDetails: {}
        };
        this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
        this.handleBookNow = this.handleBookNow.bind(this);
    }

    fetchPropertyDetails = async () => {
        const {id} = this.state;
        const result = await this.props.client.query({
            query: getPropertyDetails,
            variables: {id}
        });
        const propDetails = result.data.propertyDetails;
        this.setState({
            ...propDetails,
            ownerDetails: propDetails.ownerDetails
        });
    }

    componentDidMount () {
        if(this.state.user_type === 'traveler'){
            this.setState({
                isLoggedIn: true,
            })
        }
        this.fetchPropertyDetails();
      }

    //handler for book now button  
    handleBookNow(){
        if(!this.state.isLoggedIn){
            window.location= '/travellerLogin';
        }

        this.props.bookPropertyMutation({
            variables: {
                property_id: this.state.id,
                owner_id: this.state.ownerDetails.id,
                priceTotal: this.state.priceTotal,
                pricePerNight: this.state.price,
                fromDate: this.state.fromDate,
                toDate: this.state.toDate
            }
        });
        console.log("Successfully booked the property.");
        this.setState({
            isBooked: true,
        });
        document.getElementById("success_text").innerHTML = "Successfull booking!";
        document.getElementById("success_snackbar").style.setProperty('display', 'block'); 
        setTimeout(() => {
            document.getElementById("success_snackbar").style.setProperty('display', 'none');
        }, 2000);

        // axios.post('/bookNow', {
        //     params: {
        //         property_id: this.state.id,
        //         owner_id : this.state.owner_id,
        //         pricePerNight: this.state.price,
        //         fromDate: document.getElementById('booking_from').value,
        //         toDate: document.getElementById('booking_until').value,
        //         priceTotal: this.state.priceTotal,
        //     }
        // })
        // .then((res) =>{
        //     if(res.status === 200){
        //         console.log("Successfully booked the property.");
        //         this.setState({
        //             isBooked: true,
        //         });
        //         document.getElementById("success_text").innerHTML = "Successfully booking!";
        //         document.getElementById("success_snackbar").style.setProperty('display', 'block'); 
        //         setTimeout(() => {
        //             document.getElementById("success_snackbar").style.setProperty('display', 'none');
        //         }, 2000);
        //     }
        //     else{                
        //         console.log("Error in booking the property.");
        //         document.getElementById("alert_text").innerHTML = "ERROR: Could not book the property.";
        //         document.getElementById("alert_snackbar").style.setProperty('display', 'block');
        //         setTimeout(() => {
        //             document.getElementById("alert_snackbar").style.setProperty('display', 'none');
        //         }, 2000);
        //     }
        // })
    }

    //function to calculate total price based on from & to dates
    calculateTotalPrice() {
        var a = document.getElementById('booking_from').value;
        var b = document.getElementById('booking_until').value;
        var c = this.state.price;
        if(a !== "" && b!== ""){
            var d1 = new Date(a);
            var d2 = new Date(b);
            var totalPrice =  ((d2-d1)/(1000*60*60*24)) *c;
            this.setState({
            priceTotal: totalPrice,
            fromDate: a,
            toDate: b,
        });
        }            
    }    
    render(){
        let image_carousel = this.state.photoURL.split(";").map((url, index) => {
            return(
                <div className={index === 0 ? "carousel-item active" : "carousel-item"}> 
                    <img className='d-block w-100' src={url} alt={index} />
                </div>                                          
            )
        });

        let carousel_indicators = this.state.photoURL.split(";").map((url, index) => {
            return(
                <li data-target="#carouselExampleIndicators" data-slide-to={index} className={index === 0 ? "active" : ""}></li>                                          
            )
        });

        return(
            <div>
                <NavBar location="PropertyDetails" />
                <div className="container mt-5 pt-5">
                    <button className="btn btn-info mb-3">Back to Search</button>
                    <h2 className="font-weight-bold">Overview</h2>
                    <div className="row">
                        <div className="col-md-8 flex-wrap flex-row">
                            <div className="card">
                                <div id="carouselExampleIndicators" className="card-img-top carousel slide" data-ride="carousel">
                                    <ol className="carousel-indicators">
                                        {carousel_indicators}
                                    </ol>
                                    <div className="carousel-inner">
                                        {image_carousel}
                                    </div>
                                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{this.state.title}</h5>
                                </div>
                                <div className="card-body row text-center">
                                    <div className="col-2 text-left">
                                        Details:
                                    </div>
                                    <div className="col-2">
                                        <i className="fas fa-home fa-3x" />
                                        <br />
                                        Property <br />{this.state.type}
                                    </div>
                                    <div className="col-2">
                                        <i className="fas fa-users fa-3x" />
                                        <br />
                                        Sleeps <br />{this.state.numSleep}
                                    </div>
                                    <div className="col-2">
                                        <i className="fas fa-bed fa-3x" />
                                        <br />
                                        Bedroom <br />{this.state.numBed}
                                    </div>
                                    <div className="col-2">
                                        <i className="fas fa-bath fa-3x" />
                                        <br />
                                        Bathroom <br />{this.state.numBath}
                                    </div>
                                    <div className="col-2">
                                        <i className="far fa-moon fa-3x" />
                                        <br />
                                        Minimum stay <br />{this.state.minStay} nights
                                    </div>
                                </div>
                                <div className="card-body row">
                                    <div className="col-2">
                                        About the property:
                                    </div>
                                    <div className="col-10">
                                        {this.state.description}
                                    </div>
                                </div>
                                <div className="card-body row">
                                    <div className="col-2">
                                        Property Manager:
                                    </div>
                                    <div className="col-10">
                                        <i className="far fa-user" /> : {this.state.ownerDetails.f_name} {this.state.ownerDetails.l_name}<br />
                                        <i className="far fa-comment-alt" /> : {this.state.ownerDetails.aboutMe} <br />
                                        <i className="far fa-envelope" /> : {this.state.ownerDetails.email} <br />
                                        <i className="fas fa-phone" /> : {this.state.ownerDetails.phone_num}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">

                            {/* Confirmed Booking Box */}
                            <div className="w-100 h-100" style={{position: "absolute", 'zIndex':'2024', display: this.state.isBooked? 'block': 'none'}}>
                                <div className="container border border-success m-5 p-3"> 
                                    <h3 className="font-weight-bold text-success text-center">Congratulations!!!</h3>
                                    <p className="text-info text-center mt-4"> Your booking has been confirmed. </p>                                    
                                </div>

                            </div>

                            {/* Booking Box */}
                            <div className="w-100 h-100" style={{position: "absolute", 'zIndex':'2024', display: this.state.isBooked? 'none': 'block'}}>
                                <div className="container border border-info float-right">
                                    <h3 className="font-weight-bold">${this.state.price}</h3>
                                    {/* <p className="text-subtitle">per night</p>
                                    Your dates are <span className="text-success">Available!</span> */}
                                    <br />
                                    <br />
                                        <div className="row m-1">
                                            <input className="col-6" type="date" id="booking_from" name="fromDate" min={this.state.fromDate.substring(0,10)} max={this.state.toDate.substring(0,10)} onChange={this.calculateTotalPrice} required/>
                                        </div>
                                        <div className="row m-1">     
                                            <input className="col-6" type="date" id="booking_until" name="toDate" min={this.state.fromDate.substring(0,10)} max={this.state.toDate.substring(0,10)} onChange={this.calculateTotalPrice} required/>
                                            
                                        </div>
                                        <div className="row m-1">
                                            <input className="col-12" type="text" name="numGuests" min="1" placeholder="Number of guests" required />
                                        </div>
                                        <br />
                                        <div className="row">
                                            <h5 className="col-6 font-weight-bold align-self-center">Total</h5>                                  
                                            <h3 className="col-6 font-weight-bold float-right align-self-center">${this.state.priceTotal}</h3>
                                        </div>
                                        <p className="text-subtitle text-secondary">Incl. of all taxes</p>
                                        <button  className="btn btn-primary my-2 btn-block" onClick={this.handleBookNow}>Book Now!</button>
                                </div>
                            </div>
                        </div>
                        <div id="alert_snackbar" className="alert alert-danger snackbar" role="alert" style={{display: 'none'}}>
                            <p id="alert_text"></p>
                        </div>
                        <div id="success_snackbar" className="alert alert-success snackbar" role="alert" style={{display: 'none'}}>
                            <p id="success_text"></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default compose(
    withApollo,
    graphql(bookPropertyMutation, {name: "bookPropertyMutation"})
)(PropertyDetails);