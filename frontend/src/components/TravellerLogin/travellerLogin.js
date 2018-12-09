import React, {Component} from 'react';
import './travellerLogin.css';
import NavBar from '../NavBar/NavBar';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';

class TravellerLogin extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: null,
            type: null,
            email: null,
        };
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin = () => {
        this.setState({
            email:  document.getElementById('inputEmail'),
        });
        axios.post('/login', {
            params: {
                email: document.getElementById('inputEmail'),
                password: document.getElementById('inputPassword'),
                user_type: document.getElementById('user_type'),
            }
        })
        .then((res) => {
            if(res.status === 200){
                console.log("Successful login for " + this.state.email);
                this.setState({
                    name: cookie.load('name'),
                    type: cookie.load('user_type'),
                });
                window.location = "/";
            }
        });
    }

    render(){
        let redirectVar = null;
        if(cookie.load('user_type') === 'traveler'){
            redirectVar = <Redirect to="/" />;
        }
        return(
            <div>
                {redirectVar}
                <NavBar location={"travellerLogin"} />
                <div class="container mt-5 pt-5 col-md-6"> 
                    <div class="row text-center mb-4">
                        <div class="col-md-12">
                            <span>
                                <legend>Log in to HomeAway</legend>
                                <h4>Need an account? <a href="./travellerSignup">Sign Up</a></h4>
                            </span>
                        </div>
                    </div>
                    <div class="row col-md-8 offset-md-2">
                        <div class="border py-4 px-5">
                            <div class="login-title">
                                <h4>Account Login</h4>
                            </div>
                            <div class="login-form mt-4">
                                <form method="POST" action="/login">
                                    <div class="form-row">
                                    <div class="form-group col-md-12">
                                        <input id="inputEmail" name="email" placeholder="Email Address" class="form-control" type="text" required/>
                                    </div>
                                    <div class="form-group col-md-12">
                                        <input id="inputPassword" type="password" class="form-control" name="password" placeholder="Password" required/>
                                    </div>
                                    <input type="hidden" name="user_type" id="user_type" value="traveler" />
                                    </div>
                                    <div class="login-forgot text-left mt-2">
                                        <a href="#">Forgot Password? </a><br/><br/>
                                    </div>                                
                                    <div class="form-row">
                                        <button class="btn btn-primary btn-lg btn-block" onCLick={this.handleLogin}>Log In</button>
                                    </div>
                                    <div class="form-row form-check float-left mt-2">
                                            <input class="form-check-input" type="checkbox" id="updatecheck1"/>
                                            <label class="form-check-label" for="updatecheck1">
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