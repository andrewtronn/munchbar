import './App.css';
import React, { Component } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Favorites from './components/Favorites';
import Register from './components/Register';
import Search from './components/Search';
import LoginScreen from './components/LoginScreen';



class App extends Component {
  state = {
  }

  
  render() {
    return (
      <div className="App">
        <Navbar />
                <div className="main-container">
                    <Switch>  
                        <Route exact path="/" render={() => this.props.isLoggedIn ? <Redirect to='/favorites' /> : <Home/>}/>
                        <Route path="/home" render={(renderProps) => <Home/>}/>
                        <Route path="/loginscreen" render={(renderProps) => <LoginScreen/>}/>
                        <Route path="/favorites" render={(renderProps) => <Favorites />} />
                        <Route path="/register" render={(renderProps) => <Register/>} />
                        <Route path="/search" render={(renderProps) => <Search />} />
                    </Switch>
                </div>
      </div>
    )
  }
}


const mapStatetoProps = state => ({
  isLoggedIn: state.isLoggedIn
});



export default withRouter(connect(mapStatetoProps)(App));