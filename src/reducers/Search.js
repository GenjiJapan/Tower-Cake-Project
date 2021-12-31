import { LIST_SEARCH } from "constants/global";

const initialState = {
  list: [],
  searchInfo: {},
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_SEARCH: {
      console.log(
        "🚀 ~ file: Product.js ~ line 12 ~ productReducer ~ action.payload",
        action.payload
      );

      return {
        ...state,
        list: action.payload,
      };
    }

    case "SEARCH_PAGE": {
      console.log(
        "🚀 ~ file: Search.js ~ line 30 ~ productReducer ~ action.payload",
        action.payload
      );
      return {
        ...state,
        searchInfo: action.payload,
      };
    }

    default:
      return state;
  }
};
