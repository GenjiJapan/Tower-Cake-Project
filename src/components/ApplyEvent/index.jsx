import { CircularProgress } from "@mui/material";
import React from "react";
import Images from "../../constants/images";
import styles from "../AdProduct/AdProduct.module.css";

function ApplyEvent(props) {
  const {
    handlePageEventChange,
    setSearch,
    eventList,
    setEventModal,
    eventModal,
    getSearch,
    removeTime,
    countEventItems,
    openEventItems,
    getNearestEvent,
    nearestList,
    isLoading,
  } = props;
  return (
    <div className={styles.discount_event_blue}>
      <div className={styles.discount_event_banner}>Apply Discount Event</div>
      <div className={styles.discount_event_white}>
        <div className={styles.search_calendar}>
          <form onSubmit={getSearch} className={styles.search}>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search..."
            />
            <button type="submit" className={styles.search_logo}>
              <i class="fas fa-search"></i>
            </button>
          </form>
          <button onClick={() => getNearestEvent()} className={styles.calendar}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.25 15H15V21.25H21.25V15ZM20 1.25V3.75H10V1.25H7.5V3.75H6.25C4.8625 3.75 3.7625 4.875 3.7625 6.25L3.75 23.75C3.75 25.125 4.8625 26.25 6.25 26.25H23.75C25.125 26.25 26.25 25.125 26.25 23.75V6.25C26.25 4.875 25.125 3.75 23.75 3.75H22.5V1.25H20ZM23.75 23.75H6.25V10H23.75V23.75Z"
                fill="white"
              />
            </svg>
          </button>
          <button
            onClick={() => setEventModal(!eventModal)}
            className={styles.calendar}
            style={{ background: "#00BF9D" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 10H2V12H14V10ZM14 6H2V8H14V6ZM18 14V10H16V14H12V16H16V20H18V16H22V14H18ZM2 16H10V14H2V16Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        <div className={styles.table_event}>
          <table>
            <colgroup>
              <col span="1" style={{ background: "#fff" }} />
              <col span="1" style={{ background: "#EBEBEB" }} />
              <col span="1" style={{ background: "#D7D7D7" }} />
              <col span="1" style={{ background: "#C4C4C4" }} />
            </colgroup>
            <tr>
              <th style={{ textAlign: "left" }}>Event</th>
              <th>Start</th>
              <th>End</th>
              <th>Value</th>
            </tr>
            {isLoading ? (
              eventList.slice(0, countEventItems).map((item, key) => {
                return (
                  <tr onClick={() => openEventItems(item)} key={key}>
                    <td>
                      {item.eventName === "None"
                        ? "Event's coming soon"
                        : item.eventName}{" "}
                    </td>
                    <td>{removeTime(item.dateStart)}</td>
                    <td>{removeTime(item.dateEnd)}</td>
                    <td>{item.discountValue * 100}%</td>
                  </tr>
                );
              })
            ) : (
              <tr className={styles.isLoading}>
                <CircularProgress
                  size={120}
                  className={styles.loading_icon}
                  color="success"
                />
                <img className={styles.logo} src={Images.LOGO} alt="" />
              </tr>
            )}
          </table>
        </div>

        <button
          disabled={nearestList.length > 0 ? true : false}
          onClick={() => handlePageEventChange()}
          className={styles.show_more_btn}
        >
          Show more...
        </button>
      </div>
    </div>
  );
}

export default ApplyEvent;
