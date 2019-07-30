import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCities, getCollections, getRestaurants, getCategories, getLocation, getLocationDetails } from './../actions';


class Search extends Component {
    state = {
        cityInput: '',
        searchQuery: '',
        locationInput: '',
        offset: 0,
        firstdropdownselection: 'Cities',
        open_c: false,
        open_r: false,
        open_l: false,
        open_ct: false
    }
    //close sections

    closeSection = () => {
        this.setState({
            cityInput: '',
            searchQuery: '',
            locationInput: '',
            open_c: false,
            open_r: false,
            open_l: false,
            open_ct: false
        })
    }

    handleMainChoice = e => {
        this.closeSection()
        this.setState({
            firstdropdownselection: e.target.value,
        });
    }

    getCitiesLoad = () => {
        this.props.getCities(this.state.cityInput)
        this.setState({
            open_ct: true
        })
    }

    getCollectionsLoad = () => {
        this.getCitiesLoad()
        this.props.getCollections()

    }

    getLocationLoad = () => {
        this.props.getLocation(this.state.locationInput)
        this.setState({
            open_l: true
        })
    }
    getLocationDetailsLoad = () => {
        this.getLocationLoad()
        this.props.getLocationDetails()

    }




    getRestaurantsLoad = () => {
        this.props.getRestaurants(this.state.searchQuery, this.state.offset, this.state.categoryID)
        this.setState({
            open_r: true
        })
    }
    getCategoriesLoad = () => {
        this.props.getCategories()
        this.setState({
            open_c: true,
        })
    }

    openRestaurants = () => {
        this.setState({
            open_r: true,
        })
    }



    getDollar = (x) => {
        let dollar = '';

        while (x > 0) {
            x -= 1;
            dollar = dollar + '$'
        }
        return dollar;
    }



    changeOffset = () => {
        this.setState({
            offset: this.state.offset + 12
        }, () => {
            this.props.getRestaurants(this.state.searchQuery, this.state, this.state.categoryID);
        })
    }

    changeSort = () => {
        this.setState({
            offset: this.state.offset + 12
        }, () => {
            this.props.getRestaurants(this.state.searchQuery, this.state.offset, this.state.categoryID);
        })
    }

