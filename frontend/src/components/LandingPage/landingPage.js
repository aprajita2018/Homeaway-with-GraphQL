import React,{Component} from 'react';
import './LandingPage.css';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/searchBar';

class LandingPage extends Component{
    render(){
        return(
            <div>
                <NavBar location="landingPage"/>

                <header className="masthead text-center text-white d-flex">
                    <div className="container my-auto bg-transparent text-white">
                        <div className="row">
                            <div className="col-lg-10 mx-auto">
                                <h1>
                                Book beach houses, cabins, <br/> condos, and more, worldwide!
                                </h1>
                            </div>
                            <div className="col-lg-10 mx-auto">
                                <SearchBar />
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}
export default LandingPage;