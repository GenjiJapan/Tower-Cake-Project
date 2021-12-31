import { LIST_SEARCH } from "constants/global";

export const searchList = (data) => {
  return {
    type: LIST_SEARCH,
    payload: data,
  };
};

export const searchPage = (data) => {
  return {
    type: "SEARCH_PAGE",
    payload: data,
  };
};
