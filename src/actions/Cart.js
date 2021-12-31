import {
  ADD_PRODUCT,
  DECREASE_QTY,
  INCREASE_QTY,
  REMOVE_PRODUCT,
  UPDATE_QTY,
} from "constants/global";

export const resetFilter = () => {
  return {
    type: "RESET_FILTER",
  };
};

export const errorMessage = (data) => {
  return {
    type: "ERROR_MESSAGE",
    payload: data,
  };
};

export const filter = (data) => {
  return {
    type: "FILTER_LIST",
    payload: data,
  };
};

export const pageFilter = (data) => {
  return {
    type: "FILTER_PAGE",
    payload: data,
  };
};

export const storeOrder = (data) => {
  return {
    type: "STORE_ORDER",
    payload: data,
  };
};

export const addNewProduct = (data) => {
  return {
    type: ADD_PRODUCT,
    payload: data,
  };
};

export const updateProduct = (data) => {
  return {
    type: UPDATE_QTY,
    payload: data,
  };
};

export const increaseProduct = (item) => {
  return {
    type: INCREASE_QTY,
    payload: item,
  };
};

export const decreaseProduct = (item) => {
  return {
    type: DECREASE_QTY,
    payload: item,
  };
};

export const removeProduct = (item) => {
  return {
    type: REMOVE_PRODUCT,
    payload: item,
  };
};
