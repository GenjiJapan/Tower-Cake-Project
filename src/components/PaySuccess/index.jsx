import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./PaySuccess.module.css";

function PaySuccess(props) {
  const history = useHistory();
  return (
    <div className={styles.Pay_Success}>
      <div className={styles.Pay_Success_tag}>
        <div className={styles.tag_header}>
          <div className={styles.tag_header_circle}>
            <i class="fas fa-check fa-2x"></i>
          </div>
        </div>
        <div className={styles.tag_body}>
          <div className={styles.tag_body_header}>Payment Successful !</div>
          <div className={styles.tag_body_content}>
            Everything working normally.
          </div>
          <div className={styles.tag_body_btn}>
            <button type="button" onClick={() => history.push("/product")}>
              Continue shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaySuccess;
