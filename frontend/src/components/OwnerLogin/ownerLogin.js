import React,{Component} from 'react';
import NavBar from '../NavBar/NavBar';
import cookie from 'react-cookies';
import axios from 'axios';
import {Redirect} from 'react-router';
import { BACKEND_HOST } from '../../actions/host_config';

class OwnerLogin extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: null,
            type: null,
            email: '',
            password:'',
            user_type:'owner',
            redirectToHome: false
        };
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin = (e) => {

        e.preventDefault();
        console.log('Inside handleLogin function');
        axios.post(BACKEND_HOST + '/login', {
            params: {
                email: this.state.email,
                password: this.state.password,
                user_type: this.state.user_type,
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
                <NavBar location="ownerLogin" />
                <div className="container mt-5 pt-5"> 
                    <div className="row col-md-6 float-right">
                        <div className="border py-4 px-5">
                            <div className="login-title">
                                <h4 className="text-dark font-weight-light">Owner Login</h4>
                                <h5 className="text-info font-weight-light border-bottom">Need an account? <a href="./ownerSignup">Sign Up</a></h5>
                            </div>
                            <div className="login-form mt-4">
                                <form>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <input id="inputEmail" name="email" placeholder="Email Address" className="form-control" type="email" onChange={ (e) => this.setState({ email: e.target.value })} required/>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="password" className="form-control" id="inputPassword" name="password" placeholder="Password" onChange={ (e) => this.setState({ password: e.target.value })} required/>
                                        </div>
                                    </div>
                                    <div className="text-left mt-2">
                                        <a href="#">Forgot Password? </a><br/><br/>
                                    </div>                                
                                    <div className="form-row">
                                        <button className="btn btn-primary btn-lg btn-block" onClick={this.handleLogin}>Log In</button>
                                    </div>
                                    <div className="form-row form-group form-check float-left mt-2">
                                        <input className="form-check-input" type="checkbox" id="updatecheck1"/>
                                        <label className="form-check-label" htmlFor="updatecheck1">
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