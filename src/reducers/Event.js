const initialState = {
  searchEventList: [],
  nearestList: [],
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EVENT_LIST": {
      console.log(
        "🚀 ~ file: Event.js ~ line 12 ~ eventReducer ~ action.payload",
        action.payload
      );
      return {
        ...state,
        searchEventList: action.payload,
      };
    }

    case "NEAREST_LIST": {
      console.log(
        "🚀 ~ file: Event.js ~ line 20 ~ eventReducer ~ action.payload",
        action.payload
      );
      return {
        ...state,
        nearestList: action.payload,
      };
    }

    case "RESET_EVENT": {
      console.log(
        "🚀 ~ file: Event.js ~ line 20 ~ eventReducer ~ action.payload",
        action.payload
      );
      return {
        ...state,
        nearestList: [],
        searchEventList: [],
      };
    }

    default:
      return state;
  }
};

export default eventReducer;
