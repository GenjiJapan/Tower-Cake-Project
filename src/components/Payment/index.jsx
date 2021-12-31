import axios from "axios";
import PaypalButton from "components/PaypalButton/PaypalButton";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Payment.css";

function Payment(props) {
  const cookies = new Cookies();
  const account = cookies.get("account");
  const history = useHistory();

  const { setCheckoutForm, showPayment, setShowPayment } = props;

  const shippingStorage = useSelector((state) => state.shipping);
  const { paymentMethod, info } = shippingStorage;
  console.log("🚀 ~ file: index.jsx ~ line 18 ~ Payment ~ info", info);
  console.log(
    "🚀 ~ file: index.jsx ~ line 17 ~ Payment ~ paymentMethod",
    paymentMethod
  );

  const [isOpenPaypal, setIsOpenPaypal] = useState(false);
  var [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 14 ~ Payment ~ paymentMethod",
      paymentMethod
    );
  }, []);

  const showCheckoutForm = (e) => {
    e.preventDefault();

    setCheckoutForm(true);
    setShowPayment(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var body = {
      accountId: account.accountId,
      receiverFirstName: shippingStorage.firstName,
      receiverLastName: shippingStorage.lastName,
      shipAddress: shippingStorage.address,
      shipDistrict: shippingStorage.district,
      shipWard: shippingStorage.ward,
      phone: shippingStorage.mobile,
    };

    if (paymentMethod === -1) return alert("tạch");
    if (paymentMethod === 0) return handlePaypal(body);
    if (paymentMethod === 1) return handleCOD(body);
    return;
  };

  const handleCOD = async (body) => {
    try {
      const res = await axios.post(`/api/users/orders/`, body);
      console.log("🚀 ~ file: index.jsx ~ line 127 ~ handleSubmit ~ res", res);

      if (!res.data) return;

      window.location.href = "/paySuccess";
    } catch (error) {
      console.log(error.response.data);
      window.location.href = "/payFailed";
    }
  };

  const handlePaypal = async (body) => {
    try {
      const res = await axios.get(
        `/api/users/orders/PayPal/user=${account.accountId}`
      );
      console.log("🚀 ~ file: index.jsx ~ line 127 ~ handleSubmit ~ res", res);
      paymentInfo = res.data;
      setPaymentInfo(paymentInfo);

      console.log(
        "🚀 ~ file: index.jsx ~ line 76 ~ handlePaypal ~ paymentInfo",
        paymentInfo
      );

      if (!res.data) return;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleOpenPaypal = () => {
    if (paymentMethod === 0) return setIsOpenPaypal(true);
    if (paymentMethod === 1) return setIsOpenPaypal(false);
  };

  return (
    <div className={showPayment ? "payment_container" : "close_payment"}>
      <form onSubmit={handleSubmit}>
        <div className="payment_contact">
          <h2>Contact and Shipping information</h2>
          <div className="contact">
            <div className="contact_content">
              <h4>Shipping address / Billing address</h4>
              <h3>
                {shippingStorage.firstName} {shippingStorage.lastName}
              </h3>
              <p>
                {" "}
                {shippingStorage.address}, {shippingStorage.district} District -{" "}
                Ward {shippingStorage.ward} - {shippingStorage.city} city{" "}
              </p>
            </div>
            <span onClick={showCheckoutForm}>Edit</span> {/* */}
          </div>
        </div>
        <div className="payment_contact">
          <h2>Shipping method</h2>
          <div className="contact">
            <div className="contact_content">
              <h3>Giao Hàng Tiết Kiệm </h3>
              <p>
                This carrier delivers in 1-2 working day
                <br /> (expected delivery in the next 24-48 hours because of
                Covid-19)
              </p>
            </div>
          </div>
        </div>

        <div className="payment_contact">
          <h2>Payment method</h2>
          <div className="contact">
            <div className="contact_content">
              <h3>{shippingStorage.methodTitle}</h3>
              <p>
                {shippingStorage.methodContent} <br />{" "}
                {shippingStorage.methodNote}
              </p>
            </div>
            <span onClick={showCheckoutForm}>Edit</span>
          </div>
        </div>

        <div className="required">
          <b>* Required Field</b>
        </div>
        <div className="payment_btn">
          <button type="button" className="edit" onClick={showCheckoutForm}>
            Shipping method
          </button>
          <button
            type="submit"
            className="payment"
            onClick={() => handleOpenPaypal()}
          >
            Order
          </button>
        </div>
      </form>
      <div className={isOpenPaypal ? "show_payment" : "disable_payment"}>
        <PaypalButton paymentInfo={paymentInfo} />
      </div>
    </div>
  );
}

export default Payment;
