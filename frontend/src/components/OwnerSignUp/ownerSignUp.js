import React,{Component} from 'react';
import NavBar from '../NavBar/NavBar';
//import { reduxForm, Field, change } from 'redux-form';
import {connect} from 'react-redux';
import {signup} from "../../actions/users_action";

class OwnerSignUp extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            fname: '',
            lname: '',
            phone: '',
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
            user_type: 'owner',
            ...this.state
        };
        this.props.signup(values, (res) => {
            if(res.status === "SUCCESS"){
                console.log("Successfully created user!");
                document.getElementById("success_text").innerHTML = "Your account is created! Redirecting you to Login ...";
                document.getElementById("success_snackbar").style.setProperty('display', 'block'); 
                setTimeout(() => {
                    this.props.history.push('/ownerLogin');              
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
        });
    }

    render(){
        return(
            <div>
                <NavBar location="ownerSignUp" />
                <div class="row text-center mt-5 pt-5">
                    <div class="container-fluid">
                    <span>
                        <legend className="text-info ">Unlock Your Earning Potential</legend><br/>
                        <h5 className = "font-weight-light text-black-50"> Already have an account? <a href="./ownerLogin"> Log in</a></h5>
                    </span>
                    </div>
                </div>
                <div className="row text-center ">
                    <div className="col-md-6 offset-md-3">
                        <div className="mt-1 pt-4  shadow p-3 mb-5 bg-white rounded">
                            <h4 className="text-secondary font-weight-light">Create an account to know more!</h4>
                            <form onSubmit={this.onSubmit}>
                                <div>
                                <div className="form-group">
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Email Address" value={this.state.email} onChange={this.onChange} required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-xs-6 col-md-6">
                                        <input type="text" className="form-control" name="fname" id="fname" placeholder="First Name" value={this.state.fname} onChange={this.onChange} required />
                                    </div>
                                    <div className="form-group col-xs-6 col-md-6">
                                        <input type="text" className="form-control" name="lname" id="lname" placeholder="Last Name" value={this.state.lname} onChange={this.onChange} required />
                                    </div>
                                </div>                           
                                <div className="form-group">
                                <input type="text" className="form-control" name="phone" id="phone" placeholder="Phone Number" value={this.state.phone} onChange={this.onChange} required />
                                </div>
                                <div className="form-group">
                                <input type="password" className="form-control" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.onChange} required />
                                </div>
                                <p className="text-muted font-weight-light"> By creating an account you are accepting our <a href="#"> Terms and Conditions</a> </p>
                                <div className="form-row">
                                    <button type='submit'  className="btn btn-primary btn-lg btn-block signup-btn" >Create account</button>
                                </div>
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
        );
    }
}



export default (connect(null, {signup})(OwnerSignUp));