import { LOG_IN } from "constants/global";

export const addNewUser = (values) => {
  return {
    type: LOG_IN,
    payload: values,
  };
};
