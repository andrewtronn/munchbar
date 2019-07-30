import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logIn} from './../actions';



class LoginScreen extends Component {

    state= {
        username:'',
        password:''
    };

    fullLogin = () => {
        this.props.logIn(this.state)
        this.setState({
            username:'',
            password:''
        })
    }    
        
    render() {
        return(
            <div className= "loginPIC" >
                <div className ="login-box">
                    {this.props.isLoggedIn  && (<Redirect to="/favorites"/>) }
                    <h1 className="login-font">Login Page</h1>
                    <div className="form-group">
                        <input 
                            type="text"
                            placeholder="Username"
                            className="form-control login-element" 
                            value={this.state.username}
                            onChange={e => this.setState({ username: e.target.value })}/>
                    </div>
                    <div className="form-group">
                        <input 
                            type="text"
                            placeholder="Password"
                            className="form-control login-element" 
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}/>
                    </div>
                    <div className="form-group">
                    <button 
                        className="btn btn-outline-primary form-control login-element"
                        onClick={() => this.fullLogin() }>Login
                    </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = state => ({
    isLoggedIn: state.isLoggedIn
  });

const mapPropsToDispatch = dispatch => ({
    logIn: user => dispatch(logIn(user))
});


export default connect(mapStatetoProps, mapPropsToDispatch)(LoginScreen);