    render() {
        return (
            <div className="searchPic">  
                <div className ="quoteBox">
                    <h2>
                        <div className="quoteText">
                        Search by...
                        </div>
                    </h2>
                </div>
                <div>
                    <div class="dropdown">
                        <select
                            value={this.state.firstdropdownselection}
                            onChange={e => this.handleMainChoice(e)}
                        >
                            <option className ="dropdown-item" value="Cities">Cities</option>
                            <option className ="dropdown-item" value="Categories">Categories</option>
                            <option className ="dropdown-item" value="Location">Location</option>
                            <option className ="dropdown-item" value="Restaurant">Restaurant</option>
                        </select>
                    </div>
                </div>
                <div>
                    {this.state.firstdropdownselection === "Cities" &&
                        (<div>{this.state.open_ct ?
                            <button className="btn btn-primary"
                                onClick={() => { this.closeSection() }}>CLOSE SECTION</button>
                            :
                            (
                                <div>
                                    <input
                                        type="text"
                                        value={this.state.cityInput}
                                        placeholder="Enter City Name"
                                        onChange={(e) => { this.setState({ cityInput: e.target.value }) }}
                                    />
                                    <br/>
                                    <br/>
                                    <br/>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => { this.getCitiesLoad(); }}>
                                        GET CITIES
                                    </button>
                                    <br/>
                                    <br/>
                                    <br/>
                                </div>
                            )
                        }</div>)
                    }
                    {this.props.cityData && this.state.open_ct &&
                        (<div>
                            <h1>{this.props.name}</h1>
                            <button className= "btn btn-primary" 
                                onClick={() => {
                                this.getCollectionsLoad();
                            }}>GET COLLECTIONS</button>
                        </div>)
                    }

                    {this.props.collections && this.state.open_ct &&
                        (<div>
                            {this.props.collections.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <p>---</p>
                                        <img src={item.collection.image_url} alt="Thumbnail Not Available" />
                                        <p> {item.collection.title} --- Description: {item.collection.description} </p>
                                        <p>---</p>
                                    </div>
                                )})
                            }
                        </div>)
                    }

                    {this.state.firstdropdownselection === "Categories" &&
                        (<div>{this.state.open_c ?
                            <button className="btn btn-primary"
                                onClick={() => { this.closeSection() }}>CLOSE SECTION</button>
                            :
                            (
                                <button className="btn btn-primary"
                                    onClick={() => { this.getCategoriesLoad() }}
                                >       GET CATEGORIES
                                </button>
                            )
                        }</div>)
                    }
                    {this.state.firstdropdownselection === "Location" &&
                        (<div>{this.state.open_l ?
                            <button className="btn btn-primary"
                                onClick={() => { this.closeSection() }}>CLOSE SECTION</button>
                            :
                            (
                                <div>
                                    <input
                                        type="text"
                                        value={this.state.locationInput}
                                        placeholder="Enter Location Keyword(s)"
                                        onChange={(e) => { this.setState({ locationInput: e.target.value }) }}
                                    />
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => { this.getLocationLoad(); }}>
                                        GET LOCATION
                                    </button>
                                </div>
                            )
                        }</div>)
                    }

                    {this.state.firstdropdownselection === "Restaurant" &&
                        (<div>{this.state.open_r ?
                            <button className="btn btn-primary"
                                onClick={() => { this.closeSection() }}>CLOSE SECTION</button>
                            :
                            (
                                <div>
                                    <input
                                        type="text"
                                        value={this.state.searchQuery}
                                        placeholder="Enter Restaurant Keyword(s)"
                                        onChange={(e) => { this.setState({ searchQuery: e.target.value }) }}
                                    />
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => { this.getRestaurantsLoad(); }}>
                                        GET RESTAURANTS
                                    </button>
                                </div>
                            )
                        }</div>)
                    }
                    {this.props.restaurantInitial && this.state.open_r &&
                        (<div>
                            {this.props.restaurants.map((item, index) => {
                                return (
                                    <div className="restaurantSearch" key={index}>
                                        <br />
                                        <img src={item.restaurant.thumb} alt="" />
                                        <p> {item.restaurant.name} --- {item.restaurant.cuisines} </p>
                                        <p> Address: {item.restaurant.location.address} </p>
                                        <p> Price Range: {this.getDollar(item.restaurant.price_range)} </p>
                                        <p> User Rating: {item.restaurant.user_rating.rating_text} <br></br> ({item.restaurant.user_rating.aggregate_rating}/5)</p>
                                        <p> Votes: {item.restaurant.user_rating.votes} </p>
                                        <a href={item.restaurant.menu_url} target="_blank">Menu</a>
                                        <img src={item.restaurant.featured_image} alt="" />
                                        <p>---</p>
                                        <br />
                                    </div>
                                )
                            })}
                            <button className="btn btn-primary"
                                onClick={() => { this.changeOffset(); }}>
                                Show More Restaurants
                                        </button>
                        </div>)
                    }

                    {this.props.categoryInitial && this.state.open_c &&
                        (<div>
                            {this.props.categories.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <br />
                                        <button className="btn btn-outline-primary" onClick={() => { this.props.getRestaurants("", 0, item.categories.id) }}
                                        >{item.categories.id} - {item.categories.name}</button>
                                        <button className="btn btn-outline-primary" onClick={() => { this.openRestaurants() }}
                                        >GO!!</button>

                                        <br />
                                    </div>
                                )
                            })}
                        </div>)
                    }






                    {this.props.city_name && this.state.open_l &&
                        (<div>
                            <h1>{this.props.city_name}</h1>
                            <button onClick={() => {
                                this.getLocationDetailsLoad();
                            }}>GET LOCATION DETAILS</button>
                        </div>)
                    }
                    {this.props.popularity && this.state.open_l &&
                        (<div>
                            <h1>Popularity Index: {this.props.popularity}/5.00</h1>
                            <h1>NightLife Index: {this.props.nightlife_index}/5.00</h1>
                            <h1>Top Cuisines in {this.props.city_name} </h1>
                            {this.props.top_cuisines.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <li> {item} </li>
                                    </div>
                                )
                            })
                            }
                            <h1>Best Rated Restaurants in {this.props.city_name} </h1>
                            {this.props.best_rated_restaurant.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <p>---</p>
                                        <img src={item.restaurant.featured_image} alt="Thumbnail Not Available" />
                                        <p> {item.restaurant.name} --- Cuisines: {item.restaurant.cuisines} </p>
                                        <p> Address: {item.restaurant.location.address} </p>
                                        <p> Price Range: {this.getDollar(item.restaurant.price_range)} </p>
                                        <p> User Rating: {item.restaurant.user_rating.rating_text} <br></br> ({item.restaurant.user_rating.aggregate_rating}/5)</p>
                                        <p> Votes: {item.restaurant.user_rating.votes} </p>
                                        <a href={item.restaurant.menu_url} target="_blank">Menu</a>
                                        <p>---</p>
                                    </div>
                                )
                            })
                            }
                        </div>)
                    }
                </div>
            </div>
        )
    }
}



const mapStatetoProps = state => ({
    index: state.index,
    restaurantData: state.restaurantData,
    restaurantInitial: state.restaurantInitial,
    restaurants: state.restaurants,
    categoryData: state.categoryData,
    categoryInitial: state.categoryInitial,
    categories: state.categories,
    cityData: state.cityData,
    name: state.name,
    city_id: state.city_id,
    collectionData: state.collectionData,
    collections: state.collections,
    locationData: state.locationData,
    locationDetails: state.locationDetails,
    entity_id: state.entity_id,
    entity_type: state.entity_type,
    city_name: state.city_name,
    popularity: state.popularity,
    nightlife_index: state.nightlife_index,
    top_cuisines: state.top_cuisines,
    best_rated_restaurant: state.best_rated_restaurant,
});

const mapPropsToDispatch = dispatch => ({
    getCities: (cityInput) => dispatch(getCities(cityInput)),
    getCollections: () => dispatch(getCollections()),
    getRestaurants: (searchQuery, offset, categoryID) => dispatch(getRestaurants(searchQuery, offset, categoryID)),
    getCategories: () => dispatch(getCategories()),
    getLocation: (locationInput) => dispatch(getLocation(locationInput)),
    getLocationDetails: () => dispatch(getLocationDetails()),

});


export default connect(mapStatetoProps, mapPropsToDispatch)(Search);