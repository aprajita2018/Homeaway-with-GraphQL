import React, {Component} from 'react';
import './userProfile.css';
import NavBar from '../NavBar/NavBar';
import UserToolbar from '../UserToolbar/UserToolbar';
import axios from 'axios';
import {Redirect} from 'react-router';
import { connect } from "react-redux";
import { update, getUserDetails } from "../../actions/users_action";
import {BACKEND_HOST} from '../../actions/host_config';

class TravellerProfile extends Component{
    constructor(props){
        super(props);

        this.handleSave = this.handleSave.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);

        this.props.getUserDetails(() => {
            console.log("All details fetched");
        });

        this.state = {
            photoURL: this.props.user.photoURL
        }
    }

    fileUploadHandler(e){
        const data = new FormData();

        data.append('images', e.target.files[0]);
        axios.post(BACKEND_HOST + '/uploadFiles',data)
        .then((res) => {
            if(res.status === 200){
                console.log("File successfully uploaded : " + res.data);
                this.setState({
                    photoURL: res.data.fileUrl,
                })
            }
            else{
                console.log("Something went wrong: " + res.data);
            }
        })
    }
    
    handleSave = (e) =>{
        var params= {
                fname: document.getElementById('input_fname').value,
                lname: document.getElementById('input_lname').value,
                email: document.getElementById('input_email').value,
                phone: document.getElementById('input_phone').value,
                aboutMe: document.getElementById('input_aboutMe').value,
                city: document.getElementById('input_city').value,
                state: document.getElementById('input_state').value,
                hometown: document.getElementById('input_hometown').value,
                languages: document.getElementById('input_languages').value,
                gender: document.getElementById('profileGender').value,
                photoURL: this.state.photoURL,
            }; 

        this.props.update(params, (res) => {
            if(res.status === "SUCCESS"){
                console.log("Successful update!");
                document.getElementById("success_text").innerHTML = "Successfully updated your profile!";
                document.getElementById("success_snackbar").style.setProperty('display', 'block'); 
                setTimeout(() => {
                    document.getElementById("success_snackbar").style.setProperty('display', 'none');
                }, 2000);              
            }
            else{
                console.log("Err in updating the user profile.");
                document.getElementById("alert_text").innerHTML = "ERROR: Could not update your profile.";
                document.getElementById("alert_snackbar").style.setProperty('display', 'block');
                setTimeout(() => {
                    document.getElementById("alert_snackbar").style.setProperty('display', 'none');
                }, 2000);
            }
        })  
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.user){
            this.setState({
                user: nextProps.user
            })
        }
    }

    render(){
        let redirectVar = null;
        if(this.props.user.name === ""){
            redirectVar = <Redirect to="/travellerLogin" />;
        }
        return(
            <div className="container">
                {redirectVar}
                <NavBar location="travellerProfile"/>
                <UserToolbar tab="profile"/>
                <div className = "d-block w-100">
                    <div className = "container-fluid travellerProfile mt-2 pt-2">
                        <div className= "container col-md-5  mt-4 pt-4">
                            <div className="profile-photo text-center" >
                                <div className="align-center">
                                    <img className="rounded-circle" src={this.props.user.photoURL === null? "img/profile-clipart.jpg" : this.state.photoURL} height="80px" width="80px" alt="profile"/>
                                </div>
                                <input 
                                    type = "file"
                                    name = "images"
                                    onChange = {this.fileUploadHandler}
                                    style = {{display: 'none'}}
                                    ref = {fileInput => this.fileInput = fileInput} />
                                <button className="btn btn-default edit-btn" title="Add photo" type="button" onClick={() => this.fileInput.click()} >
                                        <i className="icon-edit fas fa-pen"></i>
                                </button>
                            </div>
                            <h3 className = "userName text-center">{this.props.name}</h3>
                        </div>
                        <div>
                            <div className="container col-md-5  mt-3 pt-3 border rounded">
                                <div className= "profile-details ">
                                    <h3>Profile Information</h3><br/>
                                        <div className="form-group col-md-10">
                                            <input id="input_fname" name="fname" className="form-control" defaultValue={this.props.user.f_name} type="text" placeholder="First Name"/>
                                        </div>
                                        <div className="form-group col-md-10">
                                            <input id="input_lname" name="lname" className="form-control" defaultValue={this.props.user.l_name} type="text" placeholder="Last Name"/>
                                        </div>
                                        <div className="form-group col-md-10">
                                            <input id="input_email" name="email" className="form-control" defaultValue={this.props.user.email} type="text" placeholder="Email"/>
                                        </div>
                                        <div className="form-group col-md-10">
                                            <input id="input_phone" name="phone" className="form-control" defaultValue={this.props.user.phone_num} type="text" placeholder="Phone"/>
                                        </div>
                                        <div className="form-group col-md-10">
                                            <input id="input_aboutMe" name="aboutMe" className="form-control" defaultValue={this.props.user.aboutMe} type="text" placeholder = "About me"/>                                     
                                        </div>
                                        <div className="form-group col-md-10">
                                            <input id="input_city" name="city" className="form-control" defaultValue={this.props.user.city} type="text" placeholder = "City"/>
                                        </div>
                                        <div className="form-group col-md-10">
                                            <input id="input_state" name="state" className="form-control" defaultValue={this.props.user.state} type="text" placeholder = "State"/>
                                        </div>                                            
                                        <div className="form-group col-md-10">
                                            <input id="input_hometown" name="hometown" className="form-control" defaultValue={this.props.user.hometown} type="text" placeholder = "Hometown"/>
                                        </div>
                                        <div className="form-group col-md-10">
                                            <input id="input_languages" name="languages" className="form-control" defaultValue={this.props.user.languages} type="text" placeholder = "Languages"/>
                                        </div>                                   
                                        <div className="col-md-10">
                                        <select id="profileGender" name="gender" form="input_updateForm" className="form-control">
                                            <option value="female" selected={this.props.user.gender === 'female' ? 'selected' : ''}>Female</option>
                                            <option value="male" selected={this.props.user.gender === 'male' ? 'selected' : ''}>Male</option>
                                            <option value="other" selected={this.props.user.gender === 'other' ? 'selected' : ''}>Other</option>
                                        </select>
                                        </div>
                                        <input type = "hidden" name = "photoURL" value = {this.props.user.photoURL}/>
                                        <div className=" row col-md-8 mt-2 pt-2">
                                            <button className="btn btn-info mx-2"  type="reset" >Reset</button>
                                            <button className="btn btn-primary mx-2" onClick={this.handleSave}>Save</button>
                                        </div>
                                </div>
                            </div>
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

const mapStateToProps = state => ({
    token: state.users.token,
    user: state.users.user,
    name: state.users.name,
    user_type: state.users.user_type
});

export default connect(mapStateToProps, {update, getUserDetails})(TravellerProfile);
