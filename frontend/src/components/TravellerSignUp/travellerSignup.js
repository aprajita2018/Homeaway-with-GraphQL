import React, {Component} from 'react';
import './travellerSignup.css';
import NavBar from '../NavBar/NavBar';
//import { reduxForm, Field, change } from 'redux-form';
import {connect} from 'react-redux';
import {signup} from "../../actions/users_action";


class TravellerSignup extends Component{
    constructor(props){
        super(props);

        this.state = {
            fname: "",
            lname: "",
            email: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

    onSubmit(e){
        e.preventDefault();
        const values = {
            user_type: 'traveler',
            ...this.state
        };
        console.log(values);
        this.props.signup(values, (res) => {
            if(res.status === "SUCCESS"){
                console.log("Successfully created user!");
                document.getElementById("success_text").innerHTML = "Your account is created! Redirecting you to Login ...";
                document.getElementById("success_snackbar").style.setProperty('display', 'block'); 
                setTimeout(() => {
                    this.props.history.push('/travellerLogin');              
                }, 3000);
            }
            else{
                console.log("Err in updating the user profile.");
                document.getElementById("alert_text").innerHTML = "ERROR: Could not create your account.";
                document.getElementById("alert_snackbar").style.setProperty('display', 'block');
                setTimeout(() => {
                    document.getElementById("alert_snackbar").style.setProperty('display', 'none');
                }, 2000);
            }
        })
    }


    render(){
        return(
            <div>
              <NavBar location={"travellerSignup"}/>
            
            {/* Signup body area */}
            <div className="row text-center mt-5 pt-5">
                        <div className="container-fluid">
                        <span>
                            <legend>Sign up for HomeAway</legend><br/>
                            <h4> Already have an account? <a href="./travellerLogin"> Log in</a></h4>
                        </span>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-6 offset-md-3 card card-body">
                            <div className="login-form mt-4">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-row">
                                        <div className="form-group col-xs-6 col-md-6">
                                            <input className="form-control" type='text' placeholder='First Name' id='fname' name='fname' value={this.state.fname} onChange={this.onChange}/>
                                        </div>
                                        <div className="form-group col-xs-6 col-md-6">
                                            <input className="form-control" type='text' placeholder='Last Name' id='lname' name='lname' value={this.state.lname} onChange={this.onChange}/>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input className="form-control" type='text' placeholder='Email address' id='email' name='email' value={this.state.email} onChange={this.onChange}/>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input className="form-control" type='password' placeholder='Password' id='password' name='password' value={this.state.password} onChange={this.onChange}/>
                                        </div>
                                    </div>                           
                                    <div className="form-row">
                                        <button className="btn btn-primary btn-lg btn-block" type='submit'>Sign Me Up</button>
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
            )
    }
}

export default (connect(null, {signup})(TravellerSignup));