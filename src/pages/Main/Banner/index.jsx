import Images from "constants/images";
import React from "react";
import styles from "./Banner.module.css";

function Banner(props) {
  return (
    <div className={styles.form1_carousel}>
      <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <span className={styles.orange}></span>
        <ol class="carousel-indicators">
          <li
            data-target="#myCarousel"
            data-slide-to="0"
            class="active"
            style={{
              height: "15px",
              width: "15px",
              boxShadow: "0px 5px 10px #888 ",
            }}
          ></li>
          <li
            data-target="#myCarousel"
            data-slide-to="1"
            style={{
              height: "15px",
              width: "15px",
              boxShadow: "0px 5px 10px #888 ",
            }}
          ></li>
          <li
            data-target="#myCarousel"
            data-slide-to="2"
            style={{
              height: "15px",
              width: "15px",
              boxShadow: "0px 5px 10px #888 ",
            }}
          ></li>
        </ol>

        <div class="carousel-inner">
          <div class="item active ">
            <div className={styles.item_modify}>
              <div className={`${styles.item_info_1st} ${styles.item_info}`}>
                <h1
                  className={`${styles.item_info_header} ${styles.item_info_header_1st}`}
                >
                  Tour des Gâteau
                </h1>
                <span
                  className={`${styles.item_info_content} ${styles.item_info_content_1st}`}
                >
                  August 2000
                </span>
              </div>
              <div className={styles.item_img_1_border}>
                <img
                  src={Images.SPACE}
                  alt="space"
                  className={styles.item_img_1}
                />
              </div>
            </div>
          </div>

          <div class="item ">
            <div className={styles.item_modify}>
              <div className={styles.item_modify_2}>
                <div className={`${styles.item_info} ${styles.item_info_2nd}`}>
                  <h1
                    className={`${styles.item_info_header} ${styles.item_info_header_2nd}`}
                  >
                    The <p>orange</p> sauce cake
                  </h1>
                  <span
                    className={`${styles.item_info_content} ${styles.item_info_content_2nd}`}
                  >
                    A French pastry. It is made from layers of almond wafers
                    (called "Joconde" in French) soaked in coffee syrup, layered
                    with ganache or coffee buttercream, and coated with melted
                    chocolate...
                  </span>
                  <button className={styles.item_info_btn}>
                    {" "}
                    <a href="#/"> More Info</a>
                  </button>
                </div>
                <div className={styles.item_img_2_border}>
                  <img
                    className={styles.item_img_2}
                    src={Images.ORANGE_CAKE}
                    alt="orange"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="item ">
            <div className={styles.item_modify}>
              <div className={styles.item_modify_3}>
                <div className={`${styles.item_info} ${styles.item_info_3rd}`}>
                  <h1
                    className={`${styles.item_info_header} ${styles.item_info_header_3rd}`}
                  >
                    <p>The</p> <span>Ma</span>ca<span>ron</span>
                  </h1>
                  <span
                    className={`${styles.item_info_content} ${styles.item_info_content_3rd}`}
                  >
                    A French pastry. It is made from layers of almond wafers
                    (called "Joconde" in French) soaked in coffee syrup, layered
                    with ganache or coffee buttercream and coated with melted
                    chocolate...
                  </span>
                  <button className={styles.item_info_btn}>
                    <a href="#/"> More Info</a>
                  </button>
                </div>
                <img
                  src={Images.MACARON_CAKE}
                  alt="macaron"
                  className={styles.item_img_3}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
