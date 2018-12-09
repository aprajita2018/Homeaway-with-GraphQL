import React,{Component} from 'react';
import './TravelerTrips.css';
import NavBar from '../NavBar/NavBar';
import UserToolbar from '../UserToolbar/UserToolbar';
import axios from 'axios';
import BookedTrips from '../BookedTrips/BookedTrips';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {fetchBookings} from '../../actions/bookedTrips_action';
import {connect} from 'react-redux';
import Pagination from 'react-js-pagination';


class TravelerTrips extends Component{
    constructor(props){
        super(props);
        this.state = {
            activePage: 1,
            items_per_page: 5,
            bookings: [],
            paginatedList: [],
            num_bookings: 0
        };

        this.props.fetchBookings((res) => {
            console.log("Fetched all bookings for this user");
            this.setState({
                bookings: res.bookings
            });
        });
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(pageNumber){
        console.log(`active page is ${pageNumber}`);
        var firstIndex = (pageNumber-1) * this.state.items_per_page ;
        var lastIndex = pageNumber * this.state.items_per_page;
        this.setState({
            activePage: parseInt(pageNumber),
            paginatedList: this.props.bookings.slice(firstIndex, lastIndex )
            });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.bookings){
            this.setState({
                paginatedList: nextProps.bookings.slice(0,5),
                num_bookings: nextProps.bookings.length,
            });
        }
    }

    render(){
        let bookings = this.state.paginatedList.map(booking =>{
            return(
                <BookedTrips booking_id={booking._id} booking={booking}/>
            )
        })
        let redirectVar = null;
        if(this.props.user_type !== 'traveler'){
            redirectVar = <Redirect to="/travellerLogin" />;
        }
        return(
            <div className = "container">
                {redirectVar}
                <NavBar location="TravelerTrips" />
                <UserToolbar user="traveler" tab="mytrips"/>
                <div className="d-block w-100">
                    <h3 className="mt-3 font-weight-bold text-info">My trips dashboard</h3>
                    <div id="my_trips" className="container clearfix">
                        <p className="pagination justify-content-end">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.items_per_page}
                                totalItemsCount={this.state.num_bookings}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange}
                                prevPageText="Prev"
                                nextPageText="Next"
                                firstPageText="First"
                                lastPageText="Last"
                                itemClass="mx-1"
                            />
                        </p>
                        {bookings}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.users.token,
    user: state.users.user,
    name: state.users.name,
    user_type: state.users.user_type,
    bookings: state.bookedTrips.bookings
});

export default connect(mapStateToProps, {fetchBookings})(TravelerTrips);