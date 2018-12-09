import React,{Component} from 'react';
import NavBar from '../NavBar/NavBar';
import UserToolbar from '../UserToolbar/UserToolbar';
import SearchResult from '../SearchResult/SearchResult';
import {Redirect} from 'react-router';
import {fetchProperties} from '../../actions/property_action';
import {connect} from 'react-redux';
import Pagination from 'react-js-pagination';

class OwnerProperties extends Component{
    constructor(props){
        super(props);   
        this.state = {
            activePage: 1,
            items_per_page: 5,
            properties: [],
            paginatedList: [],
            num_properties: 0,
        };

        this.props.fetchProperties( (res) => {
            console.log("All properties fetched");
            this.setState({
                properties: res
            });
        });

        this.handlePageChange = this.handlePageChange.bind(this);   
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.properties){
            this.setState({
                paginatedList: nextProps.properties.slice(0,5),
                num_properties: nextProps.properties.length,
            });
        }
    }

    handlePageChange(pageNumber){
        console.log(`active page is ${pageNumber}`);
        var firstIndex = (pageNumber-1) * this.state.items_per_page ;
        var lastIndex = pageNumber * this.state.items_per_page;
        this.setState({
            activePage: parseInt(pageNumber),
            paginatedList: this.props.properties.slice(firstIndex, lastIndex )
            });
    }

    render(){
        let owner_properties = this.state.paginatedList.map(property => {
            return(
                <SearchResult propertyId={property._id} property={property}/>
            )
        })
        let redirectVar = null;
        if(this.props.user_type !== 'owner'){
            redirectVar = <Redirect to="/ownerLogin" />;
        }
        return(
            <div className = "container">
                {redirectVar}
                <NavBar location="OwnerProperties" />
                <UserToolbar user="owner" tab="mytrips"/>
                <div className="d-block w-100">
                    <h2 className="mt-3 font-weight-bold">My Properties</h2>
                    <div id="my_properties" className="container clearfix">
                        <p className="pagination justify-content-end">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.items_per_page}
                                totalItemsCount={this.state.num_properties}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange}
                                prevPageText="Prev"
                                nextPageText="Next"
                                firstPageText="First"
                                lastPageText="Last"
                                itemClass="mx-1"
                            />
                        </p>
                        {owner_properties}
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
    properties: state.properties.properties,
});

export default connect(mapStateToProps, {fetchProperties})(OwnerProperties);