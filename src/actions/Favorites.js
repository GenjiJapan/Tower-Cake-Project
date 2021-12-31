import { ADD_ITEM, EXISTED } from "constants/global";

export const addToFavorite = (item) => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
};

export const removeItem = (item) => {
  return {
    type: EXISTED,
    payload: item,
  };
};
