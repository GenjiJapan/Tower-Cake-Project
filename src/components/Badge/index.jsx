import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import styles from "./Badge.module.css";

function Badge(props) {
  const cookies = new Cookies();
  const account = cookies.get("account");
  var [listCart, setListCart] = useState([]);

  useEffect(() => {
    if (!account || !account.accountId) return;
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const res = await axios.get(
        `/api/users/carts/user=${account.accountId}/able`
      );
      console.log("🚀 cart hover : ", res);

      listCart = res.data.detailDto;

      setListCart(listCart);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      {listCart.length !== 0 && (
        <span className={styles.count_cicle}>{listCart.length} </span>
      )}
    </div>
  );
}

export default Badge;
