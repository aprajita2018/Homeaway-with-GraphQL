import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import LandingPage from './LandingPage/landingPage';
import TravellerLogin from './TravellerLogin/travellerLogin';
import TravellerSignup from './TravellerSignUp/travellerSignup';
import SearchResultPage from './SearchResultPage/SearchResultPage';
import PropertyDetails from './PropertyDetails/PropertyDetails';
import UserProfile from './UserProfile/userProfile';
import TravelerTrips from './TravelerTrips/TravelerTrips';
import OwnerLogin from './OwnerLogin/ownerLogin';
import OwnerSignUp from './OwnerSignUp/ownerSignUp';
import POB from './POB/pob';
import OwnerProperties from './OwnerProperties/OwnerProperties';

const Main = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path = '/' component={LandingPage}/>
            <Route exact path = '/travellerLogin' component={TravellerLogin}/>
            <Route exact path = '/travellerSignup' component={TravellerSignup}/>
            <Route exact path = '/userProfile' component={UserProfile}/>
            <Route exact path = '/searchResultPage' component={SearchResultPage}/>
            <Route exact path = '/propertyDetails' component={PropertyDetails}/>
            <Route exact path = '/travelerTrips' component={TravelerTrips}/>
            <Route exact path = '/ownerLogin' component={OwnerLogin}/>
            <Route exact path = '/ownerSignUp' component={OwnerSignUp}/>
            <Route exact path = '/pob' component={POB}/>
            <Route exact path = '/OwnerProperties' component={OwnerProperties}/>
        </Switch>
    </BrowserRouter>
)

export default Main;