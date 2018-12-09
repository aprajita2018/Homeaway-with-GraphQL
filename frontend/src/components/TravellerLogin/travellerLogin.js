import React, {Component} from 'react';
import NavBar from '../NavBar/NavBar';
import {Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import { login } from "../../actions/users_action";

class TravellerLogin extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
    onSubmit(e) {
        e.preventDefault();
        const values = {
            user_type: 'traveler',
            email: this.state.email,
            password: this.state.password
        };
        this.props.login(values, (res) => {
            console.log(res);
            if(res.status === "SUCCESS"){
                this.props.history.push("/");            
            }
            else{
                console.log("Err in login.");
                document.getElementById("alert_text").innerHTML = "ERROR: " + res.message;
                document.getElementById("alert_snackbar").style.setProperty('display', 'block');
                setTimeout(() => {
                    document.getElementById("alert_snackbar").style.setProperty('display', 'none');
                }, 2000);
            }
        });
    }

    render() {
        return(
            <div>
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
                                <form onSubmit={this.onSubmit}>
                                    <div className='form-group'>
                                        <label>Email</label>
                                        <input className="form-control" type='email' placeholder='Email Address' id='inputEmail' value={this.state.email} name='email' onChange={this.onChange}/>
                                    </div>

                                    <div className='form-group'>
                                        <label>Password</label>
                                        <input className="form-control" type='password' placeholder='Password' id='inputPassword' value={this.state.password} name='password' onChange={this.onChange}/>
                                    </div>

                                    <div className="login-forgot text-left mt-2">
                                        <a href="#">Forgot Password? </a><br/><br/>
                                    </div>                                
                                    <div className="form-row">
                                        <button className="btn btn-primary btn-lg btn-block" type="submit">Log In</button>
                                    </div>
                                    <div className="form-row form-check float-left mt-2">
                                            <input className="form-check-input" type="checkbox" id="updatecheck1"/>
                                            <label className="form-check-label" htmlFor="updatecheck1">
                                                Keep me signed in
                                            </label>
                                    </div>
                                </form>
                                <div id="alert_snackbar" className="alert alert-danger snackbar" role="alert" style={{display: 'none'}}>
                                    <p id="alert_text"></p>
                                </div>
                                <div id="success_snackbar" className="alert alert-success snackbar" role="alert" style={{display: 'none'}}>
                                    <p id="success_text"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {login})(TravellerLogin);