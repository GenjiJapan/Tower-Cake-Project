import React, { useState } from "react";
import styles from "./About.module.css";

function About(props) {
  const [shown, setShown] = useState(false);

  return (
    <div className={styles.about_us} id="section_2">
      <div className={styles.about_us_img}></div>

      <div
        className={
          shown ? `${styles.show_more_content}` : `${styles.about_us_container}`
        }
      >
        <h1 className={styles.about_us_header}>
          <span>
            <p>About us</p> The story of
            <span> Tour </span>
            <span> des </span>
            <span>Gâteau</span>
          </span>
        </h1>
        <div className={styles.about_us_content}>
          <span>
            {shown
              ? " In August 2000, 4 young bakers graduated from Ferrandi School - France's leading cooking school with a 100-year history - took a flight to Ho Chi Minh City. Together they opened a small cake shop in Binh Thanh district. After 20 years of development, the small shop today has become one of the best cake restaurant in Vietnam. Rated as a 3-star Michelin restaurant, the restaurant serves less than 300 diners every day. The Tour des Gâteau's honor is to serve all walks of life from politicians, elites, demanding food critics around the world to beloved ordinary people. art. Here, diners will experience the most wonderful and top-class cakes. Experiencing each level of sublimation emotions, diners can reach the pinnacle of culinary art. And we the bakers will guide you. That is what the Tour des Gâteau is all about."
              : "In August 2000, 4 young bakers graduated from Ferrandi School - France's leading cooking school with a 100-year history - took a flight to Ho Chi Minh City. Together they opened a small cake shop in Binh Thanh district. After 20 years of development, the small shop today has become one of the best cake restauran in Vietnam. Rated as a 3-star Michelin restaurant ..."}
          </span>
        </div>
        {shown ? (
          <button
            className={styles.about_us_btn}
            onClick={() => setShown(!shown)}
          >
            Show less...
          </button>
        ) : (
          <button
            className={styles.about_us_btn}
            onClick={() => setShown(!shown)}
          >
            Read more...
          </button>
        )}
      </div>
    </div>
  );
}

export default About;
