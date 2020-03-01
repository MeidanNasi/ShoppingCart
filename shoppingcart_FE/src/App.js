import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import clientHome from './components/clientHome';
import adminHome from './components/adminHome';
import Cart from './components/cart';
import Landing from './components/landing'

class App extends Component {
  render(){
    return (  
        <Router>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/adminHome" component={adminHome} />
              <Route path="/clientHome" component={clientHome} />
              <Route path="/cart" component={Cart} />
            </Switch>
        </Router>
       
    );
  }
}

export default App;




