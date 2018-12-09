import React,{Component} from 'react';
import './SearchResult.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

class SearchResult extends Component{
    constructor(props){
        super(props);
        this.state = {
            //id: this.props.propertyId,
            isLoading: false,
            photoURL: null,
        }
    }

    componentDidMount(){
        this.setState({
            isLoading: true,
        });
        if(this.props.property === undefined)
        {
            axios.get('/propertyDetails', {
                params: {
                id: this.state.id
                }
            })
            .then((res) => {
                console.log(res.data);
                this.setState({
                    isLoading: false,
                });
                this.setState({
                    title: res.data.title,
                    type: res.data.type,
                    description: res.data.description,
                    price: res.data.price,
                    numSleep: res.data.numSleep,
                    numBed: res.data.numBed,
                    numBath: res.data.numBath,
                    minStay: res.data.minStay,
                    city: res.data.city,
                    owner_id: res.data.owner_id,
                    streetAddress: res.data.streetAddress,
                    state: res.data.state,
                    fromDate: res.data.fromDate,
                    toDate: res.data.toDate,
                    photoURL: res.data.photoURL,
                });
            })
        }
        else{
            console.log("I already have all the details for property");
            this.setState({
                ...this.props.property,
                isLoading: false
            })
        }
    }

    render(){
        return(
            <div className="container bg-light my-2 py-2 searchResultPanel">
                <div className="card flex-row my-2">
                    <div className="loadingOverlay w-100 h-100" style={{position:"absolute", 'z-index':"2024", display: this.state.isLoading ? 'block' : 'none'}}>
                        <img src="img/loading_spinner.gif" alt="load-spinner-gif" style={{width:"60px", height:"60px", 'margin-left':"auto", 'margin-right':"auto", 'vertical-align':"middle", display:"block"}}/>
                    </div>
                    <div className="card-header border-0">
                        <img src={this.state.photoURL === null ? "" : this.state.photoURL.split(";")[0]} alt="property_image" width="200px"/>
                    </div>
                    <div className="card-body px-2 float-right">
                        <h5 className="card-title">{this.state.title}</h5>
                        <p className="card-text">{this.state.description}</p>
                        <p className="card-text">{this.state.streetAddress}. {this.state.city}, {this.state.state}</p>
                        <p className="card-text">Price: ${this.state.price} per night</p>
                        <p className="card-text">
                            <span className="col-2">
                                <i className="fas fa-home" />
                                Property {this.state.type}
                            </span>
                            <span className="col-2">
                                <i className="fas fa-users" />
                                Sleeps {this.state.numSleep}
                            </span>
                            <span className="col-2">
                                <i className="fas fa-bed" />
                                Bedroom {this.state.numBed}
                            </span>
                            <span className="col-2">
                                <i className="fas fa-bath" />
                                Bathroom {this.state.numBath}
                            </span>
                            <span className="col-2">
                                <i className="far fa-moon" />
                                Minimum stay {this.state.minStay} nights
                            </span>
                        </p>
                        <Link to={"/propertyDetails?id=" + this.state._id} className="btn btn-info">View details!</Link>
                    </div>
                </div>
            </div>
        );
    }

}

export default SearchResult;