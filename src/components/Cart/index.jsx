import { storeOrder } from "actions/Cart";
import axios from "axios";
import Banner from "components/Banner";
import Images from "constants/images";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Prompt, useHistory } from "react-router";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import styles from "./Cart.module.css";

Cart.propTypes = {};

function Cart(props) {
  const cookies = new Cookies();
  const history = useHistory();
  const dispatch = useDispatch();

  const account = cookies.get("account");

  const [listCart, setListCart] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [count, setCount] = useState(1);
  var [listTicked, setListTicked] = useState([]);
  var [isCheckedAll, setIsCheckedAll] = useState(false);

  useEffect(() => {
    setListCart(listCart);
  }, [listCart]);

  useEffect(() => {
    if (!account || !account.accountId) return;
    console.log("list", listCart);
    getCart();
  }, []);

  useEffect(() => {
    window.onbeforeunload = function (event) {
      event.preventDefault();
      setOpenConfirm(!openConfirm);

      event.returnValue = "12124";
    };
  });

  useEffect(() => {
    if (!openConfirm) return;
    const result = window.confirm("Do u want to save the changes ? ");
    if (result) callAPI();
  }, [openConfirm]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 64 ~ Cart ~ isCheckedAll",
      isCheckedAll
    );

    if (!isCheckedAll) return setListTicked([]);
    setIsCheckedAll(isCheckedAll);
  }, [isCheckedAll]);

  useEffect(() => {
    setListTicked(listTicked);
    console.log(
      "🚀 ~ file: index.jsx ~ line 79 ~ Cart ~ listTicked",
      listTicked
    );
  }, [listTicked]);

  const getCart = async () => {
    if (!account || !account.accountId) return;
    try {
      const res = await axios.get(
        `/api/users/carts/user=${account.accountId}/able`
      );
      console.log("🚀 cart res : ", res);

      setListCart(res.data.detailDto);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const goToCheckout = () => {
    dispatch(storeOrder(listCart));

    history.push("/checkout");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const goToMenu = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    history.push("/product/");
  };

  const totalPayment = () => {
    var x = listCart.reduce((sum, item) => {
      return sum + item.quantity * item.unitPrice;
    }, 0);

    var paymentPrice = parseFloat(x * 1000).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
      // minimumFractionDigits: 3,
    });

    return paymentPrice || x === 0 ? paymentPrice : 0;
  };

  const onDecreaseQty = (item) => {
    if (item.quantity === 1) return alert("tạch");
    item.quantity = item.quantity - 1;
    setCount(item.quantity);

    item.finalPrice = item.unitPrice * item.quantity;

    console.log("🚀 item", item);
  };

  const onIncreaseQty = (item) => {
    item.quantity = item.quantity + 1;
    setCount(item.quantity);

    var allDiscountRate = item.discountValue + item.memberValue;

    item.finalPrice =
      (item.unitPrice * item.quantity * (100 - allDiscountRate)) / 100;
    console.log("🚀 item", item);
  };

  const onDelete = async (item) => {
    console.log("item delete : ", item);
    try {
      const res = await axios.delete(
        `/api/users/carts/details/user=${account.accountId}/product=${item.productId}`
      );
      console.log("🚀 res del", res);
      var index = listCart.findIndex((elm) => elm.productId === item.productId);
      console.log("🚀 ~ file: index.jsx ~ line 94 ~ onDelete ~ index", index);
      listCart.splice(index, 1);
      console.log(
        "🚀 ~ file: index.jsx ~ line 97 ~ onDelete ~ listCart",
        listCart
      );
      setListCart(listCart);
      item.quantity = item.quantity - 1;
      setCount(item.quantity);
      // setListCart(listCart);
    } catch (error) {
      if (error && error.response) console.log(error.response.data);
    }
  };

  const handleDeleteAll = async () => {
    console.log("list ticked : ", listTicked.length, listCart.length);

    try {
      const res = await axios.delete(
        `api/users/carts/details/user=${account.accountId}/all`
      );
      console.log(
        "🚀 ~ file: index.jsx ~ line 159 ~ handleDeleteAll ~ res",
        res
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleDelPart = async () => {
    if (listTicked.length === 0) return alert("tạch");

    const body = {
      data: listTicked,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      },
    };
    console.log("list ticked : ", listTicked.length, listCart.length);
    try {
      const res = await axios.delete(
        `api/users/carts/details/user=${account.accountId}/list`,
        body,
        config
      );
      console.log(
        "🚀 ~ file: index.jsx ~ line 159 ~ handleDeleteAll ~ res",
        res
      );
      var a = listCart.filter((item) => !listTicked.includes(item));
      console.log("🚀 ~ file: index.jsx ~ line 213 ~ handleDelPart ~ a", a);

      setListCart(a);
      setIsCheckedAll(!isCheckedAll);
      check(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleCheckAll = () => {
    var a = listCart;
    isCheckedAll = !isCheckedAll;
    setIsCheckedAll(isCheckedAll);

    isCheckedAll ? check() : check(false);
    isCheckedAll ? setListTicked(a) : setListTicked([]);
  };

  const onTicked = (e, item) => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 194 ~ handleCheckAll ~ listCart",
      listCart
    );

    console.log("🚀 ~ file: index.jsx ~ line 160 ~ onTicked ~ item", item);

    var index = listTicked.findIndex((el) => item.productId === el.productId);
    console.log("🚀 ~ file: index.jsx ~ line 161 ~ onTicked ~ index", index);

    if (index < 0) {
      listTicked.push(item);
      console.log(
        "🚀 ~ file: index.jsx ~ line 172 ~ onTicked ~ listTicked",
        listTicked
      );
    } else {
      listTicked = listTicked.filter((el) => item.productId !== el.productId);
      console.log(
        "🚀 ~ file: index.jsx ~ line 175 ~ onTicked ~ listTicked",
        listTicked
      );
    }
    console.log(
      "🚀 ~ file: index.jsx ~ line 194 ~ handleCheckAll ~ listCart",
      listCart
    );
    setListTicked(listTicked);
  };

  function check(checked = true) {
    const cbs = document.querySelectorAll('input[name="cart_item"]');
    cbs.forEach((cb) => {
      cb.checked = checked;
    });
  }

  const callAPI = async () => {
    const body = listCart;
    try {
      const res = await axios.put(
        `api/users/carts/details/user=${account.accountId}`,
        body
      );

      console.log("🚀 ~ file: index.jsx ~ line 243 ~ callAPI ~ res", res);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <Prompt
        message={(location, action) => {
          const result = window.confirm("Do u want to save the changes ? ");
          if (result) callAPI();
          return result;
        }}
      />

      <Banner title="My Cart" backgroundUrl={Images.SPACE2} />

      <div className={styles.cart}>
        <div className={styles.cart_header}>
          <div className={styles.cart_header_container}>
            <div className={styles.cart_header_logo}>
              <span>Tour des Gâteau</span>
              <span>Cart</span>
            </div>
          </div>
        </div>

        <div className={styles.cart_body}>
          {listCart && listCart.length === 0 && (
            <div className={styles.cart_empty}>
              <div className={styles.cart_empty_body}>
                <img
                  src={Images.OH_SHEET_JERRY}
                  alt=""
                  className={styles.cart_empty_body_img}
                />
                <span className={styles.cart_empty_body_text}>
                  What are you doing here? Go buy some things
                </span>
                <button onClick={goToMenu}>Continue Shopping</button>
              </div>
            </div>
          )}
          {/*  */}
          {listCart && listCart.length !== 0 && (
            <div className={styles.cart_body_container}>
              <div className={styles.cart_body_container_header}>
                <div className={styles.cart_body_container_header_left}>
                  <input type="checkbox" />
                  <span>Product</span>
                </div>
                <div className={styles.cart_body_container_header_right}>
                  <span>Price</span>
                  <span>Quantity</span>
                  <span>Total price</span>
                  <span>Operation</span>
                </div>
              </div>

              <ul className={styles.list_container}>
                {console.log("list cart : ", listCart)}
                {listCart &&
                  listCart.map((item, id) => {
                    return (
                      <li className={styles.list_item} key={id}>
                        <div className={styles.item_and_discount}>
                          <div className={styles.cart_body_container_body}>
                            <div
                              className={styles.cart_body_container_body_left}
                            >
                              <input
                                name="cart_item"
                                onChange={(e) => onTicked(e, item)}
                                // checked={isCheckedAll ? true : }
                                type="checkbox"
                              />

                              <div className={styles.container_body_left_item}>
                                <div
                                  className={
                                    styles.container_body_left_item_img
                                  }
                                >
                                  <Link
                                    to={`/product/item-detail/${item.productId}`}
                                  >
                                    <img
                                      src={item.product.image}
                                      alt={item.product.productName}
                                    />
                                  </Link>
                                </div>
                                <span>{item.product.productName}</span>
                              </div>
                              <div className={styles.container_body_left_size}>
                                Size
                                <span>{item.product.size.sizeName} </span>
                              </div>
                            </div>
                            <div
                              className={styles.cart_body_container_body_right}
                            >
                              <div
                                className={styles.container_body_right_price}
                              >
                                {parseFloat(
                                  item.product.unitPrice * 1000
                                ).toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                  // minimumFractionDigits: 3,
                                })}
                              </div>
                              <div
                                className={styles.container_body_right_quantity}
                              >
                                <div className={styles.quantity_inner}>
                                  <button
                                    disabled={item.qty === 1}
                                    onClick={() => onDecreaseQty(item)}
                                  >
                                    <svg
                                      enableBackground="new 0 0 10 10"
                                      viewBox="0 0 10 10"
                                      x="0"
                                      y="0"
                                      className={styles.quantity_minus_icon}
                                    >
                                      <polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon>
                                    </svg>
                                  </button>
                                  <input
                                    type="text"
                                    value={item.quantity}
                                    readOnly
                                  />
                                  <button onClick={() => onIncreaseQty(item)}>
                                    <svg
                                      enableBackground="new 0 0 10 10"
                                      viewBox="0 0 10 10"
                                      x="0"
                                      y="0"
                                      className={styles.quantity_plus_icon}
                                    >
                                      <polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              <div
                                className={styles.container_body_right_total}
                              >
                                {parseFloat(
                                  item.finalPrice * 1000
                                ).toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </div>
                              <div
                                className={styles.container_body_right_delete}
                              >
                                <button onClick={() => onDelete(item)}>
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className={styles.discount}>
                            <div className={styles.discount_border}>
                              <span>
                                <i class="fas fa-ticket-alt">
                                  &nbsp; Event&nbsp;:
                                </i>
                                <p>{item.discountValue * 100}% </p>
                              </span>
                              <span>
                                <i class="fas fa-address-card">
                                  &nbsp; Membership&nbsp;:
                                </i>
                                <p>{item.memberValue * 100}%</p>
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                {/*
                 */}
              </ul>

              <div className={styles.cart_footer}>
                <div className={styles.cart_footer_container}>
                  <div className={styles.footer_container_coin_line}>
                    <span className={styles.total_payment}>Total payment </span>
                    <span className={styles.total_payment_num}>
                      {totalPayment()}
                    </span>
                  </div>
                  <div className={styles.footer_container_total_price_line}>
                    <div className={styles.total_price_line_left}>
                      <input
                        type="checkbox"
                        id="select_all"
                        checked={isCheckedAll}
                        className={styles.select_all_box}
                      />
                      <label
                        htmlFor="select_all"
                        className={styles.select_all_label}
                        onClick={handleCheckAll}
                      >
                        {" "}
                        Select all
                      </label>
                      <button
                        onClick={() =>
                          isCheckedAll && listTicked.length === listCart.length
                            ? handleDeleteAll()
                            : handleDelPart()
                        }
                        className={styles.delete_btn}
                      >
                        Delete
                      </button>
                    </div>
                    <div className={styles.total_price_line_right}>
                      <button
                        onClick={goToCheckout}
                        className={styles.order_btn}
                      >
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
