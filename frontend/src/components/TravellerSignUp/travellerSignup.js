import React, {Component} from 'react';
import './travellerSignup.css';
import NavBar from '../NavBar/NavBar';
import { graphql, compose } from 'react-apollo';
import { addUserMutation} from '../../mutation/mutation';


class TravellerSignup extends Component{
    constructor(props){
        super(props);
        this.state = {
            f_name: '',
            l_name: '',
            email: '',
            password: '',
            user_type: 'traveler'
        }
    }

    submitForm(e){
        e.preventDefault();
        if(document.getElementById('fname').value === "" || document.getElementById('lname').value === "" || document.getElementById('email').value === "" || document.getElementById('password').value === "")
        {
            alert("All the fields on the page are mandatory. Fill all to Sign up!")    
        }
        else{
            this.props.addUserMutation({
                variables: {
                    f_name      : this.state.f_name,
                    l_name      : this.state.l_name,
                    email       : this.state.email,
                    password    : this.state.password,
                    user_type   : this.state.user_type,
                }
            })
        }
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
                                <form id= 'add-user' onSubmit={this.submitForm.bind(this)}>
                                    <div className="form-row">
                                        <div className="form-group col-xs-6 col-md-6">
                                            <input type="text" className="form-control" id='fname' name="fname" placeholder="First Name" onChange={ (e) => this.setState({ f_name: e.target.value })} required />
                                        </div>
                                    <div className="form-group col-xs-6 col-md-6">
                                        <input type="text" className="form-control" id='lname' name="lname" placeholder="Last Name" onChange={ (e) => this.setState({ l_name: e.target.value })} required />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <input type="text" className="form-control" id='email' name="email" placeholder="Email Address" onChange={ (e) => this.setState({ email: e.target.value })} required />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <input type="password" className="form-control" id='password' name="password" placeholder="Password" onChange={ (e) => this.setState({ password: e.target.value })} required />
                                    </div>
                                        <input type="hidden" id="user_type" name="user_type" value="traveler" />
                                    </div>                           
                                    <div className="form-row">
                                        <button className="btn btn-primary btn-lg btn-block">Sign Me Up</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}

export default compose(
    graphql(addUserMutation, { name: "addUserMutation" })
)(TravellerSignup);