import Banner from "components/Banner";
import Images from "constants/images";
import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import styles from "./Help.module.css";

const options = [
  { value: "1", label: "Website" },
  { value: "2", label: "Account & Security" },
  { value: "3", label: "Products" },
  { value: "4", label: "Payment" },
  { value: "5", label: "Delivery & Receive" },
];
const animatedComponents = makeAnimated();

function Help(props) {
  return (
    <div className={styles.help}>
      <Banner title="Customer Care" backgroundUrl={Images.SPACE} />
      <div className={styles.header}>
        <h1>Tour des Gâteau Customer Care Team</h1>
        <span>
          We'd love to hear your questions and comments. Please give Tour des
          Gâteau feedback about your problem! We will contact you in the next 24
          hours.
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.item}>
            <div className={styles.item_option}>
              <span>Choose your problem</span>
              <Select
                className={styles.options_label}
                options={options}
                isSearchable={false}
                // isMulti
                components={animatedComponents}
              />
            </div>
            <div className={styles.item_email}>
              <span>Your Email</span>
              <input type="email" placeholder="Your Email" />
            </div>
            <div className={styles.item_content}>
              <span>Feedback Content</span>
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className={styles.send}>
              <button type="submit" className={styles.send_btn}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
