import Images from "constants/images";
import React from "react";
import styles from "./Gallery.module.css";

function Galllery(props) {
  return (
    <div>
      <div className={styles.space_top_gallery}></div>

      <div className={styles.gallery} id="section_4">
        <div className={styles.gallery_border}>
          <div className={styles.gallery_border_bg}>
            <img
              src={Images.ITEM4}
              alt=""
              className={styles.gallery_border_bg_img}
            />
            <img
              src={Images.ITEM5}
              alt=""
              className={styles.gallery_border_bg_img}
            />
            <img
              src={Images.ITEM1}
              alt=""
              className={styles.gallery_border_bg_img}
            />
          </div>
          <div className={styles.gallery_border_tag}>
            <a
              href="https://www.instagram.com/tourdesgateau/"
              rel="noopener noreferrer"
              target="_blank"
              className={styles.gallery_border_tag_link}
            >
              Follow us on #Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Galllery;
