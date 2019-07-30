import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';




class Navbar extends Component {    
    render() {
        return ( 
            <div className="nav-bg">
                <div className="navpad">
                    <Link className="nav-item navbar-font" to="/home">Home </Link>
                    <Link className="nav-item navbar-font" to="/search">Search </Link>
                    <Link className="nav-item navbar-font" to="/register">Register </Link>
                    {this.props.isLoggedIn ?
                    <Link className="nav-item navbar-font" to="/favorites">Favorites </Link>:
                    (<Link className="nav-item navbar-font" to="/loginscreen">Login Screen </Link>)
                    }
                </div>
                <div className="navbar-font navbar-properties">
                    <h4>Munch Bar</h4>
                </div>
            </div>
            )};
}

const mapStatetoProps = state => ({
    isLoggedIn: state.isLoggedIn,
  });

  export default connect(mapStatetoProps)(Navbar);