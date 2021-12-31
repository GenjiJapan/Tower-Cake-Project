import PropTypes from "prop-types";
import React from "react";
import styles from "./Banner.module.css";

Banner.propTypes = {
  title: PropTypes.string,
  backgroundUrl: PropTypes.string,
};

Banner.defaultProps = {
  title: "",
  backgroundUrl: "",
};

function Banner(props) {
  const { title, backgroundUrl } = props;
  const bannerStyle = backgroundUrl
    ? { backgroundImage: `url(${backgroundUrl})` }
    : {};
  return (
    <div>
      <div className={styles.banner} style={bannerStyle}>
        <div className={styles.banner_overlay}></div>
        <h1>{title} </h1>
      </div>
    </div>
  );
}

export default Banner;
