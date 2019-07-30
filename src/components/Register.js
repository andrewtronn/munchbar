import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser} from './../actions';


class Register extends Component {
        state = {
                user: 
                        {
                        username: "",
                        password: "",
                        }
                }
                
            
        setUsername= (e) => {
                this.setState({
                ...this.state,
                user: {
                ...this.state.user,
                username: e.target.value
                }
                })
        }

        setPassword= (e) => {
                this.setState({
                ...this.state,
                user: {
                ...this.state.user,
                password: e.target.value
                }
                })
        }

        onSubmit = (e) => {
                e.preventDefault();
                console.log(this.state.user.username)
                this.props.addUser(this.state.user);
                this.setState({
                ...this.state,
                user: {
                ...this.state.user,
                username: '',
                password: ''
                }

                        })
        }     
        
        render() {
                return (
                <div className="registerPIC">
                        <div className="register-box">
                                <h1>Register User</h1>
                                <form onSubmit={(e) => this.onSubmit(e)}>
                                        <div class="form-group">
                                                <input  className="form-control register-element"
                                                        placeholder="username"
                                                        value={this.state.user.username} 
                                                        onChange={(e)=>{ this.setUsername(e) }
                                                        } />
                                                <input  className="form-control register-element"
                                                        placeholder="password"
                                                        value={this.state.user.password} 
                                                        onChange={(e)=>{ this.setPassword(e) }
                                                        } />
                                                <button className="btn btn-primary form-control register-element"
                                                        type = "submit"
                                                >Register</button>
                                        </div>          
                                </form>
                        </div>
                </div>
                )
        }
}

const mapStatetoProps = state => ({
        users: state.users
      });

const mapPropsToDispatch = dispatch => ({
        addUser: (user) => dispatch(addUser(user))

})

export default connect(mapStatetoProps, mapPropsToDispatch)(Register);