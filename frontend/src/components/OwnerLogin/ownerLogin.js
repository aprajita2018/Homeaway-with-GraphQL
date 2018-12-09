import React,{Component} from 'react';
import NavBar from '../NavBar/NavBar';
import {connect} from "react-redux";
import {login} from "../../actions/users_action";

class OwnerLogin extends Component{

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
            user_type: 'owner',
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

    render(){
        return(
            <div>
                <NavBar location="ownerLogin" />
                <div class="container mt-5 pt-5"> 
                    <div class="row col-md-6 float-right">
                        <div class="border py-4 px-5">
                            <div class="login-title">
                                <h4 className="text-dark font-weight-light">Owner Login</h4>
                                <h5 className="text-info font-weight-light border-bottom">Need an account? <a href="./ownerSignup">Sign Up</a></h5>
                            </div>
                            <div class="login-form mt-4">
                                <form onSubmit={this.onSubmit}>
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <input id="inputEmail" name="email" placeholder="Email Address" class="form-control" type="email" value={this.state.email} onChange={this.onChange} required/>
                                        </div>
                                        <div class="form-group col-md-12">
                                            <input type="password" class="form-control" id="inputPassword" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange} required/>
                                        </div>
                                    </div>
                                    <div class="text-left mt-2">
                                        <a href="#">Forgot Password? </a><br/><br/>
                                    </div>                                
                                    <div class="form-row">
                                        <button class="btn btn-primary btn-lg btn-block" type="submit">Log In</button>
                                    </div>
                                    <div class="form-row form-group form-check float-left mt-2">
                                        <input class="form-check-input" type="checkbox" id="updatecheck1"/>
                                        <label class="form-check-label" for="updatecheck1">
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
                    <div className="row col-md-6 float-left">
                        <img className="d-block w-100" src="/img/welcomeBackOwner.png" alt="Welcome Back!"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {login})(OwnerLogin);