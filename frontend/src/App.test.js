import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { expect } from 'chai';
import TravellerLogin from './components/TravellerLogin/travellerLogin';
import OwnerLogin from './components/OwnerLogin/ownerLogin';
import UserToolbar from './components/UserToolbar/UserToolbar';

describe('App component testing', function() {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    //expect(div.contains(<div><Main /></div>)).to.equal(true);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('Traveler Login component testing', function() {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TravellerLogin />, div);
    //expect(div.contains(<div><Main /></div>)).to.equal(true);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('Owner Login component testing', function() {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<OwnerLogin />, div);
    //expect(div.contains(<div><Main /></div>)).to.equal(true);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('User toolbar as owner component testing', function() {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UserToolbar user_type="owner" />, div);
    //expect(div.contains('My Properties')).to.equal(true);
    ReactDOM.unmountComponentAtNode(div);
  });
});