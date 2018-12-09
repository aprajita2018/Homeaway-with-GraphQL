import React,{Component} from 'react';
import NavBar from '../NavBar/NavBar';
import { graphql, compose } from 'react-apollo';
import { addUserMutation} from '../../mutation/mutation';


class OwnerSignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            f_name: '',
            l_name: '',
            email: '',
            password: '',
            user_type: 'owner'
        }
    }

    submitForm(e){
        e.preventDefault();
        if(document.getElementById('fname').value === "" || document.getElementById('lname').value === "" || document.getElementById('email').value === "" || document.getElementById('password').value === "" || document.getElementById('phone').value === "" )
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
                <div className="row text-center mt-5 pt-5">
                    <div className="container-fluid">
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
                            <form id= 'add-user' onSubmit={this.submitForm.bind(this)}>
                                <div>
                                <div className="form-group">
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Email Address" onChange={ (e) => this.setState({ email: e.target.value })} required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-xs-6 col-md-6">
                                        <input type="text" className="form-control" name="fname" id="fname" placeholder="First Name" onChange={ (e) => this.setState({ f_name: e.target.value })} required />
                                    </div>
                                    <div className="form-group col-xs-6 col-md-6">
                                        <input type="text" className="form-control" name="lname" id="lname" placeholder="Last Name" onChange={ (e) => this.setState({ l_name: e.target.value })}  required />
                                    </div>
                                </div>                           
                                <div className="form-group">
                                    <input type="text" className="form-control" name="phone" id="phone" placeholder="Phone Number" required />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" name="password" id="password" placeholder="Password" onChange={ (e) => this.setState({ password: e.target.value })} required />
                                </div>
                                <input type="hidden" name="user_type" id="user_type" value="owner" />
                                <p className="text-muted font-weight-light"> By creating an account you are accepting our <a href="#"> Terms and Conditions</a> </p>
                                <div className="form-row">
                                    <button className="btn btn-primary btn-lg btn-block signup-btn">Create account</button>
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

export default compose(
    graphql(addUserMutation, { name: "addUserMutation" })
) (OwnerSignUp);