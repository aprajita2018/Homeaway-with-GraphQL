import React,{Component} from 'react';
import NavBar from '../NavBar/NavBar';
import './pob.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';
import {connect} from "react-redux";
import {listProperty} from '../../actions/property_action';
import {BACKEND_HOST} from '../../actions/host_config';

class POB extends Component{

    constructor(props){
        super(props);
        this.state = {
            progress_value: "0",
            isLoading: false,
            photoURL: [],
            photoUploadProgress: [],
        }

        this.onChange = this.onChange.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
        this.handleListYourProperty = this.handleListYourProperty.bind(this);
        this.selectFileHandler = this.selectFileHandler.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.remove_preview = this.remove_preview.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateProgress(e){
        console.log("Will set progress to " + e.target.getAttribute('progress_value'));
        this.setState({
            progress_value: e.target.getAttribute('progress_value'),
        });
    }

    remove_preview(e){
        console.log("Will remove: " + e.target.getAttribute('targetURL'));
        this.state.photoURL.splice(this.state.photoURL.indexOf(e.target.getAttribute('targetURL')), 1);
        e.target.parentNode.style = "display:none";
    }

    selectFileHandler = e => {
        console.log(e.target.files[0]);
    }

    fileUploadHandler(e){
        //console.log(e.target.files);
        for(var i=0; i<e.target.files.length; i++){
            const data = new FormData();
            
            data.append('images', e.target.files[i]);
            axios.post(BACKEND_HOST + '/uploadFiles', data, {
                onUploadProgress: progressEvent => {
                    this.setState({
                        photoUploadProgress: Math.round(progressEvent.loaded / progressEvent.total * 100) + '%',
                    });
                }
            })
            .then((res) => {
                if(res.status === 200){
                    console.log("File successfully uploaded: " + res.data);
                    this.setState({
                        photoURL: this.state.photoURL.concat(res.data.fileUrl),
                    })
                }
                else
                    console.log("Something went wrong: " + res.data);
            })
        }
    }

    handleListYourProperty(e){
        e.persist();
        this.setState({
            isLoading: true,
        });
        var params = {
                streetAddress   : document.getElementById('input_streetAddress').value,
                city            : document.getElementById('input_city').value,
                state           : document.getElementById('input_state').value,
                title           : document.getElementById('input_title').value,
                description     : document.getElementById('input_description').value,
                type            : document.getElementById('input_propType').value,
                numBed          : document.getElementById('input_bed').value,
                numSleep        : document.getElementById('input_sleeps').value,
                numBath         : document.getElementById('input_bath').value,
                fromDate        : document.getElementById('input_startDate').value,
                toDate          : document.getElementById('input_endDate').value,
                price           : document.getElementById('ppn').value,
                minStay         : document.getElementById('ms').value,
                photoURL        : this.state.photoURL.join(";"),            
            }
        
        this.props.listProperty(params, (res) =>{
            this.setState({
                isLoading: false,
            });
            if(res.status === "SUCCESS"){
                console.log("Successfully listed the property.");
    
                document.getElementById("success_text").innerHTML = "Successfully listed the property!";
                document.getElementById("success_snackbar").style.setProperty('display', 'block'); 
                setTimeout(() => {
                    this.props.history.push("/OwnerProperties");
                }, 2000);
            }
            else{
                console.log("Err in listing the property details in DB.");
                document.getElementById("alert_text").innerHTML = "ERROR: Could not list the property.";
                document.getElementById("alert_snackbar").style.setProperty('display', 'block');
                setTimeout(() => {
                    document.getElementById("alert_snackbar").style.setProperty('display', 'none');
                }, 2000);
            }
        })
    }
 
    render(){
        let redirectVar = null;
        if(!(this.props.user_type === 'owner')){
            redirectVar = <Redirect to="/OwnerLogin" />;
        }

        let image_previews = this.state.photoURL.map(url => {
            return(
                <div class="col-md-3 mt-3">
                    <span className="col-md-3 align-middle">
                        <img src={url} alt="Preview" width="75%"/>
                    </span>
                    <button className="btn btn-danger rounded-circle" style={{position: 'absolute', 'margin-left': '-30px', 'margin-top': '-20px'}} targetURL={url} onClick={this.remove_preview}>x</button>
                </div>                                        
            )
        })

        return(
            <div>
                {redirectVar};
                <NavBar location = "pob"/>
                <div className = "container align-center mt-5 pt-5">
                    <div className = "row col-md-12">
                        <h5>Progress</h5>
                        <div className="container row">
                            <div className="col-md-10">
                            <div className="progress">
                                <div id="progressBar" className="progress-bar bg-success" role="progressbar" style={{width:this.state.progress_value}}>{this.state.progress_value}</div>
                            </div>                                
                            </div>
                        </div>
                        <div className = "container row mt-4 pt-3">
                            <div className = "nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a className="nav-link active" id="v-pills-welcome-tab" data-toggle="pill" href="#v-pills-welcome" role="tab" aria-controls="v-pills-welcome" aria-selected="true" progress_value="0%" onClick={this.updateProgress}>Welcome</a>
                                <a className="nav-link" id="v-pills-location-tab" data-toggle="pill" href="#v-pills-location" role="tab" aria-controls="v-pills-location" aria-selected="false" progress_value="20%" onClick={this.updateProgress}>Location</a>
                                <a className="nav-link" id="v-pills-details-tab" data-toggle="pill" href="#v-pills-details" role="tab" aria-controls="v-pills-details" aria-selected="false" progress_value="40%" onClick={this.updateProgress}>Details</a>
                                <a className="nav-link" id="v-pills-photos-tab" data-toggle="pill" href="#v-pills-photos" role="tab" aria-controls="v-pills-photos" aria-selected="false"  progress_value="60%" onClick={this.updateProgress}>Photos</a>
                                <a className="nav-link" id="v-pills-availability-tab" data-toggle="pill" href="#v-pills-availability" role="tab" aria-controls="v-pills-availability" aria-selected="false"  progress_value="80%" onClick={this.updateProgress}>Availibility</a>
                                <a className="nav-link" id="v-pills-rentalrates-tab" data-toggle="pill" href="#v-pills-rentalrates" role="tab" aria-controls="v-pills-rentalrates" aria-selected="false"  progress_value="100%" onClick={this.updateProgress}>Nightly Rate</a>
                            </div>
                            <div className="tab-content ml-5" id="v-pills-tabContent">
                                    <div className="tab-pane fade show active" id="v-pills-welcome" role="tabpanel" aria-labelledby="v-pills-welcome-tab">
                                        <div className= "shadow container pb-3">
                                            <h3> Welcome!<br/> 
                                            </h3>
                                            <p className="font-weight-light text-muted mt-2 pt-3">Just 5 steps remaining. Please fill in the details on each tab on the left. </p>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="v-pills-location" role="tabpanel" aria-labelledby="v-pills-location-tab">
                                        <div className="shadow container pb-3">
                                            <h3> Add the property location to begin with. </h3>
                                            <div className="mt-2 pt-4 border-bottom">
                                                <div className="form-group"> 
                                                    <label for ="streetAddress">Street Address</label>    
                                                    <input type="text" id= "input_streetAddress" className="form-control" name="streetAddress" placeholder="Street Address" value={this.state.streetAddress} onChange={this.onChange} />
                                                </div>
                                                <div className="form-row">                                                                                                             
                                                    <div className="form-group col-md-6"> 
                                                        <label for ="city">City</label>    
                                                        <input type="text" id= "input_city"className="form-control" name="city" placeholder="City" value={this.state.city} onChange={this.onChange} />
                                                    </div>
                                                    <div className="form-group col-md-6"> 
                                                        <label for ="state">State</label>    
                                                        <input type="text" id= "input_state"className="form-control" name="state" placeholder="State" value={this.state.state} onChange={this.onChange}  /> <br/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                                    
                                    </div>

                                    <div className="tab-pane fade" id="v-pills-details" role="tabpanel" aria-labelledby="v-pills-details-tab">
                                        <div className="shadow container pb-3">
                                            <h3 className="border-bottom"> Describe your property. </h3>
                                            <p className="font-weight-light text-muted border-bottom mt-2 pt-2">Start out with a descriptive headline, and a detailed summary of your property.</p>
                                            <div className="mt-2 pt-4 border-bottom">
                                                <div className="form-group"> 
                                                    <input type="text" id="input_title" className="form-control" name="title" placeholder="Headline" value={this.state.title} onChange={this.onChange}/>
                                                    <p className="text-danger text-right font-weight-light">Minimum 20 character</p>
                                                </div>
                                                <div className="form-group"> 
                                                    <input type="text" id="input_description" className="form-control" name="description" placeholder="Property Description" value={this.state.description} onChange={this.onChange}/>
                                                    <p className="text-danger text-right font-weight-light">Minimum 400 character</p>
                                                </div>
                                                <div className="form-group">
                                                <input type="text" id="input_propType" className="form-control" name="type" placeholder="Property Type" value={this.state.type} onChange={this.onChange}/>
                                                    <p className="text-danger text-right font-weight-light">Provide one.</p>
                                                </div>
                                                <div className="form-row">                                                                                                             
                                                    <div className="form-group col-md-4"> 
                                                        <label for ="input_bed" className="bmd-label-floating">Bedroom(s)</label>    
                                                        <input type="number" id= "input_bed" className="form-control" min="1" name="numBed" placeholder="Bedrooms" value={this.state.numBed} onChange={this.onChange} />
                                                    </div>
                                                    <div className="form-group col-md-4"> 
                                                        <label for ="input_sleeps" className="bmd-label-floating">Sleeps</label>    
                                                        <input type="number" id= "input_sleeps" className="form-control" min="1" name="numSleep" placeholder="Sleeps" value={this.state.numSleep} onChange={this.onChange} />
                                                    </div>
                                                    <div className="form-group col-md-4"> 
                                                        <label for ="input_bath" className="bmd-label-floating">Bathroom(s)</label>    
                                                        <input type="number" id= "input_bath" className="form-control" min="1" step="0.5" name="numBath" placeholder="Bathroom(s)" value={this.state.numBath} onChange={this.onChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="tab-pane fade" id="v-pills-photos" role="tabpanel" aria-labelledby="v-pills-photos-tab">
                                        <div className="shadow container pb-3">
                                            <h3> Add up to 5 photos of your property. </h3>
                                            <p className="font-weight-light text-muted border-bottom mt-2 pt-2">
                                            Showcase your property's best features(no pets or people please).<br/>
                                            Requirements: JPEG, less than 5MB, 2 photos minimum.
                                            </p>
                                            <div className="mt-2 pt-4 border-bottom">
                                                <div className="form-group"> 
                                                    <div className="col-md-12 pb-4">
                                                        <input 
                                                            type="file" 
                                                            name="images"
                                                            multiple
                                                            onChange={this.fileUploadHandler}
                                                            style={{display: 'none'}} 
                                                            ref={fileInput => this.fileInput = fileInput}/>
                                                        <input type="hidden" id="photoURL" name="photoURL" value={this.state.photoURL} />
                                                        <button className="btn btn-outline-primary mr-2" onClick={() => this.fileInput.click()}>Choose Photos</button>
                                                        Select photos to preview before uploading
                                                        <div className="progress w-100 mt-2" style={{height: '3px'}}>
                                                            <div className="progress-bar" role="progressbar" style={{width:this.state.photoUploadProgress}}></div>
                                                        </div>
                                                        <div className="row my-2">
                                                            {image_previews}
                                                        </div> 
                                                    </div>    
                                                </div>
                                            </div>
                                        </div> 
                                    </div>

                                    <div className="tab-pane fade" id="v-pills-availability" role="tabpanel" aria-labelledby="v-pills-availability-tab">
                                        <div className="shadow container pb-3">
                                            <h3> Availability </h3>
                                            <p className="font-weight-light text-muted border-bottom mt-2 pt-2">
                                                Already know when you would like your property to be available? <br/>
                                                You can also make changes after publishing your listing.</p>
                                            <div className="mt-2 pt-2 border-bottom">
                                                <div className="form-group"> 
                                                    <label for ="input_startDate">Available From</label>   
                                                    <input type="date" id= "input_startDate" className="form-control" name="fromDate" placeholder="From" value={this.state.fromDate} onChange={this.onChange}/> <br/>
                                                </div>
                                                <div className="form-group"> 
                                                    <label for ="input_endDate">Available Until</label>    
                                                    <input type="date" id="input_endDate" className="form-control" name="toDate" placeholder="Until" value={this.state.toDate} onChange={this.onChange}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="v-pills-rentalrates" role="tabpanel" aria-labelledby="v-pills-rentalrates-tab">
                                        <div className="shadow container pb-3">
                                            <h3> How much do you want to charge? </h3>
                                            <p className="font-weight-light text-muted border-bottom mt-2 pt-2"> We recommend starting with a low price to get a few bookings and earn some initial guest reviews. <br />You can update your rates at any time.</p>
                                            <div className="mt-2 pt-2 border-bottom">
                                                <div className="form-group"> 
                                                    <label for ="ppn">Nightly Base Rate</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">$</span>
                                                        </div>
                                                        <input type="text" id= "ppn" className="form-control" name="price" aria-label="Amount (to the nearest dollar)" value={this.state.price} onChange={this.onChange} /> <br/>
                                                    </div>
                                                </div>
                                                <div className="form-group"> 
                                                    <label for ="ms">Minimum Stay</label>    
                                                    <input type="number" id="ms" className="form-control" name="minStay" placeholder="No of days..." value={this.state.minStay} onChange={this.onChange}  />
                                                </div>
                                            </div>
                                            <div className="row mt-2 pt-3">
                                                <div className="col-md-4">
                                                    <button className="btn btn-info btn-block" type="reset">Reset</button>
                                                </div>
                                                <div className="col-md-4 offset-md-4">
                                                <button className="btn btn-block btn-primary" disabled={this.state.isLoading === true ? "disabled" : ""} type="button" onClick={this.handleListYourProperty}>List Your Property</button>
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
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.users.token,
    user: state.users.user,
    name: state.users.name,
    user_type: state.users.user_type,
});

export default connect(mapStateToProps, {listProperty})(POB);
