import {
  ADD_PRODUCT,
  DECREASE_QTY,
  INCREASE_QTY,
  REMOVE_PRODUCT,
  UPDATE_QTY,
} from "constants/global";

const initialState = {
  list: JSON.parse(localStorage.getItem("cart")) || [],
  orderList: [],
  filterList: [],
  filterPage: {},
  errorMessage: "",
  // list: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ERROR_MESSAGE": {
      console.log(
        "🚀 ~ file: Cart.js ~ line 24 ~ cartReducer ~ action.payload",
        action.payload
      );
      return {
        ...state,
        errorMessage: action.payload,
      };
    }

    case "RESET_FILTER": {
      return {
        ...state,
        filterList: [],
        filterPage: {},
      };
    }

    case "FILTER_PAGE": {
      console.log("action payload filter page: ", action.payload);
      // localStorage.setItem("order", JSON.stringify(action.payload));

      return {
        ...state,
        filterPage: action.payload,
      };
    }

    case "FILTER_LIST": {
      console.log("action payload filter list : ", action.payload);
      // localStorage.setItem("order", JSON.stringify(action.payload));

      return {
        ...state,
        filterList: action.payload,
      };
    }

    case "STORE_ORDER": {
      console.log("action payload : ", action.payload);
      // localStorage.setItem("order", JSON.stringify(action.payload));

      return {
        ...state,
        orderList: action.payload,
      };
    }

    case ADD_PRODUCT: {
      const newCart = [...state.list];
      newCart.push(action.payload);
      console.log("line 60 add product : ", newCart, action.payload);
      localStorage.setItem("cart", JSON.stringify(newCart));

      return {
        ...state,
        list: newCart,
      };
    }

    case UPDATE_QTY: {
      let index = state.list.findIndex((item) => item.id === action.payload.id);
      console.log(
        "🚀 ~ file: Cart.js ~ line 70 ~ cartReducer ~ action.payload.id",
        action.payload.id
      );
      console.log("🚀 ~ file: Cart.js ~ line 70 ~ cartReducer ~ index", index);
      state.list[index].qty += 1;
      return {
        ...state,
        list: state.list,
      };
    }

    case REMOVE_PRODUCT: {
      let index = state.list.findIndex(
        (item) => item.id === action.payload.item.id
      );
      state.list.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify(state.list));

      return {
        ...state,
        list: state.list,
      };
    }

    case INCREASE_QTY: {
      // console.log(" && :", action.payload.item);
      let index = state.list.findIndex(
        (item) => item.id === action.payload.item.id
      );
      state.list[index].qty += 1;

      return {
        ...state,
        list: state.list,
      };
    }

    case DECREASE_QTY: {
      // console.log("action payload :", action.payload.item);
      let index = state.list.findIndex(
        (item) =>
          item.category === action.payload.item.category &&
          item.id === action.payload.item.id
      );
      state.list[index].qty -= 1;

      return {
        ...state,
        list: state.list,
      };
    }
    default:
      return state;
  }
};
export default cartReducer;
