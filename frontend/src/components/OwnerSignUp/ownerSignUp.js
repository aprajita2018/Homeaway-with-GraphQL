import React,{Component} from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';

class OwnerSignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            validation_error: [],
            message: '',
        }
        this.handleSignup = this.handleSignup.bind(this);
    }

    handleSignup = () => {

        if(document.getElementById('fname').value === "" || document.getElementById('lname').value === "" || document.getElementById('email').value === "" || document.getElementById('password').value === "" || document.getElementById('phone').value === "" )
        {
            alert("All the fields on the page are mandatory. Fill all to Sign up!")    
        }
        else{

            axios.post("/userSignup", {
                params: {
                    fname: document.getElementById('fname'),
                    lname: document.getElementById('lname'),
                    email: document.getElementById('email'),
                    password: document.getElementById('password'),
                    user_type: document.getElementById('user_type'),
                    phone: document.getElementById('phone'),
                }
            })
            .then((res) => {
                if(res.status === 200){
                    console.log("Account successfully created");
                    window.location = "/ownerLogin";
                }
            });
        }
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
                <div class="row text-center ">
                    <div class="col-md-6 offset-md-3">
                        <div class="mt-1 pt-4  shadow p-3 mb-5 bg-white rounded">
                            <h4 className="text-secondary font-weight-light">Create an account to know more!</h4>
                            <form method="post" action="/userSignup">
                                <div>
                                <div className="form-group">
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Email Address" required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-xs-6 col-md-6">
                                        <input type="text" className="form-control" name="fname" id="fname" placeholder="First Name" required />
                                    </div>
                                    <div className="form-group col-xs-6 col-md-6">
                                        <input type="text" className="form-control" name="lname" id="lname" placeholder="Last Name"  required />
                                    </div>
                                </div>                           
                                <div className="form-group">
                                    <input type="text" className="form-control" name="phone" id="phone" placeholder="Phone Number" required />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" name="password" id="password" placeholder="Password" required />
                                </div>
                                <input type="hidden" name="user_type" id="user_type" value="owner" />
                                <p className="text-muted font-weight-light"> By creating an account you are accepting our <a href="#"> Terms and Conditions</a> </p>
                                <div className="form-row">
                                    <button className="btn btn-primary btn-lg btn-block signup-btn" onClick={this.handleSignup}>Create account</button>
                                </div>
                                </div>
                            </form>                                
                        </div>
                    </div>
                </div>
            </div>   
        );
    }
}

export default OwnerSignUp;