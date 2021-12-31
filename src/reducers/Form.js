import { SHOW_FORM } from "constants/global";

const initialState = {
  showForm: localStorage.getItem("component") || "Profile",
  drawerId: null,
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FORM: {
      localStorage.setItem("component", action.payload.component);
      return {
        ...state,
        showForm: action.payload.component,
        drawerId: action.payload.drawerId,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default formReducer;
