import axios from "axios";
import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

function PaypalButton(props) {
  const cookies = new Cookies();
  const account = cookies.get("account");
  const { paymentInfo } = props;
  const shippingStorage = useSelector((state) => state.shipping);

  const [amount, setAmount] = useState(0);

  var body = {
    accountId: account.accountId,
    receiverFirstName: shippingStorage.firstName,
    receiverLastName: shippingStorage.lastName,
    shipAddress: shippingStorage.address,
    shipDistrict: shippingStorage.district,
    shipWard: shippingStorage.ward,
    phone: shippingStorage.mobile,
  };

  useEffect(() => {
    if (!paymentInfo) return;
    setAmount(paymentInfo.transactions[0].amount.total);
    console.log(
      "🚀 ~ file: PaypalButton.js ~ line 11 ~ PaypalButton ~ paymentInfo",
      paymentInfo.transactions[0].amount.total
    );
    console.log("🚀 ~ file: test2.jsx ~ line 27 ~ handleSuccess ~ body", body);
    return () => {};
  }, [paymentInfo]);

  const handleSuccess = async (details, data) => {
    console.log(
      "🚀 ~ file: PaypalButton.js ~ line 33 ~ handleSuccess ~ details, data",
      details,
      data
    );
    try {
      alert("Transaction completed by " + details.payer.name.given_name);

      const res = await axios.post("/api/users/orders/", body);
      window.location.href = "/paySuccess";
      console.log("🚀 ~ file: test2.jsx ~ line 36 ~ handleSuccess ~ res", res);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <PayPalButton
      amount={amount}
      options={{
        clientId:
          "AbRobx2rcuxxHY5s2HhsD6S7M37P_pCbHaqj1ynS3D6dGvuSzH2gN5kJ2FxSsY8R9HPbkTwVw22_Gl37",
      }}
      onSuccess={(details, data) => handleSuccess(details, data)}
      onError={(err) =>
        console.log("🚀 ~ file: test2.jsx ~ line 23 ~ Test2 ~ err", err.message)
      }
    />
  );
}

export default PaypalButton;

// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import axios from 'axios';
// function PaypalButton(props) {
//   const [sdkReady, setSdkReady] = useState(false);

//   const addPaypalSdk = async () => {
//     const result = await axios.get("/api/config/paypal");
//     const clientID = result.data;
//     const script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = 'https://www.paypal.com/sdk/js?client-id=' + clientID;
//     script.async = true;
//     script.onload = () => {
//       setSdkReady(true);
//     }
//     document.body.appendChild(script);
//   }

//   const createOrder = (data, actions) => actions.order.create({
//     purchase_units: [
//       {
//         amount: {
//           currency_code: 'USD',
//           value: props.amount
//         }
//       }
//     ]
//   });

//   const onApprove = (data, actions) => actions.order
//     .capture()
//     .then(details => props.onSuccess(data, details))
//     .catch(err => console.log(err));

//   useEffect(() => {
//     if (!window.paypal) {
//       addPaypalSdk();
//     }
//     return () => {
//       //
//     };
//   }, []);

//   if (!sdkReady) {
//     return <div>Loading...</div>
//   }

//   const Button = window.paypal.Buttons.driver('react', { React, ReactDOM });

//   return <Button {...props} createOrder={(data, actions) => createOrder(data, actions)}
//     onApprove={(data, actions) => onApprove(data, actions)} />
// }

// export default PaypalButton;
