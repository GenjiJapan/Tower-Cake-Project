const initialState = {
  firstName: "",
  lastName: "",
  address: "",
  district: "",
  ward: "",
  city: "",
  mobile: "",
  paymentMethod: null,
  methodTitle: null,
  methodContent: null,
  methodNote: null,
  bankId: null,
  methodBanking: null,
  bankingNote: null,
  info: {},
};

export const shippingInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_INFO": {
      console.log(
        "🚀 ~ file: shippingReducer.js ~ line 25 ~ shippingInfoReducer ~ action.payload",
        action.payload
      );
      return {
        ...state,
        // info: action.payload,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        address: action.payload.address,
        district: action.payload.district,
        ward: action.payload.ward,
        city: action.payload.city,
        mobile: action.payload.mobile,
        paymentMethod: action.payload.paymentMethod,
        bankId: action.payload.bankId,
        methodTitle: action.payload.methodTitle,
        methodContent: action.payload.methodContent,
        methodNote: action.payload.methodNote,
        methodBanking: action.payload.methodBanking,
        bankingNote: action.payload.bankingNote,
      };
    }

    // case "SET_DELIVERY": {
    //   return {
    //     ...state,
    //   };
    // }

    default:
      return state;
  }
};
