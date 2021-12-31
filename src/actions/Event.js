export const resetEvent = () => {
  return {
    type: "RESET_EVENT",
  };
};

export const eventSearchList = (data) => {
  return {
    type: "EVENT_LIST",
    payload: data,
  };
};

export const eventNearestList = (data) => {
  return {
    type: "NEAREST_LIST",
    payload: data,
  };
};

export const pageFilter = (data) => {
  return {
    type: "FILTER_PAGE",
    payload: data,
  };
};
