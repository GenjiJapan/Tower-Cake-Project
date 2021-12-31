import { ADD_ITEM, EXISTED } from "constants/global";

const initialState = {
  list: JSON.parse(localStorage.getItem("favorite")) || [],
  // list: [],
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const newList = [...state.list];
      newList.push(action.payload);
      localStorage.setItem("favorite", JSON.stringify(newList));
      return {
        ...state,
        list: newList,
      };
    }
    case EXISTED: {
      const newList = [...state.list];
      let index = newList.findIndex((item) => item.id === action.payload.id);
      newList.splice(index, 1);

      // alert("bỏ yêu thích sản phẩm này ");
      return {
        ...state,
        list: newList,
      };
    }

    default:
      return state;
  }
};

export default favoritesReducer;
