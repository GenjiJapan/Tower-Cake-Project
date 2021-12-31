import React from "react";
import styles from "./PayFailed.module.css";

PayFailed.propTypes = {};

function PayFailed(props) {
  return (
    <div className={styles.Pay_Fail}>
      <div className={styles.Pay_Fail_tag}>
        <div className={styles.tag_header}>
          <div className={styles.tag_header_circle}>
            <i class="fas fa-times fa-2x"></i>
          </div>
        </div>
        <div className={styles.tag_body}>
          <div className={styles.tag_body_header}>Payment Failed !</div>
          <div className={styles.tag_body_content}>
            Opps!
            <br />
            Something went wrong!
          </div>
          <div className={styles.tag_body_btn}>
            <button>Try again</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayFailed;
