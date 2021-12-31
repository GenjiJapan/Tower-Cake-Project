import Images from "constants/images";
import React from "react";
import styles from "./Banner.module.css";

function Banner(props) {
  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.banner_img}>
          <img src={Images.CUP_CAKE} alt="" />
        </div>
        <div className={styles.banner_overlay}></div>
        <h1>Our Product</h1>
      </div>
    </div>
  );
}

export default Banner;
