import { LOADED_FAVS, LOADED_CITIES, LOADED_COLLECTIONS, LOADED_RESTAURANTS, LOADED_CATEGORIES, LOADED_LOCATION, LOADED_LOCATION_DETAILS, ADD_USER, VALID_LOGIN, VALID_LOGOUT} from '../constants'


const initialState = {
    //login
    isLoggedIn: false,
    users: [
        {
          username: 'admin',
          password: 'admin'
        }
      ],
    //favs
    favoriteData:{},
   _type:"",
    //restaurant search
    restaurantData:{},
    restaurantInitial:"",
    restaurants:{},
    //city search
    cityData:{},
    name:'',
    city_id:'',
    //collections
    collectionData:{},
    collections:[],
    //category Search
    categoryData:{},
    categoryInitial:"",
    categories:[],
    //location Search
    locationData: {},
    city_name:'',
    entity_id:'',
    enitity_type:'',
    //location Details
    locationDetails: {},
    best_rated_restaurant:[],
    popularity:'',
    nightlife_index:'',
    top_cuisines:[],
}
const addUser = (state, user) => {
    let newState = {
    ...state,
    users: [...state.users, user]
    }
    return newState;
}
   

const logInCheck = (user, state) => {
    for (let x of state.users) {
            if (x.username === user.username && x.password === user.password) {
            return true;
        }
    }
    return false;
}

const rootReducer = (state = initialState, action) => {
    let updatedState;

    switch (action.type) {
        case LOADED_FAVS:
            updatedState = {
                ...state,
                favoriteData: action.payload,
                _type: action._type
            }
            return updatedState;
        case LOADED_CITIES:
            updatedState = {
                ...state,
                cityData: action.payload,
                name: action.name,
                city_id: action.city_id
            }
            return updatedState;
        case LOADED_COLLECTIONS:
            updatedState = {
                ...state,
                collectionData: action.payload,
                collections: action.collections
            }
            return updatedState;
        case LOADED_RESTAURANTS:
            updatedState = {
                ...state,
                restaurantData: action.payload,
                restaurantInitial: action.restaurantInitial,
                restaurants: action.restaurants,
            }
            return updatedState;
        case LOADED_CATEGORIES:
            updatedState = {
                ...state,
                categoryData: action.payload,
                categoryInitial: action.categoryInitial,
                categories: action.categories
            }
            return updatedState;
        case LOADED_LOCATION:
            updatedState = {
                ...state,
                locationData: action.payload,
                city_name: action.city_name,
                entity_id: action.entity_id,
                entity_type: action.entity_type,
            }
            return updatedState;
        case LOADED_LOCATION_DETAILS:
            updatedState = {
                ...state,
                locationDetails: action.payload,
                popularity: action.popularity,
                nightlife_index: action.nightlife_index,
                top_cuisines: action.top_cuisines,
                best_rated_restaurant: action.best_rated_restaurant
            }
            return updatedState;
        case ADD_USER:
                updatedState = addUser(state, action.payload);
            return updatedState;
        case VALID_LOGIN:
            if (logInCheck(action.payload, state)) {
                updatedState = {
                ...state,
                isLoggedIn: true
                };
            }
          return updatedState;
        case VALID_LOGOUT:
                updatedState = {
                ...state,
                isLoggedIn: false
                };
          return updatedState;
        default:
            return state;
    }
}

export default rootReducer;