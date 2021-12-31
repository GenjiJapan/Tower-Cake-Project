import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Images from "constants/images";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./OurCake.module.css";

function OurCake(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  var [bestSellerList, setBestSellerList] = useState([]);
  useEffect(() => {
    getBestSeller();
  }, []);
  const getBestSeller = async () => {
    try {
      const res = await axios.get(
        `/api/products/ratings/statistic/products/topratings`
      );
      console.log("🚀 ~ file: index.jsx ~ line 15 ~ getBestSeller ~ res", res);
      bestSellerList = res.data;
      setBestSellerList(bestSellerList);
      setIsLoading(true);
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

  const handleAddToDetail = (id) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    history.push(`/product/item-detail/${id}`);
  };
  return (
    <div>
      <div className={styles.space_top_our_cake}></div>

      <div className={styles.our_cake} id="section_3">
        <div className={styles.our_cake_header}>
          <span className={styles.our_cake_header_content}>
            Our cakes, your choices
          </span>
        </div>
        <div className={styles.our_cake_bg_border}>
          <div className={styles.our_cake_bg}>
            <div className={styles.our_cake_carousel}>
              <div id="myCarousel1" class="carousel slide" data-ride="carousel">
                {/* <!-- Indicators --> */}
                <ol class="carousel-indicators" style={{ top: "460px" }}>
                  <li
                    data-target="#myCarousel1"
                    data-slide-to="0"
                    class="active"
                    style={{
                      height: "15px",
                      width: "15px",
                      boxShadow: "0px 5px 10px #888",
                    }}
                  ></li>
                  <li
                    data-target="#myCarousel1"
                    data-slide-to="1"
                    style={{
                      height: "15px",
                      width: "15px",
                      boxShadow: "0px 5px 10px #888",
                    }}
                  ></li>
                  <li
                    data-target="#myCarousel1"
                    data-slide-to="2"
                    style={{
                      height: "15px",
                      width: "15px",
                      boxShadow: "0px 5px 10px #888",
                    }}
                  ></li>
                </ol>

                {/* <!-- Wrapper for slides --> */}
                <div class="carousel-inner">
                  <div class="item active">
                    <div className={styles.our_cake_item_border}>
                      {isLoading ? (
                        bestSellerList.slice(0, 3).map((item, key) => {
                          return (
                            <div key={key} className={styles.our_cake_item}>
                              <div className={styles.our_cake_item_img_border}>
                                <img
                                  src={
                                    item.productImage
                                      ? item.productImage
                                      : Images.IMG_NULL
                                  }
                                  alt={item.productName}
                                  className={styles.our_cake_item_img}
                                />
                              </div>
                              <div className={styles.our_cake_item_rate}>
                                <i class="far fa-star"></i>
                                <i class="far fa-star"></i>
                                <i class="far fa-star"></i>
                                <i class="far fa-star"></i>
                                <i class="far fa-star"></i>
                              </div>
                              <div class={styles.our_cake_item_name}>
                                {item.productName}
                              </div>
                              <div class={styles.our_cake_item_size}>
                                {item.size}
                              </div>
                              <div class={styles.our_cake_item_price_and_buy}>
                                <div class={styles.our_cake_item_price}>
                                  {parseFloat(
                                    item.productPrice * 1000
                                  ).toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </div>
                                <div class={styles.our_cake_item_buy}>
                                  <i class="fas fa-plus-square"></i>
                                </div>
                              </div>
                              <div class={styles.our_cake_item_love_border}>
                                <div class={styles.our_cake_item_love}>
                                  <i class="far fa-heart"></i>
                                </div>
                              </div>
                              <div className={styles.our_cake_item_discover}>
                                <button
                                  onClick={() =>
                                    handleAddToDetail(item.productId)
                                  }
                                  className={`${styles.btn} ${styles.btn_1}`}
                                >
                                  Discover
                                  <svg>
                                    <rect
                                      x="0"
                                      y="0"
                                      fill="none"
                                      width="100%"
                                      height="100%"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className={styles.isLoading}>
                          <CircularProgress
                            size={200}
                            className={styles.loading_icon}
                            color="success"
                          />
                          <img
                            className={styles.logo}
                            src={Images.LOGO}
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div class="item">
                    <div class={styles.our_cake_item_border}>
                      {bestSellerList.slice(3, 6).map((item, key) => {
                        return (
                          <div key={key} class={styles.our_cake_item}>
                            <div class={styles.our_cake_item_img_border}>
                              <img
                                src={
                                  item.productImage
                                    ? item.productImage
                                    : Images.IMG_NULL
                                }
                                alt={item.productName}
                                class={styles.our_cake_item_img}
                              />
                            </div>
                            <div class={styles.our_cake_item_rate}>
                              <i class="far fa-star"></i>
                              <i class="far fa-star"></i>
                              <i class="far fa-star"></i>
                              <i class="far fa-star"></i>
                              <i class="far fa-star"></i>
                            </div>
                            <div class={styles.our_cake_item_name}>
                              {item.productName}
                            </div>
                            <div class={styles.our_cake_item_size}>
                              {item.size}
                            </div>
                            <div class={styles.our_cake_item_price_and_buy}>
                              <div class={styles.our_cake_item_price}>
                                {parseFloat(
                                  item.productPrice * 1000
                                ).toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </div>
                              <div class={styles.our_cake_item_buy}>
                                <i class="fas fa-plus-square"></i>
                              </div>
                            </div>
                            <div class={styles.our_cake_item_love_border}>
                              <div class={styles.our_cake_item_love}></div>
                            </div>
                            <div className={styles.our_cake_item_discover}>
                              <button
                                onClick={() =>
                                  handleAddToDetail(item.productId)
                                }
                                className={`${styles.btn} ${styles.btn_1}`}
                              >
                                Discover
                                <svg>
                                  <rect
                                    x="0"
                                    y="0"
                                    fill="none"
                                    width="100%"
                                    height="100%"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div class="item">
                    <div className={styles.our_cake_item_border}>
                      {bestSellerList.slice(6, 9).map((item, key) => {
                        return (
                          <div key={key} className={styles.our_cake_item}>
                            <div className={styles.our_cake_item_img_border}>
                              <img
                                src={
                                  item.productImage
                                    ? item.productImage
                                    : Images.IMG_NULL
                                }
                                alt={item.productName}
                                className={styles.our_cake_item_img}
                              />
                            </div>
                            <div className={styles.our_cake_item_rate}>
                              <i class="far fa-star"></i>
                              <i class="far fa-star"></i>
                              <i class="far fa-star"></i>
                              <i class="far fa-star"></i>
                              <i class="far fa-star"></i>
                            </div>
                            <div class={styles.our_cake_item_name}>
                              {item.productName}
                            </div>
                            <div class={styles.our_cake_item_size}>
                              {item.size}
                            </div>
                            <div class={styles.our_cake_item_price_and_buy}>
                              <div class={styles.our_cake_item_price}>
                                {parseFloat(
                                  item.productPrice * 1000
                                ).toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </div>
                              <div class={styles.our_cake_item_buy}>
                                <i class="fas fa-plus-square"></i>
                              </div>
                            </div>
                            <div className={styles.our_cake_item_love_border}>
                              <div className={styles.our_cake_item_love}>
                                <FontAwesomeIcon icon={faHeart} />
                              </div>
                            </div>
                            <div className={styles.our_cake_item_discover}>
                              <button
                                onClick={() =>
                                  handleAddToDetail(item.productId)
                                }
                                className={`${styles.btn} ${styles.btn_1}`}
                              >
                                Discover
                                <svg>
                                  <rect
                                    x="0"
                                    y="0"
                                    fill="none"
                                    width="100%"
                                    height="100%"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.our_cake_line}></div>
            <div className={styles.open_product}>
              <a href="/product" className={styles.our_cake_all_btn}>
                Find out all our cakes
                <FontAwesomeIcon className={styles.arrow} icon={faArrowRight} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurCake;
