import { Month, Year } from "constants/AdDetailProduct.js";
import React from "react";
import Select from "react-select";
import styles from "../AdIncome/AdIncome.module.css";

function CompleteIncome(props) {
  const {
    totalRevenueCompleted,
    isGrowCompleted,
    setYearCompleted,
    setMonthCompleted,
  } = props;
  const handleMonthCompleted = (value) => {
    setMonthCompleted(value.label);
    console.log("🚀 ~ file: index.jsx ~ line 182 ~ handleMonth ~ value", value);
  };

  const handleYearCompleted = (value) => {
    setYearCompleted(value.label);
    console.log("🚀 ~ file: index.jsx ~ line 187 ~ handleYear ~ value", value);
  };
  return (
    <div className={`${styles.item} ${styles.item_complete_ord}`}>
      <div className={styles.up_down_icon}>
        {isGrowCompleted === true ? (
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
            d="M50 20H42.5V10H7.5C4.75 10 2.5 12.25 2.5 15V42.5H7.5C7.5 46.65 10.85 50 15 50C19.15 50 22.5 46.65 22.5 42.5H37.5C37.5 46.65 40.85 50 45 50C49.15 50 52.5 46.65 52.5 42.5H57.5V30L50 20ZM15 46.25C12.925 46.25 11.25 44.575 11.25 42.5C11.25 40.425 12.925 38.75 15 38.75C17.075 38.75 18.75 40.425 18.75 42.5C18.75 44.575 17.075 46.25 15 46.25ZM48.75 23.75L53.65 30H42.5V23.75H48.75ZM45 46.25C42.925 46.25 41.25 44.575 41.25 42.5C41.25 40.425 42.925 38.75 45 38.75C47.075 38.75 48.75 40.425 48.75 42.5C48.75 44.575 47.075 46.25 45 46.25Z"
            fill="#4785FF"
          />
        </svg>
      </div>
      <span className={styles.number}>{totalRevenueCompleted} </span>
      <div className={`${styles.date_tagName} ${styles.date_tagName_3}`}>
        <span className={styles.date}>
          In{" "}
          <Select
            className="select completed react-select-container"
            classNamePrefix="react-select"
            placeholder="Month"
            options={Month}
            isSearchable
            onChange={handleMonthCompleted}
          />
          <Select
            className="select completed react-select-container"
            classNamePrefix="react-select"
            placeholder="Year"
            options={Year}
            isSearchable
            onChange={handleYearCompleted}
          />{" "}
        </span>
        <span className={styles.tagName}>Completed Orders</span>
      </div>
    </div>
  );
}

export default CompleteIncome;
