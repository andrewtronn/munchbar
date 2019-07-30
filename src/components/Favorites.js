import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getFavs, logOut } from './../actions';

class Favorites extends Component {
    state =
        {
            favInput: "",
            open_f: false
        }

    getFavoritesLoad = () => {
        this.props.getFavs(this.state.favInput)
        console.log("hello world")

        this.setState({
            open_f: true
        })
    }
    closeSection = () => {
        this.setState({
            favInput: '',
            open_f: false
        })
    }



    render() {
        return (
            <div className="favoritesPic">
                {this.props.isLoggedIn === false && (<Redirect to="/loginscreen" />)}
                <button
                    className="btn btn-outline-primary"
                    onClick={() => this.props.logOut()}>logout
                </button>
                <h1>Favorites</h1>
                {this.state.open_f ?
                    <button className="btn btn-primary"
                        onClick={() => { this.closeSection() }}>CLOSE SECTION</button>
                    :
                    (
                        <div>
                            <input
                                type="text"
                                value={this.state.favInput}
                                placeholder="Search images"
                                onChange={(e) => { this.setState({ favInput: e.target.value }) }}
                            />
                            <br />
                            <br />
                            <br />
                            <button
                                className="btn btn-primary"
                                onClick={this.getFavoritesLoad}>
                                GET FAVORITE IMAGES
                            </button>
                            <br />
                            <br />
                            <br />
                        </div>
                    )
                }
                {this.props._type && this.state.open_f &&
                        (
                        <div>
                            {this.props.favoriteData.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <img src={item.thumbnail} alt="Thumbnail Not Available" />
                                    </div>
                                )})
                            }                           
                        </div>
                        )
                }
            </div>
        )
    }
}

const mapStatetoProps = state => ({
    isLoggedIn: state.isLoggedIn,
    favoriteData: state.favoriteData.value,
    _type: state._type
});

const mapPropsToDispatch = dispatch => ({
    getFavs: (favInput) => dispatch(getFavs(favInput)),
    logOut: () => dispatch(logOut())
});

export default connect(mapStatetoProps, mapPropsToDispatch)(Favorites);