import { SHOW_FORM } from "constants/global";

export const openForm = (data) => {
  return {
    type: SHOW_FORM,
    payload: data,
  };
};
