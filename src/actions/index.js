import { LOADED_FAVS, LOADED_CITIES, LOADED_COLLECTIONS, LOADED_RESTAURANTS, LOADED_CATEGORIES, LOADED_LOCATION, LOADED_LOCATION_DETAILS, ADD_USER, VALID_LOGIN, VALID_LOGOUT} from '../constants'

import axios from 'axios';

const config = {
    headers: { 'user-key': 'e72ea3a9fe87325d55dd0b6d7b2a010f' }
};

const image_config = {
    headers: {'X-RapidAPI-Key': '87ebf12255msh1b868adfafe0a4ap176b96jsnf45a37357151'}
}

let city_id;
let entity_id;
let entity_type;

export const getFavs = (favInput) => dispatch => {

    
    axios.get(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?count=5&q=${favInput}&autoCorrect=false`, image_config)
        .then(res => {
            dispatch({ 
                type: LOADED_FAVS,
                payload: res.data,
                _type: res.data._type


            
            })
        })
    }

export const getCities = (cityInput) => dispatch => {

    if (cityInput.length === 0){
        window.alert("Enter a city name")
    }
    else{
    axios.get(`https://developers.zomato.com/api/v2.1/cities?q=${cityInput}`, config)
        .then(res => {
            dispatch({ 
                type: LOADED_CITIES,
                payload: res.data, 
                city_id: res.data.location_suggestions[0].id,
                name: res.data.location_suggestions[0].name
            
            })
            city_id = res.data.location_suggestions[0].id;
        })
    }
}
export const getCollections = () => dispatch => {

    axios.get(`https://developers.zomato.com/api/v2.1/collections?city_id=${city_id}`, config)
        .then(res => {
            console.log(res.data)
            dispatch({ 
                type: LOADED_COLLECTIONS,
                payload: res.data,
                collections: res.data.collections            
            })
        })
}    







export const getRestaurants = (searchQuery, offset, categoryID) => dispatch => {
    axios.get(`https://developers.zomato.com/api/v2.1/search?q=${searchQuery}&start=${offset}&count=20&category=${categoryID}`, config)
        .then(res => {
            dispatch({ 
                type: LOADED_RESTAURANTS,
                payload: res.data,
                restaurantInitial: res.data.restaurants[0].restaurant.name,
                restaurants: res.data.restaurants
             })

        })
}
export const getCategories = () => dispatch => {

    axios.get(`https://developers.zomato.com/api/v2.1/categories`, config)
        .then(res => {
            dispatch({ 
                type: LOADED_CATEGORIES,
                payload: res.data,
                categoryInitial: res.data.categories[0].categories.name,
                categories: res.data.categories,
            })
        })
}
export const getLocation = (locationInput) => dispatch => {

    axios.get(`https://developers.zomato.com/api/v2.1/locations?query=${locationInput}`, config)
        .then(res => {
            dispatch({ 
                type: LOADED_LOCATION,
                payload: res.data, 
                entity_id:res.data.location_suggestions[0].entity_id,
                entity_type:res.data.location_suggestions[0].entity_type,
                city_name: res.data.location_suggestions[0].city_name
            
            })
            entity_id = res.data.location_suggestions[0].entity_id;
            entity_type = res.data.location_suggestions[0].entity_type;

        })
}

export const getLocationDetails = () => dispatch => {  

    axios.get(`https://developers.zomato.com/api/v2.1/location_details?entity_id=${entity_id}&entity_type=${entity_type}`, config)
        .then(res => {
            dispatch({ 
                type: LOADED_LOCATION_DETAILS,
                payload: res.data,
                popularity: res.data.popularity,
                nightlife_index: res.data.nightlife_index,
                top_cuisines: res.data.top_cuisines,
                best_rated_restaurant: res.data.best_rated_restaurant
             })
            
})
}





export const addUser = (user) => ({
    type: ADD_USER,
    payload: user
})

export const logIn = (user) => ({
    type: VALID_LOGIN,
    payload:user
})

export const logOut = () => ({
    type: VALID_LOGOUT
})