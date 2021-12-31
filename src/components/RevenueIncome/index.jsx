import { Month, Year } from "constants/AdDetailProduct.js";
import React from "react";
import Select from "react-select";
import styles from "../AdIncome/AdIncome.module.css";

function RevenueIncome(props) {
  const { isGrow, totalRevenue, setYearRevenue, setMonthRevenue } = props;

  const handleMonthRevenue = (value) => {
    setMonthRevenue(value.label);
    console.log("🚀 ~ file: index.jsx ~ line 182 ~ handleMonth ~ value", value);
  };

  const handleYearRevenue = (value) => {
    setYearRevenue(value.label);
    console.log("🚀 ~ file: index.jsx ~ line 187 ~ handleYear ~ value", value);
  };
  return (
    <div className={`${styles.item} ${styles.item_revenue}`}>
      <div className={styles.up_down_icon}>
        {isGrow === true ? (
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
            d="M30 5C16.2 5 5 16.2 5 30C5 43.8 16.2 55 30 55C43.8 55 55 43.8 55 30C55 16.2 43.8 5 30 5ZM33.525 45.225V50H26.85V45.175C22.575 44.275 18.95 41.525 18.675 36.675H23.575C23.825 39.3 25.625 41.35 30.2 41.35C35.1 41.35 36.2 38.9 36.2 37.375C36.2 35.3 35.1 33.35 29.525 32.025C23.325 30.525 19.075 27.975 19.075 22.85C19.075 18.55 22.55 15.75 26.85 14.825V10H33.525V14.875C38.175 16 40.5 19.525 40.65 23.35H35.75C35.625 20.575 34.15 18.675 30.2 18.675C26.45 18.675 24.2 20.375 24.2 22.775C24.2 24.875 25.825 26.25 30.875 27.55C35.925 28.85 41.325 31.025 41.325 37.325C41.3 41.9 37.875 44.4 33.525 45.225Z"
            fill="#E1C115"
          />
        </svg>
      </div>
      <span className={styles.number}>{totalRevenue}</span>
      <div className={`${styles.date_tagName} ${styles.date_tagName_1}`}>
        <span className={styles.date}>
          In
          <Select
            className="select revenue react-select-container"
            classNamePrefix="react-select"
            placeholder="Month "
            options={Month}
            isSearchable
            onChange={handleMonthRevenue}
          />
          <Select
            className="select revenue react-select-container"
            classNamePrefix="react-select"
            placeholder="Year "
            options={Year}
            isSearchable
            onChange={handleYearRevenue}
          />
        </span>
        <span className={styles.tagName}>Revenue</span>
      </div>
    </div>
  );
}

export default RevenueIncome;
