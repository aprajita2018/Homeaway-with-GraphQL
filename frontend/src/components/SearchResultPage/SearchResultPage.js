import React,{Component} from 'react';
import './SearchResultPage.css';
import SearchResult from '../SearchResult/SearchResult';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/searchBar';
import * as qs from 'query-string';

class SearchResultPage extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            ids: [],
        };
    }

    componentDidMount(){
        if(qs.parse(this.props.location.search).id !== null && qs.parse(this.props.location.search).id !== undefined && qs.parse(this.props.location.search).id !== ''){
            this.setState({
                ids: this.state.ids.concat(qs.parse(this.props.location.search).id.split(',')),
            });
        }
    }
    render(){
        let properties = this.state.ids.map(id => {
            return(
                <SearchResult propertyId = {id}/>
            )
        });
        return(
            <div>
                <NavBar location="SearchResultPage" />
                <div id="searchResultList" className="mt-5 pt-5">
                <SearchBar />
                {this.state.ids.length === 0 ? "None of the properties matched the search criteria. Please try with a different search criteria.": properties}
                </div>
            </div>
        );
    }
}

export default SearchResultPage;