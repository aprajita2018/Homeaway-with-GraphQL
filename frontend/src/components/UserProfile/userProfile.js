import React, {Component} from 'react';
import './userProfile.css';
import NavBar from '../NavBar/NavBar';
import UserToolbar from '../UserToolbar/UserToolbar';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { graphql, compose } from 'react-apollo';
import { updateUserMutation } from '../../mutation/mutation';
import { getUserDetails} from '../../queries/queries';

class TravellerProfile extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: cookie.load('name'),
            user_type: cookie.load('user_type'),
            photoURL: null,
            f_name: '',
            l_name: '',
            gender: '',
            phone_num: '',
            aboutMe: '',
            city: '',
            state: '',
            hometown: '',
            language: '',
        };
        this.handleSave = this.handleSave.bind(this);
        // this.fileUploadHandler = this.fileUploadHandler.bind(this);
    }


    handleSave = (e) =>{
        e.preventDefault();
        this.props.updateUserMutation({
            variables: {
                user_id     : cookie.load('user_id'),
                f_name      : this.state.f_name,
                l_name      : this.state.l_name,
                gender      : this.state.gender,
                phone_num   : this.state.phone_num,
                aboutMe     : this.state.aboutMe,
                city        : this.state.city,
                state       : this.state.state,
                hometown    : this.state.hometown,
                language    : this.state.language,

            }
        });
    }

    fetchDetails(){
        var data = this.props.data;
        if(data.loading){
            return(<div>Loading your details...</div>);
        }
        else{
            // this.setState({
            //     fname: data.userDetails.f_name,
            //     lname: data.userDetails.l_name,
            //     email: data.userDetails.email,
            //     phone: data.userDetails.phone_num,
            //     city: data.userDetails.city,
            //     state: data.userDetails.state,
            //     aboutMe: data.userDetails.aboutMe,
            //     hometown: data.userDetails.hometown,
            //     languages: data.userDetails.languages,
            //     gender: data.userDetails.gender,
            // });
            return "Your details...";
        }
    }
    componentDidMount () {
        this.fetchDetails();
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
                                    <img className="rounded-circle" src={this.state.photoURL === null? "img/profile-clipart.jpg" : this.state.photoURL} height="80px" width="80px" alt="profile"/>
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
                                    {this.fetchDetails()}
                                    {/* <form class="profiledetails" id="input_updateForm" method="post" action="/updateProfile"> */}
                                        <div class="form-group col-md-10">
                                            <input id="input_fname" name="fname" class="form-control" defaultValue={this.props} type="text" placeholder="First Name"/>
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

// export default compose(
//     // graphql(updateUserMutation, 
//     //     { name: "updateUserMutation" }
//     // ),
//     graphql(getUserDetails, {
//     options: () => ({ variables: { id: cookie.load('user_id') }}),
//     }, {name: "getUserDetails"}
//     )
// )(TravellerProfile);

export default graphql(
    getUserDetails, {
        options: () => ({ variables: { id: cookie.load('user_id') }}),
        }, {name: "getUserDetails"}
)(TravellerProfile)
