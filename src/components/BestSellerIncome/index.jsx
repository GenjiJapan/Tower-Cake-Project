import { Month, Year } from "constants/AdDetailProduct.js";
import Images from "constants/images";
import React from "react";
import { useHistory } from "react-router";
import Select from "react-select";
import styles from "../AdIncome/AdIncome.module.css";
import "../AdIncome/SelectStyles.css";

function BestSellerIncome(props) {
  const { bestSeller, setYearBestSeller, setMonthBestSeller } = props;
  const history = useHistory();

  const showRank = (key) => {
    console.log("🚀 ~ file: index.jsx ~ line 168 ~ showRank ~ key", key);
    if (key + 1 === 1) return "1st";
    if (key + 1 === 2) return "2nd";
    if (key + 1 === 3) return "3rd";
  };

  const handleMonthBest = (value) => {
    setMonthBestSeller(value.label);
    console.log("🚀 ~ file: index.jsx ~ line 182 ~ handleMonth ~ value", value);
  };

  const handleYearBest = (value) => {
    setYearBestSeller(value.label);
    console.log("🚀 ~ file: index.jsx ~ line 187 ~ handleYear ~ value", value);
  };

  return (
    <div className={styles.group}>
      <div className={styles.group_header}>
        <span>
          Top 3 Best Products Seller -{" "}
          <Select
            className="select best react-select-container"
            classNamePrefix="react-select"
            placeholder="Month"
            options={Month}
            isSearchable
            onChange={handleMonthBest}
          />
          <Select
            className="select best react-select-container"
            classNamePrefix="react-select"
            placeholder="Year"
            options={Year}
            isSearchable
            onChange={handleYearBest}
          />
        </span>
      </div>
      <div className={styles.group_body}>
        {/* Product 1 */}
        {bestSeller.length === 0 && (
          <div className={styles.null2}>
            <img src={Images.IMG_NULL} alt="we have not sold anything yet" />
            <br />
            <label htmlFor="">Please choose the time to see the results </label>
          </div>
        )}
        {bestSeller.length !== 0 &&
          bestSeller.map((item, key) => {
            console.log(
              "🚀 ~ file: index.jsx ~ line 275 ~ {bestSeller.map ~ item",
              item
            );
            return (
              <div key={key} className={styles.item}>
                <img
                  className={styles.item3_bg}
                  src={item.product.image}
                  alt={item.product.productName}
                />
                <div className={styles.item_container}>
                  <div className={styles.item_header}>
                    <div className={styles.item_img}>
                      <img
                        onClick={() =>
                          history.push(`product/item-detail/${item.productId}`)
                        }
                        src={item.product.image}
                        alt={item.product.productName}
                      />
                    </div>
                  </div>
                  <span className={styles.product_name}>
                    {item.product.productName}{" "}
                  </span>
                  <div
                    className={`${styles.date_tagName} ${styles.date_tagName_4}`}
                  >
                    <span className={styles.date}>In November, 2021</span>
                    <span className={styles.tagName}>{showRank(key)} </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default BestSellerIncome;
