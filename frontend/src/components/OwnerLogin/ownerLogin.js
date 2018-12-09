import React,{Component} from 'react';
import NavBar from '../NavBar/NavBar';
import cookie from 'react-cookies';
import axios from 'axios';
import {Redirect} from 'react-router';

class OwnerLogin extends Component{
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
        if(cookie.load('user_type') === 'owner'){
            redirectVar = <Redirect to="/" />;
        }
        return(
            <div>
                {redirectVar}
                <NavBar location="ownerLogin" />
                <div class="container mt-5 pt-5"> 
                    <div class="row col-md-6 float-right">
                        <div class="border py-4 px-5">
                            <div class="login-title">
                                <h4 className="text-dark font-weight-light">Owner Login</h4>
                                <h5 className="text-info font-weight-light border-bottom">Need an account? <a href="./ownerSignup">Sign Up</a></h5>
                            </div>
                            <div class="login-form mt-4">
                                <form method="POST" action="/login">
                                    <div class="form-row">
                                    <div class="form-group col-md-12">
                                        <input id="inputEmail" name="email" placeholder="Email Address" class="form-control" type="email" required/>
                                    </div>
                                    <div class="form-group col-md-12">
                                        <input type="password" class="form-control" id="inputPassword" name="password" placeholder="Password" required/>
                                    </div>
                                    <input type="hidden" name="user_type" id="user_type" value="owner" />
                                    </div>
                                    <div class="text-left mt-2">
                                        <a href="#">Forgot Password? </a><br/><br/>
                                    </div>                                
                                    <div class="form-row">
                                        <button class="btn btn-primary btn-lg btn-block" onClick={this.handleLogin}>Log In</button>
                                    </div>
                                    <div class="form-row form-group form-check float-left mt-2">
                                        <input class="form-check-input" type="checkbox" id="updatecheck1"/>
                                        <label class="form-check-label" for="updatecheck1">
                                            Keep me signed in
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row col-md-6 float-left">
                        <img className="d-block w-100" src="/img/welcomeBackOwner.png" alt="Welcome Back!"/>
                    </div>
                </div>
            </div>
        )
    }
}

    export default OwnerLogin;