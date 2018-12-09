import React, {Component} from 'react';
import './userProfile.css';
import NavBar from '../NavBar/NavBar';
import UserToolbar from '../UserToolbar/UserToolbar';
import cookie from 'react-cookies';
import axios from 'axios';
import {Redirect} from 'react-router';

class TravellerProfile extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: cookie.load('name'),
            user_type: cookie.load('user_type'),
            photoURL: null,
        };
        this.handleSave = this.handleSave.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
    }

    fileUploadHandler(e){
        const data = new FormData();

        data.append('images', e.target.files[0]);
        axios.post('/uploadFiles',data)
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
        axios.post('/updateProfile', {
            params: {
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
            }            
        })
        .then((res) =>{
            if(res.status === 200){
                console.log("Successful update!");
                document.getElementById("success_text").innerHTML = "Successfully updated your profile!";
                document.getElementById("success_snackbar").style.setProperty('display', 'block'); 
                setTimeout(() => {
                    document.getElementById("success_snackbar").style.setProperty('display', 'none');
                }, 10000);              
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

    componentDidMount () {
        axios.get('/userDetails')
        .then((res) => {
            console.log(res.data);
            this.setState({
                fname: res.data.f_name,
                lname: res.data.l_name,
                email: res.data.email,
                phone: res.data.phone_num,
                city: res.data.city,
                state: res.data.state,
                aboutMe: res.data.aboutMe,
                hometown: res.data.hometown,
                languages: res.data.languages,
                gender: res.data.gender,
                photoURL: res.data.photoURL,
            });
        });
    }

    render(){
        let redirectVar = null;
        if(!cookie.load('name')){
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
                                    <img className="rounded-circle" src={this.state.photoURL === null? "img/profile-clipart.jpg" : this.state.photoURL} height="80px" width="80px" alt="profile photo"/>
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
                            <h3 className = "userName text-center">{this.state.name}</h3>
                        </div>
                        <div>
                            <div className="container col-md-5  mt-3 pt-3 border rounded">
                                <div className= "profile-details ">
                                    <h3>Profile Information</h3><br/>
                                    {/* <form class="profiledetails" id="input_updateForm" method="post" action="/updateProfile"> */}
                                        <div class="form-group col-md-10">
                                            <input id="input_fname" name="fname" class="form-control" defaultValue={this.state.fname} type="text" placeholder="First Name"/>
                                        </div>
                                        <div class="form-group col-md-10">
                                            <input id="input_lname" name="lname" class="form-control" defaultValue={this.state.lname} type="text" placeholder="Last Name"/>
                                        </div>
                                        <div class="form-group col-md-10">
                                            <input id="input_email" name="email" class="form-control" defaultValue={this.state.email} type="text" placeholder="Email"/>
                                        </div>
                                        <div class="form-group col-md-10">
                                            <input id="input_phone" name="phone" class="form-control" defaultValue={this.state.phone} type="text" placeholder="Phone"/>
                                        </div>
                                        <div class="form-group col-md-10">
                                            <input id="input_aboutMe" name="aboutMe" class="form-control" defaultValue={this.state.aboutMe} type="text" placeholder = "About me"/>                                     
                                        </div>
                                        <div class="form-group col-md-10">
                                            <input id="input_city" name="city" class="form-control" defaultValue={this.state.city} type="text" placeholder = "City"/>
                                        </div>
                                        <div class="form-group col-md-10">
                                            <input id="input_state" name="state" class="form-control" defaultValue={this.state.state} type="text" placeholder = "State"/>
                                        </div>                                            
                                        <div class="form-group col-md-10">
                                            <input id="input_hometown" name="hometown" class="form-control" defaultValue={this.state.hometown} type="text" placeholder = "Hometown"/>
                                        </div>
                                        <div class="form-group col-md-10">
                                            <input id="input_languages" name="languages" class="form-control" defaultValue={this.state.languages} type="text" placeholder = "Languages"/>
                                        </div>                                   
                                        <div className="col-md-10">
                                        <select id="profileGender" name="gender" form="input_updateForm" class="form-control">
                                            <option value="female" selected={this.state.gender === 'female' ? 'selected' : ''}>Female</option>
                                            <option value="male" selected={this.state.gender === 'male' ? 'selected' : ''}>Male</option>
                                            <option value="other" selected={this.state.gender === 'other' ? 'selected' : ''}>Other</option>
                                        </select>
                                        </div>
                                        <input type = "hidden" name = "photoURL" value = {this.state.photoURL}/>
                                        <div className=" row col-md-8 mt-2 pt-2">
                                            <button class="btn btn-info mx-2"  type="reset" >Reset</button>
                                            <button class="btn btn-primary mx-2" onClick={this.handleSave}>Save</button>
                                        </div>
                                    {/* </form> */}
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

export default TravellerProfile;
