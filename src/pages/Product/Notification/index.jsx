import axios from "axios";
import Images from "constants/images";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import Cookies from "universal-cookie";
import styles from "./NotifyPage.module.css";

function Notification(props) {
  const cookies = new Cookies();
  const account = cookies.get("account");

  var [notifyList, setNotifyList] = useState([]);

  useEffect(() => {
    getNotify();
  }, []);

  const getNotify = async () => {
    try {
      const res = await axios.get(
        `/api/notifications/user=${account.accountId}/page=${1}`
      );
      console.log("🚀 ~ file: index.jsx ~ line 19 ~ getNotify ~ res", res);

      notifyList = res.data.mappingResults;

      setNotifyList(notifyList);
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };
  const showForm = useSelector((state) => state.form.showForm);
  return (
    <div
      className={
        showForm === "Notify"
          ? `${styles.notifyPage}`
          : `${styles.disable_notify}`
      }
    >
      <div className={styles.notify_container}>
        <h2 className={styles.notify_header}>
          <Fade bottom delay={100}>
            Notification
          </Fade>
        </h2>
        <ul className={styles.notify_list}>
          {notifyList.length === 0 && (
            <div className={styles.notify_null}>
              <img src={Images.IMG_NULL} alt="" />
              <br />
              <span>You dont have any notify </span>
            </div>
          )}
          {notifyList.length !== 0 &&
            notifyList.map((item, key) => {
              return (
                <Fade key={key} top delay={100}>
                  <li className={styles.notify_item}>
                    <div
                      className={`${styles.notify_item_icon} ${styles.green}`}
                    >
                      <i className="fas fa-star fa-lg"></i>
                    </div>
                    <div className={styles.notify_item_content}>
                      <span className={styles.content_header}>
                        {item.notificationTemplate.type.typeName}
                      </span>
                      <span className={styles.content_body}>
                        {item.content}
                      </span>
                    </div>
                  </li>
                </Fade>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default Notification;
