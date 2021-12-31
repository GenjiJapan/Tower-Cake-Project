import Images from "constants/images";
import React from "react";
import styles from "./NotifyHover.module.css";

function NotifyHover(props) {
  return (
    <div>
      <div className={styles.header_notify_list}>
        <div className={styles.header_notify_list_box}>
          <div className={styles.header_notify_list_header}>
            <span>New Notification</span>
          </div>

          <div className={styles.header_notify_list_body}>
            <ul className={styles.header_notify_list_container}>
              <li className={styles.header_notify_list_item}>
                <div className={styles.item_notify}>
                  <div className={styles.item_notify_img}>
                    <img src={Images.ITEM4} alt="" className={styles.img} />
                  </div>
                  <div className={styles.item_notify_content}>
                    <span>Event name</span>
                    <span>
                      !!!Hur cmn ry up!!! Mua 2 tặng 1 tính tiền 3 trừ 1 bằng 2
                      !!!Hur cmn ry up!!! !!!Hur cmn ry up!!! Mua 2 tặng 1 tính
                      tiền 3 trừ 1 bằng 2 !!!Hur cmn ry up!!!
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className={styles.header_notify_list_footer}>
            <button className={styles.header_notify_list_footer_btn}>
              <span className={styles.header_notify_list_footer_btn_text}>
                View All
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotifyHover;
