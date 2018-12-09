import React,{Component} from 'react';
import './SearchResultPage.css';
import SearchResult from '../SearchResult/SearchResult';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/searchBar';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import Pagination from 'react-js-pagination';

class SearchResultPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            activePage: 1,
            items_per_page: 10,
            properties: [],
            paginatedList: [],
            num_properties: 0,
        };

        this.handlePageChange = this.handlePageChange.bind(this);
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

    componentWillMount(){
        if(this.props.properties){
            this.setState({
                paginatedList: this.props.properties.slice(0,10),
                num_properties: this.props.properties.length,
            });
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.properties){
            console.log("Received new props: " + JSON.stringify(nextProps));
            this.setState({
                paginatedList: nextProps.properties.slice(0,10),
                num_properties: nextProps.properties.length,
            });
        }
    }

    render(){
        let properties = this.state.paginatedList.map(property => {
            return(
                <SearchResult property={property}/>
            )
        });

        return(
            <div>
                <NavBar location="SearchResultPage" />
                <div id="searchResultList" className="mt-5 pt-5">
                    <SearchBar />
                    <div className="container clearfix">
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
                        {
                            this.state.num_properties === 0 ? 
                            "None of the properties matched the search criteria. Please try with a different search criteria.": 
                            properties
                        }
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
    properties: state.properties.properties
});

export default connect(mapStateToProps, {})(SearchResultPage);