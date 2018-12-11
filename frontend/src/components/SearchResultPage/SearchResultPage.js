import React,{Component} from 'react';
import './SearchResultPage.css';
import SearchResult from '../SearchResult/SearchResult';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/searchBar';
import * as qs from 'query-string';

import {fetchPropertyDetailsByIDs} from '../../queries/queries';
import { compose, graphql } from 'react-apollo';

class SearchResultPage extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            ids: [],
        };
    }

    displayProperties(){
        var data = this.props.data;
        if(data.loading){
            return (<div>Loading properties...</div>);
        }
        else{
            return data.fetchPropertyDetailsByIDs.map(property =>{
                return(
                <SearchResult key={property.id} property={property} />
                );
            });
            //return (<div>{JSON.stringify(data)}</div>)
        }
    }

    // componentDidMount(){
    //     if(qs.parse(this.props.location.search).id !== null && qs.parse(this.props.location.search).id !== undefined && qs.parse(this.props.location.search).id !== ''){
    //         this.setState({
    //             ids: this.state.ids.concat(qs.parse(this.props.location.search).id.split(',')),
    //         });
    //     }
    // }
    render(){
        return(
            <div>
                <NavBar location="SearchResultPage" />
                <div id="searchResultList" className="mt-5 pt-5">
                    <SearchBar />
                    {this.displayProperties()}
                {/* {this.state.ids.length === 0 ? "None of the properties matched the search criteria. Please try with a different search criteria.": properties} */}
                </div>
            </div>
        );
    }
}

export default graphql(fetchPropertyDetailsByIDs, {
    options: () => ({variables: {ids: ["5bdd6466f62063045052fab7", "5bde705ae8d67f2225f456b2"]}})
    },{name: "fetchPropertyDetailsByIDs"}
)(SearchResultPage);