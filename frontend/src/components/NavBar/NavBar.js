import React,{Component} from 'react';
import './NavBar.css';
import cookie from 'react-cookies';
import axios from 'axios';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state={
            location: this.props.location,
            theme: "lightPage",
        }
    }
    render() {
        return(
            <div>
            <nav className ={(this.props.location === "landingPage") ? "navbar navbar-expand-sm fixed-top navbar-dark": "navbar navbar-expand-sm fixed-top navbar-light"} id="mainNav" >
                <div className="container">
                    <a className="site-header-logo__link flex-item" href="/" title="HomeAway.com">
                        <img alt="HomeAway logo" className="img-responsive" role="presentation" src={this.state.theme === "darkPage" ? "//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg" : "//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader.svg"} />
                    </a>
                    <NavBarLoggedIn location={this.state.location}/>
                </div>
            </nav>
            </div>
        );
    }
}

class NavBarLoggedIn extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,
            name: "User",
            user_type: null,
        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount(){
        if(cookie.load('name')){
            this.setState({
                name: cookie.load('name'),
                isLoggedIn: true,
                user_type: cookie.load('user_type'),
            });
        }
    }

    handleLogout = () => {
        axios.post("/logout")
        .then((res) => {
            if(res.status === 200){
                cookie.remove('name');
                cookie.remove('user_type');
                this.setState({
                    isLoggedIn: false,
                });
                window.location = "/";
            }
        });
    }

    render(){
        if(this.props.location === 'travellerSignup' || this.props.location === 'travellerLogin' || this.props.location ==='ownerLogin' || this.props.location === 'ownerSignUp'){
            return null;
        }
        return(
            <div className="float-right">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        {/* <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="#about">Trip Boards</a>
                        </li> //TODO: Will implement later */} 
                        {this.state.isLoggedIn === false ?
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">Login</a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="./travellerLogin">Traveller Login</a>
                                <a className="dropdown-item" href="./ownerLogin">Owner Login</a>
                            </div>
                        </li>
                        : 
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">{this.state.name}</a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {this.state.user_type === 'owner' ?
                                <a className="dropdown-item" href="/OwnerProperties">My Properties</a>
                                :
                                <a className="dropdown-item" href="/TravelerTrips">My Trips</a>
                                }
                                <a className="dropdown-item" href="/userProfile">Profile</a>
                                <a className="dropdown-item" onClick={this.handleLogout}>Log Out</a>
                            </div>
                        </li>
                        }
                        <li className="nav-item">
                        <a className="nav-link js-scroll-trigger" href="#portfolio">Help</a>
                        </li>
                        <li className="nav-item">
                            <a className={this.props.location === "landingPage" ? "btn btn-info" : "btn btn-outline-info"} href= "./pob">List your property</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default NavBar;