import { ADD_COMMENT } from "constants/global";

export const addComment = (data) => {
  return {
    type: ADD_COMMENT,
    payload: data,
  };
};
