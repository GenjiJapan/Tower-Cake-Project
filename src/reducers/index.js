import { combineReducers } from "redux";
import cartReducer from "./Cart";
import commentReducer from "./Comment";
import eventReducer from "./Event";
import favoritesReducer from "./Favorites";
import formReducer from "./Form";
import loginReducer from "./Login";
import { productReducer } from "./Search";
import { shippingInfoReducer } from "./shippingReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  cart: cartReducer,
  favorite: favoritesReducer,
  form: formReducer,
  comment: commentReducer,
  allProducts: productReducer,
  event: eventReducer,
  shipping: shippingInfoReducer,
});

export default rootReducer;
