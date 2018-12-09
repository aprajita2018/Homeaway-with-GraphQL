import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
});


class App extends Component {
  render() {
    return (
      <div>
        <ApolloProvider client={client}>
          <Main />
        </ApolloProvider>
      </div>

    );
  }
}

export default App;
