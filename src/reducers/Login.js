import { LOG_IN } from "constants/global";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  account: cookies.get("account") || "",
  token: cookies.get("token") || "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return state;
    }

    default:
      return state;
  }
};

export default loginReducer;
