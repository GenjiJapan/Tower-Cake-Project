import { Month, Year } from "constants/AdDetailProduct.js";
import React from "react";
import Select from "react-select";
import styles from "../AdIncome/AdIncome.module.css";

function NewOrderIncome(props) {
  const { isGrowNew, totalRevenueNew, setYearNew, setMonthNew } = props;

  const handleMonthNew = (value) => {
    setMonthNew(value.label);
    console.log("🚀 ~ file: index.jsx ~ line 182 ~ handleMonth ~ value", value);
  };

  const handleYearNew = (value) => {
    setYearNew(value.label);
    console.log("🚀 ~ file: index.jsx ~ line 187 ~ handleYear ~ value", value);
  };
  return (
    <div className={`${styles.item} ${styles.item_new_ord}`}>
      <div className={styles.up_down_icon}>
        {isGrowNew === true ? (
          <i class="fas fa-chevron-up fa-2x"></i>
        ) : (
          <i class="fas fa-chevron-down fa-2x"></i>
        )}
        <svg
          width="50"
          height="50"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M52.5 7.5H7.5C4.75 7.5 2.5 9.75 2.5 12.5V42.5C2.5 45.25 4.75 47.5 7.5 47.5H20V52.5H40V47.5H52.5C55.25 47.5 57.475 45.25 57.475 42.5L57.5 12.5C57.5 9.75 55.25 7.5 52.5 7.5ZM52.5 42.5H7.5V12.5H52.5V42.5ZM47.5 20H20V25H47.5V20ZM47.5 30H20V35H47.5V30ZM17.5 20H12.5V25H17.5V20ZM17.5 30H12.5V35H17.5V30Z"
            fill="#E115D9"
          />
        </svg>
      </div>
      <span className={styles.number}>{totalRevenueNew} </span>
      <div className={`${styles.date_tagName} ${styles.date_tagName_2}`}>
        <span className={styles.date}>
          In
          <Select
            className="select new react-select-container"
            classNamePrefix="react-select"
            placeholder="Month"
            options={Month}
            isSearchable
            onChange={handleMonthNew}
          />
          <Select
            className="select new react-select-container"
            classNamePrefix="react-select"
            placeholder="Year"
            options={Year}
            isSearchable
            onChange={handleYearNew}
          />
        </span>
        <span className={styles.tagName}>New Orders</span>
      </div>
    </div>
  );
}

export default NewOrderIncome;
