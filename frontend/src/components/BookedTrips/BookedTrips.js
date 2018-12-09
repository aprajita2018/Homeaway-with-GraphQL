import React, {Component} from 'react';
import axios from 'axios';

class BookedTrips extends Component{
    constructor(props){
        super(props);
        
        //initialize the state
        this.state = {
            id: this.props.booking_id,
            isLoading: false,
            photoURL: null,
        }
    }
    
    componentDidMount(){
        this.setState({
            isLoading:true,
        });

        //fetching the booking details from the backend
        axios.get('/bookingDetails', {
            params: {
                id: this.state.id
            }
        })
        .then((res) =>{
            console.log(res.data);
            this.setState({
                isLoading: false,
            });
            this.setState({
                owner_id: res.data.owner_id,
                pricePerNight: res.data.pricePerNight,
                fromDate: res.data.fromDate.substring(0,10),
                toDate: res.data.toDate.substring(0,10),
                priceTotal: res.data.priceTotal,
                photoURL: res.data.photoURL,
                title: res.data.title,
                description: res.data.description,
                type: res.data.type,
                numSleep: res.data.numSleep,
                numBath: res.data.numBath,
                numBed: res.data.numBed,
                minStay: res.data.minStay,
                streetAddress: res.data.streetAddress,
                city: res.data.city,
                state: res.data.state,
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
                        <p className="card-text font-weight-bold">Stay from {this.state.fromDate} until {this.state.toDate} </p>
                        <p className="card-text font-weight-bold">You paid: ${this.state.priceTotal}</p>
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

export default BookedTrips;