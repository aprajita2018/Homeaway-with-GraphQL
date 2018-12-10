import React, {Component} from 'react';
import './travellerLogin.css';
import NavBar from '../NavBar/NavBar';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import { BACKEND_HOST } from '../../actions/host_config';

class TravellerLogin extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: null,
            type: 'traveler',
            email: null,
            redirectToHome: false
        };
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin = (e) => {
        e.preventDefault();
        this.setState({
            email:  document.getElementById('inputEmail'),
        });
        axios.post(BACKEND_HOST + '/login', {
            params: {
                email: this.state.email,
                password: this.state.password,
                user_type: this.state.type,
            }
        })
        .then((res) => {
            if(res.status === 200){
                console.log("Successful login for " + this.state.email);
                cookie.save('name', res.data.user.name);
                cookie.save('user_type', res.data.user.user_type);
                localStorage.setItem('jwt_token', res.data.token);
                this.setState({
                    redirectToHome: true
                });
            }
        });
    }

    render(){
        let redirectVar = null;
        if(this.state.redirectToHome){
            redirectVar = <Redirect to="/" />;
        }
        return(
            <div>
                {redirectVar}
                <NavBar location={"travellerLogin"} />
                <div className="container mt-5 pt-5 col-md-6"> 
                    <div className="row text-center mb-4">
                        <div className="col-md-12">
                            <span>
                                <legend>Log in to HomeAway</legend>
                                <h4>Need an account? <a href="./travellerSignup">Sign Up</a></h4>
                            </span>
                        </div>
                    </div>
                    <div className="row col-md-8 offset-md-2">
                        <div className="border py-4 px-5">
                            <div className="login-title">
                                <h4>Account Login</h4>
                            </div>
                            <div className="login-form mt-4">
                                <form>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <input id="inputEmail" name="email" placeholder="Email Address" className="form-control" type="text" onChange={ (e) => this.setState({ email: e.target.value })} required/>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input id="inputPassword" type="password" className="form-control" name="password" placeholder="Password" onChange={ (e) => this.setState({ password: e.target.value })} required/>
                                        </div>
                                    </div>
                                    <div className="login-forgot text-left mt-2">
                                        <a href="#">Forgot Password? </a><br/><br/>
                                    </div>                                
                                    <div className="form-row">
                                        <button className="btn btn-primary btn-lg btn-block" onClick={this.handleLogin}>Log In</button>
                                    </div>
                                    <div className="form-row form-check float-left mt-2">
                                            <input className="form-check-input" type="checkbox" id="updatecheck1"/>
                                            <label className="form-check-label" htmlFor="updatecheck1">
                                                Keep me signed in
                                            </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TravellerLogin;