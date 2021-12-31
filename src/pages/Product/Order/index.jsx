import { faScroll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Zoom from "react-reveal/Zoom";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";
import styles from "./Order.module.css";

function Order(props) {
  const cookies = new Cookies();
  const history = useHistory();

  const showForm = useSelector((state) => state.form.showForm);

  const account = cookies.get("account");

  var [orderList, setOrderList] = useState([]);

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    try {
      const res = await axios.get(
        `/api/users/orders/user=${account.accountId}`
      );
      console.log("🚀 ~ file: index.jsx ~ line 64 ~ getOrder ~ res", res);

      orderList = res.data;

      setOrderList(orderList);

      console.log(
        "🚀 ~ file: index.jsx ~ line 64 ~ getOrder ~ detailDTO",
        res.data.cartId
      );
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };
  const handlingColor = {
    color: "#930061",
  };

  const completedColor = {
    color: "#48FF5A",
  };

  const toReceiveColor = {
    color: "#4785FF",
  };

  const toShip = {
    color: "#FFBF5F",
  };

  const newColor = {
    color: "#2BD0D0",
  };

  const cancleColor = {
    color: "#FF4848",
  };

  const handleStatusDescribe = (item) => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 61 ~ handleStatusDescribe ~ item",
      item
    );
    if (item.statusId === 1)
      return <b style={handlingColor}>{item.description} </b>;

    if (item.statusId === 2) return <b style={toShip}>{item.description} </b>;

    if (item.statusId === 3)
      return <b style={toReceiveColor}>{item.description} </b>;

    if (item.statusId === 4)
      return <b style={completedColor}>{item.description} </b>;

    if (item.statusId === 5)
      return <b style={cancleColor}>{item.description} </b>;

    if (item.statusId === 6) return <b style={newColor}>{item.description} </b>;
  };

  const handleStatusName = (item) => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 61 ~ handleStatusDescribe ~ item",
      item
    );
    if (item.statusId === 1)
      return <b style={handlingColor}>{item.statusName} </b>;

    if (item.statusId === 2) return <b style={toShip}>{item.statusName} </b>;

    if (item.statusId === 3)
      return <b style={toReceiveColor}>{item.statusName} </b>;

    if (item.statusId === 4)
      return <b style={completedColor}>{item.statusName} </b>;

    if (item.statusId === 5)
      return <b style={cancleColor}>{item.statusName} </b>;

    if (item.statusId === 6) return <b style={newColor}>{item.statusName} </b>;
  };

  return (
    <div>
      <div
        className={
          showForm === "Order" ? `${styles.order}` : `${styles.disable_order}`
        }
      >
        <div className={styles.all_order}>
          {orderList.length === 0 && (
            <Zoom delay={200}>
              <div className={styles.empty_order}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faScroll}
                  size="4x"
                  style={{ color: "#0c7d97" }}
                />
                <h2>
                  Oops! <br />
                  You have no Order in this list.
                </h2>
              </div>
            </Zoom>
          )}
          {orderList.length !== 0 && (
            <ul className={styles.cart_list}>
              {orderList.map((item, key) => {
                return (
                  <li className={styles.list_item} key={key}>
                    <ul className={styles.order_item}>
                      {item.cartDto.detailDto.map((i, key) => {
                        return (
                          <li key={key} className={styles.item_detail}>
                            <img
                              className={styles.item_img}
                              onClick={() =>
                                history.push(
                                  `/product/item-detail/${i.productId}`
                                )
                              }
                              src={i.product.image}
                              alt={i.product.productName}
                            />
                            <div className={styles.item_info}>
                              <p className={styles.item_name}>
                                {i.product.productName}
                              </p>

                              <p className={styles.item_size}>For Invidual</p>

                              <div className={styles.quantity}>
                                <span className={styles.item_price}>
                                  Cost per unit{" "}
                                  <b>
                                    {" "}
                                    {parseFloat(
                                      i.unitPrice * 1000
                                    ).toLocaleString("it-IT", {
                                      style: "currency",
                                      currency: "VND",
                                      // minimumFractionDigits: 3,
                                    })}
                                  </b>{" "}
                                </span>

                                <span className={styles.qty}>
                                  Qty.
                                  {i.quantity}
                                </span>

                                <span className={styles.discount_price}>
                                  Discount{" "}
                                  <b className={styles.discount}>-2% </b>
                                </span>
                              </div>
                            </div>

                            <div className={styles.finalPrice}>
                              <h2 className={styles.final_title}>Final</h2>
                              <p className={styles.final}>
                                {parseFloat(
                                  item.cartDto.totalPrice * 1000
                                ).toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                  // minimumFractionDigits: 3,
                                })}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    <div className={styles.info_detail}>
                      <div className={styles.line}></div>
                      <div className={styles.totalPrice}>
                        <h2 className={styles.title}>
                          <b className={`${styles.highlight} ${styles.stt}`}>
                            Total{" "}
                          </b>
                          (Included VAT 10%)
                        </h2>
                        <h2 className={`${styles.total} ${styles.brice}`}>
                          {parseFloat(
                            item.finalTotalPrice * 1000
                          ).toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                            // minimumFractionDigits: 3,
                          })}
                        </h2>
                      </div>
                      <div className={`${styles.status} ${styles.totalPrice}`}>
                        <h2 className={styles.title}>
                          Status ( {handleStatusName(item.status)} ){" "}
                          <b className={`${styles.highlight} ${styles.proc}`}>
                            {/* In Handle */}
                            {handleStatusDescribe(item.status)}
                          </b>
                        </h2>
                        <p className={styles.total}>
                          Payment :{" "}
                          <b>{item.paymentMethod === 0 ? "Paypal" : "COD"} </b>
                        </p>
                        <p className={styles.total}>
                          Date {item.createdAt.substring(0, 10)}{" "}
                        </p>
                      </div>

                      <div className={`${styles.status} ${styles.totalPrice}`}>
                        <h2 className={styles.title}>
                          Receiver: {item.receiverLastName}{" "}
                          {item.receiverFirstName}{" "}
                        </h2>
                        <p className={styles.total}>Phone: {account.phone} </p>
                      </div>

                      <div className={`${styles.address} ${styles.totalPrice}`}>
                        <p className={styles.title}>
                          {item.shipAddress} {item.shipDistrict},{" "}
                          {item.shipWard}, Ho Chi Minh City
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
