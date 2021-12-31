import { update } from "actions/shippingAction";
import axios from "axios";
import Payment from "components/Payment";
import Images from "constants/images";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import "./Checkout.css";

function Checkout(props) {
  const cookies = new Cookies();
  const cartStorage = useSelector((state) => state.cart);
  const shippingStorage = useSelector((state) => state.shipping);
  const account = cookies.get("account");
  const history = useHistory();
  const dispatch = useDispatch();

  const { orderList } = cartStorage;

  const [firstName, setFirstName] = useState(shippingStorage.firstName);
  const [lastName, setLastName] = useState(shippingStorage.lastName);
  const [address, setAddress] = useState(shippingStorage.address);
  const [district, setDistrict] = useState(shippingStorage.district);
  const [ward, setWard] = useState(shippingStorage.ward);
  const [city, setCity] = useState("Ho Chi Minh");
  const [mobile, setMobile] = useState(account.phone);
  const [paymentMethod, setPaymentMethod] = useState(
    shippingStorage.paymentMethod
  );

  //

  const [checked, setChecked] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState(true);
  const [expandedPackage, setExpandedPackage] = useState(false);
  const [expandedShipping, setExpandedShipping] = useState(false);
  const [expandedCustomer, setExpandedCustomer] = useState(false);

  const [methodTitle, setmMethodTitle] = useState("");
  const [methodContent, setMethodContent] = useState("");
  const [methodNote, setMethodNote] = useState("");
  const [listCart, setListCart] = useState([]);

  var [totalPrice, setTotalPrice] = useState(0);
  var [shipPrice, setShipPrice] = useState(0);
  var [lastOrderInfo, setLastOrderInfo] = useState({});

  useEffect(() => {
    setListCart(listCart);
  }, [listCart]);

  useEffect(() => {
    getCart();
  }, [window.location.href]);

  useEffect(() => {
    lastCart();
  }, []);

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 48 ~ Checkout ~ paymentMethod",
      paymentMethod
    );
  }, [paymentMethod]);

  const lastCart = async () => {
    try {
      const res = await axios.get(
        `/api/users/orders/user=${account.accountId}/last`
      );
      console.log("🚀 ~ file: index.jsx ~ line 60 ~ useEffect ~ res", res);
      lastOrderInfo = res.data;
      setLastOrderInfo(lastOrderInfo);

      if (Object.keys(lastOrderInfo).length > 0) {
        setFirstName(lastOrderInfo.receiverFirstName);
        setLastName(lastOrderInfo.receiverLastName);
        setWard(lastOrderInfo.shipWard);
        setDistrict(lastOrderInfo.shipDistrict);
        setAddress(lastOrderInfo.shipAddress);
      } else {
        setFirstName("");
        setLastName("");
        setWard("");
        setDistrict("");
        setAddress("");
      }
    } catch (error) {
      if (error.response.status === 400) return;
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

  const getCart = async () => {
    try {
      const res = await axios.get(
        `/api/users/carts/user=${account.accountId}/able`
      );
      console.log("🚀 cart res : ", res.data.detailDto);

      setListCart(res.data.detailDto);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("send info to redux...");

    dispatch(
      update({
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        district: values.district,
        ward: values.ward,
        paymentMethod,
        mobile,
        methodTitle,
        mobile,
        methodContent,
        methodNote,
      })
    );
    console.log(
      "🚀 ~ file: index.jsx ~ line 141 ~ handleSubmit ~ info data : ",
      dispatch(
        update({
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          district: values.district,
          ward: values.ward,
          mobile,
          methodTitle,
          paymentMethod,
          methodContent,
          methodNote,

          // bankId,
          // bankingNote,
          // methodBanking,
        })
      )
    );
    setTimeout(() => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      setShowPayment(true);
      setCheckoutForm(false);
      console.log("value : ", values);
      setSubmitting(false);
    }, 2000);
  };

  const goToCart = () => {
    history.push("/cart");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const activeDeliver = (id, title, content, note) => {
    setPaymentMethod(id);
    setmMethodTitle(title);
    setMethodContent(content);
    setMethodNote(note);
    console.log(
      "🚀 ~ file: index.jsx ~ line 185 ~ activeDeliver ~ id, title",
      id,
      title
    );
  };

  const handleCountSub = () => {
    var x = orderList.reduce((sum, item) => {
      return sum + item.quantity * item.unitPrice;
    }, 0);

    var subTotalPrice = parseFloat(x * 1000).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
      // minimumFractionDigits: 3,
    });

    return subTotalPrice || x === 0 ? subTotalPrice : 0;
  };

  const handleFinalPrice = () => {
    var subTotal = orderList.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    var shipRate = handleShipping();

    totalPrice = (subTotal * (100 + shipRate)) / 100;
    // setTotalPrice(totalPrice);

    var result = parseFloat(totalPrice * 1000).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
      // minimumFractionDigits: 3,
    });

    // setTotalPrice(totalPrice);

    return result || result === 0 ? result : 0;
  };

  const handleShipping = () => {
    var qty = orderList.reduce((sum, item) => sum + item.quantity, 0);
    if (qty <= 5) return 0;
    if (qty <= 10) return 5;
    if (qty <= 20) return 10;
    return 15;
  };

  const initialValues = {
    firstName: firstName ? firstName : "",
    lastName: lastName ? lastName : "",
    address: address ? address : "",
    ward: ward ? ward : "",
    district: district ? district : "",
    mobile: account.phone ? account.phone : "",
  };

  const otherValues = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    ward: ward,
    district: district,
    mobile: account.phone,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Invalid")
      .max(10, "Invalid")
      .required("This field is required")
      .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),

    lastName: Yup.string()
      .min(2, "Password is invalid")
      .max(10, "Password is invalid")
      .required("This field is required")
      .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),

    address: Yup.string()
      .min(2, "Invalid")
      .max(30, "Invalid")
      .required("This field is required"),

    district: Yup.string()
      .min(2, "Invalid")
      .max(30, "Invalid")
      .required("This field is required"),

    ward: Yup.string()
      .min(2, "Invalid")
      .max(30, "Invalid")
      .required("This field is required"),

    mobile: Yup.string()
      .required("This field is required")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Your phone number is not available"
      ),
  });

  return (
    <div className="checkout_container">
      <div className="checkout_content">
        <div className={checkoutForm ? "checkout_address" : "close_address"}>
          <h2>Shipping address</h2>
          <Formik
            validationSchema={validationSchema}
            initialValues={otherValues ? otherValues : initialValues}
            onSubmit={(values, { setSubmitting }) =>
              handleSubmit(values, { setSubmitting })
            }
            enableReinitialize
          >
            {(formikProps) => {
              const { values, errors, isSubmitting, touched } = formikProps;
              console.log({ values, errors, touched });
              return (
                <Form
                  // onSubmit={handleSubmit}
                  className="address_content"
                >
                  <div className="address_input">
                    <input
                      type="text"
                      placeholder={`${address} ${district}, ${ward}, ${city} city`}
                    />
                  </div>
                  <ul className="address_info">
                    <li className="address_info-content">
                      <label htmlFor="">Surname *</label>
                      <label htmlFor="">{account.lastName} </label>
                      <Field
                        type="text"
                        name="firstName"
                        placeholder={firstName === "" ? "Surname *" : firstName}
                        spellCheck="false"
                      />
                      <ErrorMessage name="firstName" />
                    </li>
                    <li className="address_info-content">
                      <Field
                        type="text"
                        name="lastName"
                        // onChange={(e) => setFirstName(e.target.value)}
                        placeholder={lastName === "" ? "name *" : lastName}
                        spellCheck="false"
                      />
                      <ErrorMessage name="lastName" />
                    </li>
                    <li className="address_info-content">
                      <input
                        type="email"
                        spellCheck="false"
                        value={account.email}
                        readOnly
                      />
                    </li>
                    <li className="address_info-content">
                      <p>
                        <b>Country * </b>We currently deliver in Ho Chi Minh
                        City only{" "}
                      </p>
                    </li>
                    <li className="address_info-content">
                      <Field
                        type="text"
                        name="ward"
                        placeholder={ward === "" ? "Ward *" : ward}
                        spellCheck="false"
                      />
                      <ErrorMessage name="ward" />
                    </li>
                    <li className="address_info-content">
                      <Field
                        type="text"
                        name="district"
                        placeholder={district === "" ? "district *" : district}
                        spellCheck="false"
                      />
                      <ErrorMessage name="district" />
                    </li>
                    <li className="address_info-content">
                      <Field
                        type="text"
                        name="address"
                        placeholder={address === "" ? "Address *" : address}
                        spellCheck="false"
                      />
                      <ErrorMessage name="address" />
                    </li>

                    <li className="address_info-content">
                      <input
                        type="text"
                        value={city}
                        spellCheck="false"
                        readOnly
                      />
                    </li>
                    <li className="address_info-content">
                      <p>
                        <b>Mob * </b>We will use it to contact you about the
                        deliver of your order, if necessary{" "}
                      </p>
                    </li>
                    <li className="address_info-content">
                      <input
                        type="text"
                        value="+84 *"
                        spellCheck="false"
                        readOnly
                      />
                    </li>
                    <li className="address_info-content">
                      <Field
                        type="text"
                        name="mobile"
                        placeholder={account.phone ? account.phone : ""}
                        spellCheck="false"
                      />
                      <ErrorMessage name="mobile" />
                    </li>

                    <li className="address_info-content">
                      <label className="required">* Required Field</label>
                    </li>
                  </ul>

                  <div className="checkout_delivery">
                    <h2>Payment Method</h2>
                    <div className="delivery_content">
                      <p>
                        Orders placed before 11.30am are shipped the same day
                        and delivered the next working day
                      </p>

                      <label
                        onClick={() =>
                          activeDeliver(
                            0,
                            "Paypal",
                            "The following transfer time is within 1-3 days",
                            "(Transfer fee, money transfer is calculated according to the time of order confirmation. When selecting a Charge Beneficiary, the fee amount will be deducted from the transfer amount.)"
                          )
                        }
                        style={{
                          background:
                            paymentMethod === 0
                              ? "rgb(251, 241, 241)"
                              : "rgb(245, 245, 245)",
                          transition: "background 0.5s ease-in-out",
                        }}
                      >
                        <div className="deliver_text">
                          <h3>Paypal</h3>
                          <p>
                            The following transfer time is within 1-3 days{" "}
                            <br /> ( Transfer fee, money transfer is calculated
                            according to the time of order confirmation. )
                          </p>
                        </div>
                        <input
                          type="radio"
                          name="radio"
                          defaultChecked={checked}
                          onChange={() => setChecked(!checked)}
                        />
                        <span class="checkmark"></span>
                      </label>

                      <label
                        onClick={() =>
                          activeDeliver(
                            1,
                            "COD",
                            "The following transfer time is within 1-3 days",
                            "( customer will pay after receiving the goods )"
                          )
                        }
                        style={{
                          background:
                            paymentMethod === 1
                              ? "rgb(251, 241, 241)"
                              : "rgb(245, 245, 245)",
                          transition: "background 0.5s ease-in-out",
                        }}
                      >
                        <div className="deliver_text">
                          <h3>COD</h3>
                          <p>
                            The following transfer time is within 1-3 days{" "}
                            <br /> ( customer will pay after receiving the goods
                            )
                          </p>
                        </div>
                        <input
                          type="radio"
                          name="radio"
                          defaultChecked={checked}
                          onChange={() => setChecked(!checked)}
                        />
                        <span class="checkmark"></span>
                      </label>
                    </div>
                    <div className="required">
                      <b>* Required Field</b>
                    </div>
                    <div className="checkout_btn">
                      <button className="edit" onClick={goToCart}>
                        Back to Shopping Bag
                      </button>
                      <button
                        type="submit"
                        className="payment"
                        // onClick={showPaymentForm}
                      >
                        Go to payment
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>

        <Payment
          paymentMethod={paymentMethod}
          checkoutForm={checkoutForm}
          setCheckoutForm={setCheckoutForm}
          showPayment={showPayment}
          setShowPayment={setShowPayment}
        />

        <div className="checkout_bag">
          <h2>Your Shopping Bag</h2>
          {orderList && orderList.length === 0 && (
            <div className="cart_empty">
              <div className="cart_empty_body">
                <img
                  src={Images.OH_SHEET_JERRY}
                  alt=""
                  className="cart_empty_body_img"
                />
                <span className="cart_empty_body_text">
                  What are you doing here? Go buy some things
                </span>
                <button
                // onClick={goToMenu}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
          <ul className="checkout_item">
            {orderList &&
              orderList.length !== 0 &&
              orderList.map((item, key) => {
                return (
                  <li key={key}>
                    <img
                      className="cart_img"
                      src={item.product.image}
                      alt="img"
                    />
                    <p className="cart_name">{item.product.productName}</p>
                    <p className="cart_price">{item.product.unitPrice}.000</p>
                    <div className="quantity">
                      <span className="qty">
                        Qty. {item.quantity}
                        {/* {item.qty} */}
                      </span>
                    </div>
                  </li>
                );
              })}
          </ul>
          <div className="checkout_price">
            <div className="row">
              <div className="col_2">Subtotal</div>
              <div className="col_1">{handleCountSub()} </div>
            </div>
            <div className="row">
              <div className="col_2">Shipping</div>
              <div className="col_1">{handleShipping()}% </div>
            </div>
            <div className="row">
              <div className="col_2">VAT (included)</div>
              <div className="col_1">10% </div>
            </div>
          </div>

          <div className="checkout_cost-totalPrice">
            <div className="row total">
              <div className="col_2">Total</div>
              <div className="col_1"> {handleFinalPrice()}</div>
            </div>
          </div>

          <div className="checkout_help">
            <h2>Need help?</h2>
            <div className="help_content">
              <div
                className="help_content-title"
                onClick={() => setExpandedPackage(!expandedPackage)}
              >
                <p>Packaging</p>
                <span className="toggle">
                  {" "}
                  <i
                    class={
                      expandedPackage ? "fa fa-angle-down" : "fa fa-angle-up  "
                    }
                    aria-hidden="true"
                  ></i>
                </span>
              </div>

              <div
                className={
                  expandedPackage ? " content_text-open" : "help_content-text"
                }
              >
                <div
                  className={
                    expandedPackage
                      ? "content-text content-text-open"
                      : "content-text"
                  }
                >
                  <p>
                    To guarantee the best experience of receiving our product,
                    the package you will receive will not show anything on the
                    outside that could reveal its contents, in order to avoid
                    generating interest from third or malicious parties.
                  </p>
                </div>
              </div>
            </div>

            <div className="help_content">
              <div
                className="help_content-title"
                onClick={() => setExpandedShipping(!expandedShipping)}
              >
                <p>Shipping</p>
                <span className="toggle">
                  {" "}
                  <i
                    class={
                      expandedShipping ? "fa fa-angle-up" : "fa fa-angle-down"
                    }
                    aria-hidden="true"
                  ></i>
                </span>
              </div>
              <div
                className={
                  expandedShipping ? " content_text-open" : "help_content-text"
                }
              >
                <div
                  className={
                    expandedShipping
                      ? "content-text content-text-open"
                      : "content-text"
                  }
                >
                  <p>
                    To guarantee the best experience of receiving our product,
                    the package you will receive will not show anything on the
                    outside that could reveal its contents, in order to avoid
                    generating interest from third or malicious parties.
                  </p>
                </div>
              </div>
            </div>

            <div className="help_content">
              <div
                className="help_content-title"
                onClick={() => setExpandedCustomer(!expandedCustomer)}
              >
                <p>Customer care</p>
                <span className="toggle">
                  {" "}
                  <i
                    class={
                      expandedCustomer ? "fa fa-angle-up" : "fa fa-angle-down"
                    }
                    aria-hidden="true"
                  ></i>
                </span>
              </div>
              <div
                className={
                  expandedCustomer ? "content_text-open" : "help_content-text"
                }
              >
                <div
                  className={
                    expandedCustomer
                      ? "content-text content-text-open"
                      : "content-text"
                  }
                >
                  <p>
                    To guarantee the best experience of receiving our product,
                    the package you will receive will not show anything on the
                    outside that could reveal its contents, in order to avoid
                    generating interest from third or malicious parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
