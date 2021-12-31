import axios from "axios";
import Images from "constants/images";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import styles from "../Header/Header.module.css";
import add from "./CartHover.module.css";

function CartHover(props) {
  const cookies = new Cookies();
  const account = cookies.get("account");
  const history = useHistory();

  const [listCart, setListCart] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (!account || !account.accountId) return;
    getCart();
  }, []);

  const goToCart = () => {
    history.push("/cart");
  };

  const numberOfItems = showMore ? listCart.length : 5;

  const getCart = async () => {
    try {
      const res = await axios.get(
        `/api/users/carts/user=${account.accountId}/able`
      );
      console.log("🚀 cart hover : ", res);

      setListCart(res.data.detailDto);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <div className={styles.header_cart_list}>
        {listCart.length === 0 && (
          <div className={styles.header_cart_list_no_item}>
            <img src={Images.IMG_NULL} alt="" />
            <span>You have not bought anything yet</span>
          </div>
        )}

        {listCart.length !== 0 && (
          <div className={styles.header_cart_list_box}>
            <div className={styles.header_cart_list_header}>
              <span>Product in cart</span>
            </div>

            <div className={styles.header_cart_list_body}>
              <ul className={styles.header_cart_list_container}>
                {listCart.slice(0, numberOfItems).map((item, key) => {
                  return (
                    <li key={key} className={styles.header_cart_list_item}>
                      <div className={styles.item_product}>
                        <Link to={`/product/item-detail/${item.id}`}>
                          <img
                            src={item.product.image}
                            alt=""
                            className={styles.item_product_img}
                          />
                        </Link>
                        <span className={styles.item_product_name}>
                          {item.product.productName}
                        </span>
                      </div>
                      <div className={styles.item_price}>
                        {item.product.unitPrice}.000 VND
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={styles.header_cart_list_footer}>
              <button className={styles.header_cart_list_footer_btn}>
                <span
                  className={styles.header_cart_list_footer_btn_text}
                  onClick={goToCart}
                >
                  View Cart
                </span>
              </button>
            </div>
          </div>
        )}

        {listCart.length > 5 && (
          <div className={add.more}>
            <button onClick={() => setShowMore(!showMore)}>
              <p>
                {
                  showMore
                    ? "Show less"
                    : `Show ${
                        listCart.slice(4, numberOfItems).length
                      } more in cart`
                  // "Show more"
                }
              </p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartHover;
